import React, { useEffect, useState } from "react";
import API from "../api/axios.js";
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
  SaveOff,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
const SavedReport = () => {
  const [saved, setSaved] = useState([]);
  const savedReport = async () => {
    try {
      const res = await API.get("/auth/getSavedReport/");
      console.log(res.data.savedReport);
      setSaved(res.data.savedReport);
    } catch (error) {
      console.log(error);
    }
  };
   const handleSaved=async(id)=>{
    try {
      const res= await API.put(`/auth/saved/${id}`)

      savedReport()
      toast.success('Report unsaved!')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    savedReport();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="sticky top-0 z-10 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-white tracking-tight">
            Saved Reports
          </h1>
          <button className="p-2 hover:bg-slate-800 rounded-full transition-colors"></button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto py-6 px-4">
        <div className="">
          {saved.length ? (
            <div>
              {saved.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm mb-5"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.createdBy.profileImage || item.createdBy.avatar
                        }
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full"
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">
                            {item?.createdBy.userName || item?.createdBy.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-500  p-1 cursor-pointer" type="button" onClick={()=>handleSaved(item._id)}>
                      <SaveOff className="w-5 h-5 text-slate-400 hover:text-white" />
                    </button>
                  </div>

                  <div className="px-4 pb-3">
                    <h2 className="text-lg font-bold text-slate-100 mb-2 underline decoration-rose-500/30">
                      {item.title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-rose-400 text-xs font-medium">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="relative aspect-video bg-slate-800 group cursor-pointer overflow-hidden">
                     {item.images && item.images.length > 0 ? (
                <div
                  className={` px-1  grid gap-2 mt-3 ${
                    item.images.length === 1 ? "row-span-1" : "grid-cols-2"
                  }`}
                >
                  {item.images.map((imgUrl, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden border border-slate-800/80 bg-slate-900/40"
                    >
                      <button
                        className=" h-full w-full"
                        onClick={() => window.open(imgUrl)}
                        type="button"
                      >
                        <img
                          src={imgUrl}
                          alt={`Report attachment ${index + 1}`}
                          className="cursor-pointer w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/600x400/0f121d/64748b?text=Image+Unavailable";
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-600 italic mt-2">
                  No attachments provided.
                </div>
              )}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between border-t border-slate-800/50">
                    <div className="flex items-center gap-6">
                      <button
                        type="button"
                        className="cursor-pointer flex items-center gap-2 text-slate-400 hover:text-green-500 transition-colors"
                      >
                        <SearchCheck className="w-7  h-7" />
                        <span className="text-xs font-semibold">Confirm</span>
                        <span className="text-xs font-semibold">
                          {item.like?.length}
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 rounded-lg">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">
                        {item.priority}
                      </span>
                    </div>
                  </div>
                
                </motion.div>
                
              ))}
              
            </div>
          ) : (
            <div className="py-12 flex justify-center">
              <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-sm font-bold text-slate-300 transition-all active:scale-95">
                No saved reports
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedReport;
