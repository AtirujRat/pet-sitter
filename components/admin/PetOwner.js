import search from "@/public/assets/admin/search.svg";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import arrow_icon from "@/public/assets/icons/icon-next.svg";
import PetOwnerDetail from "@/components/admin/PetOwnerDetail";
import { useAdminPetOwner } from "@/context/AdminPetOwner";

export default function PetOwner() {
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOwner, setFilteredOwner] = useState([]);

  const {
    owners,
    currentOwner,
    ownerError,
    ownerLoading,
    isBanUserModalOpened,
    isPetOwnerDetailModalOpened,
    toggleOwnerDetailHandle,
    getCurrentOwner,
  } = useAdminPetOwner();

  const ownerPerPage = 8;
  const lastOwnerIndex = currentPage * ownerPerPage;
  const firstPostIndex = lastOwnerIndex - ownerPerPage;
  const paginateOwner = owners.slice(firstPostIndex, lastOwnerIndex);

  function pagination(totalOwner, ownerPerPage) {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalOwner / ownerPerPage); i++) {
      pages.push(i);
    }

    function nextPageHandle() {
      if (currentPage === pages.length) {
        return;
      }
      setCurrentPage((prev) => prev + 1);
    }
    function previousPageHandle() {
      if (currentPage === 1) {
        return;
      }
      setCurrentPage((prev) => prev - 1);
    }

    return (
      <div className="flex items-center justify-center mt-[20px] gap-[15px]">
        <Image
          onClick={previousPageHandle}
          className="cursor-pointer rotate-180"
          src={arrow_icon}
          alt="arrow icon"
        />
        <div className="flex gap-[12px]">
          {pages.map((page, index) => {
            return (
              <button
                onClick={() => setCurrentPage(page)}
                className={`w-[40px] h-[40px] ${
                  index + 1 === currentPage
                    ? "bg-ps-orange-100 text-ps-orange-500"
                    : "bg-ps-white text-ps-gray-300"
                }   rounded-full text-[16px] font-[700]`}
                key={index}
              >
                {page}
              </button>
            );
          })}
        </div>
        <Image
          onClick={nextPageHandle}
          className="cursor-pointer"
          src={arrow_icon}
          alt="arrow icon"
        />
      </div>
    );
  }

  function removeWhiteSpace(value) {
    return value.replace(/\s/g, "").toLowerCase();
  }

  function filterOwnersHandle(value) {
    const trimmedValue = removeWhiteSpace(value);
    const remove = owners.filter((item) => {
      if (removeWhiteSpace(String(item.phone_number)).includes(trimmedValue)) {
        return item;
      } else if (
        removeWhiteSpace(String(item.full_name)).includes(trimmedValue)
      ) {
        return item;
      } else if (removeWhiteSpace(String(item.email)).includes(trimmedValue)) {
        return item;
      }
    });
    setFilteredOwner(remove);
  }

  useEffect(() => {
    filterOwnersHandle(input);
  }, [input]);

  useEffect(() => {
    getCurrentOwner(currentOwner?.email);
  }, [isBanUserModalOpened]);

  return (
    <section className="w-full flex flex-col gap-[24px] p-10 pb-20 bg-ps-gray-100">
      {isPetOwnerDetailModalOpened ? (
        <PetOwnerDetail closeModal={toggleOwnerDetailHandle} />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-h3 text-[#2A2E3F]">Pet Owner</p>
            <div className="relative">
              <input
                type="text"
                value={input}
                placeholder="Search..."
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                className="min-w-[240px] p-3 pr-4 border-ps-gray-200 text-ps-gray-400 rounded-lg"
              />
              <Image
                src={search}
                alt={search}
                className="absolute bottom-[14px] right-4"
              />
            </div>
          </div>

          <div className="w-full flex flex-col h-[790px] mx-auto overflow-hidden">
            <div className="flex bg-ps-black rounded-t-xl">
              <div className="text-ps-white w-[310px] py-[12px] px-[16px] ">
                Pet Owner
              </div>
              <div className="text-ps-white w-[257px] py-[12px] px-[16px] ">
                Phone
              </div>
              <div className="text-ps-white w-[400px] py-[12px] px-[16px] ">
                Email
              </div>
              <div className="text-ps-white w-[274px] py-[12px] px-[16px] ">
                Pet(s)
              </div>
              <div className="text-ps-white w-[170px] py-[12px] px-[16px] ">
                Status
              </div>
            </div>
            <div>
              {ownerLoading && <Loading />}
              {ownerError && <p>{ownerError}</p>}
              {input.length >= 1 ? (
                <>
                  {filteredOwner.map((owner, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => toggleOwnerDetailHandle(owner)}
                        className={`flex items-center bg-ps-white border-b-[1px] border-ps-gray-200 py-[20px] px-[16px] cursor-pointer  ${
                          index + 1 === paginateOwner.length &&
                          "rounded-b-2xl border-none"
                        }`}
                      >
                        <div className="flex items-center gap-[10px] text-ps-black w-[310px] ">
                          <img
                            className="w-[44px] h-[44px] rounded-full object-cover"
                            src={owner.profile_image_url}
                            alt="owner profile"
                          />
                          {owner.full_name}
                        </div>
                        <div className=" text-ps-black w-[257px]  ">
                          {owner.phone_number}
                        </div>
                        <div className="text-ps-black w-[400px] ">
                          {owner.email}
                        </div>
                        <div className="text-ps-black w-[274px] ">
                          {owner.pets.length}
                        </div>
                        <div className="text-ps-black w-[170px]  ">
                          <li
                            className={`${
                              owner.member_status === "Baned"
                                ? "text-ps-red"
                                : "text-ps-green-500"
                            }`}
                          >
                            {owner.member_status}
                          </li>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {paginateOwner.map((owner, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => toggleOwnerDetailHandle(owner)}
                        className={`flex items-center bg-ps-white border-b-[1px] border-ps-gray-200 py-[20px] px-[16px] cursor-pointer  ${
                          index + 1 === paginateOwner.length &&
                          "rounded-b-2xl border-none"
                        }`}
                      >
                        <div className="flex items-center gap-[10px] text-ps-black w-[310px] ">
                          <img
                            className="w-[44px] h-[44px] rounded-full object-cover"
                            src={owner.profile_image_url}
                            alt="owner profile"
                          />
                          {owner.full_name}
                        </div>
                        <div className=" text-ps-black w-[257px]  ">
                          {owner.phone_number}
                        </div>
                        <div className="text-ps-black w-[400px] ">
                          {owner.email}
                        </div>
                        <div className="text-ps-black w-[274px] ">
                          {owner.pets.length}
                        </div>
                        <div className="text-ps-black w-[170px]  ">
                          <li
                            className={`${
                              owner.member_status === "Baned"
                                ? "text-ps-red"
                                : "text-ps-green-500"
                            }`}
                          >
                            {owner.member_status}
                          </li>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
              {input.length <= 1 && pagination(owners.length, ownerPerPage)}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
