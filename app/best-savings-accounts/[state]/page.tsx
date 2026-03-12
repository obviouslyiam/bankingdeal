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
    title: `Best Savings Accounts in ${state.name} (${state.abbreviation}) — 2026 APY Comparison`,
    description: `Find the best savings accounts in ${state.name} for 2026. Compare high-yield savings APYs, fees, and features from top online and local banks.`,
  };
}

function getSavingsForState(state: State) {
  return banks
    .filter(b => b.savingsAPY !== 'N/A')
    .map(b => {
      const baseRate = parseFloat(b.savingsAPY.replace('%', ''));
      return {
        ...b,
        effectiveAPY: b.savingsAPY,
        minDeposit: baseRate >= 3.5 ? '$0' : '$25',
        monthlyFee: b.checkingMonthlyFee === '$0' || b.checkingMonthlyFee === 'N/A' ? 'None' : b.checkingMonthlyFee,
      };
    })
    .sort((a, b) => parseFloat(b.effectiveAPY) - parseFloat(a.effectiveAPY))
    .slice(0, 12);
}

function getFAQs(state: State) {
  return [
    {
      question: `What is the best savings account in ${state.name}?`,
      answer: `The best savings accounts available to ${state.name} residents offer APYs of 4.00% or higher with no monthly fees and no minimum balance requirements. Online banks like Ally Bank, Synchrony Bank, and Bread Savings consistently offer the highest rates. The best choice depends on your need for branch access versus maximum yield.`
    },
    {
      question: `What is a good savings account interest rate in ${state.name}?`,
      answer: `In the current rate environment, a good savings account rate for ${state.name} residents is 4.00% APY or higher. The national average savings rate is significantly lower at around 0.45%. High-yield savings accounts from online banks routinely offer rates 8 to 10 times the national average.`
    },
    {
      question: `Can I open an online savings account from ${state.name}?`,
      answer: `Yes, ${state.name} residents can open savings accounts at most online banks. These banks serve customers in all 50 states and typically offer higher rates than local banks. All you need is a government-issued ID, Social Security number, and a way to fund your initial deposit.`
    },
    {
      question: `Are savings accounts in ${state.name} FDIC insured?`,
      answer: `Yes, savings accounts at FDIC-member banks are insured up to $250,000 per depositor, per institution. This applies to both online banks and local ${state.name} banks. Credit union savings accounts are similarly insured by the NCUA up to $250,000.`
    },
    {
      question: `How much should I keep in my savings account?`,
      answer: `Financial experts recommend keeping 3 to 6 months of living expenses in a savings account as an emergency fund. In ${state.name}, where the cost of living varies by area, calculate your monthly essential expenses and multiply by 3 to 6. Beyond your emergency fund, consider CDs or investment accounts for additional savings.`
    }
  ];
}

export default async function BestSavingsPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const state = states.find(s => s.slug === stateSlug);
  if (!state) notFound();

  const savingsAccounts = getSavingsForState(state);
  const faqs = getFAQs(state);
  const neighborStates = states.filter(s => s.slug !== state.slug).slice(0, 5);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { label: 'Bank Rates', href: '/bank-rates' },
        { label: `Best Savings Accounts in ${state.name}` }
      ]} />
      <AdvertiserDisclosure />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Best Savings Accounts in {state.name} ({state.abbreviation}) — 2026
      </h1>
      <p className="text-[#8b9dc3] text-lg mb-8">
        Compare the best high-yield savings accounts available to {state.name} residents. Find the highest APY rates, lowest fees, and most useful features from online and traditional banks.
      </p>

      {/* Market Overview */}
      <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Savings Account Landscape in {state.name}</h2>
        <p className="text-[#8b9dc3] leading-relaxed">
          {state.name} savers have access to a wide range of savings account options. Online banks continue to lead with the highest APYs, often exceeding 4.00%, while traditional banks with {state.name} branch locations typically offer lower rates but provide in-person service. The best strategy for many {state.name} residents is to keep a local checking account for daily transactions while parking savings in a high-yield online account for maximum returns.
        </p>
      </div>

      {/* Savings Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Savings Account Comparison</h2>
        <div className="overflow-x-auto rounded-lg border border-[#2a3a4e]">
          <table>
            <thead>
              <tr><th>Bank</th><th>APY</th><th>Monthly Fee</th><th>Min. Deposit</th><th>Type</th><th>Review</th></tr>
            </thead>
            <tbody>
              {savingsAccounts.map(bank => (
                <tr key={bank.slug}>
                  <td className="font-semibold text-white">{bank.name}</td>
                  <td className="text-[#22c55e] font-bold">{bank.effectiveAPY}</td>
                  <td>{bank.monthlyFee}</td>
                  <td>{bank.minDeposit}</td>
                  <td className="text-xs">{bank.branches === 'Online Only' ? 'Online' : 'Traditional'}</td>
                  <td><Link href={`/reviews/${bank.slug}`} className="text-[#3b82f6] no-underline hover:text-[#22c55e]">Review</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[#8b9dc3] text-xs mt-2">Rates shown are for illustration. Verify current rates directly with each institution.</p>
      </section>

      {/* How to Choose */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">How to Choose a Savings Account in {state.name}</h2>
        <div className="space-y-4">
          {[
            { title: 'Prioritize APY Over Branch Access', text: `High-yield online savings accounts offer APYs that are often 10 to 40 times higher than traditional bank savings rates in ${state.name}. If your primary goal is growing your savings, an online account is almost always the better choice.` },
            { title: 'Avoid Monthly Fees', text: `Many of the best savings accounts charge no monthly maintenance fees. Avoid accounts that charge fees unless you can consistently waive them. Even a $5 monthly fee costs $60 per year, which can offset interest earned on smaller balances.` },
            { title: 'Check Minimum Balance Requirements', text: `Some accounts require minimum balances to earn the advertised APY or avoid fees. If you are starting with a smaller amount, look for accounts with $0 minimum balance requirements.` },
            { title: 'Consider Access and Convenience', text: `Evaluate how you will deposit and withdraw money. Online banks typically offer electronic transfers, mobile check deposit, and ATM access through partner networks. If you regularly deposit cash, a local ${state.name} bank or credit union may be more practical.` },
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
        <h2 className="text-2xl font-bold text-white mb-4">Savings Accounts in Other States</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {neighborStates.map(s => (
            <Link key={s.slug} href={`/best-savings-accounts/${s.slug}`} className="no-underline">
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
          <Link href={`/best-mortgage-rates/${state.slug}`} className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best Mortgage Rates in {state.name}</span>
            </div>
          </Link>
          <Link href="/guides/how-to-open-a-savings-account" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">How to Open a Savings Account</span>
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
