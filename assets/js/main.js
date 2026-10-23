/**
 * Wo's Custom Tailoring - Luxury Atelier Client Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCalculator();
  initGallery();
  initBeforeAfterSlider();
  initBookingModal();
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
    if (window.scrollY > 40) {
      header?.classList.add('bg-stone-950/95', 'shadow-2xl', 'border-b', 'border-stone-800/80');
      header?.classList.remove('bg-stone-950/70');
    } else {
      header?.classList.remove('bg-stone-950/95', 'shadow-2xl', 'border-b', 'border-stone-800/80');
      header?.classList.add('bg-stone-950/70');
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
/* Interactive Alteration Price Estimator                                     */
/* -------------------------------------------------------------------------- */
const alterationCatalog = [
  { id: 'pants-hem', category: 'trousers', name: 'Pants Hemming (Standard or Cuffed)', priceMin: 40, priceMax: 60, time: '3-5 Days' },
  { id: 'pants-waist', category: 'trousers', name: 'Trousers Waist Take In / Let Out', priceMin: 60, priceMax: 80, time: '3-5 Days' },
  { id: 'pants-taper', category: 'trousers', name: 'Leg Tapering (Knee to Ankle)', priceMin: 50, priceMax: 80, time: '4-6 Days' },
  { id: 'pants-rise', category: 'trousers', name: 'Crotch & Rise Adjustment', priceMin: 70, priceMax: 110, time: '5-7 Days' },

  { id: 'jacket-sleeves', category: 'jackets', name: 'Jacket Sleeves Shorten/Lengthen', priceMin: 80, priceMax: 140, time: '5-7 Days' },
  { id: 'jacket-waist', category: 'jackets', name: 'Jacket Waist & Sides Contouring', priceMin: 180, priceMax: 220, time: '5-7 Days' },
  { id: 'jacket-collar', category: 'jackets', name: 'Collar Roll / Lowering', priceMin: 70, priceMax: 110, time: '5-7 Days' },
  { id: 'jacket-shoulders', category: 'jackets', name: 'Shoulder Point Reduction / Pad Adjust', priceMin: 190, priceMax: 280, time: '7-10 Days' },

  { id: 'bridal-hem', category: 'bridal', name: 'Wedding Gown Multi-Layer Hem', priceMin: 120, priceMax: 260, time: '2-4 Weeks' },
  { id: 'bridal-bust', category: 'bridal', name: 'Bustline Reshaping & Cup Insertion', priceMin: 90, priceMax: 180, time: '2-3 Weeks' },
  { id: 'bridal-bustle', category: 'bridal', name: 'French / American Train Bustle', priceMin: 80, priceMax: 150, time: '2-3 Weeks' },
  { id: 'bridesmaid-sides', category: 'bridal', name: 'Bridesmaid Dress Sides Take-In', priceMin: 60, priceMax: 160, time: '1-2 Weeks' },
  { id: 'bridesmaid-hem', category: 'bridal', name: 'Bridesmaid Gown Hemming', priceMin: 70, priceMax: 100, time: '1-2 Weeks' },

  { id: 'shirt-sleeves', category: 'shirts', name: 'Shirt Sleeves Shortening', priceMin: 60, priceMax: 70, time: '3-5 Days' },
  { id: 'shirt-sides', category: 'shirts', name: 'Shirt Slimming (Sides & Darts)', priceMin: 60, priceMax: 80, time: '3-5 Days' },
  { id: 'shirt-combo', category: 'shirts', name: 'Sleeves & Sides Complete Package', priceMin: 80, priceMax: 100, time: '3-5 Days' },

  { id: 'denim-hem', category: 'denim', name: 'Original Factory Hem Retention', priceMin: 40, priceMax: 55, time: '3-5 Days' },
  { id: 'denim-taper', category: 'denim', name: 'Selvedge Inseam/Outseam Slimming', priceMin: 65, priceMax: 95, time: '4-6 Days' },
  { id: 'denim-waist', category: 'denim', name: 'Jeans Center-Back Waist Take-In', priceMin: 75, priceMax: 120, time: '5-7 Days' }
];

let selectedAlterations = new Set();

