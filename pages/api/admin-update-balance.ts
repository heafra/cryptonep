import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { admin_secret, userId, balance, invested } = req.body;

  if (admin_secret !== process.env.ADMIN_SECRET) return res.status(401).json({ error: "Unauthorized" });

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { balance: balance ?? undefined, invested: invested ?? undefined },
  });

  res.json(updated);
}