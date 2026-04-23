import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaFloppyDisk } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const settingsFields = [
    { key: 'phone', label: '📞 ফোন নম্বর', placeholder: '+880 1XXX-XXXXXX' },
    { key: 'whatsapp', label: '💬 WhatsApp নম্বর', placeholder: '8801XXXXXXXXX' },
    { key: 'email', label: '📧 ইমেইল', placeholder: 'info@example.com' },
    { key: 'facebook', label: '📘 Facebook লিংক', placeholder: 'https://facebook.com/...' },
    { key: 'instagram', label: '📸 Instagram লিংক', placeholder: 'https://instagram.com/...' },
    { key: 'youtube', label: '📺 YouTube লিংক', placeholder: 'https://youtube.com/...' },
    { key: 'address', label: '📍 ঠিকানা', placeholder: 'ঢাকা, বাংলাদেশ' },
];

export default function SettingsTab() {
    const [settings, setSettings] = useState({});
    const [comboForm, setComboForm] = useState({ name: '', subtitle: '', regular_price: 0, combo_price: 0, discount_percent: 0 });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchAll() {
            // Site settings
            const { data: settingsData } = await supabase.from('site_settings').select('*');
            if (settingsData) {
                const map = {};
                settingsData.forEach(s => map[s.key] = s.value);
                setSettings(map);
            }
            // Combo package
            const { data: comboData } = await supabase.from('combo_packages').select('*').eq('is_active', true).limit(1).single();
            if (comboData) setComboForm(comboData);
        }
        fetchAll();
    }, []);

    const handleSettingChange = (key, value) => {
        setSettings({ ...settings, [key]: value });
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            // Upsert each setting
            for (const field of settingsFields) {
                const value = settings[field.key] || '';
                const { error } = await supabase
                    .from('site_settings')
                    .upsert({ key: field.key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
                if (error) throw error;
            }

            // Update combo package
            if (comboForm.id) {
                const discount = Math.round((1 - comboForm.combo_price / comboForm.regular_price) * 100);
                await supabase.from('combo_packages')
                    .update({ ...comboForm, discount_percent: discount })
                    .eq('id', comboForm.id);
            }

            toast.success('সেটিংস সেভ হয়েছে! ✅');
        } catch (e) {
            toast.error('সেভ করতে সমস্যা হয়েছে: ' + e.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="admin-topbar">
                <h1>⚙️ সাইট সেটিংস</h1>
                <button className="add-btn" onClick={saveSettings} disabled={saving}>
                    <FaFloppyDisk /> {saving ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
                </button>
            </div>

            {/* Contact Settings */}
            <div className="admin-panel" style={{ marginBottom: 24 }}>
                <div className="panel-header"><h2>📇 যোগাযোগ ও সোশ্যাল মিডিয়া</h2></div>
                <div className="panel-body">
                    <div className="settings-grid">
                        {settingsFields.map(f => (
                            <div className="form-group" key={f.key}>
                                <label>{f.label}</label>
                                <input
                                    className="form-input"
                                    value={settings[f.key] || ''}
                                    onChange={(e) => handleSettingChange(f.key, e.target.value)}
                                    placeholder={f.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Combo Pricing */}
            <div className="admin-panel">
                <div className="panel-header"><h2>💰 কম্বো প্যাকেজ মূল্য</h2></div>
                <div className="panel-body">
                    <div className="settings-grid">
                        <div className="form-group">
                            <label>প্যাকেজের নাম</label>
                            <input className="form-input" value={comboForm.name} onChange={e => setComboForm({...comboForm, name: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>সাবটাইটেল</label>
                            <input className="form-input" value={comboForm.subtitle || ''} onChange={e => setComboForm({...comboForm, subtitle: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>আলাদা মূল্য (৳)</label>
                            <input className="form-input" type="number" value={comboForm.regular_price} onChange={e => setComboForm({...comboForm, regular_price: parseFloat(e.target.value) || 0})} />
                        </div>
                        <div className="form-group">
                            <label>কম্বো মূল্য (৳)</label>
                            <input className="form-input" type="number" value={comboForm.combo_price} onChange={e => setComboForm({...comboForm, combo_price: parseFloat(e.target.value) || 0})} />
                        </div>
                    </div>
                    {comboForm.regular_price > 0 && comboForm.combo_price > 0 && (
                        <div className="savings-badge" style={{ marginTop: 16 }}>
                            ছাড়: {Math.round((1 - comboForm.combo_price / comboForm.regular_price) * 100)}% — সাশ্রয় ৳{comboForm.regular_price - comboForm.combo_price}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
