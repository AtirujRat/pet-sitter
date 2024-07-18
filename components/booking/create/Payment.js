import CreditCardPayment from "./desktop/CreditCardPayment";
import CashPayment from "./desktop/CashPayment";
import CreditCardPaymentMobile from "./mobile/CreditCardPaymentMobile";
import CashPaymentmobile from "./mobile/CashPaymentmobile";
import { useSearch } from "@/context/Search";
export default function Payment() {
  const { payment, setPayment } = useSearch();
  return (
    <section className="w-full h-full py-10 px-4 lg:p-10 relative flex flex-col gap-12">
      <div className="w-full h-[15%] flex justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            setPayment("Credit Card");
          }}
          className={
            payment === "Credit Card"
              ? "w-[50%] py-3 border border-ps-orange-500 rounded-full text-ps-orange-500 text-b1 flex justify-center items-center"
              : "w-[50%] py-3 border border-ps-gray-200 rounded-full text-ps-gray-400 text-b1 flex justify-center items-center"
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
              ? "w-[50%] py-3 h-full border border-ps-orange-500 rounded-full text-ps-orange-500 text-b1 flex justify-center items-center"
              : "w-[50%] py-3 h-full border border-ps-gray-200 rounded-full text-ps-gray-400 text-b1 flex justify-center items-center"
          }
        >
          Cash
        </button>
      </div>
      {payment === "Credit Card" ? (
        <>
          <CreditCardPayment />
          <CreditCardPaymentMobile />
        </>
      ) : (
        <>
          <CashPayment />
          <CashPaymentmobile />
        </>
      )}
    </section>
  );
}
