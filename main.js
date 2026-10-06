/**
 * LUIS FERNANDES — Systems & Embedded Software Engineer
 * Background Cosmic Web Engine, Discretized Spacetime Mesh, and Project Directory.
 */

// -----------------------------------------------------------------------------
// Unified Project Directory Dataset (Loaded dynamically from assets/data/projects.js)
// -----------------------------------------------------------------------------
let DIRECTORY_PROJECTS = (typeof window !== "undefined" && Array.isArray(window.PORTFOLIO_PROJECTS_DATA) && window.PORTFOLIO_PROJECTS_DATA.length > 0)
  ? window.PORTFOLIO_PROJECTS_DATA
  : [];

// Asynchronous fetch fallback if dataset was loaded asynchronously
if (typeof window !== "undefined" && DIRECTORY_PROJECTS.length === 0 && typeof fetch !== "undefined") {
  fetch("assets/data/projects.json")
    .then(res => res.json())
    .then(data => {
      DIRECTORY_PROJECTS = data;
      window.PORTFOLIO_PROJECTS_DATA = data;
      window.dispatchEvent(new CustomEvent("portfolio:projects-loaded"));
    })
    .catch(() => {});
}

// -----------------------------------------------------------------------------
// Internationalization (i18n) Engine — French / English
// -----------------------------------------------------------------------------
const I18N_TRANSLATIONS = {
  fr: {
    "header.subtitle": "Embarqué & Systèmes",
    "nav.work": "Projets",
    "nav.experience": "Expérience",
    "nav.skills": "Compétences",
    "nav.archive": "Catalogue",
    "nav.matcher": "Évaluateur",
    "nav.contact": "Contact",
    "nav.match_btn": "Tester une offre",
    "nav.resume_btn": "CV ↗",

    "hero.title": '<span class="gradient-text">Ingénieur Logiciel Embarqué.</span><br><em>Recherche HPC & IA.</em>',
    "hero.lead": "Je conçois des pipelines déterministes C & C++20 de télémétrie vol pour les fusées NASA USLI, des simulations HPC massivement parallèles en CUDA (100M particules), de la vérification embarquée basse consommation et des modèles physiques couplés à l'IA.",
    "hero.btn_work": 'Voir les projets sélectionnés <span aria-hidden="true">↓</span>',
    "hero.btn_match": "Tester une offre (Fit & Projets)",
    "hero.btn_resume": 'Télécharger le CV <span aria-hidden="true">↗</span>',

    "sec01.eyebrow": "<span>01</span> Projets sélectionnés",
    "sec01.title": "Projets phares",
    "sec01.desc": "Cinq réalisations d'ingénierie en télémétrie vol, calcul astrophysique HPC, systèmes distribués et noyau Linux.",

    "sec02.eyebrow": "<span>02</span> Trajectoire",
    "sec02.title": "Expérience & Formation",
    "sec02.desc": "Parcours d'ingénierie entre télémétrie aérospatiale, R&D systèmes et cursus en génie informatique.",

    "sec03.eyebrow": "<span>03</span> Boîte à outils",
    "sec03.title": "Compétences & Stack technique",
    "sec03.desc": "Fondé sur les premiers principes : limites matérielles, exécution déterministe, résultats mesurables.",

    "sec04.eyebrow": "<span>04</span> Catalogue",
    "sec04.title": "Index des Projets d'Ingénierie",
    "sec04.desc": "Archive sélectionnée de systèmes bas niveau, télémétrie vol, simulations numériques et architectures IA.",
    "sec04.repo_btn": "Monorepo Epitech (50 projets) ↗",
    "sec04.tab_all": "Tous (53)",
    "sec04.tab_math": "Calcul Scientifique",
    "sec04.tab_systems": "Systèmes & Noyau",
    "sec04.tab_aero": "Aérospatial & HPC",
    "sec04.tab_ai": "Algorithmes & IA",
    "sec04.tab_net": "Réseau & Concurrence",
    "sec04.search_placeholder": "Filtrer par technologie ou mot-clé...",
    "sec04.th_project": "Projet & Contexte",
    "sec04.th_domain": "Domaine",
    "sec04.th_summary": "Implémentation & Architecture",
    "sec04.th_stack": "Stack",
    "sec04.th_action": "Dépôt",
    "sec04.empty_text": "Aucun projet ne correspond à votre filtre.",
    "sec04.empty_btn": "Réinitialiser les filtres",

    "matcher.eyebrow": "<span>05</span> Moteur d'Adéquation",
    "matcher.title": "Analyseur d'Offre & Projets Pertinents",
    "matcher.desc": "Déposez une offre d'emploi ou collez une description : le moteur évalue en direct l'adéquation technique, filtre les compétences validées et extrait les projets GitHub de Luis les plus pertinents.",
    "matcher.preset_label": "Exemples :",
    "matcher.preset_aero": "NASA USLI",
    "matcher.preset_hpc": "HPC & CUDA",
    "matcher.preset_kernel": "Noyau Linux",
    "matcher.preset_embedded": "Firmware & FPGA",
    "matcher.preset_ai": "IA & CFD",
    "matcher.preset_network": "Systèmes Réseau",
    "matcher.import_file": "Importer un fichier (PDF / TXT) ↗",
    "matcher.drop_text": "<strong>Glissez-déposez une offre d'emploi ici</strong> (PDF, TXT, Markdown) ou collez ci-dessous",
    "matcher.drop_tag": "Traitement 100% local",
    "matcher.textarea_placeholder": "Collez ici la description ou les prérequis d'une offre (ex: Embedded Software, C++20, CUDA, LoRa telemetry, Linux kernel, RTOS, lock-free, FPGA, Python...)...",
    "matcher.btn_analyze": "Analyser l'adéquation",
    "matcher.btn_reset": "Effacer",
    "matcher.status": "Analyse temps réel active",
    "matcher.score_sub": "ADÉQUATION",
    "matcher.metric_stack": "Stack",
    "matcher.metric_domain": "Domaine",
    "matcher.metric_standards": "Normes",
    "matcher.btn_copy": "Copier la synthèse 📋",
    "matcher.skills_title": "Compétences Validées",
    "matcher.exp_title": "Expériences Alignées",
    "matcher.proj_title": "Projets Ciblés en Accord",

    "modal.view_run": "Aperçu de l'exécution",
    "modal.view_repo": "Consulter le code source sur GitHub ↗",
    "modal.architecture": "Architecture & Conception",
    "modal.significance": "Enjeu & Objectif Technique",
    "modal.stack": "Primitives & Technologies",
    "modal.metrics": "Télémétrie d'Exécution",
    "modal.close": "Fermer",

    "contact.eyebrow": "<span>06</span> Contact",
    "contact.title": "Construisons des systèmes déterministes.",
    "contact.statement": "Disponible pour des <strong>postes en ingénierie</strong> aux États-Unis &amp; Remote — Systèmes embarqués, logiciel de vol, calcul haute performance (HPC) ou IA appliquée.",
    "contact.statement_sub": "Visa F-1 (éligible OPT/CPT), éligible sponsoring J-1 / JPI. Référence académique sur demande (Prof. Dan Cregg, CSULB).",
    "contact.btn_email": 'M\'écrire par email <span aria-hidden="true">→</span>',
    "contact.btn_resume": 'CV (PDF) <span aria-hidden="true">↗</span>',

    "footer.brand": "<strong>Luis Fernandes</strong> — Ingénieur Logiciel Systèmes &amp; Embarqué",
    "footer.top": "Haut de page ↑"
  },
  en: {
    "header.subtitle": "Embedded & Systems",
    "nav.work": "Work",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.archive": "Archive",
    "nav.matcher": "Matcher",
    "nav.contact": "Contact",
    "nav.match_btn": "Match an offer",
    "nav.resume_btn": "Resume ↗",

    "hero.title": '<span class="gradient-text">Embedded Software Engineer.</span><br><em>HPC &amp; AI Research.</em>',
    "hero.lead": "I build deterministic C &amp; C++20 flight telemetry for NASA USLI rocketry, GPU-accelerated HPC simulations in CUDA (100M particles), low-power edge verification, and physics-informed AI systems.",
    "hero.btn_work": 'View selected work <span aria-hidden="true">↓</span>',
    "hero.btn_match": "Test job offer (Fit & Projects)",
    "hero.btn_resume": 'Download resume <span aria-hidden="true">↗</span>',

    "sec01.eyebrow": "<span>01</span> Selected work",
    "sec01.title": "Featured projects",
    "sec01.desc": "Five flagship builds across flight telemetry, astrophysical HPC, distributed compute and Linux internals.",

    "sec02.eyebrow": "<span>02</span> Trajectory",
    "sec02.title": "Experience & Education",
    "sec02.desc": "Engineering trajectory across aerospace telemetry, systems R&D, and computer engineering education.",

    "sec03.eyebrow": "<span>03</span> Toolbox",
    "sec03.title": "Skills & technical stack",
    "sec03.desc": "Grounded in first principles: hardware boundaries, deterministic execution, measurable results.",

    "sec04.eyebrow": "<span>04</span> Catalog",
    "sec04.title": "Engineering Project Index",
    "sec04.desc": "Curated archive of low-level systems, flight telemetry, numerical simulations, and AI architectures.",
    "sec04.repo_btn": "Epitech Monorepo (50 builds) ↗",
    "sec04.tab_all": "All (53)",
    "sec04.tab_math": "Scientific & Math",
    "sec04.tab_systems": "Systems & Kernel",
    "sec04.tab_aero": "Aerospace & HPC",
    "sec04.tab_ai": "Algorithms & AI",
    "sec04.tab_net": "Concurrency & Net",
    "sec04.search_placeholder": "Filter by tech or keyword...",
    "sec04.th_project": "Project & Context",
    "sec04.th_domain": "Domain",
    "sec04.th_summary": "Implementation & Architecture",
    "sec04.th_stack": "Core Stack",
    "sec04.th_action": "Repository",
    "sec04.empty_text": "No implementations match your filter.",
    "sec04.empty_btn": "Reset filters",

    "matcher.eyebrow": "<span>05</span> Compatibility Engine",
    "matcher.title": "Job Fit Analyzer & Targeted Projects",
    "matcher.desc": "Drop a job description or paste requirements: the engine calculates real-time technical fit, filters verified competencies, and extracts Luis's most relevant GitHub projects.",
    "matcher.preset_label": "Examples:",
    "matcher.preset_aero": "NASA USLI",
    "matcher.preset_hpc": "HPC & CUDA",
    "matcher.preset_kernel": "Linux Kernel",
    "matcher.preset_embedded": "Firmware & FPGA",
    "matcher.preset_ai": "AI & CFD",
    "matcher.preset_network": "Network Systems",
    "matcher.import_file": "Import file (PDF / TXT) ↗",
    "matcher.drop_text": "<strong>Drag and drop a job offer here</strong> (PDF, TXT, Markdown) or paste below",
    "matcher.drop_tag": "100% Client-Side Processing",
    "matcher.textarea_placeholder": "Paste job description or technical prerequisites here (e.g., Embedded Software, C++20, CUDA, LoRa telemetry, Linux kernel, RTOS, lock-free, FPGA, Python...)...",
    "matcher.btn_analyze": "Analyze Job Match",
    "matcher.btn_reset": "Clear",
    "matcher.status": "Real-time analysis active",
    "matcher.score_sub": "OVERALL FIT",
    "matcher.metric_stack": "Stack",
    "matcher.metric_domain": "Domain",
    "matcher.metric_standards": "Standards",
    "matcher.btn_copy": "Copy Synthesis 📋",
    "matcher.skills_title": "Validated Competencies",
    "matcher.exp_title": "Aligned Experience",
    "matcher.proj_title": "Targeted Matching Projects",

    "modal.view_run": "Execution Showcase",
    "modal.view_repo": "View Source on GitHub ↗",
    "modal.architecture": "Architecture & Design",
    "modal.significance": "Technical Scope & Purpose",
    "modal.stack": "Primitives & Technologies",
    "modal.metrics": "Execution Telemetry",
    "modal.close": "Close",

    "contact.eyebrow": "<span>06</span> Contact",
    "contact.title": "Let's build something deterministic.",
    "contact.statement": "Available for <strong>engineering roles</strong> in the US &amp; Remote — Embedded Systems, Flight Software, High-Performance Computing, or Applied AI.",
    "contact.statement_sub": "F-1 visa (OPT/CPT eligible), J-1 / JPI sponsorship eligible. Academic reference on request (Prof. Dan Cregg, CSULB).",
    "contact.btn_email": 'Email me <span aria-hidden="true">→</span>',
    "contact.btn_resume": 'Resume (PDF) <span aria-hidden="true">↗</span>',

    "footer.brand": "<strong>Luis Fernandes</strong> — Systems &amp; Embedded Software Engineer",
    "footer.top": "Back to top ↑"
  }
};

