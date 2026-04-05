import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Onboarding } from './components/Onboarding';
import { Home } from './components/Home';
import { Progress } from './components/Progress';
import { Profile } from './components/Profile';
import { Confetti } from './components/Confetti';
import { UserData, Category, Level, Challenge } from './types';
import { CHALLENGES } from './constants';
import { Home as HomeIcon, BarChart3, User } from 'lucide-react';
import { handleShowInterstitial, isAndroidView } from './utils';

const STORAGE_KEY = 'daily_challenge_v2_user_data';

const INITIAL_DATA: UserData = {
  categories: ['Fitness'],
  level: 'Beginner',
  currentStreak: 0,
  bestStreak: 0,
  totalCompleted: 0,
  lastCompletedDate: null,
  todayChallengeId: null,
  yesterdayChallengeId: null,
  hasSwappedToday: false,
  swapCredits: 3,
  lastVisitDate: new Date().toISOString(),
  onboarded: false,
  history: [],
};

/**
 * Picks a challenge while balancing categories based on user history.
 * Uses a weighted probability system where less frequent categories get higher priority.
 */
function pickBalancedChallenge(
  userData: Pick<UserData, 'categories' | 'level' | 'history' | 'todayChallengeId' | 'yesterdayChallengeId'>,
  excludeIds: string[] = []
): Challenge {
  // 1. Filter challenges by level and selected categories
  const levelChallenges = CHALLENGES.filter(c =>
    userData.level === c.level && userData.categories.includes(c.category)
  );

  // 2. Filter out excluded IDs (today, yesterday, etc.)
  const availableChallenges = levelChallenges.filter(c => !excludeIds.includes(c.id));

  if (availableChallenges.length === 0) {
    // Fallback to any challenge in level if everything is excluded
    return levelChallenges[Math.floor(Math.random() * levelChallenges.length)] || CHALLENGES[0];
  }

  // 3. Calculate category weights based on history
  // We look at the entire history to determine long-term balance
  const categoryCounts: Record<string, number> = {};
  userData.categories.forEach(cat => (categoryCounts[cat] = 0));

  userData.history.forEach(item => {
    if (categoryCounts[item.category] !== undefined) {
      categoryCounts[item.category]++;
    }
  });

  // 4. Assign weights: Inverse frequency with smoothing
  // weight = 1 / (count + 1)
  // This ensures new users (count=0) have equal weights (1.0)
  // and frequently used categories have lower weights (e.g., count=5 -> weight=0.16)
  const categoryWeights: Record<string, number> = {};
  userData.categories.forEach(cat => {
    categoryWeights[cat] = 1 / (categoryCounts[cat] + 1);
  });

  // 5. Calculate cumulative weights for available challenges
  const weightedChallenges = availableChallenges.map(challenge => ({
    challenge,
    weight: categoryWeights[challenge.category] || 0.1
  }));

  const totalWeight = weightedChallenges.reduce((sum, item) => sum + item.weight, 0);

  // 6. Weighted random selection
  let random = Math.random() * totalWeight;
  for (const item of weightedChallenges) {
    random -= item.weight;
    if (random <= 0) {
      return item.challenge;
    }
  }

  // Fallback
  return availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
}

