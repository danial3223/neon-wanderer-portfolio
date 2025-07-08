
export interface AchievementItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: 'academic' | 'scholarship' | 'certificate' | 'result' | 'event';
  likes: number;
  image?: string;
}

export interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
