import { useState, useEffect } from 'react';
import { FaPhone } from 'react-icons/fa6';
import { useLandingContent } from '../../context/LandingContentContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { settings } = useLandingContent();
    const phone = settings?.phone || '+8801732559177';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] flex flex-col items-center">
            {/* Main Bar */}
            <div className="w-full bg-[#f39c12] shadow-lg border-b border-[#e67e22] py-3">
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href={`tel:${phone}`} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-white font-bold transition-all text-sm md:text-base">
                            <FaPhone className="text-sm" /> 
                            <span>{phone}</span>
                        </a>
                    </div>
                    
                    <div className="flex items-center">
                        <button 
                            className="bg-[#e74c3c] text-white px-6 py-2 rounded-full font-black shadow-lg text-sm md:text-base hover:bg-[#c0392b] transition-all" 
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            অর্ডার করুন
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub Bar (Blue Call Button) */}
            <div className="mt-4 reveal-item">
                <a href={`tel:${phone}`} className="btn-blue flex items-center gap-2 shadow-2xl scale-90 md:scale-100">
                    <FaPhone /> কল করুন — {phone}
                </a>
            </div>
        </nav>
    );
}
