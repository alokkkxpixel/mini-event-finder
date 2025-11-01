import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { MapPin, Calendar, Users, UserRoundX } from 'lucide-react';
import axios from 'axios';

const EventDetails = () => {
    const { eventId } = useParams(); // Gets the 'eventId' from the URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/event/${eventId}`);
                if (response.data.success) {
                    setEvent(response.data.event);
                } else {
                    setError('Event not found.');
                    toast.error('Event not found.');
                }
            } catch (err) {
                const message = err.response?.data?.message || 'Failed to fetch event details.';
                setError(message);
                toast.error(message);
            } finally {
                setLoading(false);
            }
        };

        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader size="h-16 w-16" />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-accent">Error</h2>
                <p className="text-text-secondary mt-2">{error || 'Could not find the event.'}</p>
            </div>
        );
    }

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className=' min-h-screen bg-black text-white flex flex-col '>

            <div className="min-h-screen bg-black text-white flex flex-col items-center">
                {/* Event Banner */}
                <div className="relative w-[400px] flex justify-center items-center my-5 bg-red-400 max-h-[500px] rounded-xl overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                {/* Event Info Section */}
                <div className="max-w-5xl w-full mx-auto p-5 sm:p-10 space-y-8">
                    {/* Title & Tags */}
                    <div className="space-y-3">
                        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
                            {event.title} - Smx TOUR II
                        </h1>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 rounded-full border border-gray-600 text-sm">
                                Music Concert
                            </span>
                            <span className="px-3 py-1 rounded-full border border-gray-600 text-sm">
                                Hip-Hop / Rap
                            </span>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-4 text-gray-300">
                        <div className="flex items-center gap-3">
                            <Calendar className="text-primary w-5 h-5" />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="text-primary w-5 h-5" />
                            <span>{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <div className='flex items-center gap-3'>

                            <Users className="text-primary w-5 h-5" />
                            <span>
                                {event.currentParticipants} / {event.maxParticipants} participants
                            </span>
                            </div>
                            <div className='flex items-center gap-3'>
                          <UserRoundX className="text-red-600 w-5 h-5" />
                             <span>
                                {event.maxParticipants  - event.currentParticipants} slots available
                            </span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full sm:w-auto bg-primary hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all">
                        Book Now
                    </button>
                </div>
                <div className="bg-[#121212] p-4 rounded-lg mb-4">












                    {/* Description */}
                    <section className="pt-8 border-t border-gray-700">
                        <h2 className="text-2xl font-semibold mb-3">Description</h2>
                        <p className="text-gray-300 leading-relaxed">{event.description}</p>
                    </section>

                    {/* Venue Section */}
                    <section className="pt-8 border-t border-gray-700">
                        <h2 className="text-2xl font-semibold mb-3">Venue</h2>
                        <p className="text-gray-300">{event.location}</p>
                        <div className="mt-4 w-full h-56 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                            [Map Placeholder]
                        </div>
                    </section>

                    {/* Artists */}
                    <section className="pt-8 border-t border-gray-700">
                        <h2 className="text-2xl font-semibold mb-4">Artists</h2>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 bg-[#1E1E1E] p-5 rounded-lg">
                            <div>
                                <h3 className="text-xl font-bold">{event.userId.fullname}</h3>
                                <h5 className="text-gray-400 text-sm mb-4">
                                    Performing live at {event.location}
                                </h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, inventore illo facilis non fuga illum quae reprehenderit ad obcaecati doloremque.</p>
                            </div>
                            <button className="bg-secondary hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition-all">
                                Book Now
                            </button>
                        </div>
                    </section>
                </div>

            </div>

        </div>

    );
};

export default EventDetails;