"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "jatin-os-notes";
const COLORS = [
  "bg-[#fef3c7] text-zinc-900",
  "bg-[#dbeafe] text-zinc-900",
  "bg-[#fce7f3] text-zinc-900",
  "bg-[#dcfce7] text-zinc-900",
  "bg-[#e9d5ff] text-zinc-900",
];

function loadNotes() {
  if (typeof window === "undefined") {
    return [
      {
        id: "welcome",
        title: "Welcome",
        body: "Jot ideas, interview talking points, or todo items here.\nThey stay in this browser.",
        color: 0,
        updatedAt: Date.now(),
      },
    ];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [
        {
          id: "welcome",
          title: "Welcome",
          body: "Jot ideas, interview talking points, or todo items here.\nThey stay in this browser.",
          color: 0,
          updatedAt: Date.now(),
        },
      ];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function Notes() {
  const [notes, setNotes] = useState(loadNotes);
  const [activeId, setActiveId] = useState(() => loadNotes()[0]?.id || null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  const active = notes.find((n) => n.id === activeId) || null;

  const addNote = () => {
    const id = `note-${Date.now()}`;
    const note = {
      id,
      title: "New Note",
      body: "",
      color: notes.length % COLORS.length,
      updatedAt: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setActiveId(id);
  };

  const updateActive = (patch) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeId ? { ...n, ...patch, updatedAt: Date.now() } : n
      )
    );
  };

  const removeActive = () => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== activeId);
      setActiveId(next[0]?.id || null);
      return next;
    });
  };

  return (
    <div className="flex h-full min-h-[360px]">
      <aside className="flex w-40 shrink-0 flex-col border-r border-white/10 bg-black/25 sm:w-48">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <span className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Notes
          </span>
          <button
            type="button"
            aria-label="New note"
            className="rounded-md p-1 text-sky-300 hover:bg-white/10"
            onClick={addNote}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <ul className="flex-1 overflow-auto p-2">
          {notes.map((note) => (
            <li key={note.id}>
              <button
                type="button"
                className={cn(
                  "mb-1 w-full rounded-lg px-2 py-2 text-left transition",
                  activeId === note.id ? "bg-white/15" : "hover:bg-white/8"
                )}
                onClick={() => setActiveId(note.id)}
              >
                <p className="truncate text-sm font-medium text-zinc-100">
                  {note.title || "Untitled"}
                </p>
                <p className="truncate text-[11px] text-zinc-500">
                  {note.body.slice(0, 40) || "Empty note"}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {active ? (
          <>
            <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
              <input
                value={active.title}
                onChange={(e) => updateActive({ title: e.target.value })}
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-zinc-100 outline-none"
                aria-label="Note title"
              />
              <div className="flex gap-1">
                {COLORS.map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    aria-label={`Color ${i + 1}`}
                    className={cn(
                      "h-4 w-4 rounded-full ring-1 ring-black/20",
                      c.split(" ")[0],
                      active.color === i && "ring-2 ring-sky-400"
                    )}
                    onClick={() => updateActive({ color: i })}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Delete note"
                className="rounded-md p-1.5 text-zinc-400 hover:bg-red-500/20 hover:text-red-300"
                onClick={removeActive}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={active.body}
              onChange={(e) => updateActive({ body: e.target.value })}
              placeholder="Start typing…"
              className={cn(
                "min-h-0 flex-1 resize-none p-4 text-sm leading-relaxed outline-none",
                COLORS[active.color] || COLORS[0]
              )}
              aria-label="Note body"
            />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-zinc-500">
            Create a note to get started
          </div>
        )}
      </div>
    </div>
  );
}
