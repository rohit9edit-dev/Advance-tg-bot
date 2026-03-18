"use client";

import { useState } from "react";
import { Briefcase, Send, AlertCircle, Info } from "lucide-react";

export default function PostJobPage() {
  const [jobCount, setJobCount] = useState(2); // Mock: Company has posted 2 jobs this month

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header>
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Create Listing</p>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Post a New Private Job</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <form className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tight">Job Title</label>
                <input type="text" placeholder="e.g. Senior Software Engineer" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-black" />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tight">Location</label>
                <input type="text" placeholder="e.g. Gurugram, Remote" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-black" />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tight">Salary Range</label>
                <input type="text" placeholder="e.g. ₹8L - ₹12L PA" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-black" />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-tight">Job Description</label>
                <textarea rows={6} placeholder="Describe the role, responsibilities, and requirements..." className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-black" />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
              Submit for Approval <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="space-y-8">
          {/* Pricing Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Job Posting Stats</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-500">Free Jobs Used</span>
                <span className="font-black text-blue-600">{jobCount} / 3</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: `${(jobCount/3)*100}%` }}></div>
              </div>
            </div>

            {jobCount < 3 ? (
              <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-start gap-3">
                <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-green-700 leading-relaxed">
                  Bhai, you have <span className="font-black">1 free job</span> left this month! No payment required.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-amber-700 leading-relaxed">
                  Free limit reached. Next job will cost <span className="font-black">₹25</span>.
                </p>
              </div>
            )}
          </div>

          {/* Business Rules Card */}
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <h4 className="text-sm font-black text-blue-700 uppercase tracking-widest mb-4">Employer Rules</h4>
            <ul className="space-y-4">
              {[
                "First 3 jobs every month are 100% FREE.",
                "₹25 per job listing after the free limit.",
                "All jobs require Admin approval (2-4 hours).",
                "Jobs stay LIVE for 30 days."
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-xs font-bold text-blue-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
