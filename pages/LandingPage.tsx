
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AmbientBackground from '../components/AmbientBackground';
import PersonalEmblem from '../components/PersonalEmblem';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background-dark text-slate-400 selection:bg-white selection:text-black font-body">
            <AmbientBackground />
            
            {/* Minimal Header */}
            <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-10">
                    <div className="flex items-center justify-between h-24">
                        <div className="flex items-center gap-5 group cursor-pointer" onClick={() => navigate('/')}>
                            <PersonalEmblem size="sm" />
                            <span className="text-white text-lg font-display italic tracking-[0.2em]">AUREUS</span>
                        </div>
                        <button onClick={() => navigate('/dashboard')} className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/50 hover:text-white transition-all border-b border-white/10 hover:border-white pb-1">
                            Access Vault
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-64 pb-48">
                <div className="max-w-7xl mx-auto px-10 relative z-10">
                    <div className="flex flex-col items-center">
                        <div className="mb-20 animate-reveal-up">
                             <PersonalEmblem size="lg" />
                        </div>
                        
                        <div className="text-center space-y-12 max-w-5xl">
                            <h1 className="text-8xl md:text-[10rem] font-display font-black text-white tracking-tighter leading-[0.85] animate-reveal-up">
                                Private <br/>
                                <span className="text-gradient-platinum italic font-light">Sovereignty.</span>
                            </h1>
                            
                            <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto font-light leading-relaxed animate-reveal-up italic" style={{animationDelay: '200ms'}}>
                                A silent, unbreachable ledger for your most critical digital assets. Pure function, absolute form.
                            </p>
                            
                            <div className="pt-10 animate-reveal-up" style={{animationDelay: '400ms'}}>
                                <button onClick={() => navigate('/dashboard')} className="group relative overflow-hidden bg-white text-black font-bold py-6 px-20 rounded-full transition-all hover:pr-24 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em]">
                                    Enter The Bóveda
                                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-2 transition-transform">north_east</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote / Philosophy Section */}
            <section className="py-40 bg-white/5 backdrop-blur-sm border-y border-white/5">
                <div className="max-w-4xl mx-auto px-10 text-center">
                    <span className="material-symbols-outlined text-white/20 text-6xl mb-10">format_quote</span>
                    <h2 className="text-3xl md:text-5xl font-display italic text-white leading-tight">
                        "The ultimate luxury is the peace of mind that comes with absolute privacy."
                    </h2>
                    <div className="mt-12 h-px w-20 bg-white/10 mx-auto"></div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-32 opacity-30">
                <div className="max-w-7xl mx-auto px-10 flex flex-col items-center gap-10">
                    <div onClick={() => navigate('/gate/override')} className="cursor-pointer grayscale hover:grayscale-0 transition-all opacity-20 hover:opacity-100">
                        <PersonalEmblem size="sm" />
                    </div>
                    <div className="flex gap-12 text-[8px] font-bold uppercase tracking-[0.6em]">
                        <span>Encrypted</span>
                        <span>Private</span>
                        <span>Sovereign</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
