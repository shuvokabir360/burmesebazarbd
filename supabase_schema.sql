-- ═══════════════════════════════════════════════════════════════
-- BURMASE BAZAR BD — Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ═══════════════════════════════════════════════════════════════

-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    weight TEXT DEFAULT '250g',
    badge_text TEXT,
    badge_type TEXT DEFAULT 'bestseller',
    price NUMERIC(10,2) DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Combo Packages Table
CREATE TABLE IF NOT EXISTS combo_packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    subtitle TEXT,
    regular_price NUMERIC(10,2) NOT NULL,
    combo_price NUMERIC(10,2) NOT NULL,
    discount_percent INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Combo Items (junction table)
CREATE TABLE IF NOT EXISTS combo_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    combo_id UUID REFERENCES combo_packages(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE
);

-- 4. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reviewer_name TEXT NOT NULL,
    reviewer_location TEXT,
    rating NUMERIC(2,1) DEFAULT 5.0,
    review_text TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT true,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    district TEXT,
    quantity INTEGER DEFAULT 1,
    total_price NUMERIC(10,2),
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════
-- SEED DATA
-- ═══════════════════════════════════════════════════════════════

-- Default Products
INSERT INTO products (name, description, image_url, weight, badge_text, badge_type, price, sort_order) VALUES
('ঝাল আমের আচার', 'কাঁচা আম, লাল মরিচ আর সরিষার তেলে ধীরে ধীরে জারিত — প্রতিটি কামড়ে ফিরে আসবে শৈশবের স্মৃতি।', '/assets/images/mango-pickle.png', '২৫০ গ্রাম', '🔥 বেস্টসেলার', 'bestseller', 300, 1),
('রসুনের আচার', 'খোসা ছাড়ানো গোটা রসুন, ভাজা মশলার মিশ্রণে সরিষার তেলে ডুবানো — আসক্তিকর ঝাঁজ, অসাধারণ স্বাদ।', '/assets/images/garlic-pickle.png', '২০০ গ্রাম', '🧄 ঝাঁজালো', 'spicy', 300, 2),
('চালতার আচার', 'রোদে শুকানো চালতা, পাঁচফোড়ন আর কালোজিরার মশলায় মাখানো — দোকানে পাবেন না এমন বিরল স্বাদ।', '/assets/images/chalta-pickle.png', '২০০ গ্রাম', '✨ বিরল', 'rare', 300, 3),
('মিক্স সবজির আচার', 'গাজর, ফুলকপি, কাঁচা মরিচ আর কাঁচা পেঁপে — ১২ রকম হাতে বাটা মশলায় মাখানো রঙিন উৎসব।', '/assets/images/mixed-pickle.png', '২৫০ গ্রাম', '🏆 জনপ্রিয়', 'popular', 300, 4);

-- Default Combo Package
INSERT INTO combo_packages (name, subtitle, regular_price, combo_price, discount_percent, is_active) VALUES
('কম্বো প্যাকেজ', '৪টি প্রিমিয়াম আচারের বয়াম — একটি দারুণ দামে', 1200, 899, 25, true);

-- Default Reviews
INSERT INTO reviews (reviewer_name, reviewer_location, rating, review_text, is_verified, is_visible) VALUES
('ফাতেমা আক্তার', 'ঢাকা', 5.0, 'আমি অনেকদিন ধরে নানির রেসিপির মতো আচার খুঁজছিলাম — অবশেষে পেয়ে গেছি! আমের আচারটা অসাধারণ। পুরো পরিবার মুগ্ধ। আমরা তিনবার অর্ডার করেছি!', true, true),
('রশিদ আহমেদ', 'চট্টগ্রাম', 5.0, 'চালতার আচার খেয়ে মাথা নষ্ট! কোথাও পাইনি — দোকানে না, অনলাইনেও না। আর কোয়ালিটি? দাদির হাতের মতো! প্যাকেজিং একদম পারফেক্ট — একটুও লিক হয়নি।', true, true),
('নুসরাত ইসলাম', 'সিলেট', 4.5, 'বাবা-মায়ের জন্য গিফট হিসেবে অর্ডার করেছিলাম — তারা ফোন করে আনন্দে কেঁদে দিলেন! বললেন বাড়ির কথা মনে পড়ে গেছে। রসুনের আচারটা একদম আসক্তিকর। সেরা ৳৮৯৯ খরচ!', true, true);

-- Default Site Settings
INSERT INTO site_settings (key, value) VALUES
('phone', '+880 XXXX-XXXXXX'),
('whatsapp', '880XXXXXXXXXX'),
('email', 'info@burmasebazar.com'),
('facebook', '#'),
('instagram', '#'),
('youtube', '#'),
('address', 'ঢাকা, বাংলাদেশ');

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE combo_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE combo_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for landing page data
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read combos" ON combo_packages FOR SELECT USING (is_active = true);
CREATE POLICY "Public read combo_items" ON combo_items FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Public insert for orders (customers can place orders)
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) have full access
CREATE POLICY "Admin full access products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access combos" ON combo_packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access combo_items" ON combo_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
