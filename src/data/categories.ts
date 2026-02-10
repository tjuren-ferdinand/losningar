export interface Category {
  name: string;
  subject: 'Physics' | 'Mathematics';
  chapters: string[];
  icon?: string;
}

export const physicsCategories: Category[] = [
  {
    name: 'Mekanik',
    subject: 'Physics',
    chapters: [
      'Rörelse', 'Krafter', 'Newton\'s lagar', 'Arbete och energi', 
      'Impuls och rörelsemängd', 'Rotation', 'Oscillationer'
    ]
  },
  {
    name: 'Vågrörelselära',
    subject: 'Physics',
    chapters: [
      'Vågor', 'Ljud', 'Ljus', 'Optik', 'Interferens', 'Diffraktion'
    ]
  },
  {
    name: 'Termodynamik',
    subject: 'Physics',
    chapters: [
      'Temperatur', 'Värme', 'Gaslagar', 'Entropi', 'Värmemotorer'
    ]
  },
  {
    name: 'Elektricitet',
    subject: 'Physics',
    chapters: [
      'Laddning', 'Elektriskt fält', 'Spänning', 'Ström', 'Resistans',
      'Kretsar', 'Magnetism', 'Elektromagnetisk induktion'
    ]
  },
  {
    name: 'Modern Fysik',
    subject: 'Physics',
    chapters: [
      'Relativitetsteori', 'Kvantfysik', 'Atomfysik', 'Kärnfysik'
    ]
  }
];

export const mathematicsCategories: Category[] = [
  {
    name: 'Algebra',
    subject: 'Mathematics',
    chapters: [
      'Polynom', 'Ekvationer', 'Olikheter', 'Funktioner', 'Potenser och rötter'
    ]
  },
  {
    name: 'Geometri',
    subject: 'Mathematics',
    chapters: [
      'Plan geometri', 'Rymdgeometri', 'Trigonometri', 'Vektorer', 'Transformationer'
    ]
  },
  {
    name: 'Analys',
    subject: 'Mathematics',
    chapters: [
      'Gränsvärden', 'Derivata', 'Integraler', 'Differentialkvoter', 'Taylors formel'
    ]
  },
  {
    name: 'Linjär Algebra',
    subject: 'Mathematics',
    chapters: [
      'Matriser', 'Vektorrum', 'Linjära transformationer', 'Egenvärden', 'Determinanter'
    ]
  },
  {
    name: 'Sannolikhet och Statistik',
    subject: 'Mathematics',
    chapters: [
      'Sannolikhetsteori', 'Kombinatorik', 'Fördelningar', 'Hypotesprövning', 'Regression'
    ]
  }
];

export const allCategories = [...physicsCategories, ...mathematicsCategories];
