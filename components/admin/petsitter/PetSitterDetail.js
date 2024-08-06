import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useAdminPetSitter } from "@/context/AdminPetSitter";
import { useUser } from "@/context/User";

import ProfileSitter from "./ProfileSitter";
import Booking from "./Booking";
import Review from "./Review";
import arrow_icon from "@/public/assets/icons/icon-next.svg";
import iconExclamation from "@/public/assets/icons/icon-exclamation-circle.svg";
import close from "@/public/assets/icons/icon-x.svg";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import BookingModal from "@/components/sitters/booking/BookingModal";
import ConnectionServer from "@/components/ConnectionServer";

export default function PetSiiterDetail({ sitter, closeDetail }) {
  const [currenDetails, setCurrentDetails] = useState("profile");
  const [openModalReject, setOpenModalReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showTextAlert, setShowTextAlert] = useState("");
  const [showTypeAlert, setShowTypeAlert] = useState("");

  const { getStatusComponent, refresh, setRefresh, GetSitterProfile } =
    useAdminPetSitter();
  const { setConnection, connection } = useUser();

  async function changeSitterStatus(updatedStatus) {
    await axios
      .patch(`/api/sitters/getsitters`, {
        id: sitter.id,
        sitter_status: updatedStatus,
        reject_reason: rejectReason,
      })
      .then((res) => {
        GetSitterProfile();
      });
    setConnection(!connection);
    setRefresh(!refresh);
  }

  function handlerCloseModal() {
    setOpenModalReject(false);
  }

  return (
    <section className="w-full flex flex-col gap-6 bg-ps-gray-100">
      {connection && (
        <ConnectionServer type={showTypeAlert} text={showTextAlert} />
      )}
      <div className="flex items-center gap-[10px] justify-between">
        <div className="flex items-center gap-6">
          <Image
            className="w-[24px] h-[24px] rotate-180 cursor-pointer"
            src={arrow_icon}
            alt="arrow_icon"
            onClick={closeDetail}
          />
          <p className="text-h3">{sitter?.full_name}</p>
          <div className="text-b2">
            {getStatusComponent(sitter?.sitter_status)}
          </div>
        </div>
        <div className="flex gap-2">
          {sitter.sitter_status === "waiting for approval" && (
            <>
              <ButtonOrangeLight
                id="Reject"
                text="Reject"
                width="w-fit"
                onClick={() => {
                  setOpenModalReject(true);
                }}
              />
              <ButtonOrange
                id="Approve"
                text="Approve"
                width="w-fit"
                onClick={() => {
                  changeSitterStatus("approved");
                  setShowTypeAlert("success");
                  setShowTextAlert("Approved Successfully");
                }}
              />
            </>
          )}
        </div>
      </div>
      {sitter?.sitter_status === "rejected" ? (
        <div className="w-full h-[52px] px-4 bg-ps-gray-200 text-ps-red rounded-lg flex items-center gap-[10px]">
          <Image
            src={iconExclamation}
            width={20}
            height={20}
            alt="icon Exclamation"
          />
          Your request has not been approved: {"‘"}Admin{"’"}s suggestion here
          {"’"}
        </div>
      ) : null}

      <div className="relative w-full">
        <div className="flex items-center gap-[20px]">
          <div
            onClick={() => setCurrentDetails("profile")}
            className={`py-[16px] px-[32px] text-h4 rounded-t-2xl ${
              currenDetails === "profile"
                ? "bg-ps-white text-ps-orange-500"
                : "bg-ps-gray-200 text-ps-gray-400"
            } cursor-pointer`}
          >
            Profile
          </div>
          <div
            onClick={() => setCurrentDetails("Booking")}
            className={`py-[16px] px-[32px] text-h4 rounded-t-2xl ${
              currenDetails === "Booking"
                ? "bg-ps-white text-ps-orange-500"
                : "bg-ps-gray-200 text-ps-gray-400"
            } cursor-pointer`}
          >
            Booking
          </div>
          <div
            onClick={() => setCurrentDetails("reviews")}
            className={`py-[16px] px-[32px] text-h4 rounded-t-2xl ${
              currenDetails === "reviews"
                ? "bg-ps-white text-ps-orange-500"
                : "bg-ps-gray-200 text-ps-gray-400"
            } cursor-pointer`}
          >
            Reviews
          </div>
        </div>
        <div className="p-10 bg-ps-white rounded-r-lg rounded-b-lg min-h-[630px]">
          {currenDetails === "profile" && <ProfileSitter sitter={sitter} />}
          {currenDetails === "Booking" && <Booking sitter={sitter} />}
          {currenDetails === "reviews" && <Review sitter={sitter} />}
        </div>
      </div>

      {/* Modal Reject*/}
      <BookingModal
        openModal={openModalReject}
        setOpenModal={setOpenModalReject}
        closeModal={handlerCloseModal}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="max-w-[600px] w-full min-w-0 h-[360px] bg-ps-white rounded-2xl">
            <div className="border-b border-ps-gray-200 py-4 px-6 text-h4 flex justify-between">
              Reject Confirmation
              <Image
                src={close}
                width={24}
                height={24}
                alt="close"
                className="cursor-pointer"
                onClick={() => setOpenModalReject(false)}
              />
            </div>

            <div className="max-w[352px] w-full p-6 flex flex-col gap-6">
              <div>
                <label className="w-full text-b2">Reason and suggestion</label>
                <textarea
                  className="w-full h-[140px] border border-ps-gray-200 rounded-lg font-normal text-ps-gray-400"
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Admin’s suggestion here"
                ></textarea>
              </div>
              <div className="flex w-full justify-between">
                <ButtonOrangeLight
                  id="cancel"
                  text="Cancel"
                  width="w-[120px]"
                  onClick={() => setOpenModalReject(false)}
                />
                <ButtonOrange
                  id="reject Confirm"
                  text="Reject Booking"
                  width="w-fit"
                  onClick={() => {
                    setOpenModalReject(false);
                    changeSitterStatus("rejected");
                    setShowTypeAlert("success");
                    setShowTextAlert("Reject Successfully");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </BookingModal>
    </section>
  );
}
