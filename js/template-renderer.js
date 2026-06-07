const STORAGE_KEY = "resumehub.resumeData.v3";
const DEFAULT_SECTION_ORDER = ["summary", "skills", "experience", "projects", "education", "certifications"];

const emptyResume = {
  template: "template1",
  previewFit: false,
  theme: {
    accentColor: "#0f766e",
    fontFamily: "sans",
    spacing: "normal",
  },
  hiddenSections: {},
  sectionOrder: [...DEFAULT_SECTION_ORDER],
  personal: {
    fullName: "",
    jobRole: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    linkedin: "",
    github: "",
    photo: "",
    originalPhoto: "",
    photoShape: "circle",
    photoSize: "medium",
    photoPosition: "top",
    photoZoom: "100",
    photoOffsetX: "0",
    photoOffsetY: "0",
    summary: "",
    skills: "",
  },
  experience: [],
  projects: [],
  education: [],
  certifications: [],
};

const templateAccentColors = {
  template1: "#0f766e",
  template2: "#0f766e",
  template3: "#a15c38",
  template4: "#334155",
  template5: "#db2777",
  template6: "#2563eb",
  template7: "#5b21b6",
  template8: "#0f766e",
  template9: "#ea580c",
  template10: "#0891b2",
  template11: "#1d4ed8",
  template12: "#16a34a",
  template13: "#7c3aed",
  template14: "#b45309",
  template15: "#0d9488",
  template16: "#6b7280",
  template17: "#111111",
  template18: "#d7aa28",
  template19: "#111111",
  template20: "#0b4d73",
  template21: "#1f3d52",
};

const photoTemplates = new Set([
  "template2",
  "template5",
  "template9",
  "template11",
  "template13",
  "template20",
  "template21",
]);

const sampleResumes = [
  {
    template: "template1",
    previewFit: false,
    theme: {
      accentColor: "#0f766e",
      fontFamily: "sans",
      spacing: "normal",
    },
    hiddenSections: {},
    personal: {
      fullName: "Sundar Pichai",
      jobRole: "Technology Executive",
      email: "sundar.pichai@example.com",
      phone: "+1 555 010 1001",
      location: "Mountain View, USA",
      portfolio: "example.com/sundar-pichai",
      linkedin: "linkedin.com/in/sundar-pichai-sample",
      github: "",
      summary:
        "Technology leader known for product strategy, global team leadership, and scaling platforms used by billions of people. Strong background in product management, operations, partnerships, and user-focused innovation.",
      skills:
        "Product Strategy, Leadership, Cloud Platforms, AI, Operations, Communication, Team Building, Innovation",
    },
    experience: [
      {
        company: "Global Technology Company",
        role: "Senior Product and Business Leader",
        location: "USA",
        start: "2004",
        end: "Present",
        description:
          "Led major product initiatives, managed cross-functional teams, improved user experiences, and helped scale widely used digital platforms across international markets.",
      },
    ],
    projects: [
      {
        title: "Browser Platform Growth",
        stack: "Product Strategy, Web Platforms, Partnerships",
        start: "2008",
        end: "2015",
        live: "example.com/browser-growth",
        github: "",
        description:
          "Supported the growth of a fast, accessible browser platform through product planning, ecosystem partnerships, and performance-focused user experience improvements.",
      },
      {
        title: "Mobile Ecosystem Expansion",
        stack: "Mobile Products, Developer Ecosystem, Strategy",
        start: "2013",
        end: "2019",
        live: "example.com/mobile-ecosystem",
        github: "",
        description:
          "Helped expand mobile product adoption by aligning developer tools, consumer experiences, and partner priorities across global markets.",
      },
    ],
    education: [
      {
        school: "Stanford University",
        degree: "M.S. in Materials Science and Engineering",
        location: "California",
        start: "1993",
        end: "1995",
        score: "",
      },
      {
        school: "University of Pennsylvania",
        degree: "MBA",
        location: "Pennsylvania",
        start: "2000",
        end: "2002",
        score: "",
      },
    ],
    certifications: [
      {
        name: "Leadership and Product Strategy Recognition",
        issuer: "Industry Programs",
        year: "Sample",
        link: "",
      },
    ],
  },
  {
    template: "template1",
    previewFit: false,
    theme: {
      accentColor: "#2563eb",
      fontFamily: "sans",
      spacing: "normal",
    },
    hiddenSections: {},
    personal: {
      fullName: "Virat Kohli",
      jobRole: "Professional Athlete and Team Leader",
      email: "virat.kohli@example.com",
      phone: "+91 55555 01002",
      location: "Delhi, India",
      portfolio: "example.com/virat-kohli",
      linkedin: "linkedin.com/in/virat-kohli-sample",
      github: "",
      summary:
        "High-performance sports professional known for discipline, team leadership, consistency, and pressure handling. Experienced in leading groups, building brand partnerships, and performing in competitive global environments.",
      skills:
        "Leadership, Performance Analysis, Team Strategy, Fitness, Brand Partnerships, Communication, Discipline, Mentoring",
    },
    experience: [
      {
        company: "International Cricket",
        role: "Senior Player and Former Captain",
        location: "India",
        start: "2008",
        end: "Present",
        description:
          "Delivered consistent performance in high-pressure tournaments, mentored teammates, represented global brands, and contributed to strategic decision-making in competitive match environments.",
      },
    ],
    projects: [
      {
        title: "Youth Fitness Campaign",
        stack: "Brand Strategy, Fitness, Public Engagement",
        start: "2017",
        end: "Present",
        live: "example.com/youth-fitness",
        github: "",
        description:
          "Promoted fitness-focused habits through public campaigns, partnerships, and media appearances aimed at encouraging healthier lifestyles.",
      },
    ],
    education: [
      {
        school: "Vishal Bharti Public School",
        degree: "School Education",
        location: "Delhi",
        start: "1998",
        end: "2006",
        score: "",
      },
    ],
    certifications: [
      {
        name: "Sports Leadership Profile",
        issuer: "ResumeHub Sample Library",
        year: "Sample",
        link: "",
      },
    ],
  },
  {
    template: "template1",
    previewFit: false,
    theme: {
      accentColor: "#ea580c",
      fontFamily: "sans",
      spacing: "normal",
    },
    hiddenSections: {},
    personal: {
      fullName: "Elon Musk",
      jobRole: "Entrepreneur and Product Builder",
      email: "elon.musk@example.com",
      phone: "+1 555 010 1003",
      location: "Austin, USA",
      portfolio: "example.com/elon-musk",
      linkedin: "linkedin.com/in/elon-musk-sample",
      github: "",
      summary:
        "Entrepreneurial operator focused on ambitious engineering products, manufacturing scale, and long-term technology bets. Experienced in building teams across mobility, energy, aerospace, software, and consumer platforms.",
      skills:
        "Entrepreneurship, Product Vision, Engineering Leadership, Manufacturing, Fundraising, Operations, Public Communication, Strategy",
    },
    experience: [
      {
        company: "Technology and Mobility Ventures",
        role: "Founder and Executive Leader",
        location: "USA",
        start: "1995",
        end: "Present",
        description:
          "Built and scaled companies across multiple technical industries, led product roadmaps, hired specialist teams, and coordinated large engineering and manufacturing programs.",
      },
    ],
    projects: [
      {
        title: "Electric Vehicle Scale-Up",
        stack: "Manufacturing, Energy Systems, Product Design",
        start: "2004",
        end: "Present",
        live: "example.com/ev-scale",
        github: "",
        description:
          "Helped popularize electric mobility by combining product design, charging infrastructure, manufacturing systems, and consumer-focused software experiences.",
      },
      {
        title: "Reusable Launch Systems",
        stack: "Aerospace, Operations, Systems Engineering",
        start: "2002",
        end: "Present",
        live: "example.com/launch-systems",
        github: "",
        description:
          "Supported ambitious aerospace programs focused on lowering launch costs through reusable systems and tightly integrated engineering operations.",
      },
    ],
    education: [
      {
        school: "University of Pennsylvania",
        degree: "Economics and Physics",
        location: "Pennsylvania",
        start: "1992",
        end: "1997",
        score: "",
      },
    ],
    certifications: [
      {
        name: "Entrepreneurship Profile",
        issuer: "ResumeHub Sample Library",
        year: "Sample",
        link: "",
      },
    ],
  },
  {
    template: "template1",
    previewFit: false,
    theme: {
      accentColor: "#334155",
      fontFamily: "serif",
      spacing: "normal",
    },
    hiddenSections: {},
    personal: {
      fullName: "MS Dhoni",
      jobRole: "Team Leader and Sports Professional",
      email: "ms.dhoni@example.com",
      phone: "+91 55555 01004",
      location: "Ranchi, India",
      portfolio: "example.com/ms-dhoni",
      linkedin: "linkedin.com/in/ms-dhoni-sample",
      github: "",
      summary:
        "Calm and disciplined team leader known for decision-making under pressure, long-term performance, mentoring, and building trust in competitive environments.",
      skills:
        "Leadership, Strategy, Mentoring, Decision Making, Performance Analysis, Team Building, Communication, Discipline",
    },
    experience: [
      {
        company: "Professional Cricket",
        role: "Captain, Wicketkeeper, and Finisher",
        location: "India",
        start: "2004",
        end: "Present",
        description:
          "Led teams in high-pressure competitions, guided younger players, managed tactical decisions, and maintained consistency across long sporting seasons.",
      },
    ],
    projects: [
      {
        title: "Championship Team Leadership",
        stack: "Strategy, Leadership, Match Planning",
        start: "2007",
        end: "Present",
        live: "example.com/team-leadership",
        github: "",
        description:
          "Built a calm leadership approach focused on role clarity, tactical reading, and consistent execution during major tournament moments.",
      },
    ],
    education: [
      {
        school: "DAV Jawahar Vidya Mandir",
        degree: "School Education",
        location: "Ranchi",
        start: "1990",
        end: "1999",
        score: "",
      },
    ],
    certifications: [
      {
        name: "Sports Leadership Profile",
        issuer: "ResumeHub Sample Library",
        year: "Sample",
        link: "",
      },
    ],
  },
  {
    template: "template1",
    previewFit: false,
    theme: {
      accentColor: "#7c3aed",
      fontFamily: "sans",
      spacing: "normal",
    },
    hiddenSections: {},
    personal: {
      fullName: "Samay Raina",
      jobRole: "Comedian, Creator, and Community Host",
      email: "samay.raina@example.com",
      phone: "+91 55555 01005",
      location: "Mumbai, India",
      portfolio: "example.com/samay-raina",
      linkedin: "linkedin.com/in/samay-raina-sample",
      github: "",
      summary:
        "Digital creator and performer experienced in live entertainment, community building, online shows, audience engagement, and collaborative content formats.",
      skills:
        "Comedy, Live Hosting, Content Strategy, Audience Engagement, Collaboration, Storytelling, Community Building, Public Speaking",
    },
    experience: [
      {
        company: "Digital Entertainment and Live Shows",
        role: "Creator and Host",
        location: "India",
        start: "2017",
        end: "Present",
        description:
          "Created live and digital entertainment formats, collaborated with creators, hosted interactive shows, and built engaged online communities.",
      },
    ],
    projects: [
      {
        title: "Interactive Online Show Format",
        stack: "Live Streaming, Comedy, Community",
        start: "2020",
        end: "Present",
        live: "example.com/live-show",
        github: "",
        description:
          "Built an audience-first online format combining live performance, guest collaboration, audience participation, and repeatable community engagement.",
      },
    ],
    education: [
      {
        school: "Media and Performance Learning",
        degree: "Creator Development",
        location: "India",
        start: "2015",
        end: "2017",
        score: "",
      },
    ],
    certifications: [
      {
        name: "Creator Profile",
        issuer: "ResumeHub Sample Library",
        year: "Sample",
        link: "",
      },
    ],
  },
];

