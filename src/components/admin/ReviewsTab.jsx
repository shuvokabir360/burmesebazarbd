import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaPen, FaTrash, FaStar } from 'react-icons/fa6';

export default function ReviewsTab() {
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ reviewer_name: '', reviewer_location: '', rating: 5, review_text: '', is_verified: true, is_visible: true });

    const fetchReviews = async () => {
        const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
        if (data) setReviews(data);
    };

    useEffect(() => { fetchReviews(); }, []);

    const openAdd = () => {
        setEditing(null);
        setForm({ reviewer_name: '', reviewer_location: '', rating: 5, review_text: '', is_verified: true, is_visible: true });
        setShowModal(true);
    };

    const openEdit = (r) => {
        setEditing(r);
        setForm({ reviewer_name: r.reviewer_name, reviewer_location: r.reviewer_location || '', rating: r.rating, review_text: r.review_text, is_verified: r.is_verified, is_visible: r.is_visible });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (editing) {
            await supabase.from('reviews').update(form).eq('id', editing.id);
        } else {
            await supabase.from('reviews').insert([form]);
        }
        setShowModal(false);
        fetchReviews();
    };

    const handleDelete = async (id) => {
        if (!confirm('এই রিভিউটি মুছে ফেলতে চান?')) return;
        await supabase.from('reviews').delete().eq('id', id);
        fetchReviews();
    };

    const toggleVisibility = async (r) => {
        await supabase.from('reviews').update({ is_visible: !r.is_visible }).eq('id', r.id);
        fetchReviews();
    };

    return (
        <div>
            <div className="admin-topbar">
                <h1>⭐ কাস্টমার রিভিউ</h1>
                <button className="add-btn" onClick={openAdd}><FaPlus /> নতুন রিভিউ যোগ করুন</button>
            </div>

            <div className="admin-panel">
                <div className="panel-body">
                    {reviews.length === 0 ? (
                        <div className="empty-state"><p>কোনো রিভিউ পাওয়া যায়নি।</p></div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>নাম</th><th>লোকেশন</th><th>রেটিং</th><th>রিভিউ</th><th>দৃশ্যমান</th><th>একশন</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map(r => (
                                    <tr key={r.id} style={{ opacity: r.is_visible ? 1 : 0.5 }}>
                                        <td><strong>{r.reviewer_name}</strong></td>
                                        <td>{r.reviewer_location}</td>
                                        <td><FaStar style={{ color: 'var(--color-gold)' }} /> {r.rating}</td>
                                        <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.review_text}</td>
                                        <td>
                                            <label className="toggle-switch">
                                                <input type="checkbox" checked={r.is_visible} onChange={() => toggleVisibility(r)} />
                                                <span className="toggle-slider"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <div className="action-group">
                                                <button className="action-btn" onClick={() => openEdit(r)}><FaPen /></button>
                                                <button className="action-btn danger" onClick={() => handleDelete(r.id)}><FaTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <h2>{editing ? '✏️ রিভিউ সম্পাদনা' : '➕ নতুন রিভিউ'}</h2>
                        <div className="modal-form">
                            <div className="form-group">
                                <label>রিভিউয়ারের নাম</label>
                                <input className="form-input" value={form.reviewer_name} onChange={e => setForm({...form, reviewer_name: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>লোকেশন</label>
                                <input className="form-input" value={form.reviewer_location} onChange={e => setForm({...form, reviewer_location: e.target.value})} placeholder="ঢাকা" />
                            </div>
                            <div className="form-group">
                                <label>রেটিং (১-৫)</label>
                                <input className="form-input" type="number" min="1" max="5" step="0.5" value={form.rating} onChange={e => setForm({...form, rating: parseFloat(e.target.value)})} />
                            </div>
                            <div className="form-group">
                                <label>রিভিউ টেক্সট</label>
                                <textarea value={form.review_text} onChange={e => setForm({...form, review_text: e.target.value})} placeholder="রিভিউ লিখুন..." />
                            </div>
                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={() => setShowModal(false)}>বাতিল</button>
                                <button className="save-btn" onClick={handleSave}>সেভ করুন</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
