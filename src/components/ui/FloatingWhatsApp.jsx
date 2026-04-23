import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { supabase } from '../../lib/supabase';

export default function FloatingWhatsApp() {
    const [visible, setVisible] = useState(false);
    const [whatsapp, setWhatsapp] = useState('880XXXXXXXXXX');

    useEffect(() => {
        async function fetchWA() {
            try {
                const { data } = await supabase.from('site_settings').select('value').eq('key', 'whatsapp').single();
                if (data) setWhatsapp(data.value);
            } catch (e) { /* fallback */ }
        }
        fetchWA();

        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <a
            href={`https://wa.me/${whatsapp}?text=হ্যালো!%20আমি%20আচার%20কম্বো%20প্যাকেজ%20অর্ডার%20করতে%20চাই।`}
            className="floating-whatsapp"
            id="floatingWhatsapp"
            target="_blank"
            rel="noopener"
            aria-label="WhatsApp-এ চ্যাট করুন"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.5)',
                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            <FaWhatsapp />
        </a>
    );
}
