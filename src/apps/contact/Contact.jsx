"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Send, CheckCircle2, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import social from "@/data/social";
import profile from "@/data/profile";
import { useWindowStore } from "@/store/windowStore";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const pushNotification = useWindowStore((s) => s.pushNotification);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmitted(true);
    reset();
    pushNotification({
      type: "success",
      title: "Message sent",
      message: "Thanks — I'll get back to you soon.",
    });
  };

  return (
    <div className="grid gap-6 p-5 sm:grid-cols-[1fr_1.2fr] sm:p-6">
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-50">Get in touch</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Prefer email, or send a message from here.
          </p>
        </div>

        <div className="space-y-2">
          <a
            href={social.email}
            className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-200 transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <Mail className="h-4 w-4 text-sky-300" />
            {profile.email}
          </a>
          <a
            href={social.phone}
            className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-200 transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <Phone className="h-4 w-4 text-sky-300" />
            {profile.phone}
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-200 transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <GithubIcon className="h-4 w-4 text-sky-300" />
            GitHub
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-200 transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <LinkedinIcon className="h-4 w-4 text-sky-300" />
            LinkedIn
          </a>
        </div>
      </section>

      <section>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
          <div>
            <label htmlFor="contact-name" className="mb-1 block text-xs text-zinc-400">
              Name
            </label>
            <input
              id="contact-name"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/40"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name ? (
              <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1 block text-xs text-zinc-400">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/40"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1 block text-xs text-zinc-400">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              className="w-full resize-y rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/40"
              {...register("message", {
                required: "Message is required",
                minLength: { value: 10, message: "Message is too short" },
              })}
            />
            {errors.message ? (
              <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500/25 px-4 py-2 text-sm font-medium text-sky-100 transition hover:bg-sky-500/35 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitted ? (
            <p className="flex items-center gap-2 text-sm text-emerald-400" role="status">
              <CheckCircle2 className="h-4 w-4" />
              Message sent successfully.
            </p>
          ) : null}
        </form>
      </section>
    </div>
  );
}
