import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa6';

export default function ProductsTab() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', description: '', image_url: '', weight: '', badge_text: '', badge_type: 'bestseller', price: 0, sort_order: 0 });

    const fetchProducts = async () => {
        const { data } = await supabase.from('products').select('*').order('sort_order');
        if (data) setProducts(data);
    };

    useEffect(() => { fetchProducts(); }, []);

    const openAdd = () => {
        setEditing(null);
        setForm({ name: '', description: '', image_url: '', weight: '', badge_text: '', badge_type: 'bestseller', price: 0, sort_order: products.length + 1 });
        setShowModal(true);
    };

    const openEdit = (p) => {
        setEditing(p);
        setForm({ name: p.name, description: p.description || '', image_url: p.image_url || '', weight: p.weight || '', badge_text: p.badge_text || '', badge_type: p.badge_type || 'bestseller', price: p.price || 0, sort_order: p.sort_order || 0 });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (editing) {
            await supabase.from('products').update(form).eq('id', editing.id);
        } else {
            await supabase.from('products').insert([{ ...form, is_active: true }]);
        }
        setShowModal(false);
        fetchProducts();
    };

    const handleDelete = async (id) => {
        if (!confirm('এই পণ্যটি মুছে ফেলতে চান?')) return;
        await supabase.from('products').delete().eq('id', id);
        fetchProducts();
    };

    const badgeTypes = ['bestseller', 'spicy', 'rare', 'popular'];

    return (
        <div>
            <div className="admin-topbar">
                <h1>📦 পণ্যসমূহ</h1>
                <button className="add-btn" onClick={openAdd}><FaPlus /> নতুন পণ্য যোগ করুন</button>
            </div>

            <div className="admin-panel">
                <div className="panel-body">
                    {products.length === 0 ? (
                        <div className="empty-state"><p>কোনো পণ্য পাওয়া যায়নি। নতুন পণ্য যোগ করুন।</p></div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ছবি</th><th>নাম</th><th>ওজন</th><th>দাম</th><th>ব্যাজ</th><th>ক্রম</th><th>একশন</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.image_url && <img src={p.image_url} className="product-img" alt={p.name} />}</td>
                                        <td><strong>{p.name}</strong></td>
                                        <td>{p.weight}</td>
                                        <td>৳{p.price}</td>
                                        <td><span className={`status-badge ${p.badge_type}`}>{p.badge_text}</span></td>
                                        <td>{p.sort_order}</td>
                                        <td>
                                            <div className="action-group">
                                                <button className="action-btn" onClick={() => openEdit(p)}><FaPen /></button>
                                                <button className="action-btn danger" onClick={() => handleDelete(p.id)}><FaTrash /></button>
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
                        <h2>{editing ? '✏️ পণ্য সম্পাদনা' : '➕ নতুন পণ্য'}</h2>
                        <div className="modal-form">
                            <div className="form-group">
                                <label>পণ্যের নাম</label>
                                <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="যেমন: ঝাল আমের আচার" />
                            </div>
                            <div className="form-group">
                                <label>বিবরণ</label>
                                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="পণ্যের বিবরণ লিখুন..." />
                            </div>
                            <div className="form-group">
                                <label>ছবির URL</label>
                                <input className="form-input" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="/assets/images/pickle.png" />
                            </div>
                            <div className="form-group">
                                <label>ওজন</label>
                                <input className="form-input" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} placeholder="২৫০ গ্রাম" />
                            </div>
                            <div className="form-group">
                                <label>দাম (৳)</label>
                                <input className="form-input" type="number" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value) || 0})} />
                            </div>
                            <div className="form-group">
                                <label>ব্যাজ টেক্সট</label>
                                <input className="form-input" value={form.badge_text} onChange={e => setForm({...form, badge_text: e.target.value})} placeholder="🔥 বেস্টসেলার" />
                            </div>
                            <div className="form-group">
                                <label>ব্যাজ টাইপ</label>
                                <select value={form.badge_type} onChange={e => setForm({...form, badge_type: e.target.value})}>
                                    {badgeTypes.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>সাজানোর ক্রম</label>
                                <input className="form-input" type="number" value={form.sort_order} onChange={e => setForm({...form, sort_order: parseInt(e.target.value) || 0})} />
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
