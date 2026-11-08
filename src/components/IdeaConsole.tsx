"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TaskMark } from "./Brand";

type Demo = {
  label: string;
  say: string;
  act: string;
  taskflow: { input: string; output: string; tasks: string[] };
  lucid: { input: string; output: string; story: string };
};

const scenes = ["taskflow", "lucid"] as const;
type Scene = (typeof scenes)[number];
/** Milliseconds per typed character, then how long the answer stays before the next scene. */
const TYPE_MS = 38;
const HOLD_MS = 5200;

/**
 * The hero's moving picture: a phrase is typed in, and one of our products answers it. TaskFlow
 * turns it into tasks; Lucid Saga continues the story. It alternates between the two while it is
 * on screen, and either can be picked with its tab. Under reduced motion it shows each answer
 * whole and only changes when a tab is picked.
 */
export function IdeaConsole({ demo }: { demo: Demo }) {
  const [scene, setScene] = useState<Scene>("taskflow");
  const [typed, setTyped] = useState<number | null>(null);
  const [auto, setAuto] = useState(true);
  const [tick, setTick] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  const input = demo[scene].input;
  const done = typed === null || typed >= input.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
      return;
    }
    setTyped(0);
    const element = box.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typed === null) return;
    // Off screen or in a background tab, wait and look again instead of moving on.
    const paused = !visible.current || document.hidden;
    const timer = window.setTimeout(
      () => {
        if (paused) setTick((value) => value + 1);
        else if (typed < input.length) setTyped(typed + 1);
        else if (auto) {
          setScene((current) => (current === "taskflow" ? "lucid" : "taskflow"));
          setTyped(0);
        }
      },
      paused ? 600 : typed < input.length ? TYPE_MS : HOLD_MS,
    );
    return () => window.clearTimeout(timer);
  }, [typed, input.length, auto, scene, tick]);

  function pick(next: Scene) {
    setAuto(false);
    if (next === scene) return;
    setScene(next);
    setTyped((value) => (value === null ? null : 0));
  }

  const shown = typed === null ? input : input.slice(0, typed);
  return (
    <div className="console" ref={box} data-scene={scene} data-done={done || undefined}>
      <div className="console-bar">
        <span className="console-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="console-tabs" role="group" aria-label={demo.label}>
          {scenes.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={scene === name}
              onClick={() => pick(name)}
              className={`console-tab tab-${name}`}
            >
              {name === "taskflow" ? "TaskFlow" : "Lucid Saga"}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only">
        {scene === "taskflow"
          ? `TaskFlow. ${demo.say}: “${input}” ${demo.taskflow.output}: ${demo.taskflow.tasks.join(", ")}.`
          : `Lucid Saga. ${demo.act}: “${input}” ${demo.lucid.story}`}
      </p>

      <div className="console-body" aria-hidden="true">
        <div className="console-input">
          <span className="console-prompt">{scene === "taskflow" ? demo.say : demo.act}</span>
          <p>
            {shown}
            <span className="caret" />
          </p>
          <span className="console-wave">
            {Array.from({ length: 5 }, (_, i) => (
              <i key={i} />
            ))}
          </span>
        </div>

        {scene === "taskflow" ? (
          <div className="console-output output-taskflow" key="taskflow">
            <div className="output-head">
              <TaskMark />
              <span>{demo.taskflow.output}</span>
            </div>
            <ul>
              {demo.taskflow.tasks.map((task, index) => (
                <li key={task} style={{ "--i": index } as React.CSSProperties}>
                  <span className="check" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="console-output output-lucid" key="lucid">
            <div className="output-art">
              <Image src="/images/well-at-dusk.webp" alt="" width={1200} height={670} />
            </div>
            <div className="output-story">
              <span>{demo.lucid.output}</span>
              <p>{demo.lucid.story}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
