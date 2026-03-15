import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import calculators from '@/data/calculators.json';

export const metadata: Metadata = {
  title: 'Free Financial Calculators — Savings, Mortgage, Retirement & More',
  description: 'Free online financial calculators for savings, mortgages, CDs, loans, retirement, and budgeting. Interactive tools with educational content and personalized results.',
};

const categoryOrder = ['Savings', 'Home', 'Loans', 'Debt', 'Budgeting', 'Retirement'];

const categoryDescriptions: Record<string, string> = {
  Savings: 'Calculate growth on savings accounts, CDs, and compound interest',
  Home: 'Mortgage payment calculations and home affordability tools',
  Loans: 'Personal loan, auto loan, and installment loan calculators',
  Debt: 'Payoff timelines and strategies for credit cards and other debt',
  Budgeting: 'Monthly budget planning and expense tracking',
  Retirement: 'Retirement savings projections and nest egg calculators',
};

export default function CalculatorsIndexPage() {
  const grouped = categoryOrder.reduce<Record<string, typeof calculators>>((acc, cat) => {
    acc[cat] = calculators.filter(c => c.category === cat);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: 'Calculators' }]} />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Free Financial Calculators
      </h1>
      <p className="text-[#8b9dc3] text-lg mb-10">
        Interactive tools to calculate savings growth, mortgage payments, loan costs, retirement projections, and more. Every calculator includes educational content and answers to common questions.
      </p>

      {categoryOrder.map(category => {
        const items = grouped[category];
        if (!items || items.length === 0) return null;
        return (
          <section key={category} className="mb-12">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white">{category} Calculators</h2>
              <p className="text-[#8b9dc3] text-sm mt-1">{categoryDescriptions[category]}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(calc => (
                <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="no-underline group">
                  <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-5 hover:border-[#22c55e] transition-colors">
                    <h3 className="text-white font-semibold mb-2 group-hover:text-[#22c55e] transition-colors">
                      {calc.title}
                    </h3>
                    <p className="text-[#8b9dc3] text-sm leading-relaxed">{calc.description}</p>
                    <p className="text-[#22c55e] text-sm mt-3">Use calculator &rarr;</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-8 rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
        <h2 className="text-xl font-bold text-white mb-3">About These Calculators</h2>
        <p className="text-[#8b9dc3] leading-relaxed">
          These calculators are provided for educational and planning purposes. Results are based on mathematical models using the inputs you provide. They do not account for taxes (except where noted), market volatility, changing interest rates, or individual circumstances. Always consult a qualified financial advisor before making major financial decisions.
        </p>
      </section>
    </div>
  );
}
