import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Share2,
  MapPin,
  Clock,
  ShieldAlert,
  ThumbsUp,
  ExternalLink,
  MoreVertical,
  Filter,
  SearchCheck,
  Save,
} from "lucide-react";
import { useReportStore } from "../store/userReportStore";
import { formatDistanceToNow } from "date-fns";
import API from "../api/axios";
import { userAuthStore } from "../store/userAuthStore";
import toast from "react-hot-toast";
const NationalReports = () => {

  const { allReports, fetchAllReports, updateReportInStore } = useReportStore();
  const { user } = userAuthStore();
  console.log(allReports);
  useEffect(() => {
    fetchAllReports();
  }, []);

  const handleLike = async (id) => {
    try {
      const res = await API.put(`/report/like/${id}`);
     updateReportInStore(res.data);
      
     await fetchAllReports()
    } catch (error) {}
  };

  const handleSaved=async(id)=>{
    try {
      const res= await API.put(`/auth/saved/${id}`)

      toast.success('Report saved...')
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="">
    
      <div className="max-w-2xl">
        <div className="space-y-8">
          {allReports.map((report, key) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: key * 0.1 }}
              className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm"
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={report.createdBy.profileImage ||report.createdBy.avatar}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        {report.createdBy.userName || report.createdBy.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        {formatDistanceToNow(new Date(report.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-white p-1 cursor-pointer" onClick={()=>handleSaved(report._id)}>
                  <Save size={18} />
                </button>
              </div>

              <div className="px-4 pb-3">
                <h2 className="text-lg font-bold text-slate-100 mb-2 underline decoration-rose-500/30">
                  {report.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {report.description}
                </p>
                <div className="flex items-center gap-2 mt-3 text-rose-400 text-xs font-medium">
                  <MapPin className="w-3 h-3" />
                  <span>{report.location}</span>
                </div>
              </div>

              <div className="relative aspect-video bg-slate-800 group cursor-pointer overflow-hidden">
                <img
                  src={report.images}
                  referrerPolicy="no-referrer"
                  alt="Incident evidence"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                  {report.category}
                </div>
              </div>

              <div className="p-4 flex items-center justify-between border-t border-slate-800/50">
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    onClick={() => handleLike(report._id)}
                    className="cursor-pointer flex items-center gap-2 text-slate-400 hover:text-green-500 transition-colors"
                  >
                    <SearchCheck className="w-7  h-7" />
                    <span className="text-xs font-semibold">Confirm</span>
                    <span className="text-xs font-semibold">{report.like?.length}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 rounded-lg">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">
                    {report.priority}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="py-12 flex justify-center">
          <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-sm font-bold text-slate-300 transition-all active:scale-95">
            Load More Stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default NationalReports;
