import { useEffect, useRef } from 'react';
import { FaBolt, FaLeaf, FaHeart, FaSyringe, FaBone, FaBrain } from 'react-icons/fa6';

const features = [
    { icon: <FaBolt />, title: 'তাৎক্ষণিক শক্তি যোগায়', desc: 'মাত্র ৩-৪টি আচার খেলে শরীরে তৎক্ষণাৎ শক্তি সঞ্চার হয়।', color: '#D97706' },
    { icon: <FaLeaf />, title: 'হজম ক্ষমতা বৃদ্ধি করে', desc: 'প্রচুর ফাইবার থাকে যা পরিপাকতন্ত্র সুস্থ রাখে।', color: '#059669' },
    { icon: <FaHeart />, title: 'হার্ট সুস্থ রাখে', desc: 'পটাশিয়াম ও ম্যাগনেসিয়াম রক্তচাপ নিয়ন্ত্রণে রাখে।', color: '#B91C1C' },
    { icon: <FaSyringe />, title: 'রক্ত হিমোগ্লোবিন বাড়ায়', desc: 'প্রচুর আয়রন থাকায় রক্তস্বল্পতা দূর হয়।', color: '#7C3AED' },
    { icon: <FaBone />, title: 'হাড় মজবুত করে', desc: 'ক্যালসিয়াম সমৃদ্ধ হওয়ায় হাড়ের ক্ষয়রোধে সহায়ক।', color: '#0891B2' },
    { icon: <FaBrain />, title: 'মস্তিষ্কের কার্যক্ষমতা বৃদ্ধি', desc: 'মস্তিষ্কের কোষ সচল রাখে, স্মৃতিশক্তি বৃদ্ধি করে।', color: '#DB2777' },
];

export default function BenefitsSection() {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} style={{ background: 'var(--cream)' }}>
            <div className="container">
                <h2 className="reveal section-title">
                    কেন আমাদের আচার <span style={{ color: 'var(--red)' }}>নেবেন?</span>
                </h2>
                <p className="reveal reveal-delay-1 section-subtitle">
                    প্রতিটি আচার পুষ্টিগুণে ভরপুর — জানুন কী কী উপকারিতা পাচ্ছেন
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className={`reveal reveal-delay-${i + 1} group p-7 md:p-9 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1`}
                            style={{ background: 'var(--white)', borderColor: 'var(--gray-100)' }}
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110"
                                style={{ background: `${f.color}15`, color: f.color }}
                            >
                                {f.icon}
                            </div>
                            <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--gray-900)' }}>{f.title}</h4>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