const sampleResume = sampleResumes[0];

const fieldMap = {
  experience: [
    ["company", "Organization", "text"],
    ["role", "Position", "text"],
    ["location", "Location", "text"],
    ["start", "Start", "text"],
    ["end", "End", "text"],
    ["description", "Impact Notes", "textarea"],
  ],
  projects: [
    ["title", "Project Name", "text"],
    ["stack", "Tech Stack", "text"],
    ["start", "Start", "text"],
    ["end", "End", "text"],
    ["live", "Live Demo", "url"],
    ["github", "GitHub Link", "url"],
    ["description", "Project Impact", "textarea"],
  ],
  education: [
    ["school", "Institution", "text"],
    ["degree", "Program / Degree", "text"],
    ["location", "Location", "text"],
    ["start", "Start", "text"],
    ["end", "End", "text"],
    ["score", "CGPA / Percentage", "text"],
  ],
  certifications: [
    ["name", "Credential Name", "text"],
    ["issuer", "Issued By", "text"],
    ["year", "Year", "text"],
    ["link", "Credential Link", "url"],
  ],
};

let resumeData = clone(emptyResume);
let currentResumeId = null;
let currentResumeTitle = "";
let cloudSaveTimer;

const form = document.getElementById("resumeForm");
const templateSelect = document.getElementById("templateSelect");
const previewContainer = document.getElementById("templatePreviewContainer");
const saveStatus = document.getElementById("saveStatus");
const resumeScore = document.getElementById("resumeScore");
const atsScore = document.getElementById("atsScore");
const validationSummary = document.getElementById("validationSummary");
const validationList = document.getElementById("validationList");
const fitPreviewBtn = document.getElementById("fitPreviewBtn");
const importJsonInput = document.getElementById("importJsonInput");
const resumeImportInput = document.getElementById("resumeImportInput");
const exportJsonBtn = document.getElementById("exportJsonBtn");
const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");
const removePhotoBtn = document.getElementById("removePhotoBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const shortcutsBtn = document.getElementById("shortcutsBtn");
const shortcutsModal = document.getElementById("shortcutsModal");
const cloudSaveBtn = document.getElementById("cloudSaveBtn");
const builderDashboardLink = document.getElementById("builderDashboardLink");
const addSkillsGroupBtn = document.getElementById("addSkillsGroupBtn");

const HISTORY_MAX = 50;
const DARK_MODE_KEY = "resumehub.darkMode.v1";
const reorderableSections = new Set(Object.keys(fieldMap));
let undoStack = [];
let redoStack = [];
let historyPaused = false;
let inputHistoryTimer;
let dragState = null;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getSampleResume() {
  const index = Math.floor(Math.random() * sampleResumes.length);
  return clone(sampleResumes[index]);
}

function getTemplateAccent(template = resumeData?.template || "template1") {
  return templateAccentColors[template] || emptyResume.theme.accentColor;
}

function templateSupportsPhoto(template = resumeData?.template || "template1") {
  return photoTemplates.has(template);
}

function getSampleProfile(name = "") {
  const profiles = {
    "Sundar Pichai": { initials: "SP", photo: "/assets/images/sample-photos/sundar%20pichai.jpeg", skin: "#9f6a43", hair: "#151515", suit: "#1f3d52", bg1: "#0f766e", bg2: "#9ee7dc" },
    "Virat Kohli": { initials: "VK", photo: "/assets/images/sample-photos/vk18.jpg", skin: "#a96c42", hair: "#141414", suit: "#1d4ed8", bg1: "#2563eb", bg2: "#bfdbfe", beard: true },
    "Elon Musk": { initials: "EM", photo: "/assets/images/sample-photos/elon-musk.png", skin: "#d0a07b", hair: "#8a6a4f", suit: "#334155", bg1: "#ea580c", bg2: "#fed7aa" },
    "MS Dhoni": { initials: "MS", photo: "/assets/images/sample-photos/msd.jpg", skin: "#9f6a43", hair: "#161616", suit: "#16a34a", bg1: "#0f766e", bg2: "#bbf7d0", beard: true },
    "Samay Raina": { initials: "SR", photo: "/assets/images/sample-photos/samay.jpg", skin: "#a96c42", hair: "#101010", suit: "#7c3aed", bg1: "#7c3aed", bg2: "#ddd6fe", beard: true },
  };
  return profiles[name] || { initials: "RH", skin: "#9f6a43", hair: "#172033", suit: "#0f766e", bg1: "#0f766e", bg2: "#99f6e4" };
}

function isSampleProfile(data = resumeData) {
  return sampleResumes.some((sample) => sample.personal.fullName === data.personal.fullName);
}

function createSamplePhoto(name, color = "#0f766e") {
  const profile = getSampleProfile(name);
  if (profile.photo) return profile.photo;

  const safeColor = color || profile.bg1 || "#0f766e";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${profile.bg1 || safeColor}"/>
          <stop offset="1" stop-color="${profile.bg2 || "#172033"}"/>
        </linearGradient>
      </defs>
      <rect width="240" height="240" fill="url(#g)"/>
      <circle cx="120" cy="122" r="88" fill="rgba(255,255,255,.18)"/>
      <path d="M52 226c11-52 38-78 68-78s57 26 68 78" fill="${profile.suit}"/>
      <path d="M78 226c7-38 23-58 42-58s35 20 42 58" fill="rgba(255,255,255,.16)"/>
      <circle cx="120" cy="96" r="42" fill="${profile.skin}"/>
      <path d="M77 91c8-36 29-54 61-47 20 4 31 17 34 39-19-11-43-13-72-6-6 1-14 6-23 14z" fill="${profile.hair}"/>
      ${profile.beard ? `<path d="M89 112c8 23 21 34 31 34s23-11 31-34c-19 10-42 10-62 0z" fill="${profile.hair}" opacity=".9"/>` : ""}
      <circle cx="104" cy="96" r="3.5" fill="#111"/>
      <circle cx="136" cy="96" r="3.5" fill="#111"/>
      <path d="M106 121c10 8 20 8 30 0" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round" opacity=".65"/>
      <text x="120" y="205" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="28" font-weight="800">${profile.initials}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function addSamplePhotoIfSupported(data) {
  const hasGeneratedPhoto = String(data.personal.photo || "").startsWith("data:image/svg+xml");
  if (templateSupportsPhoto(data.template) && isSampleProfile(data) && (!data.personal.photo || hasGeneratedPhoto)) {
    const samplePhoto = createSamplePhoto(data.personal.fullName, getTemplateAccent(data.template));
    data.personal.photo = samplePhoto;
    data.personal.originalPhoto = samplePhoto;
  }
  return data;
}

function syncTemplateTheme(useDefaultColor = false) {
  if (useDefaultColor || !resumeData.theme.accentColor) {
    resumeData.theme.accentColor = getTemplateAccent(resumeData.template);
  }
  if (form?.elements.accentColor) {
    form.elements.accentColor.value = resumeData.theme.accentColor;
  }
}

function loadResumeData() {
  const params = new URLSearchParams(window.location.search);
  const selectedTemplate = params.get("template");

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      const hydrated = {
        ...clone(emptyResume),
        ...saved,
        personal: { ...clone(emptyResume.personal), ...saved.personal },
        theme: { ...clone(emptyResume.theme), ...saved.theme },
        template: selectedTemplate || saved.template || "template1",
        sectionOrder: Array.isArray(saved.sectionOrder)
          ? [...saved.sectionOrder]
          : [...DEFAULT_SECTION_ORDER],
      };
      if (selectedTemplate && selectedTemplate !== saved.template) {
        hydrated.theme.accentColor = getTemplateAccent(hydrated.template);
      }
      if (!hydrated.theme.accentColor) hydrated.theme.accentColor = getTemplateAccent(hydrated.template);
      
      // Ensure originalPhoto is set if photo exists
      if (hydrated.personal.photo && !hydrated.personal.originalPhoto) {
        hydrated.personal.originalPhoto = hydrated.personal.photo;
      }
      
      return hydrated;
    }
  } catch (error) {
    console.warn("Could not parse saved resume data.", error);
  }

  const sample = {
    ...getSampleResume(),
    template: selectedTemplate || "template1",
  };
  sample.theme.accentColor = getTemplateAccent(sample.template);
  const data = addSamplePhotoIfSupported(sample);

  // Ensure originalPhoto is set if photo exists
  if (data.personal.photo && !data.personal.originalPhoto) {
    data.personal.originalPhoto = data.personal.photo;
  }

  return data;
}

function mergeResumePayload(imported, storedTemplate, urlTemplate) {
  const hydrated = {
    ...clone(emptyResume),
    ...imported,
    personal: { ...clone(emptyResume.personal), ...imported.personal },
    theme: { ...clone(emptyResume.theme), ...imported.theme },
    sectionOrder: Array.isArray(imported.sectionOrder)
      ? [...imported.sectionOrder]
      : [...DEFAULT_SECTION_ORDER],
    template: urlTemplate || storedTemplate || imported.template || "template1",
  };

  if (!hydrated.theme.accentColor) {
    hydrated.theme.accentColor = getTemplateAccent(hydrated.template);
  }

  // Ensure originalPhoto is set if photo exists
  if (hydrated.personal.photo && !hydrated.personal.originalPhoto) {
    hydrated.personal.originalPhoto = hydrated.personal.photo;
  }

  return hydrated;
}

async function applyUserProfileDefaults(data) {
  if (!window.ResumeHubAPI?.isAuthenticated()) return data;

  const params = new URLSearchParams(window.location.search);
  if (params.get("resumeId")) return data;

  try {
    const profile = await window.ResumeHubAPI.getProfile();
    const personal = data.personal;

    if (!personal.fullName?.trim() && profile.name) personal.fullName = profile.name;
    if (!personal.email?.trim() && profile.email) personal.email = profile.email;
    if (!personal.jobRole?.trim() && profile.jobTitle) personal.jobRole = profile.jobTitle;
    if (!personal.phone?.trim() && profile.phone) personal.phone = profile.phone;
    if (!personal.location?.trim() && profile.location) personal.location = profile.location;
    if (!personal.linkedin?.trim() && profile.linkedin) personal.linkedin = profile.linkedin;
    if (!personal.photo?.trim() && profile.profilePhoto) {
      personal.photo = profile.profilePhoto;
      personal.originalPhoto = profile.profilePhoto;
    }
  } catch (error) {
    console.warn("Could not load user profile defaults.", error);
  }

  return data;
}

async function resolveInitialResumeData() {
  const params = new URLSearchParams(window.location.search);
  const resumeId = params.get("resumeId");
  const selectedTemplate = params.get("template");

  if (resumeId && window.ResumeHubAPI?.isAuthenticated()) {
    try {
      if (saveStatus) saveStatus.textContent = "Loading saved resume...";
      const saved = await window.ResumeHubAPI.getResume(resumeId);
      currentResumeId = saved.id;
      currentResumeTitle = saved.title;
      return mergeResumePayload(
        JSON.parse(saved.resumeDataJson),
        saved.templateName,
        selectedTemplate,
      );
    } catch (error) {
      console.error(error);
      if (saveStatus) saveStatus.textContent = "Could not load saved resume";
    }
  }

  return loadResumeData();
}

function updateCloudControls() {
  const isAuthenticated = Boolean(window.ResumeHubAPI?.isAuthenticated());
  cloudSaveBtn?.classList.toggle("hidden", !isAuthenticated);
  builderDashboardLink?.classList.toggle("hidden", !isAuthenticated);
}

