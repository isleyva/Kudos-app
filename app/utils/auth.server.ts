import { json, createCookieSessionStorage } from "@remix-run/node";
import { prisma } from "./prisma.server";
import type { RegisterForm, LoginForm } from "./types.server";
import { createUser } from "./user.server";
import bcrypt from "bcryptjs";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "kudos-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const register = async (form: RegisterForm) => {
  const exists = await prisma.user.count({ where: { email: form.email } });
  if (exists) {
    return json({ error: "User already exists" }, { status: 400 });
  }
  const newUser = await createUser(form);

  if (!newUser) {
    return json(
      {
        error: "Something went wrong creating new user",
        fields: { email: form.email, password: form.password },
      },
      { status: 400 }
    );
  }
  return null;
};

export const login = async (form: LoginForm) => {
  const user = await prisma.user.findUnique({ where: { email: form.email } });

  if (!user || !(await bcrypt.compare(form.password, form.password))) {
    return json({ error: "Incorrect login" }, { status: 400 });
  }
  return null;
};
