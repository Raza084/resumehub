(function () {
  const modal = document.getElementById("authModal");
  const form = document.getElementById("authModalForm");
  const errorBox = document.getElementById("authModalError");
  const submitBtn = document.getElementById("authModalSubmit");
  const title = document.getElementById("authModalTitle");
  const subtitle = document.getElementById("authModalSubtitle");
  const switchText = document.getElementById("authModalSwitch");
  const nameField = document.getElementById("authModalNameField");
  const nameInput = form?.querySelector('input[name="name"]');

  if (!modal || !form || document.body.dataset.authModalPage !== "true") return;

  let mode = "login";
  let pendingBuilderHref = "./builder.html?template=template1";

  function setMode(nextMode) {
    mode = nextMode;
    const isRegister = mode === "register";

    if (title) title.textContent = isRegister ? "Create your account" : "Welcome back";
    if (subtitle) {
      subtitle.textContent = isRegister
        ? "Register to save resumes and start building."
        : "Sign in to open the resume builder.";
    }
    if (submitBtn) {
      submitBtn.textContent = isRegister ? "Create Account" : "Sign In";
    }
    if (nameField) nameField.classList.toggle("hidden", !isRegister);
    if (nameInput) nameInput.required = isRegister;
    if (switchText) {
      switchText.innerHTML = isRegister
        ? 'Already have an account? <a href="#" data-auth-mode-toggle>Sign in</a>'
        : 'New to ResumeHub? <a href="#" data-auth-mode-toggle>Create an account</a>';
    }
    hideError();
  }

  function hideError() {
    errorBox?.classList.add("hidden");
    if (errorBox) errorBox.textContent = "";
  }

  function showError(message) {
    if (!errorBox) return;
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
  }

  function openAuthModal(builderHref) {
    pendingBuilderHref = builderHref || pendingBuilderHref;
    setMode("login");
    form?.reset();
    hideError();
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("auth-modal-open");
    form?.querySelector('input[name="email"]')?.focus();
  }

  function closeAuthModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("auth-modal-open");
    hideError();
  }

  window.openAuthModal = openAuthModal;

  modal.querySelectorAll("[data-auth-modal-close]").forEach((element) => {
    element.addEventListener("click", closeAuthModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal.querySelector(".auth-modal-backdrop")) {
      closeAuthModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeAuthModal();
    }
  });

  switchText?.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-auth-mode-toggle]");
    if (!toggle) return;
    event.preventDefault();
    setMode(mode === "login" ? "register" : "login");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideError();

    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    if (!submitBtn) return;
    submitBtn.disabled = true;
    submitBtn.textContent = mode === "register" ? "Creating account..." : "Signing in...";

    try {
      if (mode === "register") {
        await window.ResumeHubAPI.register(name, email, password);
      } else {
        await window.ResumeHubAPI.login(email, password);
      }

      window.ResumeHubAPI.renderAuthNav(".nav-links");
      window.ResumeHubAPI.renderAuthButtons(".auth-buttons");
      closeAuthModal();
      window.location.href = pendingBuilderHref;
    } catch (error) {
      showError(error.message || "Authentication failed");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = mode === "register" ? "Create Account" : "Sign In";
    }
  });
})();
