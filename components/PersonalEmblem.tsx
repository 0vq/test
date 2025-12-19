
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const PersonalEmblem: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateEmblem = async () => {
        setLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [
                        { text: 'Avant-garde luxury monogram logo, abstract architectural metal sculpture, liquid platinum and white gold texture, symmetrical minimalism, deep obsidian black background, studio cinematic lighting, hyper-realistic, high-end jewelry brand aesthetic' }
                    ]
                },
                config: {
                    imageConfig: { aspectRatio: "1:1" }
                }
            });

            for (const part of response.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    setLogoUrl(`data:image/png;base64,${part.inlineData.data}`);
                    break;
                }
            }
        } catch (error) {
            console.error("Failed to generate luxury logo", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        generateEmblem();
    }, []);

    const sizeClasses = {
        sm: 'h-10 w-10 rounded-lg',
        md: 'h-16 w-16 rounded-xl',
        lg: 'h-48 w-48 rounded-[2rem]'
    };

    return (
        <div className={`relative ${sizeClasses[size]} overflow-hidden bg-black border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer group`} onClick={generateEmblem}>
            {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="h-4 w-4 border border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
            ) : logoUrl ? (
                <img src={logoUrl} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Sovereign Emblem" />
            ) : (
                <span className="material-symbols-outlined text-white/20">stat_3</span>
            )}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/80 flex items-center justify-center transition-all duration-500">
                <span className="material-symbols-outlined text-white text-xs font-light tracking-widest">REGENERATE</span>
            </div>
        </div>
    );
};

export default PersonalEmblem;
