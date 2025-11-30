import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { getHostExperiences, deleteExperience, updateExperience } from '../../services/api';
import Button from '../Button';
import Loading from '../Loading';
import { useAppContext } from '../../context/AppContext';

const HostExperiencesList = () => {
  const navigate = useNavigate();
  const { addNotification } = useAppContext();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: host } = await supabase
        .from('hosts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!host) return;

      const data = await getHostExperiences(host.id);
      setExperiences(data || []);
    } catch (error) {
      console.error('Error loading experiences:', error);
      addNotification('Failed to load experiences', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) {
      return;
    }

    try {
      await deleteExperience(id);
      addNotification('Experience deleted successfully', 'success');
      loadExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
      addNotification('Failed to delete experience', 'error');
    }
  };

  const handleStatusToggle = async (experience) => {
    const newStatus = experience.status === 'active' ? 'paused' : 'active';
    
    try {
      await updateExperience(experience.id, { status: newStatus });
      addNotification(`Experience ${newStatus === 'active' ? 'activated' : 'paused'}`, 'success');
      loadExperiences();
    } catch (error) {
      console.error('Error updating status:', error);
      addNotification('Failed to update status', 'error');
    }
  };

  const filteredExperiences = experiences.filter(exp => {
    if (filterStatus === 'all') return true;
    return exp.status === filterStatus;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Experiences</h1>
          <p className="text-gray-600 mt-2">Manage your hosted experiences</p>
        </div>
        <Button onClick={() => navigate('/host/experiences/add')}>
          + Add New Experience
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                filterStatus === 'all'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All ({experiences.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                filterStatus === 'active'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active ({experiences.filter(m => m.status === 'active').length})
            </button>
            <button
              onClick={() => setFilterStatus('paused')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                filterStatus === 'paused'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Paused ({experiences.filter(m => m.status === 'paused').length})
            </button>
            <button
              onClick={() => setFilterStatus('draft')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                filterStatus === 'draft'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Draft ({experiences.filter(m => m.status === 'draft').length})
            </button>
          </nav>
        </div>
      </div>

      {/* Experiences List */}
      {filteredExperiences.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No experiences found</h3>
          <p className="text-gray-600 mb-6">
            {filterStatus === 'all' 
              ? "Get started by creating your first experience!"
              : `No ${filterStatus} experiences yet.`}
          </p>
          {filterStatus === 'all' && (
            <Button onClick={() => navigate('/host/experiences/add')}>
              Create Your First Experience
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExperiences.map((experience) => (
                <tr key={experience.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {experience.image && (
                        <img
                          src={experience.image}
                          alt={experience.title}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {experience.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {experience.tags?.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {experience.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {experience.price} DT
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {experience.duration || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      experience.status === 'active' ? 'bg-green-100 text-green-800' :
                      experience.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      experience.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {experience.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ⭐ {experience.rating || 0} ({experience.reviews || 0})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/host/experiences/edit/${experience.id}`)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleStatusToggle(experience)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {experience.status === 'active' ? 'Pause' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(experience.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HostExperiencesList;
