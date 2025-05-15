// Loading Screen Animation
document.addEventListener('DOMContentLoaded', () => {
    // Set delays for fade-in animations
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${0.5 + (index * 0.2)}s`;
    });
    
    // Animate skill bars after page load
    setTimeout(() => {
        const skillBars = document.querySelectorAll('.skill-fill');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }, 1000);
    
    // Hide loading screen after everything is loaded
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 800);
    
    // Set current year in footer
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const currentDate = new Date();
        const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 
                        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
        lastUpdatedElement.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
    
    // Add observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Function to toggle project details
function toggleProjectDetails(projectCard) {
    const isActive = projectCard.classList.contains('active');
    
    // Close all other project cards
    const allCards = document.querySelectorAll('.project-card');
    allCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Toggle current card
    if (!isActive) {
        projectCard.classList.add('active');
    }
}

// Typing animation for subtitle (optional effect)
function typeWriterEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.display = 'block';
    
    let i = 0;
    const speed = 50; // milliseconds
    
    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// Profile photo hover effect
const profilePhoto = document.querySelector('.profile-photo');
if (profilePhoto) {
    profilePhoto.addEventListener('mouseover', () => {
        profilePhoto.style.transform = 'scale(1.05)';
    });
    
    profilePhoto.addEventListener('mouseout', () => {
        profilePhoto.style.transform = 'scale(1)';
    });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

// Dark/Light Mode Toggle (Uncomment if you want to add this feature)
/*
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

// Check user preference on load
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode === 'true' || 
        (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
    }
});
*/