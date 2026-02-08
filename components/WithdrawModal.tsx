"use client";

import { useState } from "react";
import axios from "axios";

type Props = {
  onClose: () => void;
  setBalance: (b: number) => void;
};

export default function WithdrawModal({ onClose, setBalance }: Props) {
  const [amount, setAmount] = useState(0);

  const handleWithdraw = async () => {
    if (!amount || amount <= 0) return alert("Enter a valid amount");

    // AML Compliance Placeholder
    const amlApproved = confirm("AML Verification: Click OK if approved");
    if (!amlApproved) return alert("AML verification failed");

    const res = await axios.post("/api/withdraw", { amount });
    setBalance(res.data.balance);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="font-bold mb-4">Withdraw</h2>
        <input
          type="number"
          placeholder="Amount in $"
          className="border p-2 mb-4 w-full"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button onClick={handleWithdraw} className="bg-red-500 text-white px-4 py-2 rounded mb-4">Withdraw</button>
        <button onClick={onClose} className="bg-gray-700 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
}
