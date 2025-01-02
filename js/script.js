let currentImageIndex = 0;
let isFullscreen = false;
let fullscreenData = null;

// Add menu toggle initialization at the start
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
});

function updateActiveImage() {
    const images = document.querySelectorAll('.image-container img');
    const description = document.getElementById('image-description');
    const textContents = document.querySelectorAll('.text-content');

    images.forEach((img, index) => {
        img.classList.toggle('active', index === currentImageIndex);
    });

    textContents.forEach((text, index) => {
        text.classList.toggle('active', index === currentImageIndex);
    });

    if (images[currentImageIndex]) {
        description.textContent = images[currentImageIndex].getAttribute('data-description');
    }
}

function prevImage() {
    if (isFullscreen) return;
    
    const images = document.querySelectorAll('.image-container img');
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateActiveImage();
}

function nextImage() {
    if (isFullscreen) return;
    
    const images = document.querySelectorAll('.image-container img');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateActiveImage();
}

function toggleFullScreen(image) {
    const body = document.body;
    const lightbox = document.querySelector('.lightbox');
    let closeButton = document.querySelector('.fullscreen-close');

    if (isFullscreen) {
        // Exit fullscreen
        isFullscreen = false;
        image.classList.remove('fullscreen-img');
        closeButton?.remove();
        body.style.overflow = '';

        // Restore image to its original position
        if (fullscreenData) {
            const container = lightbox.querySelector('.image-container');
            if (fullscreenData.nextSibling) {
                container.insertBefore(image, fullscreenData.nextSibling);
            } else {
                container.appendChild(image);
            }
            currentImageIndex = fullscreenData.position;
            fullscreenData = null;
        }

        updateActiveImage();
    } else {
        // Enter fullscreen
        isFullscreen = true;
        
        // Store position information
        const container = lightbox.querySelector('.image-container');
        const images = Array.from(container.querySelectorAll('img'));
        fullscreenData = {
            image: image,
            position: images.indexOf(image),
            nextSibling: image.nextElementSibling
        };
        
        // Move image to fullscreen
        image.classList.add('fullscreen-img');
        body.style.overflow = 'hidden';
        body.appendChild(image);

        if (!closeButton) {
            closeButton = document.createElement('button');
            closeButton.className = 'fullscreen-close';
            closeButton.textContent = 'X';
            closeButton.setAttribute('aria-label', 'Close fullscreen view');
            closeButton.tabIndex = 0;
            body.appendChild(closeButton);
            
            // Use addEventListener instead of onclick
            closeButton.addEventListener('click', () => toggleFullScreen(image));
            closeButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    toggleFullScreen(image);
                    e.preventDefault();
                }
            });
        }
    }
}

// Initialize lightbox
document.addEventListener('DOMContentLoaded', function() {
    // Only run if we're on the page with the lightbox
    if (document.querySelector('.lightbox')) {
        updateActiveImage();

        // Add event listeners for arrows
        document.querySelector('.arrow.left').addEventListener('click', prevImage);
        document.querySelector('.arrow.right').addEventListener('click', nextImage);

        // Add keyboard support for arrows
        document.querySelector('.arrow.left').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                prevImage();
                e.preventDefault();
            }
        });

        document.querySelector('.arrow.right').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                nextImage();
                e.preventDefault();
            }
        });

        // Add fullscreen click handlers
        document.querySelectorAll('.image-container img').forEach(img => {
            img.addEventListener('click', () => toggleFullScreen(img));
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    toggleFullScreen(img);
                    e.preventDefault();
                }
            });
        });
    }
});