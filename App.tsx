import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { Header } from './components/dashboard/Header';
import { HeroBanner } from './components/dashboard/HeroBanner';
import { HubLibrary } from './components/dashboard/HubLibrary';
import { Downloads } from './components/dashboard/Downloads';
import { SplashScreen } from './components/auth/SplashScreen';
import { LoginPage } from './components/auth/LoginPage';
import { PlayableGame } from './types';

type AppScreen = 'splash' | 'login' | 'dashboard' | 'game';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [activeGame, setActiveGame] = useState<PlayableGame | null>(null);

  const handleSplashComplete = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setCurrentScreen('dashboard');
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

  // --- RENDER LOGIN ---
  if (currentScreen === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  // --- RENDER ACTIVE GAME ---
  if (currentScreen === 'game' && activeGame) {
    const GameComponent = activeGame.component;
    return <GameComponent onExit={handleExitGame} />;
  }

  // --- RENDER DASHBOARD ---
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-nexus-bg font-sans selection:bg-nexus-accent selection:text-white">
      
      {/* Left Sidebar (Always visible in Landscape Game Mode) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative py-6 px-4 md:px-6 custom-scrollbar">
        <div className="max-w-7xl mx-auto pb-10">
          
          <Header />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Hero Section */}
            <HeroBanner />

            {/* Game Library Grid */}
            <HubLibrary onPlayGame={handlePlayGame} />

            {/* Downloads */}
            <Downloads />

          </div>
        </div>
      </main>

      {/* Right Sidebar (Hidden on smaller landscape screens to maximize game space) */}
      <RightSidebar />

    </div>
  );
}

export default App;