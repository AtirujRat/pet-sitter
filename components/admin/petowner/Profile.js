import Modal from "@/components/modal/Modal";

import BanUserModal from "@/components/admin/modal/BanUserModal";
import { useAdminPetOwner } from "@/context/AdminPetOwner";

export default function Profile() {
  const { currentOwner, isBanUserModalOpened, toggleBanUserModal } =
    useAdminPetOwner();

  return (
    <div className="flex flex-col gap-[20px]">
      {isBanUserModalOpened && (
        <Modal>
          <BanUserModal
            action={
              currentOwner?.member_status === "Baned" ? "Normal" : "Baned"
            }
            closeModal={toggleBanUserModal}
          />
        </Modal>
      )}
      <div className="flex gap-[40px]">
        <img
          className="w-[240px] h-[240px] rounded-full object-cover"
          src={currentOwner?.profile_image_url}
          alt="owner profile"
        />
        <div className="flex flex-col gap-[40px] bg-ps-gray-100 p-[24px] w-[800px] rounded-lg">
          <div className="flex flex-col gap-[4px]">
            <h1 className="text-h4 text-ps-gray-300">Pet Owner Name</h1>
            <p className="text-b2">{currentOwner?.full_name}</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <h1 className="text-h4 text-ps-gray-300">Email</h1>
            <p className="text-b2">{currentOwner?.email}</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <h1 className="text-h4 text-ps-gray-300">Phone</h1>
            <p className="text-b2">{currentOwner?.phone_number}</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <h1 className="text-h4 text-ps-gray-300">ID Number</h1>
            <p className="text-b2">{currentOwner?.id_number}</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <h1 className="text-h4 text-ps-gray-300">Date of Birth</h1>
            <p className="text-b2">{currentOwner?.date_of_birth}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => toggleBanUserModal()}
        className="w-full text-ps-orange-500 text-[1rem] font-[700] text-end"
      >
        {currentOwner?.member_status === "Baned" ? "Unban" : "Ban This User"}
      </button>
    </div>
  );
}
