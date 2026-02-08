import Prisma from "@prisma/client";
const prisma = new Prisma.PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "7d" });
  res.status(200).json({ token });
}
