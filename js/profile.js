(function () {
  if (!window.ResumeHubAPI?.requireAuth()) return;

  const profileForm = document.getElementById("profileForm");
  const professionalForm = document.getElementById("professionalForm");
  const passwordForm = document.getElementById("passwordForm");
  const profileMessage = document.getElementById("profileMessage");
  const professionalMessage = document.getElementById("professionalMessage");
  const passwordMessage = document.getElementById("passwordMessage");
  const profileAvatar = document.getElementById("profileAvatar");
  const profileAvatarImage = document.getElementById("profileAvatarImage");
  const profileAvatarInitials = document.getElementById("profileAvatarInitials");
  const profileHeroName = document.getElementById("profileHeroName");
  const profileHeroRole = document.getElementById("profileHeroRole");
  const profileHeroEmail = document.getElementById("profileHeroEmail");
  const profilePhotoInput = document.getElementById("profilePhotoInput");
  const profilePhotoPreview = document.getElementById("profilePhotoPreview");
  const profilePhotoFallback = document.getElementById("profilePhotoFallback");
  const removeProfilePhotoBtn = document.getElementById("removeProfilePhotoBtn");

  let currentProfile = {};
  let pendingProfilePhoto = null;
  let photoDirty = false;

  function getInitials(name) {
    const parts = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!parts.length) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  function getProfilePhoto(profile) {
    if (photoDirty) return pendingProfilePhoto || "";
    return profile.profilePhoto || "";
  }

  function updatePhotoUi(profile) {
    const photo = getProfilePhoto(profile);
    const hasPhoto = Boolean(photo);

    profilePhotoPreview.src = photo;
    profilePhotoPreview.classList.toggle("hidden", !hasPhoto);
    profilePhotoFallback.classList.toggle("hidden", hasPhoto);
    removeProfilePhotoBtn?.classList.toggle("hidden", !hasPhoto);

    if (profileAvatarImage) {
      profileAvatarImage.src = photo;
      profileAvatarImage.classList.toggle("hidden", !hasPhoto);
    }
    if (profileAvatarInitials) {
      profileAvatarInitials.textContent = getInitials(profile.name);
      profileAvatarInitials.classList.toggle("hidden", hasPhoto);
    }
    profileAvatar?.classList.toggle("has-photo", hasPhoto);
  }

  function updateHero(profile) {
    if (profileHeroName) profileHeroName.textContent = profile.name || "Your account";
    if (profileHeroEmail) profileHeroEmail.textContent = profile.email || "";
    if (profileHeroRole) {
      profileHeroRole.textContent = profile.jobTitle || "";
      profileHeroRole.classList.toggle("hidden", !profile.jobTitle);
    }
    updatePhotoUi(profile);
  }

  function populateForms(profile) {
    profileForm.elements.name.value = profile.name || "";
    profileForm.elements.email.value = profile.email || "";
    professionalForm.elements.jobTitle.value = profile.jobTitle || "";
    professionalForm.elements.phone.value = profile.phone || "";
    professionalForm.elements.location.value = profile.location || "";
    professionalForm.elements.linkedin.value = profile.linkedin || "";
  }

  function buildProfilePayload(overrides = {}) {
    return {
      name: profileForm.elements.name.value.trim(),
      email: profileForm.elements.email.value.trim(),
      profilePhoto: getProfilePhoto(currentProfile),
      jobTitle: professionalForm.elements.jobTitle.value.trim(),
      phone: professionalForm.elements.phone.value.trim(),
      location: professionalForm.elements.location.value.trim(),
      linkedin: professionalForm.elements.linkedin.value.trim(),
      ...overrides,
    };
  }

  async function saveProfile(payload, messageEl, successText) {
    messageEl.textContent = "";
    const updated = await window.ResumeHubAPI.updateProfile(payload);
    if (updated.token) {
      localStorage.setItem("resumehub.authToken.v1", updated.token);
    }
    currentProfile = updated;
    photoDirty = false;
    pendingProfilePhoto = updated.profilePhoto || null;
    localStorage.setItem("resumehub.authUser.v1", JSON.stringify(updated));
    window.ResumeHubAPI.renderAuthNav(".nav-links");
    populateForms(updated);
    updateHero(updated);
    messageEl.textContent = successText;
    messageEl.className = "form-message success";
    return updated;
  }

  async function loadProfile() {
    const profile = await window.ResumeHubAPI.getProfile();
    currentProfile = profile;
    pendingProfilePhoto = profile.profilePhoto || null;
    photoDirty = false;
    populateForms(profile);
    updateHero(profile);
  }

  profilePhotoInput?.addEventListener("change", () => {
    const [file] = profilePhotoInput.files;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose a valid image file.");
      profilePhotoInput.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2 MB.");
      profilePhotoInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      pendingProfilePhoto = reader.result;
      photoDirty = true;
      updatePhotoUi(currentProfile);
      profilePhotoInput.value = "";
    });
    reader.readAsDataURL(file);
  });

  removeProfilePhotoBtn?.addEventListener("click", () => {
    pendingProfilePhoto = "";
    photoDirty = true;
    updatePhotoUi(currentProfile);
  });

  professionalForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await saveProfile(
        buildProfilePayload(),
        professionalMessage,
        "Professional profile saved successfully.",
      );
    } catch (error) {
      professionalMessage.textContent = error.message;
      professionalMessage.className = "form-message error";
    }
  });

  profileForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await saveProfile(buildProfilePayload(), profileMessage, "Account details updated successfully.");
    } catch (error) {
      profileMessage.textContent = error.message;
      profileMessage.className = "form-message error";
    }
  });

  passwordForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    passwordMessage.textContent = "";
    const formData = new FormData(passwordForm);
    try {
      await window.ResumeHubAPI.changePassword({
        currentPassword: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
      });
      passwordForm.reset();
      passwordMessage.textContent = "Password changed successfully.";
      passwordMessage.className = "form-message success";
    } catch (error) {
      passwordMessage.textContent = error.message;
      passwordMessage.className = "form-message error";
    }
  });

  loadProfile().catch((error) => {
    profileMessage.textContent = error.message;
    profileMessage.className = "form-message error";
  });

  const bottomLogout = document.getElementById("profileBottomLogout");
  bottomLogout?.addEventListener("click", (event) => {
    event.preventDefault();
    window.ResumeHubAPI.logout();
  });
})();
