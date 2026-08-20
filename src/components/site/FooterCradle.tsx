"use client";

import {
  Bodies,
  Body,
  Common,
  Composite,
  Composites,
  Constraint,
  Engine,
  Mouse,
  MouseConstraint,
  Runner,
  type Body as MatterBody,
  type Constraint as MatterConstraint,
  type Engine as MatterEngine,
  type MouseConstraint as MatterMouseConstraint,
  type Runner as MatterRunner,
} from "matter-js";
import { useEffect, useRef } from "react";

const TILES = [1, 2, 3, 4, 5, 6, 7] as const;
const CRADLE_COUNT = TILES.length;

/** brm.io mixed demo uses 10×5 — denser pack for the kb↔pm band. */
const MIXED_COLS = 14;
const MIXED_ROWS = 6;
const MIXED_COUNT = MIXED_COLS * MIXED_ROWS;

const STRING_STROKE_DARK = "rgba(255,255,255,0.28)";
const STRING_WIDTH = "1";

type FooterCradleProps = {
  /** dark = Newton's cradle; light = mixed stack (brm.io #mixed). */
  variant?: "dark" | "light";
};

/**
 * Footer physics — cradle on dark footers; mixed stack on light (About / Work).
 * Mixed = Matter.js demo https://brm.io/matter-js/demo/#mixed
 */
export function FooterCradle({ variant = "dark" }: FooterCradleProps) {
  if (variant === "light") return <FooterMixedTiles />;
  return <FooterNewtonsCradle />;
}

