
// Mobile Menu
let navLinks = document.getElementById('navLinks');

function showMenu() {
  navLinks.style.right = "0";
}

function hideMenu() {
  navLinks.style.right = "-200px";
}

// Testimonial Slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("testimonial");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Calculate the position for the slider
  const slider = document.querySelector('.testimonials-slider');
  const slideWidth = slides[0].offsetWidth;
  slider.style.transform = `translateX(-${(slideIndex - 1) * slideWidth}px)`;

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Auto-rotate testimonials
setInterval(() => {
  plusSlides(1);
}, 5000);

// FAQ Accordion
function toggleFAQ(element) {
  const faq = element.parentElement;
  faq.classList.toggle('active');
}

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        hideMenu();
      }
      
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Animation on Scroll
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
  const reveals = document.querySelectorAll('section');
  
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

// Call on initial load
revealOnScroll();

// Add active class to section in viewport for nav highlighting
window.addEventListener('scroll', highlightNav);

function highlightNav() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}
