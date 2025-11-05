// card-details.js - Complete Project Details System (updated to support multiple videos)
// Videos containers now get an inline height (300px) so all videos appear like images.

const projectsData = {
  'project-1': {
    id: 'project-1',
    category: 'Work Flow: Open-Plan Office Visualization',
    title: 'Interior Design- 3D Visualization',
    image: 'res/service4.png',
    overview: `
    A daylight-driven office render showcasing balanced artificial and natural light distribution. Visualization developed from basic 2D plans to test how ceiling fixtures and window systems impact working environments.`,
    challenge: `
    The Challenges
    •
    Translating 2D architectural plans into a fully realized 3D environment.
    •
    Achieving balanced lighting conditions that replicate real-world daylight behavior.
    •
    Ensuring visual comfort and realistic material reflections within the office space.`,
    solution: `
    •
    Modeled complete interior layout from 2D CAD references with precision.
    •
    Simulated daylight and artificial light systems to analyze luminance distribution.
    •
    Applied realistic textures and materials to enhance the visual fidelity of surfaces and furniture.`,
    results: `
    Resolution & Impact
    The final renders delivered a professional and accurate visualization of a modern office atmosphere, enabling the client to make informed decisions on lighting and layout design.

    Outcome: Improved lighting plan validation and enhanced interior presentation quality.`,
    technologies: ['3ds Max', 'Corona Renderer', 'Photoshop', 'Interior Lighting Simulation'],
    services: [
      'Interior 3D Visualization',
      'Lighting Simulation',
      'Material Realism Enhancement',
      '2D to 3D Conversion',
      'Design Presentation Rendering'
    ],
    gallery: [
      'res/work45.png',
      'res/work4.png',
      'res/work42.png',
      'res/work43.png'
    ],
    // youtubeVideo: 'https://www.youtube.com/embed/aatmjpEnf2E'
  },
  
  'project-2': {
    id: 'project-2',
    category: 'LUXMOD: A Contemporary Villa Study',
    title: 'Architectural Design & 3D Visualization',
    image: 'res/work2.png',
    overview: `
    A calm residential corner with a nod to Tudor architecture. This 3D visualization emphasizes light, composition, and environment to bring architectural intent to life.`,
    challenge: `
    The Challenges
    •
    Achieving realistic lighting and material reflection to highlight Tudor architectural elements.
    •
    Balancing artistic composition with architectural accuracy.
    •
    Creating a calm yet dynamic environment that conveys a sense of comfort and luxury.`,
    solution: `
    •
    Developed detailed 3D models inspired by Tudor-style design principles.
    •
    Used advanced rendering techniques to emphasize natural lighting and realistic textures.
    •
    Optimized environment setup for depth, balance, and immersive visual storytelling.`,
    results: `
    Resolution & Impact
    The project successfully delivered a highly realistic visualization that communicates both architectural precision and aesthetic elegance.

    Outcome: Enhanced client presentation and improved visualization workflow for residential design projects.`,
    technologies: ['3ds Max', 'Corona Renderer', 'Photoshop', 'Architectural Visualization'],
    services: [
      '3D Exterior Visualization',
      'Architectural Rendering',
      'Lighting Simulation',
      'Material Optimization',
      'Concept Design Presentation'
    ],
    gallery: [
      'res/work2.png',
      'res/work23.png',
      'res/work26.png',
      'res/work25.png'
    ],
    // youtubeVideo: 'https://www.youtube.com/embed/4EXFOUzy1eE'
  },
  
  'project-3': {
    id: 'project-3',
    category: 'Urban-Architecture Design and Visualizing',
    title: ' Verde Haven: A Countryside Escape.',
    image: 'res/service5.png',
    overview: `
    Complete Villa visualization project in a countryside, including modeling, texturing, lighting, and rendering—all executed in multiple urban & 3D applications. Designed to reflect comfort, sophistication, and balance.`,
    challenge: `
    The Challenges
    •
    Coordinating assets and workflows across multiple 3D and urban design applications.
    •
    Modeling and integrating realistic landscape and vegetation around the villa.
    •
    Creating high-quality textures and materials that read well at close and distance views.
    •
    Balancing render quality with reasonable render times for large exterior scenes.`,
    solution: `
    •
    Implemented a multi-application pipeline for modeling, texturing, and scene assembly.
    •
    Used instancing and optimized vegetation workflows to populate the landscape efficiently.
    •
    Applied layered PBR materials and detailed texture work for realism.
    •
    Tuned lighting rigs and render settings to achieve photoreal exterior illumination and manageable render times.`,
    results: `
    Resolution & Impact
    The project delivered a cohesive and highly realistic countryside villa visualization that communicates comfort and sophistication, aiding client decision-making and marketing materials.

    Outcome: Enhanced presentation assets, faster stakeholder approvals, and an optimized exterior visualization workflow.`,
    technologies: ['3ds Max', 'Corona Renderer', 'Substance Painter', 'Photoshop', 'Forest Pack'],
    services: [
      'Villa Exterior Visualization',
      'Landscape & Vegetation Modeling',
      'Material & Texture Creation',
      'Lighting & Exterior Rendering',
      'Post-production & Compositing'
    ],
    gallery: [
      'res/work21.png',
      'res/work22.png',
      'res/work24.png'
    ],
    youtubeVideo: 'https://www.youtube.com/embed/BkeSDTYeY50'
    
  },
  
  'project-4': {
    id: 'project-4',
    category: 'Smart City Solutions',
    title: 'DigitalTwin-Urban-SmartCity-Animation-GIS',
    image: 'res/service3.png',
    overview: `
    Urban visualization turned into a game-style navigation experience. The project utilized various modeling and optimization tools before being deployed in Unreal Engine as an interactive walk/fly-through, for Digitaltwinning purposes.
    An interactive city-scale simulation built in Unreal Engine with real GIS, BIM, and photogrammetry data.

    The urban simulation showcases:
    ✅ First-person & fly-through exploration
    ✅ AI-driven pedestrian crowds
    ✅ Smart traffic logic — cars stop for pedestrians
    ✅ Indoor & outdoor navigation
    ✅ Green spaces, rivers, and infrastructure layers

    This project proves how Digital Twins can support urban planning, mobility studies, climate action, and citizen engagement.`,
    challenge: `
    The Challenges
    •
    Integrating large-scale GIS, BIM, and photogrammetry datasets into a single optimized Unreal Engine environment.
    •
    Creating AI-driven behaviors for pedestrians and vehicles with realistic logic.
    •
    Balancing visual fidelity and performance for smooth real-time navigation.
    •
    Ensuring accuracy of geospatial context while maintaining interactivity.`,
    solution: `
    •
    Streamlined GIS and BIM data pipelines and optimized assets for real-time rendering.
    •
    Developed AI logic for traffic and pedestrian systems to simulate realistic city movement.
    •
    Implemented LOD systems and texture streaming to maintain performance.
    •
    Added interactive layers for smart city features such as mobility, energy, and climate visualization.`,
    results: `
    Resolution & Impact
    The Smart City Simulation demonstrated how immersive, data-driven digital twins can revolutionize urban planning and citizen engagement.

    Outcome: Improved decision-making, enhanced communication with stakeholders, and a scalable framework for smart urban development.`,
    technologies: ['Unreal Engine', 'GIS Integration', 'BIM', 'Photogrammetry', 'AI Simulation', 'Blueprint Scripting'],
    services: [
      'Digital Twin Development',
      'Urban Simulation & Visualization',
      'Real-time GIS Integration',
      'AI-driven Traffic & Crowd Systems',
      'Interactive 3D Navigation',
      'Smart City Data Visualization'
    ],
    gallery: [
      'res/work51.png',
      'res/work52.png',
      'res/work53.png'
    ],
    youtubeVideo: 'https://www.youtube.com/embed/4EXFOUzy1eE'
  },

  // NEW project - shows 3 videos and 1 image when opened
  'project-5': {
    id: 'project-5',
    category: 'Realtime Render, Interactive VR, 3D Visualization',
    title: 'Immersive Motion: Real-Time VR & Cinematic Shots',
    image: 'res/work54.png',
    overview: `
    This real-time city environment blends technical accuracy with visual clarity. Optimized assets and performance settings were tuned for an Unreal Engine navigation tool that feels like an open-world game.`,
    challenge: `
    Balancing technical fidelity with runtime performance for VR and cinematic-quality camera shots in an interactive environment.`,
    solution: `
     Delivered a responsive VR-ready city demo with cinematic flythroughs and real-time responsiveness suitable for demos and stakeholder walkthroughs.`,
    results: `
    A compact, media-rich case study ready for embedding in the portfolio.`,
    technologies: ['Unreal Engine', 'Realtime Rendering', 'VR Interaction', 'Cinematic Camera Rigs'],
    services: [
    'Realtime City Visualization',
    'VR Integration & Interaction',
    'Cinematic Camera Design',
    'Performance Optimization'
    ],
    // single image in gallery
    gallery: [
      'res/work54.png'
    ],
    // multiple embedded YouTube videos (use embed URLs)
    videos: [
      'https://www.youtube.com/embed/WjNHqD8189U',
      'https://www.youtube.com/embed/osl_WKUrdw8',
      'https://www.youtube.com/embed/aGm-jkzsR4w'
    ]
  },
};

