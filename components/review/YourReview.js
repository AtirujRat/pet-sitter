import Image from "next/image";
import cross_icon from "@/public/assets/booking/cross.svg";
import gray_star from "@/public/assets/review/gray-star.svg";
import green_star from "@/public/assets/review/green-star.svg";

import { ButtonOrangeLight } from "@/components/buttons/OrangeButtons";
import GetOnlyDate from "@/hook/useGetOnlyDate";

export default function YourReview(props) {
  const reviews = props.reviews.filter(
    (review) => review.booking_id === props.currentReview
  );

  return (
    <div className="max-[768px]:absolute left-0 bottom-0 w-[100vw] h-[70vh] md:w-[800px] md:h-[720px] bg-ps-white rounded-t-2xl  md:rounded-2xl">
      <div className="flex max-w-full justify-between border-b-[1px] border-ps-gray-200 py-[24px] px-[40px]">
        <h1 className="text-h3 text-ps-gray-600">Your Rating and Review</h1>
        <Image
          onClick={() => props.closeModal()}
          className="cursor-pointer"
          src={cross_icon}
          alt="cross icon"
        />
      </div>
      <div className="flex items-center justify-between flex-col gap-[350px] p-[40px]">
        <div className="w-full  flex  justify-start gap-[16px] pb-[40px] pt-[24px] px-[24px] border-b-[1px] border-ps-gray-200">
          <div className="w-[220px] flex items-center gap-[16px] ">
            <img
              className="w-[56px] h-[56px] rounded-full object-cover"
              src={props.ownerData[0].profile_image_url}
              alt="cross icon"
            />
            <div>
              <h1 className="text-b1">{props.ownerData[0].full_name}</h1>
              <h1 className="text-ps-gray-400 text-b3">
                <GetOnlyDate time={props.ownerData[0].updated_at} />
              </h1>
            </div>
          </div>
          <div className="flex items-center flex-col justify-between">
            <div className="flex items-center gap-[2px] h-[64px]">
              {[0, 1, 2, 3, 4].map((item, index) => {
                return (
                  <Image
                    key={item}
                    className="w-[20px] h-[20px]"
                    src={
                      index + 1 <= reviews[0].rating ? green_star : gray_star
                    }
                    alt="stars icon"
                  />
                );
              })}
            </div>
            <h1 className="text-ps-gray-500 text-b2">
              {reviews[0].description}
            </h1>
          </div>
        </div>
        <ButtonOrangeLight width="w-[157px] h-[48px]" text="View pet sister" />
      </div>
    </div>
  );
}
