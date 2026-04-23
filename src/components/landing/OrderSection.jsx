import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaWhatsapp } from 'react-icons/fa6';
import { FaArrowRight, FaBoxOpen, FaFaceGrinHearts, FaMoneyBill1Wave, FaTruckFast, FaShieldHeart, FaBagShopping, FaPhone } from 'react-icons/fa6';

export default function OrderSection({ settings }) {
    const [siteSettings, setSiteSettings] = useState({});

    useEffect(() => {
        async function fetchSettings() {
            try {
                const { data, error } = await supabase.from('site_settings').select('*');
                if (!error && data) {
                    const map = {};
                    data.forEach(s => map[s.key] = s.value);
                    setSiteSettings(map);
                }
            } catch (e) { /* fallback */ }
        }
        fetchSettings();
    }, []);

    const phone = siteSettings.phone || '+880 XXXX-XXXXXX';
    const whatsapp = siteSettings.whatsapp || '880XXXXXXXXXX';

    return (
        <section className="section order-section" id="order">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">📦 সহজ অর্ডার</span>
                    <h2 className="section-title">কিভাবে <span className="text-gradient">পাবেন</span></h2>
                    <p className="section-desc">তিনটি সহজ ধাপে আপনার আচার পৌঁছে যাবে।</p>
                </div>

                <div className="steps-grid">
                    <div className="step-card" id="step-1">
                        <div className="step-number">১</div>
                        <div className="step-icon"><FaWhatsapp /></div>
                        <h3>অর্ডার করুন</h3>
                        <p>অর্ডার বাটনে ক্লিক করুন অথবা WhatsApp-এ নাম, ঠিকানা ও পরিমাণ জানান।</p>
                    </div>
                    <div className="step-connector"><FaArrowRight /></div>
                    <div className="step-card" id="step-2">
                        <div className="step-number">২</div>
                        <div className="step-icon"><FaBoxOpen /></div>
                        <h3>প্যাক ও শিপ</h3>
                        <p>আপনার আচার ফ্রেশ প্যাক করে লিক-প্রুফ বয়ামে ২৪ ঘণ্টার মধ্যে পাঠানো হবে।</p>
                    </div>
                    <div className="step-connector"><FaArrowRight /></div>
                    <div className="step-card" id="step-3">
                        <div className="step-number">৩</div>
                        <div className="step-icon"><FaFaceGrinHearts /></div>
                        <h3>গ্রহণ করুন ও পেমেন্ট</h3>
                        <p>ডেলিভারির সময় টেস্ট করে পছন্দ হলে পে করুন। কোনো ঝুঁকি নেই!</p>
                    </div>
                </div>

                <div className="trust-grid">
                    <div className="trust-card" id="trust-cod">
                        <FaMoneyBill1Wave />
                        <h4>ক্যাশ অন ডেলিভারি</h4>
                        <p>আচার হাতে পেয়ে টাকা দিন। অনলাইন পেমেন্টের ঝামেলা নেই।</p>
                    </div>
                    <div className="trust-card" id="trust-delivery">
                        <FaTruckFast />
                        <h4>সারাদেশে ডেলিভারি</h4>
                        <p>বাংলাদেশের ৬৪ জেলায় দ্রুত ও নিরাপদ ডেলিভারি।</p>
                    </div>
                    <div className="trust-card" id="trust-guarantee">
                        <FaShieldHeart />
                        <h4>সন্তুষ্টির গ্যারান্টি</h4>
                        <p>সন্তুষ্ট না হলে? আমরা ঠিক করে দেব — এটাই আমাদের প্রতিশ্রুতি।</p>
                    </div>
                    <div className="trust-card" id="trust-fresh">
                        <FaBagShopping />
                        <h4>ফ্রেশ প্যাকিং</h4>
                        <p>প্রতিটি অর্ডার ফ্রেশ প্যাক করা হয়। পুরানো স্টক না, বাসি না।</p>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="final-cta-block" id="finalCta">
                    <div className="final-cta-content">
                        <h2>আসল <span className="text-gradient">স্বাদ</span> নিতে প্রস্তুত?</h2>
                        <p>ডেলিভারির সময় টেস্ট করে পছন্দ হলে পে করুন। কোনো ঝুঁকি নেই!</p>
                        <div className="final-cta-buttons">
                            <a href={`https://wa.me/${whatsapp}?text=হ্যালো!%20আমি%20আচার%20কম্বো%20প্যাকেজ%20অর্ডার%20করতে%20চাই।`} className="btn btn-whatsapp btn-xl" id="ctaWhatsapp" target="_blank" rel="noopener">
                                <FaWhatsapp /> WhatsApp-এ অর্ডার করুন
                            </a>
                            <a href={`tel:${phone}`} className="btn btn-primary btn-xl" id="ctaPhone">
                                <FaPhone /> কল করে অর্ডার করুন
                            </a>
                        </div>
                        <p className="final-cta-price">কম্বো মূল্য: <strong>৳৭৯৯</strong> <span className="strikethrough">৳১০০০</span> — ডেলিভারি একদম ফ্রি!</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
