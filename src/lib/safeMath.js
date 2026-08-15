/**
 * Safely evaluate basic math expressions.
 * Supports + - * / % ^ ( ), decimals, and functions: sqrt, abs, sin, cos, tan, log, ln, round, floor, ceil, pi, e
 */
export function isMathExpression(input) {
  const s = input.trim();
  if (!s) return false;
  // Pure math-looking string (digits/operators/functions) — not a known word command alone
  if (/^[a-zA-Z_]+$/.test(s) && !/^(pi|e)$/i.test(s)) return false;
  return /^[\d\s+\-*/%^().,a-zA-Z_]+$/.test(s) && /[\d)]/.test(s) && /[+\-*/%^]|sqrt|abs|sin|cos|tan|log|ln|round|floor|ceil|pi|\be\b/i.test(s);
}

export function evaluateMath(expression) {
  let expr = expression.trim().toLowerCase();

  expr = expr
    .replace(/\bpi\b/g, String(Math.PI))
    .replace(/\be\b/g, String(Math.E))
    .replace(/\^/g, "**")
    .replace(/√\s*\(/g, "sqrt(");

  // Allow only safe tokens
  if (!/^[\d\s+\-*/%().,*a-z_]+$/.test(expr)) {
    throw new Error("Invalid characters in expression");
  }

  const forbidden = /(?:function|=>|while|for|eval|import|window|document|global|process|require|constructor|prototype)/i;
  if (forbidden.test(expr)) {
    throw new Error("Expression not allowed");
  }

  const fns = {
    sqrt: Math.sqrt,
    abs: Math.abs,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    log: Math.log10,
    ln: Math.log,
    round: Math.round,
    floor: Math.floor,
    ceil: Math.ceil,
    min: Math.min,
    max: Math.max,
  };

  // Safe evaluation without exposing scope
  const fn = new Function(
    ...Object.keys(fns),
    `"use strict"; return (${expr});`
  );

  const result = fn(...Object.values(fns));

  if (typeof result !== "number" || !Number.isFinite(result)) {
    throw new Error("Result is not a finite number");
  }

  // Trim floating noise
  const rounded = Math.round(result * 1e12) / 1e12;
  return rounded;
}
