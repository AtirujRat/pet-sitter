import search from "@/public/assets/admin/search.svg";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import PetOwnerDetail from "@/components/admin/petowner/PetOwnerDetail";
import { useAdminPetOwner } from "@/context/AdminPetOwner";
import { usePagination } from "@/hook/usePagination";
import profile_icon from "@/public/assets/booking/owner-profile.svg";
export default function PetOwner() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    owners,
    currentOwner,
    ownerError,
    ownerLoading,
    searchOwnerInput,
    setSearchOwnerInput,
    isBanUserModalOpened,
    isPetOwnerDetailModalOpened,
    toggleOwnerDetailHandle,
    getCurrentOwner,
  } = useAdminPetOwner();

  const ownerPerPage = 8;
  const lastOwnerIndex = currentPage * ownerPerPage;
  const firstPostIndex = lastOwnerIndex - ownerPerPage;
  const paginateOwner = owners.slice(firstPostIndex, lastOwnerIndex);

  useEffect(() => {
    getCurrentOwner(currentOwner?.email);
  }, [isBanUserModalOpened]);

  console.log(owners);

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
                value={searchOwnerInput}
                placeholder="Search..."
                onChange={(e) => {
                  setSearchOwnerInput(e.target.value);
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

          <table className="table table-fixed h-[790px] overflow-hidden ">
            <thead>
              <tr className="flex bg-ps-black rounded-t-xl">
                <th className="text-ps-white text-b3 w-[25%]">Pet Owner</th>
                <th className="text-ps-white text-b3 w-[20%]">Phone</th>
                <th className="text-ps-white text-b3 w-[25%]">Email</th>
                <th className="text-ps-white text-b3 w-[15%]">Pet(s)</th>
                <th className="text-ps-white text-b3 w-[15%]">Status</th>
              </tr>
            </thead>

            <tbody>
              {ownerLoading && <Loading />}
              {ownerError && <p>{ownerError}</p>}
              {searchOwnerInput.length >= 1 ? (
                <>
                  {owners.map((owner, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => toggleOwnerDetailHandle(owner)}
                        className={`flex items-center bg-ps-white border-b-[1px] border-ps-gray-200 py-[8px] px-[16px] cursor-pointer ${
                          index + 1 === paginateOwner.length &&
                          "rounded-b-2xl border-none"
                        }`}
                      >
                        <td className="flex items-center gap-[10px] text-b2 text-ps-black w-[25%] ">
                          <img
                            className="w-[44px] h-[44px] rounded-full object-cover"
                            src={owner.profile_image_url}
                            alt="owner profile"
                          />
                          {owner.full_name}
                        </td>
                        <td className=" text-ps-black text-b2 w-[20%] ">
                          {owner.phone_number}
                        </td>
                        <td className="text-ps-black text-b2 w-[25%] ">
                          {owner.email}
                        </td>
                        <td className="text-ps-black text-b2 w-[15%] ">
                          {owner.pets.length}
                        </td>
                        <td className="text-ps-black text-b2 w-[15%]">
                          <li
                            className={`${
                              owner.member_status === "Baned"
                                ? "text-ps-red"
                                : "text-ps-green-500"
                            }`}
                          >
                            {owner.member_status}
                          </li>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  {paginateOwner.map((owner, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => toggleOwnerDetailHandle(owner)}
                        className={`flex items-center bg-ps-white border-b-[1px] border-ps-gray-200 py-[8px] px-[16px] cursor-pointer  ${
                          index + 1 === paginateOwner.length &&
                          "rounded-b-2xl border-none"
                        }`}
                      >
                        <td className="flex items-center gap-[10px] text-b2 text-ps-black w-[25%]">
                          {owner.profile_image_url === null ? (
                            <Image
                              className="w-[44px] h-[44px] rounded-full object-cover"
                              src={profile_icon}
                              alt={profile_icon}
                            />
                          ) : (
                            <img
                              className="w-[44px] h-[44px] rounded-full object-cover"
                              src={owner.profile_image_url}
                              alt="owner profile"
                            />
                          )}

                          {owner.full_name}
                        </td>
                        <td className=" text-ps-black text-b2 w-[20%]">
                          {owner.phone_number}
                        </td>
                        <td className="text-ps-black text-b2 w-[25%]">
                          {owner.email}
                        </td>
                        <td className="text-ps-black text-b2 w-[15%] ">
                          {owner.pets.length}
                        </td>
                        <td className="text-ps-black text-b2 w-[15%]  ">
                          <li
                            className={`${
                              owner.member_status === "Baned"
                                ? "text-ps-red"
                                : "text-ps-green-500"
                            } text-b2`}
                          >
                            {owner.member_status}
                          </li>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
              <div className="mt-[20px]">
                {searchOwnerInput.length <= 1 &&
                  usePagination(
                    owners,
                    ownerPerPage,
                    currentPage,
                    setCurrentPage
                  )}
              </div>
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
