const projects = [
  {
    id: "attendance-management-system",
    name: "Attendance Management System",
    description:
      "Full-stack, role-based attendance management platform for administrators, teachers, and students with JWT auth and permission-based authorization.",
    problem:
      "Educational institutions need a centralized system where admins, teachers, and students can manage and track attendance with clear roles, accurate reporting, and minimal manual effort.",
    features: [
      "JWT authentication with role- and permission-based access control for Admin, Teacher, and Student roles",
      "37 REST API endpoints across users, classes, sessions, attendance, dashboards, and reports",
      "Session-based attendance recording with present, absent, and late tracking",
      "Role-specific dashboards with attendance analytics filterable by class, student, session, and date range",
      "Interactive Swagger/OpenAPI documentation deployed separately on Netlify",
      "Deployed on Render (backend), Vercel (frontend), and Neon PostgreSQL (database)",
    ],
    image: "/projects/attendance-management.svg",
    technologies: [
      "React",
      "Vite",
      "Redux Toolkit",
      "React Query",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Sequelize",
      "JWT",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/Jatin-GI/attendance",
    liveUrl: "https://attendance-7q71.vercel.app",
    category: "Full Stack",
  },
  {
    id: "store-management-system",
    name: "Store Management System",
    description:
      "Full-stack multi-role e-commerce / store management platform with JWT auth, RBAC, and production deployment.",
    problem:
      "Stores need a single platform where admins, product listers, and customers can operate securely with clear permissions and inventory control.",
    features: [
      "JWT authentication with role-based access control for Admin, Product Lister, and Customer roles",
      "REST APIs for employees, product variants, categories, inventory, and order lifecycle",
      "Automatic SKU generation and Cloudinary multi-image uploads",
      "Protected routes and permission-based UI with React, Redux Toolkit, and Tailwind CSS",
      "Deployed on Render (backend) and Vercel (frontend)",
    ],
    image: "/projects/store-management.svg",
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Sequelize",
      "Redux Toolkit",
      "Tailwind CSS",
      "JWT",
      "Cloudinary",
    ],
    githubUrl: "https://github.com/Jatin-GI/Store_management",
    liveUrl: "https://store-management-nu-coral.vercel.app",
    category: "Full Stack",
  },
  {
    id: "expense-tracker",
    name: "Expense Tracker",
    description:
      "Full-stack personal finance platform for budgets, categories, CSV bank imports, and spending analytics.",
    problem:
      "Tracking personal finances manually is tedious; users need secure auth, imports, and clear month/year insights.",
    features: [
      "JWT authentication with budgets, categories, and CRUD for financial records",
      "Bank CSV import pipeline with income/expense categorization and duplicate detection",
      "Dashboard analytics with month/year filtering and report views",
      "Production stack on Neon (PostgreSQL), Render (API), and Vercel (frontend)",
    ],
    image: "/projects/expense-tracker.svg",
    technologies: [
      "PostgreSQL",
      "Express",
      "React",
      "Node.js",
      "Sequelize",
      "Tailwind CSS",
      "JWT",
      "Neon",
    ],
    githubUrl: "https://github.com/Jatin-GI/Expense_Tracker",
    liveUrl: "https://expense-tracker-eight-lyart-82.vercel.app/login",
    category: "Full Stack",
  },
];

export default projects;
