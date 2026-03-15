import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import AdvertiserDisclosure from '../../components/AdvertiserDisclosure';
import FAQSection from '../../components/FAQSection';
import banks from '@/data/banks.json';

const AUTHORITY_LINKS = {
  fdic: 'https://www.fdic.gov/deposit/deposits/faq.html',
  cfpb: 'https://www.consumerfinance.gov/consumer-tools/bank-accounts/',
  bankrate: 'https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/',
  nerdwallet: 'https://www.nerdwallet.com/best/banking/savings-accounts',
};

type Bank = typeof banks[number];

export function generateStaticParams() {
  return banks.map(bank => ({ bank: bank.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ bank: string }> }): Promise<Metadata> {
  const { bank: bankSlug } = await params;
  const bank = banks.find(b => b.slug === bankSlug);
  if (!bank) return {};
  return {
    title: `${bank.name} Review 2026 — Rates, Fees, Pros & Cons`,
    description: `Read our complete ${bank.name} review covering savings rates, CD rates, checking accounts, fees, pros and cons. Founded ${bank.founded}, headquartered in ${bank.headquarters}.`,
  };
}

function getBankFAQs(bank: Bank) {
  return [
    {
      question: `Is ${bank.name} a good bank?`,
      answer: `${bank.name} has a rating of ${bank.rating}/5 on our scale. ${bank.pros[0]}. However, ${bank.cons[0].toLowerCase()}. Whether it is right for you depends on your specific banking needs and priorities.`
    },
    {
      question: `What is the savings account APY at ${bank.name}?`,
      answer: `${bank.name} currently offers a savings APY of ${bank.savingsAPY}. ${parseFloat(bank.savingsAPY) >= 3.5 ? 'This is a competitive rate compared to the national average.' : 'Online banks may offer higher rates, though ' + bank.name + ' provides other benefits like branch access.'} Rates are subject to change. Verify current rates directly with ${bank.name}.`
    },
    {
      question: `Does ${bank.name} charge monthly fees?`,
      answer: `${bank.checkingMonthlyFee === '$0' || bank.checkingMonthlyFee === 'N/A' ? bank.name + ' offers checking accounts with no monthly maintenance fee.' : bank.name + ' charges a ' + bank.checkingMonthlyFee + ' monthly maintenance fee on its standard checking account, though this can often be waived by meeting certain requirements such as maintaining a minimum balance or setting up direct deposit.'}`
    },
    {
      question: `What products does ${bank.name} offer?`,
      answer: `${bank.name} offers ${bank.products.join(', ')}. ${bank.branches === 'Online Only' ? 'As an online-only bank, all services are available through their website and mobile app.' : 'Services are available online, through the mobile app, and at ' + bank.branches + ' branches nationwide.'}`
    },
    {
      question: `Where is ${bank.name} headquartered?`,
      answer: `${bank.name} is headquartered in ${bank.headquarters}. Founded in ${bank.founded}, ${bank.fullName} has grown to manage ${bank.totalAssets} in total assets. ${bank.branches === 'Online Only' ? 'It operates exclusively online with no physical branch locations.' : 'It operates ' + bank.branches + ' branches.'}`
    }
  ];
}

export default async function BankReviewPage({ params }: { params: Promise<{ bank: string }> }) {
  const { bank: bankSlug } = await params;
  const bank = banks.find(b => b.slug === bankSlug);
  if (!bank) notFound();

  const faqs = getBankFAQs(bank);
  const isOnline = bank.branches === 'Online Only';

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { label: 'Banking Deals', href: '/banking-deals' },
        { label: `${bank.name} Review` }
      ]} />
      <AdvertiserDisclosure />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {bank.name} Review 2026
      </h1>
      <p className="text-[#8b9dc3] text-lg mb-8">
        {bank.description}
      </p>

      {/* Quick Facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Founded', value: String(bank.founded) },
          { label: 'Headquarters', value: bank.headquarters },
          { label: 'Total Assets', value: bank.totalAssets },
          { label: 'Branches', value: bank.branches },
        ].map((fact, idx) => (
          <div key={idx} className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 text-center">
            <p className="text-[#8b9dc3] text-xs uppercase tracking-wider mb-1">{fact.label}</p>
            <p className="text-white font-bold">{fact.value}</p>
          </div>
        ))}
      </div>

      {/* Rating */}
      <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6 mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">BankingDeal Rating</h2>
          <p className="text-[#8b9dc3] text-sm mt-1">Based on rates, fees, features, and customer satisfaction</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-[#22c55e]">{bank.rating}</p>
          <p className="text-[#8b9dc3] text-xs">out of 5.0</p>
        </div>
      </div>

      {/* Rates Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Rates &amp; Fees</h2>
        <div className="overflow-x-auto rounded-lg border border-[#2a3a4e]">
          <table>
            <thead>
              <tr><th>Product</th><th>Rate / Fee</th></tr>
            </thead>
            <tbody>
              <tr><td className="text-white">Savings APY</td><td className="text-[#22c55e] font-bold">{bank.savingsAPY}</td></tr>
              <tr><td className="text-white">12-Month CD APY</td><td className="text-[#22c55e] font-bold">{bank.cdAPY12Month}</td></tr>
              <tr><td className="text-white">Checking Monthly Fee</td><td>{bank.checkingMonthlyFee}</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-[#8b9dc3] text-xs mt-2">
          Rates shown are for illustration. Verify current rates directly with {bank.name}.{' '}
          <a href={AUTHORITY_LINKS.bankrate} target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-[#22c55e] no-underline">
            Compare to national averages on Bankrate.
          </a>
        </p>
      </section>

      {/* Safety / FDIC callout */}
      <section className="mb-10">
        <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5 text-sm text-[#8b9dc3] leading-relaxed">
          <span className="text-white font-semibold">Deposit Safety: </span>
          {bank.name} is{' '}
          <a href={AUTHORITY_LINKS.fdic} target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-[#22c55e] no-underline">
            FDIC-insured
          </a>
          , protecting deposits up to $250,000 per depositor, per institution.
          For questions about consumer rights or to file a complaint, visit the{' '}
          <a href={AUTHORITY_LINKS.cfpb} target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-[#22c55e] no-underline">
            Consumer Financial Protection Bureau
          </a>.
          For additional independent comparisons, see{' '}
          <a href={AUTHORITY_LINKS.nerdwallet} target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-[#22c55e] no-underline">
            NerdWallet
          </a>.
        </div>
      </section>

      {/* Products */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Products Offered</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {bank.products.map((product, idx) => (
            <div key={idx} className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-3 text-center">
              <span className="text-white text-sm">{product}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pros &amp; Cons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
            <h3 className="text-lg font-bold text-[#22c55e] mb-4">Pros</h3>
            <ul className="space-y-3">
              {bank.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#22c55e] mt-0.5 flex-shrink-0">+</span>
                  <span className="text-[#8b9dc3]">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
            <h3 className="text-lg font-bold text-red-400 mb-4">Cons</h3>
            <ul className="space-y-3">
              {bank.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">-</span>
                  <span className="text-[#8b9dc3]">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Our Verdict</h2>
        <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
          <p className="text-[#8b9dc3] leading-relaxed">
            {bank.name} {bank.rating >= 4.3 ? 'is an excellent choice' : bank.rating >= 4.0 ? 'is a solid choice' : bank.rating >= 3.7 ? 'is a decent option' : 'may work for some customers'} for
            {isOnline ? ' those who prefer online banking and want competitive rates without monthly fees.' : ` those who value ${bank.branches} branch locations and a full suite of banking products.`}
            {' '}{bank.pros[0]}, making it {bank.rating >= 4.0 ? 'a strong contender' : 'worth considering'} in the {isOnline ? 'online banking' : 'traditional banking'} space.
            {parseFloat(bank.savingsAPY) >= 3.5 ? ` With a savings APY of ${bank.savingsAPY}, it offers competitive returns on your deposits.` : ` While savings rates at ${bank.savingsAPY} are lower than online competitors, the convenience of branch access and comprehensive product offerings may offset this for many customers.`}
          </p>
        </div>
      </section>

      {/* Internal Links */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/guides/how-to-open-a-savings-account" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">How to Open a Savings Account</span>
            </div>
          </Link>
          <Link href="/guides/what-is-a-cd-certificate-of-deposit" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">What Is a CD?</span>
            </div>
          </Link>
          <Link href="/best-savings-accounts/california" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Compare Savings Accounts by State</span>
            </div>
          </Link>
          <Link href="/best-credit-cards/cash-back" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">Best Cash Back Credit Cards</span>
            </div>
          </Link>
        </div>
      </section>

      <FAQSection faqs={faqs} />
    </div>
  );
}
