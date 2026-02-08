import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { token, amount, method } = req.body;
  if (!token || !amount || !method) return res.status(400).json({ error: "Missing token, amount, or method" });

  try {
    const payload: any = jwt.verify(token, SECRET);
    const userId = payload.userId;

    // Log transaction (we don’t auto-add to balance if crypto/bank is pending)
    await prisma.transaction.create({
      data: {
        userId,
        type: "deposit",
        amount,
      },
    });

    // Only auto-add to balance if method is "bank" (simulating instant)
    let updatedBalance = null;
    if (method === "bank") {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { balance: { increment: amount } },
      });
      updatedBalance = user.balance;
    }

    res.status(200).json({
      message: method === "bitcoin" ? "Send Bitcoin to the wallet address to complete deposit" : "Deposit successful",
      balance: updatedBalance,
    });
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
}


