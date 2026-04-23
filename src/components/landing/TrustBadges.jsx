import { useEffect, useRef } from 'react';
import { FaStar, FaTruck, FaShieldHalved, FaLeaf, FaFlask, FaWind, FaCircleCheck } from 'react-icons/fa6';

export default function TrustBadges() {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const badges = [
        { icon: <FaCircleCheck />, title: '১০০% খাঁটি', desc: 'গ্রামের খাঁটি রেসিপি', color: '#059669' },
        { icon: <FaFlask />, title: 'কেমিক্যাল মুক্ত', desc: 'কোনো প্রিজার্ভেটিভ নেই', color: '#B91C1C' },
        { icon: <FaWind />, title: 'অতুলনীয় সুগন্ধ', desc: 'ঘ্রাণেই মন ভরে যায়', color: '#D97706' },
        { icon: <FaShieldHalved />, title: 'BSTI অনুমোদিত', desc: 'স্বাস্থ্যকর ও মানসম্মত', color: '#1D4ED8' },
    ];

    return (
        <section ref={ref} style={{ background: 'var(--white)' }}>
            <div className="container">
                {/* Top Stats Row */}
                <div className="reveal flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-14 py-6 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5 text-yellow-400"> {[...Array(5)].map((_, i) => <FaStar key={i} />)} </div>
                        <span className="font-bold text-lg" style={{ color: 'var(--gray-900)' }}>৪.৯/৫</span>
                        <span className="text-sm" style={{ color: 'var(--gray-400)' }}>কাস্টমার রিভিউ</span>
                    </div>
                    <div className="hidden md:block w-px h-8" style={{ background: 'var(--gray-200)' }}></div>
                    <div className="flex items-center gap-2">
                        <FaTruck style={{ color: 'var(--green)' }} />
                        <span className="font-bold" style={{ color: 'var(--gray-900)' }}>১০০০+</span>
                        <span className="text-sm" style={{ color: 'var(--gray-400)' }}>সফল ডেলিভারি</span>
                    </div>
                    <div className="hidden md:block w-px h-8" style={{ background: 'var(--gray-200)' }}></div>
                    <div className="flex items-center gap-2">
                        <FaShieldHalved style={{ color: 'var(--blue)' }} />
                        <span className="font-bold" style={{ color: 'var(--gray-900)' }}>BSTI</span>
                        <span className="text-sm" style={{ color: 'var(--gray-400)' }}>অনুমোদিত</span>
                    </div>
                </div>

                {/* Badge Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {badges.map((b, i) => (
                        <div
                            key={i}
                            className={`reveal reveal-delay-${i + 1} text-center p-6 md:p-8 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1`}
                            style={{ borderColor: 'var(--gray-100)', background: 'var(--gray-50)' }}
                        >
                            <div className="text-3xl md:text-4xl mb-4 flex justify-center" style={{ color: b.color }}>{b.icon}</div>
                            <h4 className="font-bold text-base md:text-lg mb-1" style={{ color: 'var(--gray-900)' }}>{b.title}</h4>
                            <p className="text-xs md:text-sm" style={{ color: 'var(--gray-400)' }}>{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
