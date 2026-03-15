'use client';

import { useState, useMemo } from 'react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('15000');
  const [interestRate, setInterestRate] = useState('8.50');
  const [loanTerm, setLoanTerm] = useState('60');

  const result = useMemo(() => {
    const P = parseFloat(loanAmount) || 0;
    const r = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = parseFloat(loanTerm) || 0;

    if (P <= 0 || n === 0) return { monthlyPayment: 0, totalPaid: 0, totalInterest: 0 };

    const monthlyPayment = r > 0
      ? P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : P / n;

    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - P;

    return { monthlyPayment, totalPaid, totalInterest };
  }, [loanAmount, interestRate, loanTerm]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
  const fmtK = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
      <h2 className="text-xl font-bold text-white mb-6">Loan Payment Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Loan Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={loanAmount}
              onChange={e => setLoanAmount(e.target.value)}
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
              max="36"
              step="0.25"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">%</span>
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Loan Term (Months)</label>
          <select
            value={loanTerm}
            onChange={e => setLoanTerm(e.target.value)}
            className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
          >
            <option value="12">12 months (1 yr)</option>
            <option value="24">24 months (2 yr)</option>
            <option value="36">36 months (3 yr)</option>
            <option value="48">48 months (4 yr)</option>
            <option value="60">60 months (5 yr)</option>
            <option value="72">72 months (6 yr)</option>
            <option value="84">84 months (7 yr)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2a3a4e]">
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Monthly Payment</p>
          <p className="text-2xl font-bold text-[#22c55e]">{fmt(result.monthlyPayment)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Total Amount Paid</p>
          <p className="text-2xl font-bold text-white">{fmtK(result.totalPaid)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Total Interest</p>
          <p className="text-2xl font-bold text-[#3b82f6]">{fmtK(result.totalInterest)}</p>
        </div>
      </div>
    </div>
  );
}
