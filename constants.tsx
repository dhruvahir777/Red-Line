import React from 'react';
import { 
  Gamepad2, 
  LayoutGrid, 
  ShoppingBag, 
  Users, 
  Settings, 
  Home,
  MessageSquare,
  Gift
} from 'lucide-react';
import { Game, Friend, DownloadItem, StatData, PlayableGame } from './types';
import { FunFly } from './components/games/funfly/FunFly';
import { AmitabFly } from './components/games/amitabfly/AmitabFly';

export const APP_NAME = "RedLine Galaxy";
export const STUDIO_NAME = "Dhruv Studios";

export const SIDEBAR_ITEMS = [
  { id: 'home', icon: <Home size={24} />, label: 'Home' },
  { id: 'library', icon: <Gamepad2 size={24} />, label: 'Library' },
  { id: 'store', icon: <ShoppingBag size={24} />, label: 'Store' },
  { id: 'friends', icon: <Users size={24} />, label: 'Community' },
  { id: 'messages', icon: <MessageSquare size={24} />, label: 'Messages' },
  { id: 'gifts', icon: <Gift size={24} />, label: 'Gifts' },
  { id: 'settings', icon: <Settings size={24} />, label: 'Settings' },
];

// The HUB_GAMES list is the central registry for playable mini-games.
// To add a new game, import it and add an entry here.
export const HUB_GAMES: PlayableGame[] = [
  {
    id: 'funfly',
    title: 'FunFly',
    description: 'Navigate the neon city. Dodge obstacles. Survive.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    component: FunFly,
    colors: {
      primary: '#FF4C29',
      accent: '#00E5FF'
    }
  },
  {
    id: 'amitabfly',
    title: 'Amitabh Fly',
    description: 'Realistic flight simulation with high-fidelity graphics.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2070&auto=format&fit=crop',
    component: AmitabFly,
    colors: {
      primary: '#D4AF37', // Gold
      accent: '#FFFFFF'
    }
  }
  // Future games will be added here...
];

export const FEATURED_GAME: Game = {
  id: 'val-001',
  title: 'Valorant',
  description: 'Valorant is a multiplayer computer game developed and published by Riot Games. Valorant is Riot Games\' first first-person shooter game.',
  imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2665&auto=format&fit=crop', 
  rating: 4.8,
  reviews: 53,
  category: 'FPS Shooter',
  platform: ['steam', 'epic'],
  isPopular: true
};

export const NEW_GAMES: Game[] = [
  {
    id: 'new-001',
    title: 'Cyberpunk 2077',
    description: 'An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.',
    imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2578&auto=format&fit=crop',
    rating: 4.5,
    reviews: 12000,
    category: 'RPG',
    platform: ['steam', 'xbox', 'ps'],
    isNew: true
  },
  {
    id: 'new-002',
    title: 'Elden Ring',
    description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
    imageUrl: 'https://images.unsplash.com/photo-1644252589631-3d4f008b2433?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    reviews: 25000,
    category: 'RPG',
    platform: ['steam', 'ps', 'xbox'],
    isNew: true
  }
];

export const RECENT_DOWNLOADS: DownloadItem[] = [
  {
    id: 'fifa-23',
    title: 'FIFA 23',
    progress: 78,
    speed: '12 MB/s',
    size: '45GB',
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1931&auto=format&fit=crop',
    status: 'downloading'
  }
];

export const FRIENDS_LIST: Friend[] = [
  { id: '1', name: 'Unravel 2', avatarUrl: 'https://picsum.photos/100/100?random=1', status: 'in-game', game: 'Standard Edition' },
  { id: '2', name: 'Subway Surf', avatarUrl: 'https://picsum.photos/100/100?random=2', status: 'online' },
  { id: '3', name: 'RDR 3', avatarUrl: 'https://picsum.photos/100/100?random=3', status: 'offline' },
  { id: '4', name: 'Alex M.', avatarUrl: 'https://picsum.photos/100/100?random=4', status: 'online' },
  { id: '5', name: 'Sarah J.', avatarUrl: 'https://picsum.photos/100/100?random=5', status: 'in-game', game: 'Valorant' },
  { id: '6', name: 'Mike T.', avatarUrl: 'https://picsum.photos/100/100?random=6', status: 'online' },
];

export const STATS_DATA: StatData[] = [
  { name: 'Dota 2', value: 2340, fill: '#FF4C29' },
  { name: 'LoL', value: 5420, fill: '#FFF0E6' },
  { name: 'CS:GO', value: 4580, fill: '#7C4DFF' },
];