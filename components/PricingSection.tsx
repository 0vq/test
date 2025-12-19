
import React from 'react';
import { SubscriptionPlan, PlanType } from '../types';

interface PricingSectionProps {
    onSelectPlan: (plan: PlanType) => void;
}

const PLANS: SubscriptionPlan[] = [
    {
        id: 'sentinel',
        name: 'Sentinel',
        price: '15',
        description: 'Individual protection for security pioneers.',
        features: ['50 Encrypted Records', 'Basic AI Audit', 'Secure Local Backups', 'Standard Support'],
        color: 'from-slate-700 to-slate-900',
        icon: 'security'
    },
    {
        id: 'guardian',
        name: 'Guardian',
        price: '35',
        description: 'Elite sovereignty for digital natives.',
        features: ['Unlimited Records', 'Gemini Pro AI Analysis', 'Dark Web Monitoring', 'Priority Global Sync'],
        highlight: true,
        color: 'from-primary to-accent-indigo',
        icon: 'shield_person'
    },
    {
        id: 'apex',
        name: 'Apex',
        price: '50',
        description: 'Corporate-grade absolute fortress.',
        features: ['Family & Team Vaults', 'Real-time Threat Neutralizer', 'Concierge Security Help', 'Estate Succession Plans'],
        color: 'from-accent-indigo to-accent-blue',
        icon: 'vps'
    }
];

const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
            <div className="text-center mb-20 animate-reveal-up">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-light">Subscription Portal</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-display font-black text-white mb-8 leading-tight">
                    Fortify Your <span className="text-gradient">Clearance.</span>
                </h3>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                    Select a security tier to authorize access to the KryptoVault encrypted perimeter.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {PLANS.map((plan, idx) => (
                    <div 
                        key={plan.id}
                        className={`group relative flex flex-col p-10 rounded-[3rem] premium-card ${plan.highlight ? 'ring-2 ring-primary/40' : ''} animate-reveal-up shimmer`}
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-indigo-600 text-white text-[10px] font-black uppercase px-6 py-2 rounded-full shadow-2xl shadow-primary/40 tracking-widest z-20">
                                Optimized Tier
                            </div>
                        )}

                        <div className="mb-10">
                            <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                                {/* Removed (plan as any) cast as SubscriptionPlan now correctly includes the icon property */}
                                <span className="material-symbols-outlined text-white text-3xl">{plan.icon}</span>
                            </div>
                            <h4 className="text-3xl font-display font-black text-white mb-3 tracking-tighter">{plan.name}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
                        </div>

                        <div className="flex items-baseline gap-2 mb-10">
                            <span className="text-slate-400 text-3xl font-light">$</span>
                            <span className="text-7xl font-black text-white tracking-tighter">{plan.price}</span>
                            <span className="text-slate-600 text-sm font-bold uppercase tracking-widest">/ month</span>
                        </div>

                        <ul className="space-y-5 mb-12 flex-grow">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-4 text-sm text-slate-400 group/item">
                                    <div className={`h-5 w-5 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover/item:border-primary/50 transition-colors`}>
                                        <span className="material-symbols-outlined text-[14px] text-primary">check</span>
                                    </div>
                                    <span className="group-hover/item:text-slate-200 transition-colors">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={() => onSelectPlan(plan.id)}
                            className={`w-full py-5 rounded-2xl font-display font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 ${
                                plan.highlight 
                                ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-2xl shadow-primary/30 hover:scale-[1.02] hover:shadow-primary/50 active:scale-95' 
                                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 active:scale-95'
                            }`}
                        >
                            Authorize Clearace
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PricingSection;
