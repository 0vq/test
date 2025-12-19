
import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import AccountCard from '../components/AccountCard';
import PricingSection from '../components/PricingSection';
import AmbientBackground from '../components/AmbientBackground';
import { Account, SecurityAdvice, PlanType } from '../types';
import { MOCK_ACCOUNTS } from '../constants';
import { getSecurityAdvice, suggestPassword } from '../services/geminiService';

interface DashboardPageProps {
    adminBypass?: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ adminBypass = false }) => {
    const [plan, setPlan] = useState<PlanType>(adminBypass ? 'apex' : null);
    const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
    const [newAccount, setNewAccount] = useState<Partial<Account>>({ service: '', email: '', pass: '', img: '' });
    const [advice, setAdvice] = useState<SecurityAdvice | null>(null);
    const [loadingAdvice, setLoadingAdvice] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (adminBypass) setPlan('apex');
    }, [adminBypass]);

    const handleDelete = (id: number) => {
        setAccounts(prev => prev.filter(a => a.id !== id));
    };

    const handleUpdate = (id: number, updated: Account) => {
        setAccounts(prev => prev.map(a => a.id === id ? updated : a));
    };

    const handleAddAccount = () => {
        if (!newAccount.service) return;
        const id = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
        const accountToAdd: Account = {
            id,
            service: newAccount.service || 'Unnamed Asset',
            email: newAccount.email || 'N/A',
            pass: newAccount.pass || '',
            img: newAccount.img || `https://picsum.photos/seed/${id}/800/600?grayscale`
        };
        setAccounts([accountToAdd, ...accounts]);
        setNewAccount({ service: '', email: '', pass: '', img: '' });
        setAdvice(null);
    };

    const checkPasswordSecurity = async () => {
        if (!newAccount.pass) return;
        setLoadingAdvice(true);
        const result = await getSecurityAdvice(newAccount.pass);
        setAdvice(result);
        setLoadingAdvice(false);
    };

    const handleSuggestPassword = async () => {
        setIsGenerating(true);
        const pass = await suggestPassword();
        setNewAccount(prev => ({ ...prev, pass }));
        setIsGenerating(false);
    };

    const filteredAccounts = accounts.filter(acc => 
        acc.service.toLowerCase().includes(searchQuery.toLowerCase()) || 
        acc.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!plan) {
        return (
            <div className="min-h-screen bg-black text-slate-300 flex flex-col">
                <AmbientBackground />
                <nav className="p-20 flex justify-center">
                    <h1 className="font-display text-2xl font-bold text-white tracking-[0.3em] uppercase italic">Aureus</h1>
                </nav>
                <PricingSection onSelectPlan={setPlan} />
            </div>
        );
    }

    return (
        <div className="bg-black text-slate-400 min-h-screen flex flex-col relative font-body">
            <AmbientBackground />
            <DashboardHeader />
            
            <main className="flex-grow w-full max-w-7xl mx-auto px-10 py-24 space-y-32">
                
                {/* Status - Minimal Bar */}
                <div className="flex items-center justify-between border-b border-white/5 pb-10 animate-reveal-up">
                    <div className="flex items-center gap-10">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/30 mb-2">Vault State</span>
                            <div className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Secured Node</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/5"></div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/30 mb-2">Access level</span>
                            <span className="text-[10px] font-bold text-accent-gold uppercase tracking-widest italic">{plan} Clearance</span>
                        </div>
                    </div>
                    <button onClick={() => setPlan(null)} className="text-[9px] font-bold uppercase tracking-[0.4em] hover:text-white transition-colors">
                        Terminate Session
                    </button>
                </div>

                {/* Entry Interface - Sophisticated Form */}
                <section className="animate-reveal-up">
                    <div className="glass-panel rounded-[3rem] p-20 relative overflow-hidden group">
                        {/* Subtle Scan Line */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                            <div className="absolute w-full h-[1px] bg-white animate-scan"></div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-20">
                            <div className="flex-1 space-y-16">
                                <div className="space-y-4">
                                    <h2 className="font-display text-5xl font-bold text-white tracking-tighter italic">Register Node.</h2>
                                    <p className="text-slate-500 font-light italic">Append new encrypted credentials to the local cluster.</p>
                                </div>

                                <div className="space-y-12">
                                    <div className="group/input">
                                        <label className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/30 group-focus-within/input:text-white transition-colors">Identity Node</label>
                                        <input 
                                            value={newAccount.email}
                                            onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
                                            className="w-full bg-transparent border-b border-white/5 py-5 text-white placeholder-slate-800 focus:outline-none focus:border-white transition-all text-lg font-light" 
                                            placeholder="alias@identity.vault" 
                                        />
                                    </div>
                                    <div className="group/input">
                                        <label className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/30 group-focus-within/input:text-white transition-colors">Key Phrase</label>
                                        <div className="relative">
                                            <input 
                                                value={newAccount.pass}
                                                onChange={(e) => setNewAccount({...newAccount, pass: e.target.value})}
                                                className="w-full bg-transparent border-b border-white/5 py-5 text-white placeholder-slate-800 focus:outline-none focus:border-white transition-all font-mono text-xl tracking-tighter" 
                                                placeholder="••••••••••••" 
                                            />
                                            <div className="absolute right-0 bottom-4 flex gap-6">
                                                <button onClick={handleSuggestPassword} className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">Generate</button>
                                                <button onClick={checkPasswordSecurity} className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">Audit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between space-y-12">
                                <div className="grid grid-cols-1 gap-12">
                                    <div className="group/input">
                                        <label className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/30">Registry Metadata</label>
                                        <input 
                                            value={newAccount.service}
                                            onChange={(e) => setNewAccount({...newAccount, service: e.target.value})}
                                            className="w-full bg-transparent border-b border-white/5 py-5 text-white placeholder-slate-800 focus:outline-none focus:border-white transition-all text-lg font-light" 
                                            placeholder="Service or Asset Name" 
                                        />
                                    </div>
                                    <div className="group/input">
                                        <label className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/30">Visual Reference URL</label>
                                        <input 
                                            value={newAccount.img}
                                            onChange={(e) => setNewAccount({...newAccount, img: e.target.value})}
                                            className="w-full bg-transparent border-b border-white/5 py-5 text-white placeholder-slate-800 focus:outline-none focus:border-white transition-all text-sm font-light" 
                                            placeholder="https://..." 
                                        />
                                    </div>
                                </div>

                                <button 
                                    onClick={handleAddAccount}
                                    className="w-full py-6 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl" 
                                >
                                    Commit Registry
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Storage Cluster - Refined Grid */}
                <section className="space-y-20 pb-48">
                    <div className="flex items-center justify-between border-b border-white/5 pb-12">
                        <h3 className="font-display text-4xl font-bold text-white italic tracking-tighter">Cluster <span className="font-light opacity-30">Storage</span></h3>
                        <div className="relative">
                            <input 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-b border-white/10 w-64 pl-8 py-3 text-[10px] uppercase tracking-[0.3em] text-white focus:border-white focus:outline-none transition-all placeholder-slate-700" 
                                placeholder="Search Nodes" 
                            />
                            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-white/20 text-lg">search</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {filteredAccounts.map((account, idx) => (
                            <div key={account.id} className="animate-reveal-up" style={{animationDelay: `${idx * 100}ms`}}>
                                <AccountCard 
                                    account={account} 
                                    onDelete={handleDelete}
                                    onUpdate={handleUpdate}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DashboardPage;
