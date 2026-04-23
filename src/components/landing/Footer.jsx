import { FaBagShopping, FaTruck, FaRotateLeft, FaShieldHalved } from 'react-icons/fa6';
import { useOrderModal } from './OrderModal';

export default function Footer() {
    const { open } = useOrderModal();

    return (
        <footer>
            {/* Final CTA Strip */}
            <div className="py-20 text-center" style={{ background: 'var(--red)', color: 'white' }}>
                <div className="container max-w-2xl">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">সেরা কোয়ালিটির আচার কম্বো প্যাকেজ</h2>
                    <p className="opacity-80 mb-10">এখনই অর্ডার করতে নিচের বাটনে ক্লিক করুন</p>
                    <button onClick={open} className="btn-order-yellow btn-order text-xl">
                        <FaBagShopping /> এখনই অর্ডার করুন — ৳৭৯৯
                    </button>
                </div>
            </div>

            {/* Trust Policies */}
            <div className="py-10" style={{ background: 'var(--gray-50)' }}>
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
                        {[
                            { icon: <FaTruck />, title: 'ফ্রি ডেলিভারি', desc: 'সারাদেশে বিনামূল্যে' },
                            { icon: <FaRotateLeft />, title: 'ইজি রিটার্ন', desc: 'পছন্দ না হলে ফেরত' },
                            { icon: <FaShieldHalved />, title: '১০০% গ্যারান্টি', desc: 'মান নিশ্চিত' },
                        ].map((p, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="text-2xl" style={{ color: 'var(--red)' }}>{p.icon}</div>
                                <div className="font-bold text-sm" style={{ color: 'var(--gray-900)' }}>{p.title}</div>
                                <div className="text-xs" style={{ color: 'var(--gray-400)' }}>{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="py-6 text-center text-sm" style={{ background: 'var(--gray-900)', color: 'var(--gray-400)' }}>
                <div className="container">
                    © {new Date().getFullYear()} মায়ের হাতের আসল স্বাদ। সর্বস্বত্ব সংরক্ষিত।
                </div>
            </div>
        </footer>
    );
}
