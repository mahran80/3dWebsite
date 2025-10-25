/* ===========================================
   script.js (clean) — only scroll / iframe wiring
   - Franco-Arab comments before each block
   - inline comments  (   DOM/iframe )
   =========================================== */

/* Role: Top-level description — file purpose and high-level responsibilities.
   This script wires initial user interactions (scroll/click/keyboard) to reveal
   the hero video container, routes navigation signals into the embedded iframe,
   and initializes viewport-driven entrance animations for multiple page sections.
   It intentionally keeps behavior scoped and unobtrusive.
*/

/* [BLOCK]   references
  :         iframe.
*/
const container = document.getElementById('videoContainer');       //
const heroInitial = document.getElementById('heroInitial');       // scroll
const scrollInstruction = document.getElementById('scrollInstruction'); // /  click   scroll
const scrollArrow = document.getElementById('scrollArrow');       //      iframe
const iframe = document.getElementById('videoFrame');             // reference  iframe (  null   )

/* Role: Interaction state — ensures first-interaction logic runs only once.
   hasScrolledOnce prevents repeated reveal animations and redundant event removals.
*/
/* [BLOCK]    (hasScrolledOnce)
   :        .
*/
let hasScrolledOnce = false; //  true   scroll/tap/click

/* Role: Primary handler for the user's first scroll/tap/click.
   Responsibilities:
     - mark the first interaction as handled
     - hide the initial hero overlay
     - reveal the video container after a small delay for smoother UX
     - remove one-time listeners to avoid duplicate executions
*/
/* [BLOCK] handleFirstScroll()
   :     scroll/ touch/ click  instruction:
          -  heroInitial
          -  container  delay 
          -   listeners   first interaction
*/
function handleFirstScroll() {
  if (hasScrolledOnce) return;          //       
  hasScrolledOnce = true;               //   

  if (heroInitial) heroInitial.classList.add('hide'); //    ( )

  //    500ms ( transition/UX )
  if (container) {
    setTimeout(() => {
      container.classList.add('show');
    }, 500);
  }

  //   listeners    
  window.removeEventListener('wheel', handleFirstScroll);
  window.removeEventListener('touchstart', handleFirstScroll);
  if (scrollInstruction) scrollInstruction.removeEventListener('click', handleFirstScroll);
}

/* Role: Attach one-time listeners for the initial interaction.
   We use passive listeners for touch/wheel to avoid blocking scrolling and improve performance.
*/
/* [BLOCK] Add first-interaction listeners
   :   wheel/touchstart/click  
   :  passive:true     
*/
window.addEventListener('wheel', handleFirstScroll, { passive: true });
window.addEventListener('touchstart', handleFirstScroll, { passive: true });
if (scrollInstruction) scrollInstruction.addEventListener('click', handleFirstScroll);

/* Role: Wire the visual scroll arrow to trigger the first interaction and
   forward a `postMessage` to the embedded iframe to instruct it to advance.
   Note: uses '*' for targetOrigin by default; replace with a concrete origin for security in production.
*/
/* [BLOCK] scrollArrow click handler
   :    :
          -     first scroll -> 
          -   postMessage  iframe ( )    ( scrollNext)
*/
if (scrollArrow) {
  scrollArrow.addEventListener('click', () => {
    if (!hasScrolledOnce) handleFirstScroll();

    //    iframe (targetOrigin '*'  —     origin )
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ action: 'scrollNext' }, '*');
    }
  });
}

/* Role: Keyboard navigation support — map ArrowUp/ArrowDown to first-interaction reveal
   and relay key events to the iframe so it can adjust its internal scroll/video navigation.
*/
/* [BLOCK] keyboard handlers (Arrow keys)
   :    -    ArrowDown/ArrowUp:
          -     scroll  (  )
          -    iframe      
*/
window.addEventListener('keydown', (ev) => {
  const key = ev.key;
  if (key === 'ArrowDown' || key === 'ArrowUp') {
    if (!hasScrolledOnce) handleFirstScroll(); // show container on first keyboard navigation

    if (iframe && iframe.contentWindow) {
      //     
      iframe.contentWindow.postMessage({ action: 'keydown', key: key }, '*');
    }
  }
});

/* Role: Optional message bus from iframe -> parent page.
   This listener currently logs incoming messages for debugging.
   For production, validate ev.origin and ev.data before acting on messages.
*/
/* [BLOCK] Optional: handle messages from iframe (    )
   :   iframe      (  )
*/
window.addEventListener('message', (ev) => {
  //     origin  ev.origin  '*'
  // :       iframe:
  // if (ev.data && ev.data.action === 'someAction') { ... }
  //      debug
  // console.log('message from iframe:', ev.origin, ev.data);
});

/* Role: Small utility to keep the footer year current. Non-destructive — runs only if #year exists. */
/* [BLOCK] Footer year update (optional small helper)
   :     id 'year'     -  
*/
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ========== End of script.js (clean scroll-only) ========== */

/* Role: Services section intersection-driven animations.
   Adds the 'animate' class to elements with the data attribute when the section is in view.
*/
function initServicesAnimation() {
  const servicesSection = document.querySelector('.services-title');
  
  if (!servicesSection) return;
  
  const animatedElements = servicesSection.querySelectorAll('[data-services-animate]');
  
  const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        servicesObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.3,
    rootMargin: '0px'
  });
  
  animatedElements.forEach(element => {
    servicesObserver.observe(element);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initServicesAnimation);
} else {
  initServicesAnimation();
}

/* Role: Work gallery card staggered entrance.
   Observes each card and applies a staggered delay based on index when the card enters viewport.
*/
// Work Gallery Animation

function initWorkGalleryAnimation() {
  const workCards = document.querySelectorAll('[data-work-animate]');
  
  if (workCards.length === 0) return;
  
  const workObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay based on card index for staggered animation
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 150);
        
        workObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.2,
    rootMargin: '0px'
  });
  
  workCards.forEach(card => {
    workObserver.observe(card);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWorkGalleryAnimation);
} else {
  initWorkGalleryAnimation();
}

/* Role: Clients section reveal + logos slider hover pause behavior.
   These functions initialize intersection animations for the clients heading and
   attach hover handlers to pause the continuous logo scrolling animation for usability.
*/
// Our Clients Section Animation

function initClientsAnimation() {
  const clientsSection = document.querySelector('.clients-section');
  
  if (!clientsSection) return;
  
  const animatedElements = clientsSection.querySelectorAll('[data-clients-animate]');
  
  const clientsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        clientsObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.3,
    rootMargin: '0px'
  });
  
  animatedElements.forEach(element => {
    clientsObserver.observe(element);
  });
}

// Pause animation on hover for better UX
function initLogoSliderHover() {
  const logosTracks = document.querySelectorAll('.logos-track');
  
  logosTracks.forEach(track => {
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initClientsAnimation();
    initLogoSliderHover();
  });
} else {
  initClientsAnimation();
  initLogoSliderHover();
}
