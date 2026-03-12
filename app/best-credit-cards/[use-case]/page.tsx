import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import AdvertiserDisclosure from '../../components/AdvertiserDisclosure';
import FAQSection from '../../components/FAQSection';
import creditCardCategories from '@/data/credit-card-categories.json';

type Category = typeof creditCardCategories[number];

export function generateStaticParams() {
  return creditCardCategories.map(cat => ({ 'use-case': cat.slug }));
}

export function generateMetadata({ params }: { params: { 'use-case': string } }): Metadata {
  const category = creditCardCategories.find(c => c.slug === params['use-case']);
  if (!category) return {};
  return {
    title: `Best ${category.name} 2026 — Top Picks & Comparison`,
    description: `Compare the best ${category.name.toLowerCase()} for 2026. See rewards rates, annual fees, intro APR offers, and sign-up bonuses from top issuers.`,
  };
}

function getFAQs(category: Category) {
  const catName = category.name.toLowerCase();
  return [
    {
      question: `What is the best ${catName.replace(' credit cards', ' credit card')} in 2026?`,
      answer: `The best ${catName.replace(' credit cards', ' credit card')} depends on your spending patterns and preferences. ${category.cards[0].name} from ${category.cards[0].issuer} is our top pick with ${category.cards[0].rewardRate} rewards and a ${category.cards[0].annualFee} annual fee. ${category.cards[1]?.name || 'Other top options'} is also an excellent choice. Compare features below to find the best fit.`
    },
    {
      question: `Are ${catName} worth it?`,
      answer: `${category.name} can be very worthwhile if they match your spending habits. ${category.description.split('.')[0]}. The key is choosing a card whose bonus categories align with where you spend the most money, and always paying your balance in full to avoid interest charges that negate any rewards.`
    },
    {
      question: `What credit score do I need for ${catName}?`,
      answer: `Most ${catName} require a good to excellent credit score (670+) for approval. Premium cards with higher rewards may require scores of 720 or above. ${category.slug === 'bad-credit' || category.slug === 'secured' || category.slug === 'building-credit' ? 'However, the cards in this category are specifically designed for applicants with lower credit scores or limited credit history.' : 'If your credit score is below 670, consider a secured card or credit-building card first.'}`
    },
    {
      question: `How do I maximize rewards with ${catName}?`,
      answer: `To maximize rewards, use your ${catName.replace(' credit cards', ' card')} for all eligible purchases in bonus categories, take advantage of sign-up bonuses by meeting minimum spending requirements with planned purchases, and pay your balance in full every month. Consider pairing with other cards to maximize earnings across all spending categories.`
    }
  ];
}

export default function BestCreditCardsPage({ params }: { params: { 'use-case': string } }) {
  const category = creditCardCategories.find(c => c.slug === params['use-case']);
  if (!category) notFound();

  const faqs = getFAQs(category);
  const otherCategories = creditCardCategories.filter(c => c.slug !== category.slug).slice(0, 6);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { label: 'Banking Deals', href: '/banking-deals' },
        { label: category.name }
      ]} />
      <AdvertiserDisclosure />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Best {category.name} — 2026
      </h1>
      <p className="text-[#8b9dc3] text-lg mb-8">
        {category.description}
      </p>

      {/* Card Listings */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-6">Top Picks</h2>
        <div className="space-y-6">
          {category.cards.map((card, idx) => (
            <div key={idx} className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium text-[#22c55e] uppercase tracking-wider">#{idx + 1} Pick</span>
                  <h3 className="text-xl font-bold text-white mt-1">{card.name}</h3>
                  <p className="text-[#8b9dc3] text-sm">{card.issuer}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-[#8b9dc3] text-xs uppercase tracking-wider mb-1">Rewards</p>
                  <p className="text-white font-semibold text-sm">{card.rewardRate}</p>
                </div>
                <div>
                  <p className="text-[#8b9dc3] text-xs uppercase tracking-wider mb-1">Annual Fee</p>
                  <p className="text-white font-semibold text-sm">{card.annualFee}</p>
                </div>
                <div>
                  <p className="text-[#8b9dc3] text-xs uppercase tracking-wider mb-1">Intro APR</p>
                  <p className="text-white font-semibold text-sm">{card.introAPR}</p>
                </div>
                <div>
                  <p className="text-[#8b9dc3] text-xs uppercase tracking-wider mb-1">Regular APR</p>
                  <p className="text-white font-semibold text-sm">{card.regularAPR}</p>
                </div>
              </div>
              {card.bonus && (
                <div className="rounded border border-[#2a3a4e] bg-[#0f1729] p-3 mt-3">
                  <p className="text-[#22c55e] text-sm font-medium">Welcome Bonus: {card.bonus}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Comparison</h2>
        <div className="overflow-x-auto rounded-lg border border-[#2a3a4e]">
          <table>
            <thead>
              <tr><th>Card</th><th>Rewards Rate</th><th>Annual Fee</th><th>Intro APR</th></tr>
            </thead>
            <tbody>
              {category.cards.map((card, idx) => (
                <tr key={idx}>
                  <td className="font-semibold text-white">{card.name}</td>
                  <td className="text-[#22c55e]">{card.rewardRate}</td>
                  <td>{card.annualFee}</td>
                  <td>{card.introAPR}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How to Choose */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">How to Choose the Right {category.name.replace(' Credit Cards', ' Card')}</h2>
        <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
          <div className="space-y-4 text-[#8b9dc3] leading-relaxed">
            <p>
              Choosing the right {category.name.toLowerCase().replace(' credit cards', ' credit card')} starts with understanding your spending patterns. Review your last few months of credit card or bank statements to identify where most of your money goes. The best card is one whose bonus categories align with your highest spending areas.
            </p>
            <p>
              Next, consider the annual fee. A card with a $95 annual fee needs to generate at least $95 more in rewards than a no-annual-fee alternative to be worthwhile. Factor in both the ongoing rewards and any welcome bonus when making this calculation.
            </p>
            <p>
              Finally, look at the redemption options. Cash back is the simplest, while points and miles can offer higher value if you are willing to spend time optimizing redemptions. The most important rule: always pay your balance in full every month. No reward is worth paying 20%+ interest.
            </p>
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Explore Other Card Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {otherCategories.map(cat => (
            <Link key={cat.slug} href={`/best-credit-cards/${cat.slug}`} className="no-underline group">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 text-center hover:border-[#22c55e] transition-colors">
                <span className="text-white text-sm group-hover:text-[#22c55e]">{cat.name.replace(' Credit Cards', '')}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/guides/how-credit-card-rewards-work" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">How Credit Card Rewards Work</span>
            </div>
          </Link>
          <Link href="/guides/how-to-improve-your-credit-score" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">How to Improve Your Credit Score</span>
            </div>
          </Link>
          <Link href="/guides/how-to-build-credit-from-scratch" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">How to Build Credit from Scratch</span>
            </div>
          </Link>
          <Link href="/banking-deals" className="no-underline">
            <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
              <span className="text-[#3b82f6] text-sm">All Banking Deals</span>
            </div>
          </Link>
        </div>
      </section>

      <FAQSection faqs={faqs} />
    </div>
  );
}
