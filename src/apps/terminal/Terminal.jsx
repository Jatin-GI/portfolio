"use client";

import { useEffect, useRef, useState } from "react";
import profile from "@/data/profile";
import projects from "@/data/projects";
import skills from "@/data/skills";
import experience from "@/data/experience";
import social from "@/data/social";
import { useWindowStore } from "@/store/windowStore";
import { evaluateMath, isMathExpression } from "@/lib/safeMath";

const PROMPT = "jatin@portfolio ~ %";

const COMMANDS = [
  "help",
  "about",
  "projects",
  "skills",
  "experience",
  "education",
  "contact",
  "resume",
  "github",
  "linkedin",
  "clear",
  "open",
  "calc",
  "echo",
  "date",
  "whoami",
  "neofetch",
  "ls",
  "pwd",
  "fortune",
  "history",
  "matrix",
  "joke",
];

const FORTUNES = [
  "Ship small. Iterate fast. Document later (but still document).",
  "The best resume project is the one you can demo in 60 seconds.",
  "RBAC: because not everyone should delete production.",
  "PostgreSQL indexes are free performance… until they aren't.",
  "Coffee → code → commit → deploy → panic → fix → coffee.",
  "Type 'calc 2+2' if you need a confidence boost.",
];

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, walks up to two tables and asks: can I JOIN you?",
  "There are only 10 kinds of people: those who understand binary and those who don't.",
];

const HELP_TEXT = `Available commands:

  Portfolio
    about, projects, skills, experience, education
    contact, resume, github, linkedin

  System
    help, clear, ls, pwd, whoami, date, neofetch
    open <app>     Open an application
    echo <text>    Print text
    history        Show command history
    fortune / joke Fun extras

  Math
    calc <expr>    Evaluate expression
    Or type math directly:  (12+8)/4  |  sqrt(144)  |  2^10

  Tips
    Tab            Autocomplete commands
    ↑ / ↓          Command history
    Ctrl + L       Clear screen`;

const APPS = [
  "about",
  "projects",
  "experience",
  "skills",
  "resume",
  "terminal",
  "contact",
  "settings",
  "calculator",
  "notes",
];

function runCommand(input, { openWindow, history }) {
  const raw = input.trim();
  if (!raw) return { lines: [] };

  // Direct math expression
  if (isMathExpression(raw) && !COMMANDS.includes(raw.split(/\s+/)[0].toLowerCase())) {
    try {
      const result = evaluateMath(raw);
      return { lines: [`= ${result}`] };
    } catch (err) {
      return { lines: [`Math error: ${err.message}`] };
    }
  }

  const [cmd, ...args] = raw.split(/\s+/);
  const command = cmd.toLowerCase();
  const rest = raw.slice(cmd.length).trim();

  switch (command) {
    case "help":
    case "?":
      return { lines: HELP_TEXT.split("\n") };

    case "about":
      return {
        lines: [
          profile.name,
          profile.title,
          profile.tagline,
          "",
          profile.education,
          profile.educationDetails,
          "",
          profile.introduction,
        ],
      };

    case "projects":
      openWindow("projects");
      return {
        lines: [
          "Opening Projects…",
          "",
          ...projects.map((p, i) => `${i + 1}. ${p.name}  →  ${p.liveUrl || p.githubUrl}`),
        ],
      };

    case "skills":
      return {
        lines: skills.flatMap((group) => [
          `${group.category}:`,
          ...group.items.map((item) => `  • ${item.name}`),
          "",
        ]),
      };

    case "experience":
      openWindow("experience");
      return {
        lines: experience.flatMap((item) => [
          `${item.position} @ ${item.company}`,
          `  ${item.duration}`,
          "",
        ]),
      };

    case "education":
      return {
        lines: [
          profile.education,
          profile.educationDetails,
          `Location: ${profile.location}`,
        ],
      };

    case "contact":
      openWindow("contact");
      return {
        lines: [
          `Email: ${profile.email}`,
          `Phone: ${profile.phone}`,
          `GitHub: ${social.github}`,
          `LinkedIn: ${social.linkedin}`,
        ],
      };

    case "resume":
      openWindow("resume");
      return { lines: ["Opening Resume…"] };

    case "github":
      if (typeof window !== "undefined") {
        window.open(social.github, "_blank", "noopener,noreferrer");
      }
      return { lines: [`Opening ${social.github}`] };

    case "linkedin":
      if (typeof window !== "undefined") {
        window.open(social.linkedin, "_blank", "noopener,noreferrer");
      }
      return { lines: [`Opening ${social.linkedin}`] };

    case "clear":
    case "cls":
      return { clear: true, lines: [] };

    case "echo":
      return { lines: [rest || ""] };

    case "date":
      return { lines: [new Date().toString()] };

    case "pwd":
      return { lines: ["/Users/jatin/portfolio"] };

    case "whoami":
      return { lines: [profile.name, profile.title, profile.location] };

    case "ls":
      return {
        lines: [
          "Applications/",
          ...APPS.map((a) => `  ${a}`),
          "",
          "Tip: open <app>  e.g. open calculator",
        ],
      };

    case "neofetch":
      return {
        lines: [
          "          .:'",
          "      __ :'__",
          "   .'`__`-__V",
          "  :  /#-#-#\\  :     jatin@portfolio",
          "  : /#-#-#-#\\ :     ---------------",
          "   V#-#-#-#-#V      OS: Jatin OS (Web)",
          "    \\#-#-#-#/       Host: Portfolio Desktop",
          "     \\#-#-#/        Shell: jatin-sh",
          "      \\###/         Theme: macOS-inspired",
          "       `\"`          CPU: Full-Stack Energy",
          `                    Projects: ${projects.length}`,
          `                    Location: ${profile.location}`,
        ],
      };

    case "fortune":
      return {
        lines: [FORTUNES[Math.floor(Math.random() * FORTUNES.length)]],
      };

    case "joke":
      return { lines: [JOKES[Math.floor(Math.random() * JOKES.length)]] };

    case "history":
      return {
        lines: history.length
          ? history.map((h, i) => `  ${i + 1}  ${h}`)
          : ["(no history yet)"],
      };

    case "matrix":
      return {
        lines: [
          "Wake up, Neo...",
          "The Matrix has you...",
          "Follow the white rabbit.",
          "",
          "(Just kidding — open projects instead.)",
        ],
      };

    case "calc": {
      if (!rest) {
        return {
          lines: [
            "Usage: calc <expression>",
            "Examples:",
            "  calc 2+2",
            "  calc (15-3)*4",
            "  calc sqrt(144)",
            "  calc 2^10",
          ],
        };
      }
      try {
        return { lines: [`= ${evaluateMath(rest)}`] };
      } catch (err) {
        return { lines: [`Math error: ${err.message}`] };
      }
    }

    case "open": {
      const app = (args[0] || "").toLowerCase();
      if (!APPS.includes(app)) {
        return {
          lines: [
            `Unknown app: ${args[0] || ""}`,
            `Try: ${APPS.join(", ")}`,
          ],
        };
      }
      openWindow(app);
      return { lines: [`Opened ${app}`] };
    }

    default:
      // Fallback: try math even if it looked like a command
      if (isMathExpression(raw)) {
        try {
          return { lines: [`= ${evaluateMath(raw)}`] };
        } catch {
          // fall through
        }
      }
      return {
        lines: [
          `Command not found: ${command}`,
          "Type 'help' for commands, or try math like 3*(4+5).",
        ],
      };
  }
}

