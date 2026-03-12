import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import banks from '@/data/banks.json';
import creditCardCategories from '@/data/credit-card-categories.json';

export const metadata: Metadata = {
  title: 'Banking Deals — CD Accounts, Savings, Checking, Credit Cards & More',
  description: 'Find the best banking deals on CD accounts, savings accounts, checking accounts, mortgage deals, personal loans, and credit cards from top financial institutions.',
};

export default function BankingDealsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: 'Banking Deals' }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Banking Deals</h1>
      <p className="text-[#8b9dc3] text-lg mb-10 max-w-3xl">
        Explore the best banking deals including CD accounts, savings accounts, checking accounts, credit cards, mortgage deals, and personal loans from leading banks.
      </p>

      {/* Credit Card Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Best Credit Cards by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {creditCardCategories.map(cat => (
            <Link key={cat.slug} href={`/best-credit-cards/${cat.slug}`} className="no-underline group">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5 hover:border-[#22c55e] transition-colors h-full">
                <h3 className="text-white font-semibold mb-2 group-hover:text-[#22c55e] transition-colors text-sm">{cat.name}</h3>
                <p className="text-[#8b9dc3] text-xs leading-relaxed line-clamp-2">{cat.description.substring(0, 120)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bank Reviews */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Bank Reviews</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {banks.map(bank => (
            <Link key={bank.slug} href={`/reviews/${bank.slug}`} className="no-underline group">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 text-center hover:border-[#22c55e] transition-colors">
                <p className="text-white font-medium text-sm group-hover:text-[#22c55e]">{bank.name}</p>
                <p className="text-[#8b9dc3] text-xs mt-1">Rating: {bank.rating}/5</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deal Categories */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Deals by Product Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'CD Account Deals', desc: 'Lock in the highest CD rates from online and traditional banks. Compare terms from 3 months to 5 years.', links: [
              { label: 'Best CD Rates in California', href: '/best-cd-rates/california' },
              { label: 'Best CD Rates in Texas', href: '/best-cd-rates/texas' },
              { label: 'Best CD Rates in New York', href: '/best-cd-rates/new-york' },
            ]},
            { title: 'Savings Account Deals', desc: 'High-yield savings accounts with the best APY rates. No minimums, no fees, fully FDIC insured.', links: [
              { label: 'Best Savings in Florida', href: '/best-savings-accounts/florida' },
              { label: 'Best Savings in Illinois', href: '/best-savings-accounts/illinois' },
              { label: 'Best Savings in Ohio', href: '/best-savings-accounts/ohio' },
            ]},
            { title: 'Mortgage Deals', desc: 'Compare current mortgage rates by state. Fixed and adjustable rate options from top lenders.', links: [
              { label: 'Mortgage Rates in California', href: '/best-mortgage-rates/california' },
              { label: 'Mortgage Rates in Texas', href: '/best-mortgage-rates/texas' },
              { label: 'Fixed vs Variable Rates Guide', href: '/guides/fixed-vs-variable-mortgage-rates' },
            ]},
          ].map((deal, idx) => (
            <div key={idx} className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
              <h3 className="text-lg font-bold text-white mb-3">{deal.title}</h3>
              <p className="text-[#8b9dc3] text-sm mb-4 leading-relaxed">{deal.desc}</p>
              <ul className="space-y-2">
                {deal.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-[#3b82f6] text-sm no-underline hover:text-[#22c55e]">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
