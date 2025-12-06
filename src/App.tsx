import { useState, useEffect } from 'react';
import { Welcome } from './components/onboarding/Welcome';
import { KYC } from './components/onboarding/KYC';
import { FileUpload } from './components/onboarding/FileUpload';
import { HomePage } from './components/HomePage';
import { TransferAmount } from './components/transfer/TransferAmount';
import { TransferLoading } from './components/transfer/TransferLoading';
import { ChatBot } from './components/ChatBot';
import { Buckets } from './components/Buckets';
import { Profile } from './components/Profile';
import { Navigation } from './components/Navigation';

type Page = 
  | 'welcome'
  | 'kyc'
  | 'file-upload'
  | 'home'
  | 'transfer'
  | 'transfer-loading'
  | 'chatbot'
  | 'buckets'
  | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    ic: '',
    monthlySalary: 2400,
    amountSaved: 1850,
    amountTransferred: 0,
  });

  // Check if onboarding is complete
  useEffect(() => {
    const completed = localStorage.getItem('onboardingComplete');
    if (completed === 'true') {
      setOnboardingComplete(true);
      setCurrentPage('home');
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setOnboardingComplete(true);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <Welcome onNext={() => setCurrentPage('kyc')} />;
      case 'kyc':
        return (
          <KYC
            onNext={(data) => {
              setUserData({ ...userData, ...data });
              setCurrentPage('file-upload');
            }}
            onBack={() => setCurrentPage('welcome')}
          />
        );
      case 'file-upload':
        return (
          <FileUpload
            onComplete={completeOnboarding}
            onBack={() => setCurrentPage('kyc')}
          />
        );
      case 'home':
        return (
          <HomePage
            userData={userData}
            onTransfer={() => setCurrentPage('transfer')}
          />
        );
      case 'transfer':
        return (
          <TransferAmount
            onConfirm={(amount) => {
              setUserData({
                ...userData,
                amountTransferred: userData.amountTransferred + amount,
              });
              setCurrentPage('transfer-loading');
            }}
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'transfer-loading':
        return (
          <TransferLoading
            onComplete={() => setCurrentPage('home')}
          />
        );
      case 'chatbot':
        return <ChatBot />;
      case 'buckets':
        return <Buckets />;
      case 'profile':
        return <Profile userData={userData} />;
      default:
        return <HomePage userData={userData} onTransfer={() => setCurrentPage('transfer')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-800">
      <div className="max-w-md mx-auto min-h-screen bg-white">
        {renderPage()}
        {onboardingComplete && currentPage !== 'transfer-loading' && (
          <Navigation
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
