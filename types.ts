export interface Project {
  id: string;
  name: string;
  description: string;
  url: string; // The URL to the deployed site or repo
  tags: string[];
  iconName: 'Code' | 'Terminal' | 'Cpu' | 'Globe' | 'Database' | 'Zap' | 'Layout' | 'Box';
  featured?: boolean;
}

export interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}