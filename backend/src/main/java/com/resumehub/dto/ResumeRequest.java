package com.resumehub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ResumeRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Template name is required")
    @Size(max = 50, message = "Template name must not exceed 50 characters")
    private String templateName;

    @NotBlank(message = "Resume data is required")
    private String resumeDataJson;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getResumeDataJson() {
        return resumeDataJson;
    }

    public void setResumeDataJson(String resumeDataJson) {
        this.resumeDataJson = resumeDataJson;
    }
}
