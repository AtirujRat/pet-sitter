const Footer = () => {
  return (
    <section className="w-full flex justify-center bg-ps-black md:h-[280px] text-ps-white">
      <div className="flex-col items-center text-center max-w-[1440px] min-w-0 w-full px-20 py-20 bg-ps-black">
        <div className="flex justify-center items-center bg-ps-black">
          <img
            src="/assets/sister-logo-white.svg"
            alt="sister-logo-white"
            className="mb-6 w-[210px] bg-ps-black"
          />
        </div>
        <p className="text-h3 bg-ps-black text-ps-white">
          Find your perfect pet sitter with us.
        </p>
      </div>
    </section>
  );
};

export default Footer;
