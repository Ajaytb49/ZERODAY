import React, { useState } from 'react';
import { FileText, Upload, Calendar, Building, User, Hash, CheckCircle, Clock, XCircle } from 'lucide-react';

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
      name: 'Rajesh Kumar',
      rollNo: '20CS045',
      department: 'CSE',
      section: 'A',
      date: '2024-02-15',
      eventName: 'Annual Technical Symposium',
      status: 'approved',
      submittedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'external',
      name: 'Priya Sharma',
      rollNo: '20ECE023',
      department: 'ECE',
      section: 'B',
      date: '2024-02-20',
      eventDetails: 'Inter-College Hackathon on AI and Machine Learning',
      universityName: 'IIT Madras',
      status: 'pending',
      submittedAt: '2024-01-16T14:20:00Z',
    },
    {
      id: '3',
      type: 'internal',
      name: 'Arjun Patel',
      rollNo: '20MECH012',
      department: 'MECH',
      section: 'C',
      date: '2024-02-18',
      eventName: 'Sports Day - Cricket Tournament',
      status: 'rejected',
      submittedAt: '2024-01-17T09:15:00Z',
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
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">On-Duty Forms</h2>
        <p className="text-gray-600">Submit On-Duty requests for college and external events</p>
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
            Internal Events OD
          </button>
          <button
            onClick={() => setActiveTab('external')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'external'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            External Events OD
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-1">
              {activeTab === 'internal' ? 'Internal Event OD Form' : 'External Event OD Form'}
            </h4>
            <p className="text-sm text-gray-600">
              {activeTab === 'internal' 
                ? 'For events conducted within our college campus'
                : 'For events conducted by other colleges/universities (requires proof documents)'}
            </p>
          </div>
          
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
                  placeholder="Enter your full name"
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
                  placeholder="e.g., 20CS045"
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
                  <option value="CHEM">Chemical Engineering</option>
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
                  <option value="E">Section E</option>
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
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            {/* Internal Event Fields */}
            {activeTab === 'internal' && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Internal Event Details</h4>
                  <p className="text-blue-700 text-sm">
                    This form is for events organized by our college (workshops, fests, competitions, etc.)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                  <input
                    type="text"
                    value={formData.eventName}
                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Annual Tech Fest, Cultural Program, Sports Day"
                    required
                  />
                </div>
              </div>
            )}

            {/* External Event Fields */}
            {activeTab === 'external' && (
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">External Event Details</h4>
                  <p className="text-orange-700 text-sm">
                    This form is for events organized by other colleges/universities. Proof documents are mandatory.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Details</label>
                  <textarea
                    value={formData.eventDetails}
                    onChange={(e) => setFormData({ ...formData, eventDetails: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide detailed information about the event (name, type, duration, etc.)"
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
                    placeholder="e.g., IIT Madras, Anna University, NIT Trichy"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Upload className="w-4 h-4 inline mr-1" />
                    Proof Documents (Required)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload event invitation, registration confirmation, brochure, or related documents (PDF, JPG, PNG, DOC)
                  </p>
                  {formData.proof.length > 0 && (
                    <div className="mt-2 p-2 bg-green-50 rounded">
                      <p className="text-sm text-green-700 font-medium">Selected files:</p>
                      <ul className="text-xs text-green-600 mt-1">
                        {formData.proof.map((file, index) => (
                          <li key={index} className="flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                          </li>
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
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Submit OD Request</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Previous Submissions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Your OD Submissions</h3>
            <span className="text-sm text-gray-500">{submissions.length} total submissions</span>
          </div>
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
                <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(submission.status)}`}>
                  {getStatusIcon(submission.status)}
                  <span>{submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}</span>
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <p className="capitalize text-blue-600">{submission.type} Event</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Event Date:</span>
                  <p>{new Date(submission.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Department:</span>
                  <p>{submission.department}-{submission.section}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Submitted:</span>
                  <p>{new Date(submission.submittedAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              {submission.type === 'external' && submission.universityName && (
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Institution:</span> 
                  <span className="ml-1 text-purple-600">{submission.universityName}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {submissions.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Submissions Yet</h3>
            <p className="text-gray-500">Your OD form submissions will appear here once you submit them.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnDutyForms;