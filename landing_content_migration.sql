-- ═══════════════════════════════════════════════════════════════
-- LANDING PAGE CONTENT TABLE
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS landing_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE landing_content ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public read landing_content" ON landing_content FOR SELECT USING (true);

-- Admin full access
CREATE POLICY "Admin full access landing_content" ON landing_content FOR ALL USING (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════════════
-- SEED DEFAULT CONTENT
-- ═══════════════════════════════════════════════════════════════

INSERT INTO landing_content (key, value) VALUES
-- Hero Section
('hero_headline', 'মায়ের হাতের আসল স্বাদ —'),
('hero_headline_highlight', 'সেরা আচার।'),
('hero_subtitle', 'প্রতিদিনের পুষ্টি ও শক্তির জন্য সরাসরি গ্রাম থেকে তৈরি ১০০% ফ্রেশ ও কেমিক্যালমুক্ত আচার।'),
('hero_badge', '✨ ১০০% কেমিক্যালমুক্ত'),
('hero_cta_text', 'অর্ডার করতে চাই 🔥'),

-- Images (comma-separated URLs)
('hero_images', '/assets/images/hero-pickles.png,/assets/images/mango-pickle.png,/assets/images/chalta-pickle.png,/assets/images/mixed-pickle.png,/assets/images/garlic-pickle.png'),

-- Pricing
('regular_price', '1000'),
('offer_price', '799'),
('pricing_headline', 'এখনই অর্ডার করুন — অফার শেষ হচ্ছে!'),
('pricing_subtitle', 'ডেলিভারির সময় টেস্ট করে পছন্দ হলে পে করুন। কোনো ঝুঁকি নেই!'),

-- Timer (end date in ISO format — set to 3 days from now)
('timer_end_date', '2026-04-27T00:00:00Z'),

-- Combo Section
('combo_headline', 'সেরা কোয়ালিটির'),
('combo_headline_highlight', 'আচার কম্বো প্যাকেজ'),
('combo_items', 'আমের আচার|🥭|৩০০ গ্রাম,চালতার আচার|🍋|৩০০ গ্রাম,বড়ই আচার|🍒|৩০০ গ্রাম,মিক্সড আচার|🌶️|৩০০ গ্রাম,তেতুলের আচার|🟤|৩০০ গ্রাম,চিংড়ি বালাচাও|🦐|,স্ট্রবেরি ক্যান্ডি|🍬|ফ্রি!|free'),

-- Trust stats
('stat_reviews', '৪.৯/৫'),
('stat_deliveries', '১০০০+'),
('stat_pure', '১০০%'),

-- Footer
('footer_cta_headline', 'সেরা কোয়ালিটির আচার কম্বো প্যাকেজ'),
('footer_cta_subtitle', 'এখনই অর্ডার করতে নিচের বাটনে ক্লিক করুন')

ON CONFLICT (key) DO NOTHING;
