// Pixel-art backgrounds drawn as SVG. A seeded generator keeps every build identical.

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function PixelGrid({
  color,
  seed = 1,
  cols = 24,
  rows = 8,
  className = "",
}: {
  color: string;
  seed?: number;
  cols?: number;
  rows?: number;
  className?: string;
}) {
  const r = rng(seed);
  const cells: { x: number; y: number; o: number }[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = r();
      // Denser and brighter towards the bottom, like a rising signal.
      if (v < 0.25 + (y / rows) * 0.6) cells.push({ x, y, o: 0.25 + r() * 0.75 });
    }
  }
  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {cells.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x + 0.08} y={c.y + 0.08} width={0.84} height={0.84} fill={color} opacity={c.o} />
      ))}
    </svg>
  );
}

export function PixelBars({
  color,
  seed = 1,
  cols = 28,
  className = "",
}: {
  color: string;
  seed?: number;
  cols?: number;
  className?: string;
}) {
  const r = rng(seed);
  const rows = 10;
  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {Array.from({ length: cols }, (_, x) => {
        const h = 2 + Math.floor(r() * (rows - 2));
        return <rect key={x} x={x + 0.15} y={rows - h} width={0.7} height={h} fill={color} opacity={0.45 + r() * 0.55} />;
      })}
    </svg>
  );
}

// Fixed palette for tiles; hex values so SVG fills work without CSS variables.
export const tileColors = ["#58a6ff", "#f2c94c", "#ffae57", "#d2a8ff", "#f85149", "#63ff86"];
