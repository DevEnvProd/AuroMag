export interface Article {
  id: string;
  category: 'spaces' | 'nourish' | 'wander' | 'entertainment';
  title: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export interface Category {
  id: 'all' | 'spaces' | 'nourish' | 'wander' | 'entertainment';
  name: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'All Curations',
    description: 'A holistic overview of contemporary slow living, architectural harmony, culinary craftsmanship, and silent escapes.'
  },
  {
    id: 'spaces',
    name: 'Spaces',
    description: 'Investigating the intersection of light, concrete, and wabi-sabi aesthetics in modern living architecture.'
  },
  {
    id: 'nourish',
    name: 'Nourish',
    description: 'A celebration of slow food, culinary rituals, and the deep connection between the soil and the dining table.'
  },
  {
    id: 'wander',
    name: 'Wander',
    description: 'Documenting journeys off the beaten track, seeking silent sanctuaries and coastal living philosophy.'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Curating reviews of deep-listening ambient sound, avant-garde cinema, and tactile literature.'
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'spaces-1',
    category: 'spaces',
    title: 'The Poetics of Light and Concrete',
    excerpt: 'An exploration of soft brutalism, minimalist residential design, and how natural light serves as the ultimate living ornament.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    author: 'Elena Rostova',
    date: 'June 24, 2026',
    readTime: '6 min read',
    featured: true,
    content: [
      'In a world dominated by sensory overload, the home is shifting from a mere container of objects to a sanctuary of pure awareness. Modern residential architects are increasingly stripping away non-essential ornament, turning to the tactile honesty of raw cast concrete and the ephemeral beauty of shadow.',
      'Soft brutalism, a movement that marries the structural integrity of concrete with the soft, organic touches of linen, white oak, and paper, offers a profound way to ground oneself. Rather than feeling cold or imposing, cast concrete carries the memory of the wooden timber forms used to mold it. It possesses a warm, velvety grey texture that shifts subtly in hue throughout the day.',
      'The true magic of minimalist architecture lies in its relationship with light. By introducing carefully placed skylights, floor-to-ceiling glass slits, and indoor light wells, architects let the sun paint directly onto the walls. A single column of light moving across a concrete floor becomes a silent clock, reminding us of the soft passage of time.',
      'To introduce this lifestyle into your own space, begin by honoring the surfaces. Clear the clutter to let wall spaces breathe. Mix harsh, structural elements with hyper-tactile organic items: a heavy woolen rug, a rough ceramic vase holding a single dried branch, or a solid oak bench that will patinate with age. Through this dialogue of materials, we create spaces that don\'t just look beautiful, but foster an inner state of calm.'
    ]
  },
  {
    id: 'nourish-1',
    category: 'nourish',
    title: 'The Quiet Ritual of the Morning Brew',
    excerpt: 'How the slow-drip coffee method and loose-leaf tea infusions can transform the start of your day into a grounding meditative practice.',
    coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    author: 'Julian Mercer',
    date: 'June 20, 2026',
    readTime: '4 min read',
    featured: false,
    content: [
      'The alarm rings, and the immediate instinct for most is to reach for a digital screen or rush to check emails. But there is another way—a silent, sensory-first transition from sleep to waking life that relies on water, steam, and patience.',
      'The morning brew, when approached with intention, becomes a sacred ten-minute container. It is not about a quick caffeine delivery; it is an exercise in mindfulness. Whether your medium is specialty single-origin coffee beans or artisanal whole-leaf white tea, the physical steps require your absolute presence.',
      'Measuring the exact grams of coffee, listening to the water kettle grow from a low rumble to a gentle boil, and watching the coffee grounds "bloom" as the first splash of hot water hits them—these are tactile anchors. The rising steam carries volatile oils that awaken the olfactory senses far more gently than a bright digital backlight.',
      'By pouring water in slow, concentric circles, you practice steady physical rhythm. There is no past to fix or future to plan in this moment; there is only the water level, the filter, and the rich, dark liquor collecting in the glass carafe below. When you finally sit down with your warm mug, holding it with both hands to feel the heat transfer, you enter the day not rushed, but deeply centered.'
    ]
  },
  {
    id: 'wander-1',
    category: 'wander',
    title: 'Echoes of Kyoto: In Search of Koko',
    excerpt: 'Tracing the philosophy of Koko—a refined, austere loneliness—through the ancient moss gardens and silent wooden machiya of Kyoto.',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    author: 'Sora Tanaka',
    date: 'June 15, 2026',
    readTime: '8 min read',
    featured: false,
    content: [
      'Kyoto is a city of layers. Beneath the neon lights of the modern avenues lies an ancient grid of wooden townhouses, stone-paved lanes, and hidden temple complexes where time appears to flow at a completely different velocity.',
      'On a misty Tuesday morning, we found ourselves at a small, Zen Buddhist temple tucked away in the Northern hills. The garden here is not composed of bright flowers, but of fifty distinct species of moss, climbing over stone lanterns and swelling around the roots of ancient maple trees. This is the visual embodiment of Koko (枯)—a Japanese aesthetic concept describing a dry, weathered maturity, an elegant austerity born of age and quietude.',
      'Sitting on the polished cedar veranda (engawa), the only sound is the occasional drip of dew falling from a bamboo leaf onto a dark river stone. To experience Kyoto this way is to embrace the art of active listening. The architecture of traditional machiya (wooden townhouses) is designed for this very purpose: narrow facades lead to deep, interior courtyard gardens (tsuboniwa) that act as small atmospheric lungs, pulling cool air, rain, and silence into the heart of the home.',
      'We do not need to travel to Kyoto to embrace the essence of Koko. It is a state of mind. It is found in selecting materials that wear their history proudly—unlacquered brass that darkens with the touch of your hands, linen that softens with every wash, or a hand-formed clay bowl with a hairline crack repaired in gold. Kyoto teaches us that life\'s greatest luxuries are not pristine and flawless, but weathered, quiet, and deeply authentic.'
    ]
  },
  {
    id: 'spaces-2',
    category: 'spaces',
    title: 'Wabi-Sabi: The Elegance of Imperfect Living',
    excerpt: 'Ditching the pressure of a picture-perfect home to embrace the beauty of raw textures, cracked pottery, and organic materials.',
    coverImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    author: 'Elena Rostova',
    date: 'June 10, 2026',
    readTime: '5 min read',
    featured: false,
    content: [
      'Modern lifestyle magazines often sell an unattainable vision of the home: perfectly white walls, immaculate surfaces, and symmetrical designer furniture where no human has seemingly set foot. But this sterile perfection is the enemy of comfortable living.',
      'Wabi-Sabi, the traditional Japanese philosophy centered on accepting the transient and imperfect nature of existence, offers a liberating alternative. In interior design, it encourages us to welcome the scratches on our wooden dining tables, the wrinkles in our raw linen curtains, and the irregular glaze of a hand-thrown ceramic cup.',
      'To build a Wabi-Sabi home, start by replacing synthetic, machine-made goods with items that show the hand of the maker. A unevenly spun wool throw, a reclaimed wooden stool, or walls finished with textured clay plaster. These materials possess a visual depth that plastic and veneered surfaces can never replicate.',
      'Furthermore, let go of symmetry. Nature does not grow in grids. Arrange your objects in odd numbers, mix different species of wood, and allow your bookshelves to look read-in. A home is a living biography of those who reside within it; let it wear its marks of life with pride.'
    ]
  },
  {
    id: 'nourish-2',
    category: 'nourish',
    title: 'The Sourdough Philosophy: Leavening with Time',
    excerpt: 'An investigation into the meditative rhythm of wild yeast fermentation and the slow-food movement of baking your own bread.',
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    author: 'Julian Mercer',
    date: 'June 05, 2026',
    readTime: '7 min read',
    featured: false,
    content: [
      'There is an extraordinary alchemy in bread. With just three ingredients—flour, water, and salt—humanity has sustained itself for millennia. Yet, in our quest for convenience, we have industrialized this process, replacing time and beneficial bacteria with rapid chemical raising agents.',
      'Returning to wild-yeast sourdough baking is an act of quiet rebellion. A sourdough starter is a living culture of wild yeast and lactobacilli captured from the air and flour. It does not operate on a factory schedule. It demands that you slow down and listen to the ambient temperature of your kitchen.',
      'Baking sourdough is a journey of tactile feedback. You mix the water and flour, letting it rest (autolyse) to develop gluten. You feel the dough change from a shaggy, wet paste to a smooth, elastic sheet during the stretch-and-fold cycles. You learn to recognize the subtle sour aroma and the tiny, carbon dioxide bubbles that signal the dough is ready to shape.',
      'When the Dutch oven is finally opened mid-bake, releasing a cloud of hot steam and revealing a blistered, dark golden crust, the satisfaction is immense. Each loaf is unique, shaped by the weather, your hands, and your patience. In consuming it, you are not just eating food—you are digesting time, care, and the beautiful biology of the natural world.'
    ]
  },
  {
    id: 'wander-2',
    category: 'wander',
    title: 'Coastal Solitude: A Winter on the Swedish Archipelago',
    excerpt: 'Exploring the mental clarity found in cold sea swimming, wood-fired saunas, and the minimalist cabins of the Baltic Sea.',
    coverImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    author: 'Marcus Lindqvist',
    date: 'May 28, 2026',
    readTime: '9 min read',
    featured: false,
    content: [
      'The Swedish archipelago consists of tens of thousands of islands, rocks, and skerries stretching into the cold Baltic Sea. In summer, they are vibrant with yachts and family holidays. But in the dead of winter, they empty completely, leaving behind a stark landscape of granite and dark water.',
      'We spent a month in a tiny, black-stained timber cabin on a rocky outcrop. With no television and intermittent cell reception, our daily schedule was dictated entirely by daylight and the wood-burning stove.',
      'A typical day began at dawn with a short walk to the wooden jetty. The water temperature was a freezing 2°C. Standing on the edge in the biting wind, every fiber of your brain screams to stay clothed. But stepping off into the obsidian water is a shock that instantly strips away mental static. Your breath catches, your skin tingles, and for thirty seconds, you are intensely, fully alive.',
      'This intense cold is immediately followed by the deep, enveloping dry heat of the wood-fired sauna. Sitting on the hot pine benches, watching the steam rise as you splash water on the basalt stones, your muscles release a lifetime of accumulated tension. This stark contrast—between intense sensory shock and deep physical comfort—creates a profound mental clarity. It reminds us that comfort is only truly appreciated when we occasionally step out into the elements.'
    ]
  }
];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .replace(/[\s_-]+/g, '-') // replace spaces and underscores with single hyphen
    .replace(/^-+|-+$/g, ''); // trim hyphens from ends
}

