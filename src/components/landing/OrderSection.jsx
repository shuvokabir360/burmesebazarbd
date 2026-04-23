import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { FaTruck, FaBagShopping, FaLock, FaCircleCheck } from 'react-icons/fa6';

export default function OrderSection() {
    const ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const [price] = useState(799);
    const [form, setForm] = useState({ name: '', phone: '', address: '' });

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (!/^01[3-9]\d{8}$/.test(form.phone)) return alert('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন');
        if (!form.name.trim() || !form.address.trim()) return alert('নাম ও ঠিকানা দিন');

        setLoading(true);
        try {
            const { error } = await supabase.from('orders').insert([{
                customer_name: form.name, phone: form.phone, address: form.address,
                quantity: 1, total_price: price, status: 'pending',
            }]);
            if (error) throw error;
            alert('✅ অর্ডার সফল! শীঘ্রই কল করব।');
            setForm({ name: '', phone: '', address: '' });
        } catch {
            alert('সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    const inputCls = "w-full border-2 rounded-xl px-5 py-4 outline-none transition-colors font-semibold";

    return (
        <section ref={ref} id="checkout" style={{ background: 'var(--cream)' }}>
            <div className="container max-w-5xl">
                <div className="reveal text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                        <FaLock /> নিরাপদ চেকআউট
                    </div>
                    <h2 className="section-title mb-2">অর্ডার <span style={{ color: 'var(--red)' }}>কনফার্ম করুন</span></h2>
                    <p className="section-subtitle">সঠিক তথ্য দিয়ে ফর্ম পূরণ করুন — আমরাই ফোন করব</p>
                </div>

                <div className="reveal reveal-delay-1 grid lg:grid-cols-5 gap-0 rounded-[2rem] overflow-hidden shadow-2xl border" style={{ borderColor: 'var(--gray-200)', background: 'var(--white)' }}>
                    {/* Left Summary */}
                    <div className="lg:col-span-2 p-8 md:p-10" style={{ background: 'var(--gray-50)' }}>
                        <h3 className="font-bold text-xl mb-8" style={{ color: 'var(--gray-900)' }}>🛒 অর্ডার সামারি</h3>

                        <div className="flex gap-4 items-start mb-8 pb-8 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                            <img src="/assets/images/premium_pickle_combo.png" alt="Combo" className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-md"
                                 onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=200'; }} />
                            <div>
                                <div className="font-bold" style={{ color: 'var(--gray-900)' }}>আচার কম্বো প্যাকেজ</div>
                                <div className="text-xs" style={{ color: 'var(--gray-400)' }}>৬ আইটেম + ১ ফ্রি</div>
                                <div className="font-bold mt-1" style={{ color: 'var(--red)' }}>৳{price}</div>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm mb-8">
                            <div className="flex justify-between"><span style={{ color: 'var(--gray-500)' }}>সাবটোটাল</span><span className="font-bold">৳{price}</span></div>
                            <div className="flex justify-between font-bold" style={{ color: 'var(--green)' }}><span>ডেলিভারি</span><span>ফ্রি</span></div>
                            <div className="flex justify-between text-xl font-bold pt-3 border-t" style={{ borderColor: 'var(--gray-200)', color: 'var(--red)' }}><span>সর্বমোট</span><span>৳{price}</span></div>
                        </div>

                        <div className="flex gap-3 items-center p-4 rounded-xl" style={{ background: 'var(--green-light)' }}>
                            <FaTruck className="text-xl" style={{ color: 'var(--green)' }} />
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--green)' }}>ক্যাশ অন ডেলিভারি</div>
                                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>পণ্য হাতে পেয়ে পে করুন</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="lg:col-span-3 p-8 md:p-10 lg:p-14">
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--gray-400)' }}>
                                    আপনার নাম <FaCircleCheck className="inline text-green-500 ml-1" />
                                </label>
                                <input type="text" name="name" required placeholder="পুরো নাম" value={form.name} onChange={onChange}
                                    className={inputCls} style={{ borderColor: 'var(--gray-200)' }}
                                    onFocus={e => e.target.style.borderColor = 'var(--red)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--gray-400)' }}>
                                    মোবাইল নাম্বার <FaCircleCheck className="inline text-green-500 ml-1" />
                                </label>
                                <input type="tel" name="phone" required placeholder="01XXXXXXXXX" value={form.phone} onChange={onChange}
                                    className={inputCls} style={{ borderColor: 'var(--gray-200)' }}
                                    onFocus={e => e.target.style.borderColor = 'var(--red)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--gray-400)' }}>
                                    সম্পূর্ণ ঠিকানা <FaCircleCheck className="inline text-green-500 ml-1" />
                                </label>
                                <textarea name="address" rows="3" required placeholder="বাসা, রোড, এলাকা, থানা, জেলা" value={form.address} onChange={onChange}
                                    className={`${inputCls} resize-none`} style={{ borderColor: 'var(--gray-200)' }}
                                    onFocus={e => e.target.style.borderColor = 'var(--red)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn-order w-full text-xl py-5">
                                {loading ? 'অপেক্ষা করুন...' : <><FaBagShopping /> অর্ডার কনফার্ম করুন</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
