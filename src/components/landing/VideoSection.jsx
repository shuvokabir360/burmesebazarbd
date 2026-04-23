import { FaPlay, FaBagShopping, FaStar } from 'react-icons/fa6';

export default function VideoSection() {
    return (
        <section className="py-24 bg-[#fff9f0] relative overflow-hidden" id="video">
            <div className="container max-w-4xl relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-display font-black text-gray-900 flex items-center justify-center gap-4">
                        <span className="text-orange-500 text-2xl md:text-4xl">▷</span> বিস্তারিত জানতে ভিডিও দেখুন
                    </h2>
                </div>

                {/* Video Player Container */}
                <div className="relative mx-auto rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(243,156,18,0.3)] border-8 border-white overflow-hidden aspect-[9/16] max-w-[400px]">
                    {/* Premium Badge Overlay */}
                    <div className="absolute top-0 left-0 w-full flex justify-center pt-8 z-20 pointer-events-none">
                        <div className="bg-[#f39c12] text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2 shadow-xl">
                            <FaStar /> PREMIUM <FaStar />
                        </div>
                    </div>

                    <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" // User should replace with actual reel ID
                        title="Product Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* CTA Button Under Video */}
                <div className="mt-12 text-center">
                    <button 
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-premium px-16 py-6 text-xl md:text-2xl shadow-2xl"
                    >
                        <FaBagShopping /> অর্ডার করুন — ৮৯৯
                    </button>
                </div>

            </div>
        </section>
    );
}
