import Prisma from "@prisma/client";
const prisma = new Prisma.PrismaClient();
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        balance: 0,
        invested: 0,
      },
    });
    res.status(201).json({ userId: user.id });
  } catch (err) {
    res.status(500).json({ error: "User already exists or DB error" });
  }
}

