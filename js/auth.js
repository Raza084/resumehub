(function () {
  const form = document.getElementById("authForm");
  const errorBox = document.getElementById("authError");
  const submitBtn = document.getElementById("authSubmit");
  const mode = document.body.dataset.authMode;

  if (!form || !window.ResumeHubAPI) return;

  if (window.ResumeHubAPI.isAuthenticated()) {
    const params = new URLSearchParams(window.location.search);
    const returnUrl = params.get("returnUrl");
    window.location.href = returnUrl || window.ResumeHubAPI.resolvePath("pages/dashboard.html");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorBox?.classList.add("hidden");
    submitBtn.disabled = true;
    submitBtn.textContent = mode === "register" ? "Creating account..." : "Signing in...";

    const formData = new FormData(form);

    try {
      if (mode === "register") {
        await window.ResumeHubAPI.register(
          formData.get("name"),
          formData.get("email"),
          formData.get("password"),
        );
      } else {
        await window.ResumeHubAPI.login(formData.get("email"), formData.get("password"));
      }

      const params = new URLSearchParams(window.location.search);
      const returnUrl = params.get("returnUrl");
      window.location.href = returnUrl || window.ResumeHubAPI.resolvePath("pages/dashboard.html");
    } catch (error) {
      if (errorBox) {
        errorBox.textContent = error.message || "Authentication failed";
        errorBox.classList.remove("hidden");
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = mode === "register" ? "Create Account" : "Sign In";
    }
  });
})();
