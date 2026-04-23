import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaPhone, FaEnvelope, FaLocationDot } from 'react-icons/fa6';

export default function Footer() {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function fetchSettings() {
            try {
                const { data, error } = await supabase.from('site_settings').select('*');
                if (!error && data) {
                    const map = {};
                    data.forEach(s => map[s.key] = s.value);
                    setSettings(map);
                }
            } catch (e) { /* fallback */ }
        }
        fetchSettings();
    }, []);

    const scrollTo = (e, id) => {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer" id="footer">
            <div className="footer-wave">
                <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,40L60,44C120,48,240,56,360,58.7C480,61,600,59,720,50.7C840,43,960,27,1080,24C1200,21,1320,31,1380,36L1440,40L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" fill="var(--bg-primary)" />
                </svg>
            </div>
            <div className="container footer-content">
                <div className="footer-brand">
                    <a href="#" className="footer-logo">
                        <span className="logo-icon">🫙</span>
                        <span className="logo-text">বার্মিজ বাজার <span className="logo-accent">বিডি</span></span>
                    </a>
                    <p className="footer-tagline">খাঁটি স্বাদ। ভালোবাসায় তৈরি।<br />আমাদের রান্নাঘর থেকে আপনার টেবিলে।</p>
                    <div className="footer-socials">
                        <a href={settings.facebook || '#'} aria-label="Facebook" className="social-link" id="socialFb"><FaFacebookF /></a>
                        <a href={settings.instagram || '#'} aria-label="Instagram" className="social-link" id="socialIg"><FaInstagram /></a>
                        <a href={settings.youtube || '#'} aria-label="YouTube" className="social-link" id="socialYt"><FaYoutube /></a>
                        <a href={`https://wa.me/${settings.whatsapp || '880XXXXXXXXXX'}`} aria-label="WhatsApp" className="social-link whatsapp" id="socialWa"><FaWhatsapp /></a>
                    </div>
                </div>
                <div className="footer-links-group">
                    <h4>কুইক লিংক</h4>
                    <ul>
                        <li><a href="#combo" onClick={(e) => scrollTo(e, '#combo')}>কম্বো প্যাকেজ</a></li>
                        <li><a href="#why-us" onClick={(e) => scrollTo(e, '#why-us')}>কেন আমাদের বেছে নেবেন</a></li>
                        <li><a href="#reviews" onClick={(e) => scrollTo(e, '#reviews')}>কাস্টমার রিভিউ</a></li>
                        <li><a href="#order" onClick={(e) => scrollTo(e, '#order')}>এখনই অর্ডার করুন</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h4>যোগাযোগ</h4>
                    <ul>
                        <li><a href={`tel:${settings.phone || '+880XXXXXXXXXX'}`}><FaPhone /> {settings.phone || '+880 XXXX-XXXXXX'}</a></li>
                        <li><a href={`https://wa.me/${settings.whatsapp || '880XXXXXXXXXX'}`}><FaWhatsapp /> WhatsApp অর্ডার</a></li>
                        <li><a href={`mailto:${settings.email || 'info@burmasebazar.com'}`}><FaEnvelope /> {settings.email || 'info@burmasebazar.com'}</a></li>
                        <li><span><FaLocationDot /> {settings.address || 'ঢাকা, বাংলাদেশ'}</span></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; ২০২৬ বার্মিজ বাজার বিডি। সর্বস্বত্ব সংরক্ষিত। ❤️ আর মরিচ দিয়ে তৈরি।</p>
                </div>
            </div>
        </footer>
    );
}
