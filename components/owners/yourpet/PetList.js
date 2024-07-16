import PetCard from "./PetCard";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ButtonOrange } from "@/components/buttons/OrangeButtons";

const API_URL = "/api/owners";

export default function PetList() {
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
          const response = await axios.get(`${API_URL}/${id}`);
          setPets(response.data);
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

  return (
    <section className="w-full min-h-[824px]max-sm:min-h-fit h-fit shadow-lg rounded-xl bg-ps-white max-sm:bg-ps-gray-100">
      <div className="flex flex-col justify-center p-10 gap-10">
        <div className="flex justify-between items-center">
          <p className="text-h3">Your Pet</p>
          <Link href={`/owners/${id}/yourpet/create`}>
            <ButtonOrange text="Create Pet" width="w-fit" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 max-md:justify-around justify-stretch">
          {pets.map((pet) => (
            <Link key={pet.id} href={`/owners/${id}/yourpet/${pet.id}`}>
              <PetCard
                className="flex justify-center"
                key={pet.id}
                name={pet.name}
                type={pet.type}
                styles="w-[207px] h-[240px] max-md:w-[343px]"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
