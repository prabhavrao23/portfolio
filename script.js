document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for the hero section
    const typingTextElement = document.getElementById('typing-text');
    const phrase = "Hi, I am Prabhav 👋"; // Updated phrase
    let i = 0;
    let delay = 100;

    function typeWriter() {
        if (i < phrase.length) {
            typingTextElement.innerHTML += phrase.charAt(i);
            i++;
            setTimeout(typeWriter, delay);
        } else {
            return; // Stop after typing the full phrase
        }
    }

    // Start typing effect when the page loads
    typeWriter();

    // Single-page navigation logic (for main sections)
    const sections = document.querySelectorAll('section[data-section]');
    const mainNavLinks = document.querySelectorAll('.side-nav a.nav-text, .hero-buttons a.button-primary');

    function showMainSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active-section');
                section.removeAttribute('hidden');
            } else {
                section.classList.remove('active-section');
                section.setAttribute('hidden', '');
            }
        });
    }

    // Add event listeners to main navigation links
    mainNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetSection = this.getAttribute('data-target-section');
            if (targetSection) {
                e.preventDefault();
                showMainSection(targetSection);
            }
        });
    });

    // Initialize: Ensure only the hero section is visible on load
    showMainSection('hero');

    // Logic for "About Me" sub-sections (accordion-like toggle, allowing multiple open)
    const aboutRowTitles = document.querySelectorAll('.about-row-title');
    // We don't query descriptions directly here, but get them from the data-target

    function toggleAboutContent(clickedTitleElement) {
        const targetId = clickedTitleElement.getAttribute('data-target');
        const targetDescription = document.getElementById(targetId);

        if (targetDescription) {
            if (targetDescription.hasAttribute('hidden')) {
                // If currently hidden, show it
                targetDescription.removeAttribute('hidden');
                clickedTitleElement.classList.add('active'); // Add active class to title
            } else {
                // If currently visible, hide it
                targetDescription.setAttribute('hidden', '');
                clickedTitleElement.classList.remove('active'); // Remove active class from title
            }
        }
    }

    // Add event listeners to About Me sub-section titles
    aboutRowTitles.forEach(title => {
        title.addEventListener('click', function() {
            toggleAboutContent(this); // Pass the clicked title element
        });
    });

    // Initial state for About Me section: Make sure only the first one is opened
    // and its title is active when the page loads or About Me is navigated to.
    // The HTML sets the first one active by default.
    const initialActiveAboutDescription = document.querySelector('.about-row-description.active-description');
    if (initialActiveAboutDescription) {
        // Ensure it's not hidden by the JS logic when About Me is first shown
        initialActiveAboutDescription.removeAttribute('hidden');
    }
});