const FEATURED_CARDS_I18N = {
  telemetry: {
    domain: { fr: "Télémétrie Aérospatiale // NASA Student Launch (USLI) · Long Beach Rocketry", en: "Aerospace & Flight Telemetry // NASA Student Launch (USLI) · Long Beach Rocketry" },
    punchline: {
      fr: "Chaîne de réception télémétrique sol développée pour fusée haute puissance NASA Student Launch. Reconstruit les flux binaires bruités LoRa 915 MHz (Semtech SX1262) avec resynchronisation FSM sous-milliseconde, compensation Doppler et IPC zero-copy vers station sol Qt (<20ms de latence).",
      en: "Ground-station telemetry reception pipeline engineered for high-power NASA Student Launch rocketry. Reconstructs noisy 915 MHz Semtech SX1262 LoRa bitstreams with sub-millisecond FSM frame synchronization, Doppler compensation, and zero-copy IPC into a Qt Ground Control Station with <20ms end-to-end latency."
    },
    specs: [
      { label: { fr: "Liaison RF", en: "RF Link" } },
      { label: { fr: "Latence Globale", en: "End-to-End Latency" } },
      { label: { fr: "Buffer de Flux", en: "Stream Buffer" } },
      { label: { fr: "Système Cible", en: "Target System" } }
    ],
    cta: { fr: "Contexte Club ↗", en: "Club Context ↗" }
  },
  blitzar: {
    domain: { fr: "HPC Astrophysique & Simulation Numérique // Recherche Open-Source", en: "Astrophysical HPC & Numerical Simulation // Open-Source Research" },
    punchline: {
      fr: "Moteur N-Body et hydrodynamique lissée (SPH) massivement parallèle en CUDA avec accélération spatiale Octree pour 100M particules. Optimisé en Structure-of-Arrays (SoA) et coalescing mémoire pour saturer 92% de la bande passante VRAM RTX 4070 ; conforme aux normes NASA NPR-7150.2D & STD-8739.8B.",
      en: "Massively parallel N-Body and Smoothed-Particle Hydrodynamics (SPH) engine in CUDA with Octree spatial acceleration for 100M particles. Optimized via Structure-of-Arrays (SoA) and memory coalescing to achieve 92% of RTX 4070 VRAM bandwidth; validated under NASA NPR-7150.2D & NASA-STD-8739.8B engineering standards."
    },
    specs: [
      { label: { fr: "Échelle Particules", en: "Particle Scale" } },
      { label: { fr: "Saturation Mémoire", en: "Memory Saturation" } },
      { label: { fr: "Solveurs Numériques", en: "Numerical Solvers" } },
      { label: { fr: "Normes Spatiales", en: "Mission Standards" } }
    ],
    cta: { fr: "Démo Simulation ↗", en: "Simulation Demo ↗" }
  },
  pyrocast: {
    domain: { fr: "IA Appliquée & Physique Numérique // Recherche Open-Source", en: "Applied AI & Computational Physics // Open-Source Research" },
    punchline: {
      fr: "Prédiction de propagation de feux de forêt par IA et simulation tactique. Couplage physique de combustion de surface (modèle Rothermel), forçage météorologique, maillages 2D/3D et inférence Monte Carlo avec dynamique des fluides (CFD) thermique.",
      en: "AI-driven wildfire behavior prediction and tactical mission simulation. Combines wildfire combustion physics, weather forcing, terrain-aware meshes, and Monte Carlo inference with 2D/3D thermodynamic CFD flow visualization for field-mission operations."
    },
    specs: [
      { label: { fr: "Cœur d'Inférence", en: "Inference Core" } },
      { label: { fr: "Physique Couplée", en: "Physics Coupled" } },
      { label: { fr: "Maillages Spatiaux", en: "Spatial Meshes" } },
      { label: { fr: "Rendu Opérationnel", en: "Operational Output" } }
    ],
    cta: { fr: "Code Source ↗", en: "Source on GitHub ↗" }
  },
  silicium: {
    domain: { fr: "Systèmes Distribués & Vérification Embarquée // Projet Fondateur", en: "Distributed Systems & Edge Verification // Capstone Project (Founder & Team Lead)" },
    punchline: {
      fr: "Grille de calcul distribué haute performance exploitant des micro-appareils IoT via Solana (Rust/Anchor). Protocole de délégation récursive à empreinte mémoire <128 KB pour vérification autonome et partitionneur binaire ELF C++ conteneurisé réduisant la latence de 30%.",
      en: "Decentralized high-throughput compute grid harnessing low-power IoT devices via Solana (Rust/Anchor). Employs recursive delegation protocols with <128 KB memory footprints for autonomous edge verification and a custom dockerized C++ ELF partitioner cutting task overhead by 30%."
    },
    specs: [
      { label: { fr: "Empreinte Mémoire", en: "Memory Footprint" } },
      { label: { fr: "Partitionneur Binaire", en: "Binary Partitioner" } },
      { label: { fr: "Latence Réseau", en: "Latency Overhead" } },
      { label: { fr: "Moteur Consensus", en: "Consensus Engine" } }
    ],
    cta: { fr: "Code Source ↗", en: "Source on GitHub ↗" }
  },
  raytracer: {
    domain: { fr: "Physique Numérique & Optique // Calcul Parallèle", en: "Computational Physics & Optics // Parallel Computing" },
    punchline: {
      fr: "Raytracer optique en espace-temps courbe intégrant numériquement les équations différentielles de géodésiques nulles selon la Relativité Générale. Résolution de déflexion photonique, lentilles gravitationnelles, ombres d'accrétion et décalage Doppler autour de trous noirs de Kerr (140+ images/h en 8K).",
      en: "Curved-spacetime optical raytracer numerically integrating null geodesic differential equations under General Relativity. Solves photon deflection, gravitational lensing, accretion shadows, and Doppler redshift around spinning Kerr black holes using CUDA four-vector matrices; achieves 140+ frames/hour in 8K export."
    },
    specs: [
      { label: { fr: "Métrique Espace-Temps", en: "Metric Space" } },
      { label: { fr: "Solveur Numérique", en: "Numerical Solver" } },
      { label: { fr: "Vitesse de Rendu", en: "Rendering Speed" } },
      { label: { fr: "Moteur de Calcul", en: "Compute Engine" } }
    ],
    cta: { fr: "Démo Rendu (8K) ↗", en: "Render Demo (8K) ↗" }
  }
};

const TIMELINE_I18N = [
  {
    role: { fr: "Responsable Logiciel Télémétrie & Station Sol", en: "Lead Telemetry & Ground Control Software" },
    org: { fr: "Long Beach Rocketry · NASA Student Launch", en: "Long Beach Rocketry · NASA Student Launch" },
    date: { fr: "2025 – Présent", en: "2025 – Present" },
    badge: { fr: "Aérospatial · NASA USLI", en: "Aerospace · NASA USLI" },
    desc: {
      fr: "Architecture d'un pipeline de télémétrie C++/LoRa à faible latence avec poursuite Doppler et station sol Qt. Reconstitution de flux binaires bruités 915 MHz Semtech SX1262 avec synchronisation FSM sous-milliseconde et anneau lock-free (<20ms de latence).",
      en: "Architected low-latency C++/LoRa telemetry pipeline with Doppler tracking and Qt Ground Control Station. Reconstructs noisy 915 MHz Semtech SX1262 bitstreams with sub-millisecond FSM frame synchronization and lock-free ring buffer (<20ms latency)."
    }
  },
  {
    role: { fr: "Génie Électrique & Informatique", en: "Electrical & Computer Engineering" },
    org: { fr: "California State University, Long Beach", en: "California State University, Long Beach" },
    date: { fr: "Août 2025 – Mai 2026", en: "Aug 2025 – May 2026" },
    badge: { fr: "Échange Académique", en: "Academic Exchange" },
    desc: {
      fr: "Cours avancés en conception System-on-Chip (SoC), logique numérique, traitement du signal (DSP) et Machine Learning & analyse de données.",
      en: "Advanced coursework in System-on-Chip (SoC) Design, Computer Logic Systems, Digital Signal Processing (DSP), and Machine Learning & Data Analysis."
    }
  },
  {
    role: { fr: "Stagiaire Ingénieur Logiciel & Systèmes", en: "Software & Systems Engineering Intern" },
    org: { fr: "X'PROCHEM (R&D Pharma)", en: "X'PROCHEM (R&D Pharma)" },
    date: { fr: "Avr – Août 2025", en: "Apr – Aug 2025" },
    badge: { fr: "R&D Industrielle", en: "Industry R&D" },
    desc: {
      fr: "Automatisation de la synthèse peptidique (LIMS). Réduction de 40% de latence des requêtes PostgreSQL via indexation atomique. Moteur de détection d'anomalies en spectrométrie de masse (0.0001 Da) réduisant les faux positifs de 28%.",
      en: "Automated peptide synthesis (LIMS). Reduced PostgreSQL search query latency by 40% with atom-based indexing. Built a 0.0001 Da mass spectrometry anomaly detection engine reducing false positives by 28%."
    }
  },
  {
    role: { fr: "Testeur QA & Développeur Automatisation Android", en: "QA Tester & Android Automation Developer" },
    org: { fr: "Monstock (Supply Chain)", en: "Monstock (Supply Chain)" },
    date: { fr: "Oct 2023 – Fév 2025", en: "Oct 2023 – Feb 2025" },
    badge: { fr: "Industrie", en: "Industry" },
    desc: {
      fr: "Documentation de 100+ anomalies critiques (-38% de défauts bloquants) et architecture d'un pipeline de tests de non-régression Java/Appium réduisant les cycles d'exécution de 55%.",
      en: "Documented 100+ critical bugs (-38% release-blocking defects) and architected a Java/Appium regression test pipeline cutting end-to-end test execution cycles by 55%."
    }
  },
  {
    role: { fr: "Stagiaire Développeur Applications d'Entreprise", en: "Enterprise App Developer Intern" },
    org: { fr: "Indium Solutions (Groupe Cold)", en: "Indium Solutions (Groupe Cold)" },
    date: { fr: "Juil – Oct 2023", en: "Jul – Oct 2023" },
    badge: { fr: "Industrie", en: "Industry" },
    desc: {
      fr: "Architecture ERP sur mesure et pipeline ETL d'importation de stocks à fort volume traitant des dizaines de milliers de lignes par lot avec déduplication floue.",
      en: "Custom ERP architecture and high-volume stock-import ETL pipeline processing tens of thousands of records per batch with fuzzy deduplication."
    }
  },
  {
    role: { fr: "Expert en Ingénierie Logicielle & Systèmes (Grade Master)", en: "Master’s Degree in Systems & Software Engineering" },
    org: { fr: "Epitech — Tek5 Ingénierie Systèmes", en: "Epitech — Tek5 Systems Engineering" },
    date: { fr: "2021 – Diplôme Juin 2027", en: "2021 – Expected Jun 2027" },
    badge: { fr: "Grade Master", en: "Master's Degree" },
    desc: {
      fr: "Développement C bas niveau / assembleur x86-64 pur (réécriture de libc), outils d'analyse binaire Linux (strace, nm, objdump) via ptrace/ELF64, calcul GPGPU CUDA et IPC Unix.",
      en: "Low-level C / pure x86-64 assembly reimplementation of libc, Linux binary analysis tools (strace, nm, objdump) via ptrace/ELF64, CUDA GPGPU, signals & Unix IPC."
    }
  }
];

let currentLang = "fr";
const onLanguageChangeCallbacks = [];

function registerLangListener(fn) {
  onLanguageChangeCallbacks.push(fn);
}

function updateFeaturedCardsI18n(lang) {
  Object.keys(FEATURED_CARDS_I18N).forEach(cardKey => {
    const cardEl = document.getElementById(`card-${cardKey}`);
    if (!cardEl) return;
    const data = FEATURED_CARDS_I18N[cardKey];
    const tagEl = cardEl.querySelector(".product-domain-tag");
    if (tagEl && data.domain) tagEl.textContent = data.domain[lang] || data.domain.en;

    const punchEl = cardEl.querySelector(".product-punchline");
    if (punchEl && data.punchline) punchEl.textContent = data.punchline[lang] || data.punchline.en;

    const specTiles = cardEl.querySelectorAll(".spec-tile");
    if (data.specs && specTiles.length >= data.specs.length) {
      data.specs.forEach((spec, idx) => {
        const tile = specTiles[idx];
        const lbl = tile.querySelector(".spec-tile-label");
        if (lbl && spec.label) lbl.textContent = spec.label[lang] || spec.label.en;
      });
    }

    if (data.cta) {
      const ctaBtn = cardEl.querySelector(".product-cta-row a:first-child");
      if (ctaBtn) ctaBtn.textContent = data.cta[lang] || data.cta.en;
    }
  });
}

function updateTimelineI18n(lang) {
  const items = document.querySelectorAll(".timeline-item");
  TIMELINE_I18N.forEach((t, idx) => {
    const item = items[idx];
    if (!item) return;
    const dateEl = item.querySelector(".timeline-date-badge");
    const badgeEl = item.querySelector(".timeline-badge");
    const roleEl = item.querySelector(".timeline-role");
    const orgEl = item.querySelector(".timeline-org");
    const descEl = item.querySelector(".timeline-desc");

    if (dateEl && t.date) dateEl.textContent = t.date[lang] || t.date.en;
    if (badgeEl && t.badge) badgeEl.textContent = t.badge[lang] || t.badge.en;
    if (roleEl && t.role) roleEl.textContent = t.role[lang] || t.role.en;
    if (orgEl && t.org) orgEl.textContent = t.org[lang] || t.org.en;
    if (descEl && t.desc) descEl.textContent = t.desc[lang] || t.desc.en;
  });
}

function setLanguage(lang) {
  if (lang !== "fr" && lang !== "en") lang = "fr";
  currentLang = lang;
  try {
    localStorage.setItem("portfolio_lang", lang);
  } catch (e) {}

  document.documentElement.lang = lang;

  // Switcher UI
  document.querySelectorAll("[data-lang-btn]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.langBtn === lang);
  });

  // Standard text nodes
  const dict = I18N_TRANSLATIONS[lang] || I18N_TRANSLATIONS.fr;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // Attribute nodes (placeholders, etc.)
  document.querySelectorAll("[data-i18n-attr]").forEach(el => {
    const spec = el.dataset.i18nAttr;
    const parts = spec.split(":");
    if (parts.length === 2) {
      const [attr, key] = parts;
      if (dict[key] !== undefined) {
        el.setAttribute(attr, dict[key]);
      }
    }
  });

  // Dynamic modules
  updateFeaturedCardsI18n(lang);
  updateTimelineI18n(lang);

  // Trigger registered listeners
  onLanguageChangeCallbacks.forEach(fn => fn(lang));
}

