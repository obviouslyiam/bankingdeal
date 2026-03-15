import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import states from '@/data/states.json';
import banks from '@/data/banks.json';

export const metadata: Metadata = {
  title: 'Bank Rates — CD Rates, Savings Rates, Money Market & Mortgage Rates',
  description: 'Compare the best CD rates, savings account APYs, money market rates, and mortgage rates by state. Find the highest bank rates available today.',
};

const onlineBanks = banks.filter(b => b.branches === "Online Only" && b.savingsAPY !== "N/A").sort((a, b) => parseFloat(b.savingsAPY) - parseFloat(a.savingsAPY));

export default function BankRatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: 'Bank Rates' }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Bank Rates</h1>
      <p className="text-[#8b9dc3] text-lg mb-10 max-w-3xl">
        Compare CD rates, savings account APYs, money market rates, and mortgage rates from top banks. Browse by state or explore our national rate comparisons.
      </p>

      {/* Rate context callout */}
      <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5 mb-10 text-sm text-[#8b9dc3] leading-relaxed">
        All savings accounts and CDs listed here are at{' '}
        <a href="https://www.fdic.gov/resources/resolutions/bank-failures/failed-bank-list/" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-[#22c55e] no-underline">
          FDIC-insured banks
        </a>
        , meaning deposits up to $250,000 per institution are federally protected.
        Rates move with{' '}
        <a href="https://www.federalreserve.gov/releases/h15/" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-[#22c55e] no-underline">
          Federal Reserve policy
        </a>
        {' '}— verify current rates directly with each institution before opening an account. For independent rate benchmarks, see{' '}
        <a href="https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-[#22c55e] no-underline">
          Bankrate
        </a>
        .
      </div>

      {/* National Rate Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">National High-Yield Savings Rates</h2>
        <div className="overflow-x-auto rounded-lg border border-[#2a3a4e]">
          <table>
            <thead>
              <tr><th>Bank</th><th>Savings APY</th><th>12-Month CD APY</th><th>Min. Deposit</th><th>Review</th></tr>
            </thead>
            <tbody>
              {onlineBanks.map(bank => (
                <tr key={bank.slug}>
                  <td className="font-semibold text-white">{bank.name}</td>
                  <td className="text-[#22c55e] font-bold">{bank.savingsAPY}</td>
                  <td>{bank.cdAPY12Month}</td>
                  <td>$0</td>
                  <td><Link href={`/reviews/${bank.slug}`} className="text-[#3b82f6] no-underline hover:text-[#22c55e]">Review</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[#8b9dc3] text-xs mt-2">
          Rates shown are for illustration. Verify current rates directly with each institution.{' '}
          <a href="https://www.bankrate.com/banking/cds/best-cd-rates/" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-[#22c55e] no-underline">
            See Bankrate for additional CD rate comparisons.
          </a>
        </p>
      </section>

      {/* CD Rates by State */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Best CD Rates by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {states.map(state => (
            <Link key={state.slug} href={`/best-cd-rates/${state.slug}`} className="no-underline">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-3 text-center hover:border-[#22c55e] transition-colors">
                <span className="text-white text-sm font-medium">{state.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Savings by State */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Best Savings Accounts by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {states.map(state => (
            <Link key={state.slug} href={`/best-savings-accounts/${state.slug}`} className="no-underline">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-3 text-center hover:border-[#3b82f6] transition-colors">
                <span className="text-white text-sm font-medium">{state.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mortgage Rates by State */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Best Mortgage Rates by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {states.map(state => (
            <Link key={state.slug} href={`/best-mortgage-rates/${state.slug}`} className="no-underline">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-3 text-center hover:border-[#22c55e] transition-colors">
                <span className="text-white text-sm font-medium">{state.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Rate guides */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Rate Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/guides/high-yield-savings-accounts-guide-2026" className="no-underline group">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5 hover:border-[#22c55e] transition-colors h-full">
              <h3 className="text-white font-semibold mb-2 group-hover:text-[#22c55e] transition-colors text-sm">High-Yield Savings Accounts Guide 2026</h3>
              <p className="text-[#8b9dc3] text-xs leading-relaxed">How they work, which banks win, and how to squeeze every dollar out of them.</p>
            </div>
          </Link>
          <Link href="/guides/cd-laddering-guide" className="no-underline group">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5 hover:border-[#22c55e] transition-colors h-full">
              <h3 className="text-white font-semibold mb-2 group-hover:text-[#22c55e] transition-colors text-sm">CD Laddering: Maximize Your Returns</h3>
              <p className="text-[#8b9dc3] text-xs leading-relaxed">Build a CD ladder for locked-in rates and rolling liquidity with real numbers.</p>
            </div>
          </Link>
          <Link href="/guides/fixed-vs-adjustable-rate-mortgage-guide" className="no-underline group">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5 hover:border-[#22c55e] transition-colors h-full">
              <h3 className="text-white font-semibold mb-2 group-hover:text-[#22c55e] transition-colors text-sm">Fixed vs Adjustable Rate Mortgages</h3>
              <p className="text-[#8b9dc3] text-xs leading-relaxed">The math, the scenarios, and the real answer for 2026.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
