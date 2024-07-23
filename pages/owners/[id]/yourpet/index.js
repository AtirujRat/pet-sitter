import RatingBookingModal from "@/components/modal/RatingBookingModal";
import ViewReviewModal from "@/components/modal/ViewReviewModal";
import SideBarOwners from "@/components/owners/SideBarOwners";
import PetList from "@/components/owners/yourpet/PetList";
import { useState } from "react";

export default function PetListPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <section className="max-w-[1440px] min-w-0 w-full sm:flex sm:justify-between mx-auto sm:items-start lg:px-20 bg-ps-gray-100 gap-5">
      <SideBarOwners />
      <PetList />
    </section>
  );
}
