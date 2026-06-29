import React, { useState } from 'react';
import { Compass, Coffee, Home, ChevronLeft, ChevronRight, BookOpen, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PILLARS = [
  {
    id: 1,
    icon: Home,
    title: 'Spaces of Intent',
    subtitle: 'Aesthetics & Architecture',
    text: 'A home should not be a storage of objects, but a sanctuary of pure awareness. By honoring natural materials, raw cast concrete, and the play of sunlight, we cultivate environments that foster deep inner quietude.',
    quote: "Your surroundings are the physical landscape of your mind. Choose clarity over clutter."
  },
  {
    id: 2,
    icon: Coffee,
    title: 'Slow Gastronomy',
    subtitle: 'Nourishing Body & Mind',
    text: 'Cooking is a daily meditation. From the slow alchemy of wild sourdough leavening to the quiet steam of morning filter coffee, we believe in restoring the connection between the rich soil and our dining tables.',
    quote: "When we cook with absolute presence, simple ingredients undergo extraordinary transformations."
  },
  {
    id: 3,
    icon: Compass,
    title: 'Mindful Wandering',
    subtitle: 'Silent Exploration',
    text: 'Traveling is not about ticking off lists of attractions, but about adjusting our internal frequency. We pursue quietude—the silent moss terraces of northern hills or Sweden\'s cold sea inlets.',
    quote: "To travel is to adjust your posture toward the earth, listening rather than demanding."
  },
  {
    id: 4,
    icon: BookOpen,
    title: 'Tactile Longevity',
    subtitle: 'Analog Preservation',
    text: 'We celebrate items that carry history. Unlacquered brass, organic rough linen, and hand-bound print magazines. In an era of liquid-screen consumption, the tactile connection is a form of cognitive protection.',
    quote: "The hand remembers what the screen erases. Reclaim the physical weight of objects."
  }
];

export default function Manifesto() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PILLARS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PILLARS.length) % PILLARS.length);
  };

  const ActiveIcon = PILLARS[activeIndex].icon;

  return (
    <div id="manifesto-section" className="bg-[#F5F2ED] border border-editorial rounded-[40px] p-8 md:p-12 relative overflow-hidden my-12 shadow-xs">
      <div className="absolute top-4 right-4 text-stone-200/50 hidden md:block">
        <Quote className="w-24 h-24 stroke-[1]" />
      </div>

      <div className="max-w-3xl relative z-10">
        <span className="font-mono text-[10px] tracking-widest uppercase text-warm-accent block mb-2">
          The Aura Manifesto
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-charcoal mb-6">
          Pillars of Mindful Existence
        </h2>

        {/* Carousel Content */}
        <div className="min-h-[220px] md:min-h-[180px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-stone-50 rounded-full border border-editorial text-warm-accent">
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-primary-charcoal">
                    {PILLARS[activeIndex].title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase text-muted-olive tracking-wider">
                    {PILLARS[activeIndex].subtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs md:text-sm text-muted-olive leading-relaxed max-w-2xl">
                {PILLARS[activeIndex].text}
              </p>

              <p className="font-serif italic text-xs md:text-sm text-warm-accent pl-4 border-l-2 border-warm-accent max-w-xl py-0.5">
                "{PILLARS[activeIndex].quote}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between pt-6 mt-4 border-t border-editorial/60">
            {/* Step indicators */}
            <div className="flex gap-2">
              {PILLARS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-6 bg-sage-green' : 'w-1.5 bg-stone-200'
                  }`}
                  aria-label={`Go to pillar ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-1.5">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full border border-editorial hover:border-primary-charcoal hover:bg-stone-50 text-primary-charcoal transition-all"
                aria-label="Previous pillar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-full border border-editorial hover:border-primary-charcoal hover:bg-stone-50 text-primary-charcoal transition-all"
                aria-label="Next pillar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
