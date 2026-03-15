import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import AdvertiserDisclosure from '../../components/AdvertiserDisclosure';
import FAQSection from '../../components/FAQSection';
import guides from '@/data/guides.json';

// Authority links injected contextually based on guide category
const CATEGORY_AUTHORITY_LINKS: Record<string, { label: string; href: string; context: string }[]> = {
  'Banking Basics': [
    { label: 'FDIC Deposit Insurance FAQ', href: 'https://www.fdic.gov/deposit/deposits/faq.html', context: 'Official deposit insurance information' },
    { label: 'CFPB Bank Account Guide', href: 'https://www.consumerfinance.gov/consumer-tools/bank-accounts/', context: 'Consumer protection resource' },
    { label: 'Bankrate Savings Rates', href: 'https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/', context: 'Independent rate comparison' },
  ],
  credit: [
    { label: 'CFPB Credit Reports Guide', href: 'https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/', context: 'Official credit reporting information' },
    { label: 'AnnualCreditReport.com', href: 'https://www.annualcreditreport.com', context: 'Free official credit reports' },
    { label: 'NerdWallet Credit Card Comparison', href: 'https://www.nerdwallet.com/best/credit-cards/no-annual-fee', context: 'Independent card comparison' },
  ],
  mortgages: [
    { label: 'CFPB Mortgage Guide', href: 'https://www.consumerfinance.gov/consumer-tools/mortgages/', context: 'Official mortgage consumer guide' },
    { label: 'Federal Reserve Rate Data', href: 'https://www.federalreserve.gov/releases/h15/', context: 'Benchmark interest rate data' },
    { label: 'Bankrate Mortgage Rates', href: 'https://www.bankrate.com/mortgages/mortgage-rates/', context: 'Current national mortgage rates' },
  ],
  savings: [
    { label: 'FDIC Deposit Insurance', href: 'https://www.fdic.gov/deposit/deposits/', context: 'Official deposit insurance info' },
    { label: 'Federal Reserve Rate Policy', href: 'https://www.federalreserve.gov/monetarypolicy/openmarket.htm', context: 'Rate decisions that affect savings' },
    { label: 'IRS Interest Income Guide', href: 'https://www.irs.gov/taxtopics/tc403', context: 'Tax treatment of interest income' },
  ],
  banking: [
    { label: 'FDIC Bank Verification', href: 'https://www.fdic.gov/resources/resolutions/bank-failures/failed-bank-list/', context: 'Verify your bank is FDIC insured' },
    { label: 'CFPB Checking Account Help', href: 'https://www.consumerfinance.gov/consumer-tools/bank-accounts/', context: 'Consumer rights resource' },
    { label: 'IRS Bank Bonus Tax Info', href: 'https://www.irs.gov/taxtopics/tc403', context: 'Bonuses are taxable — IRS guidance' },
  ],
};

type Guide = typeof guides[number];

export function generateStaticParams() {
  return guides.map(guide => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find(g => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find(g => g.slug === slug);
  if (!guide) notFound();

  const otherGuides = guides.filter(g => g.slug !== guide.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { label: 'Personal Finance', href: '/personal-finance' },
        { label: guide.title }
      ]} />
      <AdvertiserDisclosure />

      <div className="mb-4">
        <span className="text-xs font-medium text-[#22c55e] uppercase tracking-wider">{guide.category}</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {guide.title}
      </h1>
      <p className="text-[#8b9dc3] text-lg mb-10">
        {guide.description}
      </p>

      {/* Table of Contents */}
      <nav className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 mb-10">
        <h2 className="text-lg font-bold text-white mb-3">In This Guide</h2>
        <ol className="space-y-2">
          {guide.content.map((section, idx) => (
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
        {guide.content.map((section, idx) => (
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

      {/* Authority Sources */}
      {CATEGORY_AUTHORITY_LINKS[guide.category] && (
        <section className="mt-10 mb-8">
          <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5">
            <h2 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Official Sources &amp; Further Reading</h2>
            <ul className="space-y-2">
              {CATEGORY_AUTHORITY_LINKS[guide.category].map((link, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-[#22c55e] mt-0.5 flex-shrink-0">→</span>
                  <span>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-[#22c55e] no-underline">
                      {link.label}
                    </a>
                    <span className="text-[#8b9dc3] ml-2">— {link.context}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Key Takeaways */}
      <section className="mt-10 mb-10">
        <div className="rounded-lg border border-[#22c55e] bg-[#1a2332] p-6">
          <h2 className="text-xl font-bold text-white mb-3">Key Takeaways</h2>
          <ul className="space-y-2 text-[#8b9dc3]">
            {guide.content.slice(0, 4).map((section, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#22c55e] mt-0.5 flex-shrink-0">+</span>
                <span>{section.text.split('.')[0]}.</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related Guides */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Related Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherGuides.map(g => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="no-underline group">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5 hover:border-[#22c55e] transition-colors h-full">
                <span className="text-xs font-medium text-[#22c55e] uppercase tracking-wider">{g.category}</span>
                <h3 className="text-white font-semibold mt-1 mb-1 group-hover:text-[#22c55e] transition-colors text-sm">{g.title}</h3>
                <p className="text-[#8b9dc3] text-xs leading-relaxed">{g.description.substring(0, 100)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
          <Link href="/best-cd-rates/california" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best CD Rates by State</span>
            </div>
          </Link>
          <Link href="/reviews/ally" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Read Top Bank Reviews</span>
            </div>
          </Link>
        </div>
      </section>

      <FAQSection faqs={guide.faq} />
    </div>
  );
}
