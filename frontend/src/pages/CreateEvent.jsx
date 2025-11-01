import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    maxParticipants: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const eventData = new FormData();
    for (const key in formData) {
      eventData.append(key, formData[key]);
    }
    
    // The backend seems to expect currentParticipants, let's add it.
    eventData.append('currentParticipants', 0);

    try {
      const response = await api.post('/event/create', eventData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        toast.success('Event created successfully!');
        navigate('/my-events');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Event creation failed.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4">
      <div className="w-full max-w-2xl bg-[#1E1E1E] rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Create a New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#A0A0A0]">Event Title</label>
              <input type="text" name="title" required onChange={handleChange} className="mt-1 block w-full input-style" />
            </div>
             <div>
              <label className="block text-sm font-medium text-[#A0A0A0]">Location</label>
              <input type="text" name="location" required onChange={handleChange} className="mt-1 block w-full input-style" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#A0A0A0]">Description</label>
            <textarea name="description" rows="3" required onChange={handleChange} className="mt-1 block w-full input-style" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-sm font-medium text-[#A0A0A0]">Date</label>
              <input type="date" name="date" required onChange={handleChange} className="mt-1 block w-full input-style" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A0A0A0]">Max Participants</label>
              <input type="number" name="maxParticipants" required onChange={handleChange} className="mt-1 block w-full input-style" />
            </div>
          </div>
           <div>
            <label className="block text-sm font-medium text-[#A0A0A0]">Event Image</label>
            <input type="file" name="image" required onChange={handleChange} className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4718cb] file:text-white hover:file:bg-purple-700"/>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4718cb] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-purple-400"
            >
              {loading ? <Loader /> : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// Add a shared style for inputs in index.css or here as a utility class in tailwind.config
// For now, let's use a utility class in the code itself
const InputStyle = "mt-1 block w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm";
// In your actual code, apply this class like this: className={InputStyle}
// However, for this example to work directly, let's define it in `index.css` or just use the classes directly.
// In `index.css`:
// @layer components { .input-style { @apply mt-1 block w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm; }}
// I've used `input-style` in the JSX, so be sure to add the layer to `index.css`.
export default CreateEvent;