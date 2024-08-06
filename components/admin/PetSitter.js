import Image from "next/image";
import { useAdminPetSitter } from "@/context/AdminPetSitter";
import { useSitters } from "@/context/SittersProvider";
import { useRouter } from "next/navigation";
import searchIcon from "@/public/assets/icons/icon-search.svg";
import userImage from "@/public/assets/account/profile_white.svg";
import PetSitterDetail from "./petsitter/PetSitterDetail";
import { DebounceInput } from "react-debounce-input";
import Pagination from "../Pagination";

export default function PetSitter() {
  const { refresh, setRefresh } = useSitters();
  const router = useRouter();
  const {
    sitters,
    search,
    setSearch,
    handleSitterClick,
    selectedStatus,
    setSelectedStatus,
    selectedSitter,
    setSelectedSitter,
    getStatusComponent,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
  } = useAdminPetSitter();

  //--  For pagination --
  const ITEMS_PER_PAGE = 8;
  setTotalPages(Math.ceil(sitters.length / ITEMS_PER_PAGE));
  const currentSitters = sitters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRowClick = (sitter) => {
    handleSitterClick(sitter);
    router.push("/admin", undefined, { scroll: false });
  };

  return (
    <div className="w-full p-10 flex flex-col gap-6 overflow-hidden">
      {/* Search */}
      {!selectedSitter ? (
        <>
          <div className="w-full flex justify-between items-center">
            <p className="text-h3 pb-2 ">Pet Sitter</p>
            <div className="flex gap-6 ">
              <div className="relative">
                <DebounceInput
                  value={search}
                  debounceTimeout={700}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search..."
                  className="w-full sm:w-[240px] h-[48px] outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px] rounded-lg"
                />
                <Image
                  src={searchIcon}
                  alt="search"
                  className="absolute right-0 bottom-0 -translate-y-3 -translate-x-4"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setRefresh(!refresh);
                }}
                className="w-full sm:w-[240px] h-[48px] outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px] rounded-lg"
              >
                <option selected value="">
                  All status
                </option>
                <option value="waiting for approval">
                  Waiting for approval
                </option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Pet Sitter Table */}
          <div className="bg-ps-white rounded-2xl overflow-x-auto">
            <table className="table table-fixed">
              {/* head */}
              <thead className="h-[48px] bg-ps-black">
                <tr className="w-full">
                  <th className="w-[20%] text-b3 text-ps-white shrink-0">
                    Full Name
                  </th>
                  <th className="w-[20%] text-b3 text-ps-white shrink-0">
                    Pet Sitter Name
                  </th>
                  <th className="w-[40%] text-b3 text-ps-white shrink-0">
                    Email
                  </th>
                  <th className="text-b3 text-ps-white shrink-0">Status</th>
                </tr>
              </thead>

              <tbody>
                {currentSitters.map((sitter, index) => (
                  <tr
                    key={index}
                    className="hover:bg-ps-orange-100 cursor-pointer"
                    onClick={() => handleRowClick(sitter)}
                  >
                    <td className="text-b2 py-6 w-full flex items-center gap-[10px]">
                      <div className="relative w-[44px] h-[44px] overflow-hidden rounded-full bg-ps-gray-200 flex items-center justify-center">
                        {sitter?.profile_image_url ? (
                          <Image
                            src={sitter?.profile_image_url || null}
                            alt={sitter?.full_name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <Image
                            src={userImage}
                            alt="userImage"
                            width={20}
                            height={20}
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </div>
                      {sitter?.full_name}
                    </td>
                    <td className="text-b2 py-6">{sitter?.trade_name}</td>
                    <td className="text-b2 py-6">{sitter?.email}</td>
                    <td className="text-b2 py-6">
                      {getStatusComponent(sitter?.sitter_status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <PetSitterDetail
          sitter={selectedSitter}
          closeDetail={() => setSelectedSitter()}
        />
      )}
    </div>
  );
}
