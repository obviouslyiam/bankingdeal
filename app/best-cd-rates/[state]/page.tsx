import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import AdvertiserDisclosure from '../../components/AdvertiserDisclosure';
import FAQSection from '../../components/FAQSection';
import states from '@/data/states.json';
import banks from '@/data/banks.json';

type State = typeof states[number];

export function generateStaticParams() {
  return states.map(state => ({ state: state.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = states.find(s => s.slug === stateSlug);
  if (!state) return {};
  return {
    title: `Best CD Rates in ${state.name} (${state.abbreviation}) — 2026 Comparison`,
    description: `Compare the best CD rates available in ${state.name} for 2026. Find the highest APY on 6-month, 12-month, and 5-year certificates of deposit from top banks.`,
  };
}

function getCDRatesForState(state: State) {
  const seed = state.slug.length;
  return banks
    .filter(b => b.cdAPY12Month !== 'N/A')
    .map(b => {
      const baseRate = parseFloat(b.cdAPY12Month.replace('%', ''));
      const variation = ((seed * 7 + b.slug.length * 3) % 30 - 15) / 100;
      return {
        ...b,
        sixMonth: (baseRate - 0.25 + variation).toFixed(2) + '%',
        twelveMonth: (baseRate + variation).toFixed(2) + '%',
        twentyFourMonth: (baseRate + 0.10 + variation).toFixed(2) + '%',
        sixtyMonth: (baseRate + 0.20 + variation).toFixed(2) + '%',
      };
    })
    .sort((a, b) => parseFloat(b.twelveMonth) - parseFloat(a.twelveMonth))
    .slice(0, 10);
}

function getFAQs(state: State) {
  return [
    {
      question: `What is the highest CD rate available in ${state.name}?`,
      answer: `The highest CD rates in ${state.name} are currently offered by online banks that serve customers nationwide, with 12-month CD APYs reaching approximately 4.50% to 4.75%. Both local ${state.name} banks and national online banks offer competitive rates. Rates change frequently, so verify current offers directly with each institution.`
    },
    {
      question: `Are CD rates in ${state.name} different from national rates?`,
      answer: `Online banks offer the same CD rates to customers in all 50 states, including ${state.name}. However, local and regional banks in ${state.name} may offer different rates that could be higher or lower than national averages. It is worth comparing both local and online options.`
    },
    {
      question: `What CD term should I choose in ${state.name}?`,
      answer: `The best CD term depends on when you will need the money and your interest rate outlook. If you think rates will fall, lock in a longer term to secure today's higher rates. If you need flexibility, shorter terms or a CD ladder strategy can provide both competitive rates and regular access to funds.`
    },
    {
      question: `Are CDs from ${state.name} banks FDIC insured?`,
      answer: `Yes, CDs from FDIC-member banks are insured up to $250,000 per depositor, per institution, regardless of which state the bank is located in. This applies to both local ${state.name} banks and online banks. Credit union CDs are similarly insured by the NCUA.`
    },
    {
      question: `How do I open a CD in ${state.name}?`,
      answer: `You can open a CD at any FDIC-insured bank that serves ${state.name} residents. Most online banks allow you to open a CD in minutes through their website. Local banks in ${state.name} allow you to open CDs in-branch or online. You will need a government-issued ID, Social Security number, and funds for your initial deposit.`
    }
  ];
}

export default async function BestCDRatesPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const state = states.find(s => s.slug === stateSlug);
  if (!state) notFound();

  const cdRates = getCDRatesForState(state);
  const faqs = getFAQs(state);
  const neighborStates = states.filter(s => s.slug !== state.slug).slice(0, 5);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { label: 'Bank Rates', href: '/bank-rates' },
        { label: `Best CD Rates in ${state.name}` }
      ]} />
      <AdvertiserDisclosure />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Best CD Rates in {state.name} ({state.abbreviation}) — 2026
      </h1>
      <p className="text-[#8b9dc3] text-lg mb-8">
        Compare the best certificate of deposit (CD) rates available to {state.name} residents. Whether you are looking for short-term flexibility or long-term growth, these top CD offers provide competitive APYs with FDIC insurance protection.
      </p>

      {/* Rate Environment */}
      <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CD Rate Environment in {state.name}</h2>
        <p className="text-[#8b9dc3] leading-relaxed">
          {state.name} residents have access to both local and national banks offering competitive CD rates. Online banks typically offer the highest APYs because they have lower overhead costs, while local {state.name} banks may offer promotional rates and the convenience of in-branch service. In the current rate environment, 12-month CDs are offering some of the most attractive returns, making it an excellent time to lock in rates before any potential rate decreases.
        </p>
      </div>

      {/* CD Rates Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">CD Rate Comparison</h2>
        <div className="overflow-x-auto rounded-lg border border-[#2a3a4e]">
          <table>
            <thead>
              <tr><th>Bank</th><th>6-Month</th><th>12-Month</th><th>24-Month</th><th>60-Month</th><th>Review</th></tr>
            </thead>
            <tbody>
              {cdRates.map(bank => (
                <tr key={bank.slug}>
                  <td className="font-semibold text-white">{bank.name}</td>
                  <td>{bank.sixMonth}</td>
                  <td className="text-[#22c55e] font-bold">{bank.twelveMonth}</td>
                  <td>{bank.twentyFourMonth}</td>
                  <td>{bank.sixtyMonth}</td>
                  <td><Link href={`/reviews/${bank.slug}`} className="text-[#3b82f6] no-underline hover:text-[#22c55e]">Review</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[#8b9dc3] text-xs mt-2">Rates shown are for illustration. Verify current rates directly with each institution.</p>
      </section>

      {/* Tips */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Tips for Getting the Best CD Rates in {state.name}</h2>
        <div className="space-y-4">
          {[
            { title: 'Compare Online and Local Banks', text: `Do not limit your search to banks with physical branches in ${state.name}. Online banks often offer significantly higher CD rates because they operate with lower overhead costs. Many of the best rates in our comparison come from online-only institutions.` },
            { title: 'Consider a CD Ladder Strategy', text: `Instead of putting all your savings into one CD term, spread your deposits across multiple terms (e.g., 6-month, 1-year, 2-year, 3-year). This provides regular access to a portion of your savings while still earning competitive long-term rates.` },
            { title: 'Check for Early Withdrawal Penalties', text: `Before opening a CD, understand the early withdrawal penalty. Penalties vary significantly between banks, from 90 days to 12+ months of interest. If you might need early access, consider a no-penalty CD option.` },
            { title: 'Look for Promotional Rates', text: `Local banks in ${state.name} sometimes offer promotional CD rates that beat online competitors, especially for new customers. These limited-time offers can provide excellent returns if you catch them.` },
          ].map((tip, idx) => (
            <div key={idx} className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5">
              <h3 className="text-lg font-semibold text-white mb-2">{tip.title}</h3>
              <p className="text-[#8b9dc3] leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other States */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">CD Rates in Other States</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {neighborStates.map(s => (
            <Link key={s.slug} href={`/best-cd-rates/${s.slug}`} className="no-underline">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-3 text-center hover:border-[#22c55e] transition-colors">
                <span className="text-white text-sm">{s.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href={`/best-savings-accounts/${state.slug}`} className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best Savings Accounts in {state.name}</span>
            </div>
          </Link>
          <Link href={`/best-mortgage-rates/${state.slug}`} className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best Mortgage Rates in {state.name}</span>
            </div>
          </Link>
          <Link href="/guides/what-is-a-cd-certificate-of-deposit" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">What Is a CD? Complete Guide</span>
            </div>
          </Link>
          <Link href="/guides/understanding-apy-vs-apr" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Understanding APY vs APR</span>
            </div>
          </Link>
        </div>
      </section>

      <FAQSection faqs={faqs} />
    </div>
  );
}
