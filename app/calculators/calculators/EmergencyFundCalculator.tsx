'use client';

import { useState, useMemo } from 'react';

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState('3500');
  const [currentSavings, setCurrentSavings] = useState('2000');
  const [monthsTarget, setMonthsTarget] = useState('6');
  const [monthlySavings, setMonthlySavings] = useState('300');

  const result = useMemo(() => {
    const expenses = parseFloat(monthlyExpenses) || 0;
    const saved = parseFloat(currentSavings) || 0;
    const target = parseFloat(monthsTarget) || 6;
    const monthly = parseFloat(monthlySavings) || 0;

    const goalAmount = expenses * target;
    const remaining = Math.max(0, goalAmount - saved);
    const monthsToGoal = monthly > 0 ? Math.ceil(remaining / monthly) : Infinity;
    const pctComplete = goalAmount > 0 ? Math.min(100, (saved / goalAmount) * 100) : 0;

    return { goalAmount, remaining, monthsToGoal, pctComplete, saved };
  }, [monthlyExpenses, currentSavings, monthsTarget, monthlySavings]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const formatMonths = (m: number) => {
    if (!isFinite(m)) return 'Set a monthly savings amount';
    if (m === 0) return 'Already reached!';
    const y = Math.floor(m / 12);
    const mo = m % 12;
    if (y === 0) return `${mo} month${mo !== 1 ? 's' : ''}`;
    if (mo === 0) return `${y} year${y !== 1 ? 's' : ''}`;
    return `${y} yr ${mo} mo`;
  };

  return (
    <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
      <h2 className="text-xl font-bold text-white mb-6">Emergency Fund Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Monthly Essential Expenses</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={e => setMonthlyExpenses(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="100"
            />
          </div>
          <p className="text-[#8b9dc3] text-xs mt-1">Rent, food, utilities, transportation, insurance</p>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Current Emergency Savings</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={currentSavings}
              onChange={e => setCurrentSavings(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="100"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Target Coverage (Months)</label>
          <select
            value={monthsTarget}
            onChange={e => setMonthsTarget(e.target.value)}
            className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
          >
            <option value="3">3 months (minimum)</option>
            <option value="6">6 months (recommended)</option>
            <option value="9">9 months</option>
            <option value="12">12 months (conservative)</option>
          </select>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Monthly Amount You Can Save</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={monthlySavings}
              onChange={e => setMonthlySavings(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="50"
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[#8b9dc3] mb-2">
          <span>Progress: {result.pctComplete.toFixed(0)}%</span>
          <span>{fmt(result.saved)} of {fmt(result.goalAmount)}</span>
        </div>
        <div className="w-full bg-[#0d1321] rounded-full h-3">
          <div
            className="bg-[#22c55e] h-3 rounded-full transition-all duration-300"
            style={{ width: `${result.pctComplete}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2a3a4e]">
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Goal Amount</p>
          <p className="text-2xl font-bold text-[#22c55e]">{fmt(result.goalAmount)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Still Needed</p>
          <p className="text-2xl font-bold text-white">{fmt(result.remaining)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Time to Goal</p>
          <p className="text-lg font-bold text-[#3b82f6]">{formatMonths(result.monthsToGoal)}</p>
        </div>
      </div>
    </div>
  );
}