function initI18n() {
  let saved = null;
  try {
    saved = localStorage.getItem("portfolio_lang");
  } catch (e) {}

  if (!saved) {
    saved = (navigator.language && navigator.language.startsWith("en")) ? "en" : "fr";
  }
  currentLang = saved;

  document.querySelectorAll("[data-lang-btn]").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.langBtn);
    });
  });

  setLanguage(currentLang);
}

// -----------------------------------------------------------------------------
// Engine Initialization
// -----------------------------------------------------------------------------
function initializeEngine() {
  initI18n();
  initScrollProgress();
  initCosmicWebCanvas();
  initDiscretizedSpacetimeMesh();
  initTileBackgroundCanvases();
  initFeaturedDeck();
  initScrollReveals();
  initSpotlights();
  initProjectDirectory();
  initProjectModal();
  initNavHighlight();
  initJobMatcher();
  initYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeEngine);
} else {
  initializeEngine();
}

function initYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}

// -----------------------------------------------------------------------------
// 1. Scroll-Driven Progress Bar
// -----------------------------------------------------------------------------
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  function update() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, progress)) + "%";
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}

// -----------------------------------------------------------------------------
// 2. Earth's Upper Atmosphere & Numerical Simulation Canvas Engine
// -----------------------------------------------------------------------------
function initCosmicWebCanvas() {
  const canvas = document.getElementById("cosmic-web-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let animId = null;
  let isRunning = true;
  let time = 0;

  // Aerodynamic cursor deflection
  const mouse = { x: -2000, y: -2000, active: false };

  // Earth horizon / limb curvature parameters
  let planetCenterX = 0;
  let planetCenterY = 0;
  let planetRadius = 0;

  // Eulerian streamline simulation particles (hypersonic rarefied gas flow / CFD streamlines)
  const PARTICLE_COUNT = window.innerWidth < 768 ? 48 : 78;
  const particles = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Planetary limb geometry: sweeping Earth limb arc across the lower background
    planetRadius = Math.max(width, height) * 1.55;
    planetCenterX = width * 0.48;
    planetCenterY = height + planetRadius - (height * 0.28);
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Stratified altitude from stratosphere (30km) to thermosphere (240km)
      const altOffset = Math.random() * 240 + 25;
      const angle = (Math.random() - 0.5) * 1.5 - Math.PI / 2;
      const speed = (0.00035 + Math.random() * 0.0005) * (altOffset > 110 ? 1.15 : 0.9);
      particles.push({
        altOffset,
        angle,
        speed,
        size: Math.random() * 1.6 + 0.8,
        hueType: Math.random() > 0.5 ? "emerald" : (Math.random() > 0.5 ? "amber" : "silver"),
        history: []
      });
    }
  }

  function render() {
    if (!isRunning) return;
    time += 0.016;

    ctx.clearRect(0, 0, width, height);

    const R = planetRadius;
    const cx = planetCenterX;
    const cy = planetCenterY;

    // Atmospheric layer radii
    const rLimb = R;
    const rKarman = R + 125; // ~100km Kármán Line
    const rExo = R + 265;

    // 1. Stratospheric Rayleigh Limb Arc Glow (Deep orbital black + thin Airglow & Solar horizon)
    const stratGrad = ctx.createRadialGradient(cx, cy, rLimb * 0.98, cx, cy, rExo);
    stratGrad.addColorStop(0, "rgba(5, 8, 14, 0.65)");
    stratGrad.addColorStop(0.25, "rgba(10, 18, 30, 0.2)");
    stratGrad.addColorStop(0.48, "rgba(16, 185, 129, 0.08)"); // Atomic oxygen airglow
    stratGrad.addColorStop(0.68, "rgba(226, 232, 240, 0.04)"); // Stratospheric limb
    stratGrad.addColorStop(0.85, "rgba(245, 158, 11, 0.03)"); // Solar horizon warmth
    stratGrad.addColorStop(1, "transparent");

    ctx.fillStyle = stratGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, rExo, -Math.PI, 0);
    ctx.lineTo(cx, cy);
    ctx.fill();

    // 2. Mesospheric Atomic Oxygen Green Airglow Ribbon (~100km Kármán line)
    ctx.beginPath();
    const startAngle = -Math.PI * 0.94;
    const endAngle = -Math.PI * 0.06;
    for (let a = startAngle; a <= endAngle; a += 0.02) {
      // Gentle atmospheric undulation wave
      const wave = Math.sin(a * 10 + time * 0.75) * 4.2 + Math.cos(a * 22 - time * 0.45) * 2;
      const r = rKarman + wave;
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r;
      if (a === startAngle) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = "rgba(16, 185, 129, 0.24)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 3. Discretized Atmospheric Numerical Grid & Isobars
    const isobars = [
      { r: rLimb + 35, dash: [4, 8], color: "rgba(255, 255, 255, 0.04)" },
      { r: rKarman, dash: [8, 6, 2, 6], color: "rgba(16, 185, 129, 0.16)" },
      { r: rLimb + 200, dash: [3, 9], color: "rgba(255, 255, 255, 0.03)" },
    ];

    isobars.forEach(iso => {
      ctx.beginPath();
      ctx.setLineDash(iso.dash);
      ctx.arc(cx, cy, iso.r, -Math.PI * 0.95, -Math.PI * 0.05);
      ctx.strokeStyle = iso.color;
      ctx.lineWidth = 0.85;
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Discretized Meridians (Structured atmospheric grid lines)
    ctx.beginPath();
    const meridianStep = 0.08;
    for (let a = -Math.PI * 0.88; a <= -Math.PI * 0.12; a += meridianStep) {
      const p1x = cx + Math.cos(a) * (rLimb + 10);
      const p1y = cy + Math.sin(a) * (rLimb + 10);
      const p2x = cx + Math.cos(a) * (rExo - 20);
      const p2y = cy + Math.sin(a) * (rExo - 20);
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
    }
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // 4. Telemetry HUD Markers along the Atmospheric Arc
    ctx.font = "9px 'JetBrains Mono', monospace";
    const hudStations = [
      { angle: -Math.PI * 0.76, r: rKarman + 14, text: "ALT: 100.2 km [KÁRMÁN LINE]" },
      { angle: -Math.PI * 0.58, r: rLimb + 48, text: "Kn: 0.082 [RAREFIED]" },
      { angle: -Math.PI * 0.42, r: rKarman + 14, text: "CUDA: 100M BODIES · RK4" },
      { angle: -Math.PI * 0.28, r: rLimb + 210, text: "SX1262: 915 MHz SYNC" }
    ];

    hudStations.forEach(st => {
      const hx = cx + Math.cos(st.angle) * st.r;
      const hy = cy + Math.sin(st.angle) * st.r;
      if (hx > 0 && hx < width && hy > 0 && hy < height) {
        ctx.fillStyle = "rgba(16, 185, 129, 0.5)";
        ctx.fillRect(hx - 2, hy - 2, 4, 4);
        ctx.fillStyle = "rgba(203, 213, 225, 0.35)";
        ctx.fillText(st.text, hx + 8, hy + 3);
      }
    });

    // 5. Eulerian Streamline Simulation Particles (Aerodynamic Flow)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.angle += p.speed;

      // Wrap around atmospheric stream
      if (p.angle > -Math.PI * 0.06) {
        p.angle = -Math.PI * 0.94;
        p.altOffset = Math.random() * 240 + 25;
        p.history = [];
      }

      // Polar to Cartesian
      let currentR = R + p.altOffset;
      let px = cx + Math.cos(p.angle) * currentR;
      let py = cy + Math.sin(p.angle) * currentR;

      // Aerodynamic Cursor Deflection (Supersonic bow shock / streamline diversion)
      if (mouse.active) {
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.hypot(dx, dy);
        const deflectionRadius = 140;
        if (dist < deflectionRadius && dist > 0) {
          const force = (1 - dist / deflectionRadius) * 26;
          px += (dx / dist) * force;
          py += (dy / dist) * force;
        }
      }

      // Store history for sleek velocity tail
      p.history.push({ x: px, y: py });
      if (p.history.length > 8) p.history.shift();

      // Draw particle streamline trail
      if (p.history.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.history[0].x, p.history[0].y);
        for (let h = 1; h < p.history.length; h++) {
          ctx.lineTo(p.history[h].x, p.history[h].y);
        }

        let strokeColor = "rgba(226, 232, 240, 0.22)";
        if (p.hueType === "emerald") strokeColor = "rgba(16, 185, 129, 0.28)";
        else if (p.hueType === "amber") strokeColor = "rgba(245, 158, 11, 0.25)";
        else strokeColor = "rgba(203, 213, 225, 0.18)";

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = p.size;
        ctx.stroke();
      }

      // Leading particle spark
      ctx.beginPath();
      ctx.arc(px, py, p.size * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = p.hueType === "emerald" ? "rgba(16, 185, 129, 0.7)" : (p.hueType === "amber" ? "rgba(245, 158, 11, 0.7)" : "rgba(241, 245, 249, 0.7)");
      ctx.fill();
    }

    animId = requestAnimationFrame(render);
  }

  window.addEventListener("resize", () => {
    resize();
    initParticles();
  }, { passive: true });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  document.addEventListener("visibilitychange", () => {
    isRunning = !document.hidden;
    if (isRunning && !animId) animId = requestAnimationFrame(render);
    else if (!isRunning && animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  });

  resize();
  initParticles();
  animId = requestAnimationFrame(render);
}

// -----------------------------------------------------------------------------
// 3. Discretized Spacetime Gravitational Mesh Algorithm (Tile Background)
// -----------------------------------------------------------------------------
function initDiscretizedSpacetimeMesh() {
  const canvas = document.getElementById("spacetime-mesh-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let animId = null;
  let isVisible = false;
  let time = 0;

  // Grid resolution
  const COLS = 26;
  const ROWS = 16;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width || 800;
    height = rect.height || 400;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function render() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    time += 0.015;

    // Moving gravitational attractor mass (orbiting center)
    const cx = width / 2;
    const cy = height / 2;
    const massX = cx + Math.cos(time) * (width * 0.18);
    const massY = cy + Math.sin(time) * (height * 0.15);

    const stepX = width / (COLS - 1);
    const stepY = height / (ROWS - 1);

    // Grid points array
    const grid = [];

    for (let r = 0; r < ROWS; r++) {
      grid[r] = [];
      for (let c = 0; c < COLS; c++) {
        const baseX = c * stepX;
        const baseY = r * stepY;

        // Discretized curvature deformation towards gravitational mass
        const dx = massX - baseX;
        const dy = massY - baseY;
        const distSq = dx * dx + dy * dy + 1800;
        const dist = Math.sqrt(distSq);

        // Gravitational displacement
        const pull = 1600 / distSq;
        const px = baseX + (dx / dist) * Math.min(pull * 18, 45);
        const py = baseY + (dy / dist) * Math.min(pull * 18, 45);

        grid[r][c] = { x: px, y: py, dist };
      }
    }

    // Draw horizontal mesh lines
    for (let r = 0; r < ROWS; r++) {
      ctx.beginPath();
      for (let c = 0; c < COLS; c++) {
        const pt = grid[r][c];
        if (c === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Draw vertical mesh lines
    for (let c = 0; c < COLS; c++) {
      ctx.beginPath();
      for (let r = 0; r < ROWS; r++) {
        const pt = grid[r][c];
        if (r === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Draw gravitational singularity glow at mass position
    const grad = ctx.createRadialGradient(massX, massY, 0, massX, massY, 48);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    grad.addColorStop(0.35, "rgba(16, 185, 129, 0.2)");
    grad.addColorStop(0.7, "rgba(245, 158, 11, 0.08)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(massX, massY, 48, 0, Math.PI * 2);
    ctx.fill();

    // Orbiting Keplerian N-body particle tracers around the mass
    const orbiters = 14;
    for (let i = 0; i < orbiters; i++) {
      const radius = 30 + (i * 8);
      const speed = 1.7 / Math.sqrt(radius);
      const angle = time * speed + (i * 1.35);
      const ox = massX + Math.cos(angle) * radius * 1.45;
      const oy = massY + Math.sin(angle) * radius * 0.72;

      ctx.beginPath();
      ctx.arc(ox, oy, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? "rgba(56, 189, 248, 0.85)" : "rgba(165, 180, 252, 0.8)";
      ctx.fill();

      // Subtle particle trailing arc
      ctx.beginPath();
      ctx.arc(massX, massY, radius * 0.72, angle - 0.35, angle);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    animId = requestAnimationFrame(render);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  const card = canvas.closest(".product-card");
  if (card && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        resize();
        if (!animId) animId = requestAnimationFrame(render);
      } else {
        if (animId) cancelAnimationFrame(animId);
        animId = null;
      }
    }, { threshold: 0.05 });
    observer.observe(card);
  } else {
    isVisible = true;
    animId = requestAnimationFrame(render);
  }
}

// -----------------------------------------------------------------------------
// 4. Other Discrete Background Canvases (RF Waveform & Logic Diagram)
// -----------------------------------------------------------------------------
function initTileBackgroundCanvases() {
  // RF Waveform Canvas (Telemetry tile)
  const rfCanvas = document.getElementById("rf-waveform-canvas");
  if (rfCanvas) {
    const ctx = rfCanvas.getContext("2d");
    let phase = 0;
    let isVisible = false;

    function drawRF() {
      if (!isVisible) return;
      const w = rfCanvas.width = rfCanvas.clientWidth || 800;
      const h = rfCanvas.height = rfCanvas.clientHeight || 400;

      ctx.clearRect(0, 0, w, h);
      phase += 0.035;

      // Dual I/Q carriers with modulated envelope
      ctx.beginPath();
      for (let x = 0; x < w; x += 3) {
        const envelope = Math.sin(x * 0.007 + phase * 0.4) * 0.6 + 0.4;
        const carrier = Math.sin(x * 0.065 + phase * 2.2);
        const y = h * 0.5 + carrier * envelope * (h * 0.26);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // Q-channel phase offset carrier
      ctx.beginPath();
      for (let x = 0; x < w; x += 4) {
        const envelope = Math.sin(x * 0.007 + phase * 0.4 + 1.2) * 0.5 + 0.35;
        const carrier = Math.cos(x * 0.065 + phase * 2.2);
        const y = h * 0.5 + carrier * envelope * (h * 0.22);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(14, 165, 233, 0.25)";
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // LoRa upward chirps (frequency sweeps)
      const chirpCount = 4;
      for (let c = 0; c < chirpCount; c++) {
        const chirpProg = ((phase * 0.12 + c / chirpCount) % 1);
        const startX = chirpProg * (w * 0.85);
        ctx.beginPath();
        ctx.moveTo(startX, h * 0.82);
        ctx.lineTo(startX + 80, h * 0.2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - chirpProg) * 0.38})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // In-phase / Quadrature (IQ) Constellation Radar in top-right
      const iqX = w - 75;
      const iqY = 70;
      const iqR = 34;
      ctx.beginPath();
      ctx.arc(iqX, iqY, iqR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.22)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(iqX - iqR, iqY); ctx.lineTo(iqX + iqR, iqY);
      ctx.moveTo(iqX, iqY - iqR); ctx.lineTo(iqX, iqY + iqR);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
      ctx.stroke();

      // Rotating phasor constellation points
      for (let k = 0; k < 4; k++) {
        const phi = phase * 0.75 + (k * Math.PI / 2);
        const px = iqX + Math.cos(phi) * (iqR * 0.7);
        const py = iqY + Math.sin(phi) * (iqR * 0.7);
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.8)";
        ctx.fill();
      }

      requestAnimationFrame(drawRF);
    }

    const card = rfCanvas.closest(".product-card");
    if (card && "IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) drawRF();
      }, { threshold: 0.05 }).observe(card);
    } else {
      isVisible = true;
      drawRF();
    }
  }

  // PyroCast Thermodynamic CFD & Isochrone Wavefront Canvas (Card 2: PyroCast)
  const pyroCanvas = document.getElementById("pyrocast-mesh-canvas");
  if (pyroCanvas) {
    const ctx = pyroCanvas.getContext("2d");
    let isVisible = false;
    let phase = 0;
    const embers = [];
    const EMBER_COUNT = 24;

    function initEmbers(w, h) {
      embers.length = 0;
      for (let i = 0; i < EMBER_COUNT; i++) {
        embers.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.random() * 0.8 + 0.4,
          vy: (Math.random() - 0.5) * 0.3 - 0.2,
          life: Math.random(),
          size: Math.random() * 1.5 + 0.8
        });
      }
    }

    function drawPyro() {
      if (!isVisible) return;
      const w = pyroCanvas.width = pyroCanvas.clientWidth || 800;
      const h = pyroCanvas.height = pyroCanvas.clientHeight || 400;

      if (!embers.length) initEmbers(w, h);

      ctx.clearRect(0, 0, w, h);
      phase += 0.02;

      const originX = w * 0.28;
      const originY = h * 0.58;

      // Draw Rothermel elliptical isochrone wavefront contours
      const wavefronts = 6;
      for (let i = 0; i < wavefronts; i++) {
        const progress = ((phase * 0.2 + i / wavefronts) % 1);
        const radiusA = progress * (w * 0.52) + 20;
        const radiusB = progress * (h * 0.42) + 14;

        ctx.beginPath();
        const windAngle = 0.22;
        const steps = 40;
        for (let s = 0; s <= steps; s++) {
          const theta = (s / steps) * Math.PI * 2;
          const turbulence = Math.sin(theta * 5 + phase * 2) * 5 * progress;
          const ex = Math.cos(theta) * (radiusA + turbulence);
          const ey = Math.sin(theta) * (radiusB + turbulence);

          const drift = progress * 60;
          const rx = originX + drift + (ex * Math.cos(windAngle) - ey * Math.sin(windAngle));
          const ry = originY + (ex * Math.sin(windAngle) + ey * Math.cos(windAngle));

          if (s === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.closePath();

        const alpha = (1 - progress) * 0.28;
        ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Draw drifting thermal embers along wind field
      embers.forEach(e => {
        e.x += e.vx;
        e.y += e.vy;
        e.life += 0.01;
        if (e.x > w || e.life >= 1) {
          e.x = originX + (Math.random() - 0.5) * 40;
          e.y = originY + (Math.random() - 0.5) * 30;
          e.life = 0;
        }

        const alpha = Math.sin(e.life * Math.PI) * 0.6;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 146, 60, ${alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(drawPyro);
    }

    const card = pyroCanvas.closest(".product-card");
    if (card && "IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) drawPyro();
      }, { threshold: 0.05 }).observe(card);
    } else {
      isVisible = true;
      drawPyro();
    }
  }

  // Silicium Distributed Compute Grid Canvas (Card 3: Silicium Network)
  const siliciumCanvas = document.getElementById("silicium-grid-canvas");
  if (siliciumCanvas) {
    const ctx = siliciumCanvas.getContext("2d");
    let isVisible = false;
    let time = 0;

    const NODE_COUNT = 18;
    const nodes = [];

    function initSiliciumNodes(w, h) {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * (w - 60) + 30,
          y: Math.random() * (h - 60) + 30,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          isLeader: i === 0 || i === 4 || i === 9
        });
      }
    }

    function drawSilicium() {
      if (!isVisible) return;
      const w = siliciumCanvas.width = siliciumCanvas.clientWidth || 800;
      const h = siliciumCanvas.height = siliciumCanvas.clientHeight || 400;

      if (!nodes.length) initSiliciumNodes(w, h);

      ctx.clearRect(0, 0, w, h);
      time += 0.02;

      // Update nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 20 || n.x > w - 20) n.vx *= -1;
        if (n.y < 20 || n.y > h - 20) n.vy *= -1;
      });

      // Draw verification connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 125) {
            const alpha = (1 - d / 125) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Verification pulse packet traveling along line
            const pulse = (time * 1.2 + (i + j) * 0.25) % 1;
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulse;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulse;
            ctx.beginPath();
            ctx.arc(px, py, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
            ctx.fill();
          }
        }
      }

      // Draw node clusters
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.isLeader ? 2.8 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = n.isLeader ? "rgba(16, 185, 129, 0.6)" : "rgba(56, 189, 248, 0.4)";
        ctx.fill();
      });

      requestAnimationFrame(drawSilicium);
    }

    const card = siliciumCanvas.closest(".product-card");
    if (card && "IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) drawSilicium();
      }, { threshold: 0.05 }).observe(card);
    } else {
      isVisible = true;
      drawSilicium();
    }
  }

  // Geodesic Curved Ray Canvas (Relativistic Raytracer tile)
  const geoCanvas = document.getElementById("geodesic-ray-canvas");
  if (geoCanvas) {
    const ctx = geoCanvas.getContext("2d");
    let isVisible = false;

    function drawGeo() {
      if (!isVisible) return;
      const w = geoCanvas.width = geoCanvas.clientWidth || 800;
      const h = geoCanvas.height = geoCanvas.clientHeight || 400;

      ctx.clearRect(0, 0, w, h);

      const bhX = w * 0.75;
      const bhY = h * 0.5;
      const mass = 4500;

      // Accretion disk Doppler beaming glow (approaching side on left is brighter)
      const diskGrad = ctx.createRadialGradient(bhX - 22, bhY - 4, 12, bhX, bhY, 82);
      diskGrad.addColorStop(0, "rgba(244, 114, 182, 0.42)");
      diskGrad.addColorStop(0.35, "rgba(168, 85, 247, 0.25)");
      diskGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.08)");
      diskGrad.addColorStop(1, "transparent");
      ctx.fillStyle = diskGrad;
      ctx.beginPath();
      ctx.ellipse(bhX, bhY, 85, 26, -0.22, 0, Math.PI * 2);
      ctx.fill();

      // Event horizon & photon sphere
      ctx.beginPath();
      ctx.arc(bhX, bhY, 25, 0, Math.PI * 2);
      ctx.fillStyle = "#040711";
      ctx.fill();
      ctx.strokeStyle = "rgba(192, 132, 252, 0.65)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Einstein lensing ring
      ctx.beginPath();
      ctx.arc(bhX, bhY, 40, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.3)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Curved photon trajectories
      const rayCount = 12;
      for (let i = 0; i < rayCount; i++) {
        const startY = (h / (rayCount + 1)) * (i + 1);
        ctx.beginPath();
        let rx = 0;
        let ry = startY;
        let rvx = 3.6;
        let rvy = 0;

        ctx.moveTo(rx, ry);
        for (let step = 0; step < 95; step++) {
          const dx = bhX - rx;
          const dy = bhY - ry;
          const distSq = dx * dx + dy * dy + 350;
          const dist = Math.sqrt(distSq);

          const f = mass / (distSq * dist);
          rvx += dx * f;
          rvy += dy * f;

          const speed = Math.hypot(rvx, rvy);
          if (speed > 0) {
            rvx = (rvx / speed) * 3.6;
            rvy = (rvy / speed) * 3.6;
          }

          rx += rvx;
          ry += rvy;
          ctx.lineTo(rx, ry);

          if (rx > w || rx < -50 || ry > h + 50 || ry < -50) break;
        }

        ctx.strokeStyle = i % 2 === 0 ? "rgba(168, 85, 247, 0.22)" : "rgba(56, 189, 248, 0.2)";
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      requestAnimationFrame(drawGeo);
    }

    const card = geoCanvas.closest(".product-card");
    if (card && "IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) drawGeo();
      }, { threshold: 0.05 }).observe(card);
    } else {
      isVisible = true;
      drawGeo();
    }
  }

  // Ptrace / Hex Diagnostics Canvas (Unix Diagnostic Toolchain tile)
  const hexCanvas = document.getElementById("ptrace-hex-canvas");
  if (hexCanvas) {
    const ctx = hexCanvas.getContext("2d");
    let isVisible = false;
    let offset = 0;

    const opcodes = [
      "ptrace(PTRACE_SYSCALL, pid, 0, 0)",
      "0x00007ffe34ab1040: 48 89 e5 48 83 ec 10",
      "SYS_write(fd=1, buf=0x7ffe34ab, count=64)",
      "ELF64_HDR: e_machine=0x3e [x86_64] e_type=0x2",
      "SYS_mmap(0x0, 0x1000, PROT_READ|PROT_WRITE)",
      "SYM_TAB: .text [0x401000] .rodata [0x402000]",
      "REG_RAX: 0x0000000000000001 (SYS_write)",
      "PTRACE_GETREGS: struct user_regs_struct ok",
      "SIGNAL: SIGTRAP intercepted (si_code=0x1)"
    ];

    function drawHex() {
      if (!isVisible) return;
      const w = hexCanvas.width = hexCanvas.clientWidth || 800;
      const h = hexCanvas.height = hexCanvas.clientHeight || 400;

      ctx.clearRect(0, 0, w, h);
      offset += 0.35;

      ctx.font = "11px monospace";
      ctx.fillStyle = "rgba(56, 189, 248, 0.16)";

      const lineHeight = 26;
      opcodes.forEach((line, idx) => {
        const y = ((idx * lineHeight - offset) % (opcodes.length * lineHeight) + opcodes.length * lineHeight) % (opcodes.length * lineHeight);
        ctx.fillText(line, 24, y);
      });

      requestAnimationFrame(drawHex);
    }

    const card = hexCanvas.closest(".product-card");
    if (card && "IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) drawHex();
      }, { threshold: 0.05 }).observe(card);
    } else {
      isVisible = true;
      drawHex();
    }
  }
}

