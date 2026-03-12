import type { Metadata } from 'next';
import Breadcrumbs from '../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About BankingDeal — Our Mission & How We Help You Save',
  description: 'Learn about BankingDeal.com, our mission to help consumers find the best bank rates, savings accounts, credit cards, and financial products.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: 'About' }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">About BankingDeal</h1>

      <div className="space-y-8 text-[#8b9dc3] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
          <p>
            BankingDeal.com was created with a simple mission: help everyday Americans find the best banking products for their money. Whether you are looking for the highest CD rates in your state, comparing savings account APYs, choosing a credit card, or shopping for a mortgage, we provide the information and comparisons you need to make informed decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">What We Cover</h2>
          <p className="mb-4">We provide comprehensive comparisons and reviews across the personal finance landscape:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-white">Bank Reviews:</strong> In-depth reviews of 30 major banks including rates, fees, products, and pros and cons.</li>
            <li><strong className="text-white">CD Rates:</strong> State-by-state comparisons of the best certificate of deposit rates from national and online banks.</li>
            <li><strong className="text-white">Savings Accounts:</strong> High-yield savings account comparisons with current APY data and fee analysis.</li>
            <li><strong className="text-white">Credit Cards:</strong> Side-by-side comparisons across 20 categories including cash back, travel rewards, and balance transfer cards.</li>
            <li><strong className="text-white">Mortgage Rates:</strong> State-by-state mortgage rate comparisons for fixed and adjustable rate loans.</li>
            <li><strong className="text-white">Financial Guides:</strong> Expert educational content on credit, savings, budgeting, and making smart financial decisions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">How We Make Money</h2>
          <p>
            BankingDeal.com may receive compensation from some of the companies whose products appear on our site. This compensation may impact the placement and order of products. However, it does not influence our reviews or comparisons. We are committed to providing accurate, unbiased information to help you make the best financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Editorial Standards</h2>
          <p>
            Our content is researched and written by financial professionals with experience in banking, lending, and personal finance. We regularly update our rate data, review content, and guides to ensure accuracy. All rates shown are for illustration purposes and should be verified directly with each institution before making financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
          <p>
            Have questions, feedback, or suggestions? We would love to hear from you. Reach out to our team at <span className="text-white">contact@bankingdeal.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
