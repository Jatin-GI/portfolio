const profile = {
  name: "Jatin Gupta",
  title: "Backend-Focused Full-Stack Developer",
  tagline: "Node.js · Express.js · PostgreSQL · React · Next.js",
  education:
    "Bachelor of Technology in Computer Science — Guru Gobind Singh Indraprastha University (GGSIPU)",
  educationDetails:
    "Currently in 7th semester | CGPA: 8.77 | Aug 2023 – Sep 2027",
  location: "Delhi, India",
  phone: "+91 7669319031",
  email: "guptajatin0416@gmail.com",
  currentFocus:
    "Shipping scalable REST APIs, backend services, and full-stack platforms using Node.js, Express, PostgreSQL, Sequelize, and React.",
  introduction:
    "Backend-focused full-stack developer with hands-on experience building production-ready REST APIs, backend microservices, and real-world web platforms using Node.js, Express.js, and PostgreSQL. Skilled in role-based access control (RBAC), JWT authentication, and relational data modeling with Sequelize. Experienced in Redis caching, rate limiting, and containerized deployments with Docker & Docker Compose. Builds React/Next.js dashboards for full-stack delivery and thrives with Git-driven Agile development and cross-team collaboration.",
  interests: [
    "REST APIs & Backend Systems",
    "Database Design & Data Modeling",
    "RBAC & Auth Systems",
    "React & Modern Frontend",
    "Scalable Platform Engineering",
    "DevOps, Docker & Cloud",
    "Analytics Dashboards",
    "Product Engineering",
  ],
  image: "/profile-placeholder.svg",
  experience: [
    {
      role: "Junior Software Engineer",
      company: "Blockcube",
      type: "Full Time",
      period: "Oct 2025 – Jun 2026",
      highlights: [
        "Delivered scalable REST APIs for Urjamitra solar ops platform (Node.js, Express, PostgreSQL), modeling ~50 entities and supporting 15+ pipeline stages with optimized queries for high-frequency KYC/payment updates.",
        "Built React dashboards with WebSocket-powered real-time MIS across 70+ screens for operations and sales managers.",
        "Maintained and extended RBAC & JWT authentication across 6+ roles and 20+ API modules, wiring hierarchical permissions into backend and frontend features.",
        "Shipped backend features in Agile Git workflow with 100+ DB migrations, payments (Razorpay/ICICI), S3 docs, and P2P sync integrations.",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "RegalRinse",
      type: "Internship",
      period: "Jul 2025 – Sep 2025",
      highlights: [
        "Architected and deployed a full-stack e-commerce platform using React, Node.js, TypeScript, Redux, Tailwind CSS, and MongoDB, with 20+ responsive routes (shop, cart, search, management).",
        "Integrated Razorpay and COD for real-time, secure checkout, and built a dashboard for analytics, catalog, coupons, and order tracking (6-stage lifecycle).",
      ],
    },
  ],
  projects: [
    {
      name: "URL Shortener",
      description:
        "Full-stack URL shortening service with REST APIs to create and manage short links, visit tracking, Redis caching, PostgreSQL/Sequelize storage, rate limiting, and a React dashboard.",
      stack:
        "React · Vite · Node.js · Express.js · PostgreSQL · Sequelize · Redis · Axios · Tailwind CSS · Docker",
    },
    {
      name: "Attendance Management System",
      description:
        "Role-based attendance platform with JWT authentication, permission-based APIs (Admin, Teacher, Student), 37 REST endpoints, analytics dashboards, and server-state with React Query/Sequelize.",
      stack:
        "React · Vite · Node.js · Express.js · PostgreSQL · Sequelize · Redux Toolkit · React Query · Tailwind CSS · JWT · Render · Vercel · Swagger",
    },
    {
      name: "Expense Tracker",
      description:
        "Full-stack personal finance platform with JWT, budgets, categories, automated bank CSV import, duplicate detection, analytics, and month/year filtering.",
      stack:
        "PostgreSQL · Express · React · Node.js · Sequelize · Tailwind CSS · JWT · Neon · Render · Vercel",
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "SQL"],
    frontend: [
      "React.js",
      "Next.js",
      "Redux",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Shadcn/UI",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "RBAC",
    ],
    databases: ["MongoDB", "PostgreSQL", "Redis", "Sequelize"],
    infrastructure: [
      "Docker",
      "Docker Compose",
      "Render",
      "Vercel",
      "Neon",
      "Upstash",
    ],
    tools: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "JIRA",
      "Agile/Scrum",
      "Razorpay",
      "Vite",
    ],
    problemSolving: [
      "150+ Data Structures & Algorithms problems solved on LeetCode",
    ],
  },
};

export default profile;
