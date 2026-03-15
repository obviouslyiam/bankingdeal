'use client';

import { useState, useMemo } from 'react';

export default function CDCalculator() {
  const [depositAmount, setDepositAmount] = useState('10000');
  const [apy, setApy] = useState('4.50');
  const [termMonths, setTermMonths] = useState('12');
  const [compoundFrequency, setCompoundFrequency] = useState('12');

  const result = useMemo(() => {
    const P = parseFloat(depositAmount) || 0;
    const r = (parseFloat(apy) || 0) / 100;
    const n = parseFloat(compoundFrequency) || 12;
    const t = (parseFloat(termMonths) || 0) / 12;

    const futureValue = P * Math.pow(1 + r / n, n * t);
    const interestEarned = futureValue - P;
    const effectiveAPY = (Math.pow(1 + r / n, n) - 1) * 100;

    return { futureValue, interestEarned, effectiveAPY };
  }, [depositAmount, apy, termMonths, compoundFrequency]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
      <h2 className="text-xl font-bold text-white mb-6">CD Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Deposit Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={depositAmount}
              onChange={e => setDepositAmount(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="500"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Annual APY (%)</label>
          <div className="relative">
            <input
              type="number"
              value={apy}
              onChange={e => setApy(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              max="20"
              step="0.05"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">%</span>
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">CD Term</label>
          <select
            value={termMonths}
            onChange={e => setTermMonths(e.target.value)}
            className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
          >
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="9">9 Months</option>
            <option value="12">12 Months</option>
            <option value="18">18 Months</option>
            <option value="24">24 Months</option>
            <option value="36">36 Months</option>
            <option value="48">48 Months</option>
            <option value="60">60 Months</option>
          </select>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Compounding Frequency</label>
          <select
            value={compoundFrequency}
            onChange={e => setCompoundFrequency(e.target.value)}
            className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
          >
            <option value="365">Daily</option>
            <option value="12">Monthly</option>
            <option value="4">Quarterly</option>
            <option value="2">Semi-Annually</option>
            <option value="1">Annually</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2a3a4e]">
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Maturity Value</p>
          <p className="text-2xl font-bold text-[#22c55e]">{fmt(result.futureValue)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Interest Earned</p>
          <p className="text-2xl font-bold text-[#3b82f6]">{fmt(result.interestEarned)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Effective APY</p>
          <p className="text-2xl font-bold text-white">{result.effectiveAPY.toFixed(3)}%</p>
        </div>
      </div>
    </div>
  );
}
