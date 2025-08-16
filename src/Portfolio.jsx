import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Linkedin, Download, ExternalLink, ArrowUpRight } from "lucide-react";

// ------------------------------------------------------------
// CONFIG – Update these if needed
// ------------------------------------------------------------
const RESUME_PDF_PATH = "/Rajarajan_TP_Resume.pdf"; // Place your PDF in /public with this name

const CONTACT = {
  email: "rajatp@bu.edu",
  phone: "+91 7397371356",
  linkedin: "https://www.linkedin.com/in/rajarajantp001",
};

// Accent gradient utility
const glow = "bg-gradient-to-r from-cyan-500/80 via-fuchsia-500/80 to-purple-600/80";
const textGlow =
  "bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-purple-300";

// ------------------------------------------------------------
// NAVBAR
// ------------------------------------------------------------
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#stats", label: "Stats" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#publications", label: "Publications" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#resume", label: "Resume" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-wide text-white/90">
          <span className={`text-lg ${textGlow}`}>RAJARAJAN TP</span>
        </a>
        <nav className="hidden md:flex gap-6 text-sm text-white/70">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden rounded-xl border border-white/10 px-3 py-2 text-white/80"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/60">
          <div className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-2 gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-xl border border-white/10 px-3 py-2 text-white/80 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ------------------------------------------------------------
// HERO – solid minimal with animated text
// ------------------------------------------------------------
function useTyping(text, speed = 55, pause = 1200) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let t;
    if (!deleting && idx < text.length) {
      t = setTimeout(() => setIdx(idx + 1), speed);
    } else if (!deleting && idx === text.length) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && idx > 0) {
      t = setTimeout(() => setIdx(idx - 1), speed / 1.8);
    } else if (deleting && idx === 0) {
      setDeleting(false);
    }
    setDisplay(text.slice(0, idx));
    return () => clearTimeout(t);
  }, [text, speed, pause, deleting, idx]);

  return display;
}

function Hero() {
  const phrases = [
    "Biotechnologist",
    "Researcher",
    "Innovator",
    "Machine Learning Enthusiast",
  ];
  const [p, setP] = useState(0);
  const typed = useTyping(phrases[p]);
  useEffect(() => {
    const cycle = setInterval(() => setP((v) => (v + 1) % phrases.length), 3500);
    return () => clearInterval(cycle);
  }, []);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center">
      <div className="absolute inset-0 bg-[#0b0b12]" />
      <div className={`absolute -inset-20 blur-3xl opacity-30 ${glow}`} />
      <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-white"
        >
          Rajarajan T P
        </motion.h1>
        <div className="mt-3 text-xl md:text-2xl font-medium text-white/80">
          <span className="mr-2">I am a</span>
          <span className={`tabular-nums ${textGlow}`}>{typed}</span>
          <span className="animate-pulse">▍</span>
        </div>
        <p className="mt-5 max-w-2xl text-white/70 leading-relaxed">
          B.Tech (Honors) in Biotechnology — CGPA 9.5. Passionate about computational biology,
          bioinformatics, and applying machine learning to healthcare and biotechnology.
          Awarded Best Outgoing Student (Biotech) and multiple research accolades.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-2xl px-5 py-3 bg-white/10 border border-white/10 text-white hover:bg-white/15 transition shadow-lg shadow-purple-700/10"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-2xl px-5 py-3 border border-white/10 text-white/90 hover:text-white hover:bg-white/5 transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// STATS – animated counters
// ------------------------------------------------------------
function useCounter(target) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start;
    const duration = 1200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const r = requestAnimationFrame(step);
    return () => cancelAnimationFrame(r);
  }, [inView, target]);

  return { ref, value };
}

