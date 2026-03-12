import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-[#2a3a4e] bg-[#0d1321]">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white no-underline hover:text-white">
            <span className="text-[#22c55e]">Banking</span>Deal
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <Link href="/bank-rates" className="text-[#8b9dc3] no-underline hover:text-white transition-colors">Bank Rates</Link>
            <Link href="/banking-deals" className="text-[#8b9dc3] no-underline hover:text-white transition-colors">Banking Deals</Link>
            <Link href="/personal-finance" className="text-[#8b9dc3] no-underline hover:text-white transition-colors">Personal Finance</Link>
            <Link href="/about" className="text-[#8b9dc3] no-underline hover:text-white transition-colors">About</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
