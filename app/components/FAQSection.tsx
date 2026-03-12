import FAQSchema from './FAQSchema';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({ faqs, title }: { faqs: FAQItem[]; title?: string }) {
  return (
    <section className="mt-12">
      <FAQSchema faqs={faqs} />
      <h2 className="text-2xl font-bold text-white mb-6">{title || 'Frequently Asked Questions'}</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5">
            <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
            <p className="text-[#8b9dc3] leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
