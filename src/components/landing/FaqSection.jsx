import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';

const faqs = [
    {
        q: 'আচার কী এবং কেন এটি এত জনপ্রিয়?',
        a: 'আচার বাংলাদেশের ঐতিহ্যবাহী খাবার। সরিষার তেল, মশলা ও প্রাকৃতিক উপকরণ দিয়ে তৈরি এই আচার প্রজন্মের পর প্রজন্ম ধরে বাঙালি খাবারের অবিচ্ছেদ্য অংশ।',
    },
    {
        q: 'আচার কি ডায়াবেটিস রোগীরা খেতে পারবেন?',
        a: 'আমাদের কিছু আচার চিনি বা গুড় ছাড়া তৈরি করা হয় যা পরিমিত পরিমাণে ডায়াবেটিস রোগীরা খেতে পারেন। তবে নিয়মিত গ্রহণের আগে আপনার ডাক্তারের পরামর্শ নেয়া উচিত।',
    },
    {
        q: 'এই আচার কি ১০০% অরিজিনাল?',
        a: 'জি, আমাদের প্রতিটি আচার সরাসরি গ্রাম থেকে সংগ্রহ করা হয়। এতে কোনো ভেজাল বা কৃত্রিম ফ্লেভার ব্যবহার করা হয় না। মায়ের হাতের আসল স্বাদের নিশ্চয়তা আমরা দিচ্ছি।',
    },
    {
        q: 'আচার কীভাবে সংরক্ষণ করবেন?',
        a: 'আচার অনেকদিন ভালো রাখতে কাঁচের জারে সংরক্ষণ করুন। মাঝে মাঝে কড়া রোদে দিন এবং শুকনো চামচ ব্যবহার করুন। এতে আচারের স্বাদ ও গুণাগুণ অক্ষুণ্ণ থাকে।',
    },
    {
        q: 'আচার কি প্রতিদিন খাওয়া যায়?',
        a: 'জি, পরিমিত পরিমাণে আচার প্রতিদিন খাওয়া যায়। এটি আপনার হজমে সহায়তা করে এবং খাবারের রুচি বাড়ায়। তবে অতিরিক্ত টক বা ঝাল আচার পরিমিতভাবে খাওয়াই শ্রেয়।',
    },
];

export default function FaqSection() {
    const [open, setOpen] = useState(0);

    return (
        <section style={{ background: 'var(--white)' }} id="faq">
            <div className="container max-w-3xl">
                <h2 className="section-title">
                    সাধারণ কিছু <span style={{ color: 'var(--red)' }}>জিজ্ঞাসা</span>
                </h2>
                <p className="section-subtitle">আপনার মনে যে প্রশ্নগুলো আসতে পারে</p>

                <div className="space-y-3">
                    {faqs.map((faq, i) => {
                        const isOpen = open === i;
                        return (
                            <div
                                key={i}
                                className="rounded-2xl border overflow-hidden transition-all"
                                style={{
                                    borderColor: isOpen ? 'var(--red)' : 'var(--gray-200)',
                                    background: isOpen ? 'var(--red-light)' : 'var(--white)',
                                }}
                            >
                                <button
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                >
                                    <span className="font-bold text-base md:text-lg pr-4" style={{ color: isOpen ? 'var(--red)' : 'var(--gray-800)' }}>
                                        {faq.q}
                                    </span>
                                    <span
                                        className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm transition-transform"
                                        style={{
                                            background: isOpen ? 'var(--red)' : 'var(--gray-100)',
                                            color: isOpen ? 'white' : 'var(--gray-400)',
                                        }}
                                    >
                                        {isOpen ? <FaMinus /> : <FaPlus />}
                                    </span>
                                </button>
                                <div
                                    className="transition-all duration-300 overflow-hidden"
                                    style={{ maxHeight: isOpen ? '300px' : '0', opacity: isOpen ? 1 : 0 }}
                                >
                                    <div className="px-5 md:px-6 pb-5 md:pb-6 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
