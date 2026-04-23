import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaCartShopping, FaStar, FaGear, FaRightFromBracket, FaHouse } from 'react-icons/fa6';
import ProductsTab from '../../components/admin/ProductsTab';
import OrdersTab from '../../components/admin/OrdersTab';
import ReviewsTab from '../../components/admin/ReviewsTab';
import SettingsTab from '../../components/admin/SettingsTab';
import '../../styles/admin.css';

const tabs = [
    { id: 'products', label: '📦 পণ্যসমূহ', icon: FaBoxOpen, component: ProductsTab },
    { id: 'orders', label: '🛒 অর্ডারসমূহ', icon: FaCartShopping, component: OrdersTab },
    { id: 'reviews', label: '⭐ রিভিউ', icon: FaStar, component: ReviewsTab },
    { id: 'settings', label: '⚙️ সেটিংস', icon: FaGear, component: SettingsTab },
];

export default function AdminDashboard() {
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');

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
            <main className="admin-main">
                <ActiveComponent />
            </main>
        </div>
    );
}
