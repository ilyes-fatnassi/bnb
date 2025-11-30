import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { createMeal, updateMeal, getMealById } from '../../services/api';

export default function AddMeal() {
  const navigate = useNavigate();
  const { id } = useParams(); // For editing existing meals
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hostId, setHostId] = useState(null);
  const [hostName, setHostName] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    max_guests: '',
    category: 'Tunisian',
    meal_type: 'dinner',
    image: '',
    dietary_info: [],
    available_days: [],
    preparation_time: '',
    location: '',
    status: 'active'
  });

  const categories = [
    'Tunisian', 'Mediterranean', 'Middle Eastern', 'Italian', 
    'French', 'Asian', 'Vegetarian', 'Vegan', 'Fusion'
  ];

  const mealTypes = ['breakfast', 'brunch', 'lunch', 'dinner', 'dessert'];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Nut-Free', 'Halal', 'Kosher', 'Organic'
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];

  useEffect(() => {
    loadHostProfile();
    if (isEditing) {
      loadMealData();
    }
  }, [id]);

  const loadHostProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: host } = await supabase
        .from('hosts')
        .select('id, full_name')
        .eq('user_id', user.id)
        .single();

      if (host) {
        setHostId(host.id);
        setHostName(host.full_name);
      }
    } catch (error) {
      console.error('Error loading host profile:', error);
    }
  };

  const loadMealData = async () => {
    try {
      setLoading(true);
      const meal = await getMealById(id);
      
      setFormData({
        title: meal.title || '',
        description: meal.description || '',
        price: meal.price || '',
        max_guests: meal.max_guests || '',
        category: meal.category || 'Tunisian',
        meal_type: meal.meal_type || 'dinner',
        image: meal.image || '',
        dietary_info: meal.dietary_info || [],
        available_days: meal.available_days || [],
        preparation_time: meal.preparation_time || '',
        location: meal.location || '',
        status: meal.status || 'active'
      });
    } catch (error) {
      console.error('Error loading meal:', error);
      alert('Failed to load meal data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setUploading(true);

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `meal-images/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('meals')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('meals')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image: publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hostId) {
      alert('You must be registered as a host to add meals');
      return;
    }

    // Validation
    if (!formData.title || !formData.description || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.available_days.length === 0) {
      alert('Please select at least one available day');
      return;
    }

    try {
      setLoading(true);

      const mealData = {
        ...formData,
        host_id: hostId,
        host: hostName,
        price: parseFloat(formData.price),
        max_guests: parseInt(formData.max_guests),
        preparation_time: parseInt(formData.preparation_time)
      };

      if (isEditing) {
        await updateMeal(id, mealData);
        alert('Meal updated successfully!');
      } else {
        await createMeal(mealData);
        alert('Meal created successfully!');
      }

      navigate('/host/meals');
    } catch (error) {
      console.error('Error saving meal:', error);
      console.error('Error details:', error.message, error.details, error.hint);
      alert(`Failed to save meal: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading meal data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Meal' : 'Add New Meal'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEditing ? 'Update your meal details' : 'Share your culinary creation with guests'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meal Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Traditional Tunisian Couscous"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your meal, ingredients, and what makes it special..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Type *
                </label>
                <select
                  name="meal_type"
                  value={formData.meal_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  {mealTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Capacity */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Pricing & Capacity</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price per Person (TND) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="25.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Guests *
              </label>
              <input
                type="number"
                name="max_guests"
                value={formData.max_guests}
                onChange={handleChange}
                min="1"
                placeholder="8"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prep Time (minutes) *
              </label>
              <input
                type="number"
                name="preparation_time"
                value={formData.preparation_time}
                onChange={handleChange}
                min="0"
                placeholder="120"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Meal Image</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            {uploading && (
              <p className="text-sm text-primary-600 mt-2">Uploading image...</p>
            )}
            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image}
                  alt="Meal preview"
                  className="h-48 w-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Dietary Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Dietary Information</h2>
          
          <div className="grid grid-cols-4 gap-3">
            {dietaryOptions.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dietary_info.includes(option)}
                  onChange={() => handleCheckboxChange('dietary_info', option)}
                  className="rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Availability *</h2>
          
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map(day => (
              <label
                key={day}
                className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  formData.available_days.includes(day)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.available_days.includes(day)}
                  onChange={() => handleCheckboxChange('available_days', day)}
                  className="sr-only"
                />
                <span className="text-xs font-medium">{day.slice(0, 3)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location/Address
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Tunis Medina"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="active">Active (Visible to guests)</option>
            <option value="paused">Paused (Temporarily hidden)</option>
            <option value="draft">Draft (Not published yet)</option>
          </select>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Meal' : 'Create Meal'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/host/meals')}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
