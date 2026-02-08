import Prisma from "@prisma/client";
const prisma = new Prisma.PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId, amount } = req.body;

  if (!userId || !amount) return res.status(400).json({ error: "Missing data" });

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.balance < amount)
      return res.status(400).json({ error: "Insufficient balance" });

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        balance: { decrement: amount },
        invested: { increment: amount },
      },
    });

    res.status(200).json({ balance: updated.balance, invested: updated.invested });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
}