export interface Solution {
  id: string;
  title: string;
  subject: 'Physics' | 'Mathematics';
  type: 'Tenta-uppgifter' | 'Bok-uppgifter' | 'General Notes';
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  name: string;
  icon: string;
  count: number;
}

export interface Stats {
  totalSolutions: number;
  thisWeek: number;
  physicsCount: number;
  mathCount: number;
}
