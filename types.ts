import React from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  category: string;
  platform: ('steam' | 'epic' | 'ps' | 'xbox')[];
  isNew?: boolean;
  isPopular?: boolean;
}

export interface PlayableGame {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  component: React.FC<{ onExit: () => void }>;
  colors: {
    primary: string;
    accent: string;
  };
}

export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'online' | 'in-game' | 'offline';
  game?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  progress: number;
  speed: string;
  size: string;
  imageUrl: string;
  status: 'downloading' | 'paused' | 'completed';
}

export interface StatData {
  name: string;
  value: number;
  fill: string;
}

export enum NavSection {
  HOME = 'HOME',
  LIBRARY = 'LIBRARY',
  STORE = 'STORE',
  FRIENDS = 'FRIENDS',
  SETTINGS = 'SETTINGS'
}