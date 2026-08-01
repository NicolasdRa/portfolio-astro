interface Project {
  n: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  stack: string[];
  link: { text: string; url: string };
}

const projects: Project[] = [
  {
    n: "01",
    title: "BakeWind",
    subtitle: "full-stack saas · bakery management",
    paragraphs: [
      "An operating system for independent bakeries — orders, stock and production planning. I built the SolidJS front end and the NestJS API, and designed the data model.",
      "The core is the scheduling logic that turns incoming orders into a daily production plan.",
    ],
    stack: [
      "NestJS — API & domain logic",
      "Solid.js — reactive UI",
      "PostgreSQL — data model",
      "Design + full-stack",
    ],
    link: { text: "visit project", url: "https://bakewind.com" },
  },
  {
    n: "02",
    title: "Swellnomads",
    subtitle: "community platform · travel & nomads",
    paragraphs: [
      "A community platform for travellers and nomads, on Next.js 15 and React 19.",
      "Focused on feed performance, transitions, and a content model that scales.",
    ],
    stack: ["Next.js 15 — app router", "React 19 — server components", "Frontend architecture"],
    link: { text: "visit project", url: "https://github.com/NicolasdRa/swellnomads_front" },
  },
  {
    n: "03",
    title: "School Management API",
    subtitle: "backend · production rest service",
    paragraphs: [
      "A NestJS API for school administration — authentication, role-based access and security built in from the start.",
      "Structured, tested, and ready to hand to a team.",
    ],
    stack: [
      "NestJS — modular architecture",
      "PostgreSQL — relational model",
      "JWT + RBAC — auth & roles",
      "Sole backend engineer",
    ],
    link: { text: "view on github", url: "https://github.com/NicolasdRa/school-admin-back" },
  },
  {
    n: "04",
    title: "UI / UX Redesigns",
    subtitle: "design · interface work for employers",
    paragraphs: [
      "Interface redesigns for previous employers — hierarchy and structure for products that had grown by accretion.",
    ],
    stack: ["Figma — design & prototyping", "Design systems — tokens", "Designer + implementer"],
    link: { text: "see the work", url: "#" },
  },
];

export default projects;
