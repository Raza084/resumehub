package com.resumehub.controller;

import com.resumehub.dto.ApiResponse;
import com.resumehub.dto.ResumeRequest;
import com.resumehub.dto.ResumeResponse;
import com.resumehub.dto.ResumeSummaryResponse;
import com.resumehub.service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ResumeResponse>> createResume(@Valid @RequestBody ResumeRequest request) {
        ResumeResponse response = resumeService.createResume(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Resume created", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ResumeSummaryResponse>>> getResumes() {
        return ResponseEntity.ok(ApiResponse.success(resumeService.getUserResumes()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ResumeResponse>> getResume(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(resumeService.getResume(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ResumeResponse>> updateResume(
            @PathVariable Long id,
            @Valid @RequestBody ResumeRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Resume updated", resumeService.updateResume(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return ResponseEntity.ok(ApiResponse.success("Resume deleted successfully"));
    }
}
