import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSitters } from "@/context/SittersProvider";
import { useRouter } from "next/router";
import dollar from "@/public/assets/icons/icon-dollar.svg";
import wallet from "@/public/assets/icons/icon-wallet.svg";
import next from "@/public/assets/icons/icon-next.svg";

export default function SitterPayout({ id, profile }) {
  const router = useRouter();
  const { setLoading, refresh, setRefresh } = useSitters();
  const [bookings, setBookings] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [totalEarning, setTotalEarning] = useState(0);

  // const debounce = (func, delay = 700) => {
  //   let timer;
  //   return function (...args) {
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // };

  const getBooking = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/sitters/${id}/booking?name=&status=Success`
    );

    setBookings(res.data.data);
    setTotalEarning(res.data.data.reduce((res, cur) => res + cur.price, 0));
    setLoading(false);
  };

  useEffect(() => {
    getBooking();
  }, [id, refresh]);

  // useEffect(() => {
  //   const debouncedGetBooking = debounce(getBooking, 700);
  //   debouncedGetBooking();
  // }, [searchName]);

  return (
    <div className="flex flex-col gap-6 h-screen">
      {/* Title */}
      <div className="md:flex justify-between flex-col gap-6">
        <p className="md:text-h3 text-h4">Payout Option</p>
        <div className="summary-bar flex w-full gap-6 h-[76px]">
          <div className="total flex-1 flex align-middle justify-between bg-ps-white rounded-2xl p-6 gap-4">
            <div className="text flex gap-2">
              <Image src={dollar}></Image>
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
          <div className="total flex-1 flex align-middle justify-between bg-ps-white rounded-2xl p-6 gap-4">
            <div className="text flex gap-2 w-full">
              <Image src={wallet}></Image>
              <p className="text-b2">Bank Account</p>
            </div>
            {profile.banks && profile.account_number && (
              <div className="text-b2 text-ps-orange-500 w-fit text-nowrap">
                {profile.banks.bank_name} *{profile.account_number.slice(-3)}
              </div>
            )}
            <Image src={next}></Image>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-ps-white rounded-2xl overflow-x-auto mb-10 sm:mb-0">
        <table className="table table-fixed">
          {/* head */}
          <thead className="h-[48px] bg-ps-black sticky top-0">
            <tr className="w-full">
              <th className="xl:w-[25%] w-[240px] text-ps-white shrink-0">
                Date
              </th>
              <th className="xl:w-[30%] w-[120px] text-b3  text-ps-white shrink-0">
                From
              </th>
              <th className="xl:w-[15%] w-[120px] text-b3  text-ps-white shrink-0">
                Transaction No.
              </th>
              <th className="xl:w-[30%] w-[420px] text-ps-white shrink-0 text-right">
                Amount
              </th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {bookings.map((booking, index) => {
              // const duration = calculateDurationInHours(
              //   booking?.start_time,
              //   booking?.end_time
              // );
              // const startDate = formatDateWithoutYear(booking?.start_time);
              // const endDate =
              //   new Date(booking?.start_time).toLocaleDateString() ===
              //   new Date(booking?.end_time).toLocaleDateString()
              //     ? formatTime(booking?.end_time)
              //     : formatDateWithoutYear(booking?.end_time);
              return (
                <tr key={index} className="text-nowrap">
                  <td className="text-b2 py-6">Aug 25, 2024</td>
                  <td className="text-b2 py-6">{booking.owners.full_name}</td>
                  <td className="text-b2 py-6">{booking.transaction_id}</td>
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
