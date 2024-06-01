/* The profile page
 * start time: 1:41:20 (2nd vid)
 */

import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import ProfileContent from "../components/Profile/ProfileContent";
import Loader from "../components/Layout/Loader";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const { loading } = useSelector((state) => state.user);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <div className={`xl:mx-10 lg:mx-10 md:mx-10 sm:mx-10 flex bg-[#f5f5f5] py-10`}>
            <div className="">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;