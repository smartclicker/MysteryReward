// Upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('upload-form');
    const uploadSection = document.getElementById('upload-section');
    const loadingSection = document.getElementById('loading-section');
    const photoInput = document.getElementById('photo');
    const uploadBtn = document.getElementById('upload-btn');

    // Handle form submission
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const file = photoInput.files[0];
        if (!file) {
            showError('Bitte wählen Sie ein Foto zum Hochladen aus.');
            return;
        }
        
        // Validate file type
        if (!isValidImageType(file)) {
            showError('Bitte laden Sie eine gültige Bilddatei hoch (PNG, JPG, JPEG, GIF oder WebP).');
            return;
        }
        
        // Validate file size (16MB max)
        if (file.size > 16 * 1024 * 1024) {
            showError('Datei zu groß. Bitte laden Sie ein Bild kleiner als 16MB hoch.');
            return;
        }
        
        uploadPhoto(file);
    });

    // Handle file input change for mobile camera
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Update button text to show file selected
            uploadBtn.innerHTML = '<i data-feather="check" class="me-2"></i>FOTO AUSGEWÄHLT - EINREICHEN';
            feather.replace();
        }
    });

    function uploadPhoto(file) {
        // Show loading state
        uploadSection.style.display = 'none';
        loadingSection.style.display = 'block';
        
        // Create FormData
        const formData = new FormData();
        formData.append('photo', file);
        
        // Upload the photo
        fetch('/upload_photo', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                return response.text().then(text => {
                    let errorData;
                    try {
                        errorData = JSON.parse(text);
                    } catch (e) {
                        errorData = { error: text };
                    }
                    return Promise.reject(errorData);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Success - add dramatic pause then redirect
                setTimeout(() => {
                    window.location.href = '/result';
                }, 2000); // 2 second delay for dramatic effect
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        })
        .catch(error => {
            console.error('Upload error:', error);
            const errorMessage = error.error || error.message || 'Foto-Upload fehlgeschlagen. Bitte versuchen Sie es erneut.';
            showError(errorMessage);
            
            // Reset to upload form
            uploadSection.style.display = 'block';
            loadingSection.style.display = 'none';
            resetUploadButton();
        });
    }

    function isValidImageType(file) {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
        return validTypes.includes(file.type.toLowerCase());
    }

    function showError(message) {
        // Create and show error alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert at top of form
        uploadForm.parentNode.insertBefore(alertDiv, uploadForm);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    function resetUploadButton() {
        uploadBtn.innerHTML = '<i data-feather="upload" class="me-2"></i>BEWEIS EINREICHEN';
        feather.replace();
    }

    // Enhanced mobile support
    if ('serviceWorker' in navigator) {
        // Register service worker for better mobile experience
        navigator.serviceWorker.register('/static/sw.js').catch(() => {
            // Ignore service worker registration errors
        });
    }

    // Add drag and drop support for desktop
    const uploadArea = uploadForm;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        uploadArea.classList.add('drag-highlight');
    }

    function unhighlight() {
        uploadArea.classList.remove('drag-highlight');
    }

    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            photoInput.files = files;
            photoInput.dispatchEvent(new Event('change'));
        }
    }
});

// Add CSS for drag and drop
const style = document.createElement('style');
style.textContent = `
    .drag-highlight {
        border: 2px dashed var(--mysterious-gold) !important;
        background: rgba(212, 175, 55, 0.1) !important;
    }
`;
document.head.appendChild(style);
