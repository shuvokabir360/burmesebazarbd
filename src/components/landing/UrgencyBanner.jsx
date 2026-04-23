import { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa6';

export default function UrgencyBanner() {
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
                if (totalSeconds <= 0) return { hours: 0, minutes: 0, seconds: 0 };
                return {
                    hours: Math.floor(totalSeconds / 3600),
                    minutes: Math.floor((totalSeconds % 3600) / 60),
                    seconds: totalSeconds % 60
                };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num) => num.toString().padStart(2, '0').split('').map(d => {
        const digits = { '0':'০', '1':'১', '2':'২', '3':'৩', '4':'৪', '5':'৫', '6':'৬', '7':'৭', '8':'৮', '9':'৯' };
        return digits[d] || d;
    }).join('');

    return (
        <div className="bg-[#003399] text-white py-2 sticky top-[60px] md:top-[72px] z-40 shadow-lg border-b border-white/10 overflow-hidden">
            <div className="container flex items-center justify-center gap-3 text-xs md:text-sm font-black tracking-widest whitespace-nowrap">
                <span className="flex items-center gap-2">🔥 আজই | <span className="text-orange-300">অফারটি শেষ হওয়ার আগে দ্রুত অর্ডার করুন</span></span>
                <span className="hidden md:inline text-white/50">|</span>
                <span className="animate-pulse flex items-center gap-2">
                    <FaClock className="text-orange-400" /> 
                    {formatNumber(timeLeft.hours)}:
                    {formatNumber(timeLeft.minutes)}:
                    {formatNumber(timeLeft.seconds)} Remaining
                </span>
            </div>
        </div>
    );
}


