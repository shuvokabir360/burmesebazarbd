import { useState, useEffect, useRef } from 'react';
import { FaClock, FaFire } from 'react-icons/fa6';
import { useOrderModal } from './OrderModal';

export default function PricingBlock() {
    const ref = useRef(null);
    const { open } = useOrderModal();
    const [time, setTime] = useState({ d: 2, h: 11, m: 45, s: 30 });

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => {
                let { d, h, m, s } = prev;
                s--;
                if (s < 0) { s = 59; m--; }
                if (m < 0) { m = 59; h--; }
                if (h < 0) { h = 23; d--; }
                if (d < 0) return { d: 0, h: 0, m: 0, s: 0 };
                return { d, h, m, s };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = n => String(n).padStart(2, '0');

    const timerBoxes = [
        { val: pad(time.d), label: 'দিন' },
        { val: pad(time.h), label: 'ঘণ্টা' },
        { val: pad(time.m), label: 'মিনিট' },
        { val: pad(time.s), label: 'সেকেন্ড' },
    ];

    return (
        <section ref={ref} id="pricing" style={{ background: 'var(--red-light)' }}>
            <div className="container max-w-3xl text-center">
                {/* Header */}
                <div className="reveal flex items-center justify-center gap-3 mb-3">
                    <FaClock className="text-2xl md:text-3xl" style={{ color: 'var(--red)' }} />
                    <h2 className="text-2xl md:text-4xl font-bold" style={{ color: 'var(--red)' }}>
                        এখনই অর্ডার করুন — অফার শেষ হচ্ছে!
                    </h2>
                </div>
                <p className="reveal reveal-delay-1 mb-10" style={{ color: 'var(--gray-500)' }}>
                    ডেলিভারির সময় টেস্ট করে পছন্দ হলে পে করুন। কোনো ঝুঁকি নেই!
                </p>

                {/* Countdown */}
                <div className="reveal reveal-delay-2 flex justify-center gap-3 md:gap-5 mb-12">
                    {timerBoxes.map((t, i) => (
                        <div key={i} className="rounded-2xl shadow-lg p-4 md:p-6 min-w-[75px] md:min-w-[100px]"
                            style={{ background: 'var(--white)', borderBottom: '4px solid var(--yellow)' }}>
                            <div className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--red)' }}>{t.val}</div>
                            <div className="text-xs font-semibold mt-1" style={{ color: 'var(--gray-400)' }}>{t.label}</div>
                        </div>
                    ))}
                </div>

                {/* Pricing Card */}
                <div className="reveal reveal-delay-3 rounded-[2rem] p-8 md:p-14 shadow-2xl mb-10" style={{ background: 'var(--white)' }}>
                    <p className="text-lg mb-1" style={{ color: 'var(--gray-500)' }}>রেগুলার মূল্য</p>
                    <p className="text-2xl font-bold line-through mb-4" style={{ color: 'var(--gray-400)' }}>৳১০০০ টাকা</p>
                    <p className="text-xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>সীমিত সময়ের অফার মূল্য</p>
                    <div className="inline-block relative my-4">
                        <span className="text-5xl md:text-7xl font-bold" style={{ color: 'var(--red)' }}>৳৭৯৯</span>
                        <span className="text-xl md:text-2xl font-semibold ml-2" style={{ color: 'var(--gray-500)' }}>টাকা মাত্র</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="reveal reveal-delay-4">
                    <button
                        onClick={open}
                        className="btn-order text-2xl px-14 py-6"
                    >
                        <FaFire /> অর্ডার করতে চাই 🔥
                    </button>
                    <p className="mt-6 text-sm font-semibold animate-pulse" style={{ color: 'var(--red)' }}>
                        ⚠️ অফার আর কিছুক্ষণ! স্টক সীমিত।
                    </p>
                </div>
            </div>
        </section>
    );
}
