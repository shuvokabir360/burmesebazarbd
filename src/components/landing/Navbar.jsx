import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useOrderModal } from '../../context/OrderModalContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { openModal } = useOrderModal();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="container navbar-inner">
                <a href="#" className="nav-logo">
                    <span className="logo-icon">🫙</span>
                    <span className="logo-text">বার্মিজ বাজার <span className="logo-accent">বিডি</span></span>
                </a>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
                    <li><a href="#combo" onClick={(e) => handleLinkClick(e, '#combo')}>কম্বো প্যাক</a></li>
                    <li><a href="#why-us" onClick={(e) => handleLinkClick(e, '#why-us')}>কেন আমরা</a></li>
                    <li><a href="#reviews" onClick={(e) => handleLinkClick(e, '#reviews')}>রিভিউ</a></li>
                    <li><a href="#order" onClick={(e) => handleLinkClick(e, '#order')}>অর্ডার</a></li>
                </ul>
                <button className="nav-cta" onClick={openModal} style={{ fontFamily: 'inherit' }}>এখনই অর্ডার করুন</button>
                <button className="nav-toggle" id="navToggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>
        </nav>
    );
}
