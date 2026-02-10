import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { courseStructure } from '../data/courseStructure';

interface UploadViewProps {
  onClose: () => void;
  onUpload: (data: UploadData) => void;
}

interface UploadData {
  image?: File;
  title: string;
  subject: string;
  category: string;
  chapter: string;
}

const UploadView: React.FC<UploadViewProps> = ({ onClose, onUpload }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [title, setTitle] = useState('');
  const [subject] = useState<'Physics'>('Physics');
  const [category, setCategory] = useState('');
  const [chapter, setChapter] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = (file: File) => {
    setImage(file);
    setError(''); // Rensa felmeddelanden
    setSelectedFileName(file.name);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageCapture(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        const dummyFile = new File(['dummy'], 'camera-capture.jpg', { type: 'image/jpeg' });
        handleImageCapture(dummyFile);
      }, 2000);
    } catch (error) {
      console.error('Camera access denied:', error);
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!title) {
      setError('Titel är obligatoriskt');
      return;
    }

    if (!category) {
      setError('Kategori är obligatoriskt');
      return;
    }

    if (!chapter) {
      setError('Kapitel är obligatoriskt');
      return;
    }

    setIsUploading(true);
    
    try {
      const uploadData: UploadData = {
        ...(image ? { image } : {}),
        title,
        subject,
        category,
        chapter,
      };

      await onUpload(uploadData);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Kunde inte ladda upp lösningen. Försök igen.');
    } finally {
      setIsUploading(false);
    }
  };

  const availableCategories = courseStructure.filter(cat => cat.subject === subject);
  const selectedCategory = availableCategories.find(cat => cat.name === category);
  const availableChapters = selectedCategory?.chapters || [];

  return (
    <div className="vision-window p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-white/40 backdrop-blur-xl -m-12 p-12 mb-0 rounded-t-3xl z-10">
        <h2 className="vision-title">Ladda upp lösning</h2>
        <button
          onClick={onClose}
          className="p-3 hover:bg-white/30 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pt-4">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-light text-text-secondary mb-4 tracking-wide">Fil</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleCameraCapture}
              className="vision-window p-6 text-center hover:bg-card-hover transition-colors"
            >
              <Camera className="w-8 h-8 text-text mx-auto mb-3" />
              <span className="text-sm font-light text-text tracking-wide">Ta foto</span>
            </button>
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="vision-window p-6 text-center hover:bg-card-hover transition-colors"
            >
              <Upload className="w-8 h-8 text-text mx-auto mb-3" />
              <span className="text-sm font-light text-text tracking-wide">Välj fil</span>
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {preview && (
            <div className="mt-6 relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-2xl"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview('');
                  setSelectedFileName('');
                }}
                className="absolute top-3 right-3 p-2 bg-white/60 backdrop-blur-sm text-text rounded-full hover:bg-white/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {!preview && selectedFileName && (
            <div className="mt-6 relative">
              <div className="w-full px-6 py-4 bg-white/30 backdrop-blur-xl border border-border/50 rounded-2xl text-sm font-light text-text-secondary tracking-wide">
                {selectedFileName}
              </div>
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview('');
                  setSelectedFileName('');
                }}
                className="absolute top-1/2 -translate-y-1/2 right-3 p-2 bg-white/60 backdrop-blur-sm text-text rounded-full hover:bg-white/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-light text-text-secondary mb-3 tracking-wide">Titel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="t.ex. Derivata av polynomfunktioner"
            className="w-full px-6 py-4 bg-white/30 backdrop-blur-xl border border-border/50 rounded-2xl focus:outline-none focus:bg-white/40 transition-all font-light tracking-wide"
            required
          />
        </div>

        {/* Subject & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-light text-text-secondary mb-3 tracking-wide">Ämne</label>
            <div className="w-full px-6 py-4 bg-white/30 backdrop-blur-xl border border-border/50 rounded-2xl text-sm font-light text-text tracking-wide">
              Fysik
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-text-secondary mb-3 tracking-wide">Kategori</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setChapter('');
              }}
              className="w-full px-6 py-4 bg-white/30 backdrop-blur-xl border border-border/50 rounded-2xl focus:outline-none focus:bg-white/40 transition-all font-light tracking-wide"
              required
            >
              <option value="">Välj kategori</option>
              {availableCategories.map((cat: any) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chapter */}
        {category && (
          <div>
            <label className="block text-sm font-light text-text-secondary mb-3 tracking-wide">
              {subject === 'Physics' && category === 'Gamla Tentor/Duggor' ? 'Dugga/Tenta' : 'Kapitel'}
            </label>
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="w-full px-6 py-4 bg-white/30 backdrop-blur-xl border border-border/50 rounded-2xl focus:outline-none focus:bg-white/40 transition-all font-light tracking-wide"
              required
            >
              <option value="">
                {subject === 'Physics' && category === 'Gamla Tentor/Duggor' ? 'Välj datum' : 'Välj kapitel'}
              </option>
              {availableChapters.map((chap: any) => (
                <option key={chap} value={chap}>
                  {chap}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-600 text-sm font-light">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="sticky bottom-0 bg-white/40 backdrop-blur-xl -m-12 p-12 mt-8 rounded-b-3xl">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-4 bg-white/30 backdrop-blur-xl border border-border/50 rounded-2xl font-light text-text hover:bg-white/40 transition-all tracking-wide"
            >
              Avbryt
            </button>
            <button
              type="submit"
              disabled={!title || !category || !chapter || isUploading}
              className="flex-1 px-8 py-4 bg-text text-white rounded-2xl font-light hover:bg-text/90 transition-all tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Laddar upp...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Ladda upp
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadView;
