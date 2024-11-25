console.log('Content script loaded');

// Function to create the overlay
function createOverlay() {
    console.log('Creating overlay');
    const overlay = document.createElement('div');
    overlay.className = 'elden-ring-overlay';

    const text = document.createElement('div');
    text.className = 'overlay-text';
    text.textContent = 'SITE VISITED';

    overlay.appendChild(text);
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 2000);
    }, 3000);
}

// Function to check and trigger the overlay
function checkAndTriggerOverlay() {
    const currentUrl = window.location.hostname;
    console.log('Checking site:', currentUrl);

    browser.runtime.sendMessage({
        type: 'checkSite',
        url: currentUrl
    }).then(response => {
        console.log('Response received:', response);
        if (!response.isVisited) {
            createOverlay();
        }
    }).catch(error => {
        console.error('Error sending message:', error);
    });
}

// Ensure overlay logic runs after full page load
window.addEventListener('load', () => {
    console.log('Page fully loaded, checking site.');
    checkAndTriggerOverlay();
});

// Handle SPAs or dynamic content changes
const observer = new MutationObserver(() => {
    console.log('DOM mutation detected, re-checking site.');
    checkAndTriggerOverlay();
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });
