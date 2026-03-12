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
      <section>
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
    </div>
  );
}
