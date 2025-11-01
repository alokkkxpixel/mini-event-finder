import React from 'react';
import { MapPin, Calendar, Users, Trash2 } from 'lucide-react';
import Loader from './Loader';

const EventCard = ({ event, onDelete, isDeleting }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-light-bg rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300 group">
      <div className="relative">
        <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
          {event.currentParticipants}/{event.maxParticipants} attending
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-text-secondary text-sm mb-4 h-16 overflow-hidden">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-text-secondary">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-text-secondary">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>
        {onDelete && (
           <button
             onClick={() => onDelete(event._id)}
             disabled={isDeleting}
             className="w-full mt-4 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-red-400"
           >
             {isDeleting ? <Loader /> : <><Trash2 className="h-4 w-4 mr-2" /> Delete Event</>}
           </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;