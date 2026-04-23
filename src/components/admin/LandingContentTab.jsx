import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaFloppyDisk, FaImage, FaPlus, FaTrash } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const textFields = [
    { key: 'hero_headline', label: '🏠 হিরো হেডলাইন', placeholder: 'মায়ের হাতের আসল স্বাদ —' },
    { key: 'hero_headline_highlight', label: '🔴 হিরো হাইলাইট টেক্সট', placeholder: 'সেরা আচার।' },
    { key: 'hero_subtitle', label: '📝 হিরো সাব-হেডলাইন', placeholder: 'প্রতিদিনের পুষ্টি ও শক্তির জন্য...', multiline: true },
    { key: 'hero_badge', label: '🏷️ হিরো ব্যাজ টেক্সট', placeholder: '✨ ১০০% কেমিক্যালমুক্ত' },
    { key: 'hero_cta_text', label: '🔘 অর্ডার বাটন টেক্সট', placeholder: 'অর্ডার করতে চাই 🔥' },
    { key: 'pricing_headline', label: '⏰ প্রাইসিং হেডলাইন', placeholder: 'এখনই অর্ডার করুন — অফার শেষ হচ্ছে!' },
    { key: 'pricing_subtitle', label: '📄 প্রাইসিং সাবটাইটেল', placeholder: 'ডেলিভারির সময় টেস্ট করে...', multiline: true },
    { key: 'combo_headline', label: '📦 কম্বো হেডলাইন', placeholder: 'সেরা কোয়ালিটির' },
    { key: 'combo_headline_highlight', label: '🔴 কম্বো হাইলাইট', placeholder: 'আচার কম্বো প্যাকেজ' },
    { key: 'footer_cta_headline', label: '🦶 ফুটার CTA হেডলাইন', placeholder: 'সেরা কোয়ালিটির আচার...' },
    { key: 'footer_cta_subtitle', label: '🦶 ফুটার CTA সাবটাইটেল', placeholder: 'এখনই অর্ডার করতে...' },
    { key: 'stat_reviews', label: '⭐ রিভিউ স্ট্যাট', placeholder: '৪.৯/৫' },
    { key: 'stat_deliveries', label: '🚚 ডেলিভারি স্ট্যাট', placeholder: '১০০০+' },
    { key: 'stat_pure', label: '✅ খাঁটি স্ট্যাট', placeholder: '১০০%' },
];

