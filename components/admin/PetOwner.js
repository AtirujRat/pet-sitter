import search from "@/public/assets/admin/search.svg";
import Image from "next/image";
import { useState } from "react";

export default function PetOwner() {
  const [input, setInput] = useState("");
  return (
    <section className="w-full p-10 pb-20 bg-ps-gray-100">
      <div className="flex justify-between">
        <p className="text-h3">Pet Owner</p>
        <div className="relative">
          <input
            type="text"
            value={input}
            placeholder="Search..."
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="min-w-[240px] p-3 pr-4 border-ps-gray-200 text-ps-gray-400"
          />
          <Image
            src={search}
            alt={search}
            className="absolute bottom-[14px] right-4"
          />
        </div>
      </div>
    </section>
  );
}
