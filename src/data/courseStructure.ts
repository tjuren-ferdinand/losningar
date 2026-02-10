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
      'Modern Fysik (Kvant, Relativitet, Kärnfysik)'
    ]
  },
  {
    subject: 'Physics',
    name: 'Gamla Tentor/Duggor',
    chapters: [
      'Dugga 2024-10-04',
      'Dugga 2023-10-06',
      'Dugga 2022-10-07',
      'Dugga 2021-10-08',
      'Dugga 2020-10-09',
      'Dugga 2019-10-11',
      'Tenta 2025-01-08',
      'Tenta 2024-03-15',
      'Tenta 2024-01-03',
      'Tenta 2023-03-17',
      'Tenta 2023-01-04',
      'Tenta 2022-03-18',
      'Tenta 2022-01-05',
      'Tenta 2021-03-19',
      'Tenta 2021-01-07'
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
