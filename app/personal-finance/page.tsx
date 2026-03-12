import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import guides from '@/data/guides.json';
import creditCardCategories from '@/data/credit-card-categories.json';

export const metadata: Metadata = {
  title: 'Personal Finance — Credit Cards, Investing, Insurance, Budgeting & More',
  description: 'Your personal finance hub covering credit cards, investing, insurance, budgeting, retirement planning, and passive income strategies.',
};

export default function PersonalFinancePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: 'Personal Finance' }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Personal Finance</h1>
      <p className="text-[#8b9dc3] text-lg mb-10 max-w-3xl">
        Expert resources on credit cards, investing, insurance, budgeting, retirement planning, and building passive income. Make your money work harder for you.
      </p>

      {/* Guides */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Financial Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map(guide => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="no-underline group">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 hover:border-[#22c55e] transition-colors h-full">
                <span className="text-xs font-medium text-[#22c55e] uppercase tracking-wider">{guide.category}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2 group-hover:text-[#22c55e] transition-colors">{guide.title}</h3>
                <p className="text-[#8b9dc3] text-sm leading-relaxed">{guide.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Credit Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Credit Card Comparisons</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {creditCardCategories.map(cat => (
            <Link key={cat.slug} href={`/best-credit-cards/${cat.slug}`} className="no-underline group">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 text-center hover:border-[#22c55e] transition-colors">
                <p className="text-white font-medium text-sm group-hover:text-[#22c55e]">{cat.name.replace(' Credit Cards', '').replace(' Cards', '')}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Topic Areas */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Explore Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Credit & Credit Cards', items: [
              { label: 'How to Improve Your Credit Score', href: '/guides/how-to-improve-your-credit-score' },
              { label: 'How to Build Credit from Scratch', href: '/guides/how-to-build-credit-from-scratch' },
              { label: 'How Credit Card Rewards Work', href: '/guides/how-credit-card-rewards-work' },
              { label: 'Best Cash Back Cards', href: '/best-credit-cards/cash-back' },
              { label: 'Best Travel Rewards Cards', href: '/best-credit-cards/travel-rewards' },
            ]},
            { title: 'Banking & Savings', items: [
              { label: 'How to Open a Savings Account', href: '/guides/how-to-open-a-savings-account' },
              { label: 'What Is a CD?', href: '/guides/what-is-a-cd-certificate-of-deposit' },
              { label: 'Understanding APY vs APR', href: '/guides/understanding-apy-vs-apr' },
              { label: 'How to Choose a Checking Account', href: '/guides/how-to-choose-a-checking-account' },
              { label: 'Compare Bank Rates', href: '/bank-rates' },
            ]},
            { title: 'Budgeting & Planning', items: [
              { label: 'Best Budgeting Strategies', href: '/guides/best-budgeting-strategies' },
              { label: 'When to Refinance Your Mortgage', href: '/guides/when-to-refinance-your-mortgage' },
              { label: 'Fixed vs Variable Mortgage Rates', href: '/guides/fixed-vs-variable-mortgage-rates' },
              { label: 'Browse All Bank Reviews', href: '/banking-deals' },
              { label: 'Compare Mortgage Rates', href: '/best-mortgage-rates/california' },
            ]},
          ].map((topic, idx) => (
            <div key={idx} className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
              <h3 className="text-lg font-bold text-white mb-4">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.items.map((item, i) => (
                  <li key={i}><Link href={item.href} className="text-[#3b82f6] text-sm no-underline hover:text-[#22c55e]">{item.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
