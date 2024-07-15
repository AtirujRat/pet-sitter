export function ButtonOrangeLight(props) {
  return (
    <button
      id={props.id}
      className="flex justify-center items-center py-3 px-6 bg-ps-orange-100 text-ps-orange-500 rounded-[99px] w-full text-base font-bold text-nowrap"
    >
      {props.text}
    </button>
  );
}

export function ButtonOrange(props) {
  return (
    <button
      id={props.id}
      className="flex justify-center items-center py-3 px-6 bg-ps-orange-500 text-ps-white rounded-[99px] w-full text-base font-bold text-nowrap"
    >
      {props.text}
    </button>
  );
}
