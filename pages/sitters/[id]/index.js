import { useRouter } from "next/router";

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/sitters"); //
  const sitters = await res.json();
  const paths = sitters.data.map((sitter) => ({
    params: { id: sitter.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/sitters/${id}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function SitterDetails({ data }) {
  const sitters = data.data[0];
  
  return (
    <section className="w-full flex justify-center bg-[#FAFAFB] py-32">
      <div className="page-container w-full px-20 max-w-[1440px] flex justify-center">
        <h1 className="text-h1">
          {" "}
          Sitter ID {sitters.id} : {sitters.trade_name}
        </h1>
      </div>
    </section>
  );
}
