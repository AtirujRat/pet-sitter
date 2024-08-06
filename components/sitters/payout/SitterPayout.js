import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSitters } from "@/context/SittersProvider";
import dollar from "@/public/assets/icons/icon-dollar.svg";
import wallet from "@/public/assets/icons/icon-wallet.svg";
import next from "@/public/assets/icons/icon-next.svg";
import Link from "next/link";

export default function SitterPayout({ id, profile }) {
  const { setLoading, refresh } = useSitters();
  const [bookings, setBookings] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0);

  async function getBooking() {
    const res = await axios.get(
      `http://localhost:3000/api/sitters/${id}/booking?name=&status=Success&status=In service`
    );

    setBookings(res.data.data);
    setTotalEarning(res.data.data.reduce((res, cur) => res + cur.price, 0));
    setLoading(false);
  }

  useEffect(() => {
    getBooking();
  }, [id, refresh]);

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div className="flex justify-between flex-col md:gap-6 gap-4">
        <p className="md:text-h3 text-h4">Payout Option</p>
        <div className="summary-bar flex w-full md:gap-6 gap-3 max-md:flex-col">
          <div className="total md:w-[50%] w-full min-w-[325px] h-[76px] flex align-middle justify-between bg-ps-white rounded-2xl p-6 gap-4">
            <div className="text flex gap-2">
              <Image src={dollar} alt="dollar icon" style={{ width: 'auto', height: 'auto' }}></Image>
              <p className="text-b2">Total Earning</p>
            </div>
            <div className="text-b2">
              {totalEarning.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              THB
            </div>
          </div>
          <Link
            href={`/sitters/payout/bank-account`}
            className="bank md:w-[50%] w-full min-w-[325px] h-[76px]  flex align-middle justify-between bg-ps-white rounded-2xl p-6 gap-4 cursor-pointer hover:shadow-md transition-transform active:scale-95"
          >
            <div className="text flex gap-2 w-full">
              <Image src={wallet} alt="wallet icon" style={{ width: 'auto', height: 'auto' }}></Image>
              <p className="text-b2 text-nowrap">Bank Account</p>
            </div>
            {profile.sitters_bank_accounts ? (
              <span className="text-b2 text-ps-orange-500 w-fit text-nowrap">
                {profile.sitters_bank_accounts.banks.bank_name} *
                {profile.sitters_bank_accounts.account_number
                  .replace(/-/g, "")
                  .slice(-3)}
              </span>
            ) : (
              <span className="text-b2 text-ps-gray-300">Select</span>
            )}
            <Image src={next} alt="add bank account" style={{ width: 'auto', height: 'auto' }}></Image>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-ps-white rounded-2xl overflow-x-auto overflow:scroll mb-10 sm:mb-0 w-full">
        <table className="table">
          {/* head */}
          <thead className="h-[48px] bg-ps-black sticky top-0">
            <tr className="w-full">
              <th className="xl:w-[20%] w-[240px] text-b3 text-ps-white shrink-0">
                Date
              </th>
              <th className="xl:w-[27%] w-[120px] text-b3 text-ps-white shrink-0">
                From
              </th>
              <th className="xl:w-[20%] w-[120px] text-b3 text-ps-white shrink-0">
                Transaction No.
              </th>
              <th className="xl:w-[15%] w-[120px] text-b3 text-ps-white shrink-0">
                Payment Method
              </th>
              <th className="xl:w-[18%] w-[420px] text-b3 text-ps-white shrink-0 text-right">
                Amount
              </th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {bookings.map((booking, index) => {
              const transactionDate = booking.created_at;
              const date = new Date(transactionDate);
              const day = date.getDate();
              const month = date.toLocaleString("en-GB", { month: "short" });
              const year = date.getFullYear();
              const formattedDate = `${day} ${month}, ${year}`;

              return (
                <tr key={index} className="text-nowrap">
                  <td className="text-b2 py-6">{formattedDate}</td>
                  <td className="text-b2 py-6">{booking.owners.full_name}</td>
                  <td className="text-b2 py-6">{booking.transaction_id}</td>
                  <td className="text-b2 py-6">{booking.payment_method}</td>
                  <td className="text-b2 text-ps-green-500 text-right">
                    {booking.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    THB
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
