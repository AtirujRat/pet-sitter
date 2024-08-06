import PetCard from "./PetCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import { useUser } from "@/context/User";
import AlertTop from "@/components/alerts/AlertTop";

export default function PetList() {
  const { userInfo } = useUser();
  const id = userInfo?.id;

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPets = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/owner/${id}/pet`);
        setPets(response.data);
      } catch {
        setError("Failed to load pets. Please try again later.");
      } finally {
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
        <Link key={pet.id} href={`/owners/yourpet/${pet.id}`}>
          <PetCard
            className="flex justify-center"
            image={pet.pet_image_url}
            name={pet.name}
            type={pet.type}
            styles="w-[206px] h-[240px] max-sm:w-[343px]"
          />
        </Link>
      ))}
      {/* alert */}
      {error && <AlertTop type="error" text={error} />}
    </section>
  );
}
