-- ═══════════════════════════════════════════════════════════════
-- BURMESE BAZAR BD — Database Update Script
-- ═══════════════════════════════════════════════════════════════

-- ১. আগের সব প্রোডাক্ট এবং কম্বো ডিলিট করুন (যাতে নতুন গুলা ক্লিন ভাবে অ্যাড হয়)
DELETE FROM combo_items;
DELETE FROM combo_packages;
DELETE FROM products;
DELETE FROM reviews;

-- ২. নতুন ন্যাচারাল প্রোডাক্টগুলো যোগ করুন
INSERT INTO products (name, description, image_url, weight, badge_text, badge_type, price, sort_order) VALUES
('আমের আচার', 'টক-ঝাল-মিষ্টির এক অনন্য মিশ্রণ। একদম ঘরের তৈরি খাঁটি স্বাদ।', '/assets/images/mango-pickle.png', '৩০০ গ্রাম', '🔥 বেস্টসেলার', 'bestseller', 150, 1),
('চালতার আচার', 'রোদে শুকানো চালতা, দুর্দান্ত স্বাদ।', '/assets/images/chalta-pickle.png', '৩০০ গ্রাম', '✨ সেরা স্বাদ', 'popular', 150, 2),
('বড়ই আচার', 'শৈশবের স্মৃতি ফিরিয়ে আনার মতো একটি টক-মিষ্টি বড়ই আচার।', '/assets/images/garlic-pickle.png', '৩০০ গ্রাম', '⭐ জনপ্রিয়', 'spicy', 150, 3),
('মিক্সড আচার', 'নানা রকম সবজি ও ফলের সংমিশ্রণে দারুণ স্বাদের আচার।', '/assets/images/mixed-pickle.png', '৩০০ গ্রাম', '🏆 প্রিমিয়াম', 'rare', 150, 4),
('তেতুলের আচার', 'জিভে জল আনা খাঁটি তেঁতুলের আচার।', '/assets/images/placeholder.png', '৩০০ গ্রাম', '', 'normal', 150, 5),
('চিংড়ি বালাচাও', 'মুচমুচে চিংড়ি বালাচাও, গরম ভাতের সাথে দারুণ।', '/assets/images/placeholder.png', '২০০ গ্রাম', '🌶️ মুচমুচে', 'spicy', 250, 6),
('স্ট্রবেরি ক্যান্ডি (ফ্রি)', 'কম্বো প্যাকের সাথে সবার জন্য একটি মজাদার ফ্রি ক্যান্ডি!', '/assets/images/placeholder.png', '১ পিস', '🎁 ফ্রি', 'rare', 0, 7);

-- ৩. নতুন কম্বো প্যাকেজ যোগ করুন
INSERT INTO combo_packages (name, subtitle, regular_price, combo_price, discount_percent, is_active) VALUES
('প্রিমিয়াম কম্বো প্যাকেজ', '৬টি প্রিমিয়াম আইটেমের সাথে থাকছে ১টি সম্পূর্ণ ফ্রি!', 1000, 799, 20, true);

-- ৪. নতুন কাস্টমার রিভিউ যোগ করুন
INSERT INTO reviews (reviewer_name, reviewer_location, rating, review_text, is_verified, is_visible) VALUES
('মাইনুল হাসান', 'ঢাকা', 5.0, 'মান আসলেই প্রিমিয়াম।', true, true),
('কামরুল হাসান শাওন', 'চট্টগ্রাম', 5.0, 'আচারগুলো তাজা আছে, স্বাদও অসাধারণ!', true, true),
('শানজাতুল হক সোনালী', 'সিলেট', 5.0, 'খুবই ভালো মানের।', true, true),
('তাজুল ইসলাম', 'কুমিল্লা', 5.0, 'কোয়ালিটি অনেক ভালো। পরিবারের সবাই খুব পছন্দ করেছে।', true, true);
