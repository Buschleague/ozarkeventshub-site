// Events Module
const Events = (() => {
  'use strict';

  // Event data (in a real app, this would come from an API or external JSON file)
  const eventData = [
    {
      id: 1,
      title: "Boston Mountain Paw Paw Festival",
      date: "Sept 20, 2025",
      location: "Chester, AR",
      description: "Free-entry harvest celebration at Beard & Lady Inn with pawpaw desserts, live music by Dreadful Day, cornhole, pageant, and growing workshops.",
      url: "https://www.pawpawfestar.org",
      type: "festival"
    },
    {
      id: 2,
      title: "Bikes Blues & BBQ",
      date: "Oct 1–4, 2025",
      location: "Rogers, AR",
      description: "The world's largest charity motorcycle rally featuring scenic rides, live music, BBQ competition, vendors, and family-friendly activities throughout Northwest Arkansas.",
      url: "https://bikesbluesandbbq.org/",
      type: "festival"
    },
    {
      id: 3,
      title: "Arkansas Apple Festival",
      date: "Oct 3–5, 2025",
      location: "Lincoln, AR",
      description: "Celebrate the apple harvest with arts & crafts, live bluegrass music, parade at 10am Saturday, apple cider, food vendors, and family entertainment on the town square.",
      url: "https://www.arkansasapplefestival.com/",
      type: "festival"
    },
    {
      id: 4,
      title: "War Eagle Fair",
      date: "Oct 16–19, 2025",
      location: "Hindsville, AR",
      description: "Over 250 booths of handcrafted arts & crafts along War Eagle Creek. Features pottery, jewelry, woodworking, live demonstrations, music, and fall foliage.",
      url: "https://wareaglefair.com/",
      type: "festival"
    },
    {
      id: 5,
      title: "Ozark Moonshine & Music Festival",
      date: "Nov 1, 2025",
      location: "Clinton, AR",
      description: "All-day bluegrass and country music headlined by 'The Voice' star Ruby Leigh, plus craft distillery tastings, Ozark history exhibits, and hands-on activities.",
      url: "https://ozarkmoonshinefest.org/",
      type: "music"
    },
    {
      id: 6,
      title: "Lights of the Ozarks",
      date: "Nov 21, 2025 – Jan 1, 2026",
      location: "Fayetteville, AR",
      description: "Northwest Arkansas' most treasured holiday tradition transforms downtown square with millions of lights, parade Dec 4, live music, Santa visits, and festive activities.",
      url: "https://www.experiencefayetteville.com/experience/lights-of-the-ozarks",
      type: "holiday"
    },
    {
      id: 7,
      title: "Eureka Springs Christmas Festival",
      date: "Dec 5–21, 2025",
      location: "Eureka Springs, AR",
      description: "Victorian Christmas celebration with Parade of Lights Dec 5, Living Windows, Tour of Homes, Santa in Basin Park, Jinglin' Jeep Parade, and holiday markets.",
      url: "https://christmasineureka.com/",
      type: "holiday"
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