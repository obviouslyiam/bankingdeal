import Link from 'next/link';
import banks from '@/data/banks.json';

const topOnlineBanks = banks.filter(b => b.branches === "Online Only" && b.savingsAPY !== "N/A").slice(0, 6);

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Compare Bank Rates, Accounts &amp; Financial Products
        </h1>
        <p className="text-xl text-[#8b9dc3] max-w-3xl mx-auto mb-10">
          Find the best CD rates, savings accounts, credit cards, and mortgage rates from top banks. Make smarter financial decisions with side-by-side comparisons.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/bank-rates" className="inline-block rounded-lg bg-[#22c55e] px-6 py-3 text-white font-semibold no-underline hover:bg-[#16a34a] transition-colors">
            Compare Bank Rates
          </Link>
          <Link href="/banking-deals" className="inline-block rounded-lg border border-[#3b82f6] px-6 py-3 text-[#3b82f6] font-semibold no-underline hover:bg-[#3b82f6] hover:text-white transition-colors">
            Browse Banking Deals
          </Link>
        </div>
      </section>

      {/* Top Savings Rates */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Top High-Yield Savings Rates</h2>
        <div className="overflow-x-auto rounded-lg border border-[#2a3a4e]">
          <table>
            <thead>
              <tr>
                <th>Bank</th>
                <th>Savings APY</th>
                <th>Monthly Fee</th>
                <th>12-Month CD APY</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {topOnlineBanks.map(bank => (
                <tr key={bank.slug}>
                  <td className="font-semibold text-white">{bank.name}</td>
                  <td className="text-[#22c55e] font-bold">{bank.savingsAPY}</td>
                  <td>{bank.checkingMonthlyFee}</td>
                  <td>{bank.cdAPY12Month}</td>
                  <td>
                    <Link href={`/reviews/${bank.slug}`} className="text-[#3b82f6] no-underline hover:text-[#22c55e]">
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Category Cards */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Explore by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Best CD Rates', desc: 'Compare certificate of deposit rates by state. Find the highest APY for your savings.', href: '/bank-rates', icon: '% ' },
            { title: 'Best Savings Accounts', desc: 'High-yield savings accounts with competitive APY from online and traditional banks.', href: '/bank-rates', icon: '$ ' },
            { title: 'Best Credit Cards', desc: 'Cash back, travel rewards, balance transfer, and more. Find the right card for you.', href: '/banking-deals', icon: '* ' },
            { title: 'Mortgage Rates', desc: 'Current mortgage rates by state. Compare fixed and adjustable rate options.', href: '/bank-rates', icon: '^ ' },
            { title: 'Bank Reviews', desc: 'In-depth reviews of 30 major banks including rates, fees, pros, and cons.', href: '/banking-deals', icon: '# ' },
            { title: 'Financial Guides', desc: 'Expert guides on credit scores, budgeting, saving, and making the most of your money.', href: '/personal-finance', icon: '> ' },
          ].map((cat, idx) => (
            <Link key={idx} href={cat.href} className="no-underline group">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 hover:border-[#22c55e] transition-colors h-full">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#22c55e] transition-colors">{cat.title}</h3>
                <p className="text-[#8b9dc3] text-sm leading-relaxed">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Banks */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Popular Bank Reviews</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {banks.slice(0, 10).map(bank => (
            <Link key={bank.slug} href={`/reviews/${bank.slug}`} className="no-underline">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 text-center hover:border-[#22c55e] transition-colors">
                <p className="text-white font-semibold text-sm">{bank.name}</p>
                <p className="text-[#22c55e] text-xs mt-1">{bank.savingsAPY} APY</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-white mb-3">Top States for CD Rates</h3>
            <ul className="space-y-1">
              {['california', 'texas', 'new-york', 'florida', 'illinois'].map(s => (
                <li key={s}><Link href={`/best-cd-rates/${s}`} className="text-[#8b9dc3] no-underline hover:text-white capitalize">{s.replace(/-/g, ' ')}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Top States for Savings</h3>
            <ul className="space-y-1">
              {['california', 'texas', 'new-york', 'florida', 'ohio'].map(s => (
                <li key={s}><Link href={`/best-savings-accounts/${s}`} className="text-[#8b9dc3] no-underline hover:text-white capitalize">{s.replace(/-/g, ' ')}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Credit Card Categories</h3>
            <ul className="space-y-1">
              {['cash-back', 'travel-rewards', 'balance-transfer', 'no-annual-fee', '0-apr'].map(s => (
                <li key={s}><Link href={`/best-credit-cards/${s}`} className="text-[#8b9dc3] no-underline hover:text-white capitalize">{s.replace(/-/g, ' ')}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Popular Guides</h3>
            <ul className="space-y-1">
              <li><Link href="/guides/how-to-improve-your-credit-score" className="text-[#8b9dc3] no-underline hover:text-white">Improve Credit Score</Link></li>
              <li><Link href="/guides/understanding-apy-vs-apr" className="text-[#8b9dc3] no-underline hover:text-white">APY vs APR</Link></li>
              <li><Link href="/guides/what-is-a-cd-certificate-of-deposit" className="text-[#8b9dc3] no-underline hover:text-white">What Is a CD?</Link></li>
              <li><Link href="/guides/best-budgeting-strategies" className="text-[#8b9dc3] no-underline hover:text-white">Budgeting Strategies</Link></li>
              <li><Link href="/guides/how-credit-card-rewards-work" className="text-[#8b9dc3] no-underline hover:text-white">Credit Card Rewards</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
