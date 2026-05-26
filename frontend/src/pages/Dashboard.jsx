import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Bell,
  Settings,
  LogOut,
  PlusCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Globe,
  Save,
  Building,
  Pen,
  View,
  Menu,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { userAuthStore } from "../store/userAuthStore.js";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { useReportStore } from "../store/userReportStore.js";
import Profile from "../components/Profile.jsx";
import NationalReports from "../components/NationalReport.jsx";

import CityWatchAIAssistant from "./ChatBot.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, checkStatus, loading } = userAuthStore();
  const { reports, fetchReports, allReports, fetchOverallReports, overallReports } = useReportStore();
  const [menu, setMenu] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);

  console.log(allReports);

  useEffect(() => {
    checkStatus();
    fetchReports();
    fetchOverallReports()
  }, [checkStatus, fetchReports, fetchOverallReports]);

  console.log(overallReports)


  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-rose-500"></div>
      </div>
    );
  }

  const handleLogOut = async (req, res) => {
    try {
      const res = await API.post("/auth/logout");
      const { message } = res.data;
      localStorage.removeItem("user");
      toast.success(message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfile = (e) => {
    e.preventDefault();
    setToggleProfile((prev) => !prev);
  };

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  const statusCount=overallReports.reduce((accumulator, currentElement)=>{
    const {status}=currentElement
    accumulator[status]=(accumulator[status]||0)+1

    return accumulator

  },{})

  console.log(statusCount)


  return (
    <div className="relative min-h-screen bg-[#0b0f1a] text-slate-200 flex overflow-hidden font-sans ">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-900/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -80, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-blue-900/20 blur-[100px] rounded-full"
        />
      </div>

      <aside
        className={`
  
    bg-[#111827]/95 backdrop-blur-xl border-r border-white/5 flex-col transition-all duration-300
    
    ${
      menu
        ? "fixed inset-y-0 left-0 w-55 z-50 flex shadow-2xl shadow-black/50"
        : "hidden"
    } 
    
    sm:relative sm:flex sm:w-64 sm:h-auto sm:z-10 sm:shadow-none
  `}
      >
        <div className="p-4 flex justify-end sm:hidden">
          <button
            className="text-slate-400 hover:text-white cursor-pointer p-1"
            onClick={handleMenu}
            type="button"
          >
            {menu && <X size={24} />}
          </button>
        </div>

        <div className="p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-2xl font-black tracking-tighter text-white"
          >
            <div className="relative">
              <View className="text-rose-500" />
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-rose-500 blur-md rounded-full"
              />
            </div>
            WatchDogs
          </motion.div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            active
          />

          <Link to="/reports" onClick={() => (sm ? null : handleMenu())}>
            <NavItem icon={<FileText size={18} />} label="My Reports" />
          </Link>

          <Link to="/report-form" onClick={() => (sm ? null : handleMenu())}>
            <NavItem icon={<Pen size={18} />} label="Initialize Report" />
          </Link>

          <Link to="/savedReport" onClick={() => (sm ? null : handleMenu())}>
            <NavItem icon={<Save size={18} />} label="Saved Reports" />
          </Link>
        </nav>

        <div className="p-6">
          <button
            className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group w-full"
            onClick={handleLogOut}
          >
            <div className="p-2 group-hover:bg-rose-500/10 rounded-lg transition-all">
              <LogOut size={18} />
            </div>
            <span className="cursor-pointer text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      <main className="relative flex-1 flex flex-col h-screen overflow-hidden hide">
        <header className="h-20 bg-transparent border-b border-white/5 flex items-center justify-between px-2">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {menu ? null : (
              <button
                onClick={handleMenu}
                className="cursor-pointer block  sm:hidden "
              >
                {" "}
                <Menu size={24} />
              </button>
            )}
            <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500 font-bold hidden md:block">
              Total Reports Submitted: 
              <span className="text-emerald-500 animate-pulse text-3xl">{overallReports.length}</span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-6 ">
            

            <button
              type="button"
              onClick={handleProfile}
              className="flex items-center gap-3 bg-white/5 p-1 pr-4 rounded-full border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
            >
              <img
                src={user?.profileImage || "https://i.pravatar.cc/150?u=bale"}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-semibold tracking-tight text-slate-200">
                {user?.userName}
              </span>
            </button>
          </div>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-10 space-y-10 overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              label="Active"
              value={statusCount.pending}
              icon={<Clock className="text-amber-500" />}
            />
            <StatCard
              label="Resolved"
              value={statusCount.resolved}
              icon={<CheckCircle className="text-emerald-500" />}
            />
            <StatCard
              label="Investigating"
              value={statusCount.investigating}
              icon={<Activity className="text-blue-500" />}
            />
            <StatCard
              label="Ignored"
              value={statusCount.ignored || 0}
              icon={<AlertCircle className="text-rose-500" />}
            />
          </div>
          {toggleProfile && <Profile setToggleProfile={setToggleProfile} />}
          <div className=" flex gap-2 items-center justify-center">
            <NationalReports />

            <aside className="lg:w-95 sticky top-6 self-start hidden lg:block">
              <CityWatchAIAssistant />
            </aside>
          </div>
        </motion.div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes flicker {
          0% { opacity: 0.05; }
          5% { opacity: 0.15; }
          10% { opacity: 0.05; }
          15% { opacity: 0.2; }
          20% { opacity: 0.05; }
          100% { opacity: 0.05; }
        }
        .animate-flicker {
          animation: flicker 2s infinite;
        }
      `,
        }}
      />
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className={`flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all ${
      active
        ? "bg-rose-600 text-white shadow-lg shadow-rose-900/30"
        : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
    }`}
  >
    {icon}
    <span className="text-sm font-bold tracking-tight">{label}</span>
  </motion.div>
);

const StatCard = ({ icon, label, value }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5 }}
    className="bg-[#161b22]/40 p-8 rounded-3xl border border-white/5 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      {icon}
    </div>
    <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">
      {label}
    </p>
    <p className="text-3xl font-black text-white">{value}</p>
  </motion.div>
);

const TableRow = ({ id, loc, status, color }) => (
  <tr className="hover:bg-white/5 transition-all group cursor-default">
    <td className="px-6 py-5 font-mono text-xs text-slate-500 group-hover:text-white transition-colors">
      {id}
    </td>
    <td className="px-6 py-5 font-bold tracking-tight">{loc}</td>
    <td
      className={`px-6 py-5 text-xs font-black uppercase tracking-tighter ${color}`}
    >
      {status}
    </td>
  </tr>
);

const AlertItem = ({ text, time }) => (
  <div className="flex flex-col gap-1 border-l border-white/10 pl-4 hover:border-rose-500 transition-all">
    <p className="text-sm text-slate-300 font-medium">{text}</p>
    <p className="text-[10px] text-slate-600 font-bold uppercase">{time}</p>
  </div>
);

export default Dashboard;
