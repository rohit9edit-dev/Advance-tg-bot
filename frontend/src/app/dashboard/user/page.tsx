import { LayoutDashboard, TrendingUp, Award, Calendar, ChevronRight, Briefcase, FileText } from "lucide-react";

export default function UserDashboard() {
  const stats = [
    { label: "Applied", value: "12", icon: Briefcase, color: "blue" },
    { label: "Saved", value: "45", icon: TrendingUp, color: "indigo" },
    { label: "Alerts", value: "3", icon: Award, color: "purple" },
    { label: "Interviews", value: "2", icon: Calendar, color: "green" },
  ];

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Welcome Back</p>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Job Seeker Dashboard</h1>
        </div>
        <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profile Score</p>
            <p className="text-lg font-black text-gray-900">85% Complete</p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
            <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Recent Applications</h3>
            <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="p-8 space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 font-black shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    SSC
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 tracking-tight">GD Constable 2024</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Applied on 12 Oct 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-black uppercase tracking-widest rounded-full">Pending</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-blue-600 rounded-3xl shadow-xl shadow-blue-500/20 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-8">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black mb-4 tracking-tight">AI Coach Recommendations</h3>
            <p className="text-blue-100 font-medium text-sm leading-relaxed mb-8 opacity-80">
              "Bhai, based on your profile as a 12th pass candidate, you should check out the Railway ALP post. Your chances are very high!"
            </p>
            <div className="space-y-4">
              <button className="w-full bg-white text-blue-600 py-3 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-colors">
                View Suggestions
              </button>
              <button className="w-full bg-transparent border border-white/20 text-white py-3 rounded-2xl font-bold text-sm hover:bg-white/10 transition-colors">
                Ask Career Coach
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bot(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
