import { useEffect, useRef } from 'react';
import { FaFire } from 'react-icons/fa6';
import { useOrderModal } from './OrderModal';

export default function HeroSection() {
    const ref = useRef(null);
    const { open } = useOrderModal();

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

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
                                ✨ ১০০% কেমিক্যালমুক্ত
                            </span>
                        </div>

                        <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            মায়ের হাতের আসল স্বাদ — <br />
                            <span style={{ color: 'var(--red)' }}>সেরা আচার।</span>
                        </h1>

                        <p className="reveal reveal-delay-2 text-lg mb-10" style={{ color: 'var(--gray-600)' }}>
                            প্রতিদিনের পুষ্টি ও শক্তির জন্য সরাসরি গ্রাম থেকে তৈরি ১০০% ফ্রেশ ও কেমিক্যালমুক্ত আচার।
                        </p>

                        <div className="reveal reveal-delay-3">
                            <button onClick={open} className="btn-order text-xl">
                                <FaFire /> অর্ডার করতে চাই 🔥
                            </button>
                        </div>

                        {/* Mini Stats */}
                        <div className="reveal reveal-delay-4 flex flex-wrap justify-center md:justify-start gap-6 mt-10">
                            {[
                                { num: '১০০০+', label: 'ডেলিভারি' },
                                { num: '৪.৯/৫', label: 'রেটিং' },
                                { num: '১০০%', label: 'খাঁটি' },
                            ].map((s, i) => (
                                <div key={i} className="text-center md:text-left">
                                    <div className="text-2xl font-bold" style={{ color: 'var(--red)' }}>{s.num}</div>
                                    <div className="text-xs font-semibold" style={{ color: 'var(--gray-400)' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="order-1 md:order-2 flex justify-center relative">
                        <div className="reveal relative">
                            <div className="absolute inset-0 rounded-full blur-[80px] opacity-20" style={{ background: 'var(--red)' }}></div>
                            <div className="relative animate-float">
                                <img
                                    src="/assets/images/premium_pickle_combo.png"
                                    alt="প্রিমিয়াম আচার কম্বো"
                                    className="w-[280px] md:w-[400px] rounded-[2rem] border-[6px] border-white shadow-2xl"
                                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=800'; }}
                                />
                                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 px-4 py-2 rounded-xl shadow-lg text-sm font-bold"
                                    style={{ background: 'var(--green)', color: 'white' }}>
                                    🚚 ফ্রি ডেলিভারি
                                </div>
                                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 px-5 py-3 rounded-xl shadow-lg" style={{ background: 'white' }}>
                                    <div className="text-xs font-semibold line-through" style={{ color: 'var(--gray-400)' }}>৳১০০০</div>
                                    <div className="text-2xl font-bold" style={{ color: 'var(--red)' }}>৳৭৯৯</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
