import { useAdminReport } from "@/context/AdminReports";
import React, { useEffect, useState } from "react";
import arrow_icon from "@/public/assets/icons/icon-next.svg";
import axios from "axios";
import Image from "next/image";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import { useGetOnlyDate } from "@/hook/useGetOnlyDate";
import Modal from "@/components/modal/Modal";
import CancelReport from "@/components/admin/reports/modal/CancelReportModal";
import ResolveModal from "@/components/admin/reports/modal/ResolveModal";

export default function ReportDetail(props) {
  const [report, setReport] = useState([]);

  const {
    currentReport,
    isCancelReportModalOpened,
    cancelReportToggle,
    isResolveModalOpened,
    resolveToggle,
  } = useAdminReport();

  const REPORT_STATUS = {
    NewReport: "text-ps-pink-500",
    Pending: "text-ps-blue-500",
    Resolved: "text-ps-green-500",
    Canceled: "text-ps-red",
  };

  async function updateToPendingReport() {
    if (currentReport?.status === "New Report") {
      await axios.put(`/api/reports/reports/?id=${currentReport?.id}`, {
        status: "Pending",
      });
    }
  }

  async function updateReport() {
    try {
      const report = await axios.get(
        `/api/reports/queryreport/?id=${currentReport?.id}`
      );
      setReport(report.data);
    } catch {
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    updateToPendingReport();
  }, []);

  useEffect(() => {
    updateReport();
  }, [isCancelReportModalOpened, isResolveModalOpened]);

  return (
    <div className="flex flex-col gap-[10px]">
      {isCancelReportModalOpened && (
        <Modal>
          <CancelReport closeModal={cancelReportToggle} />
        </Modal>
      )}
      {isResolveModalOpened && (
        <Modal>
          <ResolveModal closeModal={resolveToggle} />
        </Modal>
      )}

      {report ? (
        <>
          <div className="flex justify-between">
            <div className="flex items-center gap-[10px]">
              <Image
                className="w-[24px] h-[24px] rotate-180 cursor-pointer"
                src={arrow_icon}
                alt="arrow_icon"
                onClick={() => props.closeModal()}
              />
              <p className="text-h3 truncate w-[20%]">{report[0]?.issue}</p>
              <li className={`${REPORT_STATUS[report[0]?.status]} text-b2`}>
                {report[0]?.status}
              </li>
            </div>
            <div className="flex items-center gap-[10px]">
              <ButtonOrangeLight
                onClick={() => cancelReportToggle()}
                text="Cancel Report"
              />
              <ButtonOrange onClick={() => resolveToggle()} text="Resolve" />
            </div>
          </div>
          <div className="flex flex-col gap-[50px] bg-ps-white rounded-2xl p-[40px]">
            <div className="flex flex-col gap-[4px]">
              <h1 className="text-h4 text-ps-gray-300">Reported By</h1>
              <p>{report[0]?.bookings.owners.full_name}</p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h1 className="text-h4 text-ps-gray-300">Reported Person</h1>
              <p>{report[0]?.bookings.sitters.full_name}</p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h1 className="text-h4 text-ps-gray-300">Issue</h1>
              <p>{report[0]?.issue}</p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h1 className="text-h4 text-ps-gray-300">Description</h1>
              <p>{report[0]?.description}</p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h1 className="text-h4 text-ps-gray-300">Date Submitted</h1>
              <p> {useGetOnlyDate(report[0]?.created_at)}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Something went wrong</p>
      )}
    </div>
  );
}
