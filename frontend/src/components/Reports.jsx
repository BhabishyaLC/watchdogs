import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";
import API from "../api/axios.js";
import { useReportStore } from "../store/userReportStore.js";
import toast from "react-hot-toast";
const Reports = () => {
  const { reports, fetchReports } = useReportStore();
  const [input, setInput] = useState("");

  const [pages, setPages] = useState(1);

  const categories = [
    "Infrastructure Damage",
    "Public Safety",
    "Utility Failure",
    "Transporatation",
    "Sanitation/Waste",
  ];
  const [activeMenu, setActiveMenu] = useState(null);
  const [updateReport, setUpdateReport] = useState(null);
  const statusOptions = [
    {
      label: "Pending",
      value: "pending",
      color: "bg-amber-500/20 text-amber-500",
    },
    {
      label: "Investigating",
      value: "investigating",
      color: "bg-blue-500/20 text-blue-500",
    },
    {
      label: "Resolved",
      value: "resolved",
      color: "bg-emerald-500/20 text-emerald-500",
    },
    {
      label: "Ignored",
      value: "ignored",
      color: "bg-slate-500/20 text-slate-400",
    },
  ];

  const [priority, setPriority] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReport = reports.filter((report) =>
    report.title.toLowerCase().includes(input.toLowerCase()),
  );

  const handleEditClick = (report) => {
    setUpdateReport(report);
    setPriority(report.priority);
    setNewStatus(report.status);
    setActiveMenu(null);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const updatedReport = {
      title: data.get("title"),
      location: data.get("location"),
      description: data.get("description"),
      priority: priority,
      status: newStatus,
    };
    try {
      const res = await API.put(
        `/report/updateReport/${updateReport._id}`,
        updatedReport,
      );

      console.log(res.data.message);

      toast.success(res.data.message);

      fetchReports();

      setUpdateReport(null);
    } catch (error) {
      console.log(error);
      toast.success(res.error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        const res = await API.delete(`/report/deleteReport/${id}`);

        toast.success(res.data.message);

        fetchReports();
      } catch (error) {
        console.log(error);
        toast.error(res.error.message);
      }
    } else {
      return;
    }
  };

  const getColor = (statusColor) => {
    switch (statusColor) {
      case "pending":
        return "bg-amber-500/20 text-amber-500";
      case "investigating":
        return "bg-blue-500/20 text-blue-500";
      case "resolved":
        return "bg-emerald-500/20 text-emerald-500";
      case "ignored":
        return "bg-red-500/20 text-red-400";
    }
  };

  console.log(reports);
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="text-rose-500 w-6 h-6" />
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Incident Reports
            </h1>
          </div>
          <p className="text-slate-400">
            Manage and track all submitted evidence logs from the field.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700 backdrop-blur-md">
            <span className="text-xs block text-slate-400 uppercase tracking-widest font-semibold">
              Total Reports
            </span>
            <span className="text-xl font-bold text-rose-500">
              {reports.length}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-4 mb-6 backdrop-blur-xl flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by Title..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-sm"
          />
          <Search className="absolute left-3.5 top-3 text-slate-500 w-4 h-4" />
        </div>

      
      </div>

      {updateReport && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Edit Report</h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 uppercase font-bold">
                  Title
                </label>
                <input
                  defaultValue={updateReport.title}
                  name="title"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 uppercase font-bold">
                  Description
                </label>
                <textarea
                  defaultValue={updateReport.description}
                  name="description"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white h-32"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 uppercase font-bold">
                  Location
                </label>
                <input
                  defaultValue={updateReport.location}
                  name="location"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Priority Level
                </label>
                <div className="flex gap-2 ">
                  {["Low", "Medium", "High"].map((level) => {
                    const isActive = level === priority;

                    return (
                      <button
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

              <div>
                <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">
                  Issue Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      name="status"
                      type="button"
                      onClick={() => setNewStatus(opt.value)}
                      className={` cursor-pointer px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                        newStatus === opt.value
                          ? `${opt.color} border-current`
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUpdateReport(null)}
                  className="cursor-pointer px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="bg-slate-800/20 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className=" overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/40 border-b border-slate-700">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Report ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Incident Details
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Priority
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {filteredReport.length > 0 ? (
              filteredReport
                .slice(pages * 3 - 3, pages * 3)
                .map((report, key) => (
                  <tbody className="divide-y divide-slate-700/50">
                    <tr className="hover:bg-slate-700/20 transition-colors group">
                      <td className="px-6 py-4 font-mono text-sm text-rose-400">
                        #CW-{key + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white mb-1">
                          {report.title}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
                          {report.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
                          <span className="text-xs font-semibold text-rose-500 uppercase">
                            {report.priority}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          id="colorStatus"
                          className={`flex items-center gap-2 text-xs font-medium ${getColor(report.status)}  border border-amber-400/20 px-2 py-1 rounded w-fit`}
                        >
                          <Clock className="w-3 h-3" />
                          {report.status}
                        </div>
                      </td>

                      <td>
                        <div className="relative">
                          <button
                            onClick={() => toggleMenu(report._id)}
                            className="cursor-pointer p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white absolute right-8 -bottom-4  "
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>

                          {activeMenu === report._id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveMenu(null)}
                              ></div>

                              <div className="absolute right-0 mt-2 w-36 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-20 overflow-hidden">
                                <button
                                  onClick={() => handleEditClick(report)}
                                  className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                                >
                                  <Pencil className="w-4 h-4 text-blue-400" />
                                  Update
                                </button>

                                <button
                                  onClick={() => handleDelete(report._id)}
                                  className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-slate-800"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-red-600">
                  No reports found
                </td>
              </tr>
            )}
          </table>
        </div>

        <div className="px-6 py-4 bg-slate-900/40 border-t border-slate-700 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Showing {reports.length} reports
          </span>
     
        </div>
      </div>
    </div>
  );
};

export default Reports;
