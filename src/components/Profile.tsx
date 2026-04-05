import React from 'react';
import { motion } from 'motion/react';
import { UserData, Level, Category } from '../types';
import { LEVELS, CATEGORIES } from '../constants';
import { Settings, LogOut, ChevronRight, UserCircle, Target, BarChart, Trash2, Tag, Check } from 'lucide-react';

interface ProfileProps {
  userData: UserData;
  onUpdateLevel: (level: Level) => void;
  onUpdateCategories: (categories: Category[]) => void;
  onReset: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ userData, onUpdateLevel, onUpdateCategories, onReset }) => {
  const toggleCategory = (cat: Category) => {
    if (userData.categories.includes(cat)) {
      if (userData.categories.length > 1) {
        onUpdateCategories(userData.categories.filter(c => c !== cat));
      }
    } else if (userData.categories.length < 3) {
      onUpdateCategories([...userData.categories, cat]);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500">Personalize your self-improvement journey.</p>
      </div>

      {/* User Info Card */}
      <div className="bg-white p-6 rounded-3xl card-shadow flex items-center gap-6 border border-slate-50">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
          <UserCircle className="w-12 h-12" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Growth Mindset</h2>
          <p className="text-slate-400 text-sm">Consistent for {userData.totalCompleted} days</p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-3xl card-shadow overflow-hidden border border-slate-50">
        <div className="p-6 border-b border-slate-50 flex items-center gap-3">
          <Tag className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-slate-800">Your Focus Areas</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  userData.categories.includes(cat)
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-100' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {cat}
                {userData.categories.includes(cat) && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400">
            Select 1 to 3 categories. Your daily challenge will be picked from these.
          </p>
        </div>
      </div>

      {/* Level Section */}
      <div className="bg-white rounded-3xl card-shadow overflow-hidden border border-slate-50">
        <div className="p-6 border-b border-slate-50 flex items-center gap-3">
          <BarChart className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-800">Intensity Level</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => onUpdateLevel(l)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  userData.level === l 
                    ? 'bg-indigo-500 text-white shadow-md shadow-indigo-100' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400">
            Higher levels mean more time-intensive or challenging tasks.
          </p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-4">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-between p-6 bg-red-50 text-red-600 rounded-3xl font-bold active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5" />
            <span>Reset All Progress</span>
          </div>
          <ChevronRight className="w-5 h-5 opacity-50" />
        </button>
        <p className="text-center text-[10px] text-slate-300 mt-4 px-6 uppercase tracking-widest">
          Warning: This action is permanent
        </p>
      </div>
    </div>
  );
};
