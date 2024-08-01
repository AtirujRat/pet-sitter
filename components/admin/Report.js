import Image from "next/image";

import drop_down from "@/public/assets/icons/icon-dropdown.svg";
import { useGetOnlyDate } from "@/hook/useGetOnlyDate";
import Loading from "@/components/Loading";
import { useAdminReport } from "@/context/AdminReports";
import ReportDetail from "@/components/admin/reports/ReportDetail";
import FilterDropdown from "./reports/FilterDropdown";

const REPORT_STATUS = {
  Allstatus: "text-ps-gray-400",
  NewReport: "text-ps-pink-500",
  Pending: "text-ps-blue-500",
  Resolved: "text-ps-green-500",
  Canceled: "text-ps-red",
};

export default function Report() {
  const {
    loading,
    error,
    reports,
    filteredReport,
    isReportDetailOpened,
    reportDetailToggle,
    isDropdownOpened,
    dropdownToggle,
  } = useAdminReport();

  return (
    <div className="w-full flex flex-col gap-[24px] p-10 pb-20 bg-ps-gray-100">
      {isReportDetailOpened ? (
        <ReportDetail closeModal={reportDetailToggle} />
      ) : (
        <>
          <div className=" flex items-center justify-between">
            <p className=" text-h3 text-[#2A2E3F]">Report</p>
            <div
              onClick={() => dropdownToggle()}
              className={`relative flex justify-between items-center w-[240px] h-[48px] bg-ps-white ${
                isDropdownOpened ? "rounded-t-lg" : "rounded-lg"
              } border-[1px] border-ps-gray-200 py-[12px] px-[16px] cursor-pointer  `}
            >
              <p
                className={`${
                  REPORT_STATUS[String(filteredReport).replace(/\s/g, "")]
                }`}
              >
                {filteredReport ? (
                  filteredReport
                ) : (
                  <p className="text-ps-gray-400">All status</p>
                )}
              </p>
              <Image
                src={drop_down}
                alt={drop_down}
                className="w-[10px] h-[10px]"
              />
              {isDropdownOpened && <FilterDropdown />}
            </div>
          </div>

          <table className="table table-fixed rounded-2xl bg-ps-white overflow-hidden ">
            <thead>
              <tr className="flex items-center bg-ps-black">
                <th className="text-ps-white py-[12px] px-[16px] text-b3 text-start w-[15%]">
                  User
                </th>
                <th className="text-ps-white py-[12px] px-[16px] text-b3 text-start w-[15%]">
                  Reported Person
                </th>
                <th className="text-ps-white py-[12px] px-[16px] text-b3 text-start w-[30%]">
                  Issue
                </th>
                <th className="text-ps-white py-[12px] px-[16px] text-b3 text-start w-[20%]">
                  Date Submitted
                </th>
                <th className="text-ps-white py-[12px] px-[16px] text-b3 text-start w-[20%]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td>
                    <Loading />
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td>{error}</td>
                </tr>
              )}
              {reports.map((report, index) => (
                <tr
                  key={index}
                  onClick={() => reportDetailToggle(report)}
                  className="flex items-center cursor-pointer"
                >
                  <td className="py-[24px] px-[16px] text-b2 w-[15%] ">
                    {report.bookings.owners.full_name}
                  </td>
                  <td className="py-[24px] px-[16px] text-b2 w-[15%]">
                    {report.bookings.sitters.full_name}
                  </td>
                  <td className="py-[24px] px-[16px] truncate text-b2 w-[30%]">
                    {report.issue}
                  </td>
                  <td className="py-[24px] px-[16px] text-b2 w-[20%]">
                    {useGetOnlyDate(report.created_at)}
                  </td>
                  <td
                    className={`${
                      REPORT_STATUS[report.status.replace(/\s/g, "")]
                    } py-[24px] px-[16px]  text-b2 w-[20%]`}
                  >
                    {report.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