// Get project ID from URL parameters
function getProjectId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id') || 'project-1';
}

// Load project details
function loadProjectDetails() {
  const projectId = getProjectId();
  const project = projectsData[projectId];
  
  if (!project) {
    window.location.href = 'index.html';
    return;
  }
  
  // Update page title
  document.title = `${project.title} - 3DXENON`;
  
  // Hero section
  document.getElementById('heroImage').src = project.image;
  document.getElementById('detailCategory').textContent = project.category;
  document.getElementById('detailTitle').textContent = project.title;
  
  // Main content
  document.getElementById('detailOverview').textContent = project.overview;
  document.getElementById('detailChallenge').textContent = project.challenge;
  document.getElementById('detailSolution').textContent = project.solution;
  document.getElementById('detailResults').textContent = project.results;
  
  // Services
  const servicesContainer = document.getElementById('detailServices');
  servicesContainer.innerHTML = project.services.map(service => 
    `<li>${service}</li>`
  ).join('');
  
  // Gallery with images and YouTube video(s)
  const galleryContainer = document.getElementById('detailGallery');
  
  let galleryHTML = '';

  // Add images from gallery array (if any)
  if (project.gallery && project.gallery.length) {
    galleryHTML += project.gallery.map(img => 
      `<img src="${img}" alt="${project.title}">`
    ).join('');
  }

  // If there is a 'videos' array, add each as an iframe
  // NOTE: set inline height (300px) so video boxes match image height and all appear correctly
  if (project.videos && project.videos.length) {
    galleryHTML += project.videos.map(vUrl => `
      <div class="video-container" style="height:300px;">
        <iframe
          src="${vUrl}"
          title="YouTube video player"
          frameborder="0"
          loading="lazy"
          style="width:100%; height:100%; border:0;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>
    `).join('');
  } else if (project.youtubeVideo) {
    // backward compatibility for single youtubeVideo field
    galleryHTML += `
      <div class="video-container" style="height:300px;">
        <iframe
          src="${project.youtubeVideo}" 
          title="YouTube video player" 
          frameborder="0" 
          loading="lazy"
          style="width:100%; height:100%; border:0;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>
    `;
  }
  
  galleryContainer.innerHTML = galleryHTML;
  
  // Load related projects
  loadRelatedProjects(projectId);
}

// Load related projects
function loadRelatedProjects(currentProjectId) {
  const relatedContainer = document.getElementById('relatedProjects');
  const allProjects = Object.values(projectsData);
  const relatedProjects = allProjects.filter(p => p.id !== currentProjectId).slice(0, 4);
  
  relatedContainer.innerHTML = relatedProjects.map(project => `
    <a href="card-details.html?id=${project.id}" class="related-card">
      <div class="related-card-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="related-card-content">
        <div class="related-card-category">${project.category}</div>
        <h3 class="related-card-title">${project.title}</h3>
      </div>
    </a>
  `).join('');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadProjectDetails);

// Smooth scroll to top
window.scrollTo(0, 0);
