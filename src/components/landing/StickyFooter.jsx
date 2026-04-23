import { useState, useEffect } from 'react';
import { FaBagShopping } from 'react-icons/fa6';
import { useOrderModal } from './OrderModal';

export default function StickyFooter() {
    const [show, setShow] = useState(false);
    const { open } = useOrderModal();

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 300);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[999] md:hidden p-4 pb-6"
            style={{ background: 'linear-gradient(to top, white 60%, transparent)' }}>
            <button onClick={open} className="btn-order w-full text-lg py-4">
                <FaBagShopping /> এখনই অর্ডার করুন
            </button>
        </div>
    );
}
