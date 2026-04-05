import React from 'react';
import { motion } from 'motion/react';
import { UserData } from '../types';
import { TrendingUp, Award, CheckCircle, BarChart3, Calendar } from 'lucide-react';

interface ProgressProps {
  userData: UserData;
}

export const Progress: React.FC<ProgressProps> = ({ userData }) => {
  const stats = [
    { label: 'Current Streak', value: `${userData.currentStreak} days`, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Best Streak', value: `${userData.bestStreak} days`, icon: Award, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Total Completed', value: userData.totalCompleted, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Level', value: userData.level, icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Progress</h1>
        <p className="text-slate-500">Keep track of your consistency and achievements.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl card-shadow flex items-center justify-between border border-slate-50"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* History List */}
      <div className="bg-white p-6 rounded-3xl card-shadow flex flex-col gap-6 border border-slate-50">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Last 7 Days
        </h3>
        
        <div className="flex flex-col gap-4">
          {userData.history.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4">No challenges completed yet.</p>
          ) : (
            userData.history.slice(0, 7).map((item, i) => (
              <motion.div 
                key={item.date}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">{item.text}</span>
                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded text-[8px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Simple Progress Visualization */}
      <div className="bg-white p-6 rounded-3xl card-shadow flex flex-col gap-6 border border-slate-50">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-energy" />
          Consistency Level
        </h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-slate-500">Current Streak Goal</span>
            <span className="text-energy font-bold">{userData.currentStreak} / 30 days</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((userData.currentStreak / 30) * 100, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-energy rounded-full"
            />
          </div>
          <p className="text-xs text-slate-400 text-center">
            {userData.currentStreak < 7 ? "You're just getting started! Keep it up." : 
             userData.currentStreak < 14 ? "Great job! You're building a solid habit." :
             userData.currentStreak < 30 ? "Amazing consistency! You're almost at a month." :
             "Unstoppable! You've mastered the daily habit."}
          </p>
        </div>
      </div>
    </div>
  );
};
