import React from 'react'
import ShopDelete from "../components/Shop/ShopDelete.jsx";
import DashboardHeader from '../components/Shop/Layout/DashboardHeader.jsx';
import DashboardSideBar from '../components/Shop/Layout/DashboardSideBar.jsx';

const ShopDeletePage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center">
          <ShopDelete />
        </div>
      </div>
    </div>
  )
}

export default ShopDeletePage