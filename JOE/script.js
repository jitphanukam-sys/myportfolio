/* ══════════════════════════════════════════════
   NAVBAR — scroll effect
══════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ══════════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════════ */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
}

/* ══════════════════════════════════════════════
   INTERSECTION OBSERVER — reveal animations
══════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Skill bars
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        setTimeout(() => fill.classList.add('animated'), 200);
      });

      // Pro skill rings
      const rings = entry.target.querySelectorAll('.pro-skill-ring');
      rings.forEach((ring, i) => {
        setTimeout(() => ring.classList.add('animated'), 200 + i * 100);
      });

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Also observe skill cards specifically for bar animations
document.querySelectorAll('.skill-card').forEach(card => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach((fill, i) => {
          setTimeout(() => fill.classList.add('animated'), 300 + i * 80);
        });
        const rings = entry.target.querySelectorAll('.pro-skill-ring');
        rings.forEach((ring, i) => {
          setTimeout(() => ring.classList.add('animated'), 300 + i * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(card);
});

/* ══════════════════════════════════════════════
   VIDEO MODAL
══════════════════════════════════════════════ */
const videoModal = document.getElementById('video-modal');
const videoIframe = document.getElementById('video-iframe');
const modalTitle = document.getElementById('modal-title');

function openVideo(src, title) {
  videoIframe.src = src;
  modalTitle.textContent = title;
  videoModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  videoIframe.src = '';
  videoModal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideo();
});

/* ══════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════ */
async function handleFormSubmit(event) {
  event.preventDefault(); // หยุดการรีเฟรชหน้าเว็บ
  const form = event.target; // อ้างอิงฟอร์มที่กดส่ง
  const success = document.getElementById('form-success');
  const formData = new FormData(form);

  try {
    // ส่งข้อมูลไปที่ Formspree ของคุณ
    const response = await fetch("https://formspree.io/f/mykaoyyg", {
      method: "POST",
      body: formData,
      headers: { 
        "Accept": "application/json" }
    });

    if (response.ok) {
      // ถ้าส่งสำเร็จ: ทำตาม Logic เดิมของคุณ (ซ่อนฟอร์ม โชว์ข้อความขอบคุณ)
      form.style.opacity = '0';
      form.style.transition = 'opacity 0.3s';
      
      setTimeout(() => {
        form.classList.add('hidden');
        success.classList.remove('hidden');
        success.style.opacity = '0';
        success.style.transition = 'opacity 0.4s';
        setTimeout(() => { success.style.opacity = '1'; }, 50);
      }, 300);
    } else {
      alert("เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง");
    }
  } catch (error) {
    alert("ไม่สามารถเชื่อมต่อกับระบบได้ โปรดตรวจสอบอินเทอร์เน็ต");
  }
}

/* ══════════════════════════════════════════════
   SMOOTH ACTIVE NAV LINK HIGHLIGHT
══════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--amber, #E8A830)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));

/* ══════════════════════════════════════════════
   PROJECT SLIDER (LEFT/RIGHT ARROWS)
══════════════════════════════════════════════ */
function scrollSlider(direction) {
  const slider = document.getElementById('graphic-slider');
  // คำนวณระยะการเลื่อน (เลื่อนทีละ 1 การ์ด)
  const scrollAmount = window.innerWidth > 768 ? slider.clientWidth / 3 : slider.clientWidth * 0.85; 
  
  if (direction === 'left') {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

// ตรวจสอบว่าโค้ดส่วนนี้มีอยู่ใน script.js หรือยัง
const dropdownBtn = document.getElementById('portfolio-dropdown-btn');
const dropdownMenu = document.getElementById('portfolio-dropdown');

if (dropdownBtn) {
  dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('opacity-0');
    dropdownMenu.classList.toggle('invisible');
    dropdownMenu.classList.toggle('translate-y-2');
  });
}

document.addEventListener('click', () => {
  if (dropdownMenu && !dropdownMenu.classList.contains('opacity-0')) {
    dropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
  }
});