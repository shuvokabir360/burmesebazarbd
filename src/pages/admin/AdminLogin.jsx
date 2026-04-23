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
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="admin-login-page">
            {/* Animated background decorations */}
            <div className="login-bg-decor">
                <div className="login-orb login-orb-1"></div>
                <div className="login-orb login-orb-2"></div>
                <div className="login-orb login-orb-3"></div>
                <div className="login-grid-pattern"></div>
            </div>

            <div className="login-container">
                {/* Left: Branding Panel */}
                <div className="login-brand-panel">
                    <div className="login-brand-content">
                        <div className="login-brand-badge">
                            <span>🫙</span>
                        </div>
                        <h2 className="login-brand-title">বার্মিজ বাজার বিডি</h2>
                        <p className="login-brand-subtitle">আচারের দেশ, স্বাদের মেশ</p>
                        <div className="login-brand-features">
                            <div className="login-feature-item">
                                <div className="login-feature-icon">📊</div>
                                <span>রিয়েল-টাইম ড্যাশবোর্ড</span>
                            </div>
                            <div className="login-feature-item">
                                <div className="login-feature-icon">📦</div>
                                <span>অর্ডার ম্যানেজমেন্ট</span>
                            </div>
                            <div className="login-feature-item">
                                <div className="login-feature-icon">🛍️</div>
                                <span>প্রোডাক্ট কন্ট্রোল</span>
                            </div>
                        </div>
                    </div>
                    <div className="login-brand-footer">
                        <p>© ২০২৬ বার্মিজ বাজার বিডি</p>
                    </div>
                </div>

                {/* Right: Login Form */}
                <div className="login-form-panel">
                    <div className="login-form-inner">
                        <div className="login-form-header">
                            <div className="login-welcome-badge">অ্যাডমিন এক্সেস</div>
                            <h1 className="login-form-title">স্বাগতম! 👋</h1>
                            <p className="login-form-desc">আপনার অ্যাডমিন প্যানেলে লগইন করুন</p>
                        </div>

                        <form className="login-premium-form" onSubmit={handleSubmit}>
                            {error && (
                                <div className="login-error-alert">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="login-field">
                                <label htmlFor="admin-email">ইমেইল অ্যাড্রেস</label>
                                <div className="login-input-wrap">
                                    <svg className="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                    </svg>
                                    <input
                                        id="admin-email"
                                        type="email"
                                        placeholder="admin@burmesebazar.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="login-field">
                                <label htmlFor="admin-password">পাসওয়ার্ড</label>
                                <div className="login-input-wrap">
                                    <svg className="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                    <input
                                        id="admin-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="login-toggle-pw"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                                <line x1="1" y1="1" x2="23" y2="23"/>
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                <circle cx="12" cy="12" r="3"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="login-submit-btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="login-spinner"></span>
                                        <span>লগইন হচ্ছে...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>লগইন করুন</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="login-form-footer">
                            <Link to="/" className="login-back-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                                </svg>
                                মূল পেজে ফিরে যান
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
