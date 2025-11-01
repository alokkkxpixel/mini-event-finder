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
    <div className="bg-zinc-900 relative rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300 group">
      <div className="">
        <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
        
      </div>
      <div className="p-4  ">
        <h3 className="text-xl font-bold text-[#84d3eede] mb-2">{event.title}</h3>
        <p className="text-[#A0A0A0] text-sm mb-4 h-16 overflow-hidden">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-[#A0A0A0]">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-[#A0A0A0]">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
        
        </div>
          <div className=" flex item-center justify-center gap-4 bottom-0 right-10 bg-zinc-800 mt-4 text-[#84d3eede] text-xs font-medium px-1 py-2  rounded-md">
         <h2 className=''>Current Participants: {event.currentParticipants}</h2>
         <h2> Max Participants : {event.maxParticipants} </h2>
        </div>
        {onDelete && (
           <button
             onClick={() => onDelete(event._id)}
             disabled={isDeleting}
             className="w-full mt-4 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6B6B] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-red-400"
           >
             {isDeleting ? <Loader /> : <><Trash2 className="h-4 w-4 mr-2" /> Delete Event</>}
           </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;