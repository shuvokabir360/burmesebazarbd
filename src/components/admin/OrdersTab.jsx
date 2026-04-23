import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaEye, FaPlus } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const statusLabels = { 
    pending: 'অপেক্ষমান', 
    confirmed: 'নিশ্চিত', 
    shipped: 'পাঠানো হয়েছে', 
    delivered: 'ডেলিভারি সম্পন্ন', 
    cancelled: 'বাতিল',
    abandoned: 'অসম্পূর্ণ'
};

const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'abandoned'];

export default function OrdersTab() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('pending');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [newOrderForm, setNewOrderForm] = useState({ 
        customer_name: '', phone: '', address: '', district: '', total_price: 0, quantity: 1, notes: '', status: 'pending' 
    });

    const fetchData = async () => {
        // Fetch Orders
        let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (filter !== 'all') query = query.eq('status', filter);
        const { data } = await query;
        if (data) setOrders(data);

        // Fetch Products for selection
        const { data: pData } = await supabase.from('products').select('*');
        if (pData) setProducts(pData);
    };

    useEffect(() => {
        fetchData();

        const channel = supabase
            .channel('orders_tab_realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
                console.log('Real-time order change detected in Orders Tab!', payload);
                fetchData();
            })
            .subscribe((status) => {
                console.log('Orders Tab real-time status:', status);
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [filter]);

    const updateStatus = async (id, status) => {
        await supabase.from('orders').update({ status }).eq('id', id);
        fetchData();
        if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status });
    };

    const handleSaveEdit = async () => {
        if (!selectedOrder) return;
        setSaving(true);
        const { error } = await supabase
            .from('orders')
            .update({
                customer_name: selectedOrder.customer_name,
                phone: selectedOrder.phone,
                address: selectedOrder.address,
                district: selectedOrder.district,
                notes: selectedOrder.notes,
                quantity: selectedOrder.quantity,
                total_price: selectedOrder.total_price
            })
            .eq('id', selectedOrder.id);
        
        if (!error) {
            toast.success('অর্ডার আপডেট করা হয়েছে! ✅');
            fetchData();
            setSelectedOrder(null);
        } else {
            toast.error('আপডেট করতে সমস্যা হয়েছে!');
        }
        setSaving(false);
    };

    const handleCreateOrder = async () => {
        setSaving(true);
        const { error } = await supabase.from('orders').insert([newOrderForm]);
        if (!error) {
            toast.success('নতুন অর্ডার সফলভাবে যোগ হয়েছে! ✨');
            fetchData();
            setIsAdding(false);
            setNewOrderForm({ customer_name: '', phone: '', address: '', district: '', total_price: 0, quantity: 1, notes: '', status: 'pending' });
        } else {
            toast.error('অর্ডার যোগ করতে সমস্যা হয়েছে!');
        }
        setSaving(false);
    };

    const counts = {};
    statusOptions.forEach(s => counts[s] = orders.filter(o => o.status === s).length);

    const filteredOrders = (filter === 'all' ? orders : orders.filter(o => o.status === filter))
        .sort((a, b) => {
            if (a.status === 'pending' && b.status !== 'pending') return -1;
            if (a.status !== 'pending' && b.status === 'pending') return 1;
            return new Date(b.created_at) - new Date(a.created_at);
        });

    return (
        <div>
            <div className="admin-topbar">
                <h1>🛒 অর্ডারসমূহ</h1>
                <div className="flex gap-4">
                    <button className="add-btn" onClick={() => setIsAdding(true)}><FaPlus /> নতুন অর্ডার</button>
                    <div className="text-sm font-medium text-gray-400 self-center">ম্যানেজমেন্ট</div>
                </div>
            </div>

            {/* Status Tabs Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 p-1 bg-gray-100/50 rounded-2xl w-fit">
                <button 
                    onClick={() => setFilter('all')}
                    className={`status-tab-btn ${filter === 'all' ? 'active' : ''}`}
                    style={{ borderRadius: '14px' }}
                >
                    সব ({orders.length})
                </button>
                {statusOptions.map(s => (
                    <button 
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`status-tab-btn ${filter === s ? 'active' : ''} status-${s}`}
                        style={{ borderRadius: '14px' }}
                    >
                        {statusLabels[s]} ({counts[s] || 0})
                    </button>
                ))}
            </div>

            <div className="admin-panel shadow-xl rounded-3xl border-none overflow-hidden">
                <div className="panel-header bg-white border-b p-6">
                    <h2 className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full status-bg-${filter}`}></span>
                        {filter === 'all' ? 'সকল অর্ডার' : statusLabels[filter]}
                        <span className="text-xs font-bold text-gray-300">({filteredOrders.length})</span>
                    </h2>
                </div>
                <div className="panel-body">
                    {filteredOrders.length === 0 ? (
                        <div className="empty-state p-20 opacity-50">
                            <p>এই ক্যাটাগরিতে কোনো অর্ডার পাওয়া যায়নি।</p>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>তারিখ</th><th>খরিদ্দার</th><th>লোকেশন</th><th>পরিমাণ</th><th>মোট মূল্য</th><th>অবস্থা</th><th>একশন</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(o => (
                                    <tr key={o.id}>
                                        <td data-label="তারিখ" className="text-highlight-date">{new Date(o.created_at).toLocaleDateString('bn-BD')}</td>
                                        <td data-label="খরিদ্দার">
                                            <div className="text-highlight-name">{o.customer_name}</div>
                                            <div className="text-highlight-phone">{o.phone}</div>
                                        </td>
                                        <td data-label="লোকেশন">
                                            <div className="text-[10px] font-bold text-gray-500">{o.district || '-'}</div>
                                        </td>
                                        <td data-label="পরিমাণ"><span className="bg-gray-700/40 text-gray-300 px-2 py-0.5 rounded text-[10px] font-bold">{o.quantity} পিস</span></td>
                                        <td data-label="মোট মূল্য"><strong className="text-highlight-price">৳{o.total_price}</strong></td>
                                        <td data-label="অবস্থা">
                                            <select
                                                className={`status-select status-${o.status}`}
                                                value={o.status}
                                                onChange={(e) => updateStatus(o.id, e.target.value)}
                                            >
                                                {statusOptions.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
                                            </select>
                                        </td>
                                        <td data-label="একশন">
                                            <button className="action-btn-circle" onClick={() => setSelectedOrder(o)}><FaEye /></button>
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
                    <div className="modal-card wide shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
                            <h2 className="text-xl font-black">✏️ অর্ডার সম্পাদনা (এডিট)</h2>
                            <button className="text-sm font-bold text-gray-400 hover:text-red-500" onClick={() => setSelectedOrder(null)}>বন্ধ করুন</button>
                        </div>
                        <div className="p-8 modal-form">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="form-group">
                                        <label>খরিদ্দারের নাম</label>
                                        <input 
                                            className="form-input" 
                                            value={selectedOrder.customer_name} 
                                            onChange={e => setSelectedOrder({...selectedOrder, customer_name: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>ফোন নম্বর</label>
                                        <div className="relative">
                                            <input 
                                                className={`form-input !pr-10 ${selectedOrder.phone.length === 11 ? 'border-green-500 bg-green-50/10' : selectedOrder.phone.length > 0 ? 'border-red-400' : ''}`} 
                                                value={selectedOrder.phone} 
                                                onChange={e => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                                                    setSelectedOrder({...selectedOrder, phone: val});
                                                }} 
                                                placeholder="017XXXXXXXX"
                                            />
                                            {selectedOrder.phone.length === 11 && (
                                                <FaCircleCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-xl animate-bounce-short" />
                                            )}
                                        </div>
                                        {selectedOrder.phone.length > 0 && selectedOrder.phone.length < 11 && (
                                            <span className="text-[10px] text-red-400 font-bold mt-1 block">⚠️ ১১ ডিজিট হতে হবে (বাকি আছে {11 - selectedOrder.phone.length} টি)</span>
                                        )}
                                        {selectedOrder.phone.length === 11 && (
                                            <span className="text-[10px] text-green-500 font-bold mt-1 block">✅ নম্বরটি সঠিক আছে</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>পুরো ঠিকানা</label>
                                        <textarea 
                                            style={{ minHeight: 80 }}
                                            className="form-input" 
                                            value={selectedOrder.address} 
                                            onChange={e => setSelectedOrder({...selectedOrder, address: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group">
                                            <label>পরিমাণ</label>
                                            <input 
                                                className="form-input" 
                                                type="number"
                                                value={selectedOrder.quantity} 
                                                onChange={e => setSelectedOrder({...selectedOrder, quantity: parseInt(e.target.value) || 0})}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>মোট মূল্য (৳)</label>
                                            <input 
                                                className="form-input font-bold text-red-600" 
                                                type="number"
                                                value={selectedOrder.total_price} 
                                                onChange={e => setSelectedOrder({...selectedOrder, total_price: parseInt(e.target.value) || 0})}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>স্ট্যাটাস</label>
                                        <select
                                            className={`form-input status-select status-${selectedOrder.status}`}
                                            value={selectedOrder.status}
                                            onChange={(e) => setSelectedOrder({...selectedOrder, status: e.target.value})}
                                        >
                                            {statusOptions.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>অর্ডার নোট</label>
                                        <textarea 
                                            className="form-input bg-yellow-50/10" 
                                            value={selectedOrder.notes || ''} 
                                            onChange={e => setSelectedOrder({...selectedOrder, notes: e.target.value})}
                                            placeholder="কোনো বিশেষ তথ্য থাকলে লিখুন..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                            <button className="px-6 py-2 bg-white border border-gray-300 rounded-xl font-bold text-sm text-gray-500" onClick={() => setSelectedOrder(null)}>বাতিল</button>
                            <button 
                                className="px-8 py-2 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
                                onClick={handleSaveEdit}
                                disabled={saving}
                            >
                                {saving ? 'আপডেট হচ্ছে...' : 'পরিবর্তন সেভ করুন'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Adding New Order */}
            {isAdding && (
                <div className="modal-overlay" onClick={() => setIsAdding(false)}>
                    <div className="modal-card wide shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
                            <h2 className="text-xl font-black">➕ নতুন কাস্টম অর্ডার</h2>
                            <button className="text-sm font-bold text-gray-400" onClick={() => setIsAdding(false)}>বন্ধ করুন</button>
                        </div>
                        <div className="p-8 modal-form">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="form-group">
                                        <label>খরিদ্দারের নাম</label>
                                        <input className="form-input" value={newOrderForm.customer_name} onChange={e => setNewOrderForm({...newOrderForm, customer_name: e.target.value})} placeholder="নাম লিখুন" />
                                    </div>
                                    <div className="form-group">
                                        <label>ফোন নম্বর</label>
                                        <div className="relative">
                                            <input 
                                                className={`form-input !pr-10 ${newOrderForm.phone.length === 11 ? 'border-green-500 bg-green-50/10' : newOrderForm.phone.length > 0 ? 'border-red-400' : ''}`} 
                                                value={newOrderForm.phone} 
                                                onChange={e => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                                                    setNewOrderForm({...newOrderForm, phone: val});
                                                }} 
                                                placeholder="017XXXXXXXX" 
                                            />
                                            {newOrderForm.phone.length === 11 && (
                                                <FaCircleCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-xl animate-bounce-short" />
                                            )}
                                        </div>
                                        {newOrderForm.phone.length > 0 && newOrderForm.phone.length < 11 && (
                                            <span className="text-[10px] text-red-400 font-bold mt-1 block">⚠️ ১১ ডিজিট হতে হবে (বাকি আছে {11 - newOrderForm.phone.length} টি)</span>
                                        )}
                                        {newOrderForm.phone.length === 11 && (
                                            <span className="text-[10px] text-green-500 font-bold mt-1 block">✅ নম্বরটি সঠিক আছে</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>পুরো ঠিকানা</label>
                                        <textarea className="form-input" value={newOrderForm.address} onChange={e => setNewOrderForm({...newOrderForm, address: e.target.value})} placeholder="গ্রাম, থানা, জেলা..." />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="form-group">
                                        <label>পণ্য তালিকা (নোট)</label>
                                        <textarea className="form-input bg-blue-50/10" value={newOrderForm.notes} onChange={e => setNewOrderForm({...newOrderForm, notes: e.target.value})} placeholder="কোন পণ্য কতগুলো (যেমন: ৫টি আমের আচার)" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group">
                                            <label>মোট পরিমাণ</label>
                                            <input type="number" className="form-input" value={newOrderForm.quantity} onChange={e => setNewOrderForm({...newOrderForm, quantity: parseInt(e.target.value) || 0})} />
                                        </div>
                                        <div className="form-group">
                                            <label>মোট মূল্য (৳)</label>
                                            <input type="number" className="form-input font-bold" value={newOrderForm.total_price} onChange={e => setNewOrderForm({...newOrderForm, total_price: parseInt(e.target.value) || 0})} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>অর্ডার স্ট্যাটাস</label>
                                        <select className="form-input" value={newOrderForm.status} onChange={e => setNewOrderForm({...newOrderForm, status: e.target.value})}>
                                            {statusOptions.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                            <button className="px-6 py-2 bg-white border border-gray-300 rounded-xl" onClick={() => setIsAdding(false)}>বাতিল</button>
                            <button 
                                className="px-8 py-2 bg-red-600 text-white rounded-xl font-black shadow-lg shadow-red-200 hover:bg-red-700"
                                onClick={handleCreateOrder}
                                disabled={saving}
                            >
                                {saving ? 'সেভ হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
