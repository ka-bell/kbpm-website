const metrics = [
  { value: "7", label: "Years as a company" },
  { value: "500K+", label: "Daily users on our biggest platform" },
  { value: "31", label: "Platforms we still maintain today" },
];

export function ProofStrip() {
  return (
    <section className="border-y border-border">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {metrics.map((m, i) => (
          <div
            key={m.value}
            className={`px-6 py-10 md:px-10 md:py-14 ${
              i < metrics.length - 1 ? "border-b border-border md:border-b-0 md:border-r" : ""
            }`}
          >
            <p className="eyebrow">Metric / 0{i + 1}</p>
            <p
              className="font-display mt-6 text-foreground"
              style={{
                fontSize: "clamp(3.5rem, 7vw, 6rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.05em",
                fontWeight: 500,
              }}
            >
              {m.value}
            </p>
            <div className="mt-6 border-t border-border pt-4">
              <p className="text-sm text-foreground">{m.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
