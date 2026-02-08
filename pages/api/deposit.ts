import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const amount = Number(req.body.amount);

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const user = await prisma.user.update({
    where: {
      email: session.user.email
    },
    data: {
      balance: {
        increment: amount
      }
    }
  });

  return res.status(200).json({
    success: true,
    balance: user.balance
  });
}
