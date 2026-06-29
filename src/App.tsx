import React, { useState, useMemo } from 'react';
import { 
  CATEGORIES, 
  INITIAL_ARTICLES, 
  Article,
  slugify
} from './data';
import { ENTERTAINMENT_ARTICLES } from './entertainmentData';
import ArticleCard from './components/ArticleCard';
import ArticleReader from './components/ArticleReader';
import SubmissionForm from './components/SubmissionForm';
import Manifesto from './components/Manifesto';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  Coffee, 
  Home, 
  Plus, 
  Search, 
  Bookmark, 
  Heart, 
  Feather, 
  Volume2, 
  Info, 
  ChevronRight,
  HelpCircle,
  Clock,
  Music
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Articles state initialized with curated articles and entertainment columns
  const [articles, setArticles] = useState<Article[]>(() => [
    ...INITIAL_ARTICLES,
    ...ENTERTAINMENT_ARTICLES
  ]);
  
  // Filtering & Category state
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'spaces' | 'nourish' | 'wander' | 'entertainment'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  // User interactions states
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);

  // Reader detail state
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  // Modal / Drawer toggle states
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [guidelinesOpen, setGuidelinesOpen] = useState(false);

  // Client-side SEO friendly routing (back/forward and mount sync)
  React.useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname;
      
      // 1. Article path match: /article/:slug or /:slug (like /news_title)
      const articleMatch = path.match(/^\/article\/([^/]+)$/) || path.match(/^\/([^/]+)$/);
      if (articleMatch) {
        const slugOrId = articleMatch[1];
        if (slugOrId && slugOrId !== '' && slugOrId !== 'category' && slugOrId !== 'sitemap.xml' && slugOrId !== 'robots.txt' && !['spaces', 'nourish', 'wander', 'entertainment', 'all'].includes(slugOrId)) {
          const found = articles.find(a => a.id === slugOrId || slugify(a.title) === slugOrId);
          if (found) {
            setActiveArticleId(found.id);
            setSelectedCategory(found.category);
            return;
          }
        }
      }
      
      // 2. Category path match: /category/:id
      const categoryMatch = path.match(/^\/category\/([^/]+)$/);
      if (categoryMatch) {
        const catId = categoryMatch[1];
        if (['all', 'spaces', 'nourish', 'wander', 'entertainment'].includes(catId)) {
          setSelectedCategory(catId as any);
          setActiveArticleId(null);
          return;
        }
      }
      
      // 3. Fallback to Home
      setActiveArticleId(null);
      setSelectedCategory('all');
    };

    window.addEventListener('popstate', handleUrlRouting);
    
    // Initial sync
    handleUrlRouting();

    return () => window.removeEventListener('popstate', handleUrlRouting);
  }, [articles]);

  // Synchronize URL path and SEO metadata on active selection change
  React.useEffect(() => {
    const path = window.location.pathname;
    const activeArticle = articles.find(a => a.id === activeArticleId);
    
    let expectedPath = '/';
    let title = 'Aura Magazine';
    let description = 'A luxury lifestyle publication exploring slow living, wabi-sabi spaces, and quiet escapes.';
    
    if (activeArticle) {
      expectedPath = `/article/${slugify(activeArticle.title)}`;
      title = `${activeArticle.title} | Aura Magazine`;
      description = activeArticle.excerpt;
    } else if (selectedCategory && selectedCategory !== 'all') {
      expectedPath = `/category/${selectedCategory}`;
      const categoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory;
      title = `${categoryName} | Aura Magazine`;
      description = CATEGORIES.find(c => c.id === selectedCategory)?.description || description;
    }
    
    // Only push to history if path actually changed to avoid duplicating state entries
    if (path !== expectedPath) {
      window.history.pushState(null, '', expectedPath);
    }
    
    // Set dynamic browser tab name
    document.title = title;
    
    // Update HTML SEO Meta Tags dynamically
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', description);
    }
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', title);
    }
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', description);
    }
  }, [activeArticleId, selectedCategory, articles]);

  // Filtered Articles Selector
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // 1. Category Filter
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      
      // 2. Search Query Filter
      const matchesSearch = searchQuery.trim() === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      // 3. Bookmarked Filter
      const matchesBookmark = !showOnlyBookmarks || bookmarkedArticles.includes(article.id);

      return matchesCategory && matchesSearch && matchesBookmark;
    });
  }, [articles, selectedCategory, searchQuery, showOnlyBookmarks, bookmarkedArticles]);

  // Featured Hero Article Selector (Only shown in 'all' view when search is empty)
  const featuredArticle = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery !== '' || showOnlyBookmarks) return null;
    return articles.find(a => a.featured) || articles[0];
  }, [articles, selectedCategory, searchQuery, showOnlyBookmarks]);

  // Rest of the grid articles (excluding featured if displayed)
  const gridArticles = useMemo(() => {
    if (featuredArticle) {
      return filteredArticles.filter(a => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle]);

  // Handlers
  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedArticles(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedArticles(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddArticle = (newArticle: Article) => {
    setArticles(prev => [newArticle, ...prev]);
  };

  // Safe category count
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return articles.length;
    return articles.filter(a => a.category === catId).length;
  };

  const activeArticle = articles.find(a => a.id === activeArticleId) || null;

  return (
    <div className="min-h-screen bg-primary-cream text-primary-charcoal font-sans selection:bg-warm-accent selection:text-white flex flex-col justify-between">
      
      {/* 1. TOP METADATA BAR (Print Style) */}
      <div id="magazine-topbar" className="border-b border-editorial px-4 md:px-8 py-2.5 flex justify-between items-center text-[10px] font-mono tracking-wider text-muted-olive">
        <div className="flex items-center gap-4">
          <span>AURA MAGAZINE • LIFESTYLE DESK</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">ISSUE NO. 12 (SUMMER 2026)</span>
        </div>
        <div className="flex items-center gap-4">
          <span>UTC: 2026-06-29</span>
          <span>•</span>
          <span className="text-warm-accent font-medium uppercase">Volume XII</span>
        </div>
      </div>

      {/* 2. MAIN HEADER (Branding) */}
      <header id="magazine-main-header" className="px-4 md:px-8 py-8 md:py-12 text-center flex flex-col items-center">
        <div className="max-w-4xl w-full flex flex-col items-center">
          {/* Logo */}
          <h1 className="magazine-title text-5xl md:text-7xl lg:text-8xl tracking-[-0.04em] font-serif font-semibold text-sage-green select-none mb-3">
            A U R A
          </h1>
          
          <div className="divider-line-double max-w-lg mb-4" />
          
          {/* Subtitle */}
          <p className="font-serif italic text-sm md:text-base text-muted-olive max-w-xl leading-relaxed">
            An inquiry into contemporary slow living, mindful spaces, slow gastronomy, and silent escapes.
          </p>

          <p className="font-mono text-[9px] tracking-widest text-muted-olive uppercase mt-3">
            "To go fast is to decay; to pause is to gather oneself."
          </p>
        </div>
      </header>

      {/* 3. DESK NAVIGATION & TOOLS */}
      <section id="desk-navigation" className="px-4 md:px-8 max-w-7xl mx-auto w-full mb-8">
        <div className="border-y border-editorial py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#F5F2ED]/60 p-4 rounded-3xl backdrop-blur-xs">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={isActive}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setShowOnlyBookmarks(false); // Reset bookmarks toggle on category switch
                  }}
                  className={`px-3 py-1.5 rounded-md font-mono text-[10px] uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-sage-green text-white font-medium shadow-xs' 
                      : 'bg-transparent text-muted-olive hover:text-sage-green hover:bg-[#EAE7E0]'
                  }`}
                >
                  {cat.name}
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#EAE7E0] text-muted-olive'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search columns..."
                className="bg-white border border-editorial rounded-md pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-warm-accent w-48 sm:w-56 font-sans text-primary-charcoal"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Bookmarks Toggle Filter */}
            <button
              onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
              className={`p-1.5 rounded-md border text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                showOnlyBookmarks 
                  ? 'bg-warm-accent text-white border-warm-accent' 
                  : 'bg-white border-editorial text-muted-olive hover:border-[#D6D0C2]'
              }`}
              title="Filter by your bookmarked stories"
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">My Reading List ({bookmarkedArticles.length})</span>
            </button>

            {/* Contributor button */}
            <button
              onClick={() => setIsSubmissionOpen(true)}
              className="bg-sage-green text-white hover:bg-warm-accent transition-colors font-mono text-xs uppercase tracking-widest px-3.5 py-2 rounded-md flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Submit Story
            </button>
          </div>
        </div>

        {/* Dynamic Category description banner */}
        <div className="mt-3 text-center sm:text-left px-1">
          <p className="font-serif italic text-xs text-muted-olive">
            {CATEGORIES.find(c => c.id === selectedCategory)?.description}
          </p>
        </div>
      </section>

      {/* 4. MAIN MAGAZINE CATALOG */}
      <main className="flex-grow px-4 md:px-8 max-w-7xl mx-auto w-full pb-16">
        
        {/* Category: Entertainment Blank State (AS REQUESTED) */}
        {selectedCategory === 'entertainment' && filteredArticles.length === 0 ? (
          <motion.div
            id="entertainment-blank-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-dashed border-[#D6D0C2] rounded-[40px] bg-[#F9F8F6] p-8 md:p-16 text-center max-w-2xl mx-auto my-12"
          >
            <div className="w-16 h-16 bg-[#F5F2ED] border border-editorial rounded-full flex items-center justify-center mx-auto mb-6">
              <Music className="w-6 h-6 text-warm-accent" />
            </div>
            
            <h2 className="font-serif text-2xl font-bold text-primary-charcoal mb-3 uppercase tracking-wide">
              The Entertainment Desk
            </h2>
            <p className="font-mono text-[10px] text-warm-accent uppercase tracking-widest mb-6">
              Volume XII — Preparing Inaugural Issue
            </p>
            
            <div className="divider-line max-w-xs mx-auto mb-6" />

            <p className="text-xs md:text-sm text-muted-olive leading-relaxed max-w-md mx-auto mb-8">
              Welcome to the silence. Our cultural editors are currently in the field documenting deep-listening ambient records, slow-frequency cinema, and tactile acoustic reviews. To introduce the lifestyle with authentic intent, this column is intentionally kept blank in our opening volume.
            </p>

            <div className="bg-[#F5F2ED] border border-editorial rounded-2xl p-5 mb-8 text-left max-w-md mx-auto">
              <p className="text-xs italic text-muted-olive leading-relaxed">
                "Modern entertainment is noisy, urgent, and fleeting. Here, we choose to listen to the moss grow first. When the noise quietens, the review begins."
              </p>
            </div>

            <button
              onClick={() => setIsSubmissionOpen(true)}
              className="bg-sage-green hover:bg-warm-accent text-white font-mono text-[10px] uppercase tracking-widest py-3 px-6 rounded-md transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Feather className="w-3.5 h-3.5 text-white" />
              Contribute the First Review
            </button>
          </motion.div>
        ) : (
          <>
            {/* FEATURED HERO ARTICLE (Only shown in 'All' view when relevant) */}
            {featuredArticle && (
              <motion.div
                id="featured-hero-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-editorial rounded-[40px] overflow-hidden bg-[#F5F2ED] p-6 md:p-10 mb-12 shadow-xs group"
              >
                {/* Hero Image */}
                <div className="lg:col-span-7 aspect-16/10 lg:aspect-auto lg:h-[420px] rounded-[28px] overflow-hidden bg-stone-50 relative">
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <span className="absolute top-4 left-4 bg-primary-cream border border-editorial text-primary-charcoal font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-sm shadow-xs">
                    Featured Column
                  </span>
                </div>

                {/* Hero Content */}
                <div className="lg:col-span-5 flex flex-col justify-between py-2">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-2.5 font-mono text-[10px] text-muted-olive uppercase tracking-wider mb-3">
                      <span>{featuredArticle.category}</span>
                      <span>•</span>
                      <span>{featuredArticle.date}</span>
                      <span>•</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary-charcoal leading-tight mb-4 group-hover:text-warm-accent transition-colors duration-300">
                      {featuredArticle.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs md:text-sm text-muted-olive leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  {/* Hero CTA & Quick Save */}
                  <div className="pt-6 border-t border-editorial/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-white border border-editorial flex items-center justify-center font-serif font-bold text-xs text-warm-accent">
                        {featuredArticle.author.charAt(0)}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-muted-olive uppercase tracking-wider">Writer</span>
                        <span className="text-xs font-serif font-semibold text-primary-charcoal">{featuredArticle.author}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Interaction toggles */}
                      <button
                        onClick={() => handleToggleLike(featuredArticle.id)}
                        className={`p-2 rounded-full border transition-colors ${
                          likedArticles.includes(featuredArticle.id) 
                            ? 'bg-rose-50 border-rose-200 text-rose-500' 
                            : 'bg-white border-editorial text-primary-charcoal hover:bg-stone-100'
                        }`}
                        title="Like article"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      
                      <button
                        onClick={() => handleToggleBookmark(featuredArticle.id)}
                        className={`p-2 rounded-full border transition-colors ${
                          bookmarkedArticles.includes(featuredArticle.id) 
                            ? 'bg-warm-accent border-warm-accent text-white' 
                            : 'bg-white border-editorial text-primary-charcoal hover:bg-stone-100'
                        }`}
                        title="Bookmark article"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={() => setActiveArticleId(featuredArticle.id)}
                        className="bg-sage-green text-white hover:bg-warm-accent transition-all font-mono text-[10px] uppercase tracking-widest py-2.5 px-4 rounded-md ml-1 inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        Read Column <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ARTICLES GRID */}
            {gridArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                  {gridArticles.map(article => (
                    <div key={article.id} className="h-full">
                      <ArticleCard
                        article={article}
                        onRead={setActiveArticleId}
                        isBookmarked={bookmarkedArticles.includes(article.id)}
                        onToggleBookmark={handleToggleBookmark}
                        isLiked={likedArticles.includes(article.id)}
                        onToggleLike={handleToggleLike}
                      />
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              // Empty search state
              selectedCategory !== 'entertainment' && (
                <div className="text-center py-16 border border-editorial rounded-lg bg-white/40 my-8">
                  <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-3" />
                  <p className="font-serif text-lg text-primary-charcoal mb-1">No Columns Match Your Filter</p>
                  <p className="text-xs text-muted-olive max-w-xs mx-auto">
                    Try clearing your search query or selecting a different editorial category.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowOnlyBookmarks(false);
                      setSelectedCategory('all');
                    }}
                    className="mt-4 font-mono text-[10px] text-warm-accent hover:underline uppercase tracking-wider"
                  >
                    Reset Filter Desk
                  </button>
                </div>
              )
            )}
          </>
        )}

        {/* 5. INTERACTIVE MANIFESTO PILLARS */}
        {selectedCategory === 'all' && <Manifesto />}
      </main>

      {/* 6. IMMERSIVE READER MODE (Overlay Panel) */}
      <ArticleReader
        article={activeArticle}
        onClose={() => setActiveArticleId(null)}
        isBookmarked={bookmarkedArticles.includes(activeArticleId || '')}
        onToggleBookmark={handleToggleBookmark}
        isLiked={likedArticles.includes(activeArticleId || '')}
        onToggleLike={handleToggleLike}
      />

      {/* 7. CONTRIBUTOR CORNER (Drawer) */}
      <SubmissionForm
        isOpen={isSubmissionOpen}
        onClose={() => setIsSubmissionOpen(false)}
        onSubmit={handleAddArticle}
      />

      {/* 8. MAGAZINE FOOTER */}
      <footer id="magazine-footer" className="bg-[#F5F2ED] border-t border-editorial pt-12 pb-8 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-editorial/60">
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <span className="font-serif font-bold text-xl tracking-wider text-sage-green">AURA MAGAZINE</span>
              <p className="text-xs text-muted-olive leading-relaxed max-w-sm">
                A luxury lifestyle periodical introducing aesthetic focus, wabi-sabi spaces, botanical cuisine, and mindful geographic wanderlust. Handcrafted to nurture silent observation.
              </p>
              <div className="font-mono text-[9px] text-muted-olive/70 uppercase">
                Aura Magazine © 2026 • All Editorial Rights Reserved
              </div>
            </div>

            {/* Quick Links Column (Only local content, NO external links) */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-mono text-[10px] tracking-widest uppercase text-sage-green font-semibold">Editorial Office</h4>
              <ul className="space-y-1.5 text-xs text-muted-olive">
                <li>
                  <button onClick={() => setAboutOpen(true)} className="hover:text-warm-accent transition-colors text-left cursor-pointer">
                    About Aura Desk
                  </button>
                </li>
                <li>
                  <button onClick={() => setGuidelinesOpen(true)} className="hover:text-warm-accent transition-colors text-left cursor-pointer">
                    Submission Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Aura Print Circle issues are produced in limited quantities twice per year. Catalog details will launch soon.")} className="hover:text-warm-accent transition-colors text-left cursor-pointer">
                    Tactile Catalogues
                  </button>
                </li>
              </ul>
            </div>

            {/* Quote of the volume */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-mono text-[10px] tracking-widest uppercase text-sage-green font-semibold font-serif">Volume Motto</h4>
              <p className="font-serif italic text-xs text-muted-olive leading-relaxed">
                "We do not travel to find ourselves, but to dissolve ourselves in the local light."
              </p>
              <div className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-warm-accent rounded-full" />
                <span className="w-1.5 h-1.5 bg-sage-green rounded-full" />
                <span className="w-1.5 h-1.5 bg-[#D6D0C2] rounded-full" />
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-muted-olive gap-4">
            <div className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-warm-accent" />
              <span>Zero-External-Links Policy Active (No in/out referrers first)</span>
            </div>
            <div>
              <span>Designed with Desktop-First Precision & Swiss Typography</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ABOUT DESK MODAL (Strictly local, no external link) */}
      <AnimatePresence>
        {aboutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setAboutOpen(false)}
              className="fixed inset-0 z-50 bg-primary-charcoal/50 backdrop-blur-xs"
            />
            <motion.div
              id="about-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 m-auto z-50 h-fit max-h-[80vh] w-[90%] max-w-md bg-primary-cream border border-[#D6D0C2] p-8 rounded-[40px] shadow-2xl flex flex-col justify-between"
            >
              <div>
                <h3 className="font-serif text-xl font-bold text-sage-green mb-3">About Aura Desk</h3>
                <div className="divider-line mb-4" />
                <p className="text-xs text-muted-olive leading-relaxed mb-4">
                  Aura was founded in 2026 as an analog-first publishing board dedicated to preserving aesthetic composure.
                </p>
                <p className="text-xs text-muted-olive leading-relaxed mb-4">
                  We believe that our attention is a scarce and precious resource. Rather than chasing dynamic, rapid-fire click counters, we choose slow stories. This digital catalog introduces our columns to the community.
                </p>
                <p className="text-xs text-muted-olive leading-relaxed italic border-l-2 border-warm-accent pl-3 text-primary-charcoal">
                  "There are no external links leading away from Aura. This space is a closed, silent garden."
                </p>
              </div>
              <button
                onClick={() => setAboutOpen(false)}
                className="mt-6 w-full bg-sage-green hover:bg-warm-accent text-white font-mono text-[10px] uppercase tracking-widest py-3 rounded-lg transition-all cursor-pointer"
              >
                Close Desk
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* GUIDELINES DESK MODAL (Strictly local) */}
      <AnimatePresence>
        {guidelinesOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setGuidelinesOpen(false)}
              className="fixed inset-0 z-50 bg-primary-charcoal/50 backdrop-blur-xs"
            />
            <motion.div
              id="guidelines-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 m-auto z-50 h-fit max-h-[85vh] w-[90%] max-w-md bg-primary-cream border border-[#D6D0C2] p-8 rounded-[40px] shadow-2xl overflow-y-auto"
            >
              <h3 className="font-serif text-xl font-bold text-sage-green mb-3">Submission Guidelines</h3>
              <div className="divider-line mb-4" />
              
              <div className="space-y-4 text-xs text-muted-olive leading-relaxed">
                <div>
                  <h4 className="font-mono text-[10px] uppercase text-primary-charcoal font-semibold mb-1">1. Theme Focus</h4>
                  <p>All stories must explore architectural harmony, slow food, nature-immersion, or quiet auditory spaces. We do not publish political, urgent, or news-cycle logs.</p>
                </div>
                
                <div>
                  <h4 className="font-mono text-[10px] uppercase text-primary-charcoal font-semibold mb-1">2. Tone & Vocabulary</h4>
                  <p>Choose gentle, highly descriptive sensory language. Focus on physical and aesthetic feelings rather than digital metadata or price points.</p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] uppercase text-primary-charcoal font-semibold mb-1">3. Cover Preset Rules</h4>
                  <p>Select the preset cover that aligns best with the visual color palettes of your story. This preserves Aura's uniform aesthetic rhythm.</p>
                </div>
              </div>

              <button
                onClick={() => setGuidelinesOpen(false)}
                className="mt-6 w-full bg-sage-green hover:bg-warm-accent text-white font-mono text-[10px] uppercase tracking-widest py-3 rounded-lg transition-all cursor-pointer"
              >
                Accept & Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
