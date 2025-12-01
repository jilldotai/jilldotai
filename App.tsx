/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Brain, Fingerprint, Lock, Code, ArrowRight, Smartphone, Key, Cpu, MessageCircle, AlertTriangle, EyeOff, Bot, User, Map, CheckCircle, ShieldCheck, Ghost } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import AIChat from './components/AIChat';

// Cast motion components to allow props like initial, animate, etc. without TS errors
const MotionDiv = motion.div as any;
const MotionSection = motion.section as any;
const MotionP = motion.p as any;

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Our Mission', id: 'hero' },
    { name: 'Project: IOkT', id: 'iokt' },
    { name: 'Future Labs', id: 'future' },
    { name: 'Services', id: 'services' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#00f2ea] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div 
          className="cursor-pointer z-50 flex items-center gap-2"
          onClick={() => scrollToSection('hero')}
        >
           <img src="/icons/logo.svg" alt="JILL.AI" className="h-8 md:h-10 w-auto invert" />
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {navItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => scrollToSection(item.id)}
              className="hover:text-[#00f2ea] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item.name}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('contact')}
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Contact
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#050507]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-4xl font-heading font-bold text-white hover:text-[#00f2ea] transition-colors uppercase bg-transparent border-none"
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
            >
              Contact
            </button>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="hero" className="relative h-[100svh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
        <MotionDiv 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Tagline */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-sm font-mono text-[#00f2ea] tracking-[0.2em] uppercase mb-6 bg-black/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/5"
          >
            <span>The Social Impact AI Lab</span>
            <span className="w-1.5 h-1.5 bg-[#00f2ea] rounded-full animate-pulse"/>
            <span>South Africa</span>
          </MotionDiv>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center flex-col">
            <h1 className="text-4xl md:text-8xl font-heading font-black tracking-tighter text-center leading-tight mb-2">
              INTELLIGENCE
            </h1>
             <div className="flex items-center gap-4">
                <span className="font-mono text-xl md:text-4xl italic font-light text-white/60">with</span>
                <GradientText 
                  text="INTEGRITY" 
                  as="h1" 
                  className="text-4xl md:text-8xl font-black tracking-tighter" 
                />
            </div>
            
            {/* Background Orb */}
            <MotionDiv 
               className="absolute -z-20 w-[60vw] h-[60vw] bg-[#00f2ea]/10 blur-[60px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 8, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <MotionDiv
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-8 mb-8"
          />

          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-xl font-light max-w-2xl mx-auto text-white/80 leading-relaxed drop-shadow-lg px-4 mb-10"
          >
            Jill.ai is a South African research lab building the <span className="text-[#00f2ea]">Decentralized Trust Protocol</span> for the next generation. 
            We use Edge AI and Blockchain to solve humanity's hardest problems: <span className="font-bold text-white">Safety</span> and <span className="font-bold text-white">Digital Ownership</span>.
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
             <button 
               onClick={() => scrollToSection('iokt')}
               className="group relative px-8 py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-[#00f2ea] transition-colors"
               data-hover="true"
             >
               View Our Flagship: IOkT
               <ArrowRight className="inline ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
             <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
               Bootstrapped in South Africa. Built for the World.
             </p>
          </MotionDiv>
        </MotionDiv>
      </header>

      {/* CONCIERGE CALLOUT (The Bridge) */}
      <MotionSection 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-20 -mt-10 mb-20 max-w-xl mx-auto px-6"
      >
        <div className="bg-[#0f1014]/80 backdrop-blur-xl border border-[#00f2ea]/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,242,234,0.1)] flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f2ea]/5 to-transparent animate-pulse" />
           <div className="relative z-10 p-1 rounded-full border border-[#00f2ea]/50 bg-black/50 shrink-0">
             <img src="/images/Lumi.png" alt="Lumi AI" className="w-16 h-16 rounded-full object-cover" />
           </div>
           <div className="flex-1 relative z-10">
             <h3 className="font-heading font-bold text-white text-lg mb-1">Have technical questions?</h3>
             <p className="text-sm text-gray-400">
               Ask <span className="text-[#00f2ea] font-bold">Lumi</span>, our AI Safety Architect. Whether you're a parent seeking protection or an investor analyzing our stack, she's here to help.
             </p>
           </div>
           {/* Visual Cue Arrow */}
           <div className="hidden md:block text-[#00f2ea] animate-bounce relative z-10">
              <ArrowRight className="w-6 h-6 rotate-45" />
           </div>
        </div>
      </MotionSection>

      {/* SECTION 1: IOkT (Main Feature) */}
      <section id="iokt" className="relative z-10 py-24 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        {/* Background Image: Digital Safety */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none select-none">
           <img src="/images/digital safety.png" alt="" className="w-full h-full object-cover grayscale" />
           <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507]" />
           <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#00f2ea]/10 rounded-full blur-[80px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-4 mb-16">
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 bg-[#00f2ea] rounded-full animate-pulse"></span>
               <h2 className="text-sm font-mono text-[#00f2ea] tracking-widest uppercase">
                 Current Priority: IOkT
               </h2>
            </div>
            <h3 className="text-4xl md:text-7xl font-heading font-bold leading-none max-w-4xl">
              The Internet Wasn’t Built for Kids. <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ea] to-[#6366f1]">We’re Fixing It.</span>
            </h3>
            <p className="text-lg md:text-xl font-light text-white/80 max-w-2xl mt-4 leading-relaxed border-l-2 border-[#00f2ea] pl-6 bg-black/30 backdrop-blur-md p-4 rounded-r-xl">
              IOkT is the "SSL Layer" for the next generation. A decentralized, AI-powered digital seatbelt that protects your child on Android & Huawei devices—without spying on them.
            </p>
            <div className="flex flex-wrap gap-6 items-center mt-6">
               <a 
                 href="https://docs.google.com/forms/d/1A4Xq-2oIxB965uvQ0MbS77ve6sul80vEDXV4hWpsNbo/edit"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="border border-white/20 bg-white/5 hover:bg-[#00f2ea] hover:text-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 inline-block text-center cursor-pointer"
               >
                 Join Pilot Waitlist (Free)
               </a>
               <span className="text-xs font-mono text-[#00f2ea] flex items-center gap-2">
                 <Shield className="w-4 h-4" /> Powered by Edge AI & Zero-Knowledge Proofs
               </span>
            </div>
          </div>

          {/* THE PROBLEM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="bg-[#0f1014]/90 backdrop-blur-md border border-red-500/20 p-8 rounded-2xl hover:border-red-500/50 transition-colors group shadow-lg">
               <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
               </div>
               <h4 className="font-heading font-bold text-xl mb-4 text-white">The "Open Bar" Problem</h4>
               <p className="text-gray-400 text-sm leading-relaxed">
                 We treat the internet like a library, but for kids, it’s an unregulated bar. 1 in 3 children face harassment. Filters fail because they block sites, not interactions.
               </p>
            </div>

            <div className="bg-[#0f1014]/90 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-[#6366f1]/50 transition-colors group shadow-lg">
               <div className="w-12 h-12 bg-[#6366f1]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <EyeOff className="w-6 h-6 text-[#6366f1]" />
               </div>
               <h4 className="font-heading font-bold text-xl mb-4 text-white">The Privacy Paradox</h4>
               <p className="text-gray-400 text-sm leading-relaxed">
                 Traditional safety apps are "Spyware." They upload your child's private chats to the cloud to check them. That’s a security risk you shouldn't have to take.
               </p>
            </div>

            <div className="bg-[#0f1014]/90 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-[#00f2ea]/50 transition-colors group shadow-lg">
               <div className="w-12 h-12 bg-[#00f2ea]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6 text-[#00f2ea]" />
               </div>
               <h4 className="font-heading font-bold text-xl mb-4 text-white">The AI Threat</h4>
               <p className="text-gray-400 text-sm leading-relaxed">
                 Generative AI is automating grooming and abuse at scale. Human moderators can't keep up. We need Good AI to fight Bad AI.
               </p>
            </div>
          </div>

          {/* THE SOLUTION (ANDROID GUARDIAN) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-12">
                <div>
                   <h2 className="text-sm font-mono text-[#00f2ea] tracking-widest uppercase mb-4">
                      The Solution
                   </h2>
                   <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                      Meet Your <br/> Digital Bodyguard.
                   </h3>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="mt-1">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-[#00f2ea]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">The Neural Keyboard</h4>
                      <p className="text-gray-400 text-sm">
                        A custom keyboard that travels with your child into WhatsApp, TikTok, and Discord. It uses On-Device AI (TinyML) to detect grooming, bullying, and address sharing before the message is sent. It coaches, it doesn't just block.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="mt-1">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <Fingerprint className="w-5 h-5 text-[#6366f1]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">The Zero-Knowledge ID</h4>
                      <p className="text-gray-400 text-sm">
                        Built on Polygon ID. A digital passport that proves your child is a child to games and apps, without ever revealing their real name, photo, or location.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="mt-1">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-[#00f2ea]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Local-First Privacy</h4>
                      <p className="text-gray-400 text-sm">
                        All safety processing happens on the phone. Personal data never leaves the device.
                      </p>
                    </div>
                  </div>
                </div>
             </div>

             {/* Visuals */}
             <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-[#0f1014] to-[#050507] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden aspect-square flex flex-col items-center justify-center group">
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                   
                   {/* Animated Shield Icon */}
                   <div className="relative mb-8">
                      <div className="absolute inset-0 bg-[#00f2ea] blur-3xl opacity-20 animate-pulse" />
                      <Shield className="w-32 h-32 md:w-48 md:h-48 text-white relative z-10 stroke-1" />
                      <Lock className="w-12 h-12 text-[#00f2ea] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                   </div>

                   <div className="w-full bg-white/5 rounded-xl p-4 border border-white/5 backdrop-blur-md max-w-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <Ghost className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-mono text-gray-400">Incognito Mode</span>
                      </div>
                      <div className="text-sm font-bold text-white mb-1">Identity Verified (Zero-Knowledge)</div>
                      <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-[100%] bg-[#6366f1]" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FOUNDER STORY SECTION */}
      <section className="relative z-10 py-24 bg-[#050507] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
           <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-full md:w-1/3">
                 <div className="sticky top-24">
                   <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#2a2a2e] to-[#0f1014] border border-white/10 overflow-hidden relative mb-6">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <User className="w-24 h-24 text-white/20" />
                      </div>
                      {/* Founder Image */}
                      <img 
                        src="/images/Founder.png" 
                        alt="Estelle Coetzee - Founder" 
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 absolute inset-0"
                      />
                      
                      {/* Overlay Gradient for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4 z-10">
                         <h4 className="font-heading font-bold text-xl text-white">Estelle Coetzee</h4>
                         <p className="text-xs font-mono text-[#00f2ea] uppercase tracking-widest">Founder & User Zero</p>
                      </div>
                   </div>
                   <p className="text-2xl font-heading font-bold leading-tight">
                     "Intelligence with Integrity."
                   </p>
                 </div>
              </div>

              <div className="w-full md:w-2/3">
                 <h2 className="text-sm font-mono text-[#00f2ea] tracking-widest uppercase mb-6">
                   The Founder Story
                 </h2>
                 <h3 className="text-3xl md:text-5xl font-heading font-bold mb-8 text-white">
                   Built by a Mother, <br/> Architected by a Developer.
                 </h3>
                 
                 <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                   <p>
                     Estelle doesn't build technology for the sake of innovation. She builds it because she sees systems failing people—especially the most vulnerable.
                   </p>
                   <p>
                     As a solo founder and AI generalist, she approaches problems differently. Where others see technical challenges, she sees patterns across domains. Her background spans full-stack development, cybersecurity, and behavioral psychology, but her real expertise is in breaking complex systems down to first principles and rebuilding them with integrity at the core.
                   </p>
                   <p className="pl-6 border-l-2 border-[#6366f1] italic text-white/90">
                     "I am not a Silicon Valley insider. I am Estelle Coetzee, a South African founder and 'User Zero.' When I couldn't find a safety tool that protected my neurodiverse daughter without invading her privacy, I taught myself to code and I'm building one."
                   </p>
                   <p>
                     Before founding Jill.AI, she turned down paying clients when she realized her solution wasn't enterprise-ready. Most founders would take the cash. She walked away to build it right. That same ethical rigor drives both Jill.AI's email automation and IOkT's child safety architecture—no shortcuts, no data exploitation, no compromises on safety.
                   </p>
                   <p>
                     Estelle leads with radical honesty about what she knows and what she's still learning. If you're looking for polished corporate speak, you won't find it here. If you're looking for someone who will protect your trust like she protects her own children, you're in the right place.
                   </p>
                   <p className="font-bold text-white">
                     IOkT is born from the grit of a mother who said 'Enough is enough.'
                   </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section className="relative z-10 py-20 border-t border-white/5 bg-[#0f1014]/50">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center text-sm font-mono text-gray-400 uppercase tracking-widest mb-12">The Traction Roadmap</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Stage 1 */}
               <div className="relative p-6 border border-white/10 bg-white/5 rounded-xl">
                  <div className="absolute -top-3 left-6 bg-[#00f2ea] text-black text-xs font-bold px-3 py-1 uppercase rounded-full">Current</div>
                  <h4 className="font-heading font-bold text-xl mb-2 mt-2">Stage 1: The Build</h4>
                  <p className="text-sm text-gray-400">Developing Edge AI Models & Privacy Architecture.</p>
               </div>
               
               {/* Stage 2 */}
               <div className="relative p-6 border border-white/10 bg-black/40 rounded-xl opacity-60">
                  <div className="absolute -top-3 left-6 bg-white/20 text-white text-xs font-bold px-3 py-1 uppercase rounded-full">Q1 2025</div>
                  <h4 className="font-heading font-bold text-xl mb-2 mt-2">Stage 2: The Pilot</h4>
                  <p className="text-sm text-gray-400">50 Family Beta Test (Waitlist Open).</p>
               </div>

               {/* Stage 3 */}
               <div className="relative p-6 border border-white/10 bg-black/40 rounded-xl opacity-60">
                   <div className="absolute -top-3 left-6 bg-white/20 text-white text-xs font-bold px-3 py-1 uppercase rounded-full">Future</div>
                  <h4 className="font-heading font-bold text-xl mb-2 mt-2">Stage 3: The Ecosystem</h4>
                  <p className="text-sm text-gray-400">Open API for Game Developers.</p>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 2: VISION (Project Uplift) */}
      <section id="future" className="relative z-10 py-24 md:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 order-2 md:order-1">
                 <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group">
                    <img 
                      src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop" 
                      alt="Future of Work" 
                      className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                       <span className="text-xs font-mono font-bold text-white">COMING 2026</span>
                    </div>
                 </div>
              </div>

              <div className="md:col-span-7 order-1 md:order-2">
                 <h2 className="text-sm font-mono text-[#6366f1] tracking-widest uppercase mb-4">
                    The Pipeline
                 </h2>
                 <h3 className="text-4xl md:text-7xl font-heading font-bold mb-6">
                    Project <br/>
                    <span className="text-white">Uplift</span>
                 </h3>
                 <p className="text-xl md:text-2xl font-light italic text-white/80 mb-8 border-l-4 border-[#6366f1] pl-6">
                    "From Safety to Sovereignty."
                 </p>
                 <div className="space-y-6 text-gray-300 leading-relaxed max-w-2xl">
                    <p>
                       Our mission doesn't stop at childhood. We are architecting a future where AI helps the unemployed navigate the industrial revolution.
                    </p>
                    <p>
                       <strong className="text-white">The Goal:</strong> An AI Career Mentor that helps users compile CVs, upskill for the AI economy, and verify their credentials on the blockchain.
                    </p>
                    <p>
                       <strong className="text-white">The Tech:</strong> Using the same Self-Sovereign Identity stack to prove skills instead of age.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section id="services" className="relative z-10 py-24 bg-[#0f1014]/50 border-t border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">
               Partner with <span className="text-[#00f2ea]">Jill.ai</span>
            </h2>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed">
               We are a bootstrapped, impact-driven lab. We offer specialized <span className="text-white font-bold">AI & Web3 Development Services</span> to fund our internal mission.
               Need to integrate Local LLMs or Verifiable Credentials into your business? Let's build the future together.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
               <div className="p-6 border border-white/10 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-colors">
                  <Code className="w-8 h-8 text-[#00f2ea] mb-4" />
                  <h4 className="font-bold text-white mb-2">Custom AI Agents</h4>
                  <p className="text-sm text-gray-400">Local LLMs, RAG systems, and specialized chatbots.</p>
               </div>
               <div className="p-6 border border-white/10 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-colors">
                  <Key className="w-8 h-8 text-[#6366f1] mb-4" />
                  <h4 className="font-bold text-white mb-2">Web3 Identity</h4>
                  <p className="text-sm text-gray-400">Verifiable Credentials, Zero-Knowledge Proofs, and Polygon ID.</p>
               </div>
            </div>

            <button 
               onClick={() => scrollToSection('contact')}
               className="bg-white text-black px-10 py-4 font-bold tracking-widest uppercase hover:bg-[#00f2ea] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
               data-hover="true"
            >
               Contact Us
            </button>
         </div>
      </section>

       {/* CORE TECH SECTION */}
       <section className="relative z-10 py-16 border-y border-white/5 bg-black/40">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="text-center md:text-left">
                 <h4 className="text-2xl font-heading font-bold mb-2">One Stack. Multiple Solutions.</h4>
                 <p className="text-gray-400 text-sm">Our core architecture scales from child safety to workforce development.</p>
               </div>
               
               <div className="flex gap-8 md:gap-16 flex-wrap justify-center">
                  <div className="flex flex-col items-center gap-3 group text-center max-w-[120px]">
                     <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10">
                       <Cpu className="w-6 h-6 text-[#00f2ea]" />
                     </div>
                     <span className="text-xs font-mono uppercase tracking-wider text-white">Edge AI</span>
                     <span className="text-[10px] text-gray-400 leading-tight">Powering the Child Guardian & Career Coach</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 group text-center max-w-[120px]">
                     <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10">
                       <Fingerprint className="w-6 h-6 text-[#6366f1]" />
                     </div>
                     <span className="text-xs font-mono uppercase tracking-wider text-white">Polygon ID</span>
                     <span className="text-[10px] text-gray-400 leading-tight">Verifying Age & Verifying Diplomas</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 group text-center max-w-[120px]">
                     <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10">
                       <Lock className="w-6 h-6 text-[#00f2ea]" />
                     </div>
                     <span className="text-xs font-mono uppercase tracking-wider text-white">Privacy First</span>
                     <span className="text-[10px] text-gray-400 leading-tight">Data stays on the user's device, always</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-[#050507]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="flex items-center gap-2 mb-4">
               <img src="/icons/logo.svg" alt="JILL.AI" className="h-8 w-auto invert" />
             </div>
             <div className="flex flex-col gap-2 text-xs font-mono text-gray-400">
               <span>© 2025 Jill.ai (Pty) Ltd.</span>
               <span>IOkT is a product of Jill.ai.</span>
               <div className="flex gap-4 mt-4">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
               </div>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;