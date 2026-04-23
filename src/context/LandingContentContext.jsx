import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const LandingContentContext = createContext({});

// Default values — used when Supabase is unreachable or data is loading
const DEFAULTS = {
    hero_headline: 'মায়ের হাতের আসল স্বাদ —',
    hero_headline_highlight: 'সেরা আচার।',
    hero_subtitle: 'প্রতিদিনের পুষ্টি ও শক্তির জন্য সরাসরি গ্রাম থেকে তৈরি ১০০% ফ্রেশ ও কেমিক্যালমুক্ত আচার।',
    hero_badge: '✨ ১০০% কেমিক্যালমুক্ত',
    hero_cta_text: 'অর্ডার করতে চাই 🔥',
    hero_images: '/assets/images/hero-pickles.png,/assets/images/mango-pickle.png,/assets/images/chalta-pickle.png,/assets/images/mixed-pickle.png,/assets/images/garlic-pickle.png',
    regular_price: '1000',
    offer_price: '799',
    pricing_headline: 'এখনই অর্ডার করুন — অফার শেষ হচ্ছে!',
    pricing_subtitle: 'ডেলিভারির সময় টেস্ট করে পছন্দ হলে পে করুন। কোনো ঝুঁকি নেই!',
    timer_end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    combo_headline: 'সেরা কোয়ালিটির',
    combo_headline_highlight: 'আচার কম্বো প্যাকেজ',
    combo_items: 'আমের আচার|🥭|৩০০ গ্রাম,চালতার আচার|🍋|৩০০ গ্রাম,বড়ই আচার|🍒|৩০০ গ্রাম,মিক্সড আচার|🌶️|৩০০ গ্রাম,তেতুলের আচার|🟤|৩০০ গ্রাম,চিংড়ি বালাচাও|🦐|,স্ট্রবেরি ক্যান্ডি|🍬|ফ্রি!|free',
    stat_reviews: '৪.৯/৫',
    stat_deliveries: '১০০০+',
    stat_pure: '১০০%',
    footer_cta_headline: 'সেরা কোয়ালিটির আচার কম্বো প্যাকেজ',
    footer_cta_subtitle: 'এখনই অর্ডার করতে নিচের বাটনে ক্লিক করুন',
};

export function LandingContentProvider({ children }) {
    const [content, setContent] = useState(DEFAULTS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            try {
                const { data } = await supabase.from('landing_content').select('*');
                if (data && data.length > 0) {
                    const map = { ...DEFAULTS };
                    data.forEach(row => { map[row.key] = row.value; });
                    setContent(map);
                }
            } catch {
                // Silently fall back to defaults
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, []);

    return (
        <LandingContentContext.Provider value={{ content, loading }}>
            {children}
        </LandingContentContext.Provider>
    );
}

export function useLandingContent() {
    return useContext(LandingContentContext);
}

// Helper: parse combo items string into array
export function parseComboItems(str) {
    if (!str) return [];
    return str.split(',').map(item => {
        const parts = item.split('|');
        return {
            name: parts[0] || '',
            emoji: parts[1] || '',
            weight: parts[2] || '',
            free: parts[3] === 'free',
        };
    });
}

// Helper: parse hero images string into array
export function parseHeroImages(str) {
    if (!str) return [];
    return str.split(',').map((src, i) => ({ src: src.trim(), alt: `আচার ছবি ${i + 1}` }));
}
