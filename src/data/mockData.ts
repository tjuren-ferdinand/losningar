import { Solution, Category, Stats } from '../types';

export const mockSolutions: Solution[] = [
  {
    id: '1',
    title: 'Derivata av polynomfunktioner',
    subject: 'Mathematics',
    type: 'Tenta-uppgifter',
    content: `# Derivata av polynomfunktioner

## Problem
Beräkna derivatan av följande polynomfunktion:
\\[ f(x) = 3x^4 - 2x^3 + 5x^2 - x + 7 \\]

## Lösning
Vi använder deriveringsregeln för polynom:
\\[ \\frac{d}{dx} x^n = nx^{n-1} \\]

Steg-för-steg:
1. \\( \\frac{d}{dx} 3x^4 = 3 \\cdot 4x^3 = 12x^3 \\)
2. \\( \\frac{d}{dx} (-2x^3) = -2 \\cdot 3x^2 = -6x^2 \\)
3. \\( \\frac{d}{dx} 5x^2 = 5 \\cdot 2x = 10x \\)
4. \\( \\frac{d}{dx} (-x) = -1 \\)
5. \\( \\frac{d}{dx} 7 = 0 \\)

## Resultat
\\[ f'(x) = 12x^3 - 6x^2 + 10x - 1 \\]`,
    tags: ['derivata', 'polynom', 'analys'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Integrering med partialbråksuppdelning',
    subject: 'Mathematics',
    type: 'Tenta-uppgifter',
    content: `# Integrering med partialbråksuppdelning

## Problem
Beräkna integralen:
\\[ \\int \\frac{2x + 3}{x^2 + 3x + 2} \\, dx \\]

## Lösning
Först faktoriserar vi nämnaren:
\\[ x^2 + 3x + 2 = (x + 1)(x + 2) \\]

Partialbråksuppdelning:
\\[ \\frac{2x + 3}{(x + 1)(x + 2)} = \\frac{A}{x + 1} + \\frac{B}{x + 2} \\]

Multiplicerar båda sidor med nämnaren:
\\[ 2x + 3 = A(x + 2) + B(x + 1) \\]

Sätter x = -1:
\\[ 2(-1) + 3 = A(1) + B(0) \\Rightarrow 1 = A \\]

Sätter x = -2:
\\[ 2(-2) + 3 = A(0) + B(-1) \\Rightarrow -1 = -B \\Rightarrow B = 1 \\]

Integralen blir:
\\[ \\int \\left( \\frac{1}{x + 1} + \\frac{1}{x + 2} \\right) dx = \\ln|x + 1| + \\ln|x + 2| + C \\]`,
    tags: ['integral', 'partialbråk', 'analys'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    title: 'Linjär algebra - matrisinvers',
    subject: 'Mathematics',
    type: 'Bok-uppgifter',
    content: `# Matrisinvers

## Problem
Beräkna inversen till matrisen:
\\[ A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix} \\]

## Lösning
För en 2×2-matris \\( \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\) är inversen:
\\[ A^{-1} = \\frac{1}{ad - bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\]

Beräkna determinanten:
\\[ \\det(A) = 2 \\cdot 2 - 1 \\cdot 3 = 4 - 3 = 1 \\]

Inversen blir:
\\[ A^{-1} = \\frac{1}{1} \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix} \\]`,
    tags: ['matris', 'invers', 'linjär algebra'],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '4',
    title: 'Differentialkvot - kedjeregeln',
    subject: 'Mathematics',
    type: 'General Notes',
    content: `# Kedjeregeln

## Definition
Om \\( y = f(g(x)) \\) då är:
\\[ \\frac{dy}{dx} = f'(g(x)) \\cdot g'(x) \\]

## Exempel
Beräkna derivatan av \\( y = (x^2 + 1)^3 \\)

Låt \\( u = x^2 + 1 \\), då \\( y = u^3 \\)

1. \\( \\frac{dy}{du} = 3u^2 \\)
2. \\( \\frac{du}{dx} = 2x \\)

Kedjeregeln ger:
\\[ \\frac{dy}{dx} = 3u^2 \\cdot 2x = 3(x^2 + 1)^2 \\cdot 2x = 6x(x^2 + 1)^2 \\]`,
    tags: ['kedjeregeln', 'derivata', 'analys'],
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: '5',
    title: 'Newtons andra lag - krafter och acceleration',
    subject: 'Physics',
    type: 'Tenta-uppgifter',
    content: `# Newtons andra lag

## Problem
En bil med massan 1500 kg accelererar från 0 till 100 km/h på 8 sekunder. Beräkna den genomsnittliga kraft som verkar på bilen.

## Lösning
Newtons andra lag:
\\[ F = ma \\]

Först omvandlar vi hastigheten till m/s:
\\[ v = 100 \\text{ km/h} = \\frac{100 \\times 1000}{3600} \\text{ m/s} = 27.78 \\text{ m/s} \\]

Beräkna accelerationen:
\\[ a = \\frac{\\Delta v}{\\Delta t} = \\frac{27.78 - 0}{8} = 3.47 \\text{ m/s}^2 \\]

Beräkna kraften:
\\[ F = 1500 \\text{ kg} \\times 3.47 \\text{ m/s}^2 = 5205 \\text{ N} \\]

## Resultat
Den genomsnittliga kraften är 5205 N (5.2 kN).`,
    tags: ['newton', 'krafter', 'acceleration', 'mekanik'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '6',
    title: 'Energi bevarande - potentiell och kinetisk energi',
    subject: 'Physics',
    type: 'Bok-uppgifter',
    content: `# Energiprincipen

## Problem
Ett objekt med massan 2 kg släpps från vilan från en höjd av 10 meter. Ignorera luftmotstånd. Beräkna dess hastighet när det når marken.

## Lösning
Energiprincipen: Mekanisk energi bevaras
\\[ E_p + E_k = \\text{konstant} \\]

I startläget (höjd h = 10 m, hastighet v = 0):
- Potentiell energi: \\( E_p = mgh = 2 \\times 9.82 \\times 10 = 196.4 \\text{ J} \\)
- Kinetisk energi: \\( E_k = 0 \\)
- Total energi: \\( E_{total} = 196.4 \\text{ J} \\)

Vid marken (höjd h = 0, hastighet v = ?):
- Potentiell energi: \\( E_p = 0 \\)
- Kinetisk energi: \\( E_k = \\frac{1}{2}mv^2 \\)
- Total energi: \\( E_{total} = \\frac{1}{2}mv^2 \\)

Sätt energin lika:
\\[ \\frac{1}{2}mv^2 = 196.4 \\]
\\[ v^2 = \\frac{2 \\times 196.4}{2} = 196.4 \\]
\\[ v = \\sqrt{196.4} = 14.0 \\text{ m/s} \\]

## Resultat
Hastigheten vid marken är 14.0 m/s (50.4 km/h).`,
    tags: ['energi', 'potentiell energi', 'kinetisk energi', 'mekanik'],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  }
];

export const categories: Category[] = [
  { name: 'All', icon: '📚', count: mockSolutions.length },
  { name: 'Mathematics', icon: '∫', count: mockSolutions.filter(s => s.subject === 'Mathematics').length },
  { name: 'Physics', icon: '⚡', count: mockSolutions.filter(s => s.subject === 'Physics').length },
];

export const stats: Stats = {
  totalSolutions: mockSolutions.length,
  thisWeek: 3,
  physicsCount: mockSolutions.filter(s => s.subject === 'Physics').length,
  mathCount: mockSolutions.filter(s => s.subject === 'Mathematics').length,
};