function Stats() {
  const years = useCounter(3); // adjust if needed
  const projects = useCounter(20);
  const papers = useCounter(3);

  const Card = ({ label, val }) => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-lg">
      <div className={`text-4xl font-extrabold ${textGlow}`}>{val}+</div>
      <div className="mt-2 text-white/70">{label}</div>
    </div>
  );

  return (
    <section id="stats" className="relative py-14">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className={`h-full ${glow}`} />
      </div>
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-3 gap-4" ref={years.ref}>
        <Card label="Years of Experience" val={years.value} />
        <Card label="Projects Completed" val={projects.value} />
        <Card label="Papers Published" val={papers.value} />
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// ABOUT
// ------------------------------------------------------------
function About() {
  return (
    <section id="about" className="py-16">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-10 items-center">
        <div className="md:col-span-2">
          <h2 className={`text-3xl md:text-4xl font-bold ${textGlow}`}>About Me</h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            I'm a Biotechnology graduate (Anna University, 2025) with deep interest in
            bioinformatics, molecular modelling, and data-driven discovery. I build computational
            pipelines (subtractive proteomics, docking), explore ML models for healthcare, and have
            hands-on lab experience across HPLC, PCR, SDS-PAGE, and more.
          </p>
          <ul className="mt-4 space-y-2 text-white/70 list-disc list-inside">
            <li>GATE BT 2024: 30.33 | GATE BT 2025: 38</li>
            <li>Best Outgoing Student (Biotechnology) & Best Paper (HAPTEN 2023)</li>
            <li>1st in EMBIOSS National Symposium Quiz (Rajalakshmi Engineering College)</li>
          </ul>
        </div>
        <div className="justify-self-center md:justify-self-end">
          <div className="relative">
            <div className={`absolute -inset-2 blur-xl opacity-60 ${glow}`} />
            <img
              alt="Profile"
              src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
              className="relative h-40 w-40 rounded-full object-cover border border-white/10 shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// SKILLS
// ------------------------------------------------------------
const skills = [
  "Bioreactor Handling",
  "HPLC",
  "Microbiology Techniques",
  "UV–Vis Spectroscopy",
  "SDS–PAGE",
  "PCR",
  "Chromatography",
  "Biochemistry & Phytochemical",
  "Python",
  "WEKA ML",
  "Microsoft Office",
  "Data Analysis",
  "Bioinformatics",
];

function Skills() {
  return (
    <section id="skills" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className={`text-3xl md:text-4xl font-bold ${textGlow}`}>Skills</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {skills.map((s) => (
            <div
              key={s}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 hover:bg-white/10 transition"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// PROJECTS – 3D tilt cards + grid hover fade-in
// ------------------------------------------------------------
const projects = [
  {
    title:
      "Subtractive proteomics & virtual screening against Diabetic Gangrene bacteria",
    desc:
      "Pipeline to identify druggable bacterial proteins; in-silico analysis and docking of algal polysaccharides.",
    tags: ["Bioinformatics", "Docking", "Drug Discovery"],
  },
  {
    title: "Rev–RRE interactions in HIV‑1 Subtype B & C",
    desc:
      "Comparative in-silico analysis across 16 Rev–RRE complexes; sequence, structural, and interaction profiles.",
    tags: ["Virology", "Structural Biology"],
  },
  {
    title: "Cardiovascular Healthcare Segmentation (Random Forest)",
    desc:
      "Built ML model to predict cardiovascular risk from clinical & demographic data of 100 patients.",
    tags: ["Machine Learning", "Healthcare"],
  },
  {
    title:
      "Hematococcus pluvialis: Beta‑carotene production via stress optimization (2024–2025)",
    desc:
      "Explored 10 stressors; optimized via CCD & RSM; quantified via HPLC for β‑carotene/Astaxanthin.",
    tags: ["Algal Biotech", "HPLC", "RSM"],
  },
];

function TiltCard({ children }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: "perspective(1000px) rotateX(0) rotateY(0)" });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y - rect.height / 2) / rect.height) * 10;
    const ry = ((x - rect.width / 2) / rect.width) * 12;
    setStyle({ transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)` });
  };
  const onLeave = () => setStyle({ transform: "perspective(1000px) rotateX(0) rotateY(0)" });

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={style} className="transition-transform">
      {children}
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className={`text-3xl md:text-4xl font-bold ${textGlow}`}>Projects</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group"
            >
              <TiltCard>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-900/20">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-white/90 group-hover:text-white transition">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <p className="mt-2 text-white/70">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// PUBLICATIONS
// ------------------------------------------------------------
const publications = [
  {
    title:
      "Apoptosis inducing anti‑proliferative activity of Citrullus lanatus seeds against A549 cell lines",
    venue: "South African Journal of Botany",
    detail: "171, 96–105",
  },
  {
    title:
      "Growth and Production of the Milky White Medicinal Mushroom Calocybe indica through Varying Ratios of Organic Waste Substrates",
    venue: "International Journal of Medicinal Mushrooms",
    detail: "27(10)",
  },
  {
    title:
      "Evaluation of marine algal sulphated polysaccharides as G6PC1 inhibitors – A computational approach",
    venue: "Indian Journal of Biochemistry and Biophysics",
    detail: "62(8), 896–908",
  },
];

function Publications() {
  return (
    <section id="publications" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className={`text-3xl md:text-4xl font-bold ${textGlow}`}>Research Publications</h2>
        <div className="mt-6 space-y-4">
          {publications.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-white/90 font-medium">{p.title}</div>
              <div className="text-white/60 text-sm mt-1">{p.venue} — {p.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// EXPERIENCE
// ------------------------------------------------------------
const experience = [
  {
    role: "Research Intern — ICMR‑NIRT (Virology)",
    time: "Jan 1, 2025 – Jul 31, 2025",
    points: [
      "In‑silico structural/functional analysis of HIV‑1 Rev & RRE; explored subtype‑specific variations.",
      "Hands‑on in cell culture; assisted on LTR/TAT functional differences in HIV‑1 vs HIV‑2.",
    ],
  },
  {
    role: "Project/Research Intern — Biofuels Lab, Anna University",
    time: "Jul 19, 2023 – May 31, 2025",
    points: [
      "Executed subtractive proteomics + virtual screening pipeline for Diabetic Gangrene bacteria.",
      "Co‑authored work on marine sulphated polysaccharides as G6PC1 inhibitors.",
    ],
  },
  {
    role: "CSIR‑NEERI — Intern",
    time: "Jul 1, 2024 – Aug 5, 2024",
    points: [
      "Analyzed metagenomes; built phylogenetic trees, heatmaps; PCR & gel electrophoresis workflows.",
    ],
  },
  {
    role: "Adyar Cancer Institute — Clinical Biochemistry Intern",
    time: "Jul 17, 2023 – Aug 4, 2023",
    points: [
      "Analyzed biomarkers; serological workflows; operated analyzers incl. HPLC & nephelometers.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className={`text-3xl md:text-4xl font-bold ${textGlow}`}>Experience</h2>
        <div className="mt-8 grid gap-6">
          {experience.map((e) => (
            <div key={e.role} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="text-white/90 font-semibold">{e.role}</div>
                <div className="text-white/60 text-sm">{e.time}</div>
              </div>
              <ul className="mt-3 space-y-2 text-white/70 list-disc list-inside">
                {e.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// EDUCATION
// ------------------------------------------------------------
function Education() {
  return (
    <section id="education" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className={`text-3xl md:text-4xl font-bold ${textGlow}`}>Education</h2>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-white/90 font-semibold">B.Tech (Honors) in Biotechnology</div>
              <div className="text-white/70">St. Peter's College of Engineering & Technology, Anna University — Tamil Nadu, India</div>
            </div>
            <div className="text-white/60">June 2025 • CGPA: 9.5/10 (7th Sem)</div>
          </div>
          <div className="mt-4 text-white/70 text-sm">Relevant Coursework: Biomedical Engg, Bioinformatics, Genetic Engg, Molecular Therapeutics & Diagnostics, Statistics, Python for Biotechnologists, Cancer Biology, Protein Engineering, Tissue Engineering, Bioprocess, Fermentation, Immunology, DSP, and more.</div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// RESUME (Embedded + Download)
// ------------------------------------------------------------
function ResumeEmbed() {
  return (
    <section id="resume" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className={`text-3xl md:text-4xl font-bold ${textGlow}`}>Resume</h2>
        <div className="mt-6 rounded-2xl border border-white/10 overflow-hidden bg-black/30">
          <object data={RESUME_PDF_PATH} type="application/pdf" className="w-full h-[70vh]">
            <iframe title="Resume PDF" src={RESUME_PDF_PATH} className="w-full h-[70vh]" />
          </object>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <a
            href={RESUME_PDF_PATH}
            download
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-white hover:bg-white/15"
          >
            <Download size={18} /> Download PDF
          </a>
          <a
            href={RESUME_PDF_PATH}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white"
          >
            <ExternalLink size={18} /> Open in new tab
          </a>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// CONTACT
// ------------------------------------------------------------
function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className={`text-3xl md:text-4xl font-bold ${textGlow}`}>Get in touch</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="space-y-3 text-white/80">
              <a className="flex items-center gap-3 hover:text-white" href={`mailto:${CONTACT.email}`}>
                <Mail size={18} /> {CONTACT.email}
              </a>
              <a className="flex items-center gap-3 hover:text-white" href={`tel:${CONTACT.phone}`}>
                <Phone size={18} /> {CONTACT.phone}
              </a>
              <a className="flex items-center gap-3 hover:text-white" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
          <form
            className="rounded-2xl border border-white/10 bg-white/5 p-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const name = fd.get("name");
              const email = fd.get("email");
              const msg = fd.get("message");
              window.location.href = `mailto:${CONTACT.email}?subject=Portfolio%20Message%20from%20${encodeURIComponent(
                name
              )}&body=${encodeURIComponent(`${msg}\\n\\nFrom: ${name} <${email}>`)}`;
            }}
          >
            <input name="name" placeholder="Your name" className="rounded-xl bg-black/40 border border:white/10 px-4 py-3 text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500" required />
            <input name="email" type="email" placeholder="Your email" className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500" required />
            <textarea name="message" placeholder="Your message" rows={5} className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500" required />
            <button className="justify-self-start rounded-2xl px-5 py-3 bg-white/10 border border-white/10 text-white hover:bg-white/15 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// FOOTER
// ------------------------------------------------------------
function Footer() {
  return (
    <footer className="py-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 text-white/60 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} Rajarajan T P. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a className="hover:text-white" href={`mailto:${CONTACT.email}`}>Email</a>
          <a className="hover:text-white" href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-white" href="#home">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

// ------------------------------------------------------------
// ROOT COMPONENT
// ------------------------------------------------------------
export default function Portfolio() {
  useEffect(() => {
    // Smooth scrolling
    if (typeof window !== "undefined") {
      const onClick = (e) => {
        const target = e.target.closest('a[href^="#"]');
        if (!target) return;
        const id = target.getAttribute("href");
        if (id && id.length > 1) {
          const el = document.querySelector(id);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      };
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <div className="min-h-screen text-white bg-[#0a0a10]">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Projects />
        <Publications />
        <Experience />
        <Education />
        <ResumeEmbed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
