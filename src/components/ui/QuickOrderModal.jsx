import { useState, useEffect } from 'react';
import { useOrderModal } from '../../context/OrderModalContext';
import { supabase } from '../../lib/supabase';
import { FaXmark, FaCheck } from 'react-icons/fa6';
import toast from 'react-hot-toast';

export default function QuickOrderModal() {
    const { isModalOpen, closeModal } = useOrderModal();
    const [loading, setLoading] = useState(false);
    const [comboPrice, setComboPrice] = useState(899);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
    });

    // Fetch combo price from DB
    useEffect(() => {
        async function fetchPrice() {
            const { data } = await supabase.from('combo_packages').select('combo_price').eq('is_active', true).limit(1).single();
            if (data?.combo_price) {
                setComboPrice(data.combo_price);
            }
        }
        if (isModalOpen) fetchPrice();
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // BD Phone Number validation (11 digits starting with 01)
        const phoneRegex = /^01[3-9]\d{8}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast.error('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)');
            return;
        }

        if (!formData.name.trim() || !formData.address.trim()) {
            toast.error('অনুগ্রহ করে নাম এবং ঠিকানা প্রদান করুন');
            return;
        }

        setLoading(true);

        const payload = {
            customer_name: formData.name,
            phone: formData.phone,
            address: formData.address,
            quantity: 1, // Defaulting to 1 combo
            total_price: comboPrice,
            status: 'pending'
        };

        console.log('Order Payload:', payload);

        try {
            const { error } = await supabase.from('orders').insert([payload]);
            if (error) throw error;
            
            toast.success('অর্ডার সফলভাবে কনফার্ম হয়েছে! ✅');
            setFormData({ name: '', phone: '', address: '' }); // Reset form
            closeModal();
        } catch (error) {
            console.error(error);
            toast.error('অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={closeModal} style={{ zIndex: 9999 }}>
            <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', width: '90%', padding: '2rem' }}>
                <button className="modal-close" onClick={closeModal} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--text-color)', fontSize: '1.2rem', cursor: 'pointer' }}>
                    <FaXmark />
                </button>
                
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>দ্রুত অর্ডার করুন</h2>
                <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>প্রিমিয়াম আচার কম্বো (৳{comboPrice})</p>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>আপনার নাম <span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="text" 
                            name="name"
                            className="form-input" 
                            placeholder="আপনার পুরো নাম লিখুন" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>মোবাইল নম্বর <span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="tel" 
                            name="phone"
                            className="form-input" 
                            placeholder="01XXXXXXXXX" 
                            value={formData.phone}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>ডেলিভারি ঠিকানা <span style={{color: 'red'}}>*</span></label>
                        <textarea 
                            name="address"
                            className="form-input" 
                            placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন (বাড়ি/সড়ক, এলাকা, জেলা)" 
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '8px' }} disabled={loading}>
                        {loading ? 'প্রসেস হচ্ছে...' : <><FaCheck /> অর্ডার কনফার্ম করুন</>}
                    </button>
                </form>
            </div>
        </div>
    );
}
