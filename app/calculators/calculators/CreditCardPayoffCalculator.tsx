'use client';

import { useState, useMemo } from 'react';

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState('5000');
  const [apr, setApr] = useState('22.99');
  const [monthlyPayment, setMonthlyPayment] = useState('200');

  const result = useMemo(() => {
    const B = parseFloat(balance) || 0;
    const r = (parseFloat(apr) || 0) / 100 / 12;
    const P = parseFloat(monthlyPayment) || 0;

    if (B <= 0 || P <= 0 || r <= 0) return { months: 0, totalPaid: 0, totalInterest: 0, minMonths: 0, minInterest: 0 };

    if (P <= B * r) {
      return { months: Infinity, totalPaid: Infinity, totalInterest: Infinity, minMonths: 0, minInterest: 0 };
    }

    const months = Math.ceil(-Math.log(1 - (B * r) / P) / Math.log(1 + r));
    const totalPaid = P * months;
    const totalInterest = totalPaid - B;

    // Min payment scenario: 2% of balance or $25
    const minPaymentPct = 0.02;
    let minBalance = B;
    let minMonths = 0;
    let minTotalPaid = 0;
    while (minBalance > 0 && minMonths < 600) {
      const minPmt = Math.max(25, minBalance * minPaymentPct);
      const interest = minBalance * r;
      const principal = Math.min(minPmt - interest, minBalance);
      if (principal <= 0) break;
      minBalance -= principal;
      minTotalPaid += minPmt;
      minMonths++;
    }
    const minInterest = minTotalPaid - B;

    return { months, totalPaid, totalInterest, minMonths, minInterest };
  }, [balance, apr, monthlyPayment]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const formatMonths = (m: number) => {
    if (!isFinite(m) || m === 0) return '—';
    const y = Math.floor(m / 12);
    const mo = m % 12;
    if (y === 0) return `${mo} mo`;
    if (mo === 0) return `${y} yr`;
    return `${y} yr ${mo} mo`;
  };

  const interestSaved = isFinite(result.minInterest) && isFinite(result.totalInterest)
    ? result.minInterest - result.totalInterest : 0;

  return (
    <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
      <h2 className="text-xl font-bold text-white mb-6">Credit Card Payoff Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Card Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={balance}
              onChange={e => setBalance(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="250"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">APR (%)</label>
          <div className="relative">
            <input
              type="number"
              value={apr}
              onChange={e => setApr(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              max="50"
              step="0.25"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">%</span>
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Monthly Payment</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={monthlyPayment}
              onChange={e => setMonthlyPayment(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="25"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2a3a4e] mb-4">
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Payoff Time</p>
          <p className="text-2xl font-bold text-[#22c55e]">{formatMonths(result.months)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-white">{isFinite(result.totalPaid) ? fmt(result.totalPaid) : '—'}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Total Interest</p>
          <p className="text-2xl font-bold text-[#3b82f6]">{isFinite(result.totalInterest) ? fmt(result.totalInterest) : '—'}</p>
        </div>
      </div>

      {interestSaved > 0 && (
        <div className="rounded-lg bg-green-900/20 border border-green-700/30 p-3 text-sm text-[#22c55e]">
          By paying {fmt(parseFloat(monthlyPayment))} per month instead of the minimum payment, you save approximately {fmt(interestSaved)} in interest and pay off your balance {formatMonths(result.minMonths - result.months)} sooner.
        </div>
      )}
    </div>
  );
}
