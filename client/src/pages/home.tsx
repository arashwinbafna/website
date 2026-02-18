import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

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

// MOCK PROJECTS
// Rule: Projects with no images must not appear.
// Empty array = Coming Soon mode. Populated array = Portfolio mode.
const RAW_PROJECTS = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  location: "Location, India",
  year: "2024",
  images: [
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2700&auto=format&fit=crop",
  ]
}));

// Filter projects that have at least one image
const PROJECTS = RAW_PROJECTS.filter(p => p.images && p.images.length > 0);

// Set to true to force "Coming Soon" mode for demo purposes
// Change this to 'true' to see the Coming Soon state
const FORCE_COMING_SOON = false; 

export default function Home() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  
  // Logic: If AT LEAST ONE project exists -> Automatically reveal Projects section
  const hasProjects = PROJECTS.length > 0 && !FORCE_COMING_SOON;

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
          ${hasProjects ? 'py-20 min-h-[50vh]' : 'py-0 min-h-[85vh]'}
        `}
      >
        
        {/* 1. Logo */}
        <div className="mb-6 md:mb-8 relative w-20 h-20 md:w-28 md:h-28 fade-in">
          <img 
            src={ASSETS.logo} 
            alt="SAB Architects Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              // Smart Fallback
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

        {/* 3. Studio Name */}
        <h1 className="text-xl md:text-2xl font-medium tracking-wide mb-3 md:mb-4 fade-in fade-in-delay-1 text-center">
          SAB Architects
        </h1>

        {/* 4. Rolling Tagline */}
        <div className="h-6 md:h-8 mb-6 md:mb-8 flex items-center justify-center overflow-hidden fade-in fade-in-delay-2 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={taglineIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-center w-full"
            >
              <p className="text-neutral-500 text-xs md:text-sm font-light tracking-[0.2em] uppercase">
                {ROLLING_TAGLINES[taglineIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 6. Message (Only if NO projects or explicit coming soon) */}
        {!hasProjects && (
          <p className="text-neutral-400 text-xs font-light tracking-wide mt-4 fade-in fade-in-delay-3 text-center">
            We are building our digital space. Stay connected.
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
                {/* Project Image Carousel */}
                <div className="w-full aspect-[4/3] bg-neutral-50 overflow-hidden relative rounded-sm">
                  <Carousel className="w-full h-full group/carousel">
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
                    
                    {/* Carousel Controls - Only visible on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-between px-4">
                      <CarouselPrevious className="pointer-events-auto h-8 w-8 md:h-10 md:w-10 rounded-full border-none bg-white/90 hover:bg-white text-black shadow-sm translate-x-0" />
                      <CarouselNext className="pointer-events-auto h-8 w-8 md:h-10 md:w-10 rounded-full border-none bg-white/90 hover:bg-white text-black shadow-sm translate-x-0" />
                    </div>
                  </Carousel>
                </div>
                
                {/* Project Info */}
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
      <section className="w-full py-20 flex flex-col items-center justify-center gap-10 mt-auto">
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="w-12 h-px bg-neutral-200" />
          <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-400">Connect with us</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <ContactButton 
            icon={ASSETS.phone} 
            href="tel:+919952937308" 
            label="Phone" 
          />
          <ContactButton 
            icon={ASSETS.whatsapp} 
            href="https://wa.me/919952937308" 
            label="WhatsApp" 
          />
          <ContactButton 
            icon={ASSETS.email} 
            href="mailto:SAB@sabarchitects.in" 
            label="Email" 
          />
          <ContactButton 
            icon={ASSETS.instagram} 
            href="https://www.instagram.com/sabarchitects.in/" 
            label="Instagram" 
          />
          <ContactButton 
            icon={ASSETS.location} 
            href="https://maps.app.goo.gl/8kc6sxwHQkKSsGMr6" 
            label="Location" 
          />
        </div>
        
        {/* Hidden but semantic contact details */}
        <div className="sr-only">
          <p>Phone: +91 99529 37308</p>
          <p>Email: SAB@sabarchitects.in</p>
        </div>
      </section>

      {/* --- FOOTER --- */}
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
        <img 
          src={icon} 
          alt={label} 
          className="w-5 h-5 md:w-6 md:h-6 object-contain brightness-0 invert" 
        />
      </div>
      <span className="text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-6 font-medium tracking-wide whitespace-nowrap">
        {label}
      </span>
    </a>
  );
}
