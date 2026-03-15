'use client';

import { useState, useMemo } from 'react';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('400000');
  const [downPayment, setDownPayment] = useState('80000');
  const [interestRate, setInterestRate] = useState('6.75');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTax, setPropertyTax] = useState('300');
  const [insurance, setInsurance] = useState('100');

  const result = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const principal = price - down;
    const r = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTerm) || 30) * 12;
    const tax = parseFloat(propertyTax) || 0;
    const ins = parseFloat(insurance) || 0;

    if (principal <= 0 || r === 0) {
      return { monthlyPI: 0, monthlyTotal: tax + ins, totalPaid: 0, totalInterest: 0, principal, downPct: 0 };
    }

    const monthlyPI = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const monthlyTotal = monthlyPI + tax + ins;
    const totalPaid = monthlyPI * n;
    const totalInterest = totalPaid - principal;
    const downPct = price > 0 ? (down / price) * 100 : 0;

    return { monthlyPI, monthlyTotal, totalPaid, totalInterest, principal, downPct };
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const fmtDec = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <div className="rounded-lg border border-[#2a3a4e] bg-[#1a2332] p-6">
      <h2 className="text-xl font-bold text-white mb-6">Mortgage Payment Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Home Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={homePrice}
              onChange={e => setHomePrice(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="10000"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">
            Down Payment {result.downPct > 0 && <span className="text-[#22c55e] ml-1">({result.downPct.toFixed(1)}%)</span>}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={downPayment}
              onChange={e => setDownPayment(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="5000"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Interest Rate (%)</label>
          <div className="relative">
            <input
              type="number"
              value={interestRate}
              onChange={e => setInterestRate(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              max="30"
              step="0.125"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">%</span>
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Loan Term</label>
          <select
            value={loanTerm}
            onChange={e => setLoanTerm(e.target.value)}
            className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
          >
            <option value="10">10 Years</option>
            <option value="15">15 Years</option>
            <option value="20">20 Years</option>
            <option value="25">25 Years</option>
            <option value="30">30 Years</option>
          </select>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Monthly Property Tax</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={propertyTax}
              onChange={e => setPropertyTax(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="25"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#8b9dc3] text-sm font-medium mb-2">Monthly Insurance</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9dc3]">$</span>
            <input
              type="number"
              value={insurance}
              onChange={e => setInsurance(e.target.value)}
              className="w-full bg-[#0d1321] border border-[#2a3a4e] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              min="0"
              step="10"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#2a3a4e]">
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Monthly Payment</p>
          <p className="text-2xl font-bold text-[#22c55e]">{fmtDec(result.monthlyTotal)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Principal & Interest</p>
          <p className="text-2xl font-bold text-white">{fmtDec(result.monthlyPI)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Loan Amount</p>
          <p className="text-2xl font-bold text-white">{fmt(result.principal)}</p>
        </div>
        <div className="text-center">
          <p className="text-[#8b9dc3] text-sm mb-1">Total Interest Paid</p>
          <p className="text-2xl font-bold text-[#3b82f6]">{fmt(result.totalInterest)}</p>
        </div>
      </div>
    </div>
  );
}
