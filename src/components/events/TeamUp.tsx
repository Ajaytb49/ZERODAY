import React, { useState } from 'react';
import { Users, Plus, Send, Filter, Search, UserCheck, Clock } from 'lucide-react';

interface TeamRequest {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Academic';
  requiredMembers: number;
  currentMembers: number;
  createdBy: string;
  createdAt: string;
  studentType: 'Day Scholar' | 'Hosteller' | 'Both';
  department: string;
  skills?: string[];
  deadline: string;
}

interface JoinRequest {
  id: string;
  teamId: string;
  studentName: string;
  rollNo: string;
  department: string;
  studentType: 'Day Scholar' | 'Hosteller';
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const TeamUp: React.FC = () => {
  const [teamRequests, setTeamRequests] = useState<TeamRequest[]>([
    {
      id: '1',
      title: 'Need Team for Inter-College Hackathon',
      description: 'Looking for passionate developers to join our team for the upcoming 48-hour hackathon. We need frontend, backend, and UI/UX skills.',
      category: 'Technical',
      requiredMembers: 4,
      currentMembers: 2,
      createdBy: 'Rahul Kumar (20CS045)',
      createdAt: '2024-01-15',
      studentType: 'Both',
      department: 'CSE',
      skills: ['React', 'Node.js', 'Python', 'UI/UX'],
      deadline: '2024-02-01',
    },
    {
      id: '2',
      title: 'Classical Dance Group Formation',
      description: 'Forming a Bharatanatyam dance group for upcoming cultural competitions. Looking for experienced dancers.',
      category: 'Cultural',
      requiredMembers: 6,
      currentMembers: 3,
      createdBy: 'Priya Sharma (20ECE023)',
      createdAt: '2024-01-14',
      studentType: 'Hosteller',
      department: 'Any',
      deadline: '2024-01-25',
    },
    {
      id: '3',
      title: 'Cricket Team for Inter-Department Tournament',
      description: 'Need players for our department cricket team. All positions open, especially looking for bowlers.',
      category: 'Sports',
      requiredMembers: 11,
      currentMembers: 7,
      createdBy: 'Arjun Patel (20MECH012)',
      createdAt: '2024-01-16',
      studentType: 'Day Scholar',
      department: 'MECH',
      deadline: '2024-01-30',
    }
  ]);

  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    category: 'All',
    studentType: 'All',
    department: 'All'
  });

  const [newTeamRequest, setNewTeamRequest] = useState<Partial<TeamRequest>>({
    title: '',
    description: '',
    category: 'Technical',
    requiredMembers: 2,
    studentType: 'Both',
    department: '',
    skills: [],
    deadline: '',
  });

  const [joinRequestForm, setJoinRequestForm] = useState({
    studentName: '',
    rollNo: '',
    department: '',
    studentType: 'Day Scholar' as 'Day Scholar' | 'Hosteller',
    message: '',
  });

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamRequest.title && newTeamRequest.description) {
      const teamRequest: TeamRequest = {
        ...newTeamRequest as TeamRequest,
        id: Date.now().toString(),
        currentMembers: 1,
        createdBy: 'Current User', // This would come from auth context
        createdAt: new Date().toISOString().split('T')[0],
      };
      setTeamRequests([...teamRequests, teamRequest]);
      setNewTeamRequest({
        title: '',
        description: '',
        category: 'Technical',
        requiredMembers: 2,
        studentType: 'Both',
        department: '',
        skills: [],
        deadline: '',
      });
      setShowCreateForm(false);
    }
  };

  const handleJoinRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (showJoinForm && joinRequestForm.studentName && joinRequestForm.rollNo) {
      const request: JoinRequest = {
        id: Date.now().toString(),
        teamId: showJoinForm,
        ...joinRequestForm,
        status: 'pending',
      };
      setJoinRequests([...joinRequests, request]);
      setJoinRequestForm({
        studentName: '',
        rollNo: '',
        department: '',
        studentType: 'Day Scholar',
        message: '',
      });
      setShowJoinForm(null);
    }
  };

  const filteredTeams = teamRequests.filter(team => {
    return (filter.category === 'All' || team.category === filter.category) &&
           (filter.studentType === 'All' || team.studentType === 'Both' || team.studentType === filter.studentType) &&
           (filter.department === 'All' || team.department === filter.department || team.department === 'Any');
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Up</h2>
          <p className="text-gray-600">Create team requests and connect with fellow students</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Request</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <div className="flex items-center space-x-2 mb-3">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Filter Team Requests</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Academic">Academic</option>
              <option value="Project">Project Work</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Type Preference</label>
            <select
              value={filter.studentType}
              onChange={(e) => setFilter({ ...filter, studentType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Day Scholar">Day Scholar</option>
              <option value="Hosteller">Hosteller</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={filter.department}
              onChange={(e) => setFilter({ ...filter, department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="IT">IT</option>
              <option value="Any">Any Department</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create Team Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h3 className="text-lg font-semibold mb-4">Create New Team Request</h3>
          <p className="text-gray-600 text-sm mb-4">
            Fill out the details below to create a team request. Other students will be able to see and join your team.
          </p>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Title</label>
                <input
                  type="text"
                  value={newTeamRequest.title}
                  onChange={(e) => setNewTeamRequest({ ...newTeamRequest, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Need team for hackathon, Looking for dance partners"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newTeamRequest.category}
                  onChange={(e) => setNewTeamRequest({ ...newTeamRequest, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Academic">Academic</option>
                  <option value="Project">Project Work</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Team Size Needed</label>
                <input
                  type="number"
                  min="2"
                  max="20"
                  value={newTeamRequest.requiredMembers}
                  onChange={(e) => setNewTeamRequest({ ...newTeamRequest, requiredMembers: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Type Preference</label>
                <select
                  value={newTeamRequest.studentType}
                  onChange={(e) => setNewTeamRequest({ ...newTeamRequest, studentType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Both">Both Day Scholar & Hosteller</option>
                  <option value="Day Scholar">Day Scholar Only</option>
                  <option value="Hosteller">Hosteller Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Preference</label>
                <select
                  value={newTeamRequest.department}
                  onChange={(e) => setNewTeamRequest({ ...newTeamRequest, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Any">Any Department</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="IT">IT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={newTeamRequest.deadline}
                  onChange={(e) => setNewTeamRequest({ ...newTeamRequest, deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newTeamRequest.description}
                onChange={(e) => setNewTeamRequest({ ...newTeamRequest, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what you're looking for, required skills, event details, etc."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (Optional)</label>
              <input
                type="text"
                placeholder="e.g., React, Python, Dancing, Cricket, etc. (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
                  setNewTeamRequest({ ...newTeamRequest, skills });
                }}
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Post Team Request
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Join Request Form */}
      {showJoinForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h3 className="text-lg font-semibold mb-4">Send Join Request</h3>
          <p className="text-gray-600 text-sm mb-4">
            Fill out your details to send a request to join this team. The team creator will review your request.
          </p>
          <form onSubmit={handleJoinRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={joinRequestForm.studentName}
                  onChange={(e) => setJoinRequestForm({ ...joinRequestForm, studentName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                <input
                  type="text"
                  value={joinRequestForm.rollNo}
                  onChange={(e) => setJoinRequestForm({ ...joinRequestForm, rollNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={joinRequestForm.department}
                  onChange={(e) => setJoinRequestForm({ ...joinRequestForm, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="IT">IT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Type</label>
                <select
                  value={joinRequestForm.studentType}
                  onChange={(e) => setJoinRequestForm({ ...joinRequestForm, studentType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Day Scholar">Day Scholar</option>
                  <option value="Hosteller">Hosteller</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                value={joinRequestForm.message}
                onChange={(e) => setJoinRequestForm({ ...joinRequestForm, message: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Introduce yourself and explain why you'd be a great fit for this team..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Join Request
              </button>
              <button
                type="button"
                onClick={() => setShowJoinForm(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                {team.category}
              </span>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <UserCheck className="w-3 h-3" />
                <span>{team.currentMembers}/{team.requiredMembers}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{team.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{team.description}</p>
            
            <div className="space-y-2 text-sm text-gray-500 mb-4">
              <div className="flex justify-between">
                <span>Created by:</span>
                <span className="font-medium text-gray-700">{team.createdBy}</span>
              </div>
              <div className="flex justify-between">
                <span>Student Type:</span>
                <span className="font-medium text-gray-700">{team.studentType}</span>
              </div>
              <div className="flex justify-between">
                <span>Department:</span>
                <span className="font-medium text-gray-700">{team.department}</span>
              </div>
              {team.deadline && (
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Deadline:</span>
                  </span>
                  <span className="font-medium text-red-600">{new Date(team.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            
            {team.skills && team.skills.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Required Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {team.skills.map((skill, index) => (
                    <span key={index} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{team.requiredMembers - team.currentMembers} spots left</span>
              </div>
              <button
                onClick={() => setShowJoinForm(team.id)}
                disabled={team.currentMembers >= team.requiredMembers}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <Send className="w-4 h-4" />
                <span>{team.currentMembers >= team.requiredMembers ? 'Full' : 'Join'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Team Requests Found</h3>
          <p className="text-gray-500">
            {teamRequests.length === 0 
              ? 'Be the first to create a team request!' 
              : 'Try adjusting your filters to see more results.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamUp;