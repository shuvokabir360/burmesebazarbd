import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/admin.css';

export default function AdminLogin() {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signIn(email, password);
            navigate('/admin');
        } catch (err) {
            setError(err.message || 'লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login">
            <div className="login-card">
                <div className="login-header">
                    <span className="logo-icon">🫙</span>
                    <h1>অ্যাডমিন প্যানেল</h1>
                    <p>বার্মিজ বাজার বিডি ড্যাশবোর্ড</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    {error && <div className="login-error">{error}</div>}
                    <div className="form-group">
                        <label>ইমেইল</label>
                        <input type="email" className="form-input" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>পাসওয়ার্ড</label>
                        <input type="password" className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
                    </button>
                </form>
                <div className="login-back">
                    <Link to="/">← মূল পেজে ফিরে যান</Link>
                </div>
            </div>
        </div>
    );
}
