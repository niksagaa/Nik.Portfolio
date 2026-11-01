'use client';

import React from 'react';
import { MessageSquare, Star, Send } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
    newName: string;
    setNewName: (name: string) => void;
    newRole: string;
    setNewRole: (role: string) => void;
    newMessage: string;
    setNewMessage: (msg: string) => void;
    newRating: number;
    setNewRating: (rating: number) => void;
    hoverRating: number;
    setHoverRating: (rating: number) => void;
    handleAddTestimonial: (e: React.FormEvent) => void;
    isDarkMode: boolean;
}

export default function TestimonialsSection({
    testimonials,
    newName,
    setNewName,
    newRole,
    setNewRole,
    newMessage,
    setNewMessage,
    newRating,
    setNewRating,
    hoverRating,
    setHoverRating,
    handleAddTestimonial,
    isDarkMode,
}: TestimonialsSectionProps) {
    return (
        <section id="testimonials" className="space-y-6 sm:space-y-8 pt-6 sm:pt-10 pb-16 sm:pb-20">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                    <MessageSquare className="text-[#59B292] shrink-0" /> Endorsements & Recommendations
                </h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>Social proof from former engineering managers, leads, and clients.</p>
            </div>

            <form onSubmit={handleAddTestimonial} className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
                <h3 className="font-bold text-base">Submit an Endorsement</h3>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#59B292]">Rating:</span>
                    <div className="flex text-[#59B292] gap-1 cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                onClick={() => setNewRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className={`w-5 h-5 transition-transform hover:scale-110 ${star <= (hoverRating || newRating) ? 'fill-current text-[#59B292]' : 'text-gray-500'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Your Full Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#59B292] ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`}
                    />
                    <input
                        type="text"
                        placeholder="Role / Title (e.g. Senior Tech Lead at TechCorp)"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#59B292] ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`}
                    />
                </div>
                <textarea
                    rows={3}
                    placeholder="Write an endorsement..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#59B292] ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`}
                />
                <button type="submit" className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-xl bg-[#59B292] text-black font-bold text-xs flex items-center gap-2 hover:opacity-90 transition">
                    <Send className="w-4 h-4" /> Submit Endorsement
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                    <div key={t.id} className={`p-5 sm:p-6 rounded-2xl border space-y-3 flex flex-col justify-between ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex text-[#59B292] gap-1">
                            {[...Array(t.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                        </div>
                        <p className={`text-sm italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{t.message}"</p>
                        <div className="flex justify-between items-end pt-3 border-t border-[#222222]/20">
                            <div>
                                <p className="font-bold text-sm text-[#59B292]">{t.name}</p>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.role}</p>
                            </div>
                            <span className={`text-xs font-mono ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}