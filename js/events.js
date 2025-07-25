// Events Module
const Events = (() => {
  'use strict';

  // Event data (in a real app, this would come from an API or external JSON file)
  const eventData = [
    {
      id: 1,
      title: "126th Tontitown Grape Festival",
      date: "Aug 5–9, 2025",
      location: "Tontitown, AR",
      description: "Free admission carnival, grape stomp, arts & crafts fair, famous spaghetti dinners, live music, and Queen Concordia coronation.",
      url: "https://tontitowngrapefestival.com/",
      type: "festival"
    },
    {
      id: 2,
      title: "Fort Smith International Film Festival",
      date: "Aug 7–9, 2025",
      location: "Fort Smith, AR",
      description: "160+ local & global films, red-carpet screenings, filmmaker Q&As, and MidAmerica Film Market at Fort Smith Convention Center.",
      url: "https://fortsmithfilm.com/",
      type: "film"
    },
    {
      id: 3,
      title: "SOAR NWA Hot Air Balloon Festival",
      date: "Aug 15–16, 2025",
      location: "Bentonville, AR",
      description: "Evening balloon glows, tethered rides, circus performers, live music, food trucks, beer garden, kid zone & more at Benton County Fairgrounds.",
      url: "https://www.visitbentonville.com/event/soar-nwa-2025/8011/",
      type: "festival"
    },
    {
      id: 4,
      title: "Mountains, Music & Motorcycles",
      date: "Aug 15–17, 2025",
      location: "Mountain View, AR",
      description: "21st-annual downtown motorcycle rally with live bands, stunt shows, poker run, vendors, car display, and Ozark mountain riding routes.",
      url: "https://mountainsmusicandmotorcycles.com/",
      type: "music"
    },
    {
      id: 5,
      title: "Bluegrass & Fried Chicken Festival",
      date: "Aug 22–23, 2025",
      location: "Mountain View, AR",
      description: "Two-day bluegrass showcase at Ozark Folk Center State Park with all-you-can-eat fried chicken buffet and family-friendly fun.",
      url: "https://www.arkansasstateparks.com/events/bluegrass-fried-chicken-festival",
      type: "music"
    },
    {
      id: 6,
      title: "Bentonville First Friday – Superhero City",
      date: "Sept 5, 2025",
      location: "Bentonville, AR",
      description: "Downtown Bentonville's monthly block party transforms the Square with themed vendors, live music, food trucks, and family activities.",
      url: "https://downtownbentonville.org/do/first-fridays-superhero-city",
      type: "community"
    },
    {
      id: 7,
      title: "Boston Mountain Paw Paw Festival",
      date: "Sept 20, 2025",
      location: "Chester, AR",
      description: "Free-entry harvest celebration at Beard & Lady Inn with pawpaw desserts, live music by Dreadful Day, cornhole, pageant, and growing workshops.",
      url: "https://www.projectpawpaw.com/event-details-registration/2025-boston-mountain-paw-paw-festival",
      type: "festival"
    }
  ];

  // DOM Elements
  let eventGrid;

  // Initialize
  const init = () => {
    eventGrid = document.getElementById('event-grid');
    if (!eventGrid) return;

    loadEvents();
  };

  // Load Events
  const loadEvents = () => {
    // Simulate loading delay
    setTimeout(() => {
      renderEvents(eventData);
    }, 500);
  };

  // Render Events
  const renderEvents = (events) => {
    if (!events || events.length === 0) {
      eventGrid.innerHTML = '<p class="loading">No events found.</p>';
      return;
    }

    // Clear loading message
    eventGrid.innerHTML = '';

    // Create event cards
    events.forEach((event, index) => {
      const card = createEventCard(event, index);
      eventGrid.appendChild(card);
    });
  };

  // Create Event Card
  const createEventCard = (event, index) => {
    const card = document.createElement('article');
    card.className = 'event-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('role', 'listitem');
    card.setAttribute('itemscope', '');
    card.setAttribute('itemtype', 'https://schema.org/Event');

    card.innerHTML = `
      <h3 itemprop="name">${escapeHtml(event.title)}</h3>
      <time class="event-date" itemprop="startDate" datetime="${event.startDate || ''}">${escapeHtml(event.date)} · <span itemprop="location">${escapeHtml(event.location)}</span></time>
      <p itemprop="description">${escapeHtml(event.description)}</p>
      <a href="${escapeHtml(event.url)}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="btn btn-primary"
         itemprop="url"
         aria-label="Visit ${escapeHtml(event.title)} website (opens in new tab)">
        Event Site
      </a>
    `;

    return card;
  };

  // Utility: Escape HTML
  const escapeHtml = (text) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  };

  // Public API for future enhancements
  return {
    init,
    getEvents: () => eventData,
    filterByType: (type) => eventData.filter(event => event.type === type),
    searchEvents: (query) => {
      const searchTerm = query.toLowerCase();
      return eventData.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm)
      );
    }
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Events.init);
} else {
  Events.init();
}