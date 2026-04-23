import { useEffect, useRef } from 'react';
import { FaBagShopping, FaTruck, FaCircleCheck } from 'react-icons/fa6';
import { useOrderModal } from './OrderModal';

const items = [
    { emoji: '🥭', name: 'আমের আচার', weight: '৩০০ গ্রাম' },
    { emoji: '🍋', name: 'চালতার আচার', weight: '৩০০ গ্রাম' },
    { emoji: '🍒', name: 'বড়ই আচার', weight: '৩০০ গ্রাম' },
    { emoji: '🌶️', name: 'মিক্সড আচার', weight: '৩০০ গ্রাম' },
    { emoji: '🟤', name: 'তেতুলের আচার', weight: '৩০০ গ্রাম' },
    { emoji: '🦐', name: 'চিংড়ি বালাচাও', weight: '' },
    { emoji: '🍬', name: 'স্ট্রবেরি ক্যান্ডি', weight: 'ফ্রি!', free: true },
];

export default function ComboSection() {
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
        <section ref={ref} id="combo" style={{ background: 'var(--white)' }}>
            <div className="container max-w-4xl">
                <h2 className="reveal section-title">
                    সেরা কোয়ালিটির <span style={{ color: 'var(--red)' }}>আচার কম্বো প্যাকেজ</span>
                </h2>
                <p className="reveal reveal-delay-1 section-subtitle">
                    এখনই অর্ডার করতে নিচের বাটনে ক্লিক করুন
                </p>

                <div className="reveal reveal-delay-2 rounded-[2rem] overflow-hidden shadow-2xl border" style={{ borderColor: 'var(--gray-200)' }}>
                    {/* Header */}
                    <div className="p-6 md:p-8 text-center" style={{ background: 'var(--red)', color: 'white' }}>
                        <p className="text-sm font-semibold uppercase tracking-widest mb-2 opacity-80">📦 প্যাকেজে যা থাকছে</p>
                        <h3 className="text-2xl md:text-3xl font-bold">৭টি প্রিমিয়াম আইটেম</h3>
                    </div>

                    {/* Items List */}
                    <div className="p-5 md:p-8" style={{ background: 'var(--white)' }}>
                        <div className="space-y-3">
                            {items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md"
                                    style={{
                                        borderColor: item.free ? 'var(--green)' : 'var(--gray-100)',
                                        background: item.free ? 'var(--green-light)' : 'var(--gray-50)',
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl">{item.emoji}</span>
                                        <div>
                                            <div className="font-bold" style={{ color: 'var(--gray-900)' }}>{item.name}</div>
                                            {item.weight && (
                                                <div className="text-xs font-semibold" style={{ color: item.free ? 'var(--green)' : 'var(--gray-400)' }}>
                                                    {item.weight}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {item.free && (
                                        <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--green)', color: 'white' }}>🎁 ফ্রি</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Price + CTA */}
                        <div className="mt-8 pt-6 border-t border-dashed text-center" style={{ borderColor: 'var(--gray-200)' }}>
                            <div className="mb-2 text-sm font-semibold line-through" style={{ color: 'var(--gray-400)' }}>৳১০০০</div>
                            <div className="text-4xl font-bold mb-1" style={{ color: 'var(--red)' }}>৳৭৯৯</div>
                            <div className="text-sm font-semibold mb-8 flex items-center justify-center gap-2" style={{ color: 'var(--green)' }}>
                                <FaTruck /> ডেলিভারি চার্জ একদম ফ্রি!
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm font-semibold" style={{ color: 'var(--gray-500)' }}>
                                <span className="flex items-center gap-1.5"><FaCircleCheck style={{ color: 'var(--green)' }} /> ঘরোয়া</span>
                                <span className="flex items-center gap-1.5"><FaCircleCheck style={{ color: 'var(--green)' }} /> BSTI</span>
                                <span className="flex items-center gap-1.5"><FaCircleCheck style={{ color: 'var(--green)' }} /> মানসম্মত</span>
                            </div>

                            <button
                                onClick={open}
                                className="btn-order mx-auto"
                            >
                                <FaBagShopping /> অর্ডার করুন — ৳৭৯৯
                            </button>

                            <p className="mt-5 text-xs font-semibold" style={{ color: 'var(--red)' }}>
                                ⚠️ অফার সীমিত সময়ের জন্য! আজ অর্ডার না করলে কাল হয়তো শেষ 😢
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
