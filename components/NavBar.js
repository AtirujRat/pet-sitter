const NavBar = () => {
  return (
    <nav className="w-full flex justify-center py-5">
      <section className=" max-w-[1440px] min-w-0 w-full flex justify-between   px-20">
        <img
          src="/assets/sister-logo.svg"
          alt="sister-logo"
          className="w-[131px]"
        />
        <div className="flex gap-4 items-center">
          <button className="py-4 px-6 text-b1">Become a Pet Sitter</button>
          <button className="py-4 px-6 text-b1">Login</button>
          <button className="w-[168px] h-[48px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide">
            Find A Pet Sitter
          </button>
        </div>
      </section>
    </nav>
  );
};

export default NavBar;
