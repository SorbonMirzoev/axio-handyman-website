const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  const applyHeroSource = () => {
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const src = mobile ? heroVideo.dataset.mobileSrc : heroVideo.dataset.desktopSrc;
    const poster = mobile ? heroVideo.dataset.mobilePoster : heroVideo.dataset.desktopPoster;
    if (heroVideo.getAttribute('src') !== src) {
      heroVideo.pause();
      heroVideo.setAttribute('poster', poster || '');
      heroVideo.setAttribute('src', src);
      heroVideo.load();
      const playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
    }
  };
  applyHeroSource();
  window.addEventListener('resize', applyHeroSource);
}

const photoInput = document.getElementById('photos');
const uploadSelected = document.getElementById('uploadSelected');
if (photoInput && uploadSelected) {
  photoInput.addEventListener('change', () => {
    const files = Array.from(photoInput.files || []);
    if (!files.length) {
      uploadSelected.textContent = 'No files selected yet.';
      return;
    }
    const visible = files.slice(0, 3).map(file => file.name);
    const suffix = files.length > 3 ? ` (+${files.length - 3} more selected)` : '';
    uploadSelected.textContent = visible.join(' • ') + suffix;
  });
}

const serviceButtons = document.querySelectorAll('.js-service-cta');
const serviceSelect = document.getElementById('service');
const detailsField = document.getElementById('details');
const estimateSection = document.getElementById('estimate');

function openEstimateForService(serviceName) {
  if (serviceSelect && serviceName) {
    const option = Array.from(serviceSelect.options).find(opt => opt.text.trim() === serviceName.trim());
    if (option) serviceSelect.value = option.value;
  }

  // Keep Project Description empty. If the previous site version inserted its old
  // automatic text, clear only that generated text and never erase customer input.
  if (detailsField && (detailsField.value || '').trim().startsWith('[AXIO AUTO]')) {
    detailsField.value = '';
  }

  if (estimateSection) {
    estimateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Put the cursor in the description so the customer can immediately type.
  if (detailsField) setTimeout(() => detailsField.focus({ preventScroll: true }), 450);
}

serviceButtons.forEach(btn => {
  btn.addEventListener('click', event => {
    event.preventDefault();
    openEstimateForService(btn.dataset.service || '');
  });
});
