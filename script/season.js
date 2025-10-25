// Get all videos and controls
const videos = document.querySelectorAll('.season-video');
const slider = document.getElementById('season-slider');
const sliderFill = document.querySelector('.slider-fill');
const seasonIcons = document.querySelectorAll('.season-icon');

let currentSeason = 0;
let videosLoaded = 0;
let allVideosReady = false;

// Sync all videos to same time
function syncVideos() {
    if (allVideosReady && videos[currentSeason]) {
        const currentTime = videos[currentSeason].currentTime;
        videos.forEach((video, index) => {
            if (index !== currentSeason && Math.abs(video.currentTime - currentTime) > 0.1) {
                video.currentTime = currentTime;
            }
        });
    }
}

// Switch season smoothly
function switchSeason(seasonIndex) {
    if (seasonIndex === currentSeason) return;
    
    // Remove active class from all
    videos.forEach(video => video.classList.remove('active'));
    seasonIcons.forEach(icon => icon.classList.remove('active'));
    
    // Add active class to selected season
    videos[seasonIndex].classList.add('active');
    seasonIcons[seasonIndex].classList.add('active');
    
    // Sync time before switching
    if (allVideosReady) {
        videos[seasonIndex].currentTime = videos[currentSeason].currentTime;
    }
    
    currentSeason = seasonIndex;
    
    // Update slider
    slider.value = seasonIndex;
    updateSliderFill(seasonIndex);
}

// Update slider fill visualization
function updateSliderFill(value) {
    const percentage = (value / 3) * 100;
    sliderFill.style.width = percentage + '%';
}

// Initialize videos
function initializeVideos() {
    videos.forEach((video, index) => {
        // Load video
        video.load();
        
        video.addEventListener('loadeddata', () => {
            videosLoaded++;
            
            // When all videos are loaded
            if (videosLoaded === videos.length) {
                allVideosReady = true;
                
                // Start all videos simultaneously
                videos.forEach(v => {
                    v.currentTime = 0;
                    v.play().catch(err => {
                        console.log('Autoplay prevented:', err);
                        // User interaction required - show play button overlay if needed
                    });
                });
                
                // Set up continuous sync
                setInterval(syncVideos, 100);
            }
        });
        
        // Keep videos in sync when they play
        video.addEventListener('play', () => {
            if (allVideosReady) {
                syncVideos();
            }
        });
        
        // Prevent individual videos from going out of sync
        video.addEventListener('seeking', () => {
            if (index !== currentSeason && allVideosReady) {
                video.currentTime = videos[currentSeason].currentTime;
            }
        });
    });
}

// Slider events
slider.addEventListener('input', (e) => {
    const seasonIndex = parseInt(e.target.value);
    switchSeason(seasonIndex);
});

// Click on season icons
seasonIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        switchSeason(index);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        let newSeason = currentSeason;
        
        if (e.key === 'ArrowLeft' && currentSeason > 0) {
            newSeason = currentSeason - 1;
        } else if (e.key === 'ArrowRight' && currentSeason < 3) {
            newSeason = currentSeason + 1;
        }
        
        switchSeason(newSeason);
    }
});

// Initialize on page load
window.addEventListener('load', () => {
    initializeVideos();
    switchSeason(0); // Start with spring
});

// Handle visibility change to keep videos in sync
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && allVideosReady) {
        syncVideos();
        // Ensure all videos are playing
        videos.forEach(v => {
            if (v.paused) {
                v.play().catch(err => console.log('Play prevented:', err));
            }
        });
    }
});