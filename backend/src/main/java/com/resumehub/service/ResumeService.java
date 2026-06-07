package com.resumehub.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumehub.dto.ResumeRequest;
import com.resumehub.dto.ResumeResponse;
import com.resumehub.dto.ResumeSummaryResponse;
import com.resumehub.entity.Resume;
import com.resumehub.entity.User;
import com.resumehub.exception.BadRequestException;
import com.resumehub.exception.ResourceNotFoundException;
import com.resumehub.repository.ResumeRepository;
import com.resumehub.repository.UserRepository;
import com.resumehub.security.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ResumeService(ResumeRepository resumeRepository,
                         UserRepository userRepository,
                         ObjectMapper objectMapper) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public ResumeResponse createResume(ResumeRequest request) {
        validateResumeJson(request.getResumeDataJson());

        User user = getCurrentUserEntity();
        Resume resume = new Resume();
        resume.setUser(user);
        resume.setTitle(request.getTitle().trim());
        resume.setTemplateName(request.getTemplateName().trim());
        resume.setResumeDataJson(request.getResumeDataJson());

        return toResponse(resumeRepository.save(resume));
    }

    public List<ResumeSummaryResponse> getUserResumes() {
        Long userId = SecurityUtils.getCurrentUserId();
        return resumeRepository.findByUserIdOrderByUpdatedAtDesc(userId).stream()
                .map(this::toSummary)
                .toList();
    }

    public ResumeResponse getResume(Long id) {
        Resume resume = getOwnedResume(id);
        return toResponse(resume);
    }

    @Transactional
    public ResumeResponse updateResume(Long id, ResumeRequest request) {
        validateResumeJson(request.getResumeDataJson());

        Resume resume = getOwnedResume(id);
        resume.setTitle(request.getTitle().trim());
        resume.setTemplateName(request.getTemplateName().trim());
        resume.setResumeDataJson(request.getResumeDataJson());

        return toResponse(resumeRepository.save(resume));
    }

    @Transactional
    public void deleteResume(Long id) {
        Resume resume = getOwnedResume(id);
        resumeRepository.delete(resume);
    }

    private Resume getOwnedResume(Long id) {
        Long userId = SecurityUtils.getCurrentUserId();
        return resumeRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
    }

    private User getCurrentUserEntity() {
        Long userId = SecurityUtils.getCurrentUserId();
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private void validateResumeJson(String resumeDataJson) {
        try {
            JsonNode node = objectMapper.readTree(resumeDataJson);
            if (!node.isObject()) {
                throw new BadRequestException("Resume data must be a JSON object");
            }
        } catch (BadRequestException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new BadRequestException("Resume data must be valid JSON");
        }
    }

    private ResumeResponse toResponse(Resume resume) {
        return new ResumeResponse(
                resume.getId(),
                resume.getTitle(),
                resume.getTemplateName(),
                resume.getResumeDataJson(),
                resume.getCreatedAt(),
                resume.getUpdatedAt()
        );
    }

    private ResumeSummaryResponse toSummary(Resume resume) {
        return new ResumeSummaryResponse(
                resume.getId(),
                resume.getTitle(),
                resume.getTemplateName(),
                resume.getCreatedAt(),
                resume.getUpdatedAt()
        );
    }
}
