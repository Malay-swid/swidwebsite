import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Globe, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-charcoal font-sans">
      <div className="max-w-5xl mx-auto px-6 py-32">
        <Link to="/" className="flex items-center gap-2 text-solar-blue font-bold mb-12 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">Engineering a <span className="text-solar-blue">Sustainable</span> Future.</h1>
          <p className="text-xl text-solar-muted max-w-2xl mx-auto font-light leading-relaxed">
            SWID Renewables Limited is a premier Indian EPC partner specializing in utility-scale and C&I solar energy infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            { icon: Globe, title: "Global Standards", desc: "We implement international engineering benchmarks to ensure maximum plant efficiency." },
            { icon: Award, title: "Certified Excellence", desc: "ISO 45001 certified, bringing uncompromising safety and quality to every project." },
            { icon: Zap, title: "Rapid Deployment", desc: "Our parallel workstreams ensure the fastest time-to-energization in the industry." },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="text-solar-blue mb-6"><item.icon size={32} /></div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-solar-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Our Mission</h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-12">
              To accelerate India's transition to clean energy by delivering high-performance, low-cost solar infrastructure that enables businesses to operate sustainably and profitably.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-solar-blue text-white px-8 py-4 rounded-full font-bold hover:bg-[#0b4d89] transition-all">
              Partner with SWID <ArrowLeft className="rotate-180" size={20} />
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-solar-blue/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
