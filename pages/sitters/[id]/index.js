import { useRouter } from "next/router";

export default function SitterDetails() {
  const router = useRouter();

  return (
    <section className="w-full flex justify-center bg-[#FAFAFB] py-32">
      <div className="page-container w-full px-20 max-w-[1440px] flex justify-center">
        <h1 className="text-h1"> Halo Sitter ID: {router.query.id}</h1>
      </div>
    </section>
  );
}
