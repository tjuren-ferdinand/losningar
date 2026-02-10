import { supabaseClient, Solution } from '../lib/supabaseClient'

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

    // Om query är en siffra, sök på id (numeriskt) och även textfält (årtal/datum etc.)
    if (/^\d+$/.test(query)) {
      supabaseQuery = supabaseQuery.or(
        `id.eq.${Number(query)},title.ilike.%${query}%,category.ilike.%${query}%,chapter.ilike.%${query}%,subject.ilike.%${query}%`
      )
    } else {
      // Annars sök på titel/kategori/kapitel/ämne
      supabaseQuery = supabaseQuery.or(
        `title.ilike.%${query}%,category.ilike.%${query}%,chapter.ilike.%${query}%,subject.ilike.%${query}%`
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
      const fileExt = (file.name.split('.').pop() || '').toLowerCase() || (file.type === 'application/pdf' ? 'pdf' : 'bin')
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = fileName

      console.log('Uploading image to:', filePath)

      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from('solutions-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          contentType: file.type || undefined,
          upsert: false,
        })

      if (uploadError) {
        console.log('storageError', uploadError)
        throw uploadError
      }

      console.log('storageUploadData', uploadData)

      const { data: publicData } = supabaseClient.storage
        .from('solutions-images')
        .getPublicUrl(filePath)

      console.log('publicUrlData', publicData)
      return publicData.publicUrl
    } catch (error) {
      console.error('Full upload error:', error)
      throw error
    }
  },

  // Skapa ny lösning
  async createSolution(solution: {
    title: string
    subject: string
    category: string
    chapter: string
    image_url?: string
  }): Promise<Solution> {
    const { data, error } = await supabaseClient
      .from('solutions')
      .insert([solution])
      .select()
      .single()

    if (error) {
      console.log('dbError', error)
      console.log('dbPayload', solution)
      throw error
    }
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
      supabaseQuery = supabaseQuery.eq('subject', 'Physics')
    }

    // Sökfråga
    if (query) {
      if (/^\d+$/.test(query)) {
        supabaseQuery = supabaseQuery.or(
          `id.eq.${Number(query)},title.ilike.%${query}%,category.ilike.%${query}%,chapter.ilike.%${query}%,subject.ilike.%${query}%`
        )
      } else {
        supabaseQuery = supabaseQuery.or(
          `title.ilike.%${query}%,category.ilike.%${query}%,chapter.ilike.%${query}%,subject.ilike.%${query}%`
        )
      }
    }

    const { data, error } = await supabaseQuery

    if (error) throw error
    return data || []
  }
}
