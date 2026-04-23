import { FaLeaf, FaBolt, FaFlaskVial, FaCloud, FaCircleCheck, FaAward, FaHouseChimney, FaPeopleGroup, FaStar } from 'react-icons/fa6';

export default function UspSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container">
                
                {/* Section: Why Choose Our Pickle? */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-black text-gray-900 mb-6">
                        কেন আমাদের <span className="text-[#d35400]">আচার নেবেন?</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {[
                        { icon: <FaLeaf />, title: "প্রাকৃতিক ও কেমিক্যালমুক্ত", desc: "আমরা সরাসরি গ্রাম থেকে ১০০% বিশুদ্ধ ও কেমিক্যালমুক্ত আচার সরবরাহ করি।" },
                        { icon: <FaBolt />, title: "ইন্সট্যান্ট এনার্জি বুস্টার", desc: "প্রাকৃতিক সুগারে সমৃদ্ধ যা ক্লান্তি দূর করে দ্রুত শরীরে শক্তি যোগায়।" },
                        { icon: <FaAward />, title: "সফট টেক্সচার", desc: "অত্যন্ত নরম ও রসালো স্বাদের জন্য এই আচার সবার কাছে অত্যন্ত প্রিয়।" },
                        { icon: <FaFlaskVial />, title: "পুষ্টিগুণে ভরপুর", desc: "ফাইবার, মিনারেল এবং অ্যান্টি-অক্সিডেন্টের চমৎকার উৎস।" },
                        { icon: <FaCircleCheck />, title: "BSTI অনুমোদিত", desc: "পরিমিত পরিমাণে গ্রহণ করলে এটি সবার জন্য উপযোগী।" },
                        { icon: <FaAward />, title: "আসল স্বাদের নিশ্চয়তা", desc: "সরাসরি গ্রাম থেকে আমদানিকৃত প্রিমিয়াম গ্রেড ও সুস্বাদু আচার।" }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-[#fdf2f2] p-8 rounded-3xl border border-red-100 group hover:bg-white hover:shadow-xl transition-all">
                            <div className="text-3xl text-red-500 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h4 className="text-xl font-display font-black text-gray-900 mb-2">{item.title}</h4>
                            <p className="text-gray-600 text-sm font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Section: What makes us different? */}
                <div className="bg-[#003399] rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl pointer-events-none">✨</div>
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-display font-black mb-8">
                                কেন আমরা অন্য <br /> সবার থেকে আলাদা?
                            </h2>
                            <div className="space-y-6">
                                {[
                                    "আমাদের আচারগুলো সম্পূর্ণভাবে কেমিক্যালমুক্ত এবং চিনি ছাড়া।",
                                    "ঘরোয়া রেসিপিতে হাতে তৈরি ফ্রেশ আচার।",
                                    "আচারগুলো ঐতিহ্যবাহী পদ্ধতিতে তৈরি তাই পরিবারে সবাই পছন্দ করবে।",
                                    "স্বাদ, গুণ এবং মান নিশ্চিত করে আমরা আচারগুলো সংগ্রহ করি।"
                                ].map((text, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="mt-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center shrink-0">
                                            <FaCircleCheck className="text-xs" />
                                        </div>
                                        <p className="text-lg font-medium text-blue-50">{text}</p>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-premium mt-10"
                            >
                                অর্ডার করুন — ৳৭৯৯
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur p-6 rounded-3xl border border-white/20 text-center">
                                <FaHouseChimney className="text-4xl text-orange-400 mx-auto mb-4" />
                                <div className="font-bold">১০০% ঘরোয়া</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur p-6 rounded-3xl border border-white/20 text-center translate-y-8">
                                <FaAward className="text-4xl text-orange-400 mx-auto mb-4" />
                                <div className="font-bold">BSTI অনুমোদিত</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur p-6 rounded-3xl border border-white/20 text-center">
                                <FaPeopleGroup className="text-4xl text-orange-400 mx-auto mb-4" />
                                <div className="font-bold">সবার পছন্দ</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur p-6 rounded-3xl border border-white/20 text-center translate-y-8">
                                <FaStar className="text-4xl text-orange-400 mx-auto mb-4" />
                                <div className="font-bold">টপ রেটেড</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
