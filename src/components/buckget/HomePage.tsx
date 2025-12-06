import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { useWallet } from '../../App';

interface HomePageProps {
  onNavigate: (page: 'transfer') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { user, wallet } = useWallet();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen p-6 text-white">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl mb-1" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 800 }}>
              {getGreeting()}
            </h1>
            <p className="text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
              {user.name}
            </p>
          </div>
          <div className="text-5xl">
            🦎
          </div>
        </div>
      </motion.div>

      {/* Hero Card - Available Wages */}
      <motion.div
        className="bg-white rounded-[2.5rem] p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-[#FEFF09]" />
          <p className="text-[#0F172A]/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Available Wages
          </p>
        </div>
        <p
          className="text-6xl mb-2 text-[#0F172A]"
          style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 800 }}
        >
          ${wallet.currentAvailable.toFixed(2)}
        </p>
        <p className="text-[#0F172A]/50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          Earned from {(wallet.currentAvailable / user.hourlyRate).toFixed(1)} hours @ ${user.hourlyRate}/hr
        </p>
      </motion.div>

      {/* The Golden Hour Card */}
      <motion.div
        className="bg-[#FEFF09] rounded-[2.5rem] p-8 mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-6 h-6 text-[#0F172A]" />
            <span className="text-[#0F172A]/70 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              INSTANT ACCESS
            </span>
          </div>
          <h2
            className="text-4xl text-[#0F172A] mb-4"
            style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 800 }}
          >
            Unlock your wages
          </h2>
          <p className="text-[#0F172A]/70 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Access your earned wages instantly. No waiting for payday.
          </p>
          <motion.button
            onClick={() => onNavigate('transfer')}
            className="bg-[#0F172A] text-[#FEFF09] px-8 py-4 rounded-full flex items-center gap-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Unlock Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F172A]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-white rounded-3xl p-5">
          <p className="text-[#0F172A]/70 text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Total Saved
          </p>
          <p
            className="text-3xl text-[#0F172A]"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}
          >
            ${wallet.totalSaved.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-3xl p-5">
          <p className="text-[#0F172A]/70 text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Active Goals
          </p>
          <p
            className="text-3xl text-[#0F172A]"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}
          >
            6
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm text-white/70 mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
          QUICK ACTIONS
        </h3>
        <motion.button
          className="w-full bg-white rounded-2xl p-4 text-left hover:bg-white/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-[#0F172A]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                View Buckets
              </p>
              <p className="text-[#0F172A]/60 text-sm">Manage your savings goals</p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#0F172A]" />
          </div>
        </motion.button>
        <motion.button
          className="w-full bg-white rounded-2xl p-4 text-left hover:bg-white/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-[#0F172A]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Ask AI Agent
              </p>
              <p className="text-[#0F172A]/60 text-sm">Get financial advice from Axel</p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#0F172A]" />
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}