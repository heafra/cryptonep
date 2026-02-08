"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import DepositModal from "../components/DepositModal";
import WithdrawModal from "../components/WithdrawModal";
import InvestModal from "../components/InvestModal";
import axios from "axios";

export default function Dashboard() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState(0);
  const [invested, setInvested] = useState(0);

  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showInvest, setShowInvest] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      if (!session) return;
      const res = await axios.get("/api/get-user");
      setBalance(res.data.balance);
      setInvested(res.data.invested);
    }
    fetchUser();
  }, [session]);

  const handleLogout = () => signOut();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session?.user?.email}</h1>
      <div className="mb-4">
        <p>Portfolio Balance: ${balance}</p>
        <p>Invested Balance: ${invested}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setShowDeposit(true)} className="bg-green-500 text-white px-4 py-2 rounded">Deposit</button>
        <button onClick={() => setShowWithdraw(true)} className="bg-red-500 text-white px-4 py-2 rounded">Withdraw</button>
        <button onClick={() => setShowInvest(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Invest</button>
        <button onClick={handleLogout} className="bg-gray-700 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* Modals */}
      {showDeposit && <DepositModal onClose={() => setShowDeposit(false)} setBalance={setBalance} />}
      {showWithdraw && <WithdrawModal onClose={() => setShowWithdraw(false)} setBalance={setBalance} />}
      {showInvest && <InvestModal onClose={() => setShowInvest(false)} setBalance={setBalance} setInvested={setInvested} />}

      {/* Crypto Chart Placeholder */}
      <div className="mt-8 p-4 border rounded shadow">
        <h2 className="font-bold mb-2">Crypto Chart</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          [Chart placeholder - integrate with Chart.js or TradingView]
        </div>
      </div>
    </div>
  );
}
