package com.resumehub.service;

import com.resumehub.dto.AuthResponse;
import com.resumehub.dto.ForgotPasswordRequest;
import com.resumehub.dto.LoginRequest;
import com.resumehub.dto.RegisterRequest;
import com.resumehub.dto.ResetPasswordRequest;
import com.resumehub.dto.UserProfileResponse;
import com.resumehub.entity.PasswordResetToken;
import com.resumehub.entity.User;
import com.resumehub.exception.BadRequestException;
import com.resumehub.repository.PasswordResetTokenRepository;
import com.resumehub.repository.UserRepository;
import com.resumehub.security.CustomUserDetails;
import com.resumehub.security.JwtTokenProvider;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    @org.springframework.beans.factory.annotation.Value("${app.resend.api-key:}")
    private String resendApiKey;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider,
                       AuthenticationManager authenticationManager,
                       PasswordResetTokenRepository passwordResetTokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }


    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new BadRequestException("Email is already registered");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User saved = userRepository.save(user);
        CustomUserDetails userDetails = new CustomUserDetails(saved);
        String token = jwtTokenProvider.generateToken(userDetails);

        return new AuthResponse(token, toProfile(saved));
    }

    public AuthResponse login(LoginRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        request.getEmail().trim().toLowerCase(),
                        request.getPassword());

        authenticationManager.authenticate(authenticationToken);

        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtTokenProvider.generateToken(userDetails);

        return new AuthResponse(token, toProfile(user));
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Email address not found"));

        // Delete any existing tokens for the user
        passwordResetTokenRepository.deleteByUser(user);

        // Create new 6-digit OTP code (numeric string between 100000 and 999999)
        String otp = String.format("%06d", new java.util.Random().nextInt(900000) + 100000);
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(hashToken(otp));
        resetToken.setUser(user);
        resetToken.setExpiryDate(java.time.LocalDateTime.now().plusMinutes(15));
        passwordResetTokenRepository.save(resetToken);

        // Send OTP via email asynchronously to prevent blocking/hanging
        java.util.concurrent.CompletableFuture.runAsync(() -> sendOtpEmail(email, otp));

        // Log/print the OTP code to the console for testing
        System.out.println("=================================================");
        System.out.println("OTP CODE GENERATED FOR " + email);
        System.out.println("OTP CODE: " + otp);
        System.out.println("=================================================");
    }

    private void sendOtpEmail(String toEmail, String otp) {
        String apiKey = resendApiKey != null && !resendApiKey.trim().isEmpty() 
                ? resendApiKey 
                : System.getenv("RESEND_API_KEY");

        if (apiKey == null || apiKey.trim().isEmpty()) {
            System.err.println("Failed to send OTP email: RESEND_API_KEY is not configured.");
            return;
        }

        try {
            String jsonPayload = String.format(
                "{\"from\":\"ResumeHub <onboarding@resend.dev>\",\"to\":[\"%s\"],\"subject\":\"ResumeHub - Password Reset OTP\",\"html\":\"<h3>ResumeHub Password Reset Request</h3><p>Hello,</p><p>You requested a password reset. Your 6-digit OTP code is:</p><h2 style='color:#0f766e;'>%s</h2><p>This code will expire in 15 minutes.</p><p>If you did not request this reset, please ignore this email.</p>\"}",
                toEmail, otp
            );

            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                    .uri(java.net.URI.create("https://api.resend.com/emails"))
                    .header("Authorization", "Bearer " + apiKey.trim())
                    .header("Content-Type", "application/json")
                    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(jsonPayload, java.nio.charset.StandardCharsets.UTF_8))
                    .build();

            java.net.http.HttpResponse<String> response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                System.out.println("OTP email sent successfully via Resend API. Status: " + response.statusCode());
            } else {
                System.err.println("Failed to send OTP email via Resend. Status: " + response.statusCode() + ", Body: " + response.body());
            }
        } catch (Exception e) {
            System.err.println("Failed to send OTP email via Resend API: " + e.getMessage());
        }
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Email address not found"));

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(hashToken(request.getOtp()))
                .orElseThrow(() -> new BadRequestException("Invalid or expired OTP"));

        // Verify the token belongs to the requesting user
        if (!resetToken.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Invalid or expired OTP");
        }

        if (resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken);
            throw new BadRequestException("Invalid or expired OTP");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        // Delete the token immediately after use
        passwordResetTokenRepository.delete(resetToken);
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

    private String hashToken(String rawToken) {
        try {
            java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawToken.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("OTP hashing failed", e);
        }
    }

    @org.springframework.scheduling.annotation.Scheduled(cron = "0 0 0 * * ?") // Daily at midnight
    @Transactional
    public void purgeExpiredResetTokens() {
        passwordResetTokenRepository.deleteByExpiryDateBefore(java.time.LocalDateTime.now());
    }
}
