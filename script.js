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
  const mobileQuery = window.matchMedia('(max-width: 760px)');

  const stopVideo = () => {
    heroVideo.pause();
    heroVideo.removeAttribute('src');
    heroVideo.load();
  };

  const loadDesktopVideo = () => {
    const src = heroVideo.dataset.desktopSrc;
    const poster = heroVideo.dataset.desktopPoster;
    if (poster) heroVideo.setAttribute('poster', poster);
    if (!src || heroVideo.getAttribute('src') === src) return;
    heroVideo.setAttribute('src', src);
    heroVideo.load();
    const playPromise = heroVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
  };

  const applyHeroMedia = () => {
    // Mobile intentionally uses the static poster only. This prevents native
    // mobile play UI and keeps the first render lightweight.
    if (mobileQuery.matches) stopVideo();
    else loadDesktopVideo();
  };

  applyHeroMedia();
  mobileQuery.addEventListener('change', applyHeroMedia);
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


// AXIO conversion tracking hooks for Google Tag Manager / GA4.
window.dataLayer = window.dataLayer || [];
function axioTrack(eventName, params = {}) {
  window.dataLayer.push({ event: eventName, ...params });
}

document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href') || '';
  if (href.startsWith('tel:')) {
    axioTrack('click_phone', { link_url: href, page_path: location.pathname });
  } else if (href.startsWith('mailto:')) {
    axioTrack('click_email', { link_url: href, page_path: location.pathname });
  }

  if (href.includes('#estimate')) {
    axioTrack('estimate_click', {
      link_url: href,
      page_path: location.pathname,
      link_text: (link.textContent || '').trim()
    });
  }

  if (link.classList.contains('js-service-cta')) {
    axioTrack('service_quote_click', {
      service: link.dataset.service || 'Unknown',
      page_path: location.pathname
    });
  }
});

document.querySelectorAll('form[data-form-type]').forEach(form => {
  form.addEventListener('submit', () => {
    axioTrack('form_submit_attempt', {
      form_type: form.dataset.formType || 'unknown',
      page_path: location.pathname
    });
  });
});

if (document.body && document.body.dataset.leadPage === 'true') {
  let formType = 'unknown';
  try {
    const ref = document.referrer || '';
    if (ref.includes('/pricing.html')) formType = 'free_estimate';
    if (ref.includes('/contact.html')) formType = 'contact';
  } catch (_) {}
  axioTrack('generate_lead', { form_type: formType, page_path: location.pathname });
}
