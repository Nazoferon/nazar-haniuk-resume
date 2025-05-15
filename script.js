document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen Animation
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 800);
    }

    // Fade-in animations for sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${0.5 + index * 0.2}s`;
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-fill');
    if (skillBars.length) {
        setTimeout(() => {
            skillBars.forEach(bar => {
                const width = bar.dataset.width || bar.style.width || '100%';
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
        }, 1000);
    }

    // Set current year in footer
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const currentDate = new Date();
        const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 
                        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
        lastUpdatedElement.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }

    // Intersection Observer for scroll animations
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

// Toggle project details
function toggleProjectDetails(projectCard) {
    if (!projectCard) return;
    const isActive = projectCard.classList.contains('active');
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('active');
    });
    
    if (!isActive) {
        projectCard.classList.add('active');
    }
}

// Typing animation for subtitle
function typeWriterEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.display = 'block';
    
    let i = 0;
    const speed = 50;
    
    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
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

// Initialize typewriter effect
typeWriterEffect();