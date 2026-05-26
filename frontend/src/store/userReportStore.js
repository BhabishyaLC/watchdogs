import { create } from "zustand";
import API from "../api/axios";

export const useReportStore = create((set) => ({
  reports: [],
  allReports: [],
  overallReports:[],
  fetchReports: async () => {
    const res = await API.get("/report/my-reports");
    set({ reports: res.data.reports });
  },
  fetchAllReports: async () => {
    const res = await API.get("/report/all-reports");
    set({ allReports: res.data.reports });
   
  },

  fetchOverallReports:async()=>{
    const res=await API.get('/report/overall_reports')
    set({overallReports:res.data.overallReports})
   
  },
  updateReportInStore: (updatedReport) =>
    set((state) => ({
      allReports: state.allReports.map((r) =>
        r._id === updatedReport._id ? updatedReport : r,
      ),
    })),
}));
