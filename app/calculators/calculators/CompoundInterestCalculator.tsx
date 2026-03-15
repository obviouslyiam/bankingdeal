'use client';

import { useState, useMemo } from 'react';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('5000');
  const [annualRate, setAnnualRate] = useState('7.00');
  const [years, setYears] = useState('10');
  const [compoundFreq, setCompoundFreq] = useState('12');
  const [monthlyContrib, setMonthlyContrib] = useState('0');

  const result = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const n = parseFloat(compoundFreq) || 12;
    const t = parseFloat(years) || 0;
    const PMT = parseFloat(monthlyContrib) || 0;

    const futureValuePrincipal = P * Math.pow(1 + r / n, n * t);
    const futureValueContrib = PMT > 0 && r > 0
      ? PMT * (Math.pow(1 + r / n, n * t) - 1) / (r / n)
      : PMT * n * t;
    const futureValue = futureValuePrincipal + futureValueContrib;
    const totalContributions = P + PMT * 12 * t;
    const totalInterest = futureValue - totalContributions;

    return { futureValue, totalContributions, totalInterest };
  }, [principal, annualRate, years, compoundFreq, monthlyContrib]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
      <h2 className="text-xl font-bold text-white mb-6">Compound Interest Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Starting Principal</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={principal}
              onChange={e => setPrincipal(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="1000"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Annual Interest Rate (%)</label>
          <div className="relative">
            <input
              type="number"
              value={annualRate}
              onChange={e => setAnnualRate(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              max="30"
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
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Compound Frequency</label>
          <select
            value={compoundFreq}
            onChange={e => setCompoundFreq(e.target.value)}
            className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
          >
            <option value="365">Daily</option>
            <option value="52">Weekly</option>
            <option value="12">Monthly</option>
            <option value="4">Quarterly</option>
            <option value="2">Semi-Annually</option>
            <option value="1">Annually</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Monthly Contribution (optional)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={monthlyContrib}
              onChange={e => setMonthlyContrib(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="50"
            />
          </div>
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
