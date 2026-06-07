(function () {
  const form = document.getElementById("forgotForm");
  const errorBox = document.getElementById("authError");
  const successBox = document.getElementById("authSuccess");
  const submitBtn = document.getElementById("authSubmit");

  if (!form || !window.ResumeHubAPI) return;

  // If already authenticated, redirect to dashboard
  if (window.ResumeHubAPI.isAuthenticated()) {
    window.location.href = window.ResumeHubAPI.resolvePath("pages/dashboard.html");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorBox?.classList.add("hidden");
    successBox?.classList.add("hidden");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending OTP...";

    const formData = new FormData(form);
    const email = formData.get("email");

    try {
      await window.ResumeHubAPI.forgotPassword(email);
      if (successBox) {
        successBox.textContent = "OTP generated successfully! Redirecting you to the verification screen...";
        successBox.classList.remove("hidden");
      }
      form.reset();

      // Redirect after 1.5 seconds to reset-password.html with prefilled email
      setTimeout(() => {
        window.location.href = `${window.ResumeHubAPI.resolvePath("pages/reset-password.html")}?email=${encodeURIComponent(email)}`;
      }, 1500);
    } catch (error) {
      if (errorBox) {
        errorBox.textContent = error.message || "Failed to initiate password reset.";
        errorBox.classList.remove("hidden");
      }
      submitBtn.disabled = false;
      submitBtn.textContent = "Send OTP";
    }
  });
})();
