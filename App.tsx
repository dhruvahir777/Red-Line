import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { Header } from './components/dashboard/Header';
import { HeroBanner } from './components/dashboard/HeroBanner';
import { HubLibrary } from './components/dashboard/HubLibrary';
import { SplashScreen } from './components/auth/SplashScreen';
import { LoginPage } from './components/auth/LoginPage';
import { Community } from './components/dashboard/Community';
import { GameLibrary } from './components/dashboard/GameLibrary';
import { PlayableGame } from './types';
import { ShoppingBag } from 'lucide-react';

type AppScreen = 'splash' | 'login' | 'dashboard' | 'game';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [activeGame, setActiveGame] = useState<PlayableGame | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSplashComplete = () => {
    // DIRECT ENTRY: Skip login, go straight to dashboard as Guest
    setCurrentScreen('dashboard');
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    // In a real app, this would update user state
  };

  const handlePlayGame = (game: PlayableGame) => {
    setActiveGame(game);
    setCurrentScreen('game');
  };

  const handleExitGame = () => {
    setActiveGame(null);
    setCurrentScreen('dashboard');
  };

  // --- RENDER SPLASH ---
  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // --- RENDER ACTIVE GAME ---
  if (currentScreen === 'game' && activeGame) {
    const GameComponent = activeGame.component;
    return <GameComponent onExit={handleExitGame} />;
  }

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="grid grid-cols-12 gap-6 animate-in fade-in duration-500">
            {/* Hero Section */}
            <HeroBanner />

            {/* Quick Game Library (No Leaderboard) */}
            <HubLibrary onPlayGame={handlePlayGame} />
          </div>
        );
      
      case 'library':
        return <GameLibrary onPlayGame={handlePlayGame} />;

      case 'friends':
        return <Community />;

      case 'store':
        return (
           <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in zoom-in">
              <ShoppingBag size={64} className="text-nexus-muted mb-4" />
              <h2 className="text-3xl font-bold text-white">Store Under Maintenance</h2>
              <p className="text-nexus-muted mt-2">New inventory arriving soon.</p>
           </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-[60vh] text-nexus-muted">
            Section under construction
          </div>
        );
    }
  };

  // --- RENDER DASHBOARD ---
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-nexus-bg font-sans selection:bg-nexus-accent selection:text-white relative">
      
      {/* Login Modal Overlay */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="w-full max-w-4xl">
              <LoginPage 
                onLogin={handleLogin} 
                onClose={() => setShowLoginModal(false)} 
              />
           </div>
        </div>
      )}

      {/* Left Sidebar (Always visible in Landscape Game Mode) */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative py-6 px-4 md:px-6 custom-scrollbar">
        <div className="max-w-7xl mx-auto pb-10">
          
          <Header />

          {renderContent()}

        </div>
      </main>

      {/* Right Sidebar (Hidden on smaller landscape screens to maximize game space) */}
      <RightSidebar onProfileClick={() => setShowLoginModal(true)} />

    </div>
  );
}

export default App;