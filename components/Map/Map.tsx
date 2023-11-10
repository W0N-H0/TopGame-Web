"use client";
import MapContents from "./MapContents";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const hoverMotion = {
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 15,
  },
  whileHover: { scale: 1.02 },
};

const Map: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const mapScript = document.createElement("script");
  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
  document.head.appendChild(mapScript);

  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        // 지도 생성
        const mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new window.kakao.maps.LatLng(37.697722, 126.7151823), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const markerPosition = new window.kakao.maps.LatLng(
          37.697722,
          126.7151823
        );

        // 결과값을 마커로 표시
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: markerPosition,
        });

        // 커스텀 오버레이 생성
        const content =
          '<div class="p-2 mt-8 text-[0.85rem] text-gray-600 font-bold"><a href="https://map.naver.com/p/entry/place/36760258?lng=126.7151554&lat=37.6977313&placePath=%2Fhome%3Fentry%3Dplt&c=15.00,0,0,0,dh" target="_blank">탑개미자원</a></div>';
        const overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: marker.getPosition(),
        });

        // 지도의 중심을 결과값으로 받은 위치로 이동
        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, []);

  return (
    <motion.div className="flex justify-center mt-10 ">
      <MapContents />

      <motion.div
        {...hoverMotion}
        ref={ref}
        initial={{ x: "30vw" }}
        animate={{ x: isInView ? 0 : "30vw" }}
        transition={{ duration: 0.7 }}
        id="map"
        style={{ width: "37%", height: "60vh", borderRadius: "10px" }}
        className="shadow-2xl shadow-gray500/20 ml-20"
      />
    </motion.div>
  );
};

export default Map;
