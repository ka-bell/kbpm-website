const metrics = [
  { value: "MVP", label: "Video publishing platform launched", client: "SpilNews" },
  { value: "2", label: "Live destination experiences", client: "HopPlay" },
  { value: "+85%", label: "Team hours saved", client: "Academion" },
];

export function ProofStrip() {
  return (
    <section className="border-y border-border">
      {/* Metrics */}
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
            <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
              <p className="text-sm text-foreground">{m.label}</p>
              <p className="font-mono-label text-muted-foreground">{m.client}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
