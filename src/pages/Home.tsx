import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Homepage with immersive hero section and featured projects grid
 * Showcases photographer's best work with minimal, elegant design
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen">
      {/* Hero Section - Full viewport with featured image */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://images.pexels.com/videos/2675516/free-video-2675516.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.opacity = '0';
            }}
          >
            <source src="https://videos.pexels.com/video-files/2675516/2675516-sd_960_540_24fps.mp4" type="video/mp4" />
          </video>
          {/* Refined gradient overlay - more sophisticated */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        {/* Hero Content - Refined typography */}
        <div className="relative h-full flex flex-col items-center justify-center px-6">
          <motion.div
            className="text-center space-y-8 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {photographerInfo.name.toUpperCase()}
            </motion.h1>
            
            <motion.div
              className="w-24 h-px bg-white/60 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            
            <motion.p
              className="text-lg md:text-xl font-light tracking-[0.15em] text-white/90 uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {photographerInfo.tagline}
            </motion.p>

            <motion.p
              className="text-base md:text-lg font-light leading-relaxed text-white/75 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {photographerInfo.heroIntroduction}
            </motion.p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <ScrollIndicator />
          </motion.div>
        </div>
      </section>

        {/* Introduction Section - Professional styling */}
        <section className="py-28 md:py-36 px-6 lg:px-8 bg-background">
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <ScrollReveal>
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-light tracking-[0.1em] text-foreground">
                  ABOUT MY WORK
                </h2>
                <div className="w-16 h-px bg-border mx-auto" />
                <div className="space-y-6 text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                  <p>
                    {photographerInfo.biography.split('\n\n')[0]}
                  </p>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.1em] uppercase text-foreground hover:text-muted-foreground transition-colors duration-300 group border-b border-foreground/30 pb-1 hover:border-foreground"
                >
                  <span>Learn More</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section - Professional layout */}
        <section className="py-28 md:py-36 border-t border-border bg-muted/30">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-20 space-y-6 px-6">
              <h2 className="text-2xl md:text-3xl font-light tracking-[0.1em] text-foreground">
                FEATURED PROJECTS
              </h2>
              <div className="w-16 h-px bg-border mx-auto" />
              <p className="text-base text-muted-foreground font-light tracking-wide">
                A selection of recent work
              </p>
            </div>
          </ScrollReveal>

          {/* Projects Grid - Refined spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspectRatio="landscape"
                showCategory={true}
                index={index}
              />
            ))}
          </div>

          {/* View All Link */}
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-20 px-6">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.1em] uppercase text-foreground hover:text-muted-foreground transition-colors duration-300 group border-b border-foreground/30 pb-1 hover:border-foreground"
              >
                <span>View All Projects</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
