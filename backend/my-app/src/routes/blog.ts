import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { createBlog, updateBlog } from "@akashgupta6/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    MEDIUM_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("authorization");
  const user = await verify(token, c.env.MEDIUM_SECRET);

  if (user) {
    console.log("user.id", user.id);
    c.set("userId", user.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      msg: "User is not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlog.safeParse(body);

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

  console.log("body", body, c.get("userId"));
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
    },
  });
  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlog.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      msg: "Inputs are incorrect",
    });
  }
  const prisma = new PrismaClient({
    // this use to get the env variable as cloudflare does not get the env vaiable globally
    datasourceUrl: c.env.DATABASE_URL, // typescript does not know the toml file so we have to write type for it
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    // this use to get the env variable as cloudflare does not get the env vaiable globally
    datasourceUrl: c.env.DATABASE_URL, // typescript does not know the toml file so we have to write type for it
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
      select: {
          content: true,
          title: true,
          id: true,
          author: {
              select: {
                  name: true
              }
          }
      }
  });

  return c.json({
    blogs,
  });
});

// pagination
blogRouter.get("/:id", async (c) => {
  const blogId = c.req.param("id");
  const prisma = new PrismaClient({
    // this use to get the env variable as cloudflare does not get the env vaiable globally
    datasourceUrl: c.env.DATABASE_URL, // typescript does not know the toml file so we have to write type for it
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
     select: {
        title : true,
        content: true,
        id: true,
        author: {
            select: {
                name: true
            }
        }
     },
      where: {
        id: blogId,
      }
    });
    return c.json({
      blog,
    });
  } catch (err) {
    c.status(411);
    return c.json({
      msg: "Error while fetching blog post",
    });
  }
});

export default blogRouter;
