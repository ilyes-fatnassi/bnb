import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { createExperience, updateExperience, getExperienceById } from '../../services/api';
import Button from '../Button';
import { useAppContext } from '../../context/AppContext';

const AddExperience = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addNotification } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [hostName, setHostName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    duration: '',
    group_size: '',
    max_guests: '',
    image: '',
    tags: [],
    highlights: [],
    what_included: [],
    status: 'draft'
  });

  const [tagInput, setTagInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [includedInput, setIncludedInput] = useState('');

  // Load host profile
  useEffect(() => {
    const loadHostProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: host, error } = await supabase
          .from('hosts')
          .select('id, full_name')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        if (host) {
          setHostName(host.full_name);
        }
      } catch (error) {
        console.error('Error loading host profile:', error);
      }
    };

    loadHostProfile();
  }, []);

  // Load experience if editing
  useEffect(() => {
    if (id) {
      loadExperience();
    }
  }, [id]);

  const loadExperience = async () => {
    try {
      setLoading(true);
      const experience = await getExperienceById(id);
      setFormData({
        title: experience.title || '',
        description: experience.description || '',
        location: experience.location || '',
        price: experience.price || '',
        duration: experience.duration || '',
        group_size: experience.group_size || '',
        max_guests: experience.max_guests || '',
        image: experience.image || '',
        tags: experience.tags || [],
        highlights: experience.highlights || [],
        what_included: experience.what_included || [],
        status: experience.status || 'draft'
      });
      if (experience.image) {
        setImagePreview(experience.image);
      }
    } catch (error) {
      console.error('Error loading experience:', error);
      addNotification('Failed to load experience', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `experiences/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('meals')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('meals')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        image: publicUrl
      }));
      setImagePreview(publicUrl);
      addNotification('Image uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      addNotification('Failed to upload image', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addHighlight = () => {
    if (highlightInput.trim() && !formData.highlights.includes(highlightInput.trim())) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()]
      }));
      setHighlightInput('');
    }
  };

  const removeHighlight = (highlightToRemove) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter(h => h !== highlightToRemove)
    }));
  };

  const addIncluded = () => {
    if (includedInput.trim() && !formData.what_included.includes(includedInput.trim())) {
      setFormData(prev => ({
        ...prev,
        what_included: [...prev.what_included, includedInput.trim()]
      }));
      setIncludedInput('');
    }
  };

  const removeIncluded = (includedToRemove) => {
    setFormData(prev => ({
      ...prev,
      what_included: prev.what_included.filter(i => i !== includedToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location || !formData.price) {
      addNotification('Please fill in all required fields', 'error');
      return;
    }

    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: host } = await supabase
        .from('hosts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!host) throw new Error('Host profile not found');

      const experienceData = {
        ...formData,
        host_id: host.id,
        host: hostName,
        price: parseFloat(formData.price),
        max_guests: parseInt(formData.max_guests) || 8,
        rating: 0,
        reviews: 0
      };

      if (id) {
        await updateExperience(id, experienceData);
        addNotification('Experience updated successfully!', 'success');
      } else {
        await createExperience(experienceData);
        addNotification('Experience created successfully!', 'success');
      }
      
      navigate('/host/experiences');
    } catch (error) {
      console.error('Error saving experience:', error.message, error.details, error.hint);
      addNotification(`Failed to save experience: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? 'Edit Experience' : 'Create New Experience'}
        </h1>
        <p className="text-gray-600 mt-2">
          Share an unforgettable experience with guests
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Medina Walking Tour & Traditional Tea"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe your experience in detail..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Tunis Medina"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Host Name
              </label>
              <input
                type="text"
                value={hostName}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Pricing & Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per Person (DT) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 3 hours"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Guests
              </label>
              <input
                type="number"
                name="max_guests"
                value={formData.max_guests}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="8"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Size Info
            </label>
            <input
              type="text"
              name="group_size"
              value={formData.group_size}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Up to 8 guests"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Image</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Add a tag (e.g., Cultural, Tour, Photography)"
            />
            <Button type="button" onClick={addTag} variant="secondary">
              Add
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-primary-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Highlights</h2>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Add a highlight"
            />
            <Button type="button" onClick={addHighlight} variant="secondary">
              Add
            </Button>
          </div>
          
          <ul className="space-y-2">
            {formData.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="flex-1">✓ {highlight}</span>
                <button
                  type="button"
                  onClick={() => removeHighlight(highlight)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* What's Included */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">What's Included</h2>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={includedInput}
              onChange={(e) => setIncludedInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncluded())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Add what's included (e.g., Traditional tea, Snacks)"
            />
            <Button type="button" onClick={addIncluded} variant="secondary">
              Add
            </Button>
          </div>
          
          <ul className="space-y-2">
            {formData.what_included.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="flex-1">• {item}</span>
                <button
                  type="button"
                  onClick={() => removeIncluded(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Status */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Status</h2>
          
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Saving...' : id ? 'Update Experience' : 'Create Experience'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/host/experiences')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddExperience;
