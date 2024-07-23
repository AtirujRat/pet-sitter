import PetCard from "./PetCard";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ButtonOrange } from "@/components/buttons/OrangeButtons";

const API_URL = "/api/owner";

export default function PetList() {
  const router = useRouter();
  const { id, petId } = router.query;
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        if (id) {
          const response = await axios.get(`${API_URL}/${id}/pet/`);
          setPets(response.data);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchPets();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-start mx-auto w-full">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="w-full">
      <div className="flex flex-col justify-center p-10 max-sm:p-2 gap-10">
        <div className="flex justify-between items-center">
          <p className="text-h3">Your Pet</p>
          <Link href={`/owners/${id}/yourpet/create`}>
            <ButtonOrange text="Create Pet" width="w-fit" Onclick="" />
          </Link>
        </div>
        {pets.map((pet) => (
          <Link key={pet.id} href={`/owners/${id}/yourpet/${pet.id}`}>
            <PetCard
              className="flex justify-center"
              image={pet.pet_image_url}
              key={pet.id}
              name={pet.name}
              type={pet.type}
              styles="w-[207px] h-[240px] max-md:w-[343px]"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
