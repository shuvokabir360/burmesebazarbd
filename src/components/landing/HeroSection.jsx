import { useEffect, useRef } from 'react';
import { FaBagShopping, FaLeaf, FaTruckFast, FaShieldHalved, FaMoneyBill1Wave } from 'react-icons/fa6';
import { useOrderModal } from '../../context/OrderModalContext';

export default function HeroSection({ settings }) {
    const particlesRef = useRef(null);
    const { openModal } = useOrderModal();

    useEffect(() => {
        const container = particlesRef.current;
        if (!container) return;
        const colors = [
            'rgba(192, 57, 43, 0.4)', 'rgba(230, 126, 34, 0.4)',
            'rgba(241, 196, 15, 0.3)', 'rgba(231, 76, 60, 0.3)',
        ];
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.classList.add('hero-particle');
            const size = Math.random() * 6 + 2;
            p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*8}s;animation-duration:${Math.random()*6+6}s;`;
            container.appendChild(p);
        }
        return () => { container.innerHTML = ''; };
    }, []);

    const scrollTo = (e, id) => {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <header className="hero" id="hero">
            <div className="hero-bg-overlay"></div>
            <div className="hero-particles" ref={particlesRef}></div>
            <div className="container hero-content">
                <div className="hero-text">
                    <span className="hero-badge animate-float">🌶️ ১০০% খাঁটি • কেমিক্যাল মুক্ত • BSTI অনুমোদিত</span>
                    <h1 className="hero-title">
                        বার্মিজ বাজার বিডি -তে<br />
                        <span className="text-gradient">মায়ের হাতের আসল স্বাদ</span>
                    </h1>
                    <p className="hero-subtitle">
                        প্রতিদিনের পুষ্টি ও শক্তির জন্য সেরা নির্বাচন। ১০০% ফ্রেশ, স্বাস্থ্যকর এবং পরিবারের জন্য নিরাপদ সরাসরি গ্রাম থেকে তৈরি আচার।
                        <em> ৬টি প্রিমিয়াম আইটেমের সাথে থাকছে ১টি সম্পূর্ণ ফ্রি!</em>
                    </p>
                    <div className="hero-cta-group">
                        <button className="btn btn-primary btn-lg pulse-glow" id="heroCtaOrder" onClick={openModal} style={{ fontFamily: 'inherit', border: 'none', cursor: 'pointer' }}>
                            <FaBagShopping /> অর্ডার করুন — ৳৭৯৯
                        </button>
                        <a href="#why-us" className="btn btn-outline btn-lg" id="heroCtaLearn" onClick={(e) => scrollTo(e, '#why-us')}>
                            <FaLeaf /> কেন আমরা
                        </a>
                    </div>
                    <div className="hero-trust-strip">
                        <div className="trust-item"><FaTruckFast /> ফ্রি ডেলিভারি</div>
                        <div className="trust-item"><FaShieldHalved /> ইজি রিটার্ন</div>
                        <div className="trust-item"><FaMoneyBill1Wave /> চেক করে পেমেন্ট</div>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-img-wrapper">
                        <img src="/assets/images/hero-pickles.png" alt="প্রিমিয়াম আচার কম্বো প্যাকেজ" loading="eager" width="600" height="600" />
                        <div className="hero-img-ring"></div>
                        <div className="hero-img-ring ring-2"></div>
                    </div>
                    <div className="floating-badge badge-discount animate-float-delay">
                        <span className="badge-big">৳২০১</span>
                        <span className="badge-small">সাশ্রয়</span>
                    </div>
                    <div className="floating-badge badge-combo animate-float">
                        <span className="badge-icon">🔥</span>
                        <span className="badge-label">কম্বো অফার</span>
                    </div>
                </div>
            </div>
            <div className="hero-wave">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="var(--bg-primary)" />
                </svg>
            </div>
        </header>
    );
}
