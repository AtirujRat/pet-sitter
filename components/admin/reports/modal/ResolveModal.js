import React from "react";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import axios from "axios";
import { useAdminReport } from "@/context/AdminReports";

export default function ResolveModal(props) {
  const { currentReport } = useAdminReport();

  async function resolvedReport() {
    try {
      const resolvedReport = await axios.put(
        `/api/reports/reports/?id=${currentReport.id}`,
        {
          status: "Resolved",
        }
      );
      if (resolvedReport) {
        props.closeModal();
      }
    } catch {
      alert("Could not resolve this report");
    }
  }

  return (
    <div className="w-[400px] h-[208px] bg-ps-white rounded-2xl">
      <div className="flex max-w-full justify-between border-b-[1px] border-ps-gray-200 py-[16px] px-[24px]">
        <h1 className="text-h4 text-ps-black">Resolve Report</h1>
        <Image
          onClick={() => props.closeModal()}
          className="cursor-pointer"
          src={cross_icon}
          alt="cross icon"
        />
      </div>
      <div className="flex flex-col gap-[24px] p-[24px]">
        <p className="text-b2 text-ps-gray-400">
          Has this report already been resolved?
        </p>
        <div className="flex justify-between">
          <ButtonOrangeLight onClick={() => props.closeModal()} text="Cancel" />
          <ButtonOrange onClick={() => resolvedReport()} text="Resolved" />
        </div>
      </div>
    </div>
  );
}
