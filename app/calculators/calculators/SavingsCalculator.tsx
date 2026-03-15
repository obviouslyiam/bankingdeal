'use client';

import { useState, useMemo } from 'react';

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState('1000');
  const [monthlyContribution, setMonthlyContribution] = useState('100');
  const [annualAPY, setAnnualAPY] = useState('4.00');
  const [years, setYears] = useState('5');

  const result = useMemo(() => {
    const P = parseFloat(initialDeposit) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualAPY) || 0) / 100 / 12;
    const n = (parseFloat(years) || 0) * 12;

    if (n === 0) return { futureValue: P, totalContributions: P, totalInterest: 0 };

    const futureValueLump = r > 0 ? P * Math.pow(1 + r, n) : P;
    const futureValueContrib = r > 0 ? PMT * ((Math.pow(1 + r, n) - 1) / r) : PMT * n;
    const futureValue = futureValueLump + futureValueContrib;
    const totalContributions = P + PMT * n;
    const totalInterest = futureValue - totalContributions;

    return { futureValue, totalContributions, totalInterest };
  }, [initialDeposit, monthlyContribution, annualAPY, years]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
      <h2 className="text-xl font-bold text-white mb-6">Savings Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Initial Deposit</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={initialDeposit}
              onChange={e => setInitialDeposit(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="100"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Monthly Contribution</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={monthlyContribution}
              onChange={e => setMonthlyContribution(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="50"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Annual APY (%)</label>
          <div className="relative">
            <input
              type="number"
              value={annualAPY}
              onChange={e => setAnnualAPY(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              max="20"
              step="0.25"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">%</span>
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Time Period (Years)</label>
          <input
            type="number"
            value={years}
            onChange={e => setYears(e.target.value)}
            className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
            min="1"
            max="50"
            step="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2a3a4e]">
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Future Value</p>
          <p className="text-2xl font-bold text-[#22c55e]">{fmt(result.futureValue)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Total Contributions</p>
          <p className="text-2xl font-bold text-white">{fmt(result.totalContributions)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Interest Earned</p>
          <p className="text-2xl font-bold text-[#3b82f6]">{fmt(result.totalInterest)}</p>
        </div>
      </div>
    </div>
  );
}
