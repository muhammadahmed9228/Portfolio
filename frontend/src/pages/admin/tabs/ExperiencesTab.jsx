import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiences, addExperience, editExperience, removeExperience } from '../../../features/experiences/experienceSlice';
import Modal from '../../../components/Modal';
import { Plus, Pencil, Trash2, Calendar, MapPin, Building2, Loader2 } from 'lucide-react';

const ExperiencesTab = () => {
  const dispatch = useDispatch();
  const { experiences, isLoading } = useSelector((state) => state.experiences);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const [formData, setFormData] = useState({
    company: '',
    companyLogo: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrentRole: false,
    description: '', // Entered as multiline text, split into array
  });

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  const handleOpenCreateModal = () => {
    setEditingExperience(null);
    setFormData({
      company: '',
      companyLogo: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (exp) => {
    setEditingExperience(exp);
    setFormData({
      company: exp.company,
      companyLogo: exp.companyLogo || '',
      location: exp.location || '',
      startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      isCurrentRole: !exp.endDate,
      description: Array.isArray(exp.description) ? exp.description.join('\n') : exp.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      dispatch(removeExperience(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      company: formData.company,
      companyLogo: formData.companyLogo,
      location: formData.location,
      startDate: formData.startDate,
      endDate: formData.isCurrentRole ? null : formData.endDate,
      description: formData.description,
    };

    if (editingExperience) {
      dispatch(editExperience({ id: editingExperience._id, experienceData: payload })).then(() => {
        setIsModalOpen(false);
      });
    } else {
      dispatch(addExperience(payload)).then(() => {
        setIsModalOpen(false);
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 border border-slate-800 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white">Experience & Internship Manager</h2>
          <p className="text-slate-400 text-sm mt-1">Manage your work history, company details, and achievement bullets.</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
            <p className="text-sm">Loading work history...</p>
          </div>
        ) : experiences.length === 0 ? (
          <div className="p-12 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-500">
            <p className="text-base font-medium">No experience entries found.</p>
            <p className="text-xs mt-1">Click "Add Experience" above to document your work or internships.</p>
          </div>
        ) : (
          experiences.map((exp) => (
            <div key={exp._id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  {exp.companyLogo ? (
                    <img src={exp.companyLogo} alt={exp.company} className="w-12 h-12 rounded-xl object-contain bg-slate-950 p-2 border border-slate-800" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 border border-slate-700">
                      <Building2 className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {exp.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    onClick={() => handleOpenEditModal(exp)}
                    className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-2 list-disc list-inside text-sm text-slate-300">
                {exp.description.map((bullet, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="-ml-1">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExperience ? 'Edit Experience' : 'Add New Experience'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Acme Tech Solutions"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Remote / New York, NY"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Company Logo URL (Optional)</label>
              <input
                type="url"
                value={formData.companyLogo}
                onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Start Date *</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">End Date</label>
              <input
                type="date"
                disabled={formData.isCurrentRole}
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-40"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isCurrentRole"
              checked={formData.isCurrentRole}
              onChange={(e) => setFormData({ ...formData, isCurrentRole: e.target.checked })}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
            <label htmlFor="isCurrentRole" className="text-sm text-slate-300 cursor-pointer">
              I am currently working in this role
            </label>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase mb-1">
              Achievement Bullets (One point per line) *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Developed RESTful API endpoints using Node.js and Express&#10;Integrated JWT security and rate-limiting middleware&#10;Collaborated with frontend devs to optimize response times"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              {editingExperience ? 'Save Changes' : 'Add Experience'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExperiencesTab;