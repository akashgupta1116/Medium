import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign } from "hono/jwt";
import { signupInput, signInInput } from "@akashgupta6/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    MEDIUM_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      msg: "Inputs are incorrect",
    });
  }
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

    return c.json({
      token: jwt,
    });
  } catch (err) {
    c.status(411);
    console.log("err", err);
    return c.text("Invalid Token");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signInInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      msg: "Inputs are incorrect",
    });
  }

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
    return c.json({
      token: jwt,
    });
  } catch (err) {
    c.status(411);
    return c.text("Invalid Token");
  }
});
