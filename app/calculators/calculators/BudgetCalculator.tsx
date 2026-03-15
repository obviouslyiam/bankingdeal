'use client';

import { useState, useMemo } from 'react';

interface BudgetItem {
  label: string;
  value: string;
}

const defaultExpenses: BudgetItem[] = [
  { label: 'Housing (rent/mortgage)', value: '1500' },
  { label: 'Transportation', value: '400' },
  { label: 'Food & Groceries', value: '500' },
  { label: 'Utilities', value: '150' },
  { label: 'Insurance', value: '200' },
  { label: 'Healthcare', value: '100' },
  { label: 'Entertainment', value: '150' },
  { label: 'Clothing', value: '100' },
  { label: 'Debt Payments', value: '200' },
  { label: 'Other', value: '100' },
];

export default function BudgetCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('5000');
  const [expenses, setExpenses] = useState<BudgetItem[]>(defaultExpenses);

  const updateExpense = (idx: number, value: string) => {
    setExpenses(prev => prev.map((e, i) => i === idx ? { ...e, value } : e));
  };

  const result = useMemo(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const totalExpenses = expenses.reduce((sum, e) => sum + (parseFloat(e.value) || 0), 0);
    const savings = income - totalExpenses;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    return { income, totalExpenses, savings, savingsRate };
  }, [monthlyIncome, expenses]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const isHealthy = result.savingsRate >= 20;
  const isOk = result.savingsRate >= 10;

  return (
    <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
      <h2 className="text-xl font-bold text-white mb-6">Monthly Budget Calculator</h2>

      <div className="mb-6">
        <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Monthly Take-Home Income</label>
        <div className="relative max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
          <input
            type="number"
            value={monthlyIncome}
            onChange={e => setMonthlyIncome(e.target.value)}
            className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
            min="0"
            step="100"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">Monthly Expenses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {expenses.map((expense, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <label className="text-[#8b9dc3] text-sm w-48 flex-shrink-0">{expense.label}</label>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3] text-sm">$</span>
                <input
                  type="number"
                  value={expense.value}
                  onChange={e => updateExpense(idx, e.target.value)}
                  className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-7 pr-3 py-2 text-white text-sm focus:outline-none focus:border-[#22c55e] transition-colors"
                  min="0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#2a3a4e]">
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Monthly Income</p>
          <p className="text-xl font-bold text-white">{fmt(result.income)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Total Expenses</p>
          <p className="text-xl font-bold text-white">{fmt(result.totalExpenses)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Monthly Savings</p>
          <p className={`text-xl font-bold ${result.savings >= 0 ? 'text-[#22c55e]' : 'text-red-400'}`}>
            {fmt(result.savings)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Savings Rate</p>
          <p className={`text-xl font-bold ${isHealthy ? 'text-[#22c55e]' : isOk ? 'text-yellow-400' : 'text-red-400'}`}>
            {result.savingsRate.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className={`mt-4 rounded-lg p-3 text-sm ${isHealthy ? 'bg-green-900/20 border border-green-700/30 text-[#22c55e]' : isOk ? 'bg-yellow-900/20 border border-yellow-700/30 text-yellow-400' : 'bg-red-900/20 border border-red-700/30 text-red-400'}`}>
        {isHealthy
          ? 'Great savings rate! Financial experts recommend saving 20% or more of your income.'
          : isOk
          ? 'You are saving some money, but aim for 20%+ to build wealth faster and prepare for emergencies.'
          : result.savings < 0
          ? 'Your expenses exceed your income. Review each category and find areas to reduce spending.'
          : 'Try to increase your savings rate to at least 10-20% of your income for long-term financial health.'}
      </div>
    </div>
  );
}
