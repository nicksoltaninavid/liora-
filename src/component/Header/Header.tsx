import React from "react";
import heroImage from "../../assets/back.webp";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    // <header className="absolute top-0 left-0 w-full z-50">
   <header className="relative -mt-24 flex h-svh min-h-150 w-full items-center justify-center overflow-hidden">
      {/* عکس پس‌زمینه */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hero Background"
          className="h-full w-full object-cover object-center"
        />
        {/* یک لایه تیره نازک برای خوانایی بهتر لوگو و منو */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

   
      {/* <div className="absolute  w-full inset-0 flex items-end justify-center ">
        <h1 className=" text-[40vw]  text-white  leading-none  HeadingName ">
          Li<span className="">0</span>ra
        </h1>
      </div> */}

      {/* عنوان بزرگ تایپوگرافی همراه با انیمیشن ظهور */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="select-none text-[40vw] font-bold leading-none HeadingName tracking-tighter text-white/90 drop-shadow-md "
        >
          Li<span>0</span>ra
        </motion.h1>
      </div>
    </header>
  );
};
export default Header;