async function persistToCloud(forceTitlePrompt = false) {
  if (!window.ResumeHubAPI?.isAuthenticated()) {
    const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = window.ResumeHubAPI.resolvePath(`pages/login.html?returnUrl=${returnUrl}`);
    return;
  }

  let title =
    currentResumeTitle ||
    resumeData.personal.fullName?.trim() ||
    "Untitled Resume";

  if (!currentResumeId || forceTitlePrompt) {
    const entered = prompt("Name this resume:", title);
    if (!entered?.trim()) {
      if (saveStatus) saveStatus.textContent = "Draft secured locally";
      return;
    }
    title = entered.trim();
  }

  const payload = {
    title,
    templateName: resumeData.template,
    resumeDataJson: JSON.stringify(resumeData),
  };

  try {
    if (currentResumeId) {
      const updated = await window.ResumeHubAPI.updateResume(currentResumeId, payload);
      currentResumeTitle = updated.title;
    } else {
      const created = await window.ResumeHubAPI.createResume(payload);
      currentResumeId = created.id;
      currentResumeTitle = created.title;
      const url = new URL(window.location.href);
      url.searchParams.set("resumeId", String(created.id));
      window.history.replaceState({}, "", url);
    }

    if (saveStatus) saveStatus.textContent = "Saved to account";
  } catch (error) {
    console.error(error);
    if (saveStatus) saveStatus.textContent = "Cloud sync failed";
  }
}

function scheduleCloudSave() {
  if (!window.ResumeHubAPI?.isAuthenticated() || !currentResumeId) return;
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(() => persistToCloud(), 1500);
}

function saveResumeData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  if (window.ResumeHubAPI?.isAuthenticated() && currentResumeId) {
    if (saveStatus) saveStatus.textContent = "Draft secured · syncing...";
    scheduleCloudSave();
    return;
  }
  if (saveStatus) saveStatus.textContent = "Draft secured";
}

function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function normalizeUrl(url) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

