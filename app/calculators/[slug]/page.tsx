import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import FAQSection from '../../components/FAQSection';
import calculators from '@/data/calculators.json';
import SavingsCalculator from '../calculators/SavingsCalculator';
import CDCalculator from '../calculators/CDCalculator';
import MortgageCalculator from '../calculators/MortgageCalculator';
import LoanCalculator from '../calculators/LoanCalculator';
import CompoundInterestCalculator from '../calculators/CompoundInterestCalculator';
import DebtPayoffCalculator from '../calculators/DebtPayoffCalculator';
import BudgetCalculator from '../calculators/BudgetCalculator';
import RetirementCalculator from '../calculators/RetirementCalculator';
import CreditCardPayoffCalculator from '../calculators/CreditCardPayoffCalculator';
import EmergencyFundCalculator from '../calculators/EmergencyFundCalculator';
import { getCalculatorContent } from '../calculators/content';

export function generateStaticParams() {
  return calculators.map(calc => ({ slug: calc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const calc = calculators.find(c => c.slug === slug);
  if (!calc) return {};
  return {
    title: `${calc.title} — Free Online Tool`,
    description: calc.metaDescription,
    openGraph: {
      title: `${calc.title} | BankingDeal`,
      description: calc.metaDescription,
    },
  };
}

function getCalculatorComponent(slug: string) {
  switch (slug) {
    case 'savings-calculator': return <SavingsCalculator />;
    case 'cd-calculator': return <CDCalculator />;
    case 'mortgage-calculator': return <MortgageCalculator />;
    case 'loan-payment-calculator': return <LoanCalculator />;
    case 'compound-interest-calculator': return <CompoundInterestCalculator />;
    case 'debt-payoff-calculator': return <DebtPayoffCalculator />;
    case 'budget-calculator': return <BudgetCalculator />;
    case 'retirement-calculator': return <RetirementCalculator />;
    case 'credit-card-payoff-calculator': return <CreditCardPayoffCalculator />;
    case 'emergency-fund-calculator': return <EmergencyFundCalculator />;
    default: return null;
  }
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = calculators.find(c => c.slug === slug);
  if (!calc) notFound();

  const content = getCalculatorContent(slug);
  const calculatorComponent = getCalculatorComponent(slug);

  const otherCalculators = calculators.filter(c => c.slug !== slug).slice(0, 6);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { label: 'Calculators', href: '/calculators' },
        { label: calc.title }
      ]} />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {calc.title}
      </h1>
      <p className="text-[#8b9dc3] text-lg mb-8">
        {calc.description}
      </p>

      {/* Calculator Widget */}
      <div className="mb-10">
        {calculatorComponent}
      </div>

      {/* Educational Content */}
      <div className="prose-banking mb-10">
        {content.sections.map((section, idx) => (
          <section key={idx} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
            {section.paragraphs.map((para, pIdx) => (
              <p key={pIdx} className="text-[#8b9dc3] leading-relaxed mb-4">{para}</p>
            ))}
            {section.list && (
              <ul className="space-y-2 mb-4">
                {section.list.map((item, lIdx) => (
                  <li key={lIdx} className="flex items-start gap-2 text-[#8b9dc3]">
                    <span className="text-[#22c55e] mt-1 flex-shrink-0">&#10003;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Related Links */}
      {calc.relatedLinks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Related Tools & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {calc.relatedLinks.map(link => (
              <Link key={link.href} href={link.href} className="no-underline">
                <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-4 hover:border-[#22c55e] transition-colors">
                  <span className="text-[#3b82f6] text-sm">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Other Calculators */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">More Financial Calculators</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {otherCalculators.map(c => (
            <Link key={c.slug} href={`/calculators/${c.slug}`} className="no-underline">
              <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-3 text-center hover:border-[#22c55e] transition-colors">
                <span className="text-white text-sm">{c.shortTitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FAQSection faqs={content.faqs} />
    </div>
  );
}
