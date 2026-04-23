import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../../lib/supabase';
import { FaBagShopping, FaTruck, FaLock, FaCircleCheck, FaXmark, FaCheck } from 'react-icons/fa6';

const ModalContext = createContext();

export function useOrderModal() {
    return useContext(ModalContext);
}

export function OrderModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <ModalContext.Provider value={{ isOpen, open, close }}>
            {children}
            {isOpen && <OrderModal onClose={close} />}
        </ModalContext.Provider>
    );
}

function OrderModal({ onClose }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', address: '' });

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const onKey = e => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (!/^01[3-9]\d{8}$/.test(form.phone)) return alert('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন');
        if (!form.name.trim() || !form.address.trim()) return alert('নাম ও ঠিকানা দিন');

        setLoading(true);
        try {
            const { error } = await supabase.from('orders').insert([{
                customer_name: form.name,
                phone: form.phone,
                address: form.address,
                quantity: 1,
                total_price: 799,
                status: 'pending',
            }]);
            if (error) throw error;
            setSuccess(true);
        } catch {
            alert('সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" style={{ animation: 'fadeIn 0.2s ease' }}></div>

            {/* Modal */}
            <div
                className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                style={{ background: 'white', animation: 'slideUp 0.3s ease' }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: '#F3F4F6', color: '#6B7280' }}
                >
                    <FaXmark className="text-lg" />
                </button>

                {success ? (
                    /* ═══ SUCCESS SCREEN ═══ */
                    <div className="p-10 md:p-14 text-center">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                            style={{ background: '#D1FAE5', animation: 'scaleIn 0.4s ease' }}
                        >
                            <FaCheck className="text-3xl" style={{ color: '#059669' }} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3" style={{ color: '#111827' }}>
                            ✅ অর্ডার সাবমিট হয়েছে!
                        </h3>
                        <p className="text-base mb-6" style={{ color: '#6B7280' }}>
                            আপনার অর্ডার কনফার্ম করার জন্য <strong style={{ color: '#B91C1C' }}>শীঘ্রই আমরা আপনাকে কল করব।</strong> দয়া করে ফোন কাছে রাখুন। 📞
                        </p>

                        <div className="p-4 rounded-2xl mb-8" style={{ background: '#FEF3C7' }}>
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <FaTruck style={{ color: '#D97706' }} />
                                <span className="font-bold text-sm" style={{ color: '#92400E' }}>ক্যাশ অন ডেলিভারি</span>
                            </div>
                            <p className="text-xs" style={{ color: '#92400E' }}>
                                পণ্য হাতে পেয়ে পে করুন — কোনো ঝুঁকি নেই!
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="btn-order w-full"
                        >
                            ঠিক আছে 👍
                        </button>
                    </div>
                ) : (
                    /* ═══ ORDER FORM ═══ */
                    <>
                        {/* Header */}
                        <div className="p-6 text-center" style={{ background: '#B91C1C', color: 'white' }}>
                            <div className="flex items-center justify-center gap-2 mb-1 text-xs font-semibold uppercase tracking-widest opacity-80">
                                <FaLock /> নিরাপদ চেকআউট
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold">অর্ডার কনফার্ম করুন</h3>
                        </div>

                        {/* Order summary mini */}
                        <div className="flex items-center gap-4 p-5 border-b" style={{ borderColor: '#E5E7EB' }}>
                            <img
                                src="/assets/images/premium_pickle_combo.png"
                                alt="Combo"
                                className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=200'; }}
                            />
                            <div className="flex-1">
                                <div className="font-bold text-sm" style={{ color: '#111827' }}>আচার কম্বো প্যাকেজ</div>
                                <div className="text-xs" style={{ color: '#9CA3AF' }}>৬ আইটেম + ১ ফ্রি</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs line-through" style={{ color: '#9CA3AF' }}>৳১০০০</div>
                                <div className="text-xl font-bold" style={{ color: '#B91C1C' }}>৳৭৯৯</div>
                            </div>
                        </div>

                        {/* Free delivery banner */}
                        <div className="flex items-center justify-center gap-2 py-3 text-sm font-semibold" style={{ background: '#D1FAE5', color: '#059669' }}>
                            <FaTruck /> ডেলিভারি চার্জ একদম ফ্রি!
                        </div>

                        {/* Form */}
                        <form onSubmit={onSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#9CA3AF' }}>
                                    আপনার নাম <FaCircleCheck className="inline text-green-500 ml-1" />
                                </label>
                                <input
                                    type="text" name="name" required
                                    placeholder="পুরো নাম"
                                    value={form.name} onChange={onChange}
                                    className="w-full border-2 rounded-xl px-4 py-3.5 outline-none transition-colors font-semibold text-sm"
                                    style={{ borderColor: '#E5E7EB' }}
                                    onFocus={e => e.target.style.borderColor = '#B91C1C'}
                                    onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#9CA3AF' }}>
                                    মোবাইল নাম্বার <FaCircleCheck className="inline text-green-500 ml-1" />
                                </label>
                                <input
                                    type="tel" name="phone" required
                                    placeholder="01XXXXXXXXX"
                                    value={form.phone} onChange={onChange}
                                    className="w-full border-2 rounded-xl px-4 py-3.5 outline-none transition-colors font-semibold text-sm"
                                    style={{ borderColor: '#E5E7EB' }}
                                    onFocus={e => e.target.style.borderColor = '#B91C1C'}
                                    onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#9CA3AF' }}>
                                    সম্পূর্ণ ঠিকানা <FaCircleCheck className="inline text-green-500 ml-1" />
                                </label>
                                <textarea
                                    name="address" rows="2" required
                                    placeholder="বাসা, রোড, এলাকা, থানা, জেলা"
                                    value={form.address} onChange={onChange}
                                    className="w-full border-2 rounded-xl px-4 py-3.5 outline-none transition-colors font-semibold text-sm resize-none"
                                    style={{ borderColor: '#E5E7EB' }}
                                    onFocus={e => e.target.style.borderColor = '#B91C1C'}
                                    onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>

                            <button type="submit" disabled={loading} className="btn-order w-full text-lg py-5">
                                {loading ? (
                                    <span className="animate-pulse">অপেক্ষা করুন...</span>
                                ) : (
                                    <><FaBagShopping /> অর্ডার কনফার্ম করুন</>
                                )}
                            </button>

                            <p className="text-center text-xs" style={{ color: '#9CA3AF' }}>
                                🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ
                            </p>
                        </form>
                    </>
                )}
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
            `}</style>
        </div>
    );
}
