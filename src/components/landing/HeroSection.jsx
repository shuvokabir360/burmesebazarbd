import { useEffect, useRef, useState, useMemo } from 'react';
import { FaFire, FaPhone } from 'react-icons/fa6';
import { useOrderModal } from './OrderModal';
import { useLandingContent, parseHeroImages } from '../../context/LandingContentContext';

// Premium color palettes — picks one randomly on each page load
const BUTTON_THEMES = [
    { bg: 'linear-gradient(135deg, #B91C1C 0%, #EF4444 50%, #DC2626 100%)', shadow: 'rgba(185,28,28,0.45)', ring: '#EF4444' },
    { bg: 'linear-gradient(135deg, #047857 0%, #10B981 50%, #059669 100%)', shadow: 'rgba(4,120,87,0.45)', ring: '#10B981' },
    { bg: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 50%, #2563EB 100%)', shadow: 'rgba(29,78,216,0.45)', ring: '#3B82F6' },
    { bg: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #8B5CF6 100%)', shadow: 'rgba(124,58,237,0.45)', ring: '#A78BFA' },
    { bg: 'linear-gradient(135deg, #C2410C 0%, #F97316 50%, #EA580C 100%)', shadow: 'rgba(194,65,12,0.45)', ring: '#F97316' },
    { bg: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #0D9488 100%)', shadow: 'rgba(15,118,110,0.45)', ring: '#14B8A6' },
];

export default function HeroSection() {
    const ref = useRef(null);
    const { open } = useOrderModal();
    const { content, settings } = useLandingContent();
    const [currentSlide, setCurrentSlide] = useState(0);
    const phone = settings?.phone || '+8801732559177';

    // Pick a random color theme once per mount (page load)
    const btnTheme = useMemo(() => BUTTON_THEMES[Math.floor(Math.random() * BUTTON_THEMES.length)], []);

    const slides = parseHeroImages(content.hero_images);

    // Auto-slide every 3 seconds
    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 3000);
        return () => clearInterval(timer);
    }, [slides.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const regularPrice = content.regular_price || '1000';
    const offerPrice = content.offer_price || '799';

    return (
        <header
            ref={ref}
            id="hero"
            style={{ 
                background: 'radial-gradient(circle at 0% 0%, #FFFBF0 0%, transparent 50%), radial-gradient(circle at 100% 0%, #FEE2E2 0%, transparent 50%), #FFFDF5' 
            }}
            className="relative overflow-hidden"
        >
            {/* Top Announcement Bar (Moving Text) */}
            <div className="w-full py-2 overflow-hidden bg-[#e67e22]/10 backdrop-blur-md border-b border-[#e67e22]/20">
                <div 
                    className="flex whitespace-nowrap animate-marquee-fast"
                    style={{ animationDuration: `${content.announcement_speed || 15}s` }}
                >
                    {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="flex items-center gap-10 px-4 text-[11px] md:text-sm font-bold text-[#d35400] tracking-wide">
                            {content.announcement_text?.split('|').map((t, idx) => (
                                <span key={idx}>{t.trim()}</span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="container pt-6 pb-16 md:pt-10 md:pb-24">
                {/* Top Menu Style Navbar */}
                <nav className="flex items-center justify-between py-5 mb-10 md:mb-16 border-b border-gray-200/50">
                    <a href="#" className="flex flex-col leading-tight">
                        <span className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: 'var(--red)' }}>
                            বার্মিজ <span style={{ color: 'var(--yellow-dark)' }}>বাজার বিডি</span>
                        </span>
                        <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                            শতভাগ খাঁটি ও প্রিমিয়াম পণ্যের নির্ভরযোগ্য প্রতিষ্ঠান
                        </span>
                    </a>
                    <a
                        href={`tel:${phone}`}
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-full border-2 transition-all hover:bg-red-50"
                        style={{ borderColor: 'var(--red)', color: 'var(--red)' }}
                    >
                        <FaPhone className="text-xs" /> কল করুন
                    </a>
                </nav>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                    {/* Text */}
                    <div className="order-2 md:order-1 text-center md:text-left">
                        <div className="reveal">
                            <span
                                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                                style={{ background: 'var(--yellow-light)', color: 'var(--yellow-dark)' }}
                            >
                                {content.hero_badge}
                            </span>
                        </div>

                        <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            {content.hero_headline} <br />
                            <span style={{ color: 'var(--red)' }}>{content.hero_headline_highlight}</span>
                        </h1>

                        <p className="reveal reveal-delay-2 text-lg mb-10" style={{ color: 'var(--gray-600)' }}>
                            {content.hero_subtitle}
                        </p>

                        <div className="reveal reveal-delay-3">
                            <button onClick={open} className="btn-order text-xl">
                                <FaFire /> {content.hero_cta_text}
                            </button>
                        </div>

                        {/* Mini Stats */}
                        <div className="reveal reveal-delay-4 flex flex-wrap justify-center md:justify-start gap-6 mt-10">
                            {[
                                { num: content.stat_deliveries, label: 'ডেলিভারি' },
                                { num: content.stat_reviews, label: 'রেটিং' },
                                { num: content.stat_pure, label: 'খাঁটি' },
                            ].map((s, i) => (
                                <div key={i} className="text-center md:text-left">
                                    <div className="text-2xl font-bold" style={{ color: 'var(--red)' }}>{s.num}</div>
                                    <div className="text-xs font-semibold" style={{ color: 'var(--gray-400)' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Slider */}
                    <div className="order-1 md:order-2 flex justify-center relative">
                        <div className="reveal relative">
                            <div className="absolute inset-0 rounded-full blur-[80px] opacity-20" style={{ background: 'var(--red)' }}></div>
                            <div className="relative">
                                <div className="w-full md:w-[480px] rounded-[1.5rem] md:rounded-[2.5rem] border-[4px] md:border-[8px] border-white shadow-2xl overflow-hidden relative"
                                     style={{ aspectRatio: '4/5' }}>
                                    {slides.map((slide, i) => (
                                        <img
                                            key={i}
                                            src={slide.src}
                                            alt={slide.alt}
                                            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                                            style={{ opacity: i === currentSlide ? 1 : 0 }}
                                        />
                                    ))}
                                    
                                    {/* Premium Price Tag */}
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl z-20 border border-white/50">
                                        <div className="text-[10px] font-bold text-gray-400 line-through leading-none mb-1">৳{regularPrice}</div>
                                        <div className="text-xl font-black text-[#e74c3c] leading-none">৳{offerPrice}</div>
                                    </div>

                                    {/* Premium Organic Badge */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-yellow-500/30 z-20">
                                        <div className="text-[10px] uppercase font-black text-[#f39c12] leading-none text-center">Premium</div>
                                        <div className="text-xs font-bold text-gray-800 leading-tight mt-1">১০০% অর্গানিক</div>
                                    </div>
                                </div>

                                {/* Thumbnail Gallery */}
                                <div className="flex flex-wrap justify-center gap-2 mt-6">
                                    {slides.map((slide, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentSlide(i)}
                                            className={`w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                                                i === currentSlide ? 'border-[#f39c12] scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img src={slide.src} className="w-full h-full object-cover" alt="" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Order Button Below Image — Glossy Premium */}
                            <button
                                onClick={open}
                                className="hero-glossy-btn w-full mt-6"
                                style={{
                                    background: btnTheme.bg,
                                    boxShadow: `0 8px 28px ${btnTheme.shadow}, inset 0 1px 0 rgba(255,255,255,0.25)`,
                                    '--ring-color': btnTheme.ring,
                                }}
                            >
                                <span className="hero-glossy-shine"></span>
                                <span className="hero-glossy-content">
                                    <FaFire /> {content.hero_cta_text}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
