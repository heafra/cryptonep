import Prisma from "@prisma/client";
const prisma = new Prisma.PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId, amount } = req.body;

  if (!userId || !amount) return res.status(400).json({ error: "Missing data" });

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: amount } },
    });
    res.status(200).json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
}
