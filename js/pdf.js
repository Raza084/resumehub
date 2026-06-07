const downloadBtn = document.querySelector(".download-btn");

downloadBtn?.addEventListener("click", async () => {
  const resumePage = document.querySelector(".resume-page");

  if (!resumePage) {
    alert("Resume preview is still loading. Please try again.");
    return;
  }

  const validation = window.resumeHub?.getValidation?.();
  if (validation?.errors?.length) {
    const proceed = confirm(
      `Your resume has ${validation.errors.length} validation error(s). Download anyway?`,
    );
    if (!proceed) return;
  }

  const options = {
    margin: 0,
    filename: window.resumeHub?.getResumeFilename?.() || "ResumeHub-Resume.pdf",
    image: {
      type: "jpeg",
      quality: 1,
    },
    html2canvas: {
      scale: 3,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: "#ffffff",
      letterRendering: true,
    },
    jsPDF: {
      unit: "px",
      format: [794, 1123],
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["css", "legacy"],
      avoid: [".resume-item", ".resume-section", ".item-top"],
    },
  };

  document.body.classList.add("pdf-exporting");
  await document.fonts?.ready;

  try {
    await html2pdf().set(options).from(resumePage).save();
  } finally {
    document.body.classList.remove("pdf-exporting");
  }
});