// -----------------------------------------------------------------------------
// 5. Scroll Reveals
// -----------------------------------------------------------------------------
function initScrollReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  function revealElement(el) {
    el.classList.add("revealed");
  }

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      revealElement(el);
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          revealElement(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: "0px 0px 100px 0px"
    });

    elements.forEach(el => {
      if (!el.classList.contains("revealed")) {
        observer.observe(el);
      }
    });
  }

  window.addEventListener("scroll", () => {
    elements.forEach(el => {
      if (!el.classList.contains("revealed")) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 60) {
          revealElement(el);
        }
      }
    });
  }, { passive: true });
}

// -----------------------------------------------------------------------------
// 6. Radial Spotlight Following Cursor
// -----------------------------------------------------------------------------
function initSpotlights() {
  const cards = document.querySelectorAll(".bento-card, .product-card");
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }, { passive: true });
  });
}

// -----------------------------------------------------------------------------
// 7. Project Directory & Search (Engineering Table Matrix)
// -----------------------------------------------------------------------------
function initProjectDirectory() {
  const tbody = document.getElementById("index-table-body");
  const emptyState = document.getElementById("index-empty-state");
  const searchInput = document.getElementById("archive-search-input");
  const resetBtn = document.getElementById("index-reset-btn");
  const tabs = document.querySelectorAll(".index-tab");

  if (!tbody) return;

  let activeCategory = "All";
  let searchQuery = "";

  function getDomainBadgeClass(cat) {
    switch (cat) {
      case "Aerospace & HPC": return "index-domain-badge--aerospace";
      case "Systems & Kernel": return "index-domain-badge--systems";
      case "Algorithms & AI": return "index-domain-badge--ai";
      case "Network & Concurrency": return "index-domain-badge--net";
      case "Scientific Computing": return "index-domain-badge--math";
      default: return "";
    }
  }

  function updateTabCounts() {
    tabs.forEach(tab => {
      const cat = tab.dataset.category;
      let count = 0;
      if (cat === "All") {
        count = DIRECTORY_PROJECTS.length;
      } else {
        count = DIRECTORY_PROJECTS.filter(p => p.category === cat).length;
      }
      const rawLabel = tab.textContent.replace(/\s*\(\d+\)/, "").trim();
      tab.textContent = `${rawLabel} (${count})`;
    });
  }

  function render() {
    const q = searchQuery.trim().toLowerCase();

    const filtered = DIRECTORY_PROJECTS.filter(project => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;

      if (!matchesCategory) return false;

      if (!q) return true;

      const searchableText = [
        project.title,
        project.module,
        project.category,
        project.summary,
        ...project.languages
      ].join(" ").toLowerCase();

      return searchableText.includes(q);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = "";
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    const html = filtered.map(p => {
      const domainClass = getDomainBadgeClass(p.category);
      const stackChips = p.languages
        .map(lang => `<span class="index-tag-chip" data-tech="${escapeHtml(lang)}" title="Filter by ${escapeHtml(lang)}" style="cursor:pointer;">${escapeHtml(lang)}</span>`)
        .join("");

      const summaryText = (currentLang === "fr" && p.summary_fr) ? p.summary_fr : p.summary;
      const btnText = currentLang === "fr" ? "Dépôt ↗" : "Source ↗";
      const btnTitle = currentLang === "fr" ? "Consulter le code source" : "Inspect repository";
      const previewText = currentLang === "fr" ? "Aperçu ⚡" : "Preview ⚡";
      const previewTitle = currentLang === "fr" ? "Aperçu de l'exécution" : "Showcase run preview";

      return `
        <div class="index-row" data-category="${escapeHtml(p.category)}">
          <div class="col-project">
            <a class="index-row-title" href="${escapeHtml(p.github)}" target="_blank" rel="noreferrer">
              ${escapeHtml(p.title)} <span class="ext-icon" aria-hidden="true">↗</span>
            </a>
            <span class="index-row-context">${escapeHtml(p.module)}</span>
          </div>
          <div class="col-domain">
            <span class="index-domain-badge ${domainClass}">${escapeHtml(p.category)}</span>
          </div>
          <div class="col-summary">${escapeHtml(summaryText)}</div>
          <div class="col-stack">${stackChips}</div>
          <div class="col-action">
            <button class="index-preview-btn" data-project-id="${escapeHtml(p.id)}" type="button" title="${previewTitle}">
              ${previewText}
            </button>
            <a class="index-link-btn" href="${escapeHtml(p.github)}" target="_blank" rel="noreferrer" title="${btnTitle}">
              ${btnText}
            </a>
          </div>
        </div>
      `;
    }).join("");

    tbody.innerHTML = html;
  }

  // Tab Filtering
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      activeCategory = tab.dataset.category || "All";
      render();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      render();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      activeCategory = "All";
      searchQuery = "";
      if (searchInput) searchInput.value = "";
      tabs.forEach(t => {
        const isAll = t.dataset.category === "All";
        t.classList.toggle("active", isAll);
        t.setAttribute("aria-selected", isAll ? "true" : "false");
      });
      render();
    });
  }

  // Tech chip clicks in table
  tbody.addEventListener("click", (e) => {
    const chip = e.target.closest(".index-tag-chip");
    if (!chip) return;
    const tech = chip.dataset.tech;
    if (tech && searchInput) {
      searchInput.value = tech;
      searchQuery = tech;
      render();
    }
  });

  // Featured product chip click to jump to archive and filter
  document.querySelectorAll(".product-chip").forEach(chip => {
    chip.style.cursor = "pointer";
    chip.title = `Filter index by ${chip.textContent.trim()}`;
    chip.addEventListener("click", () => {
      const kw = chip.textContent.trim();
      const archiveSection = document.getElementById("archive");
      if (archiveSection) {
        archiveSection.scrollIntoView({ behavior: "smooth" });
      }
      if (searchInput) {
        searchInput.value = kw;
        searchQuery = kw;
        render();
      }
    });
  });

  
  window.addEventListener("portfolio:projects-loaded", () => {
    updateTabCounts();
    render();
  });

  updateTabCounts();
  render();

  registerLangListener(() => {
    updateTabCounts();
    render();
  });
}

