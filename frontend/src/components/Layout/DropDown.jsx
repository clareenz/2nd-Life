import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-2xl shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3
              className="m-3 cursor-pointer select-none"
              style={{ transition: "color 0.3s" }}
              onMouseEnter={(e) => e.target.style.color = "#FF8474"}
              onMouseLeave={(e) => e.target.style.color = "inherit"}
            >
              {i.title}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
