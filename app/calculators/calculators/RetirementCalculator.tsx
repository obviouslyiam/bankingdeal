'use client';

import { useState, useMemo } from 'react';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('35');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContrib, setMonthlyContrib] = useState('500');
  const [expectedReturn, setExpectedReturn] = useState('7.00');
  const [monthlyNeeds, setMonthlyNeeds] = useState('4000');

  const result = useMemo(() => {
    const age = parseFloat(currentAge) || 35;
    const retAge = parseFloat(retirementAge) || 65;
    const P = parseFloat(currentSavings) || 0;
    const PMT = parseFloat(monthlyContrib) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 100 / 12;
    const needs = parseFloat(monthlyNeeds) || 0;
    const yearsToRetire = Math.max(0, retAge - age);
    const n = yearsToRetire * 12;

    const futureValue = r > 0
      ? P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r)
      : P + PMT * n;

    // 4% safe withdrawal rate
    const neededNest = needs * 12 / 0.04;
    const onTrack = futureValue >= neededNest;
    const monthlyIncome = futureValue * 0.04 / 12;

    return { futureValue, neededNest, onTrack, monthlyIncome, yearsToRetire };
  }, [currentAge, retirementAge, currentSavings, monthlyContrib, expectedReturn, monthlyNeeds]);

  const fmt = (n: number) => {
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M';
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  };
  const fmtDec = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
      <h2 className="text-xl font-bold text-white mb-6">Retirement Savings Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={e => setCurrentAge(e.target.value)}
            className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
            min="18"
            max="80"
            step="1"
          />
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Retirement Age</label>
          <input
            type="number"
            value={retirementAge}
            onChange={e => setRetirementAge(e.target.value)}
            className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
            min="50"
            max="80"
            step="1"
          />
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Current Retirement Savings</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={currentSavings}
              onChange={e => setCurrentSavings(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="5000"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Monthly Contribution</label>
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
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Expected Annual Return (%)</label>
          <div className="relative">
            <input
              type="number"
              value={expectedReturn}
              onChange={e => setExpectedReturn(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              max="20"
              step="0.5"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">%</span>
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Monthly Retirement Income Needed</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={monthlyNeeds}
              onChange={e => setMonthlyNeeds(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="100"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#2a3a4e]">
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Projected Balance</p>
          <p className="text-2xl font-bold text-[#22c55e]">{fmt(result.futureValue)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Needed ({`4%`} rule)</p>
          <p className="text-2xl font-bold text-white">{fmt(result.neededNest)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Monthly Income</p>
          <p className="text-2xl font-bold text-[#3b82f6]">{fmtDec(result.monthlyIncome)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Years to Retire</p>
          <p className="text-2xl font-bold text-white">{result.yearsToRetire}</p>
        </div>
      </div>

      <div className={`mt-4 rounded-lg p-3 text-sm ${result.onTrack ? 'bg-green-900/20 border border-green-700/30 text-[#22c55e]' : 'bg-yellow-900/20 border border-yellow-700/30 text-yellow-400'}`}>
        {result.onTrack
          ? `On track! Your projected balance of ${fmt(result.futureValue)} exceeds your target of ${fmt(result.neededNest)}.`
          : `You may need to save more. Consider increasing monthly contributions or retiring later to reach your ${fmt(result.neededNest)} target.`}
      </div>
    </div>
  );
}
