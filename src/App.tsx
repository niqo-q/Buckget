import { useState, createContext, useContext } from 'react';
import { motion } from 'motion/react';
import { Home, ArrowLeftRight, Wallet, Bot, User } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { HomePage } from './components/buckget/HomePage';
import { TransferPage } from './components/buckget/TransferPage';
import { BucketsPage } from './components/buckget/BucketsPage';
import { AIAgent } from './components/buckget/AIAgent';
import { ProfilePage } from './components/buckget/ProfilePage';
import { LandingPage } from './components/buckget/LandingPage';
import './styles/globals.css';

// Wallet Context
interface Bucket {
  id: string;
  name: string;
  target: number;
  current: number;
  icon: string;
  color: string;
}

interface Transaction {
  id: string;
  type: 'unlock' | 'stash' | 'transfer';
  amount: number;
  date: Date;
  description: string;
}

interface WalletContextType {
  user: { name: string; hourlyRate: number };
  wallet: { currentAvailable: number; totalSaved: number };
  buckets: Bucket[];
  transactions: Transaction[];
  updateWallet: (available: number, saved: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateBucket: (id: string, amount: number) => void;
  addBucket: (bucket: Omit<Bucket, 'id'>) => void;
  deleteBucket: (id: string) => void;
  updateBucketDetails: (id: string, updates: Partial<Omit<Bucket, 'id'>>) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};

type Page = 'home' | 'transfer' | 'buckets' | 'ai' | 'profile';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  const [user] = useState({ name: 'Alex', hourlyRate: 25.0 });
  const [wallet, setWallet] = useState({
    currentAvailable: 84.0,
    totalSaved: 1250.0,
  });
  const [buckets, setBuckets] = useState<Bucket[]>([
    { id: '1', name: 'Emergency Fund', target: 5000, current: 450, icon: 'Shield', color: 'bg-[#FF44EC]' },
    { id: '2', name: 'Vacation', target: 3000, current: 820, icon: 'Plane', color: 'bg-white/10' },
    { id: '3', name: 'New Phone', target: 2500, current: 1200, icon: 'Smartphone', color: 'bg-white/10' },
    { id: '4', name: 'Gaming Setup', target: 4000, current: 650, icon: 'Gamepad2', color: 'bg-[#FF44EC]' },
    { id: '5', name: 'House Deposit', target: 20000, current: 3400, icon: 'Home', color: 'bg-white/10' },
    { id: '6', name: 'Education', target: 6000, current: 2100, icon: 'BookOpen', color: 'bg-white/10' },
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'unlock', amount: 50, date: new Date('2024-12-05'), description: 'Wage unlock' },
    { id: '2', type: 'stash', amount: 30, date: new Date('2024-12-04'), description: 'Auto save to Emergency' },
  ]);

  const updateWallet = (available: number, saved: number) => {
    setWallet({ currentAvailable: available, totalSaved: saved });
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions([
      { ...transaction, id: Date.now().toString() },
      ...transactions,
    ]);
  };

  const updateBucket = (id: string, amount: number) => {
    setBuckets(buckets.map(b => 
      b.id === id ? { ...b, current: b.current + amount } : b
    ));
  };

  const addBucket = (bucket: Omit<Bucket, 'id'>) => {
    setBuckets([
      { ...bucket, id: Date.now().toString() },
      ...buckets,
    ]);
  };

  const deleteBucket = (id: string) => {
    setBuckets(buckets.filter(b => b.id !== id));
  };

  const updateBucketDetails = (id: string, updates: Partial<Omit<Bucket, 'id'>>) => {
    setBuckets(buckets.map(b => 
      b.id === id ? { ...b, ...updates } : b
    ));
  };

  const walletContextValue: WalletContextType = {
    user,
    wallet,
    buckets,
    transactions,
    updateWallet,
    addTransaction,
    updateBucket,
    addBucket,
    deleteBucket,
    updateBucketDetails,
  };

  const navItems = [
    { id: 'home' as Page, icon: Home, label: 'Home' },
    { id: 'transfer' as Page, icon: ArrowLeftRight, label: 'Transfer' },
    { id: 'buckets' as Page, icon: Wallet, label: 'Buckets' },
    { id: 'ai' as Page, icon: Bot, label: 'AI' },
    { id: 'profile' as Page, icon: User, label: 'Profile' },
  ];

  return (
    <WalletContext.Provider value={walletContextValue}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&family=Inter:wght@500;600&display=swap');
          @import url('https://api.fontshare.com/v2/css?f[]=momo-trust-display@800&display=swap');
        `}
      </style>

      {showLanding ? (
        <LandingPage onGetStarted={() => setShowLanding(false)} />
      ) : (
        <div className="min-h-screen bg-[#2820FF] relative overflow-x-hidden">
          <div className="max-w-md mx-auto min-h-screen relative pb-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
                {currentPage === 'transfer' && <TransferPage onBack={() => setCurrentPage('home')} />}
                {currentPage === 'buckets' && <BucketsPage />}
                {currentPage === 'ai' && <AIAgent />}
                {currentPage === 'profile' && <ProfilePage />}
              </motion.div>
            </AnimatePresence>

            {/* Floating Pill Navigation */}
            <motion.nav
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`relative px-4 py-2 rounded-full transition-all ${
                          isActive
                            ? 'bg-[#FEFF09] text-[#0F172A]'
                            : 'text-white hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.nav>
          </div>
        </div>
      )}
    </WalletContext.Provider>
  );
}