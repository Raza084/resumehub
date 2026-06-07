(function () {
  const form = document.getElementById("resetForm");
  const errorBox = document.getElementById("authError");
  const successBox = document.getElementById("authSuccess");
  const submitBtn = document.getElementById("authSubmit");

  if (!form || !window.ResumeHubAPI) return;

  // Prefill email if provided in the URL query string
  const params = new URLSearchParams(window.location.search);
  const emailParam = params.get("email");
  if (emailParam) {
    const emailField = document.getElementById("email");
    if (emailField) {
      emailField.value = emailParam;
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorBox?.classList.add("hidden");
    successBox?.classList.add("hidden");

    const email = document.getElementById("email").value;
    const otp = document.getElementById("otp").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
      if (errorBox) {
        errorBox.textContent = "Passwords do not match.";
        errorBox.classList.remove("hidden");
      }
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Resetting Password...";

    try {
      await window.ResumeHubAPI.resetPassword(email, otp, newPassword);
      if (successBox) {
        successBox.textContent = "Password reset successful! Redirecting you to the login page...";
        successBox.classList.remove("hidden");
      }
      form.reset();

      // Redirect after 2.5 seconds
      setTimeout(() => {
        window.location.href = window.ResumeHubAPI.resolvePath("pages/login.html");
      }, 2500);
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Reset Password";
      if (errorBox) {
        errorBox.textContent = error.message || "Failed to reset password.";
        errorBox.classList.remove("hidden");
      }
    }
  });
})();
