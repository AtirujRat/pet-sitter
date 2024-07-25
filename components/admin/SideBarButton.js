import { useAdmin } from "@/context/Admin";
import Image from "next/image";
import { useState } from "react";

export default function SideBarButton(props) {
  const { state, setState } = useAdmin();
  return (
    <button
      onClick={() => {
        setState(props.state);
      }}
      className={
        state === props.state
          ? "w-full py-4 px-6 bg-ps-gray-600 flex gap-4"
          : "w-full py-4 px-6 flex gap-4"
      }
    >
      <Image src={props.img} alt={props.img} className="w-6" />
      <p
        className={
          state === props.state
            ? "text-b2 text-ps-white"
            : "text-b2 text-ps-gray-300"
        }
      >
        {props.name}
      </p>
    </button>
  );
}