export default function Terminal() {
  const openWindow = useWindowStore((s) => s.openWindow);
  const pushNotification = useWindowStore((s) => s.pushNotification);
  const [lines, setLines] = useState([
    "( ´ ▽ ` )ﾉ  Hey, you found the terminal!",
    "Type 'help' to get started.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, input]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (value) => {
    const entry = value.trim();
    const echo = `${PROMPT} ${value}`;
    const result = runCommand(entry, { openWindow, history });

    if (result.clear) {
      setLines([]);
    } else {
      setLines((prev) => [...prev, echo, ...result.lines, ""]);
    }

    if (entry) {
      setHistory((prev) => [...prev, entry]);
      if (entry.toLowerCase() === "resume" || entry.toLowerCase().startsWith("open resume")) {
        pushNotification({
          type: "success",
          title: "Resume",
          message: "Resume window opened",
        });
      }
    }
    setHistoryIndex(-1);
    setInput("");
  };

  const autocomplete = () => {
    const partial = input.trim().toLowerCase();
    if (!partial || partial.includes(" ")) return;
    const matches = COMMANDS.filter((c) => c.startsWith(partial));
    if (matches.length === 1) {
      setInput(matches[0] + " ");
    } else if (matches.length > 1) {
      setLines((prev) => [...prev, `${PROMPT} ${input}`, matches.join("  "), ""]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      autocomplete();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      submit(input);
      return;
    }

    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setLines([]);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex =
        historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] || "");
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex] || "");
      }
    }
  };

  return (
    <div
      className="flex h-full min-h-[280px] flex-col bg-[#1c1c1e] p-3 font-mono text-[13px] leading-relaxed text-zinc-100"
      onClick={() => inputRef.current?.focus()}
      role="application"
      aria-label="Terminal"
    >
      <div className="mac-scroll min-h-0 flex-1 overflow-auto whitespace-pre-wrap break-words">
        {lines.map((line, i) => (
          <div key={`${i}-${line.slice(0, 24)}`}>{line || "\u00A0"}</div>
        ))}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-emerald-400">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-w-0 flex-1 bg-transparent text-zinc-100 caret-sky-300 outline-none"
            aria-label="Terminal input"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <span className="terminal-cursor h-4 w-2 bg-sky-300/80" aria-hidden />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
