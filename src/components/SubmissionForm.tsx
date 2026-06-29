import React, { useState } from 'react';
import { X, Send, Feather, Check, Image as ImageIcon } from 'lucide-react';
import { Article } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface SubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (article: Article) => void;
}

const PRESET_COVERS = [
  {
    id: 'ceramic',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    label: 'Studio Ceramics'
  },
  {
    id: 'kitchen',
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    label: 'Sunlit Kitchen'
  },
  {
    id: 'cabin',
    url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
    label: 'Mountain Cabin'
  },
  {
    id: 'vinyl',
    url: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=800&q=80',
    label: 'Ambient Listening'
  }
];

export default function SubmissionForm({ isOpen, onClose, onSubmit }: SubmissionFormProps) {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'spaces' | 'nourish' | 'wander' | 'entertainment'>('spaces');
  const [excerpt, setExcerpt] = useState('');
  const [contentRaw, setContentRaw] = useState('');
  const [selectedCover, setSelectedCover] = useState(PRESET_COVERS[0].url);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!author || !title || !excerpt || !contentRaw) {
      alert('Please fill out all fields to submit your editorial piece.');
      return;
    }

    // Split text into paragraphs on double-newline, filter empty ones
    const paragraphs = contentRaw
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const newArticle: Article = {
      id: `user-${Date.now()}`,
      category,
      title,
      excerpt,
      content: paragraphs.length > 0 ? paragraphs : [contentRaw],
      coverImage: selectedCover,
      author,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      readTime: `${Math.max(1, Math.ceil(contentRaw.split(/\s+/).length / 200))} min read`
    };

    onSubmit(newArticle);
    setIsSuccess(true);
    
    // Clear form
    setAuthor('');
    setTitle('');
    setExcerpt('');
    setContentRaw('');
    setCategory('spaces');
    setSelectedCover(PRESET_COVERS[0].url);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-primary-charcoal/40 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            id="submission-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-primary-cream border-l border-editorial shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-editorial px-6 py-4 bg-white">
              <div className="flex items-center gap-2">
                <Feather className="w-5 h-5 text-warm-accent" />
                <h2 className="font-serif text-lg font-bold text-sage-green">Submit a Column</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-muted-olive hover:text-sage-green transition-colors hover:bg-[#F5F2ED] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 border border-emerald-200">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-1 text-sage-green">Piece Received</h3>
                  <p className="text-xs text-muted-olive max-w-xs">
                    Your column has been successfully cataloged and added to the volume index. Thank you for your aesthetic contribution.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="bg-[#F5F2ED] border border-[#EAE7E0] rounded-2xl p-5 mb-4">
                    <p className="text-xs text-muted-olive leading-relaxed">
                      <strong>The Contributor Corner:</strong> Aura accepts high-quality columns focusing on design, spatial aesthetics, mindfulness, and visual arts. Your submitted piece will immediately appear in your browser's catalog.
                    </p>
                  </div>

                  {/* Author Name */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted-olive tracking-wider mb-1.5">
                      Contributor Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                      placeholder="e.g. Clara Thorne"
                      className="w-full bg-white border border-editorial text-primary-charcoal rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-warm-accent font-sans"
                    />
                  </div>

                  {/* Column Title */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted-olive tracking-wider mb-1.5">
                      Column Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g. The Quiet Splendor of Linen"
                      className="w-full bg-white border border-editorial text-primary-charcoal rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-warm-accent font-serif font-medium"
                    />
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted-olive tracking-wider mb-1.5">
                      Desk Category *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['spaces', 'nourish', 'wander', 'entertainment'] as const).map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`py-2 px-3 rounded-xl border font-mono text-[10px] uppercase tracking-wider text-center transition-all cursor-pointer ${
                            category === cat
                              ? 'bg-sage-green text-white border-sage-green font-medium shadow-xs'
                              : 'bg-white border-editorial text-muted-olive hover:border-sage-green/30 hover:bg-[#F5F2ED]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Short Excerpt */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted-olive tracking-wider mb-1.5">
                      Short Excerpt (Teaser) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={excerpt}
                      onChange={e => setExcerpt(e.target.value)}
                      maxLength={140}
                      placeholder="A short sentence summarizing your column (max 140 chars)..."
                      className="w-full bg-white border border-editorial text-primary-charcoal rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-warm-accent"
                    />
                  </div>

                  {/* Story Body */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted-olive tracking-wider mb-1.5">
                      Story Content * (Double enter for paragraphs)
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={contentRaw}
                      onChange={e => setContentRaw(e.target.value)}
                      placeholder="Enter the main body of your story here. Cultivate descriptive, thoughtful lifestyle terminology..."
                      className="w-full bg-white border border-editorial text-primary-charcoal rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-warm-accent font-sans"
                    />
                  </div>

                  {/* Image Selector */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted-olive tracking-wider mb-2 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-warm-accent" />
                      Choose Cover Image Preset
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {PRESET_COVERS.map(cover => (
                        <button
                          key={cover.id}
                          type="button"
                          onClick={() => setSelectedCover(cover.url)}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            selectedCover === cover.url
                              ? 'border-warm-accent ring-2 ring-warm-accent/20 scale-95'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                          title={cover.label}
                        >
                          <img
                            src={cover.url}
                            alt={cover.label}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-muted-olive mt-1.5 block text-right italic">
                      Cover: {PRESET_COVERS.find(c => c.url === selectedCover)?.label}
                    </span>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-sage-green text-white hover:bg-warm-accent transition-colors font-mono text-xs uppercase tracking-widest py-3 px-4 rounded-xl flex items-center justify-center gap-2 mt-2 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Transmit Story
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
