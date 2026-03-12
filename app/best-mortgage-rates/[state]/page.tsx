import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import AdvertiserDisclosure from '../../components/AdvertiserDisclosure';
import FAQSection from '../../components/FAQSection';
import states from '@/data/states.json';

type State = typeof states[number];

export function generateStaticParams() {
  return states.map(state => ({ state: state.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = states.find(s => s.slug === stateSlug);
  if (!state) return {};
  return {
    title: `Best Mortgage Rates in ${state.name} (${state.abbreviation}) — 2026 Comparison`,
    description: `Compare the best mortgage rates in ${state.name} for 2026. Find current rates for 30-year fixed, 15-year fixed, and ARM mortgages from top lenders.`,
  };
}

function getMortgageLenders(state: State) {
  const seed = state.slug.length;
  const lenders = [
    { name: 'Rocket Mortgage', type: 'Online Lender' },
    { name: 'Chase Home Lending', type: 'National Bank' },
    { name: 'Wells Fargo Home Mortgage', type: 'National Bank' },
    { name: 'Bank of America Mortgage', type: 'National Bank' },
    { name: 'United Wholesale Mortgage', type: 'Wholesale Lender' },
    { name: 'loanDepot', type: 'Online Lender' },
    { name: 'Better.com', type: 'Online Lender' },
    { name: 'PNC Mortgage', type: 'National Bank' },
    { name: 'U.S. Bank Home Mortgage', type: 'National Bank' },
    { name: 'Citizens Home Mortgage', type: 'Regional Bank' },
  ];

  return lenders.map((lender, idx) => {
    const baseVariation = ((seed * 3 + idx * 7) % 20 - 10) / 100;
    return {
      ...lender,
      thirtyYearFixed: (6.85 + baseVariation).toFixed(2) + '%',
      fifteenYearFixed: (6.10 + baseVariation).toFixed(2) + '%',
      fiveOneARM: (6.35 + baseVariation + 0.05).toFixed(2) + '%',
    };
  });
}

function getFAQs(state: State) {
  return [
    {
      question: `What are current mortgage rates in ${state.name}?`,
      answer: `Current mortgage rates in ${state.name} vary by lender and loan type. As of 2026, 30-year fixed rates in ${state.name} are approximately 6.75% to 7.00%, 15-year fixed rates are around 6.00% to 6.25%, and 5/1 ARM rates start near 6.30% to 6.50%. Rates depend on your credit score, down payment, loan amount, and property type. Verify current rates with lenders directly.`
    },
    {
      question: `How do I get the best mortgage rate in ${state.name}?`,
      answer: `To get the best mortgage rate in ${state.name}, improve your credit score to 740 or above, save for a 20% or larger down payment to avoid PMI, shop and compare rates from at least 3 to 5 lenders, consider paying discount points to lower your rate, and lock your rate when you find a competitive offer.`
    },
    {
      question: `Should I choose a fixed or adjustable rate mortgage in ${state.name}?`,
      answer: `If you plan to stay in your ${state.name} home for more than 7 years, a fixed-rate mortgage provides payment stability. If you expect to move or refinance within 5 to 7 years, an ARM may save you money with its lower introductory rate. Consider your long-term plans and comfort with potential rate changes.`
    },
    {
      question: `What is the average home price in ${state.name}?`,
      answer: `Home prices in ${state.name} vary significantly by location. The statewide median depends on local market conditions, property types, and economic factors. Check current ${state.name} housing data from sources like Zillow, Redfin, or the National Association of Realtors for the most up-to-date median home prices in your specific area.`
    },
    {
      question: `Are there first-time homebuyer programs in ${state.name}?`,
      answer: `Yes, ${state.name} offers various first-time homebuyer programs including down payment assistance, favorable loan terms, and tax credits. Additionally, federal programs like FHA loans (3.5% down), VA loans (0% down for veterans), and USDA loans (0% down in rural areas) are available to ${state.name} residents. Contact your state housing finance agency for specific ${state.name} programs.`
    }
  ];
}

export default async function BestMortgageRatesPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const state = states.find(s => s.slug === stateSlug);
  if (!state) notFound();

  const lenders = getMortgageLenders(state);
  const faqs = getFAQs(state);
  const neighborStates = states.filter(s => s.slug !== state.slug).slice(0, 5);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { label: 'Bank Rates', href: '/bank-rates' },
        { label: `Best Mortgage Rates in ${state.name}` }
      ]} />
      <AdvertiserDisclosure />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Best Mortgage Rates in {state.name} ({state.abbreviation}) — 2026
      </h1>
      <p className="text-[#8b9dc3] text-lg mb-8">
        Compare current mortgage rates from top lenders serving {state.name}. Whether you are buying your first home or refinancing, find the best rates on 30-year fixed, 15-year fixed, and adjustable-rate mortgages.
      </p>

      {/* Rate Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 text-center">
          <p className="text-[#8b9dc3] text-xs uppercase tracking-wider mb-2">30-Year Fixed</p>
          <p className="text-3xl font-bold text-[#22c55e]">6.85%</p>
          <p className="text-[#8b9dc3] text-xs mt-1">Avg. in {state.abbreviation}</p>
        </div>
        <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 text-center">
          <p className="text-[#8b9dc3] text-xs uppercase tracking-wider mb-2">15-Year Fixed</p>
          <p className="text-3xl font-bold text-[#22c55e]">6.10%</p>
          <p className="text-[#8b9dc3] text-xs mt-1">Avg. in {state.abbreviation}</p>
        </div>
        <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 text-center">
          <p className="text-[#8b9dc3] text-xs uppercase tracking-wider mb-2">5/1 ARM</p>
          <p className="text-3xl font-bold text-[#22c55e]">6.40%</p>
          <p className="text-[#8b9dc3] text-xs mt-1">Avg. in {state.abbreviation}</p>
        </div>
      </div>

      {/* Mortgage Market */}
      <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Mortgage Market in {state.name}</h2>
        <p className="text-[#8b9dc3] leading-relaxed">
          The {state.name} housing market offers opportunities for both first-time buyers and those looking to refinance. Mortgage rates in {state.name} are influenced by national economic conditions, Federal Reserve policy, and local market dynamics. Shopping multiple lenders is crucial, as rates can vary by 0.25% to 0.50% or more between lenders for the same borrower profile. Even a small rate difference on a 30-year mortgage can save tens of thousands of dollars over the life of the loan.
        </p>
      </div>

      {/* Lender Comparison */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Mortgage Rate Comparison</h2>
        <div className="overflow-x-auto rounded-lg border border-[#2a3a4e]">
          <table>
            <thead>
              <tr><th>Lender</th><th>30-Year Fixed</th><th>15-Year Fixed</th><th>5/1 ARM</th><th>Type</th></tr>
            </thead>
            <tbody>
              {lenders.map((lender, idx) => (
                <tr key={idx}>
                  <td className="font-semibold text-white">{lender.name}</td>
                  <td className="text-[#22c55e] font-bold">{lender.thirtyYearFixed}</td>
                  <td>{lender.fifteenYearFixed}</td>
                  <td>{lender.fiveOneARM}</td>
                  <td className="text-xs text-[#8b9dc3]">{lender.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[#8b9dc3] text-xs mt-2">Rates shown are for illustration. Verify current rates directly with each lender. Actual rates depend on credit score, down payment, and other factors.</p>
      </section>

      {/* Fixed vs ARM */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Fixed vs. Adjustable Rate in {state.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
            <h3 className="text-lg font-bold text-white mb-3">Fixed-Rate Mortgage</h3>
            <ul className="space-y-2 text-[#8b9dc3] text-sm">
              <li>+ Payment stays the same for the entire loan term</li>
              <li>+ Best for long-term homeowners in {state.name}</li>
              <li>+ Protection against future rate increases</li>
              <li>- Higher initial rate than ARMs</li>
              <li>- Must refinance to take advantage of rate drops</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
            <h3 className="text-lg font-bold text-white mb-3">Adjustable-Rate Mortgage</h3>
            <ul className="space-y-2 text-[#8b9dc3] text-sm">
              <li>+ Lower initial rate saves money upfront</li>
              <li>+ Good if you plan to move within 5-7 years</li>
              <li>+ Rate may decrease if market rates fall</li>
              <li>- Payment can increase after introductory period</li>
              <li>- Uncertainty in long-term costs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Tips for Getting the Best Mortgage Rate in {state.name}</h2>
        <div className="space-y-4">
          {[
            { title: 'Boost Your Credit Score', text: `Borrowers with credit scores of 740 and above receive the best mortgage rates in ${state.name}. Check your score, pay down credit card balances, and correct any errors on your credit report before applying.` },
            { title: 'Save for a Larger Down Payment', text: `A 20% down payment eliminates the need for private mortgage insurance (PMI), which can add 0.5% to 1% of the loan amount annually. Even if you cannot reach 20%, larger down payments generally result in better rates.` },
            { title: 'Shop Multiple Lenders', text: `Get quotes from at least 3 to 5 lenders, including banks, credit unions, and online lenders serving ${state.name}. Rate shopping within a 45-day window counts as a single credit inquiry.` },
            { title: 'Consider Discount Points', text: `Paying discount points (1 point = 1% of the loan amount) can lower your interest rate by approximately 0.25%. This is worthwhile if you plan to keep the mortgage long enough to recoup the upfront cost through monthly savings.` },
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
        <h2 className="text-2xl font-bold text-white mb-4">Mortgage Rates in Other States</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {neighborStates.map(s => (
            <Link key={s.slug} href={`/best-mortgage-rates/${s.slug}`} className="no-underline">
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
          <Link href={`/best-cd-rates/${state.slug}`} className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best CD Rates in {state.name}</span>
            </div>
          </Link>
          <Link href={`/best-savings-accounts/${state.slug}`} className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best Savings Accounts in {state.name}</span>
            </div>
          </Link>
          <Link href="/guides/fixed-vs-variable-mortgage-rates" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Fixed vs. Variable Mortgage Rates Guide</span>
            </div>
          </Link>
          <Link href="/guides/when-to-refinance-your-mortgage" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">When to Refinance Your Mortgage</span>
            </div>
          </Link>
        </div>
      </section>

      <FAQSection faqs={faqs} />
    </div>
  );
}
