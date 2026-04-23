import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaWeightHanging } from 'react-icons/fa6';

// Fallback data when Supabase isn't connected
const fallbackProducts = [
    { id: '1', name: 'আমের আচার', description: 'টক-ঝাল-মিষ্টির এক অনন্য মিশ্রণ। একদম ঘরের তৈরি খাঁটি স্বাদ।', image_url: '/assets/images/mango-pickle.png', weight: '৩০০ গ্রাম', badge_text: '🔥 বেস্টসেলার', badge_type: 'bestseller' },
    { id: '2', name: 'চালতার আচার', description: 'রোদে শুকানো চালতা, দুর্দান্ত স্বাদ।', image_url: '/assets/images/chalta-pickle.png', weight: '৩০০ গ্রাম', badge_text: '✨ সেরা স্বাদ', badge_type: 'popular' },
    { id: '3', name: 'বড়ই আচার', description: 'শৈশবের স্মৃতি ফিরিয়ে আনার মতো একটি টক-মিষ্টি বড়ই আচার।', image_url: '/assets/images/garlic-pickle.png', weight: '৩০০ গ্রাম', badge_text: '⭐ জনপ্রিয়', badge_type: 'spicy' },
    { id: '4', name: 'মিক্সড আচার', description: 'নানা রকম সবজি ও ফলের সংমিশ্রণে দারুণ স্বাদের আচার।', image_url: '/assets/images/mixed-pickle.png', weight: '৩০০ গ্রাম', badge_text: '🏆 প্রিমিয়াম', badge_type: 'rare' },
    { id: '5', name: 'তেতুলের আচার', description: 'জিভে জল আনা খাঁটি তেঁতুলের আচার।', image_url: '/assets/images/mango-pickle.png', weight: '৩০০ গ্রাম', badge_text: '', badge_type: 'normal' },
    { id: '6', name: 'চিংড়ি বালাচাও', description: 'মুচমুচে চিংড়ি বালাচাও, গরম ভাতের সাথে দারুণ।', image_url: '/assets/images/mixed-pickle.png', weight: '২০০ গ্রাম', badge_text: '🌶️ মুচমুচে', badge_type: 'spicy' },
    { id: '7', name: 'স্ট্রবেরি ক্যান্ডি', description: 'কম্বো പ্যাকের সাথে সবার জন্য একটি মজাদার ফ্রি ক্যান্ডি!', image_url: '/assets/images/placeholder.png', weight: '১ পিস', badge_text: '🎁 ফ্রি', badge_type: 'rare' },
];

export default function ComboSection() {
    const [products, setProducts] = useState(fallbackProducts);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('is_active', true)
                    .order('sort_order');
                if (!error && data && data.length > 0) setProducts(data);
            } catch (e) {
                // Use fallback data silently
            }
        }
        fetchProducts();
    }, []);

    return (
        <section className="section combo-section" id="combo">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">🫙 প্যাক অফার</span>
                    <h2 className="section-title">আমাদের <span className="text-gradient">সিগনেচার</span> আচার কম্বো</h2>
                    <p className="section-desc">৬টি সম্পূর্ণ আলাদা স্বাদ। একটি অপ্রতিরোধ্য প্যাকেজ। আপনার প্রতিদিনের খাবারের স্বাদ বহুগুণ বাড়িয়ে দিতে ১০০% ফ্রেশ ও স্বাস্থ্যকর আয়োজন।</p>
                </div>

                <div className="pickle-grid">
                    {products.map((p) => (
                        <div className="pickle-card" key={p.id} id={`pickle-${p.id}`}>
                            <div className="pickle-card-glow"></div>
                            <div className="pickle-img-box">
                                <img src={p.image_url} alt={p.name} loading="lazy" />
                                <span className={`pickle-badge ${p.badge_type}`}>{p.badge_text}</span>
                            </div>
                            <div className="pickle-info">
                                <h3>{p.name}</h3>
                                <p>{p.description}</p>
                                <div className="pickle-weight"><FaWeightHanging /> {p.weight} প্রতি বয়াম</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
