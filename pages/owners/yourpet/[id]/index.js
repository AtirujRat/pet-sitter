import UpdatePetForm from "@/components/owners/yourpet/UpdatePetForm";

export default function UpdatePetPage() {
  return (
    <section className="w-full flex justify-center bg-ps-gray-100 sm:py-8 pt-4 lg:pb-32">
      <div className="page-container w-full sm:px-20 max-w-[1440px]">
        <div className="flex gap-8 max-lg:flex-col">
          {/* mock up menu account */}
          <div className="w-[284px] h-[356px] bg-ps-white sm:rounded-2xl lg:shadow-lg sm:p-6 lg:sticky top-5"></div>
          <UpdatePetForm />
        </div>
      </div>
    </section>
  );
}