function isValidUrl(url) {
  if (!url) return true;

  try {
    const parsed = new URL(normalizeUrl(url));
    return ["http:", "https:"].includes(parsed.protocol) && parsed.hostname.includes(".");
  } catch {
    return false;
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setText(id, value, fallback = "") {
  const element = document.getElementById(id);
  if (element) element.textContent = value || fallback;
}

function makeLink(label, href) {
  if (!href) return "";
  const safeHref = normalizeUrl(href);
  return `<a href="${escapeHtml(safeHref)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
}

function dateRange(start, end) {
  if (start && end) return `${start} - ${end}`;
  return start || end || "";
}

function getSkillsGroupsFromRaw(raw) {
  if (!raw) return null;
  const hasColon = raw.includes(":");
  if (!hasColon) return null;

  const groups = [];
  const segments = raw.split(";");
  
  segments.forEach(seg => {
    const parts = seg.split(":");
    if (parts.length >= 2) {
      const category = parts[0].trim();
      const skills = parts[1].split(",")
        .map(s => s.trim())
        .filter(Boolean);
      groups.push({ category, skills });
    } else if (seg.trim()) {
      const skills = seg.split(",")
        .map(s => s.trim())
        .filter(Boolean);
      if (skills.length > 0) {
        groups.push({ category: "", skills });
      }
    }
  });
  
  return groups.length > 0 ? groups : null;
}

function getSkillsGroups() {
  return getSkillsGroupsFromRaw(resumeData.personal.skills);
}

function getSkills() {
  const raw = resumeData.personal.skills || "";
  const groups = getSkillsGroupsFromRaw(raw);
  
  if (groups) {
    return groups.flatMap(g => g.skills);
  }
  
  return raw
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function updatePhotoControl() {
  const hasPhoto = Boolean(resumeData.personal.photo);
  const supportsPhoto = templateSupportsPhoto();
  const row = document.querySelector(".photo-upload-row");
  row?.classList.toggle("photo-disabled", !supportsPhoto);
  if (photoPreview) {
    photoPreview.src = hasPhoto ? resumeData.personal.photo : "";
    photoPreview.style.objectPosition = "center";
    photoPreview.style.transform = "scale(1)";
    photoPreview.classList.toggle("hidden", !hasPhoto);
  }
  document.querySelectorAll(".photo-upload-row input, .photo-upload-row select, .photo-upload-row button").forEach((control) => {
    control.disabled = !supportsPhoto;
  });
  removePhotoBtn?.classList.toggle("hidden", !hasPhoto);
  const helpText = document.getElementById("photoHelpText");
  if (helpText) {
    helpText.textContent = supportsPhoto
      ? "Add or refine a polished portrait for this visual template."
      : "Portraits appear only on selected premium templates: 2, 5, 9, 11, 13, 20, and 21.";
  }
}

async function loadTemplate() {
  try {
    const response = await fetch(
      `/templates/${resumeData.template}/${resumeData.template}.html`,
    );

    if (!response.ok) {
      throw new Error(`Template ${resumeData.template} was not found.`);
    }

    previewContainer.innerHTML = await response.text();

    const existingLink = document.getElementById("dynamic-template-css");
    existingLink?.remove();

    const templateCSS = document.createElement("link");
    templateCSS.rel = "stylesheet";
    templateCSS.href = `/templates/${resumeData.template}/${resumeData.template}.css?v=${Date.now()}`;
    templateCSS.id = "dynamic-template-css";
    document.head.appendChild(templateCSS);

    renderResume();
  } catch (error) {
    previewContainer.innerHTML = `<div class="template-error">${error.message}</div>`;
  }
}

function renderResume() {
  const personal = resumeData.personal;
  applyTheme();
  renderPhoto();
  setText("previewName", personal.fullName, "Your Name");
  setText("previewRole", personal.jobRole, "Professional Title");
  setText(
    "previewSummary",
    personal.summary,
    "Write a refined executive summary to introduce your strengths and impact.",
  );

  const contactItems = [
    escapeHtml(personal.email),
    escapeHtml(personal.phone),
    escapeHtml(personal.location),
    makeLink("LinkedIn", personal.linkedin),
    makeLink("GitHub", personal.github),
    makeLink("Portfolio", personal.portfolio),
  ].filter(Boolean);

  const contact = document.getElementById("previewContact");
  if (contact) {
    contact.innerHTML = contactItems.map((item) => `<span>${item}</span>`).join("");
  }

  const skills = document.getElementById("previewSkills");
  if (skills) {
    const groups = getSkillsGroups();
    if (groups) {
      skills.innerHTML = groups
        .map((group) => {
          const category = group.category.trim();
          const catLabel = category
            ? `<span class="skills-category-title" style="font-weight: 700; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.05em; color: var(--resume-accent, inherit); opacity: 0.9;">${escapeHtml(category)}</span>`
            : "";
          return `
            <div class="skills-category-group" style="width: 100%; display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px;">
              ${catLabel}
              <div class="skills-list-inner" style="display: flex; flex-wrap: wrap; gap: 7px;">
                ${group.skills.map(s => `<span>${escapeHtml(s)}</span>`).join("")}
              </div>
            </div>
          `;
        })
        .join("");
      skills.style.display = "flex";
      skills.style.flexDirection = "column";
      skills.style.gap = "12px";
      skills.style.width = "100%";
    } else {
      skills.innerHTML = getSkills()
        .map((skill) => `<span>${escapeHtml(skill)}</span>`)
        .join("");
      skills.style.display = "";
      skills.style.flexDirection = "";
      skills.style.gap = "";
      skills.style.width = "";
    }
  }

  // Set data-preview-section dynamically for summary and skills sections
  const summaryEl = document.getElementById("previewSummary");
  if (summaryEl) {
    const summarySec = summaryEl.closest(".resume-section") || summaryEl.closest("section");
    if (summarySec) summarySec.setAttribute("data-preview-section", "summary");
  }
  if (skills) {
    const skillsSec = skills.closest(".resume-section") || skills.closest("section");
    if (skillsSec) skillsSec.setAttribute("data-preview-section", "skills");
  }

  renderSection("experience", renderExperienceItem);
  renderSection("projects", renderProjectItem);
  renderSection("education", renderEducationItem);
  renderSection("certifications", renderCertificationItem);
  applyPreviewSectionOrder();
  updateHiddenSections();
  updateScore();
  updateValidation();
  updatePreviewScale();
}

function getSectionOrder() {
  const order = Array.isArray(resumeData.sectionOrder) ? resumeData.sectionOrder : DEFAULT_SECTION_ORDER;
  const unique = [...new Set(order.filter((section) => DEFAULT_SECTION_ORDER.includes(section)))];
  DEFAULT_SECTION_ORDER.forEach((section) => {
    if (!unique.includes(section)) unique.push(section);
  });
  resumeData.sectionOrder = unique;
  return unique;
}

function applyPreviewSectionOrder() {
  const order = getSectionOrder();
  const rank = Object.fromEntries(order.map((section, index) => [section, index]));
  const resumePage = document.querySelector(".resume-page");
  if (!resumePage) return;

  const parents = new Set();
  resumePage.querySelectorAll("[data-preview-section]").forEach((section) => {
    parents.add(section.parentElement);
  });

  parents.forEach((parent) => {
    const sections = [...parent.querySelectorAll(":scope > [data-preview-section]")];
    if (sections.length <= 1) return;
    sections
      .sort(
        (left, right) =>
          (rank[left.dataset.previewSection] ?? 99) - (rank[right.dataset.previewSection] ?? 99),
      )
      .forEach((section) => parent.appendChild(section));
  });
}

function applyFormSectionOrder() {
  const container = document.getElementById("sectionOrderEditor");
  if (!container) return;

  const order = getSectionOrder();
  const cards = [...container.querySelectorAll(":scope > .repeat-card[data-section]")];
  const cardMap = Object.fromEntries(cards.map((card) => [card.dataset.section, card]));

  order.forEach((section) => {
    if (cardMap[section]) container.appendChild(cardMap[section]);
  });
}

function reorderMainSections(fromIndex, toIndex) {
  const order = getSectionOrder();
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= order.length || toIndex >= order.length) {
    return;
  }
  const [moved] = order.splice(fromIndex, 1);
  order.splice(toIndex, 0, moved);
  resumeData.sectionOrder = order;
  pushHistorySnapshot();
  applyFormSectionOrder();
  applyPreviewSectionOrder();
  saveResumeData();
}

let cropperInstance = null;

function openCropModal(imageSrc) {
  const modal = document.getElementById("cropModal");
  const cropImage = document.getElementById("cropImage");
  if (!modal || !cropImage) return;

  cropImage.src = imageSrc;
  modal.classList.remove("hidden");

  if (cropperInstance) {
    cropperInstance.destroy();
  }

  cropperInstance = new Cropper(cropImage, {
    aspectRatio: 1, // 1:1 square crop
    viewMode: 1,
    dragMode: "move",
    autoCropArea: 0.8,
    restore: false,
    guides: true,
    center: true,
    highlight: false,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: false,
  });
}

function closeCropModal() {
  const modal = document.getElementById("cropModal");
  if (modal) modal.classList.add("hidden");
  if (cropperInstance) {
    cropperInstance.destroy();
    cropperInstance = null;
  }
}

// Add event listeners for modal buttons
document.getElementById("cropCancelBtn")?.addEventListener("click", closeCropModal);
document.getElementById("cropCloseBtn")?.addEventListener("click", closeCropModal);
document.getElementById("cropBackdrop")?.addEventListener("click", closeCropModal);

document.getElementById("cropSaveBtn")?.addEventListener("click", () => {
  if (!cropperInstance) return;

  const canvas = cropperInstance.getCroppedCanvas({
    width: 400,
    height: 400,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "high",
  });

  if (canvas) {
    const croppedBase64 = canvas.toDataURL("image/jpeg", 0.9);
    resumeData.personal.photo = croppedBase64;
    resumeData.personal.originalPhoto = cropperInstance.element.src;

    if (photoPreview) {
      photoPreview.src = croppedBase64;
      photoPreview.classList.remove("hidden");
    }
    const previewPhoto = document.getElementById("previewPhoto");
    if (previewPhoto) {
      previewPhoto.src = croppedBase64;
    }
    
    saveResumeData();
    pushHistorySnapshot();
    renderResume();
  }
  closeCropModal();
});

function renderPhoto() {
  const resumePage = document.querySelector(".resume-page");
  if (!resumePage) return;

  if (!templateSupportsPhoto()) {
    resumePage.querySelector(".resume-photo-wrap")?.remove();
    return;
  }

  let wrapper = resumePage.querySelector(".resume-photo-wrap");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "resume-photo-wrap hidden";
    wrapper.innerHTML = `<img id="previewPhoto" alt="Resume profile photo" />`;

    const target =
      resumePage.querySelector(".identity-block") ||
      resumePage.querySelector(".resume-sidebar") ||
      resumePage.querySelector(".resume-aside") ||
      resumePage.querySelector(".resume-header > div") ||
      resumePage.querySelector(".resume-header") ||
      resumePage;

    target.prepend(wrapper);
  }

  const photo = wrapper.querySelector("img");
  const hasPhoto = Boolean(resumeData.personal.photo);
  if (photo) {
    photo.src = hasPhoto ? resumeData.personal.photo : "";
    photo.style.objectPosition = "center";
    photo.style.transform = "scale(1)";
  }
  wrapper.style.setProperty(
    "--resume-photo-size",
    { small: "70px", medium: "88px", large: "112px" }[resumeData.personal.photoSize] || "88px",
  );
  wrapper.classList.toggle("photo-shape-circle", resumeData.personal.photoShape === "circle");
  wrapper.classList.toggle("photo-shape-rounded", resumeData.personal.photoShape === "rounded");
  wrapper.classList.toggle("photo-shape-square", resumeData.personal.photoShape === "square");
  wrapper.classList.toggle("photo-position-top", resumeData.personal.photoPosition === "top");
  wrapper.classList.toggle("photo-position-center", resumeData.personal.photoPosition === "center");
  wrapper.classList.toggle("photo-position-right", resumeData.personal.photoPosition === "right");
  wrapper.classList.toggle("hidden", !hasPhoto);
}

function parseHexColor(hex) {
  const cleaned = String(hex || "").replace("#", "").trim();
  if (!/^[0-9a-f]{3,6}$/i.test(cleaned)) return [15, 118, 110];
  if (cleaned.length === 3) {
    return cleaned.split("").map((char) => parseInt(char + char, 16));
  }
  return [
    parseInt(cleaned.slice(0, 2), 16),
    parseInt(cleaned.slice(2, 4), 16),
    parseInt(cleaned.slice(4, 6), 16),
  ];
}

function toHexColor([r, g, b]) {
  return `#${[r, g, b].map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0")).join("")}`;
}

function mixHexColors(hex, targetHex, weight) {
  const [r1, g1, b1] = parseHexColor(hex);
  const [r2, g2, b2] = parseHexColor(targetHex);
  const ratio = weight / 100;
  return toHexColor([
    r1 * (1 - ratio) + r2 * ratio,
    g1 * (1 - ratio) + g2 * ratio,
    b1 * (1 - ratio) + b2 * ratio,
  ]);
}

function lightenAccent(hex, amount) {
  return mixHexColors(hex, "#ffffff", amount);
}

function darkenAccent(hex, amount) {
  return mixHexColors(hex, "#000000", amount);
}

function applyAccentTheme(resumePage, accent) {
  resumePage.style.setProperty("--resume-accent", accent);
  resumePage.style.setProperty("--resume-page-tint", lightenAccent(accent, 97));
  resumePage.style.setProperty("--resume-accent-soft", lightenAccent(accent, 90));
  resumePage.style.setProperty("--resume-accent-light", lightenAccent(accent, 82));
  resumePage.style.setProperty("--resume-accent-muted", lightenAccent(accent, 72));
  resumePage.style.setProperty("--resume-accent-border", lightenAccent(accent, 62));
  resumePage.style.setProperty("--resume-accent-deep", darkenAccent(accent, 42));
  resumePage.style.setProperty("--resume-accent-dark", darkenAccent(accent, 58));
  resumePage.style.setProperty("--resume-accent-text", darkenAccent(accent, 28));
  resumePage.style.setProperty("--resume-accent-on-dark", lightenAccent(accent, 72));
  resumePage.style.setProperty("--resume-accent-on-dark-muted", lightenAccent(accent, 58));
}

function applyTheme() {
  const resumePage = document.querySelector(".resume-page");
  if (!resumePage) return;

  applyAccentTheme(resumePage, resumeData.theme.accentColor || getTemplateAccent());
  [
    "sans",
    "serif",
    "mono",
    "poppins",
    "georgia",
    "verdana",
    "trebuchet",
    "garamond",
    "system",
  ].forEach((font) => {
    resumePage.classList.toggle(`font-${font}`, resumeData.theme.fontFamily === font);
  });
  resumePage.classList.toggle("spacing-compact", resumeData.theme.spacing === "compact");
  resumePage.classList.toggle("spacing-relaxed", resumeData.theme.spacing === "relaxed");
}

function renderSection(section, itemRenderer) {
  const container = document.getElementById(`${section}Block`);
  const wrapper = document.querySelector(`[data-preview-section="${section}"]`);
  if (!container) return;

  const items = resumeData[section] || [];
  container.innerHTML = items.map(itemRenderer).join("");

  if (wrapper) {
    const shouldHide = resumeData.hiddenSections[section] || items.length === 0;
    wrapper.classList.toggle("hidden", shouldHide);
  }
}

function renderExperienceItem(item) {
  return `
    <article class="resume-item">
      <div class="item-top">
        <h4>${escapeHtml(item.role || "Role")}</h4>
        <span>${escapeHtml(dateRange(item.start, item.end))}</span>
      </div>
      <p class="muted">${escapeHtml([item.company, item.location].filter(Boolean).join(" | "))}</p>
      <p>${escapeHtml(item.description)}</p>
    </article>
  `;
}

function renderProjectItem(item) {
  const links = [makeLink("Live", item.live), makeLink("GitHub", item.github)]
    .filter(Boolean)
    .join("");

  return `
    <article class="resume-item">
      <div class="item-top">
        <h4>${escapeHtml(item.title || "Project Title")}</h4>
        <span>${escapeHtml(dateRange(item.start, item.end))}</span>
      </div>
      <p class="muted">${escapeHtml(item.stack)}</p>
      <p>${escapeHtml(item.description)}</p>
      <div class="resume-links">${links}</div>
    </article>
  `;
}

function renderEducationItem(item) {
  return `
    <article class="resume-item">
      <div class="item-top">
        <h4>${escapeHtml(item.school || "School / College")}</h4>
        <span>${escapeHtml(dateRange(item.start, item.end))}</span>
      </div>
      <p>${escapeHtml(item.degree)}</p>
      <p class="muted">${escapeHtml([item.location, item.score].filter(Boolean).join(" | "))}</p>
    </article>
  `;
}

function renderCertificationItem(item) {
  return `
    <article class="resume-item">
      <div class="item-top">
        <h4>${escapeHtml(item.name || "Certificate Name")}</h4>
        <span>${escapeHtml(item.year)}</span>
      </div>
      <p>${escapeHtml(item.issuer)}</p>
      <div class="resume-links">${makeLink("Credential", item.link)}</div>
    </article>
  `;
}

function updateHiddenSections() {
  const sections = ["summary", "skills", "experience", "projects", "education", "certifications"];
  sections.forEach((section) => {
    const button = document.querySelector(`[data-toggle="${section}"]`);
    if (!button) return;
    const isHidden = Boolean(resumeData.hiddenSections[section]);
    button.textContent = isHidden ? "Show" : "Hide";

    // Toggle preview section visibility for summary and skills
    if (section === "summary" || section === "skills") {
      const wrapper = document.querySelector(`[data-preview-section="${section}"]`);
      if (wrapper) {
        let shouldHide = isHidden;
        if (section === "summary") {
          shouldHide = isHidden || !resumeData.personal.summary.trim();
        } else if (section === "skills") {
          shouldHide = isHidden || getSkills().length === 0;
        }
        wrapper.classList.toggle("hidden", shouldHide);
      }
    }
  });
}

function getAtsReadability() {
  const personal = resumeData.personal;
  const summaryWords = personal.summary.trim().split(/\s+/).filter(Boolean).length;
  const atsFonts = new Set(["sans", "system", "verdana", "georgia", "trebuchet"]);
  const datedExperience = resumeData.experience.filter((item) => item.start && item.end).length;
  const checks = [
    { pass: Boolean(personal.fullName.trim()), weight: 10, tip: "Add your full name at the top." },
    { pass: isValidEmail(personal.email), weight: 10, tip: "Use a professional email address." },
    { pass: Boolean(personal.phone.trim()), weight: 8, tip: "Include a reachable phone number." },
    { pass: Boolean(personal.location.trim()), weight: 5, tip: "Add your city or region for local screening." },
    { pass: atsFonts.has(resumeData.theme.fontFamily), weight: 8, tip: "Switch to an ATS-safe font like Premium Sans or System Professional." },
    { pass: resumeData.theme.spacing !== "compact", weight: 5, tip: "Use Balanced or Airy spacing for easier ATS parsing." },
    { pass: resumeData.experience.length > 0, weight: 12, tip: "Add at least one professional experience entry." },
    { pass: resumeData.education.length > 0, weight: 10, tip: "Include your education background." },
    { pass: getSkills().length >= 8, weight: 10, tip: "List 8-12 role-relevant skills for keyword coverage." },
    { pass: !resumeData.hiddenSections.experience, weight: 8, tip: "Keep the experience section visible to recruiters." },
    { pass: !resumeData.hiddenSections.education, weight: 6, tip: "Keep education visible unless you have 8+ years of experience." },
    {
      pass: summaryWords >= 25 && summaryWords <= 90,
      weight: 8,
      tip: "Aim for a 25-90 word summary with role, strengths, and impact.",
    },
    {
      pass:
        resumeData.experience.length === 0 ||
        datedExperience / resumeData.experience.length >= 0.5,
      weight: 10,
      tip: "Add start and end dates to most experience entries.",
    },
    {
      pass: isValidUrl(personal.linkedin) && isValidUrl(personal.github),
      weight: 8,
      tip: "Use clean LinkedIn and GitHub URLs without broken formatting.",
    },
  ];

  const totalWeight = checks.reduce((sum, check) => sum + check.weight, 0);
  const earned = checks.filter((check) => check.pass).reduce((sum, check) => sum + check.weight, 0);
  const score = Math.round((earned / totalWeight) * 100);
  const tips = checks.filter((check) => !check.pass).map((check) => check.tip);

  return { score, tips, checks };
}

function updateScore() {
  const validation = validateResume();
  const checks = [
    resumeData.personal.fullName,
    resumeData.personal.jobRole,
    isValidEmail(resumeData.personal.email),
    resumeData.personal.phone,
    resumeData.personal.summary,
    getSkills().length >= 5,
    resumeData.education.length > 0,
    resumeData.projects.length > 0,
    resumeData.experience.length > 0,
    resumeData.certifications.length > 0,
    validation.errors.length === 0,
  ];

  const score = Math.round(
    (checks.filter(Boolean).length / checks.length) * 100,
  );
  resumeScore.textContent = `Strength ${score}%`;

  const ats = getAtsReadability();
  if (atsScore) atsScore.textContent = `ATS ${ats.score}%`;
}

function getResumeFilename() {
  const name = resumeData.personal.fullName.trim();
  if (!name) return "ResumeHub-Resume.pdf";
  const slug = name
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return slug ? `${slug}-Resume.pdf` : "ResumeHub-Resume.pdf";
}

function snapshotResumeData() {
  return JSON.stringify(resumeData);
}

function pushHistorySnapshot() {
  if (historyPaused) return;
  const snapshot = snapshotResumeData();
  if (undoStack.length && undoStack[undoStack.length - 1] === snapshot) return;
  undoStack.push(snapshot);
  if (undoStack.length > HISTORY_MAX) undoStack.shift();
  redoStack = [];
  updateUndoRedoButtons();
}

function scheduleHistorySnapshot() {
  clearTimeout(inputHistoryTimer);
  inputHistoryTimer = setTimeout(pushHistorySnapshot, 700);
}

function restoreResumeSnapshot(snapshot) {
  historyPaused = true;
  resumeData = JSON.parse(snapshot);
  syncTemplateTheme();
  hydrateForm();
  loadTemplate();
  saveResumeData();
  historyPaused = false;
  updateUndoRedoButtons();
}

function undoChange() {
  if (undoStack.length <= 1) return;
  redoStack.push(undoStack.pop());
  restoreResumeSnapshot(undoStack[undoStack.length - 1]);
  saveStatus.textContent = "Change undone";
}

function redoChange() {
  if (!redoStack.length) return;
  const snapshot = redoStack.pop();
  undoStack.push(snapshot);
  restoreResumeSnapshot(snapshot);
  saveStatus.textContent = "Change restored";
}

function updateUndoRedoButtons() {
  if (undoBtn) undoBtn.disabled = undoStack.length <= 1;
  if (redoBtn) redoBtn.disabled = redoStack.length === 0;
}

function applyDarkMode(enabled) {
  document.body.classList.toggle("dark-mode", enabled);
  if (darkModeBtn) {
    darkModeBtn.setAttribute("aria-pressed", String(enabled));
    darkModeBtn.innerHTML = enabled
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
  localStorage.setItem(DARK_MODE_KEY, enabled ? "1" : "0");
}

function initDarkMode() {
  const saved = localStorage.getItem(DARK_MODE_KEY);
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  applyDarkMode(saved === "1" || (saved === null && prefersDark));
}

function openShortcutsModal() {
  shortcutsModal?.classList.remove("hidden");
}

function closeShortcutsModal() {
  shortcutsModal?.classList.add("hidden");
}

function reorderSectionItem(section, fromIndex, toIndex) {
  if (!reorderableSections.has(section) || fromIndex === toIndex) return;
  const items = resumeData[section];
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= items.length || toIndex >= items.length) return;
  const [moved] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, moved);
  pushHistorySnapshot();
  renderEditor(section);
  renderResume();
  saveResumeData();
}

function initSectionBlockDrag() {
  const container = document.getElementById("sectionOrderEditor");
  if (!container || container.dataset.sectionDragReady) return;
  container.dataset.sectionDragReady = "1";

  container.addEventListener("dragstart", (event) => {
    const handle = event.target.closest("[data-section-drag-handle]");
    const card = event.target.closest(".repeat-card[data-section]");
    if (!handle || !card) return;

    const order = getSectionOrder();
    dragState = {
      type: "section",
      fromIndex: order.indexOf(card.dataset.section),
    };
    card.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", `section:${dragState.fromIndex}`);
  });

  container.addEventListener("dragover", (event) => {
    if (!dragState || dragState.type !== "section") return;
    const card = event.target.closest(".repeat-card[data-section]");
    if (!card) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    container.querySelectorAll(".repeat-card.drag-over").forEach((node) => {
      node.classList.remove("drag-over");
    });
    card.classList.add("drag-over");
  });

  container.addEventListener("drop", (event) => {
    if (!dragState || dragState.type !== "section") return;
    const card = event.target.closest(".repeat-card[data-section]");
    if (!card) return;
    event.preventDefault();
    const order = getSectionOrder();
    reorderMainSections(dragState.fromIndex, order.indexOf(card.dataset.section));
    dragState = null;
  });

  container.addEventListener("dragend", () => {
    dragState = null;
    container.querySelectorAll(".repeat-card").forEach((node) => {
      node.classList.remove("dragging", "drag-over");
    });
  });
}

function initDragReorder() {
  document.querySelectorAll(".items-editor").forEach((container) => {
    if (container.dataset.dragReady) return;
    container.dataset.dragReady = "1";

    container.addEventListener("dragstart", (event) => {
      const handle = event.target.closest("[data-drag-handle]");
      const item = event.target.closest(".item-editor");
      if (!handle || !item) return;

      dragState = {
        type: "item",
        section: item.dataset.section,
        fromIndex: Number(item.dataset.index),
      };
      item.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", `${dragState.section}:${dragState.fromIndex}`);
    });

    container.addEventListener("dragover", (event) => {
      if (!dragState || dragState.type !== "item") return;
      const item = event.target.closest(".item-editor");
      if (!item || item.dataset.section !== dragState.section) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      container.querySelectorAll(".item-editor.drag-over").forEach((node) => {
        node.classList.remove("drag-over");
      });
      item.classList.add("drag-over");
    });

    container.addEventListener("drop", (event) => {
      if (!dragState || dragState.type !== "item") return;
      const item = event.target.closest(".item-editor");
      if (!item || item.dataset.section !== dragState.section) return;
      event.preventDefault();
      reorderSectionItem(dragState.section, dragState.fromIndex, Number(item.dataset.index));
      dragState = null;
    });

    container.addEventListener("dragend", () => {
      dragState = null;
      container.querySelectorAll(".item-editor").forEach((node) => {
        node.classList.remove("dragging", "drag-over");
      });
    });
  });
}

function validateResume() {
  const errors = [];
  const warnings = [];
  const suggestions = [];
  const personal = resumeData.personal;

  if (!personal.fullName.trim()) errors.push("Full name is required.");
  if (!personal.jobRole.trim()) errors.push("Professional title is required.");
  if (!personal.email.trim()) {
    errors.push("Email is required.");
  } else if (!isValidEmail(personal.email)) {
    errors.push("Enter a valid email address.");
  }
  if (!personal.phone.trim()) errors.push("Phone number is required.");
  if (!personal.location.trim()) warnings.push("Add your location for a more complete profile.");

  ["portfolio", "linkedin", "github"].forEach((field) => {
    if (!isValidUrl(personal[field])) {
      errors.push(`${field[0].toUpperCase() + field.slice(1)} URL is invalid.`);
    }
  });

  const summaryWords = personal.summary.trim().split(/\s+/).filter(Boolean).length;
  if (summaryWords < 18) {
    warnings.push("Executive summary is short. Aim for at least 18 focused words.");
  }

  if (getSkills().length < 5) warnings.push("Add at least 5 targeted skills.");
  if (resumeData.education.length === 0) warnings.push("Add at least one education entry.");
  if (resumeData.projects.length === 0) warnings.push("Add at least one signature project.");

  validateItems("experience", ["company", "role", "description"], errors);
  validateItems("projects", ["title", "stack", "description"], errors);
  validateItems("education", ["school", "degree"], errors);
  validateItems("certifications", ["name", "issuer"], errors);

  resumeData.projects.forEach((project, index) => {
    ["live", "github"].forEach((field) => {
      if (!isValidUrl(project[field])) {
        errors.push(`Project ${index + 1} has an invalid ${field} URL.`);
      }
    });
  });

  resumeData.certifications.forEach((certificate, index) => {
    if (!isValidUrl(certificate.link)) {
      errors.push(`Certification ${index + 1} has an invalid credential URL.`);
    }
  });

  const skillCount = getSkills().length;
  if (skillCount >= 5 && skillCount < 8) {
    suggestions.push("Add 8-12 targeted skills for stronger keyword coverage.");
  }
  if (summaryWords >= 18 && !/\b(led|built|improved|increased|reduced|managed|created|delivered|designed|launched)\b/i.test(personal.summary)) {
    suggestions.push("Make the summary more premium with action words and clear impact.");
  }

  const allDescriptions = [
    ...resumeData.experience.map((item) => item.description),
    ...resumeData.projects.map((item) => item.description),
  ].filter(Boolean);
  if (allDescriptions.length > 0 && !allDescriptions.some((text) => /\d|%|x\b|times|users|revenue|growth/i.test(text))) {
    suggestions.push("Add metrics where possible, like users, speed, revenue, marks, or percentage improvement.");
  }
  if (resumeData.projects.length > 0 && !resumeData.projects.some((project) => project.live || project.github)) {
    suggestions.push("Add a GitHub or live demo link for at least one showcase project.");
  }
  if (resumeData.experience.length > 0 && resumeData.experience.some((item) => !item.start || !item.end)) {
    suggestions.push("Add dates to experience entries so recruiters can read your timeline at a glance.");
  }
  if (templateSupportsPhoto() && resumeData.personal.photo && resumeData.personal.photoZoom === "100") {
    suggestions.push("Use portrait zoom and focus controls to frame the profile image neatly.");
  }

  return { errors, warnings, suggestions: suggestions.slice(0, 4) };
}

function validateItems(section, requiredFields, errors) {
  resumeData[section].forEach((item, index) => {
    requiredFields.forEach((field) => {
      if (!String(item[field] || "").trim()) {
        errors.push(`${sectionLabel(section)} ${index + 1}: ${field} is required.`);
      }
    });
  });
}

function updateValidation() {
  const validation = validateResume();
  const ats = getAtsReadability();
  const items = [
    ...validation.errors.map((message) => ({ type: "error", message })),
    ...validation.warnings.map((message) => ({ type: "warning", message })),
    ...ats.tips.slice(0, 4).map((message) => ({ type: "ats", message })),
    ...validation.suggestions.map((message) => ({ type: "tip", message })),
  ];

  const atsTipCount = ats.tips.length;
  validationSummary.textContent =
    validation.errors.length > 0
      ? `${validation.errors.length} errors`
      : validation.warnings.length > 0
        ? `${validation.warnings.length} warnings`
        : atsTipCount > 0
          ? `${atsTipCount} ATS tips`
          : validation.suggestions.length > 0
            ? `${validation.suggestions.length} tips`
            : "Profile polished";

  validationList.innerHTML =
    items.length > 0
      ? items
          .map(
            (item) =>
              `<li class="${item.type}"><span>${item.type}</span>${escapeHtml(item.message)}</li>`,
          )
          .join("")
      : `<li class="success"><span>ok</span>Your resume looks polished and ready for export.</li>`;

  markInvalidFields(validation);
}

function markInvalidFields() {
  document.querySelectorAll(".field-invalid").forEach((field) => {
    field.classList.remove("field-invalid");
  });

  const personal = resumeData.personal;
  const fieldRules = {
    fullName: !personal.fullName.trim(),
    jobRole: !personal.jobRole.trim(),
    email: !isValidEmail(personal.email),
    phone: !personal.phone.trim(),
    portfolio: !isValidUrl(personal.portfolio),
    linkedin: !isValidUrl(personal.linkedin),
    github: !isValidUrl(personal.github),
  };

  Object.entries(fieldRules).forEach(([name, invalid]) => {
    if (invalid) form.elements[name]?.classList.add("field-invalid");
  });

  document.querySelectorAll("[data-section][data-field]").forEach((field) => {
    const { section, index, field: fieldName } = field.dataset;
    const item = resumeData[section][Number(index)];
    const required = {
      experience: ["company", "role", "description"],
      projects: ["title", "stack", "description"],
      education: ["school", "degree"],
      certifications: ["name", "issuer"],
    };

    const isRequiredMissing =
      required[section]?.includes(fieldName) && !String(item[fieldName] || "").trim();
    const isBadUrl =
      ["live", "github", "link"].includes(fieldName) && !isValidUrl(item[fieldName]);

    if (isRequiredMissing || isBadUrl) field.classList.add("field-invalid");
  });
}

function hydrateForm() {
  syncTemplateTheme();
  templateSelect.value = resumeData.template;
  form.elements.accentColor.value = resumeData.theme.accentColor;
  form.elements.fontFamily.value = resumeData.theme.fontFamily || "sans";
  form.elements.spacing.value = resumeData.theme.spacing;
  resumeData.personal.photoShape ||= "circle";
  resumeData.personal.photoSize ||= "medium";
  resumeData.personal.photoPosition ||= "top";
  resumeData.personal.photoZoom ||= "100";
  resumeData.personal.photoOffsetX ||= "0";
  resumeData.personal.photoOffsetY ||= "0";
  document.body.classList.toggle("fit-preview", resumeData.previewFit);
  fitPreviewBtn?.classList.toggle("active", resumeData.previewFit);

  Object.entries(resumeData.personal).forEach(([key, value]) => {
    const input = form.elements[key];
    if (input) input.value = value;
  });

  updatePhotoControl();
  renderSkillsEditor();
  Object.keys(fieldMap).forEach(renderEditor);
  applyFormSectionOrder();
  updateHiddenSections();
}

function renderEditor(section) {
  const container = document.getElementById(`${section}Editor`);
  if (!container) return;

  const items = resumeData[section];
  container.innerHTML = items
    .map((item, index) => itemEditorTemplate(section, item, index))
    .join("");
  initDragReorder();
}

function renderSkillsEditor() {
  const container = document.getElementById("skillsEditorContainer");
  if (!container) return;

  const raw = resumeData.personal.skills || "";
  const groups = getSkillsGroupsFromRaw(raw);

  let html = "";
  if (groups) {
    groups.forEach((group, index) => {
      html += skillsGroupRowTemplate(group.category, group.skills.join(", "), index);
    });
  } else {
    html += skillsGroupRowTemplate("", raw, 0);
  }

  container.innerHTML = html;

  container.querySelectorAll(".skills-cat-name, .skills-cat-list").forEach(input => {
    input.addEventListener("input", saveSkillsFromEditor);
  });

  container.querySelectorAll(".delete-cat-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.currentTarget.dataset.index);
      removeSkillsGroup(idx);
    });
  });
}

