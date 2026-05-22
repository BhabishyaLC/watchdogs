import React from "react";
import { motion } from "framer-motion";
import {
  Send,
  Image as ImageIcon,
  MapPin,
  AlertTriangle,
  Info,
  X,
  ChevronLeft,
  UploadCloud,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const ReportIncident = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Infrastructure Damage",

    location: "",
    description: "",
  });

  const [priority, setPriority] = useState("Low");

  const [images, setImages] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleBrowseClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isSmallEnough = file.size <= MAX_FILE_SIZE;

      if (!isImage) alert(`${file.name} is not an image!`);
      if (!isSmallEnough) alert(`${file.name} is too large (Max 5MB)!`);

      return isImage && isSmallEnough;
    });

    setImages((prev) => [...prev, ...validFiles]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);

    const imageFiles = droppedFiles.filter((file) =>
      file.type.startsWith("image/"),
    );

    setImages((prev) => [...prev, ...imageFiles]);
  };
  const handleChange = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    setLoading(true);

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("description", formData.description);

    data.append("priority", priority);

    images.forEach((file) => {
      data.append("images", file);
    });

    try {
      const response = await API.post("/report", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const message = response.data.message;
      toast.success(message);
      setFormData({
        title: "",
        category: "Infrastructure Damage",
        location: "",
        description: "",
      });
      setPriority("Low");
      setImages([]);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f1a] text-slate-200 p-4 md:p-10 overflow-x-hidden">
      <div className="absolute top-0 right-0 w-125 h-125 bg-rose-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <Link to='/dashboard'>
              <button className=" cursor-pointer flex items-center gap-2 text-slate-500 hover:text-rose-400 transition-colors mb-4 group">
                <ChevronLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Back to Terminal
              </button>
            </Link>

            <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
              <ShieldAlert className="text-rose-500" size={36} />
              FILE INCIDENT REPORT
            </h1>
            
          </div>
        </motion.div>

        <form action="" onSubmit={handleSubmit}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#161b22]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Incident Title
                    </label>
                    <input
                      name="title"
                      type="text"
                      placeholder="Brief headline of the issue..."
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-rose-500/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-rose-500/50 transition-all text-slate-300 appearance-none"
                      >
                        <option
                          value="Infrastructure Damage"
                          className=" bg-black"
                        >
                          Infrastructure Damage
                        </option>
                        <option value="Public Safety" className=" bg-black">
                          Public Safety
                        </option>
                        <option value="Sanitation/Waste" className=" bg-black">
                          Sanitation/Waste
                        </option>
                        <option value="Utility Failure" className=" bg-black">
                          Utility Failure
                        </option>
                        <option value="Transportation" className=" bg-black">
                          Transporation
                        </option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                        Priority Level
                      </label>

                      <div className="flex gap-2">
                        {["Low", "Medium", "High"].map((level) => {
                          const isActive = priority === level;

                          return (
                            <button
                              name="priority"
                              key={level}
                              type="button"
                              required
                              onClick={() => setPriority(level)}
                              className={`cursor-pointer flex-1 py-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest ${
                                isActive
                                  ? "bg-rose-500/20 border-rose-500 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                                  : "bg-white/5 border-white/10 text-slate-500 hover:bg-white/10"
                              }`}
                            >
                              {level}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Location / Landmark
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500"
                        size={18}
                      />
                      <input
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="Street address or nearby landmark..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-rose-500/50 transition-all text-white placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Detailed Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Describe the situation in detail..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-rose-500/50 transition-all text-white placeholder:text-slate-600 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="bg-[#161b22]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-rose-500/50"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-4">
                  Evidence Upload (Images){" "}
                  <span className=" italic">*optional</span>
                </label>

                <div className="space-y-4">
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleBrowseClick}
                    className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group ${
                      isDragging
                        ? "border-rose-500 bg-rose-500/10 scale-[1.01]"
                        : "border-white/10 bg-white/2 hover:border-rose-500/30"
                    }`}
                  >
                    <div
                      className={`p-4 rounded-full transition-transform ${
                        isDragging
                          ? "bg-rose-500 text-white scale-110"
                          : "bg-rose-500/10 text-rose-500 group-hover:scale-110"
                      }`}
                    >
                      <UploadCloud size={32} />
                    </div>

                    <div className="text-center">
                      <p className="text-white font-bold">
                        {isDragging
                          ? "Drop to Upload"
                          : "Drag & Drop Images (videos not allowed)"}
                      </p>
                      <p className="text-slate-500 text-sm">
                        JPG, PNG or WEBP (Max 5MB per file)
                      </p>
                    </div>

                    <button
                      type="button"
                      className=" cursor-pointer mt-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-wider text-slate-300"
                    >
                      Browse Files
                    </button>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      {images.map((file, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-xl overflow-hidden border border-white/10"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setImages(images.filter((_, i) => i !== index));
                            }}
                            className=" absolute top-1 right-1 bg-black/60 p-1 rounded-full text-white hover:bg-rose-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-rose-600 rounded-3xl p-8 shadow-xl shadow-rose-900/20 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle size={24} />
                  <h3 className="font-black text-lg uppercase italic">
                    Safety First
                  </h3>
                </div>
                <p className="text-rose-100 text-sm leading-relaxed mb-6">
                  If this is a life-threatening emergency, please contact local
                  emergency services immediately before filing a report.
                </p>
                <div className="bg-rose-700/50 rounded-2xl p-4 border border-white/10">
                  
                
                </div>
              </div>

              <div className="bg-[#161b22]/60 border border-white/5 rounded-3xl p-8">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Info size={14} className="text-blue-500" />
                  Reporting Tips
                </h3>
                <ul className="space-y-4">
                  <TipItem text="Clear photos of the surrounding area help crews locate issues faster." />
                  <TipItem text="Be specific about landmarks if a street address isn't available." />
                  <TipItem text="Check 'My Reports' to track the progress of this ticket." />
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={` cursor-pointer w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-slate-800 cursor-not-allowed opacity-70"
                    : "bg-rose-600 hover:bg-rose-700 active:scale-95"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>TRANSMITTING EVIDENCE...</span>
                  </>
                ) : (
                  "SUBMIT REPORT"
                )}
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

const TipItem = ({ text }) => (
  <li className="flex gap-3 items-start group">
    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 group-hover:scale-150 transition-transform" />
    <p className="text-xs text-slate-400 leading-relaxed font-medium">{text}</p>
  </li>
);

export default ReportIncident;
