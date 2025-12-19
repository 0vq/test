
import React from 'react';

const AmbientBackground: React.FC = () => (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none select-none">
        {/* Neblina de Titanio */}
        <div className="absolute top-[-30%] right-[-10%] w-[80%] h-[80%] bg-white/5 rounded-full blur-[150px] animate-float"></div>
        
        {/* Reflejos de Oro Blanco */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent-gold/3 rounded-full blur-[120px] animate-float" style={{animationDelay: '-4s'}}></div>
        
        {/* Textura Granulada Cinematográfica */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        {/* Grid de Alta Precisión */}
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
    </div>
);

export default AmbientBackground;
