import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEvents = useCallback(async (location = '') => {
    setLoading(true);
    try {
      const endpoint = location ? `/event/filter?location=${location}` : '/event';
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api${endpoint}`);
      console.log("Response data " , response.data)
      if (response.data.success) {
        setEvents(response.data.Events
);
      }
    } catch (error) {
      toast.error('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(searchTerm);
  };

  return (
    <div className="min-h-screen bg-[#1e2122ff]  text-[#84d3eede]">
      {/* Hero Section */}
      <div className="relative text-center bg-[#1e2122] py-20 px-4 sm:px-6 lg:px-8">
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-10" 
            style={{backgroundImage: "url('https://i.pinimg.com/736x/1b/74/e2/1b74e2cf8e28d6d18d7e339cf862bee7.jpg')"}}>
        </div>
        <div className="relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                Find Your Next <span className="text-primary">Experience</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-[#A0A0A0]">
                Discover events, concerts, and gatherings happening near you.
            </p>
            <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by location (e.g., New York)"
                    className="w-full px-4 py-3 text-white bg-dark-bg border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    type="submit"
                    className="px-4 py-3 bg-[#4718cb] text-white rounded-r-md hover:bg-purple-700 transition-colors"
                >
                    <Search className="h-6 w-6" />
                </button>
            </form>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size="h-12 w-12" />
          </div>
        ) : events.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold">No Events Found</h3>
            <p className="text-[#A0A0A0] mt-2">Try a different search or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;