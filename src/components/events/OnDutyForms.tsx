import React, { useState } from 'react';
import { FileText, Upload, Calendar, Building, User, Hash } from 'lucide-react';

interface ODForm {
  id: string;
  type: 'internal' | 'external';
  name: string;
  rollNo: string;
  department: string;
  section: string;
  date: string;
  eventName?: string;
  eventDetails?: string;
  universityName?: string;
  proof?: File[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const OnDutyForms: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');
  const [submissions, setSubmissions] = useState<ODForm[]>([
    {
      id: '1',
      type: 'internal',
      name: 'John Doe',
      rollNo: '20CS001',
      department: 'CSE',
      section: 'A',
      date: '2024-01-20',
      eventName: 'Tech Symposium 2024',
      status: 'approved',
      submittedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'external',
      name: 'Jane Smith',
      rollNo: '20ECE015',
      department: 'ECE',
      section: 'B',
      date: '2024-01-25',
      eventDetails: 'National Level Workshop on IoT and Machine Learning',
      universityName: 'IIT Madras',
      status: 'pending',
      submittedAt: '2024-01-16T14:20:00Z',
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    department: '',
    section: '',
    date: '',
    eventName: '',
    eventDetails: '',
    universityName: '',
    proof: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSubmission: ODForm = {
      id: Date.now().toString(),
      type: activeTab,
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    setSubmissions([...submissions, newSubmission]);
    
    // Reset form
    setFormData({
      name: '',
      rollNo: '',
      department: '',
      section: '',
      date: '',
      eventName: '',
      eventDetails: '',
      universityName: '',
      proof: [],
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        proof: Array.from(e.target.files),
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">On-Duty Forms</h2>
        <p className="text-gray-600">Submit OD requests for internal and external events</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('internal')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'internal'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Internal Events
          </button>
          <button
            onClick={() => setActiveTab('external')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'external'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            External Events
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Hash className="w-4 h-4 inline mr-1" />
                  Roll Number
                </label>
                <input
                  type="text"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="CSE">Computer Science Engineering</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="EEE">Electrical & Electronics</option>
                  <option value="MECH">Mechanical Engineering</option>
                  <option value="CIVIL">Civil Engineering</option>
                  <option value="IT">Information Technology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Internal Event Fields */}
            {activeTab === 'internal' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                <input
                  type="text"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Annual Tech Fest, Cultural Program"
                  required
                />
              </div>
            )}

            {/* External Event Fields */}
            {activeTab === 'external' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Details</label>
                  <textarea
                    value={formData.eventDetails}
                    onChange={(e) => setFormData({ ...formData, eventDetails: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide detailed information about the external event"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Building className="w-4 h-4 inline mr-1" />
                    University/Institution Name
                  </label>
                  <input
                    type="text"
                    value={formData.universityName}
                    onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., IIT Madras, Anna University"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Upload className="w-4 h-4 inline mr-1" />
                    Proof (Documents/Photos)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload event invitation, registration confirmation, or related documents
                  </p>
                  {formData.proof.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Selected files:</p>
                      <ul className="text-xs text-gray-500">
                        {formData.proof.map((file, index) => (
                          <li key={index}>• {file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Submit OD Request
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Previous Submissions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Previous Submissions</h3>
        </div>
        <div className="divide-y">
          {submissions.map((submission) => (
            <div key={submission.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {submission.type === 'internal' ? submission.eventName : submission.eventDetails}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {submission.name} • {submission.rollNo} • {submission.department}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                  {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Type:</span>
                  <p className="capitalize">{submission.type}</p>
                </div>
                <div>
                  <span className="font-medium">Event Date:</span>
                  <p>{new Date(submission.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium">Section:</span>
                  <p>{submission.section}</p>
                </div>
                <div>
                  <span className="font-medium">Submitted:</span>
                  <p>{new Date(submission.submittedAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              {submission.type === 'external' && submission.universityName && (
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Institution:</span> {submission.universityName}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnDutyForms;