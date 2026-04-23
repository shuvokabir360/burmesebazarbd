import { FaBagShopping } from 'react-icons/fa6';

const products = [
    { name: "Sakura Plum", price: 280, image: "https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=400" },
    { name: "Sagor Konna Special", price: 350, image: "https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=400" },
];

export default function ProductGrid() {
    return (
        <section className="py-24 bg-white" id="products">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-black text-gray-900 mb-4">🛒 আমাদের সব <span className="text-orange-500">প্রোডাক্ট</span></h2>
                    <p className="text-gray-500 font-medium">পছন্দের প্রোডাক্ট সিলেক্ট করে একসাথে অর্ডার করুন</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {products.map((p, i) => (
                        <div key={i} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-lg hover:shadow-2xl transition-all group">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-orange-50">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <h4 className="font-bold text-gray-900">{p.name}</h4>
                            <div className="text-orange-600 font-black text-xl my-2">৳{p.price}</div>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                                <FaBagShopping /> অ্যাড করুন
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
