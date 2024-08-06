import Link from "next/link";

export default function Anonymous() {
  return (
    <>
      <div className="sm:hidden py-10 px-4 flex flex-col gap-4">
        <Link href={"/register/sitter"} className="w-full p-4 text-b1">
          Become a Pet Sitter
        </Link>
        <Link href={"/login/owner"} className="w-full p-4 text-b1">
          Login
        </Link>
        <Link
          href={"/sitters"}
          className="w-full py-3 text-b1 text-ps-white text-center bg-ps-orange-500 rounded-full"
        >
          Find A Pet Sitter
        </Link>
      </div>
      <div className="max-sm:hidden">
        <Link href={"/register/sitter"}>
          <button className="py-4 px-6 text-b1">Become a Pet Sitter</button>
        </Link>
        <Link href={"/login/owner"}>
          <button className="py-4 px-6 text-b1 ">Login</button>
        </Link>
      </div>
    </>
  );
}
