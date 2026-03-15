import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import AdvertiserDisclosure from '../../components/AdvertiserDisclosure';
import FAQSection from '../../components/FAQSection';
import comparisons from '@/data/comparisons.json';

type Comparison = typeof comparisons[number];

export function generateStaticParams() {
  return comparisons.map(comparison => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find(c => c.slug === slug);
  if (!comparison) return {};
  return {
    title: comparison.title,
    description: comparison.description,
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = comparisons.find(c => c.slug === slug);
  if (!comparison) notFound();

  const otherComparisons = comparisons.filter(c => c.slug !== comparison.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { label: 'Compare Banks', href: '/compare' },
        { label: comparison.title }
      ]} />
      <AdvertiserDisclosure />

      <div className="mb-4">
        <span className="text-xs font-medium text-[#22c55e] uppercase tracking-wider">{comparison.category}</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {comparison.title}
      </h1>
      <p className="text-[#8b9dc3] text-lg mb-10">
        {comparison.description}
      </p>

      {/* Table of Contents */}
      <nav className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 mb-10">
        <h2 className="text-lg font-bold text-white mb-3">In This Comparison</h2>
        <ol className="space-y-2">
          {comparison.content.map((section, idx) => (
            <li key={idx}>
              <a href={`#section-${idx}`} className="text-[#3b82f6] no-underline hover:text-[#22c55e] text-sm">
                {idx + 1}. {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Content Sections */}
      <article className="space-y-10">
        {comparison.content.map((section, idx) => (
          <section key={idx} id={`section-${idx}`}>
            <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
            {section.text.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx} className="text-[#8b9dc3] leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>

      {/* Key Takeaways */}
      <section className="mt-10 mb-10">
        <div className="rounded-lg border border-[#22c55e] bg-[#1a2332] p-6">
          <h2 className="text-xl font-bold text-white mb-3">Key Takeaways</h2>
          <ul className="space-y-2 text-[#8b9dc3]">
            {comparison.content.slice(0, 4).map((section, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#22c55e] mt-0.5 flex-shrink-0">+</span>
                <span>{section.text.split('.')[0]}.</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related Comparisons */}
      {otherComparisons.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">More Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherComparisons.map(c => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="no-underline group">
                <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5 hover:border-[#22c55e] transition-colors h-full">
                  <span className="text-xs font-medium text-[#22c55e] uppercase tracking-wider">{c.category}</span>
                  <h3 className="text-white font-semibold mt-1 mb-1 group-hover:text-[#22c55e] transition-colors text-sm">{c.title}</h3>
                  <p className="text-[#8b9dc3] text-xs leading-relaxed">{c.description.substring(0, 100)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Internal Links */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/bank-rates" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Compare Bank Rates</span>
            </div>
          </Link>
          <Link href="/best-credit-cards/cash-back" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best Cash Back Credit Cards</span>
            </div>
          </Link>
          <Link href="/best-savings-accounts/california" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best Savings Accounts</span>
            </div>
          </Link>
          <Link href="/banking-deals" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Browse All Banking Deals</span>
            </div>
          </Link>
        </div>
      </section>

      <FAQSection faqs={comparison.faq} />
    </div>
  );
}
