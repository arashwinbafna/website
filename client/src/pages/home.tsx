import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

// ASSETS
const ASSETS = {
  logo: "/assets/logo_1770964400758.png",
  phone: "/assets/Phone_1770964400758.png",
  whatsapp: "/assets/Whatsapp_1770964400758.png",
  email: "/assets/Email_1770964400758.png",
  instagram: "/assets/Instagram_1770964400758.png",
  location: "/assets/Location_1770964400758.png",
};

// DATA
const ROLLING_TAGLINES = [
  "Architecture",
  "Interiors",
  "Research",
  "Design Advisory",
  "Material Studies",
  "Visualisation",
];

/**
 * STATIC PROJECT CONFIGURATION
 * To add images, place them in public/assets/projects/project-X/
 * Then add the filenames to the 'images' array below.
 * Logic: If all project image arrays are empty, the site shows "Coming Soon".
 */
const RAW_PROJECTS = [
  { id: 1, title: "Project 1", location: "Location", year: "2024", images: [] },
  { id: 2, title: "Project 2", location: "Location", year: "2024", images: [] },
  { id: 3, title: "Project 3", location: "Location", year: "2024", images: [] },
  { id: 4, title: "Project 4", location: "Location", year: "2024", images: [] },
  { id: 5, title: "Project 5", location: "Location", year: "2024", images: [] },
  { id: 6, title: "Project 6", location: "Location", year: "2024", images: [] },
  { id: 7, title: "Project 7", location: "Location", year: "2024", images: [] },
  { id: 8, title: "Project 8", location: "Location", year: "2024", images: [] },
  { id: 9, title: "Project 9", location: "Location", year: "2024", images: [] },
  { id: 10, title: "Project 10", location: "Location", year: "2024", images: [] },
];

// Filter: Only projects with images are displayed
const PROJECTS = RAW_PROJECTS.filter(p => p.images && p.images.length > 0);

export default function Home() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const hasProjects = PROJECTS.length > 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % ROLLING_TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-100 flex flex-col font-sans">
      
      {/* --- HERO SECTION --- */}
      <section 
        className={`
          flex-1 flex flex-col items-center justify-center w-full px-6 transition-all duration-1000 ease-in-out
          ${hasProjects ? 'py-12 min-h-[40vh]' : 'py-12 min-h-[60vh]'}
        `}
      >
        <div className="mb-4 md:mb-6 relative w-16 h-16 md:w-24 md:h-24 fade-in">
          <img 
            src={ASSETS.logo} 
            alt="SAB Architects Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-medium text-lg shadow-sm">
                    SAB
                  </div>
                `;
              }
            }}
          />
        </div>

        <h1 className="text-xl md:text-2xl font-semibold tracking-wide mb-2 md:mb-3 fade-in fade-in-delay-1 text-center">
          SAB Architects
        </h1>

        <div className="h-6 md:h-8 mb-4 md:mb-6 flex items-center justify-center overflow-hidden fade-in fade-in-delay-2 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={taglineIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-center w-full"
            >
              <p className="text-neutral-600 text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
                {ROLLING_TAGLINES[taglineIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {!hasProjects && (
          <p 
            className="text-sm font-bold tracking-wide mt-2 fade-in fade-in-delay-3 text-center max-w-xs"
            style={{ color: '#808080' }}
          >
            We are building our digital space.<br />
            Stay connected.
          </p>
        )}
      </section>

      {/* --- PROJECTS SECTION --- */}
      {hasProjects && (
        <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-32 fade-in fade-in-delay-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-32">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                className="group flex flex-col gap-6"
              >
                <div className="w-full aspect-[4/3] bg-neutral-50 overflow-hidden relative rounded-sm">
                  <Carousel className="w-full h-full group/carousel relative">
                    <CarouselContent className="h-full ml-0">
                      {project.images.map((img, imgIdx) => (
                        <CarouselItem key={imgIdx} className="h-full w-full pl-0">
                          <img 
                            src={img} 
                            alt={`${project.title} - View ${imgIdx + 1}`}
                            className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 ease-in-out transform scale-100 group-hover:scale-[1.02]"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    
                    <div className="hidden md:flex absolute inset-0 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none items-center justify-between px-4 z-[100]">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const carousel = e.currentTarget.closest('.group\\/carousel');
                          const prevBtn = carousel?.querySelector('button[aria-label="Previous slide"]');
                          if (prevBtn) (prevBtn as HTMLButtonElement).click();
                        }}
                        className="h-10 w-10 rounded-full border border-neutral-200 bg-white/95 hover:bg-white text-black shadow-lg pointer-events-auto flex items-center justify-center cursor-pointer z-[110] relative translate-x-0"
                        type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none block w-6 h-6"><path d="m15 18-6-6 6-6"/></svg>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const carousel = e.currentTarget.closest('.group\\/carousel');
                          const nextBtn = carousel?.querySelector('button[aria-label="Next slide"]');
                          if (nextBtn) (nextBtn as HTMLButtonElement).click();
                        }}
                        className="h-10 w-10 rounded-full border border-neutral-200 bg-white/95 hover:bg-white text-black shadow-lg pointer-events-auto flex items-center justify-center cursor-pointer z-[110] relative translate-x-0"
                        type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none block w-6 h-6"><path d="m9 18 6-6-6-6"/></svg>
                      </button>
                      <div className="hidden pointer-events-none" aria-hidden="true">
                        <CarouselPrevious aria-label="Previous slide" />
                        <CarouselNext aria-label="Next slide" />
                      </div>
                    </div>
                  </Carousel>
                </div>
                
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="text-base font-medium text-neutral-900 tracking-tight">{project.title}</h3>
                  <div className="text-xs text-neutral-400 font-light flex items-center gap-2">
                    <span>{project.location}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* --- CONTACT SECTION --- */}
      <section className="w-full py-12 flex flex-col items-center justify-center gap-8 mt-auto">
        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="w-12 h-px bg-neutral-200" />
          <h2 className="text-[12px] font-bold tracking-[0.2em] uppercase text-neutral-500">Connect with us</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-5 md:gap-10 px-4">
          <ContactButton icon={ASSETS.phone} href="tel:+919952937308" label="Phone" />
          <ContactButton icon={ASSETS.whatsapp} href="https://wa.me/919952937308" label="WhatsApp" />
          <ContactButton icon={ASSETS.email} href="mailto:SAB@sabarchitects.in" label="Email" />
          <ContactButton icon={ASSETS.instagram} href="https://www.instagram.com/sabarchitects.in/" label="Instagram" />
          <ContactButton icon={ASSETS.location} href="https://maps.app.goo.gl/8kc6sxwHQkKSsGMr6" label="Location" />
        </div>
      </section>

      <footer className="w-full pb-8 pt-4 text-center text-[10px] text-neutral-300 font-light tracking-widest uppercase">
        &copy; {new Date().getFullYear()} SAB Architects. All rights reserved.
      </footer>
    </div>
  );
}

function ContactButton({ icon, href, label }: { icon: string, href: string, label: string }) {
  return (
    <a 
      href={href} 
      target={href.startsWith('http') ? "_blank" : undefined}
      rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
      className="group relative flex flex-col items-center gap-3"
      aria-label={label}
    >
      <div className="w-12 h-12 md:w-14 md:h-14 bg-black rounded-full flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl shadow-md">
        <img src={icon} alt={label} className="w-5 h-5 md:w-6 md:h-6 object-contain brightness-0 invert" />
      </div>
      <span className="text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-6 font-medium tracking-wide whitespace-nowrap">
        {label}
      </span>
    </a>
  );
}
