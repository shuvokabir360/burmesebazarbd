import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaEye } from 'react-icons/fa6';

const statusLabels = {
    pending: 'পেন্ডিং',
    confirmed: 'কনফার্মড',
    shipped: 'শিপড',
    delivered: 'ডেলিভারড',
    cancelled: 'বাতিল',
};

const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function OrdersTab() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (filter !== 'all') query = query.eq('status', filter);
        const { data } = await query;
        if (data) setOrders(data);
    };

    useEffect(() => { fetchOrders(); }, [filter]);

    const updateStatus = async (id, status) => {
        await supabase.from('orders').update({ status }).eq('id', id);
        fetchOrders();
        if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status });
    };

    const counts = {};
    statusOptions.forEach(s => counts[s] = orders.filter(o => o.status === s).length);

    return (
        <div>
            <div className="admin-topbar">
                <h1>🛒 অর্ডারসমূহ</h1>
            </div>

            <div className="stat-cards">
                {statusOptions.map(s => (
                    <div className="stat-card-admin" key={s} onClick={() => setFilter(s)} style={{ cursor: 'pointer', border: filter === s ? '1px solid var(--color-primary)' : undefined }}>
                        <div className="stat-val">{counts[s] || 0}</div>
                        <div className="stat-lbl">{statusLabels[s]}</div>
                    </div>
                ))}
            </div>

            <div className="admin-panel">
                <div className="panel-header">
                    <h2>
                        {filter === 'all' ? 'সকল অর্ডার' : statusLabels[filter]}
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 8 }}>({orders.length})</span>
                    </h2>
                    <button className="action-btn" onClick={() => setFilter('all')}>সব দেখুন</button>
                </div>
                <div className="panel-body">
                    {orders.length === 0 ? (
                        <div className="empty-state"><p>কোনো অর্ডার পাওয়া যায়নি।</p></div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>তারিখ</th><th>নাম</th><th>ফোন</th><th>জেলা</th><th>পরিমাণ</th><th>মোট</th><th>স্ট্যাটাস</th><th>একশন</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(o => (
                                    <tr key={o.id}>
                                        <td>{new Date(o.created_at).toLocaleDateString('bn-BD')}</td>
                                        <td><strong>{o.customer_name}</strong></td>
                                        <td>{o.phone}</td>
                                        <td>{o.district || '-'}</td>
                                        <td>{o.quantity}</td>
                                        <td>৳{o.total_price}</td>
                                        <td>
                                            <select
                                                className="form-input"
                                                value={o.status}
                                                onChange={(e) => updateStatus(o.id, e.target.value)}
                                                style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto' }}
                                            >
                                                {statusOptions.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
                                            </select>
                                        </td>
                                        <td>
                                            <button className="action-btn" onClick={() => setSelectedOrder(o)}><FaEye /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <h2>📋 অর্ডার বিবরণ</h2>
                        <div className="modal-form">
                            <div className="form-group">
                                <label>কাস্টমারের নাম</label>
                                <input className="form-input" value={selectedOrder.customer_name} readOnly />
                            </div>
                            <div className="form-group">
                                <label>ফোন</label>
                                <input className="form-input" value={selectedOrder.phone} readOnly />
                            </div>
                            <div className="form-group">
                                <label>ঠিকানা</label>
                                <textarea readOnly value={selectedOrder.address || 'N/A'} />
                            </div>
                            <div className="form-group">
                                <label>জেলা</label>
                                <input className="form-input" value={selectedOrder.district || 'N/A'} readOnly />
                            </div>
                            <div className="form-group">
                                <label>পরিমাণ</label>
                                <input className="form-input" value={selectedOrder.quantity} readOnly />
                            </div>
                            <div className="form-group">
                                <label>মোট মূল্য</label>
                                <input className="form-input" value={`৳${selectedOrder.total_price}`} readOnly />
                            </div>
                            {selectedOrder.notes && (
                                <div className="form-group">
                                    <label>নোট</label>
                                    <textarea readOnly value={selectedOrder.notes} />
                                </div>
                            )}
                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={() => setSelectedOrder(null)}>বন্ধ করুন</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
