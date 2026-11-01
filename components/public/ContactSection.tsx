'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquareText } from 'lucide-react';

interface ContactSectionProps {
    isDarkMode: boolean;
    showToast: (msg: string) => void;
}

export default function ContactSection({ isDarkMode, showToast }: ContactSectionProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            showToast("Please fill in all fields.");
            return;
        }

        setIsSubmitting(true);

        // Simulation of form submission (You can replace this with a real Formspree endpoint URL later)
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            showToast("Your message has been sent successfully!");
            setName('');
            setEmail('');
            setMessage('');
        }, 1000);
    };

    return (
        <section id="contact" className="space-y-6 sm:space-y-8 pt-6 sm:pt-10">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                    <Mail className="text-[#59B292] shrink-0" /> Get in Touch
                </h2>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Have a project in mind, need a frontend developer, or just want to collaborate? Drop a message here.
                </p>
            </div>

            <div className={`p-6 sm:p-8 rounded-2xl border ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
                {submitted ? (
                    <div className="text-center py-10 space-y-3">
                        <CheckCircle2 className="w-12 h-12 text-[#59B292] mx-auto animate-bounce" />
                        <h3 className="text-lg font-bold">Thank You for Your Message!</h3>
                        <p className={`text-xs max-w-md mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            I have received your message and will reply to your email as soon as possible.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="px-4 py-2 rounded-xl bg-[#59B292]/10 text-[#59B292] text-xs font-semibold hover:bg-[#59B292]/20 transition"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${isDarkMode ? 'bg-black border-[#222222] text-white focus:border-[#59B292]' : 'bg-white border-gray-300 text-black focus:border-[#59B292]'}`}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${isDarkMode ? 'bg-black border-[#222222] text-white focus:border-[#59B292]' : 'bg-white border-gray-300 text-black focus:border-[#59B292]'}`}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Tell me about your project details or proposal..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${isDarkMode ? 'bg-black border-[#222222] text-white focus:border-[#59B292]' : 'bg-white border-gray-300 text-black focus:border-[#59B292]'}`}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#59B292] text-black font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg shadow-[#59B292]/20 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <span>Sending...</span>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" /> Send Message
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}