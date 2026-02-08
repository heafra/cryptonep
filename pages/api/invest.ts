import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

  const user = await prisma.user.findUnique({ where: { id: session.user.email } });
  if (!user) return res.status(404).json({ error: "User not found" });
  if (user.balance < amount) return res.status(400).json({ error: "Insufficient balance" });

  const updated = await prisma.user.update({
    where: { id: session.user.email },
    data: {
      balance: { decrement: Number(amount) },
      invested: { increment: Number(amount) },
    },
  });

  res.json({ balance: updated.balance, invested: updated.invested });
}

