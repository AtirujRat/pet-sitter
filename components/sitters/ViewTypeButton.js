export default function ViewTypeButton(props) {
  return (
    <div
      className={`w-20 h-10 border-[1px] rounded-lg px-3 py-2 gap-2 justify-center items-center flex active:text-ps-orange-500  text-ps-gray-300 text-base`}
    >
      <img src={props.src} alt={props.alt}></img>
      {props.type}
    </div>
  );
}
