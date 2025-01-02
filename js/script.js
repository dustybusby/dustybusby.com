let currentImageIndex = 0;
let isFullscreen = false;
let fullscreenData = null;

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
            closeButton.onclick = () => toggleFullScreen(image);
            body.appendChild(closeButton);
        }
    }
}

// Initialize lightbox
updateActiveImage();

// Flyout Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav').classList.toggle('active');
    document.querySelector('.menu-toggle').classList.toggle('active');
    document.querySelector('.content')?.classList.toggle('active');
});