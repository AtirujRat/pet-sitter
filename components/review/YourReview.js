import Image from "next/image";
import cross_icon from "@/public/assets/booking/cross.svg";
import gray_star from "@/public/assets/review/gray-star.svg";
import green_star from "@/public/assets/review/green-star.svg";
import { ButtonOrangeLight } from "@/components/buttons/OrangeButtons";
import GetOnlyDate from "@/hook/useGetOnlyDate";
import Link from "next/link";

export default function YourReview(props) {
  const reviews = props.reviews.filter(
    (review) => review.booking_id === props.currentReview
  );

  return (
    <div className="max-[768px]:absolute left-0 bottom-0 w-[100vw] h-[366px] sm:h-[600px] md:w-[800px] md:h-[720px] bg-ps-white rounded-t-2xl  md:rounded-2xl">
      <div className="flex max-w-full justify-between border-b-[1px] border-ps-gray-200 py-[24px] px-[40px]">
        <h1 className="text-h3 text-ps-gray-600">
          <span className="max-md:hidden">Your </span>Rating{" "}
          <span className="max-md:hidden">and</span>
          <span className="md:hidden">&</span> Review
        </h1>
        <Image
          onClick={() => props.closeModal()}
          className="cursor-pointer"
          src={cross_icon}
          alt="cross icon"
        />
      </div>
      <div className="flex items-center md:h-[640px] h-[280px] justify-between flex-col sm:p-10 p-5">
        <div className="w-full flex flex-col gap-3 border-b-2 pb-10 border-b-ps-gray-200">
          <div className="flex max-sm:justify-between">
            <div className="flex items-start gap-3 sm:pr-10">
              <img
                className="sm:w-[56px] sm:h-[56px] w-[36px] h-[36px] rounded-full object-cover"
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
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4].map((item, index) => {
                  return (
                    <Image
                      key={item}
                      className="sm:w-5 sm:h-5 w-4 h-4"
                      src={
                        index + 1 <= reviews[0].rating ? green_star : gray_star
                      }
                      alt="stars icon"
                    />
                  );
                })}
              </div>
              <div className="max-md:hidden">
                <h1 className="text-ps-gray-500 text-b2">
                  {reviews[0].description}
                </h1>
              </div>
            </div>
          </div>
          <div className="mx-2 md:hidden">
            <h1 className="text-ps-gray-500 text-b2">
              {reviews[0].description}
            </h1>
          </div>
        </div>
        <Link href={`/sitters/${props.sitterId}`}>
          <ButtonOrangeLight
            width="w-[157px] h-[48px]"
            text="View pet sister"
          />
        </Link>
      </div>
    </div>
  );
}
