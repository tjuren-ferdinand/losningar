export interface CourseCategory {
  subject: string
  name: string
  chapters: string[]
}

export const courseStructure: CourseCategory[] = [
  {
    subject: 'Mathematics',
    name: 'Matematik Origo 4',
    chapters: [
      'Kap 1: Komplexa tal',
      'Kap 2: Derivator och integraler',
      'Kap 3: Derivator och grafer',
      'Kap 4: Integraler',
      'Kap 5: Differentialekvationer'
    ]
  },
  {
    subject: 'Physics',
    name: 'Fysik Heureka 2',
    chapters: [
      'Mekanik (Rörelse, Krafter, Energi)',
      'Vågrörelselära (Ljud, Ljus, Optik)',
      'Termodynamik (Värme, Gaser)',
      'Elektricitet & Magnetism',
      'Modern Fysik (Kvant, Relativitet, Kärnfysik)',
      'Gamla Tentor (Struan Gray struktur)'
    ]
  }
]

export const getChaptersBySubject = (subject: string): string[] => {
  const category = courseStructure.find(cat => 
    cat.subject === subject || 
    cat.name.toLowerCase().includes(subject.toLowerCase())
  )
  return category?.chapters || []
}

export const getCategoryBySubject = (subject: string): CourseCategory | undefined => {
  return courseStructure.find(cat => 
    cat.subject === subject || 
    cat.name.toLowerCase().includes(subject.toLowerCase())
  )
}
