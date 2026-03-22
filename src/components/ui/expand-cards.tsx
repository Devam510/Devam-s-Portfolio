import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ExpandCardItem {
  id: string | number;
  title: string;
  image: string;
  github?: string;
  tags?: string[];
  shortDesc?: string;
}

const ExpandOnHover = ({ items = [] }: { items?: ExpandCardItem[] }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleCardClick = (idx: number, githubUrl?: string) => {
    if (expandedIndex === idx && githubUrl) {
      window.open(githubUrl, "_blank", "noopener,noreferrer");
    } else {
      setExpandedIndex(idx);
    }
  };

  const getWidth = (index: number) =>
    index === expandedIndex ? "32rem" : "5rem";

  // Handles mobile layout scaling differently
  const getMobileHeight = (index: number) => 
    index === expandedIndex ? "24rem" : "4rem";

  return (
    <div className="w-full">
      <div className="relative flex flex-col md:flex-row items-center justify-start gap-2 transition-all duration-300 ease-in-out w-full max-w-7xl mx-auto px-4 md:h-[475px]">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="group relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-out"
            style={{ 
              width: typeof window !== "undefined" && window.innerWidth >= 768 ? getWidth(idx) : "100%", 
              height: typeof window !== "undefined" && window.innerWidth < 768 ? getMobileHeight(idx) : "100%" 
            }}
            onMouseEnter={() => setExpandedIndex(idx)}
            onClick={() => handleCardClick(idx, item.github)}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              src={item.image}
              alt={item.title}
            />
            
            {/* Overlay Gradient to make text readable */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 transition-opacity duration-500 ease-out ${
                expandedIndex === idx ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight" style={{ position: 'relative', bottom: '20px', left: '20px', fontFamily: "'Playfair Display', serif" }}>
                {item.title}
              </h3>
            </div>
            
            {/* Title rotate on non-expanded elements just for style */}
            <div 
              className={`absolute border-r border-white/20 inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-500 ease-out ${
                expandedIndex === idx ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
               <span className="text-white font-syne font-semibold tracking-wider uppercase text-sm -rotate-90 md:block hidden whitespace-nowrap overflow-hidden text-ellipsis px-2 max-w-[400px]">
                 {item.title}
               </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Animated Tagline */}
      <div className="mt-15 md:mt-15 flex justify-center items-center relative overflow-hidden w-full h-20 px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={expandedIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center font-mono text-xs md:text-sm text-[#71717a] absolute max-w-2xl mx-auto tracking-widest uppercase"
          >
            {items[expandedIndex]?.shortDesc || "Selected project highlight showcasing modern development"}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpandOnHover;
