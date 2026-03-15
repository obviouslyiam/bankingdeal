'use client';

import { useState, useMemo } from 'react';

export default function DebtPayoffCalculator() {
  const [balance, setBalance] = useState('12000');
  const [interestRate, setInterestRate] = useState('18.00');
  const [monthlyPayment, setMonthlyPayment] = useState('400');

  const result = useMemo(() => {
    const B = parseFloat(balance) || 0;
    const r = (parseFloat(interestRate) || 0) / 100 / 12;
    const P = parseFloat(monthlyPayment) || 0;

    if (B <= 0 || P <= 0) return { months: 0, totalPaid: 0, totalInterest: 0, minPayment: 0 };

    const minPayment = B * r + B * 0.01;

    if (P <= B * r) {
      return { months: Infinity, totalPaid: Infinity, totalInterest: Infinity, minPayment };
    }

    const months = Math.ceil(-Math.log(1 - (B * r) / P) / Math.log(1 + r));
    const totalPaid = P * months;
    const totalInterest = totalPaid - B;

    return { months, totalPaid, totalInterest, minPayment };
  }, [balance, interestRate, monthlyPayment]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const fmtDec = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
  const formatMonths = (m: number) => {
    if (!isFinite(m)) return 'Never (payment too low)';
    const y = Math.floor(m / 12);
    const mo = m % 12;
    if (y === 0) return `${mo} month${mo !== 1 ? 's' : ''}`;
    if (mo === 0) return `${y} year${y !== 1 ? 's' : ''}`;
    return `${y} yr ${mo} mo`;
  };

  return (
    <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
      <h2 className="text-xl font-bold text-white mb-6">Debt Payoff Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Current Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={balance}
              onChange={e => setBalance(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="500"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Annual Interest Rate (%)</label>
          <div className="relative">
            <input
              type="number"
              value={interestRate}
              onChange={e => setInterestRate(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              max="50"
              step="0.25"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">%</span>
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">
            Monthly Payment
            {result.minPayment > 0 && (
              <span className="text-[#8b9dc3] font-normal ml-2 text-xs">(min ~{fmtDec(result.minPayment)})</span>
            )}
          </label>
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

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2a3a4e]">
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Payoff Time</p>
          <p className="text-xl font-bold text-[#22c55e]">{formatMonths(result.months)}</p>
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
    </div>
  );
}
