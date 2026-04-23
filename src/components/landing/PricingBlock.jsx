import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaArrowDown, FaTags, FaCircleCheck, FaFire, FaClock } from 'react-icons/fa6';
import { useOrderModal } from '../../context/OrderModalContext';

export default function PricingBlock() {
    const [combo, setCombo] = useState({
        name: 'প্রিমিয়াম কম্বো প্যাকেজ',
        subtitle: '৬টি প্রিমিয়াম আইটেমের সাথে থাকছে ১টি সম্পূর্ণ ফ্রি!',
        regular_price: 1000,
        combo_price: 799,
        discount_percent: 25,
    });
    const { openModal } = useOrderModal();

    useEffect(() => {
        async function fetchCombo() {
            try {
                const { data, error } = await supabase
                    .from('combo_packages')
                    .select('*')
                    .eq('is_active', true)
                    .limit(1)
                    .single();
                if (!error && data) setCombo(data);
            } catch (e) { /* fallback */ }
        }
        fetchCombo();
    }, []);

    const savings = combo.regular_price - combo.combo_price;

    const scrollTo = (e, id) => {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="pricing-block" id="pricing">
            <div className="pricing-card">
                <div className="pricing-card-bg"></div>
                <div className="pricing-header">
                    <span className="pricing-tag">সীমিত সময়</span>
                    <h3>{combo.name}</h3>
                    <p className="pricing-subtitle">{combo.subtitle}</p>
                </div>
                <div className="pricing-body">
                    <div className="price-comparison">
                        <div className="price-regular">
                            <span className="price-label">আলাদা আলাদা কিনলে</span>
                            <span className="price-value strikethrough">৳ {combo.regular_price.toLocaleString()}</span>
                        </div>
                        <div className="price-divider">
                            <div className="arrow-down"><FaArrowDown /></div>
                        </div>
                        <div className="price-combo">
                            <span className="price-label">কম্বো মূল্য</span>
                            <span className="price-value highlight">৳ {combo.combo_price.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="savings-badge">
                        <FaTags /> আপনার সাশ্রয় <strong>৳ {savings}</strong> <span className="savings-percent">(ডেলিভারি একদম ফ্রি!)</span>
                    </div>
                    <ul className="pricing-perks">
                        <li><FaCircleCheck /> ৬টি প্রিমিয়াম আইটেম + ১টি ফ্রি</li>
                        <li><FaCircleCheck /> সারাদেশে ফ্রি ডেলিভারি</li>
                        <li><FaCircleCheck /> ডেলিভারির সময় টেস্ট করে নেয়ার সুযোগ</li>
                        <li><FaCircleCheck /> ১০০% খাঁটি ও কেমিক্যাল মুক্ত</li>
                    </ul>
                    <button className="btn btn-primary btn-xl pulse-glow" id="pricingCta" onClick={openModal} style={{ fontFamily: 'inherit', border: 'none', cursor: 'pointer', width: '100%' }}>
                        <FaFire /> এখনই অর্ডার করুন — অফার শেষ হচ্ছে!
                    </button>
                    <p className="pricing-note"><FaClock /> স্টক থাকা পর্যন্ত অফার। প্রতি মাসে সীমিত ব্যাচ।</p>
                </div>
            </div>
        </div>
    );
}
