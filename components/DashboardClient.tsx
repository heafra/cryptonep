"use client";

import { useSession, signOut } from "next-auth/react";

export default function DashboardClient() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <p>
        Logged in as <strong>{session.user?.email}</strong>
      </p>

      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

