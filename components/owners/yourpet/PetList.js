import PetCard from "./PetCard";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import Link from "next/link";
import { useRouter } from "next/router";
<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";

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
          const response = await axios.get(`/api/pets/${id}`);

          if (response.data && Array.isArray(response.data)) {
            setPets(response.data);
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
=======
import Link from "next/link";
>>>>>>> bf2cbb2 (feat: update create pet form)
=======
import Link from "next/link";
=======
>>>>>>> d3a647f (feat: edit update pet form)
>>>>>>> 19e2e33 (feat: edit update pet form)
=======
import Link from "next/link";
>>>>>>> 1d054ed (feat: edit update pet form)
=======
>>>>>>> 1919ac5 (feat: set path of pet list)
=======
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
>>>>>>> b87b3ee (feat: create api get pet)

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

<<<<<<< HEAD
  const pets = [
    { name: "Bubba", type: "Dog" },
    { name: "Daisy", type: "Dog" },
    { name: "I Som", type: "Cat" },
    { name: "Noodle Bird", type: "Bird" },
  ];
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
  if (error) {
    return <div>Error: {error}</div>;
  }
>>>>>>> b87b3ee (feat: create api get pet)

  return (
    <section className="w-[75%] min-h-[824px] h-fit shadow-lg rounded-xl bg-ps-white">
      <div className="flex flex-col justify-center p-10 gap-10">
        <div className="flex justify-between items-center">
          <p className="text-h3">Your Pet</p>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <Link href={`/owners/${id}/yourpet/create`}>
=======
=======
>>>>>>> 19e2e33 (feat: edit update pet form)
=======
>>>>>>> 1d054ed (feat: edit update pet form)
          <Link href="/owners/yourpet/create">
>>>>>>> bf2cbb2 (feat: update create pet form)
=======
          <Link href={`/owners/${id}/yourpet/create`}>
>>>>>>> 1919ac5 (feat: set path of pet list)
            <button className="w-[127px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px]">
              Create Pet
            </button>
          </Link>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        </div>
        <div className="flex flex-wrap gap-4 justify-stretch">
          {pets.map((pet) => (
            <Link key={pet.id} href={`/owners/${id}/yourpet/${pet.id}`}>
              <PetCard key={pet.id} name={pet.name} type={pet.type} />
            </Link>
=======
>>>>>>> 19e2e33 (feat: edit update pet form)
=======
          <button className="w-[127px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px]">
            Create Pet
          </button>
<<<<<<< HEAD
=======
>>>>>>> bf2cbb2 (feat: update create pet form)
=======
>>>>>>> d3a647f (feat: edit update pet form)
>>>>>>> 19e2e33 (feat: edit update pet form)
=======
>>>>>>> 1d054ed (feat: edit update pet form)
        </div>
        <div className="flex flex-wrap gap-4 justify-stretch">
<<<<<<< HEAD
          {pets.map((pet, index) => (
<<<<<<< HEAD
            <PetCard key={index} name={pet.name} type={pet.type} />
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
            <Link key={pet.id} href={`/owners/${id}/yourpet/${pet.id}/update`}>
              <PetCard key={index} name={pet.name} type={pet.type} />
=======
          {pets.map((pet) => (
            <Link key={pet.id} href={`/owners/${id}/yourpet/${pet.id}`}>
              <PetCard key={pet.id} name={pet.name} type={pet.pet_type} />
>>>>>>> b87b3ee (feat: create api get pet)
            </Link>
>>>>>>> 1919ac5 (feat: set path of pet list)
          ))}
        </div>
      </div>
    </section>
  );
}