function initCalculator() {
  const container = document.getElementById('calc-items-container');
  const tabs = document.querySelectorAll('.calc-tab-btn');
  const totalMinEl = document.getElementById('calc-total-min');
  const totalMaxEl = document.getElementById('calc-total-max');
  const countEl = document.getElementById('calc-count');
  const resetBtn = document.getElementById('calc-reset');
  const bookWithEstBtn = document.getElementById('calc-book-btn');

  if (!container) return;

  function renderCategory(cat) {
    const filtered = cat === 'all' 
      ? alterationCatalog 
      : alterationCatalog.filter(item => item.category === cat);

    container.innerHTML = filtered.map(item => {
      const isChecked = selectedAlterations.has(item.id);
      return `
        <label class="flex items-center justify-between p-4 rounded-xl border ${isChecked ? 'border-amber-400 bg-amber-950/20 shadow-md shadow-amber-900/10' : 'border-stone-800/80 bg-stone-900/40 hover:border-stone-700'} cursor-pointer transition-all duration-200 group">
          <div class="flex items-start gap-3">
            <input type="checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''} class="calc-checkbox mt-1 w-4 h-4 rounded border-stone-700 text-amber-500 focus:ring-amber-500/40 bg-stone-950">
            <div>
              <span class="font-medium text-stone-200 block group-hover:text-amber-300 transition-colors">${item.name}</span>
              <span class="text-xs text-stone-400">Typical Turnaround: ${item.time}</span>
            </div>
          </div>
          <div class="text-right">
            <span class="font-semibold text-amber-400 font-serif">$${item.priceMin} - $${item.priceMax}</span>
          </div>
        </label>
      `;
    }).join('');

    // Re-bind listeners
    container.querySelectorAll('.calc-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        if (e.target.checked) {
          selectedAlterations.add(id);
        } else {
          selectedAlterations.delete(id);
        }
        updateTotals();
        renderCategory(cat);
      });
    });
  }

  function updateTotals() {
    let min = 0;
    let max = 0;
    alterationCatalog.forEach(item => {
      if (selectedAlterations.has(item.id)) {
        min += item.priceMin;
        max += item.priceMax;
      }
    });

    if (totalMinEl) totalMinEl.textContent = `$${min}`;
    if (totalMaxEl) totalMaxEl.textContent = `$${max}`;
    if (countEl) countEl.textContent = selectedAlterations.size;

    if (bookWithEstBtn) {
      if (selectedAlterations.size > 0) {
        bookWithEstBtn.removeAttribute('disabled');
        bookWithEstBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      } else {
        bookWithEstBtn.setAttribute('disabled', 'true');
        bookWithEstBtn.classList.add('opacity-50', 'cursor-not-allowed');
      }
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('bg-amber-400', 'text-stone-950', 'font-semibold'));
      tabs.forEach(t => t.classList.add('bg-stone-900', 'text-stone-300'));
      tab.classList.add('bg-amber-400', 'text-stone-950', 'font-semibold');
      tab.classList.remove('bg-stone-900', 'text-stone-300');
      renderCategory(tab.getAttribute('data-cat'));
    });
  });

  resetBtn?.addEventListener('click', () => {
    selectedAlterations.clear();
    updateTotals();
    const activeTab = document.querySelector('.calc-tab-btn.bg-amber-400');
    renderCategory(activeTab?.getAttribute('data-cat') || 'all');
  });

  bookWithEstBtn?.addEventListener('click', () => {
    const modal = document.getElementById('booking-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      // Prefill note
      const noteInput = document.getElementById('booking-notes');
      if (noteInput && selectedAlterations.size > 0) {
        const names = Array.from(selectedAlterations)
          .map(id => alterationCatalog.find(x => x.id === id)?.name)
          .filter(Boolean);
        const estText = `Estimated services: ${names.join(', ')} (Est. ${totalMinEl?.textContent} - ${totalMaxEl?.textContent})`;
        noteInput.value = estText;
      }
    }
  });

  // Initial render
  renderCategory('all');
  updateTotals();
}

/* -------------------------------------------------------------------------- */
/* Gallery Filter & Lightbox                                                  */
/* -------------------------------------------------------------------------- */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('bg-amber-400', 'text-stone-950', 'font-semibold'));
      filterBtns.forEach(b => b.classList.add('bg-stone-900', 'text-stone-400'));
      btn.classList.add('bg-amber-400', 'text-stone-950', 'font-semibold');
      btn.classList.remove('bg-stone-900', 'text-stone-400');

      const filter = btn.getAttribute('data-filter');
      items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

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
/* Before / After Slider Interaction                                          */
/* -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById('ba-slider');
  if (!container) return;

  const afterDiv = container.querySelector('.ba-slider-after');
  const handle = container.querySelector('.ba-slider-handle');

  let isDragging = false;

  function setSliderPos(x) {
    const rect = container.getBoundingClientRect();
    let posX = x - rect.left;
    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;
    const percentage = (posX / rect.width) * 100;
    
    if (afterDiv) afterDiv.style.width = `${percentage}%`;
    if (handle) handle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPos(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPos(e.clientX);
  });

  // Touch support
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setSliderPos(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPos(e.touches[0].clientX);
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

    // Show button loading state
    if (submitBtn) submitBtn.setAttribute('disabled', 'true');
    if (btnText) btnText.textContent = 'Submitting Request...';
    if (spinner) spinner.classList.remove('hidden');

    setTimeout(() => {
      // Populate confirmation summary
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

      // Prepare mailto link
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
