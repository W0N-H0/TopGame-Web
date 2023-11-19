"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import phoneCall from "@/public/phone_call.gif";
import useIsMobile from "@/hooks/useIsMobile";
import { InquiryData } from "@/store/InquiryStore";

interface InquiryListProps {
  data: InquiryData[];
}

const InquiryList: React.FC<InquiryListProps> = ({ data }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col justify-center w-full lg:w-[48%] h-[545x] shadow-[6px_0px_45px_10px_#192832D8] rounded-md font-bold p-6">
      <div className="flex justify-between items-center text-[1.4em] xl:text-[1.7em] pt-3 pb-7 px-4 border-b-2 border-gray-500 mb-3">
        <h1>
          상담신청
          <br /> 진행현황 <span className="hidden xs:inline">확인하기</span>
        </h1>
        <div className="flex flex-col xs:flex-row items-center p-2">
          <Image
            src={phoneCall}
            width={isMobile ? 45 : 60}
            alt="phone call image"
            style={{ opacity: 0.8 }}
          />
          <div className="ml-1 text-[0.5em] xl:text-[0.6em] flex flex-col justify-center items-center">
            <h2> 탑개미자원 고객센터</h2>
            <a href="tel:+8201040078524">010-4007-8524</a>
          </div>
        </div>
      </div>
      <Swiper
        style={{ height: "355px", width: "100%" }}
        spaceBetween={10}
        slidesPerView={7}
        direction="vertical"
        loop={true}
        autoplay={{
          delay: 2000,
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="p-3"
      >
        {data.map((el, idx) => {
          const date = new Date(el.date);
          const formattedDate = date.toISOString().split("T")[0]; // '년-월-일' 형식으로 변환

          return (
            <SwiperSlide key={el._id}>
              <div className="flex w-full font-normal gap-2 xs:gap-4 xl:gap-6 text-[0.85em] justify-center items-center">
                {el.isDone ? (
                  <div className="text-[0.9em] xs:text-[1.05em] min-w-[11%] xs:min-w-[11%] bg-green-500 bg-opacity-95 p-[5px] rounded-md text-white">
                    상담완료
                  </div>
                ) : (
                  <div className="text-[0.9em] xs:text-[1.05em] min-w-[11%] xs:min-w-[11%] bg-red-500 bg-opacity-90 p-1 rounded-md text-white">
                    상담 중
                  </div>
                )}
                <div className="max-w-[30%] min-w-[25%] xs:min-w-[30%] whitespace-nowrap overflow-hidden">
                  {el.name}님의 상담신청 입니다.
                </div>
                <div className="max-w-[15%] min-w-[15%] hidden md:block lg:hidden 2xl:block whitespace-nowrap overflow-hidden text-[0.9em]">
                  {el.address}
                </div>
                <div className="max-w-[10%] min-w-[10%] hidden sm:block lg:hidden xl:block whitespace-nowrap overflow-hidden text-[0.9em]">
                  {el.item}
                </div>
                <div className="max-w-[10%] min-w-[10%] hidden sm:block whitespace-nowrap overflow-hidden text-[0.9em]">
                  {formattedDate}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default InquiryList;
