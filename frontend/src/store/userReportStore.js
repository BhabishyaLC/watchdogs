import { create } from "zustand";
import API from "../api/axios";

export const useReportStore = create((set) => ({
  reports: [],
  allReports: [],
  fetchReports: async () => {
    const res = await API.get("/report/my-reports");
    set({ reports: res.data.reports });
  },
  fetchAllReports: async () => {
    const res = await API.get("/report/all-reports");
    set({ allReports: res.data.reports });
    console.log(res.data.reports)
  },
  updateReportInStore: (updatedReport) =>
    set((state) => ({
      allReports: state.allReports.map((r) =>
        r._id === updatedReport._id ? updatedReport : r,
      ),
    })),
}));
