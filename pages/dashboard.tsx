"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState("");

  const BITCOIN_WALLET = "bc1qf5gz0g0mdjz0a5c84r2qjnhcvqsnnvp046g2cf";
  const BANK_DETAILS = {
    bank: "Column Bank",
    routing: "121145307",
    swift: "CLNOUS66",
    address: "1 Letterman Dr, San Francisco, CA 94129",
    account: "692101393449",
    name: "Trewin Trades LLC.",
  };

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t && u) {
      setToken(t);
      setUser(JSON.parse(u));
    }
  }, []);

  const handleDeposit = async () => {
    const amount = parseFloat(prompt("Deposit Amount $") || "0");
    if (amount <= 0) return;

    const method = prompt("Payment Method: bitcoin / bank")?.toLowerCase();
    if (!method || !["bitcoin", "bank"].includes(method)) return alert("Invalid method");

    const res = await fetch("/api/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, amount, method }),
    });

    const data = await res.json();

    if (method === "bank") setUser({ ...user, balance: data.balance });

    alert(method === "bitcoin" ? `Send BTC to: ${BITCOIN_WALLET}` : "Deposit successful via bank");
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(prompt("Withdraw Amount $") || "0");
    if (amount <= 0) return;

    alert("AML compliance verification will be required for withdrawals.");

    const res = await fetch("/api/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, amount }),
    });
    const data = await res.json();
    setUser({ ...user, balance: data.balance });
  };

  const handleInvest = async () => {
    const amount = parseFloat(prompt("Invest Amount $") || "0");
    if (amount <= 0) return;

    const res = await fetch("/api/invest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, amount }),
    });
    const data = await res.json();
    setUser({ ...user, balance: data.balance, invested: data.invested });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {user.email}</h1>
      <p>Balance: ${user.balance.toFixed(2)}</p>
      <p>Invested: ${user.invested.toFixed(2)}</p>

      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
      <button onClick={handleInvest}>Invest</button>

      <div style={{ marginTop: "2rem" }}>
        <h2>Bank Details:</h2>
        <p>{BANK_DETAILS.bank}</p>
        <p>Routing: {BANK_DETAILS.routing}</p>
        <p>SWIFT: {BANK_DETAILS.swift}</p>
        <p>Address: {BANK_DETAILS.address}</p>
        <p>Account #: {BANK_DETAILS.account}</p>
        <p>Name: {BANK_DETAILS.name}</p>

        <h2>Bitcoin Wallet:</h2>
        <p>{BITCOIN_WALLET}</p>
      </div>
    </div>
  );
}