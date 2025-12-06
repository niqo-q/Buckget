import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background - Black to Blue */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0F0A2E] to-[#2820FF]"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-6 pt-20 pb-10">
        {/* Logo */}
        <motion.div
          className="w-32 h-32 mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#2820FF] to-[#4F46E5] rounded-full flex items-center justify-center shadow-2xl">
            <Flame className="w-16 h-16 text-[#FEFF09]" />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.h1
            className="text-6xl text-white mb-4"
            style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 800 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            BuckGet
          </motion.h1>
          <motion.p
            className="text-2xl text-white/80 mb-12 px-8"
            style={{ fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Access your wages when you need them
          </motion.p>

          {/* Features */}
          <motion.div
            className="space-y-4 mb-16 w-full max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4">
              <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                💸 Get paid early
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4">
              <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                🎯 Smart savings buckets
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4">
              <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                🤖 AI-powered finance tips
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={onGetStarted}
          className="w-full max-w-sm bg-[#FEFF09] text-[#0F172A] py-5 rounded-full shadow-xl"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
}
