(function () {
  const TOKEN_KEY = "resumehub.authToken.v1";
  const USER_KEY = "resumehub.authUser.v1";
  const API_BASE = window.RESUMEHUB_API_BASE || (
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:8080/api"
      : `${window.location.origin}/api`
  );

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  }

  function isAuthenticated() {
    return Boolean(getToken());
  }

  async function request(path, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const message = payload?.message || "Request failed";
      throw new Error(message);
    }

    if (payload && payload.success === false) {
      throw new Error(payload.message || "Request failed");
    }

    return payload?.data ?? payload;
  }

  async function register(name, email, password) {
    const data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    setSession(data.token, data.user);
    return data;
  }

  async function login(email, password) {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setSession(data.token, data.user);
    return data;
  }

  function logout() {
    clearSession();
    window.location.href = resolvePath("pages/login.html");
  }

  function resolvePath(relativePath) {
    if (relativePath === "index.html" || relativePath === "") return "/";
    
    // Extract query parameter or hash if any
    let urlStr = relativePath;
    let queryHash = "";
    const queryIdx = urlStr.search(/[?#]/);
    if (queryIdx !== -1) {
      queryHash = urlStr.substring(queryIdx);
      urlStr = urlStr.substring(0, queryIdx);
    }
    
    if (urlStr.startsWith("pages/")) {
      urlStr = urlStr.substring(6);
    }
    
    urlStr = urlStr.replace(".html", "");
    
    return `/${urlStr}${queryHash}`;
  }

  function getInitials(name) {
    const parts = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!parts.length) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderAuthNav(containerSelector = ".nav-links") {
    const nav = document.querySelector(containerSelector);
    if (!nav) return;

    const path = window.location.pathname;

    if (path.includes("/dashboard.html") || path.endsWith("/dashboard")) {
      // Hide wordmark on dashboard page to prevent centering conflict
      document.querySelector(".navbar-wordmark")?.classList.add("hidden");

      if (isAuthenticated()) {
        nav.innerHTML = `
          <li><a href="${resolvePath("index.html")}">Home</a></li>
          <li><a href="${resolvePath("pages/templates.html")}">Templates</a></li>
          <li><a href="${resolvePath("pages/profile.html")}">Profile</a></li>
        `;
      }
    } else if (path.includes("/profile.html") || path.endsWith("/profile")) {
      document.querySelector(".navbar-wordmark")?.classList.remove("hidden");
      nav.innerHTML = "";
    } else if (path.includes("/templates.html") || path.endsWith("/templates")) {
      document.querySelector(".navbar-wordmark")?.classList.remove("hidden");
      if (isAuthenticated()) {
        nav.innerHTML = `
          <li><a href="${resolvePath("index.html")}">Home</a></li>
          <li><a href="${resolvePath("pages/dashboard.html")}">Dashboard</a></li>
          <li><a href="${resolvePath("pages/profile.html")}">Profile</a></li>
        `;
      } else {
        nav.innerHTML = `
          <li><a href="${resolvePath("index.html")}">Home</a></li>
          <li><a href="${resolvePath("pages/templates.html")}">Templates</a></li>
          <li><a href="${resolvePath("pages/builder.html")}">Builder</a></li>
        `;
      }
    } else if (path.includes("/login") || path.includes("/register") || path.includes("/forgot-password") || path.includes("/reset-password")) {
      document.querySelector(".navbar-wordmark")?.classList.remove("hidden");
      nav.innerHTML = "";
    } else {
      document.querySelector(".navbar-wordmark")?.classList.remove("hidden");
      if (isAuthenticated()) {
        nav.innerHTML = `
          <li><a href="${resolvePath("index.html")}#features">Features</a></li>
          <li><a href="${resolvePath("pages/templates.html")}">Templates</a></li>
          <li><a href="${resolvePath("index.html")}#workflow">Workflow</a></li>
          <li><a href="${resolvePath("pages/dashboard.html")}">Dashboard</a></li>
        `;
      } else {
        if (nav.children.length === 0) {
          nav.innerHTML = `
            <li><a href="${resolvePath("index.html")}#features">Features</a></li>
            <li><a href="${resolvePath("pages/templates.html")}">Templates</a></li>
            <li><a href="${resolvePath("index.html")}#workflow">Workflow</a></li>
          `;
        }
      }
    }
  }

  function renderAuthButtons(containerSelector = ".auth-buttons") {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const path = window.location.pathname;

    if (path.includes("/login") || path.includes("/register") || path.includes("/forgot-password") || path.includes("/reset-password")) {
      container.innerHTML = `
        <a href="${resolvePath("index.html")}" class="secondary-btn" style="min-height: 38px; padding: 0 16px; font-size: 14px; display: inline-flex; align-items: center; justify-content: center;">Home</a>
      `;
      return;
    }

    if (path.includes("/dashboard.html") || path.endsWith("/dashboard")) {
      if (isAuthenticated()) {
        container.innerHTML = `<a href="#" class="login-btn" data-logout-link>Logout</a>`;
        container
          .querySelector("[data-logout-link]")
          ?.addEventListener("click", (event) => {
            event.preventDefault();
            logout();
          });
      } else {
        container.innerHTML = "";
      }
      return;
    }

    if (path.includes("/profile.html") || path.endsWith("/profile")) {
      if (isAuthenticated()) {
        const user = getUser();
        const profileHref = resolvePath("pages/profile.html");
        const dashboardHref = resolvePath("pages/dashboard.html");

        const backBtnHtml = `
          <a class="secondary-btn" href="${dashboardHref}" style="min-height: 38px; padding: 0 14px; font-size: 14px; gap: 8px;">
            <i class="fa-solid fa-arrow-left"></i>
            Back to dashboard
          </a>
        `;
        
        let avatarHtml = "";
        if (user?.profilePhoto) {
          avatarHtml = `
            <a href="${profileHref}" class="nav-profile-link" title="View Profile">
              <img src="${user.profilePhoto}" class="nav-avatar" alt="${escapeHtml(user.name)}" />
            </a>
          `;
        } else {
          const initials = getInitials(user?.name || "User");
          avatarHtml = `
            <a href="${profileHref}" class="nav-profile-link" title="View Profile">
              <div class="nav-avatar-fallback">${escapeHtml(initials)}</div>
            </a>
          `;
        }
        container.innerHTML = `
          ${backBtnHtml}
          ${avatarHtml}
        `;
      } else {
        container.innerHTML = "";
      }
      return;
    }

    if ((path.includes("/templates.html") || path.endsWith("/templates")) && isAuthenticated()) {
      container.innerHTML = "";
      return;
    }

    if (isAuthenticated()) {
      const user = getUser();
      const profileHref = resolvePath("pages/profile.html");
      const logoutBtnHtml = `<a href="#" class="login-btn" data-logout-link>Logout</a>`;
      
      let avatarHtml = "";
      if (user?.profilePhoto) {
        avatarHtml = `
          <a href="${profileHref}" class="nav-profile-link" title="View Profile">
            <img src="${user.profilePhoto}" class="nav-avatar" alt="${escapeHtml(user.name)}" />
          </a>
        `;
      } else {
        const initials = getInitials(user?.name || "User");
        avatarHtml = `
          <a href="${profileHref}" class="nav-profile-link" title="View Profile">
            <div class="nav-avatar-fallback">${escapeHtml(initials)}</div>
          </a>
        `;
      }

      container.innerHTML = `
        ${logoutBtnHtml}
        ${avatarHtml}
      `;

      container
        .querySelector("[data-logout-link]")
        ?.addEventListener("click", (event) => {
          event.preventDefault();
          logout();
        });
    } else {
      const loginHref = resolvePath("pages/login.html");
      const registerHref = resolvePath("pages/register.html");
      container.innerHTML = `
        <a href="${loginHref}" class="login-btn">Login</a>
        <a href="${registerHref}" class="start-btn">Register</a>
      `;
    }
  }

  function bindProtectedBuilderLinks(root = document) {
    root.querySelectorAll('a[href*="builder.html"], a[href*="/builder"]').forEach((link) => {
      if (link.dataset.builderGuard === "true") return;
      link.dataset.builderGuard = "true";

      link.addEventListener("click", (event) => {
        if (isAuthenticated()) return;

        event.preventDefault();

        if (
          document.body.dataset.authModalPage === "true" &&
          typeof window.openAuthModal === "function"
        ) {
          window.openAuthModal(link.getAttribute("href"));
          return;
        }

        const target = new URL(link.getAttribute("href"), window.location.href);
        const returnUrl = encodeURIComponent(`${target.pathname}${target.search}`);
        window.location.href = `${resolvePath("pages/login.html")}?returnUrl=${returnUrl}`;
      });
    });
  }

  function requireAuth(redirectPath = "pages/login.html") {
    if (!isAuthenticated()) {
      const returnUrl = encodeURIComponent(
        window.location.pathname + window.location.search,
      );
      window.location.href = `${resolvePath(redirectPath)}?returnUrl=${returnUrl}`;
      return false;
    }
    return true;
  }

  window.ResumeHubAPI = {
    getToken,
    getUser,
    isAuthenticated,
    clearSession,
    register,
    login,
    logout,
    requireAuth,
    renderAuthNav,
    renderAuthButtons,
    bindProtectedBuilderLinks,
    resolvePath,
    forgotPassword: (email) =>
      request("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    resetPassword: (email, otp, newPassword) =>
      request("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, otp, newPassword }),
      }),
    getProfile: () => request("/users/profile"),
    updateProfile: (payload) =>
      request("/users/profile", {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    changePassword: (payload) =>
      request("/users/change-password", {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    getResumes: () => request("/resumes"),
    getResume: (id) => request(`/resumes/${id}`),
    createResume: (payload) =>
      request("/resumes", { method: "POST", body: JSON.stringify(payload) }),
    updateResume: (id, payload) =>
      request(`/resumes/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    deleteResume: (id) => request(`/resumes/${id}`, { method: "DELETE" }),
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderAuthNav(".nav-links");
    renderAuthNav(".topbar-auth-nav");
    renderAuthButtons(".auth-buttons");
    bindProtectedBuilderLinks();
  });
})();
