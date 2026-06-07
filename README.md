# ResumeHub

Build job-ready resumes with premium templates, live editing, and one-click PDF export.

ResumeHub is a modern full-stack resume builder that enables users to create, manage, and export professional resumes using premium templates, real-time editing, cloud storage, and secure authentication.

## Features

- 21 Professional Resume Templates
- Live Resume Builder & Preview
- PDF Export
- JWT Authentication
- User Dashboard
- Cloud Resume Storage
- Profile Management
- Responsive Design

## Tech Stack

Frontend: HTML, CSS, JavaScript  
Backend: Spring Boot, Spring Security, JWT  
Database: MySQL  
Build Tool: Maven

## Project Structure

resumehub/
├── backend/                 Spring Boot 3 API (Java 21)
├── assets/                  Images and icons
├── css/                     Stylesheets
├── js/
│   ├── api.js               Backend API client + auth session
│   ├── template-renderer.js Builder logic + cloud sync
│   ├── pdf.js               PDF export
│   └── main.js              Landing/template page behavior
├── pages/
│   ├── builder.html         Resume studio
│   ├── dashboard.html       Saved resumes
│   ├── login.html           Login
│   ├── profile.html         Profile management
│   └── register.html        Registration
├── templates/               21 resume templates
└── index.html               Landing page


## Author

Raza Dambal

GitHub: https://github.com/Raza084
