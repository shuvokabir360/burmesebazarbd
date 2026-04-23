import { FaTruckFast, FaRotateLeft, FaShieldHalved, FaFlaskVial } from 'react-icons/fa6';

const usps = [
    { id: 'delivery', icon: FaTruckFast, title: 'ফ্রি ডেলিভারি', desc: 'সারাদেশে বিনামূল্যে আপনার ঠিকানায় পৌঁছে দিচ্ছি।' },
    { id: 'return', icon: FaRotateLeft, title: 'ইজি রিটার্ন', desc: 'প্রোডাক্ট হাতে পেয়ে ভালো লাগলে রেখে দিন, আর ভালো না লাগলে কেবল ডেলিভারি চার্জ দিয়ে রিটার্ন করে দিন।' },
    { id: 'guarantee', icon: FaShieldHalved, title: '১০০% গ্যারান্টি', desc: 'মান নিয়ে কোনো আপোষ নেই। ডেলিভারির সময় টেস্ট করে নেয়ার সুযোগ।' },
    { id: 'pure', icon: FaFlaskVial, title: '১০০% খাঁটি ও কেমিক্যাল মুক্ত', desc: 'কোনো প্রিজার্ভেটিভ নেই, সম্পূর্ণ স্বাস্থ্যকর ও নিরাপদ। ঘ্রাণেই মন ভরে যায়।' },
];

export default function UspSection() {
    return (
        <section className="section usp-section" id="why-us">
            <div className="usp-bg-pattern"></div>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">💎 আমাদের প্রতিশ্রুতি</span>
                    <h2 className="section-title">আমাদের আচার কেন <span className="text-gradient">আলাদা</span></h2>
                    <p className="section-desc">আমরা কোণ কাটি না। আমরা আম কাটি — হাতে, রোদে, পুরোনো দিনের মতো।</p>
                </div>
                <div className="usp-grid">
                    {usps.map((u) => (
                        <div className="usp-card" key={u.id} id={`usp-${u.id}`}>
                            <div className="usp-icon-box">
                                <div className="usp-icon-ring"></div>
                                <u.icon />
                            </div>
                            <h3>{u.title}</h3>
                            <p>{u.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
