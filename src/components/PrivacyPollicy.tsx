import React from 'react';
import { motion } from 'motion/react';
import { Shield, ChevronLeft, Lock, Eye, Database, Globe } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '../lib/utils';

interface PrivacyPolicyProps {
  accentClass?: string;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({  accentClass = "text-blue-400" }) => {
  const sections = [
    {
      title: "Data Collection",
      icon: Database,
      content: "Satisfy Me is designed to be a private, local-first experience. We do not collect any personally identifiable information (PII). Your progress, points, and unlocked themes are stored locally on your device."
    },
    {
      title: "How We Use Data",
      icon: Eye,
      content: "Any data stored locally is used solely to provide the core functionality of the app, such as tracking your level and maintaining your preferences."
    },
    {
      title: "Third-Party Services",
      icon: Globe,
      content: "The app may display advertisements provided by third-party networks. These networks may collect anonymous device identifiers to serve relevant ads. We do not share your personal data with these providers."
    },
    {
      title: "Security",
      icon: Lock,
      content: "We take reasonable measures to protect any local data stored on your device. However, as the app does not have a backend, the security of your data largely depends on the security of your physical device."
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="p-6 pt-12 flex items-center gap-4 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
        <Link 
          to={"/"}
          className="p-2 rounded-full bg-white/10 active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Shield className={cn("w-6 h-6", accentClass)} />
            Privacy Policy
          </h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Last Updated: April 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-32 scrollbar-hide">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-[2rem] bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("p-3 rounded-2xl bg-white/5", accentClass)}>
                  <section.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{section.title}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                {section.content}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center p-6"
          >
            <p className="text-slate-500 text-xs leading-loose">
              By using Anti Stress - Relax And Satisfy, you agree to the terms outlined in this policy. 
              If you have any questions, please contact us through the official support channels.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
