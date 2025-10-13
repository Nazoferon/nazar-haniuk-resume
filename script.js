document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing scripts');
  
  // Loading Screen
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
      console.log('Hiding loading screen');
      setTimeout(() => {
          loadingScreen.style.opacity = '0';
          setTimeout(() => {
              loadingScreen.style.display = 'none';
              console.log('Loading screen hidden');
          }, 500);
      }, 800);
  } else {
      console.warn('Loading screen not found');
  }

  // Fade-in animations for sections
  const sections = document.querySelectorAll('.section');
  console.log(`Found ${sections.length} sections`);
  sections.forEach((section, index) => {
      section.style.animationDelay = `${0.5 + index * 0.2}s`;
  });

  // Animate skill bars
  const skillBars = document.querySelectorAll('.skill-fill');
  console.log(`Found ${skillBars.length} skill bars`);
  if (skillBars.length) {
      setTimeout(() => {
          skillBars.forEach(bar => {
              const width = bar.dataset.width || '100%';
              bar.style.width = '0';
              setTimeout(() => {
                  bar.style.width = width;
                  console.log(`Animated skill bar to ${width}`);
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
      console.log('Updated footer date');
  }

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              console.log(`Fade-in triggered for section: ${entry.target.tagName}`);
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });

  sections.forEach(section => {
      observer.observe(section);
  });

  // Print button
  const printBtn = document.getElementById('print-resume');
  if (printBtn) {
      printBtn.addEventListener('click', () => {
          console.log('Print button clicked');
          window.print();
      });
  } else {
      console.warn('Print button not found');
  }

  // Project card click handler
  const projectCards = document.querySelectorAll('.project-card');
  console.log(`Found ${projectCards.length} project cards`);
  projectCards.forEach(card => {
      card.addEventListener('click', () => {
          toggleProjectDetails(card);
      });
  });

  // Smooth scrolling для всіх посилань
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  // TypeWriter effect for subtitle
  typeWriterEffect();
});

function toggleProjectDetails(projectCard) {
  if (!projectCard) return;
    const isActive = projectCard.classList.contains('active');
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('active');
  });
  if (!isActive) {
      projectCard.classList.add('active');
      console.log('Toggled project card');
  }
}

function typeWriterEffect() {
  const subtitle = document.querySelector('.subtitle');
  if (!subtitle) {
    console.warn('Subtitle not found');
    return;
  }
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
  console.log('Started typewriter effect');
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
    console.log('Profile photo hover effect initialized');
}