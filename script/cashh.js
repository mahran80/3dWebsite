/* Role: cashh.js — Dynamic controller for the video hero section.
   Responsibilities:
   - Create and manage multiple <video> elements from hidden .scroll-section data attributes
   - Implement custom scroll navigation and intersection-based section switching
   - Coordinate text overlay updates and staggered entrance animations
   - Keep autoplay-compatible settings and handle visibility/resume behavior
   Note: This file only adds non-destructive comments; the JS logic and statements are unchanged.
*/

// Role: Element references used across the script
const videoContainer = document.getElementById('videoContainer');
const categoryEl = document.getElementById('category');
const titleEl = document.getElementById('mainTitle');
const descEl = document.getElementById('description');
const btnEl = document.getElementById('continueBtn');
const sections = document.querySelectorAll('.scroll-section');

// Role: State variables used to track the current displayed section and control transitions
let currentIndex = 0;
let isTransitioning = false;
let textShowTimeout = null;
let isScrolling = false;
let canScroll = true;

// Role: Collections for the dynamically created <video> elements and readiness tracking
let videoElements = [];
let videosReady = 0;

// Role: Overlay text elements grouped for staggered show/hide behavior
const textElements = [categoryEl, titleEl, descEl, btnEl];

// Role: Custom scroll handling — prevents the native continuous scroll and snaps between sections
let scrollTimeout;
function handleCustomScroll(event) {
  if (isTransitioning || !canScroll) {
    event.preventDefault();
    return;
  }
  if (isScrolling) {
    event.preventDefault();
    return;
  }
  const delta = event.deltaY;
  if (Math.abs(delta) < 10) return;
  event.preventDefault();
  isScrolling = true;
  clearTimeout(scrollTimeout);

  if (delta > 0) {
    const nextIndex = Math.min(sections.length - 1, currentIndex + 1);
    if (nextIndex !== currentIndex) {
      updateSection(nextIndex);
      sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    const prevIndex = Math.max(0, currentIndex - 1);
    if (prevIndex !== currentIndex) {
      updateSection(prevIndex);
      sections[prevIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 800);
}

// Attach the custom scroll handler (non-passive so we can call preventDefault)
window.addEventListener('wheel', handleCustomScroll, { passive: false });

// Role: Hide overlay text immediately (used during transitions)
function hideText() {
  if (textShowTimeout) {
    clearTimeout(textShowTimeout);
    textShowTimeout = null;
  }
  textElements.forEach(el => {
    el.classList.remove('show');
  });
}

// Role: Show overlay text with a staggered delay, and re-enable scrolling after a safety delay
function showText(delay = 1000) {
  if (textShowTimeout) {
    clearTimeout(textShowTimeout);
  }
  canScroll = false;
  textShowTimeout = setTimeout(() => {
    textElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('show');
        if (i === textElements.length - 1) {
          setTimeout(() => {
            canScroll = true;
          }, 2000);
        }
      }, i * 150);
    });
  }, delay);
}

// Role: Create <video> elements from each .scroll-section and insert them into the hero container
function createVideoElements() {
  sections.forEach((section, index) => {
    const videoSrc = section.dataset.video;
    
    // Create video element
    const video = document.createElement('video');
    video.className = 'hero-video';
    video.src = videoSrc;

    // Role: Autoplay-friendly attributes — muted is applied both as property and attribute to improve compatibility
    video.muted = true;
    video.setAttribute('muted', ''); // attribute to maximize autoplay compatibility
    video.autoplay = true;           // attempt autoplay

    video.loop = true;
    video.playsInline = true;
    video.setAttribute('webkit-playsinline', '');
    video.preload = 'auto';
    
    // First video is set active so it is visible initially
    if (index === 0) {
      video.classList.add('active');
    }
    
    // Insert the video before the text overlay so text stays on top
    videoContainer.insertBefore(video, videoContainer.firstChild);
    videoElements.push(video);
    
    // Track when each video has loaded enough data to play
    video.addEventListener('loadeddata', () => {
      videosReady++;
      console.log(`Video ${index + 1} loaded (${videosReady}/${sections.length})`);
      
      if (videosReady === sections.length) {
        startAllVideos();
      }
    });
    
    // Trigger the browser to load the video
    video.load();
  });
}

// Role: Attempt to start playback on all videos and then show the first overlay text
function startAllVideos() {
  console.log('All videos ready, starting playback...');
  
  videoElements.forEach((video, index) => {
    video.currentTime = 0;
    video.play().catch(err => {
      console.log(`Video ${index} autoplay prevented:`, err);
    });
  });
  
  // Reveal first text after a short delay to allow the visual transition to settle
  showText(1500);
}

// Role: Switch active section — handle video class toggles, restart playback, and update overlay content
function updateSection(index) {
  if (index === currentIndex || isTransitioning || index < 0 || index >= sections.length) {
    return;
  }
  
  isTransitioning = true;
  canScroll = false;
  
  const oldIndex = currentIndex;
  currentIndex = index;
  
  const section = sections[index];
  const category = section.dataset.category;
  const title = section.dataset.title;
  const description = section.dataset.description;
  const highlight = section.dataset.highlight;
  
  // Hide overlay text before changing video
  hideText();
  
  // Small delay to smooth the visual crossfade
  setTimeout(() => {
    // Remove active from old video
    videoElements[oldIndex].classList.remove('active');
    
    // Add active to new video
    videoElements[index].classList.add('active');
    
    // Restart the new video from the beginning
    videoElements[index].currentTime = 0;
    videoElements[index].play().catch(err => {
      console.log('Play prevented:', err);
    });
    
    // Update overlay text content to match the new section
    categoryEl.textContent = category;
    titleEl.textContent = title;
    descEl.innerHTML = description + '<span class="highlight">' + '</span> ';
    
    // After the visual transition, re-enable transitions and show text
    setTimeout(() => {
      isTransitioning = false;
      showText(400);
    }, 600);
    
  }, 200);
}

// Role: IntersectionObserver configuration to detect which invisible scroll-section is most visible
const observerOptions = {
  root: null,
  threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
  rootMargin: '-10% 0px -10% 0px'
};

let lastDetectedIndex = -1;
const observer = new IntersectionObserver((entries) => {
  let mostVisible = null;
  let maxRatio = 0;
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
      maxRatio = entry.intersectionRatio;
      mostVisible = entry;
    }
  });
  if (mostVisible) {
    const index = Array.from(sections).indexOf(mostVisible.target);
    if (index !== -1 && index !== lastDetectedIndex) {
      lastDetectedIndex = index;
      updateSection(index);
    }
  }
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Role: Keyboard navigation — map ArrowDown/Space to next, ArrowUp to previous
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === ' ') {
    e.preventDefault();
    const nextIndex = Math.min(sections.length - 1, currentIndex + 1);
    sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = Math.max(0, currentIndex - 1);
    sections[prevIndex].scrollIntoView({ behavior: 'smooth' });
  }
});

// Role: Continue button behavior — scroll to the next section when clicked
btnEl.addEventListener('click', (e) => {
  e.preventDefault();
  const nextIndex = Math.min(sections.length - 1, currentIndex + 1);
  sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
});

// Role: Initialization — create videos and prepare system when the window has fully loaded
function init() {
  console.log('Initializing seamless video system...');
  createVideoElements();
}

window.addEventListener('load', init);

// Role: Resume playback for videos when the document becomes visible again (useful after switching tabs)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    videoElements.forEach((video, index) => {
      if (video.paused) {
        video.play().catch(err => console.log('Resume failed:', err));
      }
    });
  }
});
