import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, TrendingUp } from 'lucide-react';
import { useWallet } from '../../App';

export function BucketsPage() {
  const { buckets, wallet } = useWallet();
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);

  const selectedBucketData = buckets.find(b => b.id === selectedBucket);

  return (
    <div className="min-h-screen p-6 text-white">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1
          className="text-5xl mb-2"
          style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 800 }}
        >
          Buckets
        </h1>
        <p className="text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
          Your savings goals in one place
        </p>
      </motion.div>

      {/* Total Saved Card */}
      <motion.div
        className="bg-[#FEFF09] rounded-[2.5rem] p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-[#0F172A]" />
          <p className="text-[#0F172A]/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            TOTAL SAVED
          </p>
        </div>
        <p
          className="text-5xl text-[#0F172A]"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}
        >
          ${wallet.totalSaved.toFixed(2)}
        </p>
        <p className="text-[#0F172A]/60 text-sm mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          Across {buckets.length} active goals
        </p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {buckets.map((bucket, index) => {
          const progress = (bucket.current / bucket.target) * 100;
          const isHighPriority = bucket.color === 'bg-[#FF44EC]';

          return (
            <motion.button
              key={bucket.id}
              onClick={() => setSelectedBucket(bucket.id)}
              className={`${
                isHighPriority
                  ? 'bg-[#FF44EC] text-white'
                  : 'bg-white text-[#0F172A]'
              } rounded-3xl p-5 text-left hover:scale-105 transition-all ${
                index === 0 ? 'col-span-2' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-3">{bucket.emoji}</div>
              <h3 className="mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {bucket.name}
              </h3>
              <p
                className="text-2xl mb-3"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}
              >
                ${bucket.current}
              </p>
              <div className="mb-2">
                <div className={`h-2 ${isHighPriority ? 'bg-white/30' : 'bg-[#0F172A]/20'} rounded-full overflow-hidden`}>
                  <motion.div
                    className={isHighPriority ? 'bg-white h-full' : 'bg-[#FEFF09] h-full'}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  />
                </div>
              </div>
              <p className={`${isHighPriority ? 'text-white/80' : 'text-[#0F172A]/60'} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                {Math.round(progress)}% of ${bucket.target}
              </p>
            </motion.button>
          );
        })}

        {/* Add New Bucket */}
        <motion.button
          className="bg-white text-[#0F172A] rounded-3xl p-5 flex flex-col items-center justify-center hover:bg-white/90 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-10 h-10 mb-2" />
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            New Goal
          </p>
        </motion.button>
      </motion.div>

      {/* Bucket Detail Modal */}
      {selectedBucket && selectedBucketData && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedBucket(null)}
        >
          <motion.div
            className="bg-[#2820FF] border-t-4 border-[#FEFF09] rounded-t-[2.5rem] w-full max-w-md p-6"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-6"></div>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedBucketData.emoji}</div>
              <h2
                className="text-3xl mb-2"
                style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 800 }}
              >
                {selectedBucketData.name}
              </h2>
              <p className="text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                Track your progress
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-white/70 text-sm mb-1">Current</p>
                  <p
                    className="text-3xl"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}
                  >
                    ${selectedBucketData.current}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-sm mb-1">Target</p>
                  <p
                    className="text-3xl"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}
                  >
                    ${selectedBucketData.target}
                  </p>
                </div>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="bg-[#FEFF09] h-full"
                  style={{ width: `${Math.min((selectedBucketData.current / selectedBucketData.target) * 100, 100)}%` }}
                />
              </div>
              <p className="text-center text-white/60 text-sm mt-2">
                ${selectedBucketData.target - selectedBucketData.current} to go
              </p>
            </div>

            <motion.button
              className="w-full bg-[#FEFF09] text-[#0F172A] py-4 rounded-full mb-3"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Money
            </motion.button>
            <button
              onClick={() => setSelectedBucket(null)}
              className="w-full bg-white/10 text-white py-4 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}