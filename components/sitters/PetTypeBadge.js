export default function PetTypeBadge(props) {
  return (
    <div
      className={`${props.textcolor} text-base h-8 py-1 px-4 border-[1px] ${props.bordercolor} ${props.bgcolor} rounded-[99px] w-fit`}
    >
      {props.type}
    </div>
  );
}
