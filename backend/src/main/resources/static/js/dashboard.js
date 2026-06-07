(function () {
  if (!window.ResumeHubAPI?.requireAuth()) return;

  const list = document.getElementById("resumeList");
  const emptyState = document.getElementById("resumeEmpty");
  const loadingState = document.getElementById("resumeLoading");
  const createBtn = document.getElementById("createResumeBtn");
  const userNameEl = document.getElementById("dashboardUserName");
  const statTotal = document.getElementById("statTotal");
  const statLastEdited = document.getElementById("statLastEdited");
  const statTemplates = document.getElementById("statTemplates");

  const TEMPLATE_META = {
    template1: { name: "ATS Single Column", tag: "ATS", accent: "#0f766e" },
    template2: { name: "Sidebar Split", tag: "Skills", accent: "#0f766e" },
    template3: { name: "Minimal Serif", tag: "Minimal", accent: "#a15c38" },
    template4: { name: "Executive Ledger", tag: "Executive", accent: "#334155" },
    template5: { name: "Creative Accent", tag: "Creative", accent: "#db2777" },
    template6: { name: "Technical Grid", tag: "Technical", accent: "#2563eb" },
    template7: { name: "Academic CV", tag: "Academic", accent: "#7c3aed" },
    template8: { name: "Compact One Page", tag: "Compact", accent: "#0f766e" },
    template9: { name: "Portfolio Canvas", tag: "Portfolio", accent: "#ea580c" },
    template10: { name: "Metrics Dashboard", tag: "Metrics", accent: "#0891b2" },
    template11: { name: "Corporate Blue", tag: "Corporate", accent: "#1d4ed8" },
    template12: { name: "Bold Header", tag: "Bold", accent: "#be123c" },
    template13: { name: "Two Column", tag: "Two Col", accent: "#0f766e" },
    template14: { name: "Timeline Layout", tag: "Timeline", accent: "#475569" },
    template15: { name: "Fresher Clean", tag: "Fresher", accent: "#16a34a" },
    template16: { name: "Rounded Bands", tag: "Rounded", accent: "#9333ea" },
    template17: { name: "Vertical Rule", tag: "Vertical", accent: "#334155" },
    template18: { name: "Gold Accent", tag: "Gold", accent: "#b45309" },
    template19: { name: "Centered Lines", tag: "Centered", accent: "#0f766e" },
    template20: { name: "Sidebar Timeline", tag: "Sidebar", accent: "#0369a1" },
    template21: { name: "Photo Sidebar", tag: "Photo", accent: "#0f766e" },
  };

  const user = window.ResumeHubAPI.getUser();
  if (userNameEl && user?.name) {
    userNameEl.textContent = user.name.split(" ")[0];
  }

  createBtn?.addEventListener("click", () => {
    window.location.href = window.ResumeHubAPI.resolvePath("pages/builder.html?template=template1");
  });

  function getTemplateMeta(templateName) {
    return (
      TEMPLATE_META[templateName] || {
        name: templateName?.replace("template", "Template ") || "Custom Template",
        tag: "Resume",
        accent: "#0f766e",
      }
    );
  }

  function previewImage(templateName) {
    const fileName = templateName?.startsWith("template") ? templateName : "template1";
    return window.ResumeHubAPI.resolvePath(`assets/images/${fileName}-preview.png`);
  }

  function formatRelativeDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  }

  function updateStats(resumes) {
    statTotal.textContent = String(resumes.length);

    if (!resumes.length) {
      statLastEdited.textContent = "—";
      statTemplates.textContent = "0";
      return;
    }

    const latest = resumes.reduce((current, resume) => {
      if (!current) return resume;
      return new Date(resume.updatedAt) > new Date(current.updatedAt) ? resume : current;
    }, null);

    statLastEdited.textContent = formatRelativeDate(latest?.updatedAt);
    statTemplates.textContent = String(new Set(resumes.map((resume) => resume.templateName)).size);
  }

  function setViewState(state) {
    loadingState?.classList.toggle("hidden", state !== "loading");
    emptyState?.classList.toggle("hidden", state !== "empty");
    list?.classList.toggle("hidden", state !== "list");
  }

  async function loadResumes() {
    setViewState("loading");

    try {
      const resumes = await window.ResumeHubAPI.getResumes();
      updateStats(resumes);

      if (!resumes.length) {
        list.innerHTML = "";
        setViewState("empty");
        return;
      }

      list.innerHTML = resumes
        .map((resume) => {
          const meta = getTemplateMeta(resume.templateName);
          const editHref = window.ResumeHubAPI.resolvePath(`pages/builder.html?resumeId=${resume.id}`);

          return `
            <article class="dashboard-resume-card" data-resume-id="${resume.id}" style="--card-accent: ${meta.accent}">
              <div class="dashboard-resume-preview">
                <img
                  src="${previewImage(resume.templateName)}"
                  alt="${escapeHtml(meta.name)} preview"
                  loading="lazy"
                />
                <span class="dashboard-resume-tag">${escapeHtml(meta.tag)}</span>
              </div>
              <div class="dashboard-resume-body">
                <div>
                  <h3>${escapeHtml(resume.title)}</h3>
                  <p class="dashboard-resume-template">${escapeHtml(meta.name)}</p>
                  <p class="dashboard-resume-meta">
                    <i class="fa-regular fa-clock"></i>
                    Updated ${formatRelativeDate(resume.updatedAt)}
                  </p>
                </div>
                <div class="dashboard-resume-actions">
                  <a class="secondary-btn" href="${editHref}">
                    <i class="fa-solid fa-pen-to-square"></i>
                    Continue editing
                  </a>
                  <button class="dashboard-delete-btn" type="button" data-id="${resume.id}" aria-label="Delete resume">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </article>
          `;
        })
        .join("");

      list.querySelectorAll(".dashboard-delete-btn").forEach((button) => {
        button.addEventListener("click", async () => {
          const id = button.dataset.id;
          if (!confirm("Delete this resume permanently?")) return;
          await window.ResumeHubAPI.deleteResume(id);
          loadResumes();
        });
      });

      setViewState("list");
    } catch (error) {
      loadingState?.classList.add("hidden");
      list.classList.remove("hidden");
      list.innerHTML = `<div class="auth-error">${escapeHtml(error.message)}</div>`;
    }
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  loadResumes();
})();
