import React, { useState } from 'react';
import { Calendar, Users, FileText, Plus, ExternalLink } from 'lucide-react';
import ExternalEvents from './ExternalEvents';
import TeamUp from './TeamUp';
import OnDutyForms from './OnDutyForms';

const EventsLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'external' | 'teamup' | 'od'>('external');

  const tabs = [
    { id: 'external' as const, label: 'External Events', icon: Calendar },
    { id: 'teamup' as const, label: 'Team Up', icon: Users },
    { id: 'od' as const, label: 'On-Duty Forms', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Events & On-Duty</h1>
              <p className="text-gray-600 mt-1">Manage events, form teams, and submit OD requests</p>
            </div>
          </div>
          
          <div className="flex space-x-8 border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'external' && <ExternalEvents />}
        {activeTab === 'teamup' && <TeamUp />}
        {activeTab === 'od' && <OnDutyForms />}
      </div>
    </div>
  );
};

export default EventsLayout;