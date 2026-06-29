import React from 'react';
import { Clock, Feather, Bookmark, Heart } from 'lucide-react';
import { Article, slugify } from '../data';
import { motion } from 'motion/react';

interface ArticleCardProps {
  article: Article;
  onRead: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  isLiked: boolean;
  onToggleLike: (id: string, e: React.MouseEvent) => void;
}

export default function ArticleCard({
  article,
  onRead,
  isBookmarked,
  onToggleBookmark,
  isLiked,
  onToggleLike
}: ArticleCardProps) {
  return (
    <motion.article
      id={`article-card-${article.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden bg-[#F5F2ED] border border-editorial hover:border-sage-green/30 transition-all duration-300 rounded-[40px] p-6 cursor-pointer shadow-xs hover:shadow-md h-full"
      onClick={() => onRead(article.id)}
    >
      <div>
        {/* Cover Image */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-[28px] bg-stone-100 mb-4">
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Category Tag */}
          <span className="absolute top-3 left-3 bg-primary-cream/90 backdrop-blur-xs border border-editorial text-primary-charcoal font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm">
            {article.category}
          </span>
          
          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-350">
            <button
              onClick={(e) => onToggleLike(article.id, e)}
              className={`p-1.5 rounded-full backdrop-blur-xs border shadow-xs transition-colors duration-200 ${
                isLiked 
                  ? 'bg-rose-50 border-rose-200 text-rose-500' 
                  : 'bg-primary-cream/90 border-editorial text-primary-charcoal hover:bg-white hover:text-rose-500'
              }`}
              title={isLiked ? 'Liked' : 'Like article'}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-1.5 rounded-full backdrop-blur-xs border shadow-xs transition-colors duration-200 ${
                isBookmarked 
                  ? 'bg-warm-accent border-warm-accent text-white' 
                  : 'bg-primary-cream/90 border-editorial text-primary-charcoal hover:bg-white hover:text-warm-accent'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark article'}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* Article Meta */}
        <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-muted-olive">
          <span>{article.date}</span>
          <span>•</span>
          <span className="flex items-center gap-0.5">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-semibold leading-tight mb-2 text-primary-charcoal group-hover:text-warm-accent transition-colors duration-300">
          <a
            href={`/article/${slugify(article.title)}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRead(article.id);
            }}
            className="hover:underline"
          >
            {article.title}
          </a>
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-muted-olive line-clamp-3 leading-relaxed mb-4">
          {article.excerpt}
        </p>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-editorial/60">
        <span className="flex items-center gap-1 font-mono text-[10px] text-primary-charcoal/70">
          <Feather className="w-3 h-3 text-warm-accent" />
          By {article.author}
        </span>
        
        <a
          href={`/article/${slugify(article.title)}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRead(article.id);
          }}
          className="font-mono text-[10px] font-medium tracking-wider text-warm-accent group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1 hover:underline"
        >
          Read Column <span>→</span>
        </a>
      </div>
    </motion.article>
  );
}
