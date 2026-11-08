"use client";

import { useEffect, useRef } from "react";

type Mote = { x: number; y: number; r: number; vx: number; vy: number; phase: number; speed: number };

/**
 * Golden motes drifting up through Lucid Saga’s showcase, as on its own website (LucidSaga_Web,
 * src/components/Fireflies.tsx), where they echo the gate in the app’s icon.
 * Drawn on a canvas, paused while off screen or in a background tab, and left out entirely for
 * visitors who ask for reduced motion.
 */
export function Fireflies({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // One soft glow, drawn once and stamped for every mote.
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const spriteContext = sprite.getContext("2d");
    if (!spriteContext) return;
    const gradient = spriteContext.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 236, 190, 1)");
    gradient.addColorStop(0.18, "rgba(246, 210, 140, 0.85)");
    gradient.addColorStop(0.45, "rgba(227, 182, 107, 0.25)");
    gradient.addColorStop(1, "rgba(227, 182, 107, 0)");
    spriteContext.fillStyle = gradient;
    spriteContext.fillRect(0, 0, 64, 64);

    let width = 0;
    let height = 0;
    let motes: Mote[] = [];
    let frame = 0;
    let visible = true;
    let last = performance.now();

    const spawn = (anywhere: boolean): Mote => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 10,
      r: 1 + Math.random() * 2.6,
      vx: (Math.random() - 0.5) * 6,
      vy: -(4 + Math.random() * 12),
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.4,
    });

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(70, Math.round((width * height) / 16000));
      motes = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (now: number) => {
      frame = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      for (const mote of motes) {
        mote.phase += dt * mote.speed;
        mote.x += (mote.vx + Math.sin(mote.phase * 1.3) * 8) * dt;
        mote.y += mote.vy * dt;
        if (mote.y < -20 || mote.x < -20 || mote.x > width + 20) Object.assign(mote, spawn(false));
        const flicker = 0.35 + 0.65 * Math.pow(Math.sin(mote.phase) * 0.5 + 0.5, 2);
        const fadeTop = Math.min(1, mote.y / (height * 0.25));
        context.globalAlpha = flicker * Math.max(fadeTop, 0);
        const size = mote.r * 7;
        context.drawImage(sprite, mote.x - size / 2, mote.y - size / 2, size, size);
      }
      if (visible) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame && visible && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    start();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
