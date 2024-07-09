export default function ViewTypeButton(props) {
  return (
    <div className={`btn btn-outline text-ps-gray-300 `}>
      <img src={props.src} alt={props.alt}></img>
      {props.type}
    </div>
  );
}
