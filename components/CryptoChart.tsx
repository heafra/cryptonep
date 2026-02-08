// components/CryptoChart.tsx
import React from "react";

const data = [40, 55, 48, 70, 62, 80, 90];

export default function CryptoChart() {
  const max = Math.max(...data);

  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>Portfolio Performance</h3>

      <svg width="100%" height="200" viewBox="0 0 300 120">
        <polyline
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          points={data
            .map(
              (value, index) =>
                `${(index / (data.length - 1)) * 300},${
                  120 - (value / max) * 100
                }`
            )
            .join(" ")}
        />
      </svg>

      <p style={{ marginTop: "10px", fontSize: "14px", color: "#94a3b8" }}>
        Simulated crypto growth over time
      </p>
    </div>
  );
}