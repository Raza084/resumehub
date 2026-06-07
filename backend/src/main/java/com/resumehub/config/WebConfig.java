package com.resumehub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/login").setViewName("forward:/pages/login.html");
        registry.addViewController("/register").setViewName("forward:/pages/register.html");
        registry.addViewController("/dashboard").setViewName("forward:/pages/dashboard.html");
        registry.addViewController("/builder").setViewName("forward:/pages/builder.html");
        registry.addViewController("/profile").setViewName("forward:/pages/profile.html");
        registry.addViewController("/templates").setViewName("forward:/pages/templates.html");
        registry.addViewController("/forgot-password").setViewName("forward:/pages/forgot-password.html");
        registry.addViewController("/reset-password").setViewName("forward:/pages/reset-password.html");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins.split(","))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
