import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { token, amount } = req.body;
  if (!token || !amount) return res.status(400).json({ error: "Missing token or amount" });

  try {
    const payload: any = jwt.verify(token, SECRET);
    const userId = payload.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.balance < amount) return res.status(400).json({ error: "Insufficient balance" });

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { balance: { decrement: amount } },
    });

    await prisma.transaction.create({
      data: { userId, type: "withdraw", amount },
    });

    res.status(200).json({ balance: updated.balance });
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
}

