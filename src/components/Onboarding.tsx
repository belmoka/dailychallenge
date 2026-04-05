import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Category, Level } from '../types';
import { CATEGORIES, LEVELS } from '../constants';
import { Check, ChevronRight, Info } from 'lucide-react';

interface OnboardingProps {
  onComplete: (categories: Category[], level: Level) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [level, setLevel] = useState<Level>('Beginner');
  const [step, setStep] = useState(1);

  const toggleCategory = (cat: Category) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (selectedCategories.length > 0) setStep(2);
    } else {
      onComplete(selectedCategories, level);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Daily Challenge
          </h1>
          <p className="text-slate-500 text-lg">
            Small steps, big changes. Improve your life one day at a time.
          </p>
        </motion.div>

        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-slate-800">What areas do you want to improve?</h2>
              <p className="text-sm text-slate-400">Select 1 to 3 categories</p>
            </div>
            <div className="grid gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                    selectedCategories.includes(cat)
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="font-medium text-lg">{cat}</span>
                  {selectedCategories.includes(cat) && <Check className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-slate-800">Choose your level</h2>
              <p className="text-sm text-slate-400">This affects the intensity of your challenges</p>
            </div>
            <div className="grid gap-4">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                    level === l 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-lg">{l}</span>
                    <span className="text-sm opacity-70">
                      {l === 'Beginner' && '1-3 minutes per day'}
                      {l === 'Intermediate' && '5-10 minutes per day'}
                      {l === 'Advanced' && '15+ minutes per day'}
                    </span>
                  </div>
                  {level === l && <Check className="w-6 h-6" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mt-12">
          <button
            onClick={handleNext}
            disabled={step === 1 && selectedCategories.length === 0}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
              step === 1 && selectedCategories.length === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white shadow-lg shadow-blue-100'
            }`}
          >
            {step === 1 ? 'Next' : 'Start Improving'}
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {step === 1 && selectedCategories.length === 3 && (
            <p className="text-center text-xs text-blue-500 mt-4 flex items-center justify-center gap-1">
              <Info className="w-3 h-3" />
              Maximum 3 categories selected
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
