import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import AdvertiserDisclosure from '../../components/AdvertiserDisclosure';
import FAQSection from '../../components/FAQSection';
import cities from '@/data/cities.json';

type City = typeof cities[number];

export function generateStaticParams() {
  return cities.map(city => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find(c => c.slug === citySlug);
  if (!city) return {};
  return {
    title: `Best Banks in ${city.city}, ${city.stateAbbr} (${new Date().getFullYear()}) — Top Local & Online Banks`,
    description: `Compare the best banks in ${city.city}, ${city.state}. Find top-rated local branches, the highest APY savings accounts, and the best checking accounts for ${city.city} residents.`,
    openGraph: {
      title: `Best Banks in ${city.city}, ${city.stateAbbr} — ${new Date().getFullYear()}`,
      description: `Find the top banks serving ${city.city} residents — comparing local branch networks, rates, fees, and digital banking features.`,
    },
  };
}

function getFAQs(city: City) {
  return [
    {
      question: `What is the best bank in ${city.city}?`,
      answer: `The best bank in ${city.city} depends on your priorities. For branch access, ${city.topBanks[0].name} and ${city.topBanks[1].name} have the largest local networks with ${city.topBanks[0].localBranches} and ${city.topBanks[1].localBranches} branches respectively. For the highest savings APY, online banks like Ally Bank, SoFi, or Synchrony Bank consistently offer rates above 4.00% with no monthly fees.`
    },
    {
      question: `Which banks have the most branches in ${city.city}?`,
      answer: `${city.topBanks.slice(0, 3).map(b => `${b.name} (${b.localBranches} branches)`).join(', ')} are among the most accessible banks with physical locations throughout ${city.city}. Branch counts can change; verify current locations on each bank's website.`
    },
    {
      question: `Should I use a local bank or an online bank in ${city.city}?`,
      answer: `It depends on your banking habits. Local banks like ${city.topBanks[0].name} offer in-person service and convenient branch access across ${city.city}, which is helpful for cash deposits, notary services, and complex financial needs. Online banks like Ally or Marcus offer rates 10 to 40 times higher than traditional savings rates. Many ${city.city} residents keep a local checking account for day-to-day banking and an online high-yield savings account to maximize their returns.`
    },
    {
      question: `Are there any fees I should watch for at banks in ${city.city}?`,
      answer: `Common fees at traditional banks in ${city.city} include monthly maintenance fees ($5 to $15 per month), out-of-network ATM fees ($2.50 to $5 per transaction), overdraft fees ($25 to $35), and foreign transaction fees (1% to 3%). Many online banks and some local banks waive these fees entirely or with qualifying activity like a minimum balance or direct deposit.`
    },
    {
      question: `Are bank deposits in ${city.city} insured?`,
      answer: `Yes. All FDIC-member banks — including every major bank serving ${city.city} — insure deposits up to $250,000 per depositor, per institution. Credit unions in ${city.city} are covered by NCUA insurance up to the same limit. This coverage applies to checking, savings, CDs, and money market accounts.`
    },
    {
      question: `What is the average cost of living in ${city.city} and how does it affect my banking needs?`,
      answer: `${city.city} has a ${city.costOfLiving.toLowerCase()} cost of living with a median home price of approximately $${city.medianHomePrice.toLocaleString()}. In higher cost-of-living areas, it is especially important to minimize banking fees and maximize interest on savings. Look for accounts with no monthly maintenance fees and the highest possible APY on your savings balances.`
    }
  ];
}

function getBankingTips(city: City) {
  return [
    {
      title: `Match Your Bank to Your ${city.city} Lifestyle`,
      text: `${city.city} residents have varied banking needs depending on their neighborhood, commute patterns, and financial goals. If you work downtown and need to deposit cash frequently, a bank with strong ${city.city} branch coverage is a priority. If you primarily bank digitally and want to maximize interest on your savings, an online bank will almost always be the better choice for your deposit accounts.`
    },
    {
      title: 'Separate Your Checking and Savings Strategy',
      text: `One of the most effective strategies for ${city.city} residents is to maintain a no-fee local checking account for everyday transactions and direct deposit, while keeping your savings in a high-yield online account earning 4% or more. This approach gives you branch access when you need it without sacrificing interest income on your idle cash.`
    },
    {
      title: 'Look Beyond the Big Banks',
      text: `While national banks like Chase, Bank of America, and Wells Fargo dominate the branch landscape in ${city.city}, local credit unions and community banks often offer lower fees, better loan rates, and more personalized service. It is worth checking local credit unions for which you qualify — many offer surprisingly competitive rates on savings and mortgages.`
    },
    {
      title: 'Evaluate ATM Access in Your Neighborhood',
      text: `ATM fees add up fast. Before choosing a bank in ${city.city}, check how many fee-free ATMs are near your home and workplace. Online banks often reimburse ATM fees or provide access to large networks like Allpoint (55,000+ ATMs). Chase and Bank of America have dense ATM coverage across ${city.city} if you prefer a traditional bank with strong local ATM presence.`
    }
  ];
}

export default async function BestBanksCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = cities.find(c => c.slug === citySlug);
  if (!city) notFound();

  const faqs = getFAQs(city);
  const tips = getBankingTips(city);

  const nearbyCities = cities
    .filter(c => c.slug !== city.slug && c.state === city.state)
    .slice(0, 4)
    .concat(cities.filter(c => c.slug !== city.slug && c.state !== city.state).slice(0, 4))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { label: 'Best Banks', href: '/best-banks' },
        { label: `Best Banks in ${city.city}, ${city.stateAbbr}` }
      ]} />
      <AdvertiserDisclosure />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Best Banks in {city.city}, {city.stateAbbr} ({new Date().getFullYear()})
      </h1>
      <p className="text-[#8b9dc3] text-lg mb-8">
        Compare the top banks serving {city.city} residents — local branch networks, high-yield savings rates, checking account fees, and digital banking features. Whether you want convenient branch access or the highest APY, find the right bank for your needs.
      </p>

      {/* City Overview */}
      <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Banking in {city.city}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#22c55e]">{city.topBanks.length}</p>
            <p className="text-[#8b9dc3] text-sm">Major Banks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#22c55e]">{city.population.toLocaleString()}</p>
            <p className="text-[#8b9dc3] text-sm">Population</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#22c55e]">${city.medianHomePrice.toLocaleString()}</p>
            <p className="text-[#8b9dc3] text-sm">Median Home Price</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#22c55e]">{city.costOfLiving}</p>
            <p className="text-[#8b9dc3] text-sm">Cost of Living</p>
          </div>
        </div>
        <p className="text-[#8b9dc3] leading-relaxed">
          {city.city} is home to a competitive banking market with both major national banks and strong regional institutions. With a population of {city.population.toLocaleString()} and {city.costOfLiving.toLowerCase()} cost of living, {city.city} residents benefit from broad branch coverage and access to every major online bank. The biggest banks in {city.city} include {city.topBanks.slice(0, 3).map(b => b.name).join(', ')}, each offering extensive local branch networks alongside national banks competing on savings rates and digital features.
        </p>
      </div>

      {/* Bank Comparison Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Top Banks in {city.city} by Branch Coverage</h2>
        <div className="overflow-x-auto rounded-lg border border-[#2a3a4e]">
          <table>
            <thead>
              <tr>
                <th>Bank</th>
                <th>Local Branches</th>
                <th>Best For</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {city.topBanks.map((bank, idx) => (
                <tr key={bank.slug}>
                  <td className="font-semibold text-white">
                    {idx === 0 && (
                      <span className="inline-block bg-[#22c55e] text-black text-xs font-bold px-2 py-0.5 rounded mr-2">#1</span>
                    )}
                    {bank.name}
                  </td>
                  <td className="text-[#22c55e] font-bold">{bank.localBranches}</td>
                  <td className="text-[#8b9dc3] text-sm">
                    {idx === 0 ? 'Overall best coverage' :
                     idx === 1 ? 'Digital banking' :
                     idx === 2 ? 'Checking accounts' :
                     idx === 3 ? 'Savings & CDs' :
                     idx === 4 ? 'Business banking' :
                     'Community banking'}
                  </td>
                  <td>
                    <Link href={`/reviews/${bank.slug}`} className="text-[#3b82f6] no-underline hover:text-[#22c55e]">
                      Full Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[#8b9dc3] text-xs mt-2">Branch counts are approximate. Verify current branch locations at each bank&apos;s website.</p>
      </section>

      {/* High-Yield Savings Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Best Savings Accounts for {city.city} Residents</h2>
        <p className="text-[#8b9dc3] mb-6 leading-relaxed">
          {city.city} residents can access high-yield savings accounts from online banks regardless of physical location. These accounts consistently offer APYs of 4.00% or higher — far above the national average of 0.45% and well above rates offered by most local banks in {city.city}. All are FDIC insured and available to {city.stateAbbr} residents.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { name: 'Ally Bank', apy: '4.00%', fee: 'None', slug: 'ally-bank' },
            { name: 'Marcus by Goldman Sachs', apy: '4.00%', fee: 'None', slug: 'marcus-by-goldman-sachs' },
            { name: 'Synchrony Bank', apy: '4.10%', fee: 'None', slug: 'synchrony-bank' },
          ].map(bank => (
            <div key={bank.slug} className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4">
              <p className="font-semibold text-white mb-1">{bank.name}</p>
              <p className="text-[#22c55e] text-2xl font-bold mb-1">{bank.apy} APY</p>
              <p className="text-[#8b9dc3] text-sm mb-3">Monthly fee: {bank.fee}</p>
              <Link href={`/reviews/${bank.slug}`} className="text-[#3b82f6] text-sm no-underline hover:text-[#22c55e]">
                Full Review
              </Link>
            </div>
          ))}
        </div>
        <Link href={`/best-savings-accounts/${city.stateSlug}`} className="no-underline">
          <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
            <span className="text-[#3b82f6] text-sm">See all best savings accounts in {city.state}</span>
          </div>
        </Link>
      </section>

      {/* Banking Tips */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">How to Choose the Best Bank in {city.city}</h2>
        <p className="text-[#8b9dc3] mb-6 leading-relaxed">
          Choosing the right bank in {city.city} comes down to four key factors: branch and ATM access, account fees, interest rates, and digital banking quality. Most {city.city} residents will benefit most from a two-bank strategy — using a local bank for everyday transactions and an online bank for savings. Here is what to consider:
        </p>
        <div className="space-y-4">
          {tips.map((tip, idx) => (
            <div key={idx} className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5">
              <h3 className="text-lg font-semibold text-white mb-2">{tip.title}</h3>
              <p className="text-[#8b9dc3] leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Look For — Educational Content */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Understanding Bank Account Types in {city.city}</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Checking Accounts</h3>
            <p className="text-[#8b9dc3] leading-relaxed mb-3">
              Checking accounts are the workhorse of everyday banking. In {city.city}, the best checking accounts offer no monthly maintenance fees (or easily waivable fees), a large fee-free ATM network, and a solid mobile banking app. Chase Total Checking and Bank of America Advantage Banking are popular in {city.city} for their widespread branch and ATM access, though both charge monthly fees unless you meet qualifying criteria like minimum balances or direct deposits.
            </p>
            <p className="text-[#8b9dc3] leading-relaxed">
              For truly fee-free checking, Ally Bank, Capital One 360, and Discover Bank offer checking accounts with no monthly fees and no minimum balance requirements. These online options are ideal for {city.city} residents who rarely need branch services.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">High-Yield Savings Accounts</h3>
            <p className="text-[#8b9dc3] leading-relaxed mb-3">
              The difference between a traditional savings account and a high-yield online savings account can be dramatic. While local {city.city} banks typically offer savings APYs of 0.01% to 0.10%, online banks are currently offering 4.00% to 4.50% APY on the same FDIC-insured deposits. On a $10,000 balance, that is the difference between earning $10 per year and $400 per year.
            </p>
            <p className="text-[#8b9dc3] leading-relaxed">
              The best high-yield savings accounts available to {city.city} residents include Ally Bank, Marcus by Goldman Sachs, Synchrony Bank, and Bread Savings — all offering competitive rates with no monthly fees and no minimum balance requirements.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Certificates of Deposit (CDs)</h3>
            <p className="text-[#8b9dc3] leading-relaxed mb-3">
              CDs lock your money for a fixed term in exchange for a guaranteed interest rate, typically higher than savings account rates. In the current rate environment, 12-month CDs are offering 4.25% to 4.75% APY from top banks. {city.city} residents can access CDs from both local banks and online banks, with online institutions typically offering the most competitive rates.
            </p>
            <p className="text-[#8b9dc3] leading-relaxed">
              Consider building a CD ladder by spreading deposits across multiple terms — for example, putting equal amounts into 6-month, 12-month, 18-month, and 24-month CDs. This strategy provides regular access to a portion of your savings while still earning competitive long-term rates.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Mortgages and Home Loans</h3>
            <p className="text-[#8b9dc3] leading-relaxed">
              With {city.city}&apos;s median home price at approximately ${city.medianHomePrice.toLocaleString()}, finding the right mortgage lender is critical. The major banks with branches in {city.city} — including {city.topBanks[0].name} and {city.topBanks[1].name} — all offer mortgage products, as do online lenders and credit unions. Compare rates from at least three lenders before committing. Even a 0.25% difference in your mortgage rate can translate to tens of thousands of dollars over the life of a 30-year loan.
            </p>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Best Banks in Other Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {nearbyCities.map(c => (
            <Link key={c.slug} href={`/best-banks/${c.slug}`} className="no-underline">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-3 text-center hover:border-[#22c55e] transition-colors">
                <span className="text-white text-sm">{c.city}, {c.stateAbbr}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Related State Pages */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">More Banking Resources for {city.state}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href={`/best-savings-accounts/${city.stateSlug}`} className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best Savings Accounts in {city.state}</span>
            </div>
          </Link>
          <Link href={`/best-cd-rates/${city.stateSlug}`} className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best CD Rates in {city.state}</span>
            </div>
          </Link>
          <Link href={`/best-mortgage-rates/${city.stateSlug}`} className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best Mortgage Rates in {city.state}</span>
            </div>
          </Link>
          <Link href="/calculators/mortgage-calculator" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Mortgage Payment Calculator</span>
            </div>
          </Link>
        </div>
      </section>

      <FAQSection faqs={faqs} />
    </div>
  );
}
