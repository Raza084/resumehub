package com.resumehub.service;

import com.resumehub.dto.ChangePasswordRequest;
import com.resumehub.dto.UpdateProfileRequest;
import com.resumehub.dto.UserProfileResponse;
import com.resumehub.entity.User;
import com.resumehub.exception.BadRequestException;
import com.resumehub.exception.ResourceNotFoundException;
import com.resumehub.repository.UserRepository;
import com.resumehub.security.SecurityUtils;
import com.resumehub.security.CustomUserDetails;
import com.resumehub.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public UserProfileResponse getProfile() {
        User user = getCurrentUserEntity();
        return toProfile(user);
    }

    @Transactional
    public UserProfileResponse updateProfile(UpdateProfileRequest request) {
        User user = getCurrentUserEntity();
        String email = request.getEmail().trim().toLowerCase();
        String oldEmail = user.getEmail();

        if (!oldEmail.equals(email) && userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email is already in use");
        }

        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setProfilePhoto(normalizePhoto(request.getProfilePhoto()));
        user.setJobTitle(trimToNull(request.getJobTitle()));
        user.setPhone(trimToNull(request.getPhone()));
        user.setLocation(trimToNull(request.getLocation()));
        user.setLinkedin(trimToNull(request.getLinkedin()));

        User saved = userRepository.save(user);
        UserProfileResponse response = toProfile(saved);
        if (!oldEmail.equals(email)) {
            String newToken = jwtTokenProvider.generateToken(new CustomUserDetails(saved));
            response.setToken(newToken);
        }
        return response;
    }

    @Transactional
    public void changePassword(ChangePasswordRequest request) {
        User user = getCurrentUserEntity();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    private User getCurrentUserEntity() {
        Long userId = SecurityUtils.getCurrentUserId();
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private UserProfileResponse toProfile(User user) {
        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getProfilePhoto(),
                user.getJobTitle(),
                user.getPhone(),
                user.getLocation(),
                user.getLinkedin(),
                user.getCreatedAt());
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private String normalizePhoto(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        if (trimmed.isEmpty()) {
            return null;
        }
        if (trimmed.length() > 3_000_000) {
            throw new BadRequestException("Profile photo is too large");
        }
        if (!trimmed.startsWith("data:image/")) {
            throw new BadRequestException("Profile photo must be a valid image");
        }
        return trimmed;
    }
}
