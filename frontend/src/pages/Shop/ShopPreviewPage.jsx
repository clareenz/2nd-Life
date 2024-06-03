import React from "react";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import { Header } from "../../components/Layout/Header";
import { Footer } from "../../components/Layout/Footer";

const ShopPreviewPage = (isOwner) => {
  return (
    <div className={` bg-[#f5f5f5]`}>
      <Header/>
      <div className=" mx-auto sm:px-[20px] md:px-[50px] lg:px-[100px] xl:px-[230px] 2xl:px-[250px]">
        <div className="flex flex-col pt-10">
          <div className=" rounded-2xl">
            <ShopInfo isOwner={false} />
          </div>
        </div>
        <div className=" rounded-[4px] px-4">
          <ShopProfileData isOwner={false} />
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopPreviewPage;
