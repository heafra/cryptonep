import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "50px", textAlign: "center" }}>
      <h1>Welcome to CryptoNep 🚀</h1>
      <div style={{ marginTop: 20 }}>
        <Link href="/login">
          <button style={{ marginRight: 10 }}>Login</button>
        </Link>
        <Link href="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </main>
  );
}