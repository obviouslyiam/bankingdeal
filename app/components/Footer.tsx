import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#2a3a4e] bg-[#0d1321] mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              <span className="text-[#22c55e]">Banking</span>Deal
            </h3>
            <p className="text-[#8b9dc3] text-sm leading-relaxed">
              Your trusted source for comparing bank rates, accounts, and financial products. We help you find the best deals for your money.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Bank Rates</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/best-cd-rates/california" className="text-[#8b9dc3] no-underline hover:text-white">Best CD Rates</Link></li>
              <li><Link href="/best-savings-accounts/california" className="text-[#8b9dc3] no-underline hover:text-white">Best Savings Accounts</Link></li>
              <li><Link href="/best-mortgage-rates/california" className="text-[#8b9dc3] no-underline hover:text-white">Best Mortgage Rates</Link></li>
              <li><Link href="/bank-rates" className="text-[#8b9dc3] no-underline hover:text-white">All Bank Rates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Banking Deals</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/best-credit-cards/cash-back" className="text-[#8b9dc3] no-underline hover:text-white">Cash Back Cards</Link></li>
              <li><Link href="/best-credit-cards/travel-rewards" className="text-[#8b9dc3] no-underline hover:text-white">Travel Cards</Link></li>
              <li><Link href="/reviews/chase" className="text-[#8b9dc3] no-underline hover:text-white">Bank Reviews</Link></li>
              <li><Link href="/banking-deals" className="text-[#8b9dc3] no-underline hover:text-white">All Deals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides/how-to-improve-your-credit-score" className="text-[#8b9dc3] no-underline hover:text-white">Improve Credit Score</Link></li>
              <li><Link href="/guides/understanding-apy-vs-apr" className="text-[#8b9dc3] no-underline hover:text-white">APY vs APR</Link></li>
              <li><Link href="/personal-finance" className="text-[#8b9dc3] no-underline hover:text-white">Personal Finance</Link></li>
              <li><Link href="/about" className="text-[#8b9dc3] no-underline hover:text-white">About Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#2a3a4e] mt-10 pt-8">
          <p className="text-[#8b9dc3] text-xs leading-relaxed">
            <strong>Advertiser Disclosure:</strong> Some of the offers that appear on this website are from companies from which BankingDeal.com may receive compensation. This compensation may impact how and where products appear on this site (including the order in which they appear). BankingDeal.com does not include all financial companies or all available financial offers.
          </p>
          <p className="text-[#8b9dc3] text-xs mt-4 leading-relaxed">
            Rates shown are for illustration purposes only and may not reflect current offers. Verify current rates directly with each institution before making financial decisions. All bank accounts referenced are FDIC insured up to $250,000 per depositor, per institution.
          </p>
          <p className="text-[#8b9dc3] text-xs mt-4">
            &copy; {new Date().getFullYear()} BankingDeal.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
