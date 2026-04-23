import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaCartShopping, FaStar, FaGear, FaRightFromBracket, FaHouse, FaPaintbrush, FaGaugeHigh } from 'react-icons/fa6';
import DashboardTab from '../../components/admin/DashboardTab';
import LandingContentTab from '../../components/admin/LandingContentTab';
import ProductsTab from '../../components/admin/ProductsTab';
import OrdersTab from '../../components/admin/OrdersTab';
import ReviewsTab from '../../components/admin/ReviewsTab';
import SettingsTab from '../../components/admin/SettingsTab';
import '../../styles/admin.css';

const tabs = [
    { id: 'overview', label: '📊 ড্যাশবোর্ড', shortLabel: 'হোম', icon: FaGaugeHigh, component: DashboardTab },
    { id: 'landing', label: '🎨 ল্যান্ডিং পেজ', shortLabel: 'পেজ', icon: FaPaintbrush, component: LandingContentTab },
    { id: 'products', label: '📦 পণ্যসমূহ', shortLabel: 'পণ্য', icon: FaBoxOpen, component: ProductsTab },
    { id: 'orders', label: '🛒 অর্ডারসমূহ', shortLabel: 'অর্ডার', icon: FaCartShopping, component: OrdersTab },
    { id: 'reviews', label: '⭐ রিভিউ', shortLabel: 'রিভিউ', icon: FaStar, component: ReviewsTab },
    { id: 'settings', label: '⚙️ সেটিংস', shortLabel: 'সেটিংস', icon: FaGear, component: SettingsTab },
];

export default function AdminDashboard() {
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (!loading && !user) navigate('/admin/login');
    }, [user, loading, navigate]);

    if (loading) {
        return (
            <div className="admin-login">
                <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>লোড হচ্ছে...</div>
            </div>
        );
    }

    if (!user) return null;

    const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || ProductsTab;

    const handleSignOut = async () => {
        await signOut();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            {/* Desktop Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="logo">
                        <span className="logo-icon">🫙</span>
                        <span>বার্মিজ বাজার <span className="logo-accent">বিডি</span></span>
                    </div>
                    <p>অ্যাডমিন ড্যাশবোর্ড</p>
                </div>
                <nav className="sidebar-nav">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            className={`sidebar-link ${activeTab === t.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(t.id)}
                        >
                            <t.icon /> {t.label}
                        </button>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <a href="/" className="sidebar-link" target="_blank" rel="noopener">
                        <FaHouse /> সাইট দেখুন
                    </a>
                    <button className="sidebar-link" onClick={handleSignOut}>
                        <FaRightFromBracket /> লগআউট
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <ActiveComponent />
            </main>

            {/* Mobile Bottom Tab Bar */}
            <nav className="mobile-bottom-bar">
                {tabs.map(t => (
                    <button
                        key={t.id}
                        className={`bottom-tab ${activeTab === t.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(t.id)}
                    >
                        <t.icon className="bottom-tab-icon" />
                        <span className="bottom-tab-label">{t.shortLabel}</span>
                        {activeTab === t.id && <span className="bottom-tab-dot" />}
                    </button>
                ))}
            </nav>
        </div>
    );
}
