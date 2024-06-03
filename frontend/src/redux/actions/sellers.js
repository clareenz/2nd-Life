import axios from "axios";
import { server } from "../../server";

// get all sellers --- admin
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellerFailed",
    //   payload: error.response.data.message,
    });
  }
};

// update seller's shop info
export const updateShopInformation =
  (name, description, address, phoneNumber, zipCode, password) => async (
    dispatch
  ) => {
    try {
      dispatch({
        type: "UpdateShopInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/shop/update-seller-info`,
        {
          name,
          description,
          address,
          phoneNumber,
          zipCode,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "UpdateShopInfoSuccess",
        payload: data.shop,
      });
    } catch (error) {
      dispatch({
        type: "UpdateShopInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

  // delete shop
export const deleteShop = () => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserRequest",
    });

    const { data } = await axios.delete(`${server}/shop/delete-Shop-account`, {
      withCredentials: true,
    });

    dispatch({
      type: "DeleteUserSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserFailed",
      payload: error.response.data.message,
    });
  }
};