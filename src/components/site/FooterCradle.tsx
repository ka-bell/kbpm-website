"use client";

import {
  Bodies,
  Body,
  Composite,
  Constraint,
  Engine,
  Runner,
  type Body as MatterBody,
  type Constraint as MatterConstraint,
} from "matter-js";
import { useEffect, useRef } from "react";

const TILES = [1, 2, 3, 4, 5, 6, 7] as const;
const COUNT = TILES.length;

/** Thin light string — Figma cradle hangs behind footer copy */
const STRING_STROKE = "rgba(255,255,255,0.28)";
const STRING_WIDTH = "1";

type CradleRefs = {
  engine: Engine;
  runner: Runner;
  bodies: MatterBody[];
  constraints: MatterConstraint[];
  onResize: () => void;
};

/**
 * Newton's Cradle — Matter.js physics (brm.io/matter-js demo),
 * strings run the full footer height behind copy (Figma 3626:4091).
 */
export function FooterCradle() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mq.matches) {
      layoutStatic(root, bobRefs.current, lineRefs.current, true);
      return;
    }

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
      for (let i = 0; i < COUNT; i++) {
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
        destroyCradle(cradle);
        cradle = null;
      }

      const width = root.clientWidth;
      const height = Math.max(root.clientHeight, 320);
      if (width < 40) {
        building = false;
        return;
      }

      const size = Math.min(69.5, Math.max(28, (width * 0.72) / (COUNT * 1.9)));
      const separation = size * 1.9;
      // Anchor near the top of the footer so strings pass behind copy
      const yy = 8;
      const length = Math.max(200, height - size - 16);
      const totalSpan = (COUNT - 1) * separation;
      const xx = (width - totalSpan) / 2;

      const engine = Engine.create({
        gravity: { x: 0, y: 1, scale: 0.0012 },
      });

      const bodies: MatterBody[] = [];
      const constraints: MatterConstraint[] = [];
      const composite = Composite.create({ label: "FooterNewtonsCradle" });

      for (let i = 0; i < COUNT; i++) {
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
        const right = cradle.bodies[COUNT - 1];
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
      if (cradle) destroyCradle(cradle);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="footer-cradle pointer-events-none absolute inset-x-0 top-0 bottom-[4.75rem] z-0 w-full select-none md:bottom-[5.25rem]"
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
            stroke={STRING_STROKE}
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

function layoutStatic(
  root: HTMLDivElement,
  bobs: (HTMLDivElement | null)[],
  lines: (SVGLineElement | null)[],
  swungLeft: boolean,
) {
  const width = root.clientWidth || 800;
  const height = Math.max(root.clientHeight, 320);
  const size = Math.min(96, Math.max(40, (width * 0.72) / (COUNT * 1.9)));
  const separation = size * 1.9;
  const yy = 8;
  const length = Math.max(200, height - size - 16);
  const totalSpan = (COUNT - 1) * separation;
  const xx = (width - totalSpan) / 2;

  for (let i = 0; i < COUNT; i++) {
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

function destroyCradle(cradle: CradleRefs) {
  Runner.stop(cradle.runner);
  Composite.clear(cradle.engine.world, false);
  Engine.clear(cradle.engine);
}
