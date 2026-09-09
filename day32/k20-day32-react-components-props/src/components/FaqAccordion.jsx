import { useState } from "react";
import Badge from "./Badge.jsx";

function FaqAccordion({ faqData, onSelectFaq }) {
    const [openId, setOpenId] = useState(null);

    const toggleOpen = (id) => {
        setOpenId((current) => (current === id ? null : id));
    };

    return (
        <div className="flex flex-col gap-2.5">
            {faqData.length > 0 && (
                <>
                    {faqData.map((faq) => {
                        const isOpen = openId === faq.id;

                        return (
                            <div
                                key={faq.id}
                                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                            >
                                <button
                                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                                    onClick={() => toggleOpen(faq.id)}
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
                                            {faq.category}
                                        </span>
                                        <span className="text-[0.95rem] font-semibold text-slate-900">
                                            {faq.question}
                                        </span>
                                        {faq.isHot && (
                                            <Badge type="hot">Hot</Badge>
                                        )}
                                    </div>
                                    <span
                                        className={`shrink-0 text-lg text-slate-400 transition-transform ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                        ⌄
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="border-t border-slate-200 px-4 pb-4 pt-3">
                                        <p className="mb-3 text-sm text-slate-500">
                                            {faq.answer}
                                        </p>
                                        <button
                                            className="rounded-md border border-teal-700 px-3.5 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-700 hover:text-white"
                                            onClick={() => onSelectFaq(faq.id)}
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </>
            )}

            {faqData.length === 0 && (
                <p className="italic text-slate-400">Chưa có câu hỏi nào.</p>
            )}
        </div>
    );
}

export default FaqAccordion;