export default function App() {
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...INITIAL_DATA, ...parsed, history: parsed.history || [] };
    }
    return INITIAL_DATA;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'progress' | 'profile'>('home');
  const [showConfetti, setShowConfetti] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  // Daily Reset & Challenge Selection Logic
  const checkDailyReset = useCallback(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const lastVisitStr = userData.lastVisitDate.split('T')[0];

    if (todayStr !== lastVisitStr) {
      // It's a new day!
      const yesterdayStr = new Date(now.getTime() - 86400000).toISOString().split('T')[0];
      const lastCompletedStr = userData.lastCompletedDate ? userData.lastCompletedDate.split('T')[0] : null;

      let newStreak = userData.currentStreak;

      // If the user missed yesterday, reset streak
      if (lastCompletedStr !== yesterdayStr && lastCompletedStr !== todayStr) {
        newStreak = 0;
      }

      // Pick a new challenge based on categories and level with balancing
      const randomChallenge = pickBalancedChallenge(userData, [userData.todayChallengeId || '']);

      setUserData(prev => ({
        ...prev,
        currentStreak: newStreak,
        yesterdayChallengeId: prev.todayChallengeId,
        todayChallengeId: randomChallenge.id,
        hasSwappedToday: false,
        lastVisitDate: now.toISOString(),
      }));
    } else if (!userData.todayChallengeId && userData.onboarded) {
      // First time today
      const randomChallenge = pickBalancedChallenge(userData);

      setUserData(prev => ({ ...prev, todayChallengeId: randomChallenge.id }));
    }
  }, [userData.lastVisitDate, userData.lastCompletedDate, userData.currentStreak, userData.level, userData.todayChallengeId, userData.onboarded, userData.categories]);

  useEffect(() => {
    if (userData.onboarded) {
      checkDailyReset();
    }
  }, [userData.onboarded, checkDailyReset]);

  const handleOnboardingComplete = (categories: Category[], level: Level) => {
    const randomChallenge = pickBalancedChallenge({
      categories,
      level,
      history: [],
      todayChallengeId: null,
      yesterdayChallengeId: null,
    });

    setUserData(prev => ({
      ...prev,
      categories,
      level,
      onboarded: true,
      todayChallengeId: randomChallenge.id,
      lastVisitDate: new Date().toISOString(),
    }));
  };

  const handleComplete = () => {
    if (isAndroidView()) window.AndroidBridge?.showInterstitialAd()

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    if (userData.lastCompletedDate?.split('T')[0] === todayStr) return;

    const todayChallenge = CHALLENGES.find(c => c.id === userData.todayChallengeId);
    if (!todayChallenge) return;

    const newStreak = userData.currentStreak + 1;
    const newBest = Math.max(userData.bestStreak, newStreak);

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    setUserData(prev => ({
      ...prev,
      currentStreak: newStreak,
      bestStreak: newBest,
      totalCompleted: prev.totalCompleted + 1,
      lastCompletedDate: now.toISOString(),
      history: [
        { id: todayChallenge.id, text: todayChallenge.text, category: todayChallenge.category, date: now.toISOString() },
        ...prev.history
      ].slice(0, 30)
    }));
  };

  const handleSwap = () => {
    if (userData.swapCredits <= 0) return;

    const randomChallenge = pickBalancedChallenge(userData, [
      userData.todayChallengeId || '',
      userData.yesterdayChallengeId || ''
    ]);

    setUserData(prev => ({
      ...prev,
      todayChallengeId: randomChallenge.id,
      swapCredits: prev.swapCredits - 1,
      hasSwappedToday: true,
    }));
  };

  const handleWatchAd = () => {
    // Simulate watching an ad
    setUserData(prev => ({
      ...prev,
      swapCredits: prev.swapCredits + 2
    }));
  };

  const handleUpdateLevel = (level: Level) => {
    setUserData(prev => ({ ...prev, level }));
  };

  const handleUpdateCategories = (categories: Category[]) => {
    setUserData(prev => ({ ...prev, categories }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setUserData(INITIAL_DATA);
      setActiveTab('home');
    }
  };

  if (!userData.onboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const todayChallenge = CHALLENGES.find(c => c.id === userData.todayChallengeId) || null;
  const isCompletedToday = userData.lastCompletedDate?.split('T')[0] === new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Main Content */}
      <main className="flex-1 p-6 pt-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Home
                userData={userData}
                todayChallenge={todayChallenge}
                onComplete={handleComplete}
                onSwap={handleSwap}
                onWatchAd={handleWatchAd}
                isCompleted={isCompletedToday}
              />
            </motion.div>
          )}
          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Progress userData={userData} />
            </motion.div>
          )}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Profile
                userData={userData}
                onUpdateLevel={handleUpdateLevel}
                onUpdateCategories={handleUpdateCategories}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-slate-100 px-8 py-4 flex justify-between items-center z-40">
        <NavButton
          active={activeTab === 'home'}
          onClick={() => setActiveTab('home')}
          icon={HomeIcon}
          label="Home"
        />
        <NavButton
          active={activeTab === 'progress'}
          onClick={() => setActiveTab('progress')}
          icon={BarChart3}
          label="Stats"
        />
        <NavButton
          active={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
          icon={User}
          label="Profile"
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon: Icon, label }: {
  active: boolean,
  onClick: () => void,
  icon: any,
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-slate-600'
        }`}
    >
      <Icon className={`w-6 h-6 ${active ? 'fill-blue-50' : ''}`} />
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
      {active && (
        <motion.div
          layoutId="nav-dot"
          className="w-1 h-1 bg-blue-600 rounded-full"
        />
      )}
    </button>
  );
}
