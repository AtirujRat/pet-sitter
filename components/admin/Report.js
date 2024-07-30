import Image from "next/image";

import drop_down from "@/public/assets/icons/icon-dropdown.svg";
import { useGetOnlyDate } from "@/hook/useGetOnlyDate";
import Loading from "@/components/Loading";
import { useAdminReport } from "@/context/AdminReports";
import ReportDetail from "@/components/admin/reports/ReportDetail";
import FilterDropdown from "./reports/FilterDropdown";

const REPORT_STATUS = {
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
    filtedReport,
    isReportDetailOpened,
    reportDetailToggle,
    isDropdownOpened,
    dropdownToggle,
  } = useAdminReport();

  return (
    <section className="w-full  flex flex-col gap-[24px] p-10 pb-20 bg-ps-gray-100">
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
              <p className="text-ps-gray-400">
                {filtedReport ? filtedReport : "All status"}
              </p>
              <Image
                src={drop_down}
                alt={drop_down}
                className="w-[10px] h-[10px]"
              />
              {isDropdownOpened && <FilterDropdown />}
            </div>
          </div>

          <div className="w-full rounded-2xl bg-ps-white overflow-hidden">
            <div className=" flex items-center bg-ps-black py-[12px] px-[16px]">
              <div className="text-ps-white w-[20%]">User</div>
              <div className="text-ps-white w-[15%]">Reported Person</div>
              <div className="text-ps-white w-[25%]">Issue</div>
              <div className="text-ps-white w-[25%]">Date Submitted</div>
              <div className="text-ps-white w-[15%]">Status</div>
            </div>
            <div>
              {loading && <Loading />}
              {error && <h1 className="text-ps-red p-[24px]">{error}</h1>}
              {reports
                .filter((item) => {
                  if (filtedReport) {
                    return item.status === filtedReport;
                  } else {
                    return item;
                  }
                })
                .map((report, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => reportDetailToggle(report)}
                      className=" flex items-center py-[24px] px-[16px] cursor-pointer gap-[24px]"
                    >
                      <div className="w-[20%]">
                        {report.bookings.owners.full_name}
                      </div>
                      <div className="w-[15%]">
                        {report.bookings.sitters.full_name}
                      </div>
                      <div className="w-[25%] truncate">{report.issue}</div>
                      <div className="w-[25%]">
                        {useGetOnlyDate(report.created_at)}
                      </div>
                      <li
                        className={`${
                          REPORT_STATUS[report.status.replace(/\s/g, "")]
                        } w-[15%]`}
                      >
                        {report.status}
                      </li>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
