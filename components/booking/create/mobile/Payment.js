import CreditCardPayment from "./CreditCardPayment";
import CashPayment from "./CashPayment";
import { useSearch } from "@/context/Search";
export default function Payment() {
  const { payment, setPayment } = useSearch();
  return (
    <section className="w-full h-full p-10 relative flex flex-col gap-12">
      <div className="w-full h-[13%] flex justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            setPayment("Credit Card");
          }}
          className={
            payment === "Credit Card"
              ? "w-[50%] h-full border border-ps-orange-500 rounded-full text-ps-orange-500 text-b1 flex justify-center items-center"
              : "w-[50%] h-full border border-ps-gray-200 rounded-full text-ps-gray-400 text-b1 flex justify-center items-center"
          }
        >
          Credit Card
        </button>
        <button
          type="button"
          onClick={() => {
            setPayment("Cash");
          }}
          className={
            payment === "Cash"
              ? "w-[50%] h-full border border-ps-orange-500 rounded-full text-ps-orange-500 text-b1 flex justify-center items-center"
              : "w-[50%] h-full border border-ps-gray-200 rounded-full text-ps-gray-400 text-b1 flex justify-center items-center"
          }
        >
          Cash
        </button>
      </div>
      {payment === "Credit Card" ? <CreditCardPayment /> : <CashPayment />}
    </section>
  );
}
