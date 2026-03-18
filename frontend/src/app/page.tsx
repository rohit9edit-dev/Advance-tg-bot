import { Search, Briefcase, FileText, CheckCircle, ArrowRight, Bot, TrendingUp, Users, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const stats = [
    { label: "Active Jobs", value: "25,000+", icon: Briefcase },
    { label: "Daily Schemes", value: "500+", icon: FileText },
    { label: "Happy Users", value: "50,000+", icon: Users },
    { label: "Success Rate", value: "98%", icon: Award },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
            CAREER<span className="text-gray-900">HUB</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <Link href="/jobs" className="hover:text-blue-600 transition-colors">Govt Jobs</Link>
            <Link href="/schemes" className="hover:text-blue-600 transition-colors">Schemes</Link>
            <Link href="/exam-tools" className="hover:text-blue-600 transition-colors">Exam Tools</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">Login</Link>
            <Link href="/register" className="px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold mb-6 animate-bounce">
            <Bot className="w-4 h-4" /> AI Powered Career Coaching
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
            Build Your Future with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Government Opportunities</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Join 50,000+ Indians finding daily Govt Jobs, Schemes, and Exam updates. Supported by your personal AI Career Coach.
          </p>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 border border-gray-100">
            <div className="flex-1 flex items-center px-4 py-2 gap-3 border-b md:border-b-0 md:border-r border-gray-100">
              <Search className="w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Job title, Organization (SSC, Railway)..." className="w-full bg-transparent focus:outline-none text-gray-800 placeholder:text-gray-400 font-medium" />
            </div>
            <div className="flex-1 flex items-center px-4 py-2 gap-3 border-b md:border-b-0 md:border-r border-gray-100">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <select className="w-full bg-transparent focus:outline-none text-gray-800 font-medium appearance-none">
                <option>All India</option>
                <option>Haryana</option>
                <option>Uttar Pradesh</option>
                <option>Bihar</option>
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl md:rounded-full font-bold shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
              Find Jobs <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20 border-y border-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-gray-900 mb-1 tracking-tight">{stat.value}</p>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features/Quick Links */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Everything You Need To Get Hired</h2>
          <p className="text-gray-600 font-medium">From exam preparation to final document verification.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Latest Govt Jobs", desc: "Real-time updates from SSC, Railways, Banking and States.", color: "blue", link: "/jobs" },
            { title: "Welfare Schemes", desc: "Access Prime Minister and State specific welfare benefits.", color: "indigo", link: "/schemes" },
            { title: "Exam Preparation", desc: "Download Admit Cards, Previous Papers and Check Results.", color: "purple", link: "/exam-tools" }
          ].map((item, i) => (
            <div key={i} className={`p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group`}>
              <div className={`w-12 h-12 bg-${item.color}-50 text-${item.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-6">{item.desc}</p>
              <Link href={item.link} className={`flex items-center gap-2 text-${item.color}-600 font-bold hover:gap-4 transition-all`}>
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-black text-white tracking-tighter mb-6">
              CAREER<span className="text-blue-500">HUB</span>
            </h2>
            <p className="text-gray-400 max-w-md leading-relaxed mb-8 font-medium">
              India's leading platform for Government Jobs, Schemes, and Career development. Our mission is to simplify the job search process for every aspirant.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-blue-600 transition-colors">Telegram</Link>
              <Link href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-green-600 transition-colors">WhatsApp</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/jobs" className="hover:text-blue-500 transition-colors">Latest Govt Jobs</Link></li>
              <li><Link href="/schemes" className="hover:text-blue-500 transition-colors">Public Schemes</Link></li>
              <li><Link href="/exam-tools" className="hover:text-blue-500 transition-colors">Exam Tools</Link></li>
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Support</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="flex items-center gap-2 italic">7494980801</li>
              <li className="flex items-center gap-2">support24x@gmail.com</li>
              <li className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-500">24/7 Support Available</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
