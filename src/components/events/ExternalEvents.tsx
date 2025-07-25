import React, { useState } from 'react';
import { Calendar, MapPin, Users, ExternalLink, Plus, Edit, Trash2, Shield } from 'lucide-react';

interface ExternalEvent {
  id: string;
  title: string;
  description: string;
  college: string;
  date: string;
  time: string;
  location: string;
  registrationLink: string;
  category: string;
  deadline: string;
  image?: string;
}

const ExternalEvents: React.FC = () => {
  const [events, setEvents] = useState<ExternalEvent[]>([
    {
      id: '1',
      title: 'Inter-College Hackathon 2024',
      description: 'Join the biggest hackathon of the year with exciting prizes and networking opportunities.',
      college: 'IIT Madras',
      date: '2024-02-15',
      time: '09:00 AM',
      location: 'Chennai, Tamil Nadu',
      registrationLink: 'https://iitm.ac.in/hackathon2024',
      category: 'Technical',
      deadline: '2024-02-10',
    },
    {
      id: '2',
      title: 'Bharatanatyam Competition',
      description: 'Classical dance competition open to all college students with cash prizes.',
      college: 'Anna University',
      date: '2024-02-20',
      time: '10:00 AM',
      location: 'Chennai, Tamil Nadu',
      registrationLink: 'https://annauniv.edu/dance2024',
      category: 'Cultural',
      deadline: '2024-02-15',
    },
    {
      id: '3',
      title: 'National Science Exhibition',
      description: 'Showcase your innovative projects and compete with students from across the country.',
      college: 'NIT Trichy',
      date: '2024-02-25',
      time: '09:30 AM',
      location: 'Tiruchirappalli, Tamil Nadu',
      registrationLink: 'https://nitt.edu/sciexpo2024',
      category: 'Academic',
      deadline: '2024-02-18',
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin] = useState(true); // This would come from auth context
  const [newEvent, setNewEvent] = useState<Partial<ExternalEvent>>({
    title: '',
    description: '',
    college: '',
    date: '',
    time: '',
    location: '',
    registrationLink: '',
    category: 'Technical',
    deadline: '',
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title && newEvent.college && newEvent.date) {
      const event: ExternalEvent = {
        ...newEvent as ExternalEvent,
        id: Date.now().toString(),
      };
      setEvents([...events, event]);
      setNewEvent({
        title: '',
        description: '',
        college: '',
        date: '',
        time: '',
        location: '',
        registrationLink: '',
        category: 'Technical',
        deadline: '',
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Admin Notice */}
      {isAdmin && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Admin Access</span>
          </div>
          <p className="text-blue-700 text-sm mt-1">
            You have administrative privileges to manage external events from other colleges.
          </p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">External Events</h2>
          <p className="text-gray-600">Discover events from other colleges and universities</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Event</span>
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h3 className="text-lg font-semibold mb-4">Add External Event (Admin Only)</h3>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College/University</label>
                <input
                  type="text"
                  value={newEvent.college}
                  onChange={(e) => setNewEvent({ ...newEvent, college: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Academic">Academic</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Deadline</label>
                <input
                  type="date"
                  value={newEvent.deadline}
                  onChange={(e) => setNewEvent({ ...newEvent, deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Link</label>
                <input
                  type="url"
                  value={newEvent.registrationLink}
                  onChange={(e) => setNewEvent({ ...newEvent, registrationLink: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Event
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  {event.category}
                </span>
                {isAdmin && (
                  <div className="flex space-x-1">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.college}, {event.location}</span>
                </div>
                {event.deadline && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Deadline: {new Date(event.deadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              {event.registrationLink && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium w-full justify-center"
                >
                  <span>Register for Event</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {!event.registrationLink && (
                <div className="text-center py-2 text-gray-500 text-sm">
                  Registration link not available
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {events.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No External Events</h3>
          <p className="text-gray-500">
            {isAdmin ? 'Add the first external event to get started.' : 'Check back later for new events from other colleges.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ExternalEvents;