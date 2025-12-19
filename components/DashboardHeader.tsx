
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalEmblem from './PersonalEmblem';

const DashboardHeader: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-3xl">
            <div className="max-w-7xl mx-auto px-6 sm:px-10">
                <div className="flex h-24 items-center justify-between">
                    <div className="flex items-center gap-6 cursor-pointer" onClick={() => navigate('/')}>
                        <PersonalEmblem size="sm" />
                        <h1 className="font-display text-2xl font-black tracking-tighter text-white uppercase italic">
                            Aureus <span className="text-primary font-normal">Vault</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="hidden sm:flex flex-col text-right">
                            <p className="font-display text-sm font-bold text-white uppercase tracking-widest leading-none">Personal Sovereignty</p>
                            <p className="text-[10px] text-primary mt-1 uppercase font-black tracking-widest opacity-60">Master Node: Active</p>
                        </div>
                        <div className="h-10 w-[1px] bg-white/5 hidden sm:block"></div>
                        <button onClick={() => navigate('/')} className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-primary hover:bg-white/10 transition-all border border-white/5">
                            <span className="material-symbols-outlined text-[20px]">power_settings_new</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
