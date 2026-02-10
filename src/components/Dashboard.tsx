import React from 'react';
import { Stats } from '../types';
import { TrendingUp, BookOpen, Target, Calendar } from 'lucide-react';

interface DashboardProps {
  stats: Stats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Totalt antal lösningar',
      value: stats.totalSolutions,
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Denna vecka',
      value: stats.thisWeek,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Fysik',
      value: stats.physicsCount,
      icon: Target,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Matematik',
      value: stats.mathCount,
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text mb-2">Översikt</h1>
        <p className="text-text-secondary">Dina tekniska basårs-lösningar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-2xl font-bold text-text mb-1">{stat.value}</div>
            <div className="text-sm text-text-secondary">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-text mb-4">Senaste aktivitet</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-text">Ny lösning tillagd: Derivata av polynomfunktioner</span>
            <span className="text-xs text-text-secondary ml-auto">2 timmar sedan</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-text">Lösning uppdaterad: Integrering med partialbråksuppdelning</span>
            <span className="text-xs text-text-secondary ml-auto">1 dag sedan</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-text">Ny anteckning: Kedjeregeln</span>
            <span className="text-xs text-text-secondary ml-auto">3 dagar sedan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