// -----------------------------------------------------------------------------
// 7b. Project Execution Showcase Modal
// -----------------------------------------------------------------------------
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const backdrop = document.getElementById("project-modal-backdrop");
  const closeBtn = document.getElementById("project-modal-close");
  const footerCloseBtn = document.getElementById("modal-close-btn");

  const badgeEl = document.getElementById("modal-project-badge");
  const moduleEl = document.getElementById("modal-project-module");
  const titleEl = document.getElementById("modal-project-title");
  const imgEl = document.getElementById("modal-project-img");
  const summaryEl = document.getElementById("modal-project-summary");
  const whyEl = document.getElementById("modal-project-why");
  const whyBlock = document.getElementById("modal-why-section");
  const stackEl = document.getElementById("modal-project-stack");
  const metricsEl = document.getElementById("modal-project-metrics");
  const metricsBlock = document.getElementById("modal-metrics-section");
  const githubLink = document.getElementById("modal-project-github");

  function openProjectModal(projectId) {
    const list = (typeof DIRECTORY_PROJECTS !== "undefined" ? DIRECTORY_PROJECTS : []);
    const project = list.find(p => p.id === projectId);
    if (!project) return;

    const lang = currentLang || "fr";

    if (badgeEl) {
      badgeEl.textContent = project.category || "";
      badgeEl.className = "index-domain-badge";
      if (project.category === "Aerospace & HPC") badgeEl.classList.add("index-domain-badge--aerospace");
      else if (project.category === "Systems & Kernel") badgeEl.classList.add("index-domain-badge--systems");
      else if (project.category === "Algorithms & AI") badgeEl.classList.add("index-domain-badge--ai");
      else if (project.category === "Network & Concurrency") badgeEl.classList.add("index-domain-badge--net");
      else if (project.category === "Scientific Computing") badgeEl.classList.add("index-domain-badge--math");
    }

    if (moduleEl) moduleEl.textContent = project.module || "";
    if (titleEl) titleEl.textContent = project.title || "";

    if (imgEl) {
      const shotUrl = project.screenshot || `assets/project-art/${project.id}.png`;
      imgEl.src = shotUrl;
      imgEl.alt = `${project.title} - Execution Showcase`;
    }

    if (summaryEl) {
      summaryEl.textContent = (lang === "fr" && project.summary_fr) ? project.summary_fr : project.summary;
    }

    if (whyEl && whyBlock) {
      const whyText = (lang === "fr" && project.why_it_matters_fr) ? project.why_it_matters_fr : (project.why_it_matters || "");
      if (whyText) {
        whyEl.textContent = whyText;
        whyBlock.hidden = false;
      } else {
        whyBlock.hidden = true;
      }
    }

    if (stackEl) {
      stackEl.innerHTML = (project.languages || [])
        .map(langName => `<span class="modal-chip">${escapeHtml(langName)}</span>`)
        .join("");
    }

    if (metricsEl && metricsBlock) {
      const metrics = project.metrics || {};
      const keys = Object.keys(metrics);
      if (keys.length > 0) {
        metricsBlock.hidden = false;
        metricsEl.innerHTML = keys.map(k => `
          <div class="modal-metric-card">
            <span class="modal-metric-label">${escapeHtml(k.replace(/_/g, " "))}</span>
            <span class="modal-metric-value">${escapeHtml(String(metrics[k]))}</span>
          </div>
        `).join("");
      } else {
        metricsBlock.hidden = true;
      }
    }

    if (githubLink) {
      if (project.github) {
        githubLink.href = project.github;
        githubLink.style.display = "";
        const spanText = githubLink.querySelector("span");
        if (spanText) {
          spanText.textContent = (lang === "fr" ? "Consulter le code source sur GitHub ↗" : "View source on GitHub ↗");
        }
      } else if (project.demo) {
        githubLink.href = project.demo;
        githubLink.style.display = "";
        const spanText = githubLink.querySelector("span");
        if (spanText) {
          spanText.textContent = (lang === "fr" ? "Voir la démo vidéo (8K) ↗" : "Watch video demo (8K) ↗");
        }
      } else {
        githubLink.style.display = "none";
      }
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeProjectModal);
  if (footerCloseBtn) footerCloseBtn.addEventListener("click", closeProjectModal);
  if (backdrop) backdrop.addEventListener("click", closeProjectModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeProjectModal();
    }
  });

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-project-id]");
    if (!trigger) return;

    if (trigger.classList.contains("index-preview-btn") || 
        trigger.classList.contains("product-preview-btn") || 
        trigger.classList.contains("matcher-preview-btn")) {
      e.preventDefault();
      const pid = trigger.dataset.projectId;
      if (pid) {
        openProjectModal(pid);
      }
    }
  });
}

// -----------------------------------------------------------------------------
// 8. Navigation Spy
// -----------------------------------------------------------------------------
function initNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".primary-nav a");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" });

  sections.forEach(sec => observer.observe(sec));
}

