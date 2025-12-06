import { motion } from 'motion/react';
import { Flame } from 'lucide-react';
import svgPaths from '../imports/svg-8qx1l0lvzy';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Imported Background Design */}
      <div className="absolute inset-0">
        {/* Container - Gradient Background */}
        <div className="absolute bg-gradient-to-b from-[#000000] h-full left-0 to-51% to-[#3930f3] top-0 w-full" />
        
        {/* Decorative Background Elements */}
        <div className="absolute h-full left-0 top-0 w-full">
          <div className="absolute inset-[-1.09%_-79.23%_-5.91%_-79.17%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1188 981">
              <g>
                <g>
                  <ellipse cx="780" cy="138.5" fill="#3A32F2" rx="57" ry="54.5" />
                  <ellipse cx="810" cy="75.5" fill="#3A32F2" rx="40" ry="38.5" />
                  <ellipse cx="839" cy="27.5" fill="#3A32F2" rx="29" ry="27.5" />
                </g>
                <g>
                  <ellipse cx="57" cy="54.5" fill="#3A32F2" rx="57" ry="54.5" transform="matrix(-1 0 0 1 463 84)" />
                  <ellipse cx="40" cy="38.5" fill="#3A32F2" rx="40" ry="38.5" transform="matrix(-1 0 0 1 416 37)" />
                  <ellipse cx="29" cy="27.5" fill="#3A32F2" rx="29" ry="27.5" transform="matrix(-1 0 0 1 376 0)" />
                </g>
                <ellipse cx="594" cy="540.5" fill="url(#paint0_linear_bg)" rx="594" ry="440.5" />
                <g>
                  <ellipse cx="57" cy="54.5" fill="#3A32F2" rx="57" ry="54.5" transform="matrix(-1 0 0 1 463 84)" />
                  <ellipse cx="40" cy="38.5" fill="#3A32F2" rx="40" ry="38.5" transform="matrix(-1 0 0 1 416 37)" />
                  <ellipse cx="29" cy="27.5" fill="#3A32F2" rx="29" ry="27.5" transform="matrix(-1 0 0 1 376 0)" />
                </g>
                <g>
                  <ellipse cx="780" cy="138.5" fill="#3A32F2" rx="57" ry="54.5" />
                  <ellipse cx="810" cy="75.5" fill="#3A32F2" rx="40" ry="38.5" />
                  <ellipse cx="839" cy="27.5" fill="#3A32F2" rx="29" ry="27.5" />
                </g>
                <ellipse cx="594" cy="540.5" fill="url(#paint1_linear_bg)" rx="594" ry="440.5" />
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_bg" x1="594" x2="594" y1="100" y2="981">
                  <stop stopColor="#3930F3" />
                  <stop offset="1" stopColor="#83D6E2" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_bg" x1="594" x2="594" y1="100" y2="981">
                  <stop stopColor="#3930F3" />
                  <stop offset="1" stopColor="#83D6E2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Eyes with Animation - Centered */}
        <motion.div
          className="absolute content-stretch flex items-center justify-between left-1/2 top-[156px] -translate-x-1/2 w-[363.576px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Left Eye */}
          <motion.div
            className="h-[122px] relative shrink-0 w-[114.146px]"
            animate={{
              scale: [1, 0.98, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115 122">
              <g>
                <ellipse cx="57.0733" cy="61" fill="white" rx="42.4395" ry="49.1816" transform="rotate(20.6796 57.0733 61)" />
                <motion.ellipse
                  cx="63.5792"
                  cy="60.3696"
                  fill="#111922"
                  rx="34.8682"
                  ry="38.2075"
                  transform="rotate(34.91 63.5792 60.3696)"
                  animate={{
                    cx: [63.5792, 65, 63.5792],
                    cy: [60.3696, 62, 60.3696]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
                <motion.path
                  d={svgPaths.p117f3900}
                  fill="#FEFF09"
                  animate={{
                    opacity: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.path
                  d={svgPaths.p1d0bf700}
                  fill="#FEFF09"
                  stroke="#FEFF09"
                  strokeWidth="0.5"
                  animate={{
                    opacity: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </g>
            </svg>
          </motion.div>

          {/* Right Eye */}
          <motion.div
            className="flex items-center justify-center relative shrink-0"
            animate={{
              scale: [1, 0.98, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.1
            }}
          >
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="h-[120.321px] relative w-[112.576px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 113 121">
                  <g>
                    <ellipse cx="56.2878" cy="60.1607" fill="white" rx="41.8555" ry="48.5048" transform="rotate(20.6796 56.2878 60.1607)" />
                    <motion.ellipse
                      cx="62.7042"
                      cy="59.5391"
                      fill="#111922"
                      rx="34.3883"
                      ry="37.6817"
                      transform="rotate(34.91 62.7042 59.5391)"
                      animate={{
                        cx: [62.7042, 64, 62.7042],
                        cy: [59.5391, 61, 59.5391]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 0.1
                      }}
                    />
                    <motion.path
                      d={svgPaths.p2feb9600}
                      fill="#FEFF09"
                      animate={{
                        opacity: [1, 0.9, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.1
                      }}
                    />
                    <motion.path
                      d={svgPaths.p62f4e00}
                      fill="#FEFF09"
                      stroke="#FEFF09"
                      strokeWidth="0.5"
                      animate={{
                        opacity: [1, 0.9, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.1
                      }}
                    />
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-6 pt-20 pb-10">
        {/* Logo */}
        <motion.div
          className="w-32 h-32 mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
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
            Buck Up with BuckGet
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
                Get paid early
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4">
              <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Smart savings buckets
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4">
              <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                AI-powered finance tips
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