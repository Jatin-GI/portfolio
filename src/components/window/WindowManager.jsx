"use client";

import Window from "@/components/window/Window";
import About from "@/apps/about/About";
import Projects from "@/apps/projects/Projects";
import ProjectDetails from "@/apps/projects/ProjectDetails";
import Experience from "@/apps/experience/Experience";
import Skills from "@/apps/skills/Skills";
import Resume from "@/apps/resume/Resume";
import Terminal from "@/apps/terminal/Terminal";
import Contact from "@/apps/contact/Contact";
import Settings from "@/apps/settings/Settings";
import Calculator from "@/apps/calculator/Calculator";
import Notes from "@/apps/notes/Notes";
import { useWindowStore } from "@/store/windowStore";
import projects from "@/data/projects";
import {
  AboutIcon,
  ProjectsIcon,
  ExperienceIcon,
  SkillsIcon,
  ResumeIcon,
  TerminalIcon,
  ContactIcon,
  SettingsIcon,
  CalculatorIcon,
  NotesIcon,
} from "@/components/icons/MacAppIcons";

const APP_META = {
  about: { icon: <AboutIcon className="h-3.5 w-3.5" />, component: About },
  projects: { icon: <ProjectsIcon className="h-3.5 w-3.5" />, component: Projects },
  experience: {
    icon: <ExperienceIcon className="h-3.5 w-3.5" />,
    component: Experience,
  },
  skills: { icon: <SkillsIcon className="h-3.5 w-3.5" />, component: Skills },
  resume: { icon: <ResumeIcon className="h-3.5 w-3.5" />, component: Resume },
  terminal: { icon: <TerminalIcon className="h-3.5 w-3.5" />, component: Terminal },
  contact: { icon: <ContactIcon className="h-3.5 w-3.5" />, component: Contact },
  settings: { icon: <SettingsIcon className="h-3.5 w-3.5" />, component: Settings },
  calculator: {
    icon: <CalculatorIcon className="h-3.5 w-3.5" />,
    component: Calculator,
  },
  notes: { icon: <NotesIcon className="h-3.5 w-3.5" />, component: Notes },
};

export default function WindowManager() {
  const windows = useWindowStore((s) => s.windows);
  const openWindows = Object.values(windows).filter((w) => w.isOpen);

  return (
    <>
      {openWindows.map((win) => {
        if (win.appId === "project-details") {
          const project = projects.find((p) => p.id === win.projectId);
          if (!project) return null;
          return (
            <Window
              key={win.id}
              id={win.id}
              title={project.name}
              icon={<ProjectsIcon className="h-3.5 w-3.5" />}
            >
              <ProjectDetails project={project} />
            </Window>
          );
        }

        const meta = APP_META[win.appId];
        if (!meta) return null;
        const AppComponent = meta.component;

        return (
          <Window key={win.id} id={win.id} title={win.title} icon={meta.icon}>
            <AppComponent />
          </Window>
        );
      })}
    </>
  );
}
