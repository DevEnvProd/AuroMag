import React, { useEffect } from 'react';
import { ArrowLeft, Clock, Bookmark, Heart, Sparkles, Share2, Printer, Check } from 'lucide-react';
import { Article } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ArticleReaderProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}

export default function ArticleReader({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  isLiked,
  onToggleLike
}: ArticleReaderProps) {
  // Prevent body scroll when reader is open
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [article]);

  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!article) return null;

  // Generate a customized mock pull-quote from the content
  const pullQuote = article.content[Math.floor(article.content.length / 2)] || '';

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        id="editorial-reader-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-primary-cream/98 backdrop-blur-md"
      >
        {/* Navigation Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-editorial bg-primary-cream/80 backdrop-blur-md px-4 md:px-8 py-4">
          <button
            id="reader-back-btn"
            onClick={onClose}
            className="group flex items-center gap-2 font-mono text-xs text-primary-charcoal/80 hover:text-sage-green transition-colors py-1.5 px-3 rounded-full border border-editorial hover:border-sage-green cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Catalog
          </button>

          <div className="flex items-center gap-2.5">
            {/* Inner actions ONLY, no external links */}
            <button
              onClick={() => onToggleLike(article.id)}
              className={`p-2 rounded-full border shadow-2xs transition-colors flex items-center gap-1.5 font-mono text-xs cursor-pointer ${
                isLiked 
                  ? 'bg-rose-50 border-rose-200 text-rose-500' 
                  : 'bg-white border-editorial text-primary-charcoal hover:bg-stone-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isLiked ? 'Liked' : 'Like'}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-full border shadow-2xs transition-colors flex items-center gap-1.5 font-mono text-xs cursor-pointer ${
                isBookmarked 
                  ? 'bg-warm-accent border-warm-accent text-white' 
                  : 'bg-white border-editorial text-primary-charcoal hover:bg-stone-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Bookmark'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full border border-editorial bg-white text-primary-charcoal hover:bg-stone-50 shadow-2xs transition-colors flex items-center gap-1.5 font-mono text-xs cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Article Body Container */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-24">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category Meta */}
            <div className="flex items-center justify-center gap-2.5 mb-4 mt-4 font-mono text-xs tracking-widest uppercase text-warm-accent">
              <span>{article.category}</span>
              <span>/</span>
              <span>Issue No. 12</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-center font-bold tracking-tight text-primary-charcoal leading-[1.1] mb-6 max-w-3xl mx-auto">
              {article.title}
            </h1>

            {/* Author Date Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10 font-mono text-xs text-muted-olive border-y border-editorial py-4 max-w-2xl mx-auto">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-warm-accent" />
                By <strong className="text-primary-charcoal font-medium">{article.author}</strong>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Published: {article.date}</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            {/* Large Cover Hero */}
            <div className="aspect-16/9 w-full overflow-hidden rounded-[40px] bg-stone-100 shadow-md mb-12 border border-editorial">
              <img
                src={article.coverImage}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Columns & Paragraphs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column Sidecard - Quick philosophy */}
              <div className="md:col-span-3 border-l-2 border-warm-accent pl-4 py-1 h-fit md:sticky md:top-24 mb-6 md:mb-0">
                <h4 className="font-mono text-[10px] tracking-widest uppercase text-warm-accent mb-2">Column Focus</h4>
                <p className="font-serif italic text-xs text-muted-olive leading-relaxed">
                  "In placing our awareness onto daily simple acts, we reclaim the poetry of life."
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-muted-olive">
                  <span>Likes: {isLiked ? 25 : 24}</span>
                  <span>•</span>
                  <span>Volume XII</span>
                </div>
              </div>

              {/* Main Reading Flow */}
              <div className="md:col-span-9">
                {/* First Paragraph with Dropcap */}
                {article.content.length > 0 && (
                  <p 
                    className="editorial-body text-primary-charcoal text-base md:text-lg mb-6 first-letter:text-5xl md:first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-warm-accent"
                    dangerouslySetInnerHTML={{ __html: article.content[0] }}
                  />
                )}

                {/* Remaining Paragraphs */}
                {article.content.slice(1).map((para, index) => {
                  // Put a pull quote mid-way
                  if (index === 1 && pullQuote) {
                    return (
                      <React.Fragment key={index}>
                        <blockquote className="my-10 border-y-2 border-editorial py-6 px-4 italic font-serif text-lg md:text-xl text-warm-accent text-center max-w-xl mx-auto">
                          "{pullQuote.length > 80 ? pullQuote.slice(0, 90) + '...' : pullQuote}"
                        </blockquote>
                        <p 
                          className="editorial-body text-primary-charcoal text-base md:text-lg mb-6"
                          dangerouslySetInnerHTML={{ __html: para }}
                        />
                      </React.Fragment>
                    );
                  }

                  return (
                    <p 
                      key={index} 
                      className="editorial-body text-primary-charcoal text-base md:text-lg mb-6"
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  );
                })}

                {/* Closing signature */}
                <div className="mt-12 pt-8 border-t border-editorial flex justify-between items-center">
                  <div>
                    <span className="font-mono text-xs text-muted-olive block">Written by</span>
                    <span className="font-serif font-semibold text-primary-charcoal text-base">{article.author}</span>
                  </div>
                  <div className="font-serif italic text-warm-accent text-sm">
                    Aura Editorial Board
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer actions overlay */}
        <div className="bg-[#F5F2ED] border border-editorial py-12 px-6 text-center rounded-[40px] max-w-4xl mx-auto my-12 shadow-sm">
          <div className="max-w-xl mx-auto">
            <h3 className="font-serif text-xl font-bold text-sage-green mb-3">Enjoyed this column?</h3>
            <p className="text-xs text-muted-olive mb-6">
              Aura is entirely reader-supported. Subscribe to our monthly print circle for tactile booklets delivered directly to your door.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => alert("Aura Print Subscriptions will launch soon. Thank you for your interest!")}
                className="bg-sage-green hover:bg-warm-accent text-white font-mono text-xs tracking-widest uppercase py-3.5 px-6 rounded-lg transition-all shadow-xs cursor-pointer"
              >
                Join Monthly Circle
              </button>
              <button
                onClick={onClose}
                className="bg-white border border-editorial text-primary-charcoal hover:border-[#D6D0C2] hover:bg-stone-50 font-mono text-xs tracking-widest uppercase py-3.5 px-6 rounded-lg transition-all cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
