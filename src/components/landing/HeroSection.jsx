import { useEffect, useRef, useState } from 'react';
import { FaFire } from 'react-icons/fa6';
import { useOrderModal } from './OrderModal';
import { useLandingContent, parseHeroImages } from '../../context/LandingContentContext';

export default function HeroSection() {
    const ref = useRef(null);
    const { open } = useOrderModal();
    const { content } = useLandingContent();
    const [currentSlide, setCurrentSlide] = useState(0);

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
            style={{ background: 'linear-gradient(160deg, #FFFBF0 0%, #FEF3C7 40%, #FEE2E2 100%)' }}
            className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24"
        >
            <div className="container">
                {/* Navbar */}
                <nav className="flex items-center justify-between py-3 mb-10 md:mb-16">
                    <a href="#" className="flex flex-col leading-tight">
                        <span style={{ color: 'var(--red)' }} className="text-xl md:text-2xl font-bold">মায়ের হাতের</span>
                        <span style={{ color: 'var(--yellow)' }} className="text-xs font-bold tracking-widest uppercase">আসল স্বাদ</span>
                    </a>
                    <a
                        href="tel:+8801732559177"
                        className="text-sm font-semibold px-5 py-2 rounded-full border-2 transition-colors"
                        style={{ borderColor: 'var(--red)', color: 'var(--red)' }}
                    >
                        📞 কল করুন
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
                                <div className="w-[280px] md:w-[400px] rounded-[2rem] border-[6px] border-white shadow-2xl overflow-hidden relative"
                                     style={{ aspectRatio: '3/4' }}>
                                    {slides.map((slide, i) => (
                                        <img
                                            key={i}
                                            src={slide.src}
                                            alt={slide.alt}
                                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                                            style={{ opacity: i === currentSlide ? 1 : 0 }}
                                        />
                                    ))}
                                </div>

                                {/* Dots */}
                                {slides.length > 1 && (
                                    <div className="flex justify-center gap-2 mt-4">
                                        {slides.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentSlide(i)}
                                                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                                                style={{
                                                    background: i === currentSlide ? 'var(--red)' : '#D1D5DB',
                                                    transform: i === currentSlide ? 'scale(1.3)' : 'scale(1)',
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Badges */}
                                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 px-4 py-2 rounded-xl shadow-lg text-sm font-bold z-10"
                                    style={{ background: 'var(--green)', color: 'white' }}>
                                    🚚 ফ্রি ডেলিভারি
                                </div>
                                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 px-5 py-3 rounded-xl shadow-lg z-10" style={{ background: 'white' }}>
                                    <div className="text-xs font-semibold line-through" style={{ color: 'var(--gray-400)' }}>৳{regularPrice}</div>
                                    <div className="text-2xl font-bold" style={{ color: 'var(--red)' }}>৳{offerPrice}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
