import { supabaseClient, supabaseStorageClient, Solution } from '../lib/supabaseClient'

export const solutionService = {
  // Hämta alla lösningar
  async getAllSolutions(): Promise<Solution[]> {
    const { data, error } = await supabaseClient
      .from('solutions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Hämta lösningar baserat på sökfråga
  async searchSolutions(query: string): Promise<Solution[]> {
    let supabaseQuery = supabaseClient
      .from('solutions')
      .select('*')
      .order('created_at', { ascending: false })

    // Om query är en siffra, sök på id
    if (/^\d+$/.test(query)) {
      supabaseQuery = supabaseQuery.or(`id.ilike.%${query}%,title.ilike.%${query}%`)
    } else {
      // Annars sök på titel, tags och subject
      supabaseQuery = supabaseQuery.or(
        `title.ilike.%${query}%,tags.cs.{${query}},subject.ilike.%${query}%`
      )
    }

    const { data, error } = await supabaseQuery

    if (error) throw error
    return data || []
  },

  // Filtrera lösningar per ämne
  async getSolutionsBySubject(subject: string): Promise<Solution[]> {
    if (subject === 'Alla') {
      return this.getAllSolutions()
    }

    const { data, error } = await supabaseClient
      .from('solutions')
      .select('*')
      .eq('subject', subject === 'Matematik' ? 'Mathematics' : 'Physics')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Ladda upp bild till storage
  async uploadImage(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `solutions-images/${fileName}`

      console.log('Uploading image to:', filePath)

      const { error: uploadError } = await supabaseStorageClient.storage
        .from('solutions-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Storage upload error:', uploadError)
        throw uploadError
      }

      // Hämta publika URL
      const { data: { publicUrl } } = supabaseStorageClient.storage
        .from('solutions-images')
        .getPublicUrl(filePath)

      console.log('Image uploaded successfully:', publicUrl)
      return publicUrl
    } catch (error) {
      console.error('Full upload error:', error)
      throw error
    }
  },

  // Skapa ny lösning
  async createSolution(solution: {
    title: string
    subject: string
    type: string
    content: string
    tags: string[]
    image_url?: string
  }): Promise<Solution> {
    const { data, error } = await supabaseClient
      .from('solutions')
      .insert([solution])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Kombinerad sök och filtrering
  async getSolutions(query: string = '', subject: string | null = null): Promise<Solution[]> {
    let supabaseQuery = supabaseClient
      .from('solutions')
      .select('*')
      .order('created_at', { ascending: false })

    // Filtrera på ämne
    if (subject && subject !== 'Alla') {
      supabaseQuery = supabaseQuery.eq(
        'subject', 
        subject === 'Matematik' ? 'Mathematics' : 'Physics'
      )
    }

    // Sökfråga
    if (query) {
      if (/^\d+$/.test(query)) {
        supabaseQuery = supabaseQuery.or(`id.ilike.%${query}%,title.ilike.%${query}%`)
      } else {
        supabaseQuery = supabaseQuery.or(
          `title.ilike.%${query}%,tags.cs.{${query}},subject.ilike.%${query}%`
        )
      }
    }

    const { data, error } = await supabaseQuery

    if (error) throw error
    return data || []
  }
}
