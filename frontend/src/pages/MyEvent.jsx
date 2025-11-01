import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMyEvents = useCallback(async () => {
    setLoading(true);
    try {
      // NOTE: The backend doesn't have a dedicated "my events" endpoint.
      // We fetch all events and assume the user can only delete their own.
      // The backend's authorization on the DELETE endpoint will enforce this.
      const response = await api.get('/event');
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
    setDeletingId(eventId);
    try {
      const response = await api.delete(`/event/delete/${eventId}`);
      if (response.data.success) {
        toast.success('Event deleted successfully!');
        // Refetch events after deletion
        fetchMyEvents();
      }
    } catch (error) {
       toast.error(error.response?.data?.message || 'Failed to delete event.');
    } finally {
        setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">My Events</h1>
            <Link to="/create-event" className="bg-[#4718cb] text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors">
                Create New Event
            </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size="h-12 w-12" />
          </div>
        ) : events.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard 
                key={event._id} 
                event={event} 
                onDelete={handleDelete}
                isDeleting={deletingId === event._id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#1E1E1E] rounded-lg">
            <h3 className="text-2xl font-semibold">You haven't created any events yet.</h3>
            <p className="text-[#A0A0A0] mt-2">Why not create one now?</p>
             <Link to="/create-event" className="mt-4 inline-block bg-[#4718cb] text-white px-6 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors">
                Create Event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;