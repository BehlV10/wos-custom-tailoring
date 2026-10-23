/**
 * Wo's Custom Tailoring - Luxury Atelier Client Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initGallery();
  initBookingModal();
  initPricingToggle();
});

/* -------------------------------------------------------------------------- */
/* Navbar & Mobile Navigation                                                 */
/* -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-drawer-close');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('bg-stone-950/95', 'shadow-2xl', 'border-b', 'border-stone-800/80');
      header?.classList.remove('bg-stone-950/80');
    } else {
      header?.classList.remove('bg-stone-950/95', 'shadow-2xl', 'border-b', 'border-stone-800/80');
      header?.classList.add('bg-stone-950/80');
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.remove('translate-x-full');
      document.body.classList.add('overflow-hidden');
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => {
      mobileDrawer.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // Close drawer on link click
  const drawerLinks = mobileDrawer?.querySelectorAll('a');
  drawerLinks?.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Compact Pricing Tab / Accordion Switcher                                   */
/* -------------------------------------------------------------------------- */
function initPricingToggle() {
  const priceTabs = document.querySelectorAll('.price-tab-btn');
  const pricePanels = document.querySelectorAll('.price-panel');

  priceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      priceTabs.forEach(t => {
        t.classList.remove('bg-amber-400', 'text-stone-950', 'font-semibold');
        t.classList.add('bg-stone-900', 'text-stone-400');
      });
      tab.classList.add('bg-amber-400', 'text-stone-950', 'font-semibold');
      tab.classList.remove('bg-stone-900', 'text-stone-400');

      pricePanels.forEach(panel => {
        if (panel.id === `price-${target}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Gallery Filter & Lightbox (Defaults to Custom Suits!)                      */
/* -------------------------------------------------------------------------- */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  function applyFilter(filter) {
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === filter) {
        b.classList.add('bg-amber-400', 'text-stone-950', 'font-semibold');
        b.classList.remove('bg-stone-900', 'text-stone-400');
      } else {
        b.classList.remove('bg-amber-400', 'text-stone-950', 'font-semibold');
        b.classList.add('bg-stone-900', 'text-stone-400');
      }
    });

    items.forEach(item => {
      if (item.getAttribute('data-category') === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  // Default to Custom Suits immediately!
  applyFilter('suits');

  // Lightbox click
  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || 'Master Tailoring Archive';
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxTitle) lightboxTitle.textContent = title;
        lightbox.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  lightboxClose?.addEventListener('click', () => {
    lightbox?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Consultation & Fitting Booking Modal                                       */
/* -------------------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const openBtns = document.querySelectorAll('.open-booking-modal');
  const closeBtn = document.getElementById('booking-modal-close');
  const form = document.getElementById('booking-form');
  const successState = document.getElementById('booking-success-state');
  const submitBtn = document.getElementById('booking-submit-btn');
  const btnText = document.getElementById('booking-btn-text');
  const spinner = document.getElementById('booking-spinner');
  const detailsContainer = document.getElementById('booking-confirmation-details');
  const emailAtelierBtn = document.getElementById('booking-email-atelier-btn');
  const doneBtn = document.getElementById('booking-done-btn');

  // Set default date to tomorrow if empty
  const dateInput = document.getElementById('booking-date');
  if (dateInput && !dateInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  function resetModal() {
    form?.reset();
    form?.classList.remove('hidden');
    successState?.classList.add('hidden');
    if (submitBtn) submitBtn.removeAttribute('disabled');
    if (btnText) btnText.textContent = 'Confirm Consultation Request';
    if (spinner) spinner.classList.add('hidden');
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resetModal();
      const service = btn.getAttribute('data-service');
      const serviceSelect = document.getElementById('booking-service');
      if (serviceSelect && service) {
        serviceSelect.value = service;
      }
      modal?.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    resetModal();
  });

  doneBtn?.addEventListener('click', () => {
    modal?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    resetModal();
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      resetModal();
    }
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('booking-name')?.value.trim();
    const phone = document.getElementById('booking-phone')?.value.trim();
    const service = document.getElementById('booking-service')?.value || 'Bespoke Consultation';
    const date = document.getElementById('booking-date')?.value || 'Next Available Date';
    const time = document.getElementById('booking-time')?.value || 'Morning';
    const notes = document.getElementById('booking-notes')?.value.trim() || 'Standard fitting request';

    if (!name || !phone) {
      alert('Please provide your name and phone number so Master Wo can confirm your appointment.');
      return;
    }

    if (submitBtn) submitBtn.setAttribute('disabled', 'true');
    if (btnText) btnText.textContent = 'Submitting Request...';
    if (spinner) spinner.classList.remove('hidden');

    setTimeout(() => {
      if (detailsContainer) {
        detailsContainer.innerHTML = `
          <div class="border-b border-stone-800 pb-2 mb-2">
            <span class="text-amber-400 font-cinzel font-bold text-xs uppercase block">${service}</span>
            <span class="text-stone-200 font-semibold">${name}</span> &bull; <span class="text-stone-400">${phone}</span>
          </div>
          <div><span class="text-stone-400">Requested Time:</span> <span class="text-stone-200 font-medium">${date} (${time})</span></div>
          <div><span class="text-stone-400">Atelier:</span> <span class="text-stone-200">1018 Lexington Ave, 2nd Floor, NYC</span></div>
          ${notes ? `<div class="mt-1 pt-1 border-t border-stone-800/60 text-stone-400 italic">"${notes}"</div>` : ''}
        `;
      }

      if (emailAtelierBtn) {
        const subject = encodeURIComponent(`Consultation Request: ${service} - ${name}`);
        const body = encodeURIComponent(
          `Hello Wo's Custom Tailoring,\n\nI would like to schedule a consultation for:\nService: ${service}\nName: ${name}\nPhone: ${phone}\nPreferred Date: ${date} (${time})\n\nNotes:\n${notes}\n\nPlease confirm my appointment.\nThank you!`
        );
        emailAtelierBtn.href = `mailto:wostailoring@gmail.com?subject=${subject}&body=${body}`;
      }

      if (form && successState) {
        form.classList.add('hidden');
        successState.classList.remove('hidden');
      }
    }, 450);
  });
}
