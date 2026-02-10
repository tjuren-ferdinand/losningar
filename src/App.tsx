import React, { useState, useEffect } from 'react';
import VisionSearch from './components/VisionSearch';
import VisionResults from './components/VisionResults';
import VisionNav from './components/VisionNav';
import SolutionModal from './components/SolutionModal';
import UploadView from './components/UploadView';
import { solutionService } from './services/solutionService';
import { supabase, Solution } from './lib/supabase';
import { Plus } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]);
  const [activeSubject, setActiveSubject] = useState<string | null>('Alla');
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hämta alla lösningar vid start
  useEffect(() => {
    loadSolutions();
  }, []);

  // Real-time subscription
  useEffect(() => {
    const setupSubscription = async () => {
      const subscription = supabase
        .channel('solutions')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'solutions' },
          () => {
            loadSolutions();
          }
        )
        .subscribe();

      return () => subscription.unsubscribe();
    };

    setupSubscription();
  }, []);

  const loadSolutions = async () => {
    try {
      setLoading(true);
      const data = await solutionService.getAllSolutions();
      setSolutions(data);
      setFilteredSolutions(data);
    } catch (error) {
      console.error('Error loading solutions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrera lösningar
  useEffect(() => {
    const filterSolutions = async () => {
      try {
        setLoading(true);
        const data = await solutionService.getSolutions(searchQuery, activeSubject);
        setFilteredSolutions(data);
        setShowResults(searchQuery.length > 0);
      } catch (error) {
        console.error('Error filtering solutions:', error);
      } finally {
        setLoading(false);
      }
    };

    filterSolutions();
  }, [searchQuery, activeSubject]);

  const handleSolutionClick = (solution: Solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
    setShowResults(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSubjectChange = (subject: string) => {
    setActiveSubject(subject);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleUpload = async (data: any) => {
    try {
      let imageUrl = '';
      
      // Ladda upp bild om det finns en
      if (data.image) {
        imageUrl = await solutionService.uploadImage(data.image);
      }

      // Skapa lösning i databasen
      await solutionService.createSolution({
        title: data.title,
        subject: data.subject,
        type: data.type,
        content: `# ${data.title}\n\n## Ämne: ${data.subject}\n## Kategori: ${data.category}\n## Kapitel: ${data.chapter}\n## Typ: ${data.type}\n\n${data.tags.length > 0 ? `**Taggar:** ${data.tags.join(', ')}\n\n` : ''}Lösning kommer snart...`,
        tags: data.tags,
        image_url: imageUrl
      });

      console.log('Solution uploaded successfully!');
    } catch (error) {
      console.error('Error uploading solution:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-blur to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="vision-title mb-4">
            TEKNISKT BASÅR
          </h1>
          <p className="vision-subtitle">
            Sök efter uppgifter och lösningar
          </p>
        </div>

        {/* Search Section */}
        <div className="w-full max-w-3xl relative animate-slide-up">
          <VisionSearch 
            onSearch={handleSearch} 
            showResults={showResults}
          />
          <VisionResults
            solutions={filteredSolutions}
            onSolutionClick={handleSolutionClick}
            showResults={showResults}
          />
          
          {/* Show message when category is empty */}
          {!showResults && activeSubject && activeSubject !== 'Alla' && filteredSolutions.length === 0 && !loading && (
            <div className="mt-8 text-center animate-fade-in">
              <p className="vision-subtitle">
                Inga {activeSubject.toLowerCase()} uppgifter än
              </p>
              <p className="text-sm text-text-tertiary mt-2">
                Klicka på + för att lägga till den första
              </p>
            </div>
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="mt-8 text-center">
              <div className="w-8 h-8 border-2 border-text/20 border-t-text rounded-full animate-spin mx-auto"></div>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={() => setIsUploadOpen(true)}
          className="vision-button fixed top-8 right-8 z-20 animate-scale-in"
        >
          <Plus className="w-6 h-6 text-text" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <VisionNav
        activeSubject={activeSubject}
        onSubjectChange={handleSubjectChange}
      />

      {/* Modals */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
          <div className="relative z-[101]">
            <UploadView
              onClose={() => setIsUploadOpen(false)}
              onUpload={handleUpload}
            />
          </div>
        </div>
      )}

      <SolutionModal
        solution={selectedSolution}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
