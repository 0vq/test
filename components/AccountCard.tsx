
import React, { useState } from 'react';
import { Account } from '../types';

interface AccountCardProps {
  account: Account;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updated: Account) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...account });
    const [showPass, setShowPass] = useState(false);

    const handleSave = () => {
        onUpdate(account.id, editData);
        setIsEditing(false);
    };

    return (
        <div className="group relative flex flex-col rounded-[2.5rem] premium-card overflow-hidden">
            {/* Ultra-high Contrast Header */}
            <div className="relative h-56 w-full overflow-hidden bg-black">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-[1.5s] grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110" 
                    style={{backgroundImage: `url('${account.img}')`}}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-black/20"></div>
                
                {/* Invisible controls until hover */}
                <div className="absolute top-6 right-6 flex gap-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <button onClick={() => setIsEditing(true)} className="h-10 w-10 flex items-center justify-center bg-black/80 backdrop-blur-xl rounded-full text-white/50 hover:text-white transition-all border border-white/5">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => onDelete(account.id)} className="h-10 w-10 flex items-center justify-center bg-black/80 backdrop-blur-xl rounded-full text-white/50 hover:text-red-400 transition-all border border-white/5">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                </div>
            </div>

            <div className="p-10 flex flex-col gap-10">
                {!isEditing ? (
                    <>
                        <div className="space-y-1">
                            <p className="text-[7px] font-bold uppercase tracking-[0.6em] text-white/20">Registry Entry</p>
                            <h4 className="font-display text-2xl font-bold text-white italic tracking-tight">{account.service}</h4>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-[7px] font-bold uppercase tracking-[0.5em] text-white/20">Identifer</span>
                                <span className="text-xs text-white/70 font-light truncate">{account.email}</span>
                            </div>
                            <div className="flex flex-col gap-2 cursor-pointer group/pass" onClick={() => setShowPass(!showPass)}>
                                <span className="text-[7px] font-bold uppercase tracking-[0.5em] text-white/20">Keyphrase</span>
                                <span className="text-sm font-mono tracking-widest text-white/40 group-hover/pass:text-white transition-colors">
                                    {showPass ? account.pass : '••••••••••••'}
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-8 animate-reveal-up">
                        <div className="space-y-4">
                            <input 
                                value={editData.service} 
                                onChange={(e) => setEditData({...editData, service: e.target.value})}
                                className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white text-sm uppercase tracking-widest" 
                                placeholder="Name"
                            />
                            <input 
                                value={editData.email}
                                onChange={(e) => setEditData({...editData, email: e.target.value})}
                                className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white text-sm" 
                                placeholder="ID"
                            />
                            <input 
                                value={editData.pass}
                                onChange={(e) => setEditData({...editData, pass: e.target.value})}
                                className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white text-sm font-mono" 
                                placeholder="Pass"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button onClick={handleSave} className="flex-1 bg-white text-black py-4 rounded-full text-[8px] font-bold uppercase tracking-widest">Commit</button>
                            <button onClick={() => setIsEditing(false)} className="flex-1 bg-white/5 text-white/40 py-4 rounded-full text-[8px] font-bold uppercase tracking-widest">Abort</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountCard;
