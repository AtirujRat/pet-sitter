import { useSitters } from "@/pages/context/SittersProvider";


export default function CheckBoxSitter() {
  const { selectedPets, setSelectedPets, setPetQuery } =
    useSitters()

  function handlePetSelect(event) {
    const { value, checked } = event.target;

    setSelectedPets((prevSelectedPets) => {
      let updatedSelectedPets;
      if (checked) {
        updatedSelectedPets = [...prevSelectedPets, value];
      } else {
        updatedSelectedPets = prevSelectedPets.filter((pet) => pet !== value);
      }
      setPetQuery(updatedSelectedPets.join("&pet="));
      return updatedSelectedPets;
    });
  }

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center">
      <span className="form-control w-full max-w-[328px]">
        <div className="cursor-pointer label sm:space-x-3">
          <input
            id="dog"
            type="checkbox"
            value="Dog"
            checked={selectedPets.includes("Dog")}
            onChange={handlePetSelect}
            className="checkbox checkbox-primary [--chkfg:white] border border-ps-gray-300 hover:border-ps-orange-300"
          />
          <label htmlFor="dog" className="label-text text-[16px] font-medium">
            Dog
          </label>
          <input
            id="cat"
            type="checkbox"
            value="Cat"
            checked={selectedPets.includes("Cat")}
            onChange={handlePetSelect}
            className="checkbox checkbox-primary [--chkfg:white] border border-ps-gray-300 hover:border-ps-orange-300 focus:border-ps-orange-300"
          />
          <label htmlFor="cat" className="label-text text-[16px] font-medium">
            Cat
          </label>
          <input
            id="bird"
            type="checkbox"
            value="Bird"
            checked={selectedPets.includes("Bird")}
            onChange={handlePetSelect}
            className="checkbox checkbox-primary [--chkfg:white] border border-ps-gray-300 hover:border-ps-orange-300 focus:border-ps-orange-300"
          />
          <label htmlFor="bird" className="label-text text-[16px] font-medium">
            Bird
          </label>
          <input
            id="rabbit"
            type="checkbox"
            value="Rabbit"
            checked={selectedPets.includes("Rabbit")}
            onChange={handlePetSelect}
            className="checkbox checkbox-primary [--chkfg:white] border border-ps-gray-300 hover:border-ps-orange-300 focus:border-ps-orange-300"
          />
          <label
            htmlFor="rabbit"
            className="label-text text-[16px] font-medium"
          >
            Rabbit
          </label>
        </div>
      </span>
    </div>
  );
}
