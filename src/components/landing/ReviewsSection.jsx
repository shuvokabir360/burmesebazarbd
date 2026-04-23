import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { FaStar, FaStarHalfStroke } from 'react-icons/fa6';

const fallbackReviews = [
    { id: '1', reviewer_name: 'ফাতেমা আক্তার', reviewer_location: 'ঢাকা', rating: 5, review_text: 'আমি অনেকদিন ধরে নানির রেসিপির মতো আচার খুঁজছিলাম — অবশেষে পেয়ে গেছি! আমের আচারটা অসাধারণ। পুরো পরিবার মুগ্ধ। আমরা তিনবার অর্ডার করেছি!' },
    { id: '2', reviewer_name: 'রশিদ আহমেদ', reviewer_location: 'চট্টগ্রাম', rating: 5, review_text: 'চালতার আচার খেয়ে মাথা নষ্ট! কোথাও পাইনি — দোকানে না, অনলাইনেও না। আর কোয়ালিটি? দাদির হাতের মতো! প্যাকেজিং একদম পারফেক্ট — একটুও লিক হয়নি।' },
    { id: '3', reviewer_name: 'নুসরাত ইসলাম', reviewer_location: 'সিলেট', rating: 4.5, review_text: 'বাবা-মায়ের জন্য গিফট হিসেবে অর্ডার করেছিলাম — তারা ফোন করে আনন্দে কেঁদে দিলেন! বললেন বাড়ির কথা মনে পড়ে গেছে। রসুনের আচারটা একদম আসক্তিকর। সেরা ৳৮৯৯ খরচ!' },
];

function StarRating({ rating }) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
        <div className="review-stars">
            {Array.from({ length: full }, (_, i) => <FaStar key={i} />)}
            {half && <FaStarHalfStroke />}
        </div>
    );
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2);
}

export default function ReviewsSection() {
    const [reviews, setReviews] = useState(fallbackReviews);
    const [countersAnimated, setCountersAnimated] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const { data, error } = await supabase
                    .from('reviews')
                    .select('*')
                    .eq('is_visible', true)
                    .order('created_at', { ascending: false });
                if (!error && data && data.length > 0) setReviews(data);
            } catch (e) { /* fallback */ }
        }
        fetchReviews();
    }, []);

    // Counter animation
    useEffect(() => {
        const handleScroll = () => {
            if (countersAnimated || !statsRef.current) return;
            const rect = statsRef.current.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                setCountersAnimated(true);
                statsRef.current.querySelectorAll('.stat-number').forEach(counter => {
                    const target = parseFloat(counter.dataset.count);
                    const isDecimal = target % 1 !== 0;
                    const duration = 2000;
                    const start = performance.now();
                    const update = (now) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        counter.textContent = isDecimal ? (eased * target).toFixed(1) : Math.floor(eased * target).toLocaleString();
                        if (progress < 1) requestAnimationFrame(update);
                        else counter.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
                    };
                    requestAnimationFrame(update);
                });
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [countersAnimated]);

    return (
        <section className="section reviews-section" id="reviews">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">⭐ হাজারো মানুষের পছন্দ</span>
                    <h2 className="section-title">কাস্টমাররা কী <span className="text-gradient">বলছেন</span></h2>
                    <p className="section-desc">বাংলাদেশের সব প্রান্ত থেকে আচারপ্রেমীদের আসল গল্প।</p>
                </div>

                <div className="reviews-grid">
                    {reviews.map((r) => (
                        <div className="review-card" key={r.id} id={`review-${r.id}`}>
                            <StarRating rating={r.rating} />
                            <blockquote className="review-text">"{r.review_text}"</blockquote>
                            <div className="reviewer">
                                <div className="reviewer-avatar">{getInitials(r.reviewer_name)}</div>
                                <div className="reviewer-info">
                                    <strong>{r.reviewer_name}</strong>
                                    <span>{r.reviewer_location} • ভেরিফাইড ক্রেতা</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="reviews-stats" ref={statsRef}>
                    <div className="stat-item">
                        <span className="stat-number" data-count="2500">0</span><span className="stat-suffix">+</span>
                        <span className="stat-label">সন্তুষ্ট কাস্টমার</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number" data-count="4800">0</span><span className="stat-suffix">+</span>
                        <span className="stat-label">বয়াম ডেলিভারি</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number" data-count="4.9">0</span>
                        <span className="stat-label">গড় রেটিং</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number" data-count="64">0</span>
                        <span className="stat-label">জেলায় ডেলিভারি</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
