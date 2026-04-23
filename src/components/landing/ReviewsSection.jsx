import { useEffect, useRef, useState } from 'react';
import { FaStar, FaCircleCheck, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const reviews = [
    {
        name: 'মাইনুল হাসান', initial: 'ম',
        text: 'এর আগে অন্য একটা পেজ থেকে আচার কিনে প্রতারিত হয়েছিলাম। আপনাদের আচারের মান আসলেই প্রিমিয়াম। ধন্যবাদ আপনাদের। ❤️',
    },
    {
        name: 'কামরুল হাসান শাওন', initial: 'ক',
        text: '৩ কেজির বক্স আজ হাতে পেলাম। আচারগুলো তাজা আছে, স্বাদও অসাধারণ! 🔥',
    },
    {
        name: 'শানজাতুল হক সোনালী', initial: 'শ',
        text: 'সব কাউকেই হাতে পেয়েছি আচারগুলো খুবই ভালো মানের ★★★ ধন্যবাদ',
    },
    {
        name: 'তাজুল ইসলাম', initial: 'ত',
        text: 'আচারের কোয়ালিটি অনেক ভালো। পরিবারের সবাই খুব পছন্দ করেছে।',
    },
];

export default function ReviewsSection() {
    const ref = useRef(null);
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => setIdx(prev => (prev + 1) % reviews.length), 5000);
        return () => clearInterval(interval);
    }, []);

    const prev = () => setIdx(i => (i - 1 + reviews.length) % reviews.length);
    const next = () => setIdx(i => (i + 1) % reviews.length);
    const review = reviews[idx];

    return (
        <section ref={ref} style={{ background: 'var(--cream)' }} id="reviews">
            <div className="container max-w-3xl">
                <h2 className="reveal section-title">
                    সম্মানিত কাস্টমারদের <span style={{ color: 'var(--red)' }}>ফিডব্যাক</span>
                </h2>
                <p className="reveal reveal-delay-1 section-subtitle">তাদের অভিজ্ঞতা থেকে জানুন আমাদের আচারের মান</p>

                {/* Slider */}
                <div className="reveal reveal-delay-2 relative rounded-[2rem] p-8 md:p-14 shadow-xl text-center" style={{ background: 'var(--white)' }}>
                    <FaQuoteLeft className="text-5xl mx-auto mb-6 opacity-10" style={{ color: 'var(--red)' }} />

                    <div className="transition-all duration-500" key={idx}>
                        <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'var(--gray-700)' }}>
                            "{review.text}"
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                                style={{ background: 'var(--red)', color: 'white' }}
                            >
                                {review.initial}
                            </div>
                            <div className="text-left">
                                <div className="font-bold flex items-center gap-2" style={{ color: 'var(--gray-900)' }}>
                                    {review.name} <FaCircleCheck className="text-sm" style={{ color: 'var(--blue)' }} />
                                </div>
                                <div className="flex gap-0.5 text-yellow-400 text-xs mt-0.5">
                                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nav Arrows */}
                    <button onClick={prev} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center border shadow-md transition-colors hover:bg-gray-50" style={{ background: 'white', borderColor: 'var(--gray-200)', color: 'var(--gray-500)' }}>
                        <FaChevronLeft />
                    </button>
                    <button onClick={next} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center border shadow-md transition-colors hover:bg-gray-50" style={{ background: 'white', borderColor: 'var(--gray-200)', color: 'var(--gray-500)' }}>
                        <FaChevronRight />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIdx(i)}
                                className="w-2.5 h-2.5 rounded-full transition-all"
                                style={{ background: i === idx ? 'var(--red)' : 'var(--gray-300)' }}
                            />
                        ))}
                    </div>
                </div>

                {/* Return Policy */}
                <div className="reveal reveal-delay-3 mt-10 text-center p-6 rounded-2xl border" style={{ background: 'var(--white)', borderColor: 'var(--gray-200)' }}>
                    <p className="font-semibold" style={{ color: 'var(--gray-700)' }}>
                        প্রোডাক্ট হাতে পেয়ে ভালো লাগলে রেখে দিন, আর ভালো না লাগলে কেবল ডেলিভারি চার্জ দিয়ে রিটার্ন করে দিন — একদম নিশ্চিন্তে অর্ডার করুন! ✅
                    </p>
                </div>
            </div>
        </section>
    );
}
