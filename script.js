document.addEventListener('DOMContentLoaded', () => {
    // Logo and welcome text logic
    const logo = document.querySelector('.logo');
    const welcomeText = document.querySelector('.welcome-text');
    const logoImage = document.querySelector('.logo-image');

    logo.addEventListener('click', () => {
        // Apply the flip class to rotate the logo
        logo.classList.add('flip');
        
        // Set a timeout to reverse the flip effect after 3 seconds
        setTimeout(() => {
            // Remove the flip class to rotate the logo back
            logo.classList.remove('flip');
            
            // Reset visibility and opacity of welcome text and logo image
            welcomeText.style.opacity = 0;
            welcomeText.style.visibility = 'hidden';

            logoImage.style.opacity = 1;
            logoImage.style.visibility = 'visible';
        }, 3000); // Adjust timing as needed

        // Set visibility and opacity of welcome text
        welcomeText.style.opacity = 1;
        welcomeText.style.visibility = 'visible';
        logoImage.style.opacity = 0;
        logoImage.style.visibility = 'hidden';
    });

    // Header shrink effect on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // Track the currently open sections
    let openSkillCategory = null;
    let openCertificate = null;
    let openProjectBox = null;
    let openAchievementBox = null; // Added for achievements

    // Function to close all sections
    const closeAllSections = () => {
        // Close skills
        if (openSkillCategory) {
            openSkillCategory.classList.remove('open');
            openSkillCategory.querySelector('.toggle-icon').textContent = '+';
            openSkillCategory.querySelector('.skills-content').style.display = 'none';
            openSkillCategory.querySelector('.skills-content').style.opacity = 0; // Hide with opacity transition
            openSkillCategory = null;
        }

        // Close certificates
        document.querySelectorAll('.certificate-box').forEach(certificate => {
            const content = certificate.querySelector('.certificate-content');
            if (content.classList.contains('certificate-flip')) {
                content.classList.remove('certificate-flip');
                certificate.querySelector('.certificate-eye').style.opacity = 1;
            }
        });
        openCertificate = null;

        // Close projects
        document.querySelectorAll('.project-box.flipped').forEach(project => {
            project.classList.remove('flipped');
        });
        openProjectBox = null;

        // Close achievements
        document.querySelectorAll('.achievement-box.flipped').forEach(achievement => {
            achievement.classList.remove('flipped');
        });
        openAchievementBox = null; // Reset opened achievement box
    };

    // Skill toggle logic
    document.querySelectorAll('.skill-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const skillCategory = button.parentElement;
            const toggleIcon = button.querySelector('.toggle-icon');

            // Check if this is already the open category
            if (openSkillCategory === skillCategory) {
                // If it is, close it
                skillCategory.classList.remove('open');
                toggleIcon.textContent = '+';
                skillCategory.querySelector('.skills-content').style.display = 'none';
                skillCategory.querySelector('.skills-content').style.opacity = 0; // Hide with opacity transition
                openSkillCategory = null;
            } else {
                // Close all other sections before toggling the skill category
                closeAllSections();

                // Toggle the clicked skill category
                skillCategory.classList.add('open');
                toggleIcon.textContent = '-';
                skillCategory.querySelector('.skills-content').style.display = 'block';
                skillCategory.querySelector('.skills-content').style.opacity = 1; // Show with opacity transition
                openSkillCategory = skillCategory;
            }
        });
    });

    // Certificates flip logic
    const certificates = document.querySelectorAll('.certificate-box');

    certificates.forEach(certificate => {
        const content = certificate.querySelector('.certificate-content');
        const eye = certificate.querySelector('.certificate-eye');
        const backEye = certificate.querySelector('.certificate-eye-back');

        // When the eye is clicked
        eye.addEventListener('click', () => {
            // Close all other sections before toggling the certificate
            closeAllSections();

            // Flip the current certificate
            content.classList.toggle('certificate-flip');

            // Set the active certificate
            openCertificate = content.classList.contains('certificate-flip') ? certificate : null;
        });

        // When the back eye is clicked
        backEye.addEventListener('click', () => {
            content.classList.remove('certificate-flip');
            openCertificate = null;
        });
    });

    // Track the currently flipped project box
    document.querySelectorAll('.eye-emoji').forEach((eye) => {
        eye.addEventListener('click', function() {
            const projectBox = this.closest('.project-box');
            
            // Close all other sections before flipping the project box
            closeAllSections();
            
            // Flip the clicked box
            projectBox.classList.add('flipped');
            
            // Set the current flipped box
            openProjectBox = projectBox;
        });
    });

    document.querySelectorAll('.back-emoji').forEach((back) => {
        back.addEventListener('click', function() {
            const projectBox = this.closest('.project-box');
            
            // Unflip the box
            projectBox.classList.remove('flipped');
            
            // Clear the current flipped box
            if (openProjectBox === projectBox) {
                openProjectBox = null;
            }
        });
    });

    // Achievements flip logic
    const achievements = document.querySelectorAll('.achievement-box');

    achievements.forEach(achievement => {
        const content = achievement.querySelector('.achievement-content');
        const eye = achievement.querySelector('.eye-emoji');
        const backEye = achievement.querySelector('.back-emoji');

        // When the eye emoji is clicked
        eye.addEventListener('click', () => {
            // Close all other sections before toggling the achievement
            closeAllSections();

            // Flip the current achievement
            achievement.classList.toggle('flipped');

            // Set the active achievement
            openAchievementBox = achievement.classList.contains('flipped') ? achievement : null;
        });

        // When the back emoji is clicked
        backEye.addEventListener('click', () => {
            achievement.classList.remove('flipped');
            openAchievementBox = null;
        });
    });

    // Resume button and modal
    const resumeButton = document.getElementById('resume-button');
    const pdfModal = document.getElementById('pdf-modal');
    const pdfClose = document.getElementById('pdf-close');

    // Open modal when Resume button is clicked
    resumeButton.addEventListener('click', () => {
        pdfModal.style.display = 'flex';
    });

    // Close modal when the close button is clicked
    pdfClose.addEventListener('click', () => {
        pdfModal.style.display = 'none';
    });

    // Close modal if clicked outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target === pdfModal) {
            pdfModal.style.display = 'none';
        }
    });

    // Function to highlight the active section
    const highlightActiveSection = () => {
        const sections = document.querySelectorAll('.section');
        let currentSection = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section;
            }
        });

        sections.forEach(section => section.classList.remove('active'));
        if (currentSection) {
            currentSection.classList.add('active');
        }
    };

    // Initial highlight
    highlightActiveSection();

    // Highlight active section on scroll
    window.addEventListener('scroll', highlightActiveSection);

    window.addEventListener('scroll', function() {
        const bars = document.querySelectorAll('.bar-fill');
        const windowHeight = window.innerHeight;
    
        bars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const barBottom = bar.getBoundingClientRect().bottom;
    
            if (barPosition < windowHeight && barBottom > 0) {
                const width = bar.getAttribute('data-width');
                if (width) {
                    bar.style.width = width;
                }
            } else {
                bar.style.width = '0';
            }
        });
    });
    
});
