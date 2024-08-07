import PetCard from "./PetCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import { useUser } from "@/context/User";
import { useRouter } from "next/router";

export default function PetList() {
  const router = useRouter();
  const { userInfo } = useUser();
  const id = userInfo?.id;

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.push("/404");
      return;
    }

    const fetchPets = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`/api/owner/${id}/pet`);
        setPets(response.data);
      } catch (error) {
        if (error.response.status === 404) {
          router.push("/404");
          return;
        }
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
      {pets.length > 0 ? (
        pets.map((pet) => (
          <Link key={pet.id} href={`/owners/yourpet/${pet.id}`}>
            <PetCard
              className="flex justify-center"
              image={pet.pet_image_url}
              name={pet.name}
              type={pet.type}
              styles="w-[206px] h-[240px] max-sm:w-[343px]"
            />
          </Link>
        ))
      ) : (
        <p className="text-b1 text-ps-gray-400">You do not have a pet.</p>
      )}
    </section>
  );
}