function FooterNewtonsCradle() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      layoutCradleStatic(root, bobRefs.current, lineRefs.current, true);
      return;
    }

    type CradleRefs = {
      engine: MatterEngine;
      runner: MatterRunner;
      bodies: MatterBody[];
      constraints: MatterConstraint[];
      onResize: () => void;
    };

    let cradle: CradleRefs | null = null;
    let raf = 0;
    let visible = false;
    let restartTimer = 0;
    let building = false;

    const syncDom = () => {
      if (!cradle) {
        raf = requestAnimationFrame(syncDom);
        return;
      }
      const { bodies, constraints } = cradle;
      for (let i = 0; i < CRADLE_COUNT; i++) {
        const body = bodies[i];
        const bob = bobRefs.current[i];
        const line = lineRefs.current[i];
        const constraint = constraints[i];
        if (!body || !bob || !line || !constraint) continue;

        const size = (body.circleRadius ?? 40) * 2;
        bob.style.width = `${size}px`;
        bob.style.height = `${size}px`;
        bob.style.transform = `translate3d(${body.position.x - size / 2}px, ${body.position.y - size / 2}px, 0)`;

        line.setAttribute("x1", String(constraint.pointA.x));
        line.setAttribute("y1", String(constraint.pointA.y));
        line.setAttribute("x2", String(body.position.x));
        line.setAttribute("y2", String(body.position.y));
      }
      raf = requestAnimationFrame(syncDom);
    };

    const kickLeft = (
      bodies: MatterBody[],
      constraints: MatterConstraint[],
      size: number,
      length: number,
    ) => {
      const left = bodies[0];
      const constraint = constraints[0];
      if (!left || !constraint) return;
      Body.setVelocity(left, { x: 0, y: 0 });
      Body.setAngularVelocity(left, 0);
      Body.setPosition(left, {
        x: constraint.pointA.x - size * 2.05,
        y: constraint.pointA.y + length - size * 1.45,
      });
    };

    const build = () => {
      if (building) return;
      building = true;

      if (cradle) {
        Runner.stop(cradle.runner);
        Composite.clear(cradle.engine.world, false);
        Engine.clear(cradle.engine);
        cradle = null;
      }

      const width = root.clientWidth;
      const height = Math.max(root.clientHeight, 320);
      if (width < 40) {
        building = false;
        return;
      }

      const size = Math.min(69.5, Math.max(28, (width * 0.72) / (CRADLE_COUNT * 1.9)));
      const separation = size * 1.9;
      const yy = 8;
      const length = Math.max(200, height - size - 16);
      const totalSpan = (CRADLE_COUNT - 1) * separation;
      const xx = (width - totalSpan) / 2;

      const engine = Engine.create({
        gravity: { x: 0, y: 1, scale: 0.0012 },
      });

      const bodies: MatterBody[] = [];
      const constraints: MatterConstraint[] = [];
      const composite = Composite.create({ label: "FooterNewtonsCradle" });

      for (let i = 0; i < CRADLE_COUNT; i++) {
        const cx = xx + i * separation;
        const circle = Bodies.circle(cx, yy + length, size, {
          inertia: Infinity,
          restitution: 1,
          friction: 0,
          frictionAir: 0.0001,
          slop: size * 0.02,
          label: `tile-${TILES[i]}`,
        });
        const constraint = Constraint.create({
          pointA: { x: cx, y: yy },
          bodyB: circle,
          stiffness: 1,
          length,
        });
        Composite.add(composite, [circle, constraint]);
        bodies.push(circle);
        constraints.push(constraint);
      }

      Composite.add(engine.world, composite);
      kickLeft(bodies, constraints, size, length);

      const runner = Runner.create();
      if (visible) Runner.run(runner, engine);

      cradle = {
        engine,
        runner,
        bodies,
        constraints,
        onResize: () => {
          build();
          if (visible && cradle) Runner.run(cradle.runner, cradle.engine);
        },
      };

      window.clearInterval(restartTimer);
      restartTimer = window.setInterval(() => {
        if (!cradle || !visible) return;
        const left = cradle.bodies[0];
        const right = cradle.bodies[CRADLE_COUNT - 1];
        if (!left || !right) return;
        const speed =
          Math.hypot(left.velocity.x, left.velocity.y) +
          Math.hypot(right.velocity.x, right.velocity.y);
        if (speed < 0.15) kickLeft(cradle.bodies, cradle.constraints, size, length);
      }, 9000);

      building = false;
    };

    build();
    raf = requestAnimationFrame(syncDom);

    let resizeTimer = 0;
    const onWinResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => cradle?.onResize(), 180);
    };
    window.addEventListener("resize", onWinResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        if (!cradle) return;
        if (visible) Runner.run(cradle.runner, cradle.engine);
        else Runner.stop(cradle.runner);
      },
      { threshold: 0.08 },
    );
    io.observe(root);

    return () => {
      window.removeEventListener("resize", onWinResize);
      window.clearTimeout(resizeTimer);
      window.clearInterval(restartTimer);
      io.disconnect();
      cancelAnimationFrame(raf);
      if (cradle) {
        Runner.stop(cradle.runner);
        Composite.clear(cradle.engine.world, false);
        Engine.clear(cradle.engine);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="footer-cradle footer-cradle--cradle pointer-events-none absolute inset-x-0 top-0 bottom-[4.75rem] z-0 w-full select-none md:bottom-[5.25rem]"
      aria-hidden
    >
      <svg
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
        aria-hidden
      >
        {TILES.map((n) => (
          <line
            key={`line-${n}`}
            ref={(el) => {
              lineRefs.current[n - 1] = el;
            }}
            stroke={STRING_STROKE_DARK}
            strokeWidth={STRING_WIDTH}
            strokeLinecap="round"
          />
        ))}
      </svg>
      {TILES.map((n, i) => (
        <div
          key={n}
          ref={(el) => {
            bobRefs.current[i] = el;
          }}
          className="footer-cradle__bob absolute left-0 top-0 will-change-transform"
          style={{ width: 96, height: 96 }}
        >
          <img
            src={`/hero/tile-${n}.png`}
            alt=""
            width={139}
            height={139}
            decoding="async"
            draggable={false}
            className="pointer-events-none size-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Mixed shapes — faithful to brm.io/matter-js/demo/#mixed (Composites.stack + walls + mouse),
 * with brand tiles. Pit is the centered flex slot between kb / pm.
 */
function FooterMixedTiles() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      layoutMixedStatic(root, tileRefs.current);
      return;
    }

    type SimRefs = {
      engine: MatterEngine;
      runner: MatterRunner;
      bodies: MatterBody[];
      sizes: number[];
      mouseConstraint: MatterMouseConstraint;
      onResize: () => void;
    };

    let sim: SimRefs | null = null;
    let raf = 0;
    let visible = false;
    let building = false;

    const hideTiles = () => {
      for (const el of tileRefs.current) {
        if (!el) continue;
        el.style.opacity = "0";
        el.style.transform = "translate3d(-9999px, 0, 0)";
      }
    };

    const syncDom = () => {
      if (!sim) {
        raf = requestAnimationFrame(syncDom);
        return;
      }
      for (let i = 0; i < sim.bodies.length; i++) {
        const body = sim.bodies[i];
        const el = tileRefs.current[i];
        const size = sim.sizes[i];
        if (!body || !el || !size) continue;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.opacity = "1";
        el.style.transform = `translate3d(${body.position.x - size / 2}px, ${body.position.y - size / 2}px, 0) rotate(${body.angle}rad)`;
      }
      raf = requestAnimationFrame(syncDom);
    };

    const destroySim = (s: SimRefs) => {
      Runner.stop(s.runner);
      Mouse.clearSourceEvents(s.mouseConstraint.mouse);
      Composite.clear(s.engine.world, false);
      Engine.clear(s.engine);
    };

    const build = () => {
      if (building) return;
      building = true;
      hideTiles();

      if (sim) {
        destroySim(sim);
        sim = null;
      }

      const width = root.clientWidth;
      const height = root.clientHeight;
      if (width < 40 || height < 40) {
        building = false;
        return;
      }

      // Same gravity feel as the demo (Matter default scale)
      const engine = Engine.create();
      const wallT = 50;
      const wallOpts = { isStatic: true };

      // Walls like the demo — box edges of this pit
      const walls = [
        Bodies.rectangle(width / 2, -wallT / 2, width + wallT * 2, wallT, wallOpts),
        Bodies.rectangle(width / 2, height + wallT / 2, width + wallT * 2, wallT, wallOpts),
        Bodies.rectangle(width + wallT / 2, height / 2, wallT, height + wallT * 2, wallOpts),
        Bodies.rectangle(-wallT / 2, height / 2, wallT, height + wallT * 2, wallOpts),
      ];

      // Tile size so MIXED_COLS × MIXED_ROWS fills the pit (Figma packed block)
      const size = Math.min(
        52,
        Math.max(28, Math.min(width / MIXED_COLS, height / MIXED_ROWS) * 0.98),
      );
      const stackW = MIXED_COLS * size;
      const stackH = MIXED_ROWS * size;
      // Center the stack in the pit (demo starts at 20,20 — we center)
      const startX = (width - stackW) / 2 + size / 2;
      const startY = Math.max(4, (height - stackH) / 2 - size);

      // Composites.stack — same API as Example.mixed
      const stack = Composites.stack(
        startX,
        startY,
        MIXED_COLS,
        MIXED_ROWS,
        0,
        0,
        (x: number, y: number) => {
          const s = Common.random(size * 0.92, size);
          const chamfer =
            Common.random() > 0.3 ? { radius: Math.min(12, s * 0.22) } : undefined;
          return Bodies.rectangle(x, y, s, s, {
            chamfer,
            restitution: 0.25,
            friction: 0.1,
            frictionAir: 0.012,
            density: 0.001,
            label: `tile-${TILES[Math.floor(Common.random(0, TILES.length))]}`,
          });
        },
      );

      const bodies = Composite.allBodies(stack);
      const sizes = bodies.map((b) => {
        const bb = b.bounds;
        return Math.max(bb.max.x - bb.min.x, bb.max.y - bb.min.y);
      });

      Composite.add(engine.world, [stack, ...walls]);

      const mouse = Mouse.create(root);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });
      Composite.add(engine.world, mouseConstraint);

      const runner = Runner.create();
      if (visible) Runner.run(runner, engine);

      sim = {
        engine,
        runner,
        bodies,
        sizes,
        mouseConstraint,
        onResize: () => {
          build();
          if (visible && sim) Runner.run(sim.runner, sim.engine);
        },
      };

      building = false;
    };

    build();
    raf = requestAnimationFrame(syncDom);

    let resizeTimer = 0;
    const onWinResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => sim?.onResize(), 180);
    };
    window.addEventListener("resize", onWinResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        if (!sim) return;
        if (visible) Runner.run(sim.runner, sim.engine);
        else Runner.stop(sim.runner);
      },
      { threshold: 0.05 },
    );
    io.observe(root);

    return () => {
      window.removeEventListener("resize", onWinResize);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      cancelAnimationFrame(raf);
      if (sim) destroySim(sim);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="footer-cradle footer-cradle--mixed absolute inset-0 z-0 w-full select-none"
      aria-hidden
    >
      {Array.from({ length: MIXED_COUNT }, (_, i) => {
        const n = TILES[i % TILES.length];
        return (
          <div
            key={`${n}-${i}`}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className="footer-cradle__bob absolute left-0 top-0 overflow-hidden rounded-[18%] will-change-transform"
            style={{
              width: 40,
              height: 40,
              opacity: 0,
              transform: "translate3d(-9999px, 0, 0)",
            }}
          >
            <img
              src={`/hero/tile-${n}.png`}
              alt=""
              width={96}
              height={96}
              decoding="async"
              draggable={false}
              className="pointer-events-none size-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

function layoutCradleStatic(
  root: HTMLDivElement,
  bobs: (HTMLDivElement | null)[],
  lines: (SVGLineElement | null)[],
  swungLeft: boolean,
) {
  const width = root.clientWidth || 800;
  const height = Math.max(root.clientHeight, 320);
  const size = Math.min(96, Math.max(40, (width * 0.72) / (CRADLE_COUNT * 1.9)));
  const separation = size * 1.9;
  const yy = 8;
  const length = Math.max(200, height - size - 16);
  const totalSpan = (CRADLE_COUNT - 1) * separation;
  const xx = (width - totalSpan) / 2;

  for (let i = 0; i < CRADLE_COUNT; i++) {
    const cx = xx + i * separation;
    let bx = cx;
    let by = yy + length;
    if (swungLeft && i === 0) {
      bx = cx - size * 2.05;
      by = yy + length - size * 1.45;
    }
    const bob = bobs[i];
    const line = lines[i];
    if (bob) {
      bob.style.width = `${size}px`;
      bob.style.height = `${size}px`;
      bob.style.transform = `translate3d(${bx - size / 2}px, ${by - size / 2}px, 0)`;
    }
    if (line) {
      line.setAttribute("x1", String(cx));
      line.setAttribute("y1", String(yy));
      line.setAttribute("x2", String(bx));
      line.setAttribute("y2", String(by));
    }
  }
}

function layoutMixedStatic(root: HTMLDivElement, tiles: (HTMLDivElement | null)[]) {
  const width = root.clientWidth || 400;
  const height = Math.max(root.clientHeight, 120);
  const size = Math.min(width / MIXED_COLS, height / MIXED_ROWS) * 0.96;
  const stackW = MIXED_COLS * size;
  const stackH = MIXED_ROWS * size;
  const originX = (width - stackW) / 2;
  const originY = (height - stackH) / 2;

  for (let i = 0; i < MIXED_COUNT; i++) {
    const el = tiles[i];
    if (!el) continue;
    const col = i % MIXED_COLS;
    const row = Math.floor(i / MIXED_COLS);
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.opacity = "1";
    el.style.transform = `translate3d(${originX + col * size}px, ${originY + row * size}px, 0)`;
  }
}
