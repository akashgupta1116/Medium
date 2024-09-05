import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    MEDIUM_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  console.log("body----", body, c.env.DATABASE_URL);
  const prisma = new PrismaClient({
    // this use to get the env variable as cloudflare does not get the env vaiable globally
    datasourceUrl: c.env.DATABASE_URL, // typescript does not know the toml file so we have to write type for it
  }).$extends(withAccelerate()); // this accelerate is used as we have used accelerate connection pool of prisma

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        name: body.name,
        password: body.password,
      },
    });

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.MEDIUM_SECRET
    );

    return c.text(jwt);
  } catch (err) {
    c.status(411);
    console.log("err", err);
    return c.text("Invalid Token");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    // this use to get the env variable as cloudflare does not get the env vaiable globally
    datasourceUrl: c.env.DATABASE_URL, // typescript does not know the toml file so we have to write type for it
  }).$extends(withAccelerate()); // this accelerate is used as we have used accelerate connection pool of prisma
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({
        msg: "Invalid cred",
      });
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.MEDIUM_SECRET
    );
    return c.text(jwt);
  } catch (err) {
    c.status(411);
    return c.text("Invalid Token");
  }
});
