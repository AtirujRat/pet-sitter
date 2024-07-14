import PetCard from "./PetCard";
import Link from "next/link";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
=======
>>>>>>> af253ba (feat: update create pet form)
=======
=======
>>>>>>> d3a647f (feat: edit update pet form)
>>>>>>> 53b534c (feat: edit update pet form)
=======
>>>>>>> f6fd319 (feat: edit update pet form)

export default function YourPage() {
  const router = useRouter();
  const { id } = router.query;
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);

      try {
        if (id) {
          const { data, error } = await supabase
            .from("pets")
            .select("*")
            .eq("owner_id", id);

          if (error) {
            throw error;
          }

          if (data && Array.isArray(data)) {
            setPets(data);
          } else {
            setError("Data received is not in expected format or empty");
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error.message);
        setError("Error fetching pets");
        setLoading(false);
      }
    };

    fetchPets();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
=======
import { useRouter } from "next/router";

export default function YourPet() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  const pets = [
    { name: "Bubba", type: "Dog" },
    { name: "Daisy", type: "Dog" },
    { name: "I Som", type: "Cat" },
    { name: "Noodle Bird", type: "Bird" },
  ];
>>>>>>> ce812ed (feat: set path of pet list)

  return (
    <section className="w-[75%] min-h-[824px] h-fit shadow-lg rounded-xl bg-ps-white">
      <div className="flex flex-col justify-center p-10 gap-10">
        <div className="flex justify-between items-center">
          <p className="text-h3">Your Pet</p>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <Link href={`/owners/${id}/yourpet/create`}>
=======
=======
>>>>>>> 53b534c (feat: edit update pet form)
=======
>>>>>>> f6fd319 (feat: edit update pet form)
          <Link href="/owners/yourpet/create">
>>>>>>> af253ba (feat: update create pet form)
=======
          <Link href={`/owners/${id}/yourpet/create`}>
>>>>>>> ce812ed (feat: set path of pet list)
            <button className="w-[127px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px]">
              Create Pet
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 justify-stretch">
<<<<<<< HEAD
          {pets.map((pet) => (
            <Link key={pet.id} href={`/owners/${id}/yourpet/${pet.id}`}>
              <PetCard key={pet.id} name={pet.name} type={pet.pet_type} />
=======
          {pets.map((pet, index) => (
            <Link key={pet.id} href={`/owners/${id}/yourpet/${pet.id}/update`}>
              <PetCard key={index} name={pet.name} type={pet.type} />
>>>>>>> ce812ed (feat: set path of pet list)
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
