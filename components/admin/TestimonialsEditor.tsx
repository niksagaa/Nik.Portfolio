'use client';

import React from 'react';
import { MessageSquare, Trash2, Star } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialsEditorProps {
    testimonials: Testimonial[];
    setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
    showToast: (msg: string) => void;
    isDarkMode: boolean;
}

export default function TestimonialsEditor({ testimonials, setTestimonials, showToast, isDarkMode }: TestimonialsEditorProps) {
    const handleDeleteTestimonial = (id: string) => {
        const updated = testimonials.filter(t => t.id !== id);
        setTestimonials(updated);
        localStorage.setItem('app_testimonials', JSON.stringify(updated));
        showToast("Testimonial removed.");
    };

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="text-[#59B292]" /> Testimonials Manager
            </h2>

            <div className="space-y-3">
                {testimonials.map((t) => (
                    <div key={t.id} className={`p-4 rounded-xl border flex justify-between items-center ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#59B292]">{t.name}</span>
                                <span className="text-xs text-gray-500">({t.role})</span>
                                <div className="flex text-[#59B292] gap-0.5">
                                    {[...Array(t.rating || 5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className={`text-xs mt-1 italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{t.message}"</p>
                        </div>
                        <button onClick={() => handleDeleteTestimonial(t.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}