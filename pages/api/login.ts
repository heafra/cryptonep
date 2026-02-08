import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "7d" });
  res.status(200).json({ token, user: { id: user.id, email: user.email, balance: user.balance, invested: user.invested } });
}