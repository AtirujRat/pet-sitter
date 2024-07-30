import { useAdminReport } from "@/context/AdminReports";
import React from "react";

export default function FilterDropdown() {
  const { setFilteredReport } = useAdminReport();

  return (
    <div className="absolute flex flex-col left-0 top-[46px] bg-ps-white w-full  rounded-b-2xl border-[1px] border-ps-gray-200">
      <button
        onClick={() => setFilteredReport(null)}
        className="text-start text-ps-gray-400  border-t-[1px] border-ps-gray-200 py-[12px] px-[16px] "
      >
        All status
      </button>
      <button
        onClick={() => setFilteredReport("New Report")}
        className="text-start text-ps-pink-500 border-t-[1px] border-ps-gray-200 py-[12px] px-[16px] "
      >
        New Report
      </button>
      <button
        onClick={() => setFilteredReport("Pending")}
        className="text-start text-ps-blue-500  border-t-[1px] border-ps-gray-200 py-[12px] px-[16px] "
      >
        Pending
      </button>
      <button
        onClick={() => setFilteredReport("Resolved")}
        className="text-start text-ps-green-500  border-t-[1px] border-ps-gray-200 py-[12px] px-[16px] "
      >
        Resolved
      </button>
      <button
        onClick={() => setFilteredReport("Canceled")}
        className="text-start text-ps-red  border-t-[1px] border-ps-gray-200 py-[12px] px-[16px] "
      >
        Canceled
      </button>
    </div>
  );
}
