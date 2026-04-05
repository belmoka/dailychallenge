import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Challenge, UserData } from '../types';
import { CheckCircle2, RotateCcw, Flame, Calendar, Trophy, Clock, Tag, PlayCircle, X } from 'lucide-react';

interface HomeProps {
  userData: UserData;
  todayChallenge: Challenge | null;
  onComplete: () => void;
  onSwap: () => void;
  onWatchAd: () => void;
  isCompleted: boolean;
}

export const Home: React.FC<HomeProps> = ({ 
  userData, 
  todayChallenge, 
  onComplete, 
  onSwap,
  onWatchAd,
  isCompleted 
}) => {
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [adProgress, setAdProgress] = useState(0);

  useEffect(() => {
    window.rewardUser = () => {
      onWatchAd()
    }
  },[])
 
  const startAd = () => {

    window.AndroidBridge?.showRewardedAd()

    return
    setIsWatchingAd(true);
    setAdProgress(0);
    
    const duration = 3000; // 3 seconds mock ad
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAdProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsWatchingAd(false);
          onWatchAd();
        }, 500);
      }
    }, interval);
  };

  return (
    <div className="flex flex-col gap-8 pb-24">
      {/* Ad Overlay */}
      <AnimatePresence>
        {isWatchingAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 text-white"
          >
            <div className="absolute top-8 right-8 text-slate-500">
              <X className="w-6 h-6" />
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center animate-bounce">
                <PlayCircle className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Daily Challenge Premium</h3>
                <p className="text-slate-400">Unlock your full potential with our premium features.</p>
              </div>
            </div>

            <div className="w-full max-w-xs bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${adProgress}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Rewarding in {Math.ceil((100 - adProgress) / 33)}s...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-4 rounded-2xl card-shadow flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Streak</p>
            <p className="text-xl font-bold text-slate-800">{userData.currentStreak} days</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-4 rounded-2xl card-shadow flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Best</p>
            <p className="text-xl font-bold text-slate-800">{userData.bestStreak} days</p>
          </div>
        </motion.div>
      </div>

      {/* Today's Challenge Card */}
      <div className="flex-1 flex flex-col justify-center min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={todayChallenge?.id || 'no-challenge'}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className={`relative overflow-hidden bg-white rounded-3xl p-8 card-shadow flex flex-col items-center text-center gap-6 border-2 transition-all duration-500 ${
              isCompleted ? 'border-green-100 bg-green-50/30' : 'border-transparent'
            }`}
          >
            <div className="flex items-center gap-2 text-slate-400 font-medium text-xs tracking-widest uppercase">
              <Calendar className="w-4 h-4" />
              <span>TODAY'S CHALLENGE</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {todayChallenge?.category}
                </span>
                <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {todayChallenge?.duration}
                </span>
              </div>

              <h2 className={`text-3xl font-bold tracking-tight leading-tight max-w-[280px] ${
                isCompleted ? 'text-green-600' : 'text-slate-900'
              }`}>
                {todayChallenge?.text || 'Loading...'}
              </h2>
              
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                {userData.level} Level
              </span>
            </div>

            {isCompleted ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-100">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <p className="text-green-600 font-bold text-lg">Well Done!</p>
                <p className="text-slate-400 text-sm">You're one step closer.</p>
              </motion.div>
            ) : (
              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={onComplete}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg shadow-blue-100 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  Complete
                </button>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={onSwap}
                    disabled={userData.swapCredits <= 0}
                    className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                      userData.swapCredits > 0 
                        ? 'bg-white text-slate-400 hover:text-slate-600' 
                        : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Swap Challenge ({userData.swapCredits} left)
                  </button>

                  {userData.swapCredits <= 1 && (
                    <button
                      onClick={startAd}
                      className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors border border-blue-100 border-dashed"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Watch Ad for +1 Swap
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Encouragement */}
      {!isCompleted && (
        <p className="text-center text-slate-400 text-sm italic font-medium px-8">
          "Small daily improvements are the key to long-term results."
        </p>
      )}
    </div>
  );
};
