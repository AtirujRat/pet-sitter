import PetCard from "./PetCard";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";

const API_URL = "/api/owner";

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
          const response = await axios.get(`${API_URL}/${id}/pet/`, {
            timeout: 5000,
          });
          setPets(response.data);
        }
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchPets();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="w-fit flex flex-wrap justify-stretch max-sm:justify-center gap-4">
      {pets.map((pet) => (
        <Link key={pet.id} href={`/owners/${id}/yourpet/${pet.id}`}>
          <PetCard
            className="flex justify-center"
            image={pet.pet_image_url}
            key={pet.id}
            name={pet.name}
            type={pet.type}
            styles="w-[206px] h-[240px] max-sm:w-[343px]"
          />
        </Link>
      ))}
    </section>
  );
}