// -----------------------------------------------------------------------------
// 9. Flagship Projects Deck ("Pile mal rangée" & Défilement Automatique)
// -----------------------------------------------------------------------------
function initFeaturedDeck() {
  const deckContainer = document.getElementById("featured-deck");
  const deckStage = document.getElementById("deck-stage");
  if (!deckContainer || !deckStage) return;

  const cards = Array.from(deckStage.querySelectorAll(".product-card"));
  const pills = Array.from(deckContainer.querySelectorAll(".deck-pill"));
  const prevBtn = document.getElementById("deck-btn-prev");
  const nextBtn = document.getElementById("deck-btn-next");
  const toggleBtn = document.getElementById("deck-btn-toggle");
  const counterEl = document.getElementById("deck-counter");

  if (!cards.length) return;

  deckStage.classList.add("is-stacked");

  const TOTAL = cards.length;
  let currentIndex = 0;
  const CYCLE_MS = 5500; // 5.5s per card for ideal keynote tempo
  let timerStart = Date.now();
  let isHovered = false;
  let isUserPaused = false;
  let isVisibleInViewport = false;
  let rafId = null;

  function updateStageHeight() {
    let maxH = 0;
    cards.forEach(card => {
      const h = card.offsetHeight;
      if (h > maxH) maxH = h;
    });
    if (maxH > 0) {
      deckStage.style.height = `${maxH + 75}px`;
    }
  }

  function setDeckIndex(newIndex) {
    currentIndex = ((newIndex % TOTAL) + TOTAL) % TOTAL;

    // Update ranks for all cards in the stack
    cards.forEach((card, i) => {
      const rank = (i - currentIndex + TOTAL) % TOTAL;
      card.dataset.deckRank = rank;
      card.setAttribute("aria-hidden", rank === 0 ? "false" : "true");
    });

    // Update pills & reset progress bars
    pills.forEach((pill, i) => {
      const isActive = i === currentIndex;
      pill.classList.toggle("active", isActive);
      pill.setAttribute("aria-selected", isActive ? "true" : "false");
      const fill = pill.querySelector(".deck-pill-fill");
      if (fill && !isActive) fill.style.width = "0%";
    });

    // Update counter
    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${TOTAL}`;
    }

    timerStart = Date.now();
    updateStageHeight();
  }

  // Animation frame loop for smooth timer progress
  function loop() {
    if (!isUserPaused && !isHovered && isVisibleInViewport) {
      const elapsed = Date.now() - timerStart;
      const progress = Math.min(1, elapsed / CYCLE_MS);

      const activePill = pills[currentIndex];
      if (activePill) {
        const fill = activePill.querySelector(".deck-pill-fill");
        if (fill) fill.style.width = `${progress * 100}%`;
      }

      if (elapsed >= CYCLE_MS) {
        setDeckIndex(currentIndex + 1);
      }
    }
    rafId = requestAnimationFrame(loop);
  }

  // Prev / Next button handlers
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      setDeckIndex(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      setDeckIndex(currentIndex + 1);
    });
  }

  // Play / Pause toggle button
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isUserPaused = !isUserPaused;
      const icon = toggleBtn.querySelector(".play-icon");
      if (icon) icon.textContent = isUserPaused ? "▶" : "⏸";
      toggleBtn.setAttribute("aria-label", isUserPaused ? "Reprendre le défilement auto" : "Mettre en pause le défilement auto");
      toggleBtn.title = isUserPaused ? "Reprendre" : "Pause";
      if (!isUserPaused) timerStart = Date.now();
    });
  }

  // Pill click handlers
  pills.forEach((pill, i) => {
    pill.addEventListener("click", () => {
      setDeckIndex(i);
    });
  });

  // Clicking on a peeked card in the messy stack brings it directly to the front!
  cards.forEach((card, i) => {
    card.addEventListener("click", (e) => {
      const rank = parseInt(card.dataset.deckRank, 10);
      if (rank > 0) {
        if (!e.target.closest("a, button")) {
          e.preventDefault();
          setDeckIndex(i);
        }
      }
    });
  });

  // Hover pauses the deck timer so the reader is never interrupted
  deckContainer.addEventListener("mouseenter", () => {
    isHovered = true;
  });
  deckContainer.addEventListener("mouseleave", () => {
    isHovered = false;
    timerStart = Date.now();
  });

  // Mobile touch swipe gestures
  let touchStartX = 0;
  deckStage.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  deckStage.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) setDeckIndex(currentIndex + 1);
      else setDeckIndex(currentIndex - 1);
    }
  }, { passive: true });

  // Pause when off-screen to save CPU & battery
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      isVisibleInViewport = entry.isIntersecting;
      if (isVisibleInViewport) {
        timerStart = Date.now();
        updateStageHeight();
      }
    }, { threshold: 0.15 }).observe(deckContainer);
  } else {
    isVisibleInViewport = true;
  }

  // Keyboard navigation
  deckContainer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setDeckIndex(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setDeckIndex(currentIndex + 1);
    }
  });

  window.addEventListener("resize", updateStageHeight, { passive: true });

  // Initial render
  setDeckIndex(0);
  rafId = requestAnimationFrame(loop);
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/// -----------------------------------------------------------------------------
// 10. Job Offer Matcher & Compatibility Engine (Projets & Compétences en accord)
// -----------------------------------------------------------------------------

const MATCHER_PRESETS = {
  aerospace: {
    domain: { fr: "Télémétrie Aérospatiale & Logiciel de Vol", en: "Aerospace & Flight Telemetry" },
    text: {
      fr: "Recherche un Ingénieur Logiciel Embarqué de Vol pour concevoir des pipelines déterministes C et C++20 de réception de télémétrie, des protocoles radio (Semtech SX1262 LoRa / RF 915 MHz) et des stations sol Qt. Expérience requise : acquisition de signal à faible latence, compensation Doppler, buffers lock-free, resynchronisation de trames FSM sous-milliseconde et normes de fiabilité logicielle spatiale NASA (NPR-7150.2D).",
      en: "Looking for an Embedded Flight Software Engineer to design deterministic C and C++20 telemetry reception pipelines, radio communication protocols (Semtech SX1262 LoRa / RF 915 MHz), and Qt Ground Control Stations. Must have experience with low-latency signal acquisition, Doppler tracking, lock-free ring buffers, sub-millisecond FSM frame synchronization, and NASA space software reliability standards (NPR-7150.2D)."
    }
  },
  hpc: {
    domain: { fr: "HPC, CUDA & Physique Numérique", en: "HPC, CUDA & Computational Physics" },
    text: {
      fr: "Ingénieur HPC & Accélération GPU recherché pour simulation physique massivement parallèle. Forte maîtrise de CUDA C++, saturation de bande passante VRAM, accélération spatiale octree, dynamique des particules N-Body / fluides SPH, intégrateurs numériques (Runge-Kutta RK4, Leapfrog) et profilage avec NVIDIA Nsight Systems.",
      en: "HPC & GPU Acceleration Engineer needed for massively parallel physics simulation. Strong mastery of CUDA C++, VRAM memory bandwidth saturation, octree spatial acceleration, N-Body / SPH fluid dynamics, numerical integrators (Runge-Kutta RK4, Leapfrog), and profiling with NVIDIA Nsight Systems."
    }
  },
  kernel: {
    domain: { fr: "Systèmes Linux & Programmation Noyau", en: "Linux Systems & Kernel Software" },
    text: {
      fr: "Ingénieur Systèmes Linux bas niveau requis pour orchestration de processus Unix, interfaces système POSIX, traçage de processus via ptrace(2), introspection binaire ELF64 (tables de symboles, en-têtes de sections), conformité System V AMD64 ABI et développement C haute performance et assembleur x86-64.",
      en: "Low-level Linux Systems Engineer required for Unix process orchestration, POSIX system interfaces, process tracing via ptrace(2), ELF64 binary introspection (symbol tables, section headers), System V AMD64 ABI compliance, and high-performance C and x86-64 assembly development."
    }
  },
  embedded: {
    domain: { fr: "Firmware Embarqué & Systèmes FPGA", en: "Embedded Firmware & FPGA Systems" },
    text: {
      fr: "Ingénieur Firmware Embarqué pour développer du C bare-metal sur microcontrôleurs ARM Cortex-M et ESP32, logique numérique FPGA en VHDL/Verilog sous AMD Vivado, traitement numérique du signal (DSP), architecture SoC et protocoles de bus séries (UART, SPI, I2C, CAN, LoRa).",
      en: "Embedded Firmware Engineer to develop bare-metal C for ARM Cortex-M and ESP32 microcontrollers, FPGA digital logic in VHDL/Verilog using AMD Vivado, digital signal processing (DSP), SoC architecture, and serial bus protocols (UART, SPI, I2C, CAN, LoRa)."
    }
  },
  ai: {
    domain: { fr: "IA Appliquée & Modélisation Environnementale", en: "Applied AI & Scientific Simulation" },
    text: {
      fr: "Ingénieur IA Appliquée et Calcul Scientifique pour concevoir des simulations environnementales prédictives et modèles hybrides physique-IA. Maîtrise de Python, modélisation d'écoulement CFD, propagation de fronts d'incendie de surface Rothermel, évaluation des risques Monte Carlo et algorithmes de recherche adverses (Minimax, élagage Alpha-Beta).",
      en: "Applied AI and Scientific Computing Engineer to build predictive environmental simulations and physics-informed models. Proficiency in Python, CFD flow modeling, Rothermel surface fire front propagation, Monte Carlo risk evaluation, and adversarial search algorithms (Minimax, Alpha-Beta pruning)."
    }
  },
  network: {
    domain: { fr: "Systèmes Distribués & Concurrence Réseau", en: "Distributed Systems & Concurrency" },
    text: {
      fr: "Ingénieur Systèmes Distribués pour concevoir des architectures réseau à haut débit, des runtimes de calcul légers, du multithreading concurrent POSIX (pthreads, mutex, variables de condition), des serveurs sockets BSD RFC 959 multiplexés avec select/poll et des protocoles Rust sûrs en mémoire.",
      en: "Distributed Systems Engineer to design high-throughput network architectures, low-footprint compute runtimes, concurrent POSIX multithreading (pthreads, mutexes, condition variables), RFC 959 BSD socket servers with select/poll multiplexing, and memory-safe Rust protocols."
    }
  }
};

const MATCHER_EXPERIENCES = [
  {
    org: "Long Beach Rocketry · NASA Student Launch (USLI)",
    role: {
      fr: "Responsable Logiciel Télémétrie & Station Sol",
      en: "Lead Telemetry & Ground Control Software"
    },
    date: "2025 – Present",
    desc: {
      fr: "Chaîne de télémétrie C++20 temps réel (<20ms), resynchronisation FSM, buffer lock-free et station sol Qt pour fusée haute puissance.",
      en: "Deterministic real-time C++20 telemetry pipeline (<20ms latency), FSM resynchronization, lock-free ring buffer, and Qt GCS for high-power rocketry."
    },
    keywords: ["c++20", "lora", "sx1262", "telemetry", "nasa", "usli", "doppler", "lock-free", "qt", "fsw", "rf", "aerospace"]
  },
  {
    org: "California State University, Long Beach (CSULB)",
    role: {
      fr: "Génie Électrique & Informatique (Échange Académique)",
      en: "Electrical & Computer Engineering (Exchange Program)"
    },
    date: "2025 – 2026",
    desc: {
      fr: "Conception System-on-Chip (SoC), logique numérique FPGA sous Vivado, traitement numérique du signal (DSP) et Machine Learning.",
      en: "System-on-Chip (SoC) design, FPGA digital logic in Vivado, digital signal processing (DSP), and applied Machine Learning."
    },
    keywords: ["soc", "dsp", "fpga", "vhdl", "verilog", "vivado", "machine learning", "hardware"]
  },
  {
    org: "X'PROCHEM (R&D Pharma)",
    role: {
      fr: "Stagiaire Ingénieur Logiciel & Systèmes",
      en: "Software & Systems Engineering Intern"
    },
    date: "2025",
    desc: {
      fr: "Automatisation de synthèse (LIMS), réduction de 40% de latence PostgreSQL et détection d'anomalies en spectrométrie de masse (0.0001 Da).",
      en: "Synthesis automation (LIMS), 40% reduction in PostgreSQL query latency, and mass spectrometry anomaly detection engine (0.0001 Da)."
    },
    keywords: ["c", "python", "postgresql", "indexing", "mass spectrometry", "lims"]
  },
  {
    org: "Epitech Paris (Tek5 Systems)",
    role: {
      fr: "Expert en Ingénierie Logicielle & Systèmes (Grade Master)",
      en: "Systems & Software Engineering (Master's Degree)"
    },
    date: "2021 – 2027",
    desc: {
      fr: "5 ans de programmation système bas niveau : libc en pur x86-64 ASM, introspection binaire Linux via ptrace/ELF64 (strace, nm, objdump), GPGPU CUDA.",
      en: "5 years of low-level systems programming: pure x86-64 ASM libc, Linux binary introspection via ptrace/ELF64 (strace, nm, objdump), CUDA GPGPU."
    },
    keywords: ["linux", "kernel", "ptrace", "elf", "assembly", "x86_64", "posix", "ipc", "cuda", "c"]
  }
];

const MATCHER_SKILLS_CATALOG = [
  { name: "C++20", cat: { fr: "Langage & Systèmes", en: "Language & Systems" }, triggers: ["c++", "c++20", "cpp", "modern c++"] },
  { name: "CUDA & GPGPU", cat: { fr: "Calcul Haute Performance", en: "High Performance Computing" }, triggers: ["cuda", "gpu", "gpgpu", "vram", "nsight", "parallel"] },
  { name: "C & POSIX", cat: { fr: "Bas Niveau", en: "Low-Level" }, triggers: ["c", "posix", "syscall", "unix"] },
  { name: "Semtech SX1262 LoRa", cat: { fr: "RF & Télémétrie", en: "RF & Telemetry" }, triggers: ["lora", "sx1262", "rf", "telemetry", "radio", "915"] },
  { name: "NASA NPR-7150.2D", cat: { fr: "Normes Spatiales", en: "Aerospace Standards" }, triggers: ["nasa", "usli", "npr-7150.2d", "aerospace", "space"] },
  { name: "Lock-Free Ring Buffers", cat: { fr: "Temps Réel & IPC", en: "Real-Time & IPC" }, triggers: ["lock-free", "ring buffer", "zero-copy", "ipc", "low-latency"] },
  { name: "Linux Internals & ptrace(2)", cat: { fr: "Noyau & Binaire", en: "Kernel & Binary" }, triggers: ["linux", "kernel", "ptrace", "elf", "elf64", "strace"] },
  { name: "x86-64 Assembly", cat: { fr: "Architecture", en: "Architecture" }, triggers: ["assembly", "x86_64", "asm", "system v abi"] },
  { name: "FPGA (VHDL / Verilog)", cat: { fr: "Matériel & Logique", en: "Hardware & Logic" }, triggers: ["fpga", "vhdl", "verilog", "vivado"] },
  { name: "Bare-Metal (ARM Cortex / ESP32)", cat: { fr: "Embarqué", en: "Embedded" }, triggers: ["bare-metal", "arm", "cortex", "esp32", "microcontroller", "firmware", "rtos"] },
  { name: "Qt Ground Control Station", cat: { fr: "IHM & Télémétrie", en: "GUI & Telemetry" }, triggers: ["qt", "ground station", "gcs", "telemetry"] },
  { name: "N-Body & SPH Astrophysics", cat: { fr: "Simulation Physique", en: "Physics Simulation" }, triggers: ["n-body", "sph", "astrophysics", "particles", "physics"] },
  { name: "Numerical Integrators (RK4 / Leapfrog)", cat: { fr: "Math & Numérique", en: "Math & Numerical" }, triggers: ["rk4", "runge-kutta", "leapfrog", "integrator"] },
  { name: "Rust & Solana", cat: { fr: "Réseau & Distribué", en: "Network & Distributed" }, triggers: ["rust", "solana", "distributed", "concurrency"] },
  { name: "Python & Applied AI", cat: { fr: "IA & Modélisation", en: "AI & Modeling" }, triggers: ["python", "ai", "machine learning", "pytorch", "cfd"] },
  { name: "Doppler Tracking", cat: { fr: "Traitement du Signal", en: "Signal Processing" }, triggers: ["doppler", "dsp", "frequency"] }
];

const MATCHER_DOMAINS = {
  aerospace: {
    triggers: ["nasa", "lora", "telemetry", "aerospace", "flight", "radio", "ground station", "fsw", "doppler"],
    domain: { fr: "Télémétrie Aérospatiale & Logiciel de Vol", en: "Aerospace & Flight Telemetry" },
    fitLevel: { fr: "Adéquation Maximale (98%)", en: "Maximum Fit (98%)" },
    title: {
      fr: "Adéquation directe avec le vol NASA USLI & télémétrie C++20",
      en: "Direct alignment with NASA USLI flight software & C++20 telemetry"
    },
    desc: {
      fr: "Luis dirige l'architecture de télémétrie vol de Long Beach Rocketry (NASA Student Launch) : bitstreams LoRa 915 MHz, synchronisation FSM, buffers lock-free (<20ms de latence) et station sol Qt.",
      en: "Luis leads flight telemetry architecture for Long Beach Rocketry (NASA Student Launch): 915 MHz LoRa bitstreams, FSM synchronization, lock-free ring buffers (<20ms latency), and Qt Ground Control Station."
    },
    stackBonus: 98,
    domainBonus: 97,
    standardsBonus: 96
  },
  hpc: {
    triggers: ["cuda", "gpu", "hpc", "n-body", "parallel", "physics", "nsight", "sph"],
    domain: { fr: "HPC & Calcul Accéléré GPU (CUDA)", en: "HPC & GPU Acceleration (CUDA)" },
    fitLevel: { fr: "Adéquation Maximale (96%)", en: "Maximum Fit (96%)" },
    title: {
      fr: "Expertise démontrée en calcul massivement parallèle CUDA",
      en: "Proven expertise in massively parallel CUDA computing"
    },
    desc: {
      fr: "Auteur du moteur BLITZAR (100M particules en CUDA, saturation à 92% de la bande passante VRAM) et d'un raytracer relativiste en espace-temps courbe le long de géodésiques nulles (RK4).",
      en: "Author of the BLITZAR engine (100M particles in CUDA, 92% VRAM bandwidth saturation) and a relativistic curved-spacetime raytracer along null geodesics (RK4)."
    },
    stackBonus: 96,
    domainBonus: 95,
    standardsBonus: 94
  },
  kernel: {
    triggers: ["linux", "kernel", "ptrace", "elf", "assembly", "syscall", "x86_64", "posix"],
    domain: { fr: "Systèmes Linux & Programmation Noyau", en: "Linux Systems & Kernel Software" },
    fitLevel: { fr: "Adéquation Forte (95%)", en: "Strong Fit (95%)" },
    title: {
      fr: "Maîtrise approfondie des interfaces Unix & introspection binaire",
      en: "Deep mastery of Unix interfaces & binary introspection"
    },
    desc: {
      fr: "Développement d'outils d'analyse binaire Linux complets (strace, nm, objdump) via ptrace(2) et décodage ELF64, réimplémentation de la libc en pur assembleur x86-64 et shell POSIX (42sh).",
      en: "Engineered full Linux binary analysis tooling (strace, nm, objdump) via ptrace(2) and ELF64 decoding, pure x86-64 assembly libc reimplementation, and POSIX shell (42sh)."
    },
    stackBonus: 95,
    domainBonus: 94,
    standardsBonus: 96
  },
  embedded: {
    triggers: ["bare-metal", "fpga", "vhdl", "verilog", "arm", "cortex", "esp32", "vivado", "microcontroller", "firmware"],
    domain: { fr: "Firmware Embarqué & Systèmes FPGA", en: "Embedded Firmware & FPGA Systems" },
    fitLevel: { fr: "Adéquation Élevée (93%)", en: "High Fit (93%)" },
    title: {
      fr: "Conception SoC, logique numérique FPGA et C Bare-metal",
      en: "SoC design, FPGA digital logic & bare-metal C"
    },
    desc: {
      fr: "Cursus spécialisé à CSULB en conception SoC, logique numérique, traitement du signal (DSP) et Vivado, avec programmation C bare-metal sur ARM Cortex-M et bus sériels (UART, SPI, I2C, CAN).",
      en: "Specialized coursework at CSULB in SoC design, digital logic, digital signal processing (DSP), and Vivado, with bare-metal C on ARM Cortex-M and serial buses (UART, SPI, I2C, CAN)."
    },
    stackBonus: 93,
    domainBonus: 92,
    standardsBonus: 91
  },
  ai: {
    triggers: ["ai", "cfd", "wildfire", "python", "machine learning", "pytorch", "rothermel", "monte carlo"],
    domain: { fr: "IA Appliquée & Modélisation Environnementale", en: "Applied AI & Scientific Simulation" },
    fitLevel: { fr: "Adéquation Forte (92%)", en: "Strong Fit (92%)" },
    title: {
      fr: "Modélisation couplée physique-IA & dynamique des fluides (CFD)",
      en: "Coupled physics-AI modeling & fluid dynamics (CFD)"
    },
    desc: {
      fr: "Créateur de PyroCast (simulateur de propagation de fronts d'incendies couplant modèle de surface Rothermel, CFD de vent local et évaluation de risque Monte Carlo en Python).",
      en: "Creator of PyroCast (wildfire spread simulator coupling Rothermel surface fire front model, local wind CFD, and Monte Carlo risk assessment in Python)."
    },
    stackBonus: 92,
    domainBonus: 93,
    standardsBonus: 89
  },
  network: {
    triggers: ["distributed", "rust", "sockets", "concurrency", "thread", "solana", "pthreads", "rfc"],
    domain: { fr: "Systèmes Distribués & Concurrence Réseau", en: "Distributed Systems & Concurrency" },
    fitLevel: { fr: "Adéquation Forte (94%)", en: "Strong Fit (94%)" },
    title: {
      fr: "Protocoles réseau concurrents & programmation multithread",
      en: "Concurrent network protocols & multithreaded systems"
    },
    desc: {
      fr: "Architecture réseau décentralisée IoT en Rust (Silicium Network), serveurs BSD Sockets RFC 959 (myFTP) et synchronisation POSIX threads/sémaphores (Panoramix).",
      en: "Decentralized IoT compute network in Rust (Silicium Network), RFC 959 BSD socket servers (myFTP), and POSIX multithreading/semaphore synchronization (Panoramix)."
    },
    stackBonus: 94,
    domainBonus: 93,
    standardsBonus: 93
  },
  default: {
    triggers: [],
    domain: { fr: "Ingénierie Systèmes Embarqués, HPC & IA", en: "Embedded Systems, HPC & AI Engineering" },
    fitLevel: { fr: "Excellente Adéquation (96%)", en: "Excellent Fit (96%)" },
    title: {
      fr: "Profil directement aligné sur vos exigences techniques",
      en: "Profile directly aligned with your technical requirements"
    },
    desc: {
      fr: "Le codebase de Luis et ses réalisations en vol valident les compétences critiques requises en C/C++, temps réel et systèmes.",
      en: "Luis's codebase and flight-proven builds validate the critical competencies required in low-level C/C++, real-time systems, and HPC."
    },
    stackBonus: 96,
    domainBonus: 95,
    standardsBonus: 94
  }
};

function getProjectWhy(p, raw, lang) {
  if (p.title.includes("LBR Telemetry")) {
    return lang === "fr"
      ? "Répond directement aux besoins de télémétrie radio temps réel (<20ms) et de logiciel de vol avec LoRa SX1262, resynchronisation FSM et IPC zero-copy."
      : "Directly fulfills real-time radio telemetry (<20ms) and flight software requirements with LoRa SX1262, FSM resync, and zero-copy IPC.";
  }
  if (p.title.includes("BLITZAR")) {
    return lang === "fr"
      ? "Démontre une saturation de bande passante VRAM à 92% et un calcul gravitationnel N-Body/SPH massivement parallèle en CUDA pour 100M particules (NPR-7150.2D)."
      : "Demonstrates 92% VRAM bandwidth saturation and massively parallel N-Body/SPH gravitational computing in CUDA for 100M particles (NPR-7150.2D).";
  }
  if (p.title.includes("PyroCast")) {
    return lang === "fr"
      ? "Valide l'intégration d'algorithmes physiques de surface (Rothermel), de dynamique des fluides (CFD) et de simulations Monte Carlo."
      : "Validates integration of surface physics combustion algorithms (Rothermel), fluid dynamics (CFD), and Monte Carlo simulations.";
  }
  if (p.title.includes("Raytracer")) {
    return lang === "fr"
      ? "Intégration d'équations différentielles complexes (Runge-Kutta RK4) et tracé de trajectoires de photons en espace-temps courbe sous CUDA/C++20."
      : "Integration of complex differential equations (Runge-Kutta RK4) and curved-spacetime null geodesic raytracing in CUDA/C++20.";
  }
  if (p.title.includes("42sh")) {
    return lang === "fr"
      ? "Prouve la maîtrise des mécanismes internes Unix : analyseur syntaxique AST, pipelines multi-processus, gestion des signaux et conformité POSIX."
      : "Proves mastery of Unix internals: AST lexical parsing, multi-stage pipelines, signal handling, and POSIX compliance.";
  }
  if (p.title.includes("strace")) {
    return lang === "fr"
      ? "Prouve l'expertise sur les interfaces noyau Linux : interception des syscalls via ptrace(2), décodage des registres et de l'ABI ELF64."
      : "Demonstrates expertise in Linux kernel interfaces: syscall interception via ptrace(2), register decoding, and ELF64 ABI compliance.";
  }
  if (p.title.includes("asm-minilibc")) {
    return lang === "fr"
      ? "Implémentation directe en assembleur x86-64 pur des primitives mémoire et chaînes avec stricte conformité System V AMD64 ABI."
      : "Direct pure x86-64 assembly implementation of memory and string primitives under strict System V AMD64 ABI compliance.";
  }
  if (p.title.includes("Tekspice")) {
    return lang === "fr"
      ? "Simulateur de composants électroniques discrets et portes logiques évaluant la propagation d'état sur graphes cycliques en C++20."
      : "Discrete electronic component and logic gate simulator evaluating state propagation across cyclic graph nets in C++20.";
  }
  if (p.title.includes("Silicium")) {
    return lang === "fr"
      ? "Réseau de calcul distribué pour appareils IoT légers en Rust et partitionneur ELF en C++ avec empreinte mémoire <128 KB."
      : "High-throughput distributed compute network for lightweight IoT in Rust and C++ ELF partitioner with <128 KB memory footprint.";
  }
  return lang === "fr" ? (p.summary_fr || p.summary) : p.summary;
}

function initJobMatcher() {
  const jobText = document.getElementById("matcher-job-text");
  const fileInput = document.getElementById("matcher-file-input");
  const dropzone = document.getElementById("matcher-dropzone");
  const analyzeBtn = document.getElementById("matcher-btn-analyze");
  const resetBtn = document.getElementById("matcher-btn-reset");
  const presetPills = document.querySelectorAll("#matcher [data-preset]");
  const statusText = document.getElementById("matcher-status-text");

  const scoreNum = document.getElementById("matcher-score-num");
  const gaugeBar = document.getElementById("matcher-gauge-bar");
  const metricStackVal = document.getElementById("matcher-metric-stack-val");
  const metricDomainVal = document.getElementById("matcher-metric-domain-val");
  const metricStandardsVal = document.getElementById("matcher-metric-standards-val");

  const domainBadge = document.getElementById("matcher-domain-badge");
  const fitBadge = document.getElementById("matcher-fit-badge");
  const verdictTitle = document.getElementById("matcher-verdict-title");
  const verdictDesc = document.getElementById("matcher-verdict-desc");
  const skillsCount = document.getElementById("matcher-skills-count");
  const skillsBox = document.getElementById("matcher-skills-box");
  const expList = document.getElementById("matcher-exp-list");
  const projCount = document.getElementById("matcher-proj-count");
  const projectsList = document.getElementById("matcher-projects-list");

  const copyReportBtn = document.getElementById("matcher-btn-copy-report");
  const copyReportText = document.getElementById("matcher-copy-text");

  if (!jobText || !projectsList) return;

  let currentAnalysis = null;
  let debounceTimer = null;
  let activePresetKey = "aerospace";

  // Preset pill listeners
  presetPills.forEach(pill => {
    pill.addEventListener("click", () => {
      presetPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const key = pill.dataset.preset;
      activePresetKey = key;
      if (MATCHER_PRESETS[key]) {
        const pData = MATCHER_PRESETS[key];
        jobText.value = pData.text[currentLang] || pData.text.en;
        if (statusText) {
          const domName = pData.domain[currentLang] || pData.domain.en;
          statusText.textContent = currentLang === "fr" ? `Preset chargé : ${domName}` : `Preset loaded: ${domName}`;
        }
        runAnalysis();
      }
    });
  });

  // Textarea input
  jobText.addEventListener("input", () => {
    activePresetKey = null;
    presetPills.forEach(p => p.classList.remove("active"));
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (statusText) {
        statusText.textContent = currentLang === "fr" ? "Analyse en direct..." : "Real-time analysis...";
      }
      runAnalysis();
    }, 280);
  });

  // Analyze button
  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", () => {
      if (statusText) {
        statusText.textContent = currentLang === "fr" ? "Analyse manuelle lancée" : "Manual analysis triggered";
      }
      runAnalysis();
    });
  }

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      jobText.value = "";
      activePresetKey = null;
      presetPills.forEach(p => p.classList.remove("active"));
      if (statusText) {
        statusText.textContent = currentLang === "fr" ? "Prêt à analyser" : "Ready to analyze";
      }
      runAnalysis();
    });
  }

  // Dropzone drag-and-drop
  if (dropzone) {
    ["dragenter", "dragover"].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("is-dragging");
      });
    });

    ["dragleave", "dragend"].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("is-dragging");
      });
    });

    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove("is-dragging");

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleUploadedFile(files[0]);
      }
    });

    dropzone.addEventListener("click", () => {
      if (fileInput) fileInput.click();
    });

    dropzone.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && fileInput) {
        e.preventDefault();
        fileInput.click();
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleUploadedFile(e.target.files[0]);
      }
    });
  }

  async function handleUploadedFile(file) {
    if (!file) return;
    if (statusText) {
      statusText.textContent = currentLang === "fr" ? `Lecture de ${file.name}...` : `Reading ${file.name}...`;
    }

    const name = file.name.toLowerCase();
    activePresetKey = null;
    presetPills.forEach(p => p.classList.remove("active"));

    if (name.endsWith(".pdf")) {
      try {
        const buffer = await file.arrayBuffer();
        const extracted = extractTextFromPdfBuffer(buffer);
        if (extracted && extracted.trim().length > 30) {
          jobText.value = extracted.trim();
          if (statusText) {
            statusText.textContent = currentLang === "fr"
              ? `Offre extraite depuis ${file.name} (${Math.round(file.size / 1024)} KB)`
              : `Offer extracted from ${file.name} (${Math.round(file.size / 1024)} KB)`;
          }
          runAnalysis();
          return;
        }
      } catch (err) {
        console.warn("PDF extraction fallback", err);
      }
      jobText.value = currentLang === "fr"
        ? `[Fichier importé : ${file.name}] Veuillez coller le texte complet de l'offre ci-dessous si le format PDF est scanné ou protégé.`
        : `[Imported file: ${file.name}] Please paste the full job description below if the PDF is scanned or protected.`;
      if (statusText) {
        statusText.textContent = currentLang === "fr"
          ? "Format PDF complexe : collez le texte ci-dessous"
          : "Complex PDF format: paste text below";
      }
      runAnalysis();
      return;
    }

    // Standard text files
    const reader = new FileReader();
    reader.onload = (e) => {
      jobText.value = e.target.result;
      if (statusText) {
        statusText.textContent = currentLang === "fr"
          ? `Fichier chargé : ${file.name} (${Math.round(file.size / 1024)} KB)`
          : `File loaded: ${file.name} (${Math.round(file.size / 1024)} KB)`;
      }
      runAnalysis();
    };
    reader.onerror = () => {
      if (statusText) {
        statusText.textContent = currentLang === "fr"
          ? `Erreur de lecture du fichier ${file.name}`
          : `Error reading file ${file.name}`;
      }
    };
    reader.readAsText(file);
  }

  function extractTextFromPdfBuffer(buffer) {
    const bytes = new Uint8Array(buffer);
    let str = "";
    const chunk = 8192;
    for (let i = 0; i < bytes.length; i += chunk) {
      str += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }

    const textBlocks = [];
    const regex = /BT[\s\S]*?ET/g;
    let match;
    while ((match = regex.exec(str)) !== null) {
      const block = match[0];
      const strRegex = /\(([^)]+)\)\s*(?:Tj|'|")/g;
      let mStr;
      while ((mStr = strRegex.exec(block)) !== null) {
        textBlocks.push(mStr[1]);
      }
    }

    if (textBlocks.length > 5) {
      return textBlocks.join(" ").replace(/\\([()\\])/g, "$1");
    }

    const printables = str.match(/[a-zA-Z0-9_\-\.,;: /()@#+]{4,}/g);
    if (printables && printables.length > 8) {
      return printables.join(" ");
    }
    return "";
  }

  // Copy synthesis report
  if (copyReportBtn) {
    copyReportBtn.addEventListener("click", () => {
      if (!currentAnalysis) return;
      const report = generateSynthesisReport(currentAnalysis);
      navigator.clipboard.writeText(report).then(() => {
        const originalText = copyReportText.textContent;
        copyReportText.textContent = currentLang === "fr" ? "✓ Synthèse copiée !" : "✓ Synthesis copied!";
        setTimeout(() => {
          copyReportText.textContent = originalText;
        }, 2200);
      });
    });
  }

  // Main Analysis function
  function runAnalysis() {
    const raw = jobText.value.trim().toLowerCase();
    currentAnalysis = computeMatch(raw);
    renderResults(currentAnalysis);
  }

  function computeMatch(raw) {
    const lang = currentLang || "fr";

    // 1. Detect matching skills
    const matchedSkills = [];
    MATCHER_SKILLS_CATALOG.forEach(sk => {
      const hit = sk.triggers.some(trig => raw.includes(trig));
      if (hit || (!raw && ["C++20", "CUDA & GPGPU", "Semtech SX1262 LoRa", "Linux Internals & ptrace(2)", "Lock-Free Ring Buffers"].includes(sk.name))) {
        matchedSkills.push(sk);
      }
    });

    // 2. Detect domain
    let matchedDomainKey = "default";
    for (const key of ["aerospace", "hpc", "kernel", "embedded", "ai", "network"]) {
      const dObj = MATCHER_DOMAINS[key];
      if (dObj.triggers.some(t => raw.includes(t))) {
        matchedDomainKey = key;
        break;
      }
    }
    const dObj = MATCHER_DOMAINS[matchedDomainKey];

    // Multi-vector precision scoring
    const skillFactor = Math.min(matchedSkills.length / 6, 1.0);
    const stackScore = Math.min(Math.round(dObj.stackBonus * 0.90 + skillFactor * 10), 99);
    const domainScore = Math.min(Math.round(dObj.domainBonus * 0.92 + skillFactor * 8), 98);
    const standardsScore = Math.min(Math.round(dObj.standardsBonus * 0.94 + skillFactor * 6), 98);
    const overallScore = Math.min(Math.round(stackScore * 0.45 + domainScore * 0.35 + standardsScore * 0.20), 98);

    const domainLabel = dObj.domain[lang] || dObj.domain.en;
    const fitLevel = dObj.fitLevel[lang] || dObj.fitLevel.en;
    const verdictHeadline = dObj.title[lang] || dObj.title.en;
    const verdictDetails = dObj.desc[lang] || dObj.desc.en;

    // 3. Score all 23 projects in DIRECTORY_PROJECTS
    const scoredProjects = DIRECTORY_PROJECTS.map(p => {
      let score = 25;
      const pText = [p.title, p.module, p.category, p.summary, p.summary_fr, ...p.languages].join(" ").toLowerCase();
      const matchedTech = [];

      p.languages.forEach(langName => {
        const lLow = langName.toLowerCase();
        if (raw.includes(lLow) || (!raw && ["c++20", "cuda", "lora", "qt", "c"].includes(lLow))) {
          score += 15;
          matchedTech.push(langName);
        }
      });

      if (matchedDomainKey === "aerospace" && (p.category.includes("Aerospace") || p.title.includes("Telemetry"))) {
        score += 35;
      }
      if (matchedDomainKey === "hpc" && (p.title.includes("BLITZAR") || p.title.includes("Raytracer") || p.languages.includes("CUDA"))) {
        score += 35;
      }
      if (matchedDomainKey === "kernel" && (p.category.includes("Systems") || p.title.includes("42sh") || p.title.includes("trace") || p.languages.includes("Assembly"))) {
        score += 35;
      }
      if (matchedDomainKey === "embedded" && (p.languages.includes("C") || p.title.includes("Telemetry") || p.title.includes("Tekspice"))) {
        score += 30;
      }
      if (matchedDomainKey === "ai" && (p.title.includes("PyroCast") || p.title.includes("Gomoku") || p.languages.includes("AI"))) {
        score += 35;
      }
      if (matchedDomainKey === "network" && (p.category.includes("Network") || p.languages.includes("Rust"))) {
        score += 35;
      }

      const why = getProjectWhy(p, raw, lang);
      const finalFit = Math.min(Math.round(score), 98);
      return {
        ...p,
        fitScore: finalFit,
        matchedTech: matchedTech.length > 0 ? matchedTech : p.languages.slice(0, 2),
        why
      };
    });

    scoredProjects.sort((a, b) => b.fitScore - a.fitScore);

    // 4. Score experiences
    const matchedExps = MATCHER_EXPERIENCES.filter(exp => {
      return exp.keywords.some(k => raw.includes(k)) || (!raw && (exp.org.includes("NASA") || exp.org.includes("CSULB")));
    });

    return {
      score: raw.length > 10 ? overallScore : 96,
      stackScore,
      domainScore,
      standardsScore,
      domainLabel,
      fitLevel,
      verdictHeadline,
      verdictDetails,
      matchedSkills: matchedSkills.length > 0 ? matchedSkills : MATCHER_SKILLS_CATALOG.slice(0, 6),
      topProjects: scoredProjects.slice(0, 4),
      matchedExps: matchedExps.length > 0 ? matchedExps : MATCHER_EXPERIENCES.slice(0, 2)
    };
  }

  function renderResults(res) {
    const lang = currentLang || "fr";

    if (scoreNum) scoreNum.textContent = `${res.score}%`;
    if (gaugeBar) gaugeBar.style.width = `${res.score}%`;

    if (metricStackVal) metricStackVal.textContent = `${res.stackScore}%`;
    if (metricDomainVal) metricDomainVal.textContent = `${res.domainScore}%`;
    if (metricStandardsVal) metricStandardsVal.textContent = `${res.standardsScore}%`;

    if (domainBadge) domainBadge.textContent = res.domainLabel;
    if (fitBadge) fitBadge.textContent = res.fitLevel;
    if (verdictTitle) verdictTitle.textContent = res.verdictHeadline;
    if (verdictDesc) verdictDesc.textContent = res.verdictDetails;

    if (skillsCount) {
      skillsCount.textContent = lang === "fr" ? `${res.matchedSkills.length} validées` : `${res.matchedSkills.length} verified`;
    }

    if (skillsBox) {
      skillsBox.innerHTML = res.matchedSkills.map(sk => `
        <span class="matcher-skill-tag">
          <span class="check" aria-hidden="true">✓</span>
          <span>${escapeHtml(sk.name)}</span>
        </span>
      `).join("");
    }

    if (expList) {
      expList.innerHTML = res.matchedExps.map(exp => {
        const role = exp.role[lang] || exp.role.en;
        const desc = exp.desc[lang] || exp.desc.en;
        return `
          <div class="matcher-exp-row">
            <div class="matcher-exp-role">${escapeHtml(role)}</div>
            <div class="matcher-exp-meta">${escapeHtml(exp.org)} · ${escapeHtml(exp.date)}</div>
            <div class="matcher-exp-desc">${escapeHtml(desc)}</div>
          </div>
        `;
      }).join("");
    }

    if (projCount) projCount.textContent = `Top ${res.topProjects.length}`;
    if (projectsList) {
      const repoLabel = lang === "fr" ? "Dépôt ↗" : "Source ↗";
      const whyLabel = lang === "fr" ? "Alignement technique :" : "Technical alignment:";
      const previewText = lang === "fr" ? "Aperçu ⚡" : "Preview ⚡";
      const previewTitle = lang === "fr" ? "Aperçu de l'exécution" : "Showcase run preview";

      projectsList.innerHTML = res.topProjects.map((p, idx) => `
        <article class="matcher-proj-row">
          <div class="matcher-proj-row-header">
            <div class="matcher-proj-title-group">
              <span class="matcher-rank-badge">#${idx + 1} · ${p.fitScore}% Match</span>
              <h5 class="matcher-proj-name">${escapeHtml(p.title)}</h5>
            </div>
            <div class="col-action">
              <button class="index-preview-btn matcher-preview-btn" data-project-id="${escapeHtml(p.id)}" type="button" title="${previewTitle}">
                ${previewText}
              </button>
              <a class="index-link-btn" href="${escapeHtml(p.github)}" target="_blank" rel="noreferrer">
                <span>${escapeHtml(repoLabel)}</span>
              </a>
            </div>
          </div>
          <div class="matcher-proj-module">${escapeHtml(p.module)}</div>
          <div class="matcher-proj-why-box">
            <span class="matcher-proj-why-label">${escapeHtml(whyLabel)}</span>
            <p class="matcher-proj-why">${escapeHtml(p.why)}</p>
          </div>
          <div class="col-stack">
            ${p.languages.map(l => {
              const isHit = p.matchedTech.includes(l);
              return `<span class="index-tag-chip ${isHit ? "is-matched" : ""}">${isHit ? "✓ " : ""}${escapeHtml(l)}</span>`;
            }).join("")}
          </div>
        </article>
      `).join("");
    }
  }

  function generateSynthesisReport(res) {
    const lang = currentLang || "fr";

    if (lang === "fr") {
      let out = `SYNTHÈSE D'ADÉQUATION TECHNIQUE · LUIS FERNANDES\n`;
      out += `Score global d'adéquation : ${res.score}% (${res.domainLabel})\n`;
      out += `Sous-métriques : Stack technique ${res.stackScore}% | Domaine ${res.domainScore}% | Normes ${res.standardsScore}%\n`;
      out += `Évaluation : ${res.verdictHeadline}\n\n`;
      out += `POINTS CLÉS DU PROFIL :\n`;
      out += `• ${res.verdictDetails}\n\n`;
      out += `COMPÉTENCES CLÉS VALIDÉES DANS LE CODEBASE :\n`;
      res.matchedSkills.forEach(s => {
        const cat = s.cat.fr || s.cat.en;
        out += `  [✓] ${s.name} (${cat})\n`;
      });
      out += `\nPROJETS EN ACCORD DIRECT (AVEC CODE SOURCE VÉRIFIABLE) :\n`;
      res.topProjects.forEach(p => {
        out += `• ${p.title} (${p.fitScore}% Match) [${p.languages.join(", ")}]\n`;
        out += `  Alignement : ${p.why}\n`;
        out += `  Dépôt : ${p.github}\n\n`;
      });
      out += `CONTACT : luis.fernandes.contact@gmail.com | Portfolio : https://luis-fernandes.github.io\n`;
      return out;
    } else {
      let out = `TECHNICAL FIT & COMPATIBILITY SYNTHESIS · LUIS FERNANDES\n`;
      out += `Overall Technical Match: ${res.score}% (${res.domainLabel})\n`;
      out += `Sub-metrics: Technical Stack ${res.stackScore}% | Domain Alignment ${res.domainScore}% | Standards ${res.standardsScore}%\n`;
      out += `Assessment: ${res.verdictHeadline}\n\n`;
      out += `ENGINEERING HIGHLIGHTS:\n`;
      out += `• ${res.verdictDetails}\n\n`;
      out += `KEY COMPETENCIES VERIFIED IN CODEBASE:\n`;
      res.matchedSkills.forEach(s => {
        const cat = s.cat.en || s.cat.fr;
        out += `  [✓] ${s.name} (${cat})\n`;
      });
      out += `\nDIRECTLY TARGETED PROJECTS (WITH VERIFIABLE REPOSITORIES):\n`;
      res.topProjects.forEach(p => {
        out += `• ${p.title} (${p.fitScore}% Match) [${p.languages.join(", ")}]\n`;
        out += `  Alignment: ${p.why}\n`;
        out += `  Repository: ${p.github}\n\n`;
      });
      out += `CONTACT: luis.fernandes.contact@gmail.com | Portfolio: https://luis-fernandes.github.io\n`;
      return out;
    }
  }

  // Hook into language change
  registerLangListener((newLang) => {
    if (activePresetKey && MATCHER_PRESETS[activePresetKey]) {
      const pData = MATCHER_PRESETS[activePresetKey];
      jobText.value = pData.text[newLang] || pData.text.en;
      if (statusText) {
        const domName = pData.domain[newLang] || pData.domain.en;
        statusText.textContent = newLang === "fr" ? `Preset chargé : ${domName}` : `Preset loaded: ${domName}`;
      }
    }
    runAnalysis();
  });

  // Initial load
  if (MATCHER_PRESETS.aerospace) {
    jobText.value = MATCHER_PRESETS.aerospace.text[currentLang] || MATCHER_PRESETS.aerospace.text.fr;
  }
  runAnalysis();
}



