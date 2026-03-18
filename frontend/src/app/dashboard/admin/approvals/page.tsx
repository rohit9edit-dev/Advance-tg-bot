"use client";

import { CheckCircle, XCircle, Info, Briefcase, User, Calendar, ExternalLink } from "lucide-react";

export default function ApprovalsPage() {
  const pendingJobs = [
    { id: 1, title: "GD Constable 2024", type: "GOVT", org: "SSC", postedBy: "Admin", date: "12 Oct 2024" },
    { id: 2, title: "Senior React Developer", type: "PRIVATE", org: "Webzet", postedBy: "Rohit", date: "11 Oct 2024" },
    { id: 3, title: "PM Kisan Nidhi Scheme", type: "SCHEME", org: "Agri Dept", postedBy: "Admin", date: "10 Oct 2024" },
  ];

  return (
    <div className="space-y-12">
      <header>
        <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Pending Action</p>
        <h1 className="text-4xl font-black text-white tracking-tight">Review & Approvals</h1>
      </header>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-4">
            Pending Queue
            <span className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full font-black uppercase tracking-widest">
              {pendingJobs.length} Items
            </span>
          </h3>
          <div className="flex gap-4">
            <button className="text-xs font-black text-gray-500 hover:text-white transition-all uppercase tracking-widest">Select All</button>
            <button className="text-xs font-black text-gray-500 hover:text-white transition-all uppercase tracking-widest">Bulk Approve</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-800/50 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-800">
                <th className="px-8 py-5">Type</th>
                <th className="px-8 py-5">Job/Scheme Title</th>
                <th className="px-8 py-5">Organization</th>
                <th className="px-8 py-5">Posted By</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {pendingJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-800/30 transition-colors group">
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${
                      job.type === 'GOVT' ? 'bg-indigo-900/40 text-indigo-400' :
                      job.type === 'PRIVATE' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-amber-900/40 text-amber-400'
                    }`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-gray-200 tracking-tight">{job.title}</p>
                    <button className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-1 mt-1 uppercase tracking-widest">
                      Preview <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-xs font-black text-gray-400">
                        {job.org[0]}
                      </div>
                      <span className="text-sm font-bold text-gray-400">{job.org}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <span className="text-sm font-bold text-gray-400">{job.postedBy}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-500">{job.date}</td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-3">
                      <button className="w-10 h-10 bg-emerald-900/20 text-emerald-500 hover:bg-emerald-600 hover:text-white rounded-xl flex items-center justify-center transition-all group/btn shadow-lg shadow-emerald-950/20">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 bg-red-900/20 text-red-500 hover:bg-red-600 hover:text-white rounded-xl flex items-center justify-center transition-all group/btn shadow-lg shadow-red-950/20">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
