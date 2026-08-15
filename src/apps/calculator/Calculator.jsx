"use client";

import { useState } from "react";
import { Delete } from "lucide-react";
import { evaluateMath } from "@/lib/safeMath";
import { cn } from "@/lib/utils";

const BUTTONS = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];

function toExpr(display) {
  return display
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-");
}

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [justEvaluated, setJustEvaluated] = useState(false);

  const press = (key) => {
    if (key === "C") {
      setDisplay("0");
      setJustEvaluated(false);
      return;
    }

    if (key === "⌫") {
      setDisplay((d) => (d.length <= 1 ? "0" : d.slice(0, -1)));
      setJustEvaluated(false);
      return;
    }

    if (key === "±") {
      setDisplay((d) => {
        if (d === "0" || d === "Error") return d;
        return d.startsWith("-") ? d.slice(1) : `-${d}`;
      });
      return;
    }

    if (key === "=") {
      try {
        const result = evaluateMath(toExpr(display));
        setDisplay(String(result));
        setJustEvaluated(true);
      } catch {
        setDisplay("Error");
        setJustEvaluated(true);
      }
      return;
    }

    if (key === "%") {
      try {
        const result = evaluateMath(`(${toExpr(display)})/100`);
        setDisplay(String(result));
        setJustEvaluated(true);
      } catch {
        setDisplay("Error");
      }
      return;
    }

    setDisplay((d) => {
      if (d === "Error" || (justEvaluated && /[0-9.]/.test(key))) {
        setJustEvaluated(false);
        return key === "." ? "0." : key;
      }
      if (justEvaluated && /[÷×−+]/.test(key)) {
        setJustEvaluated(false);
        return `${d}${key}`;
      }
      if (d === "0" && key !== ".") return key;
      return `${d}${key}`;
    });
  };

  return (
    <div className="flex h-full min-h-[380px] flex-col bg-[#1c1c1e] p-3">
      <div className="mb-3 flex min-h-[72px] items-end justify-end rounded-2xl bg-black/40 px-4 py-3">
        <p className="w-full break-all text-right font-mono text-3xl font-light tracking-tight text-white sm:text-4xl">
          {display}
        </p>
      </div>

      <div className="grid flex-1 grid-cols-4 gap-2">
        {BUTTONS.flat().map((key) => {
          const isOp = ["÷", "×", "−", "+", "="].includes(key);
          const isFn = ["C", "±", "%", "⌫"].includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => press(key)}
              className={cn(
                "rounded-2xl text-xl font-medium transition active:scale-95",
                key === "0" ? "col-span-1" : "",
                isOp
                  ? "bg-[#ff9f0a] text-white hover:bg-[#ffb340]"
                  : isFn
                    ? "bg-[#636366] text-white hover:bg-[#7a7a7e]"
                    : "bg-[#505055] text-white hover:bg-[#636366]"
              )}
              aria-label={`Calculator ${key}`}
            >
              {key === "⌫" ? <Delete className="mx-auto h-5 w-5" /> : key}
            </button>
          );
        })}
      </div>
    </div>
  );
}
