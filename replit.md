# Mysterious Vault Photo Upload Application

## Overview

This is a Flask-based web application that creates an immersive "escape room" or mystery-themed photo upload experience. Users must enter a secret code to access a vault, then upload a photo as "evidence" to complete the challenge and receive a celebratory gift voucher.

## System Architecture

### Frontend Architecture
- **Template Engine**: Jinja2 templates with Flask
- **CSS Framework**: Bootstrap 5 for responsive design
- **UI Themes**: Two distinct visual themes:
  - Mysterious theme (dark, vault-like aesthetic with gold accents)
  - Celebratory theme (bright, congratulatory design with confetti effects)
- **Icons**: Feather Icons for consistent iconography
- **JavaScript**: Vanilla JS for animations and upload functionality

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Session Management**: Flask sessions with secret key
- **File Handling**: Werkzeug for secure file uploads
- **Security**: ProxyFix middleware for proper header handling in production

### Application Flow
1. **Landing Page**: Mystery-themed login with password prompt
2. **Authentication**: Simple password check (MVP implementation)
3. **Upload Page**: Camera/file upload interface
4. **Processing**: File validation and storage
5. **Results Page**: Celebratory completion with gift voucher

## Key Components

### Route Structure (`routes.py`)
- `/` - Landing page with login form
- `/login` - POST endpoint for authentication
- `/upload` - Photo upload interface (requires login)
- `/upload_photo` - POST endpoint for file processing

### Template System
- `base_mysterious.html` - Dark, vault-themed base template
- `base_celebratory.html` - Bright, celebration-themed base template
- `login.html` - Password entry interface
- `upload.html` - Photo capture/upload interface
- `result.html` - Success page with gift voucher

### Static Assets
- `mysterious.css` - Dark theme with gold accents and shadows
- `celebratory.css` - Bright theme with gradients and animations
- `animations.js` - Page transitions and interactive effects
- `upload.js` - File upload handling and validation

### Security Features
- Session-based authentication
- File type validation (images only)
- File size limits (16MB maximum)
- Secure filename handling
- CSRF protection through Flask sessions

## Data Flow

1. **User Authentication**: 
   - User enters password on landing page
   - Server validates and creates session
   - Session ID generated for tracking

2. **Photo Upload Process**:
   - User selects/captures photo
   - Client-side validation (file type, size)
   - AJAX upload to server
   - Server processes and stores file
   - Success response triggers celebration page

3. **Session Management**:
   - Login status stored in Flask session
   - User ID generated for session tracking
   - Session required for upload access

## External Dependencies

### Python Packages
- **Flask 3.1.1**: Web framework
- **Flask-SQLAlchemy 3.1.1**: Database ORM (prepared for future use)
- **Gunicorn 23.0.0**: WSGI server for production
- **psycopg2-binary 2.9.10**: PostgreSQL adapter (prepared for future use)
- **email-validator 2.2.0**: Email validation utilities

### Frontend Dependencies (CDN)
- **Bootstrap 5.3.0**: CSS framework
- **Feather Icons**: Icon library

### File System Dependencies
- `uploads/` directory for storing user photos
- Static file serving for CSS/JS assets

## Deployment Strategy

### Production Configuration
- **WSGI Server**: Gunicorn with autoscale deployment
- **Port Binding**: 0.0.0.0:5000 for container compatibility
- **Process Management**: Reuse-port and reload options for development
- **Environment**: Nix-based with Python 3.11, OpenSSL, and PostgreSQL

### Development Setup
- Local Flask development server
- Hot reload enabled
- Debug mode for development
- Proxy fix for header handling

### File Upload Handling
- Uploads stored in local `uploads/` directory
- 16MB file size limit
- Allowed formats: PNG, JPG, JPEG, GIF, WebP
- Secure filename generation

## Future Enhancements Ready

The application is structured to easily accommodate:
- Database integration (PostgreSQL ready via psycopg2)
- User management and registration
- Photo analysis and processing
- Email notifications (email-validator included)
- More sophisticated authentication
- Photo gallery and management features

## Changelog
- June 21, 2025. Initial setup
- June 21, 2025. Complete German translation implemented

## User Preferences

Preferred communication style: Simple, everyday language.
Language preference: German interface and content.