function skillsGroupRowTemplate(category, skillsList, index) {
  return `
    <div class="skills-group-row" style="display: flex; gap: 8px; align-items: center; width: 100%; margin-bottom: 8px;" data-index="${index}">
      <input 
        type="text" 
        class="skills-cat-name" 
        placeholder="Category (e.g. Frontend)" 
        value="${escapeHtml(category)}" 
        style="width: 30%;"
        data-index="${index}"
      />
      <input 
        type="text" 
        class="skills-cat-list" 
        placeholder="Skills (e.g. React, HTML, CSS)" 
        value="${escapeHtml(skillsList)}" 
        style="width: 65%; flex-grow: 1;"
        data-index="${index}"
      />
      <button 
        class="ghost-btn delete-cat-btn" 
        type="button" 
        style="color: #ef4444; padding: 8px; display: flex; align-items: center; justify-content: center; min-width: 36px;" 
        title="Delete Category"
        data-index="${index}"
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;
}

function saveSkillsFromEditor() {
  const container = document.getElementById("skillsEditorContainer");
  if (!container) return;

  const rows = container.querySelectorAll(".skills-group-row");
  const segments = [];

  rows.forEach(row => {
    const catName = row.querySelector(".skills-cat-name").value.trim();
    const skillsList = row.querySelector(".skills-cat-list").value.trim();

    if (catName && skillsList) {
      segments.push(`${catName}: ${skillsList}`);
    } else if (skillsList) {
      segments.push(skillsList);
    }
  });

  resumeData.personal.skills = segments.join("; ");
  
  saveStatus.textContent = "Polishing draft...";
  renderResume();
  saveResumeData();
  scheduleHistorySnapshot();
}

function removeSkillsGroup(index) {
  const container = document.getElementById("skillsEditorContainer");
  if (!container) return;

  const rows = container.querySelectorAll(".skills-group-row");
  const segments = [];

  rows.forEach(row => {
    const idx = Number(row.dataset.index);
    if (idx === index) return;

    const catName = row.querySelector(".skills-cat-name").value.trim();
    const skillsList = row.querySelector(".skills-cat-list").value.trim();

    if (catName && skillsList) {
      segments.push(`${catName}: ${skillsList}`);
    } else if (skillsList) {
      segments.push(skillsList);
    }
  });

  resumeData.personal.skills = segments.join("; ");
  renderSkillsEditor();
  renderResume();
  saveResumeData();
  pushHistorySnapshot();
}

function addSkillsGroup() {
  const raw = resumeData.personal.skills || "";
  const cleanRaw = raw.trim();
  if (cleanRaw && !cleanRaw.endsWith(";")) {
    resumeData.personal.skills = `${cleanRaw}; : `;
  } else {
    resumeData.personal.skills = cleanRaw ? `${cleanRaw} : ` : ": ";
  }
  renderSkillsEditor();
  renderResume();
  saveResumeData();
  pushHistorySnapshot();
}

function itemEditorTemplate(section, item, index) {
  const fields = fieldMap[section]
    .map(([key, label, type]) => {
      const value = escapeHtml(item[key] || "");
      if (type === "textarea") {
        return `
          <label class="wide">
            ${label}
            <textarea rows="4" data-section="${section}" data-index="${index}" data-field="${key}">${value}</textarea>
          </label>
        `;
      }

      return `
        <label>
          ${label}
          <input type="${type}" value="${value}" data-section="${section}" data-index="${index}" data-field="${key}" />
        </label>
      `;
    })
    .join("");

  return `
    <div class="item-editor" data-section="${section}" data-index="${index}">
      <div class="item-editor-top">
        <div class="item-editor-top-main">
          <button class="drag-handle" type="button" data-drag-handle draggable="true" aria-label="Drag to reorder ${sectionLabel(section)} ${index + 1}">
            <i class="fa-solid fa-grip-vertical"></i>
          </button>
          <strong>${sectionLabel(section)} ${index + 1}</strong>
        </div>
        <button class="delete-btn" type="button" data-remove="${section}" data-index="${index}">
          Remove
        </button>
      </div>
      <div class="item-grid">${fields}</div>
    </div>
  `;
}

function sectionLabel(section) {
  const labels = {
    experience: "Experience",
    projects: "Project",
    education: "Education",
    certifications: "Certification",
  };
  return labels[section] || section;
}

function createItem(section) {
  return Object.fromEntries(fieldMap[section].map(([key]) => [key, ""]));
}

function updatePreviewScale() {
  const resumePage = document.querySelector(".resume-page");
  if (!resumePage || !resumeData.previewFit) {
    previewContainer.style.removeProperty("--preview-scale");
    previewContainer.style.removeProperty("--preview-height");
    return;
  }

  const availableWidth = previewContainer.clientWidth - 24;
  const scale = Math.min(1, Math.max(0.42, availableWidth / 794));
  previewContainer.style.setProperty("--preview-scale", scale.toFixed(3));
  previewContainer.style.setProperty("--preview-height", `${Math.ceil(1123 * scale)}px`);
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(resumeData, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "resumehub-resume.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

function importJson(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(reader.result);
      resumeData = {
        ...clone(emptyResume),
        ...imported,
        personal: { ...clone(emptyResume.personal), ...imported.personal },
        theme: { ...clone(emptyResume.theme), ...imported.theme },
      };
      if (resumeData.personal.photo && !resumeData.personal.originalPhoto) {
        resumeData.personal.originalPhoto = resumeData.personal.photo;
      }
      syncTemplateTheme();
      hydrateForm();
      loadTemplate();
      saveResumeData();
      pushHistorySnapshot();
    } catch (error) {
      alert("Could not import this JSON file. Please choose a valid ResumeHub export.");
      console.error(error);
    } finally {
      if (importJsonInput) importJsonInput.value = "";
    }
  });
  reader.readAsText(file);
}

function cleanImportedText(text) {
  return text
    .replace(/\r/g, "\n")
    .replace(/[•●▪◦]/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeImportedLine(line) {
  return line.replace(/\s+/g, " ").trim();
}

function looksLikeHeading(line) {
  return Boolean(getSectionName(line));
}

function getImportedLines(text) {
  return cleanImportedText(text)
    .split("\n")
    .map(normalizeImportedLine)
    .filter(Boolean);
}

function sectionAliases() {
  return {
    summary: [
      "summary",
      "professional summary",
      "profile",
      "profile summary",
      "executive summary",
      "career summary",
      "career objective",
      "objective",
      "about me",
      "about",
      "overview"
    ],
    skills: [
      "skills",
      "technical skills",
      "core skills",
      "key skills",
      "top skills",
      "skills technologies",
      "skills and technologies",
      "technologies",
      "expertise",
      "areas of expertise",
      "technical expertise",
      "proficiencies",
      "competencies",
      "core competencies",
      "technical skills and tools",
      "tools"
    ],
    education: [
      "education",
      "academics",
      "academic background",
      "academic qualifications",
      "academic details",
      "education background",
      "education credentials",
      "education and credentials",
      "qualifications"
    ],
    projects: [
      "projects",
      "personal projects",
      "academic projects",
      "key projects",
      "recent projects",
      "featured projects",
      "technical projects",
      "portfolio"
    ],
    certifications: [
      "certifications",
      "certificates",
      "certification",
      "licenses and certifications",
      "licenses & certifications",
      "courses",
      "credentials",
      "honors and awards",
      "honors & awards",
      "honors  awards"
    ],
    experience: [
      "experience",
      "work experience",
      "professional experience",
      "employment",
      "employment history",
      "work history",
      "career history",
      "jobs",
      "internships",
      "professional background"
    ],
    contact: [
      "contact"
    ]
  };
}

function getSectionName(line) {
  const normalized = normalizeImportedLine(line)
    .toLowerCase()
    .replace(/[:\-]+$/, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, " ")
    .trim();

  return Object.entries(sectionAliases()).find(([, aliases]) =>
    aliases.includes(normalized),
  )?.[0] || null;
}

function splitImportedSections(lines) {
  const sections = { header: [] };
  let active = "header";

  lines.forEach((line) => {
    const section = getSectionName(line);
    if (section) {
      active = section;
      sections[active] = [];
      return;
    }
    sections[active] = sections[active] || [];
    sections[active].push(line);
  });

  return sections;
}

function findFirstMatch(text, regex) {
  return text.match(regex)?.[0] || "";
}

function pickName(lines) {
  return (
    lines.find((line) => {
      if (looksLikeHeading(line)) return false;
      if (/@|\d{4,}|linkedin|github|portfolio|http|www\./i.test(line)) return false;
      const words = line.split(/\s+/);
      return words.length >= 2 && words.length <= 5 && line.length <= 48;
    }) || ""
  );
}

function pickRole(lines, name) {
  const index = lines.indexOf(name);
  const candidates = index >= 0 ? lines.slice(index + 1, index + 5) : lines.slice(0, 5);
  return (
    candidates.find((line) => {
      if (looksLikeHeading(line)) return false;
      if (/@|\d{4,}|linkedin|github|http|www\./i.test(line)) return false;
      return line.length <= 70;
    }) || ""
  );
}

function pickLocation(lines) {
  return (
    lines.find((line) => {
      if (/@|\d{4,}|linkedin|github|http|www\./i.test(line)) return false;
      return /india|usa|remote|bangalore|bengaluru|mumbai|delhi|pune|gadag|shirhatti|karnataka|california|new york/i.test(
        line,
      );
    }) || ""
  );
}

function parseSkills(lines) {
  const ignored = /^(skills|technical skills|core skills)$/i;
  return [...new Set(
    lines
      .flatMap((line) => line.split(/[,|/]+/))
      .map((skill) => skill.replace(/^[-–—]\s*/, "").trim())
      .filter((skill) => skill && !ignored.test(skill) && skill.length <= 32),
  )].slice(0, 18);
}

function firstParagraph(lines, maxLines = 4) {
  return lines
    .filter((line) => !looksLikeHeading(line))
    .slice(0, maxLines)
    .join(" ")
    .trim();
}

function parseEducation(lines) {
  const degreePattern = /(bachelor|master|secondary|school|college|university|engineering|science|degree|diploma|b\.?e|b\.?tech|m\.?tech|mba|xii|x\b)/i;
  const datePattern = /((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4})[\w\s.-]*(present|\d{4})?)/i;
  const items = [];

  function isDegreeLine(line) {
    const clean = line.trim().toLowerCase();
    const degreeKeywords = /bachelor|master|degree|diploma|b\.?e\b|b\.?tech|m\.?tech|mba|ph\.?d\b|doctorate|licentiate|associate|major|specialization|xii\b|x\b/i;
    const studyKeywords = /(science|engineering|arts|commerce|business|technology|fine arts|design|math|physics|chemistry|biology|humanities)\b/i;
    return degreeKeywords.test(clean) || (studyKeywords.test(clean) && !/university|college|school/i.test(clean));
  }

  lines.forEach((line, index) => {
    if (!isDegreeLine(line) && !degreePattern.test(line)) return;

    // Skip school/university-only lines if followed immediately by a specific degree line
    if (!isDegreeLine(line) && lines[index + 1] && isDegreeLine(lines[index + 1])) {
      return;
    }

    // Check if the previous line looks like a school name
    const prev = lines[index - 1] || "";
    const isPrevSchool = prev && prev.length < 70 && !datePattern.test(prev) && !/^[-•●▪◦*]\s*/.test(prev) && !looksLikeHeading(prev) && (!isDegreeLine(prev) || /university|college|school/i.test(prev));

    const school = isPrevSchool ? prev.trim() : (line.split(/[-–—|]/)[0].trim() || line);
    const next = lines[index + 1] || "";
    const next2 = lines[index + 2] || "";
    const dates = line.match(datePattern)?.[0] || next.match(datePattern)?.[0] || next2.match(datePattern)?.[0] || "";

    items.push({
      school: school,
      degree: line.trim(),
      location: /india|usa|gadag|shirhatti|karnataka/i.test(next) ? next : "",
      start: dates.split(/[-–—]| to /i)[0]?.trim() || "",
      end: dates.split(/[-–—]| to /i)[1]?.trim() || "",
      score: findFirstMatch(`${line} ${next} ${next2}`, /(cgpa|percentage|percent|score)[:\s]*[\w.]+/i),
    });
  });

  return items.slice(0, 4);
}

function parseDatedItems(lines, fallbackTitle) {
  const datePattern = /\b((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}|\d{1,2}\/\d{4}|\d{4})\b\s*[-–—to]*\s*\b(present|current|\d{4}|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}|\d{1,2}\/\d{4})?/i;
  
  const items = [];
  
  const cleanLines = lines
    .map(l => l.trim())
    .filter(l => l && !looksLikeHeading(l));
    
  if (cleanLines.length === 0) return [];
  
  const hasDates = cleanLines.some(line => datePattern.test(line));
  
  if (hasDates) {
    let currentItem = null;
    
    cleanLines.forEach((line, idx) => {
      const hasDate = datePattern.test(line);
      
      if (hasDate) {
        if (currentItem) {
          items.push(currentItem);
        }
        
        const dateMatch = line.match(datePattern)[0];
        const [start = "", end = ""] = dateMatch.split(/[-–—]| to /i).map(part => part.trim());
        let title = line.replace(datePattern, "").replace(/[,|:-]+$/, "").trim();
        
        const prevLine = cleanLines[idx - 1];
        if (prevLine && prevLine.length < 60 && !datePattern.test(prevLine) && !/^[-•●▪◦*]\s*/.test(prevLine)) {
          title = prevLine + (title ? " - " + title : "");
          if (currentItem && currentItem.description.length > 0) {
            currentItem.description.pop();
          }
        }
        
        currentItem = {
          title: title || fallbackTitle,
          start,
          end,
          description: []
        };
      } else {
        if (currentItem) {
          currentItem.description.push(line.replace(/^[-•●▪◦*]\s*/, "").trim());
        }
      }
    });
    
    if (currentItem) {
      items.push(currentItem);
    }
  } else {
    let currentItem = null;
    
    cleanLines.forEach((line) => {
      const isBullet = /^[-•●▪◦*]\s*/.test(line);
      const startsWithActionVerb = /^(conducted|assisted|designed|developed|implemented|created|led|managed|coordinated|wrote|built|optimized|improved|served|worked|spearheaded|engineered|handled|analyzed|tested|supervised|resolved|formulated|executed|established|maintained|monitored|produced|collaborated|facilitated|guided|mentored|trained)\b/i.test(line);
      
      const isTitle = !isBullet && !startsWithActionVerb && line.length < 60;
      
      if (isTitle || !currentItem) {
        if (currentItem) {
          items.push(currentItem);
        }
        currentItem = {
          title: line.replace(/[,|:-]+$/, "").trim() || fallbackTitle,
          start: "",
          end: "",
          description: []
        };
      } else {
        currentItem.description.push(line.replace(/^[-•●▪◦*]\s*/, "").trim());
      }
    });
    
    if (currentItem) {
      items.push(currentItem);
    }
  }
  
  return items.map((item) => ({
    title: item.title,
    stack: "",
    start: item.start,
    end: item.end,
    live: "",
    github: "",
    description: item.description.join(" ")
  })).slice(0, 4);
}

function parseExperience(lines) {
  return parseDatedItems(lines, "Experience").map((item) => {
    const titleParts = item.title.split(/\s+[-–—|]\s+/);
    const company = titleParts[0]?.trim() || item.title;
    const role = titleParts[1]?.trim() || company;
    return {
      company,
      role,
      location: "",
      start: item.start,
      end: item.end,
      description: item.description,
    };
  });
}

function parseLinkedInDatedItems(lines, fallbackTitle) {
  const datePattern = /\b((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}|\d{1,2}\/\d{4}|\d{4})\b\s*[-–—to]*\s*\b(present|current|\d{4}|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}|\d{1,2}\/\d{4})?/i;

  const dateIndices = [];
  lines.forEach((line, idx) => {
    if (datePattern.test(line)) {
      dateIndices.push(idx);
    }
  });

  if (dateIndices.length === 0) {
    return [];
  }

  const items = [];
  let currentCompany = "";

  function isDurationLine(line) {
    const clean = line.trim().toLowerCase();
    return /^\d+\s*(yr|year|mo|month)s?(\s+\d+\s*(mo|month)s?)?$/i.test(clean) ||
           /^\d+\s*(yrs|yrs\.|years|mos|mos\.|months)\b/i.test(clean);
  }

  function isDescriptionLine(line) {
    const clean = line.trim();
    if (!clean) return true;
    if (/^[-•●▪◦*]\s*/.test(clean)) return true;
    if (/^(conducted|assisted|designed|developed|implemented|created|led|managed|coordinated|wrote|built|optimized|improved|served|worked|spearheaded|engineered|handled|analyzed|tested|supervised|resolved|formulated|executed|established|maintained|monitored|produced|collaborated|facilitated|guided|mentored|trained)\b/i.test(clean)) {
      return true;
    }
    if (clean.length > 70) return true;
    return false;
  }

  function isHeaderCandidate(line) {
    if (!line) return false;
    if (isDescriptionLine(line)) return false;
    if (looksLikeHeading(line)) return false;
    return true;
  }

  // Pre-calculate header start indices for all items
  const headerStartIndices = [];
  for (let j = 0; j < dateIndices.length; j++) {
    const dIdx = dateIndices[j];
    
    let headerLinesCount = 1; // Default: 1 line (Job Title)
    if (dIdx >= 3 && isDurationLine(lines[dIdx - 2]) && isHeaderCandidate(lines[dIdx - 3])) {
      headerLinesCount = 3;
    } else if (dIdx >= 2 && isHeaderCandidate(lines[dIdx - 2]) && isHeaderCandidate(lines[dIdx - 1])) {
      headerLinesCount = 2;
    }
    
    headerStartIndices.push(dIdx - headerLinesCount);
  }

  // Parse each item
  for (let j = 0; j < dateIndices.length; j++) {
    const dIdx = dateIndices[j];
    const prevDIdx = j > 0 ? dateIndices[j - 1] : -1;

    let title = "";
    let company = "";
    let location = "";
    const headerLinesCount = dIdx - headerStartIndices[j];

    if (headerLinesCount === 3) {
      title = lines[dIdx - 1];
      company = lines[dIdx - 3];
      currentCompany = company;
    } else if (headerLinesCount === 2) {
      const rolePattern = /engineer|developer|manager|lead|director|intern|associate|analyst|specialist|consultant|officer|architect|designer|writer|head|coordinator|representative|support|specialist|expert/i;
      const term0 = lines[dIdx - 2];
      const term1 = lines[dIdx - 1];

      if (rolePattern.test(term0) && !rolePattern.test(term1)) {
        title = term0;
        company = term1;
      } else if (rolePattern.test(term1) && !rolePattern.test(term0)) {
        title = term1;
        company = term0;
      } else {
        title = term0;
        company = term1;
      }
      currentCompany = company;
    } else {
      title = lines[dIdx - 1];
      company = currentCompany || fallbackTitle;
    }

    // Parse Location
    let descStartIdx = dIdx + 1;
    const nextLine = lines[dIdx + 1] || "";
    if (nextLine && !isDescriptionLine(nextLine) && !datePattern.test(nextLine)) {
      location = nextLine;
      descStartIdx = dIdx + 2;
    }

    // Parse Description
    const nextHeaderStartIdx = j < dateIndices.length - 1 ? headerStartIndices[j + 1] : lines.length;
    const descriptionLines = lines.slice(descStartIdx, nextHeaderStartIdx)
      .map(line => line.replace(/^[-•●▪◦*]\s*/, "").trim())
      .filter(Boolean);

    items.push({
      title: title || fallbackTitle,
      stack: location,
      start: lines[dIdx].match(datePattern)[0].split(/[-–—]| to /i)[0]?.trim() || "",
      end: lines[dIdx].match(datePattern)[0].split(/[-–—]| to /i)[1]?.trim() || "",
      live: "",
      github: "",
      description: descriptionLines.join(" "),
      company: company
    });
  }

  return items.slice(0, 6);
}

function parseLinkedInExperience(lines) {
  return parseLinkedInDatedItems(lines, "Experience").map((item) => {
    return {
      company: item.company,
      role: item.title,
      location: item.stack,
      start: item.start,
      end: item.end,
      description: item.description,
    };
  });
}

function parseCertifications(lines) {
  return lines
    .filter((line) => line.length > 4 && !looksLikeHeading(line))
    .slice(0, 4)
    .map((line) => ({
      name: line.replace(/\s[-–—]\s.*$/, "").trim(),
      issuer: line.includes("|") ? line.split("|").slice(1).join(" ").trim() : "",
      year: findFirstMatch(line, /\b(20\d{2}|19\d{2})\b/),
      link: "",
    }));
}

function parseResumeText(text) {
  const cleaned = cleanImportedText(text);
  const lines = getImportedLines(cleaned);
  const sections = splitImportedSections(lines);
  
  const isLinkedIn = text.includes("linkedin.com/in/") && 
                     (text.includes("Top Skills") || text.includes("Contact") || text.includes("Page 1 of"));
  
  const header = sections.header || lines.slice(0, 8);
  const fullName = isLinkedIn ? (lines[0]?.trim() || "") : (pickName(header) || pickName(lines));
  const email = findFirstMatch(cleaned, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phone = findFirstMatch(cleaned, /(?:\+\d{1,3}[\s-]?)?\d[\d\s-]{7,}\d/);
  const linkedin = findFirstMatch(cleaned, /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s,|)]+/i);
  const github = findFirstMatch(cleaned, /(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s,|)]+/i);
  const portfolio = findFirstMatch(
    cleaned,
    /(?:https?:\/\/)?(?:www\.)?(?!linkedin\.com|github\.com)[a-z0-9-]+\.[a-z]{2,}[^\s,|)]*/i,
  );

  let jobRole = "";
  let location = "";

  if (isLinkedIn) {
    const nameIdx = lines.indexOf(fullName);
    if (nameIdx !== -1) {
      jobRole = lines[nameIdx + 1]?.trim() || "";
      const locCandidate = lines[nameIdx + 2] || "";
      if (locCandidate && !looksLikeHeading(locCandidate)) {
        location = locCandidate.trim();
      }
    }
  } else {
    jobRole = pickRole(header, fullName);
    location = pickLocation(header);
  }

  let experience = [];
  let projects = [];

  if (isLinkedIn) {
    experience = parseLinkedInExperience(sections.experience || []);
    projects = parseLinkedInDatedItems(sections.projects || [], "Project");
  } else {
    experience = parseExperience(sections.experience || []);
    projects = parseDatedItems(sections.projects || [], "Project");
  }

  return {
    personal: {
      ...clone(emptyResume.personal),
      fullName,
      jobRole,
      email,
      phone,
      location,
      portfolio,
      linkedin,
      github,
      summary: firstParagraph(sections.summary || [], 5),
      skills: parseSkills(sections.skills || []).join(", "),
    },
    education: parseEducation(sections.education || []),
    projects,
    experience,
    certifications: parseCertifications(sections.certifications || []),
  };
}

async function readPdfText(file) {
  if (!window.pdfjsLib) {
    throw new Error("PDF import is not ready. Please check your internet connection and reload.");
  }

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    
    // Check if the page is a LinkedIn page with a left sidebar (contains Contact, Top Skills, or Languages at x < 215)
    const hasLeftSidebar = content.items.some(item => {
      const text = item.str.trim().toLowerCase();
      const x = item.transform[4];
      return (text === "contact" || text === "top skills" || text === "languages") && x < 215;
    });

    if (hasLeftSidebar) {
      const leftRows = new Map();
      const rightRows = new Map();

      content.items.forEach((item) => {
        if (!item.str.trim()) return;
        const x = item.transform[4];
        const y = Math.round(item.transform[5]);

        if (x < 215) {
          const row = leftRows.get(y) || [];
          row.push({ x, text: item.str });
          leftRows.set(y, row);
        } else {
          const row = rightRows.get(y) || [];
          row.push({ x, text: item.str });
          rightRows.set(y, row);
        }
      });

      const leftLines = [...leftRows.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([, row]) =>
          row
            .sort((a, b) => a.x - b.x)
            .map((item) => item.text)
            .join(" ")
            .trim()
        )
        .filter(Boolean);

      const rightLines = [...rightRows.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([, row]) =>
          row
            .sort((a, b) => a.x - b.x)
            .map((item) => item.text)
            .join(" ")
            .trim()
        )
        .filter(Boolean);

      // Find where body starts in right column by searching for the first section heading
      let firstHeaderIdx = rightLines.length;
      for (let i = 0; i < rightLines.length; i++) {
        if (getSectionName(rightLines[i])) {
          firstHeaderIdx = i;
          break;
        }
      }

      const rightHeaderLines = rightLines.slice(0, firstHeaderIdx);
      const rightBodyLines = rightLines.slice(firstHeaderIdx);

      const combinedLines = [
        ...rightHeaderLines,
        ...leftLines,
        ...rightBodyLines
      ];

      pages.push(combinedLines.join("\n"));
    } else {
      const rows = new Map();
      content.items.forEach((item) => {
        if (!item.str.trim()) return;
        const y = Math.round(item.transform[5]);
        const row = rows.get(y) || [];
        row.push({ x: item.transform[4], text: item.str });
        rows.set(y, row);
      });

      const pageText = [...rows.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([, row]) =>
          row
            .sort((a, b) => a.x - b.x)
            .map((item) => item.text)
            .join(" ")
            .trim()
        )
        .filter(Boolean)
        .join("\n");

      pages.push(pageText);
    }
  }

  return pages.join("\n\n");
}

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result || ""));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsText(file);
  });
}

function applyImportedResume(parsed) {
  const template = resumeData.template;
  const previewFit = resumeData.previewFit;
  const theme = {
    ...clone(resumeData.theme),
    accentColor: resumeData.theme.accentColor || getTemplateAccent(template),
  };

  resumeData = {
    ...clone(emptyResume),
    ...parsed,
    template,
    previewFit,
    theme,
    hiddenSections: {},
    personal: {
      ...clone(emptyResume.personal),
      ...parsed.personal,
      photo: resumeData.personal.photo || "",
    },
  };

  hydrateForm();
  loadTemplate();
  saveResumeData();
  pushHistorySnapshot();
}

async function importResumeFile(file) {
  saveStatus.textContent = "Importing resume...";
  try {
    const lowerName = file.name.toLowerCase();
    const text =
      file.type === "application/pdf" || lowerName.endsWith(".pdf")
        ? await readPdfText(file)
        : await readTextFile(file);

    const parsed = parseResumeText(text);
    if (!parsed.personal.fullName && !parsed.personal.email && !parsed.personal.summary) {
      throw new Error("Could not find enough resume text to import.");
    }

    applyImportedResume(parsed);
    saveStatus.textContent = "Resume imported";
  } catch (error) {
    alert(`${error.message} You can still paste details manually.`);
    console.error(error);
    saveStatus.textContent = "Import needs review";
  } finally {
    resumeImportInput.value = "";
  }
}

form.addEventListener("input", (event) => {
  const target = event.target;

  if (target.dataset.section) {
    const { section, index, field } = target.dataset;
    resumeData[section][Number(index)][field] = target.value;
  } else if (target.name && target.name in resumeData.theme) {
    resumeData.theme[target.name] = target.value;
  } else if (target.name && target.name in resumeData.personal) {
    resumeData.personal[target.name] = target.value;
  }

  saveStatus.textContent = "Polishing draft...";
  renderResume();
  if (target.name?.startsWith("photo")) updatePhotoControl();
  saveResumeData();
  scheduleHistorySnapshot();
});

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const removeButton = event.target.closest("[data-remove]");
  const toggleButton = event.target.closest("[data-toggle]");

  if (addButton) {
    const section = addButton.dataset.add;
    resumeData[section].push(createItem(section));
    renderEditor(section);
    renderResume();
    saveResumeData();
    pushHistorySnapshot();
  }

  if (removeButton) {
    const section = removeButton.dataset.remove;
    const index = Number(removeButton.dataset.index);
    resumeData[section].splice(index, 1);
    renderEditor(section);
    renderResume();
    saveResumeData();
    pushHistorySnapshot();
  }

  if (toggleButton) {
    const section = toggleButton.dataset.toggle;
    resumeData.hiddenSections[section] = !resumeData.hiddenSections[section];
    renderResume();
    saveResumeData();
    pushHistorySnapshot();
  }
});

templateSelect.addEventListener("change", () => {
  resumeData.template = templateSelect.value;
  syncTemplateTheme(true);
  addSamplePhotoIfSupported(resumeData);
  updatePhotoControl();
  saveResumeData();
  loadTemplate();
  pushHistorySnapshot();
});

fitPreviewBtn?.addEventListener("click", () => {
  resumeData.previewFit = !resumeData.previewFit;
  document.body.classList.toggle("fit-preview", resumeData.previewFit);
  fitPreviewBtn?.classList.toggle("active", resumeData.previewFit);
  updatePreviewScale();
  saveResumeData();
  pushHistorySnapshot();
});

exportJsonBtn?.addEventListener("click", downloadJson);
addSkillsGroupBtn?.addEventListener("click", addSkillsGroup);

importJsonInput?.addEventListener("change", () => {
  const [file] = importJsonInput.files;
  if (file) importJson(file);
});

resumeImportInput?.addEventListener("change", () => {
  const [file] = resumeImportInput.files;
  if (file) importResumeFile(file);
});

photoInput?.addEventListener("change", () => {
  const [file] = photoInput.files;
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please choose a valid image file.");
    photoInput.value = "";
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Please choose an image smaller than 2 MB.");
    photoInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    openCropModal(reader.result);
    photoInput.value = "";
  });
  reader.readAsDataURL(file);
});

removePhotoBtn?.addEventListener("click", () => {
  resumeData.personal.photo = "";
  resumeData.personal.originalPhoto = "";
  updatePhotoControl();
  renderResume();
  saveResumeData();
  pushHistorySnapshot();
});

document.getElementById("sampleDataBtn").addEventListener("click", () => {
  resumeData = getSampleResume();
  resumeData.template = templateSelect.value;
  resumeData.sectionOrder = [...DEFAULT_SECTION_ORDER];
  syncTemplateTheme(true);
  addSamplePhotoIfSupported(resumeData);

  hydrateForm();
  loadTemplate();
  saveResumeData();
  pushHistorySnapshot();
});

document.getElementById("clearDataBtn").addEventListener("click", () => {
  if (!confirm("Reset all resume data? This cannot be undone with Ctrl+Z beyond the last snapshot.")) return;
  resumeData = clone(emptyResume);
  resumeData.template = templateSelect.value;
  syncTemplateTheme(true);
  hydrateForm();
  loadTemplate();
  saveResumeData();
  pushHistorySnapshot();
});

undoBtn?.addEventListener("click", undoChange);
redoBtn?.addEventListener("click", redoChange);

darkModeBtn?.addEventListener("click", () => {
  applyDarkMode(!document.body.classList.contains("dark-mode"));
});

shortcutsBtn?.addEventListener("click", openShortcutsModal);
shortcutsModal?.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-shortcuts]")) closeShortcutsModal();
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement;

  const mod = event.ctrlKey || event.metaKey;

  if (event.key === "Escape") {
    closeShortcutsModal();
    return;
  }

  if (!mod && event.key === "?" && !isTyping) {
    event.preventDefault();
    openShortcutsModal();
    return;
  }

  if (!mod) return;

  if (event.key.toLowerCase() === "z" && !event.shiftKey) {
    event.preventDefault();
    undoChange();
    return;
  }

  if (event.key.toLowerCase() === "y" || (event.key.toLowerCase() === "z" && event.shiftKey)) {
    event.preventDefault();
    redoChange();
    return;
  }

  if (event.key.toLowerCase() === "s") {
    event.preventDefault();
    saveResumeData();
    saveStatus.textContent = "Draft saved";
    return;
  }

  if (event.key.toLowerCase() === "p") {
    event.preventDefault();
    document.querySelector(".download-btn")?.click();
  }
});

cloudSaveBtn?.addEventListener("click", () => persistToCloud(true));

window.resumeHub = {
  getData: () => clone(resumeData),
  getValidation: validateResume,
  getAtsReadability,
  getResumeFilename,
  getResumeId: () => currentResumeId,
  loadTemplate,
  renderResume,
  persistToCloud,
  undo: undoChange,
  redo: redoChange,
};

async function initBuilder() {
  if (!window.ResumeHubAPI?.requireAuth()) return;

  initDarkMode();
  updateCloudControls();
  resumeData = await resolveInitialResumeData();
  resumeData = await applyUserProfileDefaults(resumeData);
  addSamplePhotoIfSupported(resumeData);
  hydrateForm();
  await loadTemplate();
  pushHistorySnapshot();
  initDragReorder();
  initSectionBlockDrag();
}

initBuilder();
window.addEventListener("resize", updatePreviewScale);
