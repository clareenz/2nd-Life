/*
 * start time: 4:58:01 (2nd vid)
 */
import React from "react";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

const ShopHomePage = () => {
  return (
    <div className="bg-[#f5f5f5]">
      <div className=" mx-auto sm:px-[20px] md:px-[50px] lg:px-[100px] xl:px-[230px] 2xl:px-[250px]">
        <div className="flex flex-col pt-10">
          <div className=" rounded-2xl ">
            <ShopInfo isOwner={true} />
          </div>
          <div className="rounded-[4px] px-4">
            <ShopProfileData isOwner={true} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