export default function LandingContentTab() {
    const [data, setData] = useState({});
    const [images, setImages] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetch() {
            const { data: rows } = await supabase.from('landing_content').select('*');
            if (rows) {
                const map = {};
                rows.forEach(r => { map[r.key] = r.value; });
                setData(map);
                // Parse images
                if (map.hero_images) {
                    setImages(map.hero_images.split(',').map(s => s.trim()).filter(Boolean));
                }
            }
        }
        fetch();
    }, []);

    const onChange = (key, value) => setData({ ...data, [key]: value });

    const addImage = () => setImages([...images, '']);
    const removeImage = idx => setImages(images.filter((_, i) => i !== idx));
    const updateImage = (idx, val) => {
        const copy = [...images];
        copy[idx] = val;
        setImages(copy);
    };

    const save = async () => {
        setSaving(true);
        try {
            // Merge images into data
            const allData = { ...data, hero_images: images.filter(Boolean).join(',') };

            for (const [key, value] of Object.entries(allData)) {
                const { error } = await supabase
                    .from('landing_content')
                    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
                if (error) throw error;
            }
            toast.success('ল্যান্ডিং পেজ কন্টেন্ট সেভ হয়েছে! ✅');
        } catch (e) {
            toast.error('সেভ করতে সমস্যা: ' + e.message);
        } finally {
            setSaving(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 14px',
        border: '1px solid #E5E7EB',
        borderRadius: '10px',
        fontSize: '0.95rem',
        fontFamily: "'Hind Siliguri', sans-serif",
        outline: 'none',
        transition: 'border-color 0.2s',
    };

    const labelStyle = {
        display: 'block',
        fontWeight: 600,
        fontSize: '0.9rem',
        marginBottom: 6,
        color: '#374151',
    };

    const cardStyle = {
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
    };

    return (
        <div>
            <div className="admin-topbar">
                <h1>🎨 ল্যান্ডিং পেজ কন্টেন্ট</h1>
                <button className="add-btn" onClick={save} disabled={saving}>
                    <FaFloppyDisk /> {saving ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
                </button>
            </div>

            {/* ═══ PRICING ═══ */}
            <div style={cardStyle}>
                <h3 style={{ marginBottom: 16, fontSize: '1.1rem' }}>💰 মূল্য ও টাইমার</h3>
                
                {/* ═══ LIVE PREVIEW FOR ANNOUNCEMENT ═══ */}
                <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>👀 অ্যানাউন্সমেন্ট বার প্রিভিউ (লাইভ)</label>
                    <div className="w-full py-2 overflow-hidden bg-[#e67e22]/10 rounded-xl border border-[#e67e22]/20">
                        <div 
                            className="flex whitespace-nowrap animate-marquee-fast"
                            style={{ animationDuration: `${data.announcement_speed || 15}s` }}
                        >
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center gap-10 px-4 text-[11px] md:text-xs font-bold text-[#d35400] tracking-wide">
                                    {(data.announcement_text || '🚚 সারা বাংলাদেশে ক্যাশ অন ডেলিভারি | ১০০% খাঁটি পণ্য').split('|').map((t, idx) => (
                                        <span key={idx}>{t.trim()}</span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: 6, marginBottom: 16 }}>
                        * টেক্সটগুলোকে <code>|</code> চিহ্ন দিয়ে আলাদা করুন। কম সেকেন্ড দিলে গতি বাড়বে, বেশি দিলে গতি কমবে।
                    </p>

                    <div className="landing-editor-grid">
                        <div className="landing-editor-span-2">
                             <label style={labelStyle}>📣 স্ক্রলিং টেক্সট এডিট করুন</label>
                             <textarea
                                style={{ ...inputStyle, minHeight: 60 }}
                                value={data.announcement_text || ''}
                                onChange={e => onChange('announcement_text', e.target.value)}
                                placeholder="🚚 ফ্রি ডেলিভারি | ১০০% খাঁটি পণ্য"
                             />
                        </div>
                        <div>
                             <label style={labelStyle}>⚡ স্ক্রলিং গতি (সেকেন্ড)</label>
                             <input
                                type="number"
                                style={inputStyle}
                                value={data.announcement_speed || ''}
                                onChange={e => onChange('announcement_speed', e.target.value)}
                                placeholder="15"
                             />
                        </div>
                    </div>
                </div>

                <div className="landing-editor-grid">
                    <div>
                        <label style={labelStyle}>রেগুলার মূল্য (৳)</label>
                        <input
                            type="number"
                            style={inputStyle}
                            value={data.regular_price || ''}
                            onChange={e => onChange('regular_price', e.target.value)}
                            placeholder="1000"
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>অফার মূল্য (৳)</label>
                        <input
                            type="number"
                            style={inputStyle}
                            value={data.offer_price || ''}
                            onChange={e => onChange('offer_price', e.target.value)}
                            placeholder="799"
                        />
                    </div>
                    <div className="landing-editor-span-2">
                        <label style={labelStyle}>⏰ অফার শেষ হওয়ার তারিখ ও সময়</label>
                        <input
                            type="datetime-local"
                            style={inputStyle}
                            value={data.timer_end_date ? data.timer_end_date.slice(0, 16) : ''}
                            onChange={e => onChange('timer_end_date', new Date(e.target.value).toISOString())}
                        />
                    </div>
                </div>
                {data.regular_price && data.offer_price && (
                    <div style={{ marginTop: 12, padding: '10px 16px', background: '#D1FAE5', borderRadius: 10, color: '#059669', fontWeight: 700, fontSize: '0.9rem' }}>
                        ছাড়: {Math.round((1 - Number(data.offer_price) / Number(data.regular_price)) * 100)}% — সাশ্রয় ৳{Number(data.regular_price) - Number(data.offer_price)}
                    </div>
                )}
            </div>

            {/* ═══ HERO IMAGES ═══ */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12 }}>
                    <h3 style={{ fontSize: '1.1rem' }}>🖼️ হিরো স্লাইডার ছবি ({images.length}টি)</h3>
                    <button
                        onClick={addImage}
                        style={{ background: '#B91C1C', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                        <FaPlus /> ছবি যোগ করুন
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {images.map((img, idx) => (
                        <div key={idx} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                            {img && (
                                <img
                                    src={img}
                                    alt={`Slide ${idx + 1}`}
                                    style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 10, border: '2px solid #E5E7EB' }}
                                    onError={e => { e.target.style.display = 'none'; }}
                                />
                            )}
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <FaImage style={{ color: '#9CA3AF', flexShrink: 0 }} />
                                <input
                                    style={{ ...inputStyle, flex: 1 }}
                                    value={img}
                                    onChange={e => updateImage(idx, e.target.value)}
                                    placeholder="/assets/images/your-image.png"
                                />
                            </div>
                            <button
                                onClick={() => removeImage(idx)}
                                style={{ background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 10, padding: '10px', cursor: 'pointer' }}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    {images.length === 0 && (
                        <p style={{ color: '#9CA3AF', textAlign: 'center', padding: 20 }}>
                            কোনো ছবি নেই। "ছবি যোগ করুন" বাটনে ক্লিক করুন।
                        </p>
                    )}
                </div>
            </div>

            {/* ═══ TEXT FIELDS ═══ */}
            <div style={cardStyle}>
                <h3 style={{ marginBottom: 16, fontSize: '1.1rem' }}>📝 টেক্সট কন্টেন্ট</h3>
                <div className="landing-editor-grid">
                    {textFields.map(f => (
                        <div key={f.key} className={f.multiline ? 'landing-editor-span-2' : ''}>
                            <label style={labelStyle}>{f.label}</label>
                            {f.multiline ? (
                                <textarea
                                    style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
                                    value={data[f.key] || ''}
                                    onChange={e => onChange(f.key, e.target.value)}
                                    placeholder={f.placeholder}
                                />
                            ) : (
                                <input
                                    style={inputStyle}
                                    value={data[f.key] || ''}
                                    onChange={e => onChange(f.key, e.target.value)}
                                    placeholder={f.placeholder}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ COMBO ITEMS ═══ */}
            <div style={cardStyle}>
                <h3 style={{ marginBottom: 8, fontSize: '1.1rem' }}>📦 কম্বো আইটেম</h3>
                <p style={{ fontSize: '0.8rem', color: '#9CA3AF', marginBottom: 16 }}>
                    ফরম্যাট: <code>নাম|ইমোজি|ওজন</code> — কমা দিয়ে আলাদা করুন। ফ্রি আইটেমে শেষে <code>|free</code> যোগ করুন।
                </p>
                <textarea
                    style={{ ...inputStyle, minHeight: 120, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.85rem' }}
                    value={data.combo_items || ''}
                    onChange={e => onChange('combo_items', e.target.value)}
                    placeholder="আমের আচার|🥭|৩০০ গ্রাম,চালতার আচার|🍋|৩০০ গ্রাম"
                />
            </div>
        </div>
    );
}
