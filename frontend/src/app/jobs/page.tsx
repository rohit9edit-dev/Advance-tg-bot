"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, Calendar, ChevronRight } from "lucide-react";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for initial UI
  const jobs = [
    { id: 1, title: "SSC GD Constable 2024", org: "SSC", vacancies: 26146, lastDate: "2024-12-31", location: "All India", qualification: "10th Pass" },
    { id: 2, title: "Railway ALP Recruitment", org: "RRB", vacancies: 5696, lastDate: "2024-11-20", location: "All India", qualification: "ITI/Diploma" },
    { id: 3, title: "SBI Clerk Junior Associate", org: "SBI", vacancies: 8283, lastDate: "2024-12-07", location: "All India", qualification: "Graduate" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white border-b border-gray-100 py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-black text-blue-600">CAREER HUB</Link>
          <div className="flex gap-6 text-sm font-bold text-gray-600">
            <Link href="/jobs" className="text-blue-600">Jobs</Link>
            <Link href="/schemes" className="hover:text-blue-600">Schemes</Link>
            <Link href="/exam-tools" className="hover:text-blue-600">Exam Tools</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-black text-gray-900 mb-6 flex items-center gap-2">Filters</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Organization</label>
                  <div className="space-y-2">
                    {["SSC", "Railway", "Banking", "UPSC", "State Govt"].map((org) => (
                      <label key={org} className="flex items-center gap-3 group cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-500 transition-all" />
                        <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600">{org}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Qualification</label>
                  <div className="space-y-2">
                    {["10th Pass", "12th Pass", "Graduate", "ITI/Diploma", "Post Graduate"].map((qual) => (
                      <label key={qual} className="flex items-center gap-3 group cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-500 transition-all" />
                        <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600">{qual}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 mb-8">
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search by job title or organization..."
                className="flex-1 bg-transparent focus:outline-none text-gray-800 font-medium py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-6">
              {jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`} className="block group">
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                    <div className="relative">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">{job.org}</span>
                          <h2 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">{job.title}</h2>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-blue-600">{job.vacancies.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vacancies</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                            <p className="text-sm font-black text-gray-700">{job.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qual.</p>
                            <p className="text-sm font-black text-gray-700">{job.qualification}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Date</p>
                            <p className="text-sm font-black text-gray-700">{job.lastDate}</p>
                          </div>
                        </div>
                        <div className="flex items-end justify-end">
                           <span className="flex items-center gap-2 text-blue-600 font-black text-sm group-hover:gap-4 transition-all">
                             View Details <ChevronRight className="w-5 h-5" />
                           </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
