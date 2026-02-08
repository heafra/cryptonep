"use client";

import { useState } from "react";
import axios from "axios";

type Props = {
  onClose: () => void;
  setBalance: (b: number) => void;
};

export default function DepositModal({ onClose, setBalance }: Props) {
  const [amount, setAmount] = useState(0);

  const handleDeposit = async (method: "bank" | "bitcoin") => {
    if (!amount || amount <= 0) return alert("Enter a valid amount");

    // Bank/Bitcoin Deposit
    if (method === "bitcoin") {
      alert("Send BTC to wallet: bc1qf5gz0g0mdjz0a5c84r2qjnhcvqsnnvp046g2cf");
    }

    const res = await axios.post("/api/deposit", { amount });
    setBalance(res.data.balance);
    onClose();
  };

  const copyWallet = () => {
    navigator.clipboard.writeText("bc1qf5gz0g0mdjz0a5c84r2qjnhcvqsnnvp046g2cf");
    alert("Wallet copied!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="font-bold mb-4">Deposit</h2>
        <input
          type="number"
          placeholder="Amount in $"
          className="border p-2 mb-4 w-full"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <div className="flex justify-between mb-4">
          <button onClick={() => handleDeposit("bank")} className="bg-green-500 text-white px-4 py-2 rounded">Deposit via Bank</button>
          <button onClick={() => handleDeposit("bitcoin")} className="bg-yellow-500 text-white px-4 py-2 rounded">Deposit via Bitcoin</button>
        </div>

        <div className="mb-4">
          <p>Bitcoin Wallet:</p>
          <div className="flex justify-between items-center border p-2">
            <span>bc1qf5gz0g0mdjz0a5c84r2qjnhcvqsnnvp046g2cf</span>
            <button onClick={copyWallet} className="bg-gray-300 px-2 py-1 rounded">Copy</button>
          </div>
        </div>

        <button onClick={onClose} className="bg-gray-700 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
}
