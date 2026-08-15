"use client";

import { Download, ExternalLink, FileText } from "lucide-react";

const RESUME_PATH = "/resume.pdf";
const RESUME_FILENAME = "Jatin_Gupta_Resume.pdf";

export default function Resume() {
  return (
    <div className="flex h-full min-h-[360px] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
        <FileText className="h-4 w-4 text-sky-300" />
        <span className="mr-auto truncate text-sm text-zinc-300">{RESUME_FILENAME}</span>
        <a
          href={RESUME_PATH}
          download={RESUME_FILENAME}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-zinc-200 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </a>
        <a
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500/20 px-2.5 py-1.5 text-xs text-sky-100 transition hover:bg-sky-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open in New Tab
        </a>
      </div>

      <div className="min-h-0 flex-1 bg-zinc-900/50 p-2">
        <iframe
          title="Jatin Gupta Resume"
          src={`${RESUME_PATH}#view=FitH`}
          className="h-full min-h-[320px] w-full rounded-lg border border-white/10 bg-white"
        />
      </div>
    </div>
  );
}
