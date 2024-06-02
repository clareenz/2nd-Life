import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "UpdateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

// update user address
export const updateUserAddress =
  (country, city, address1, address2,zipCode, addressType) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "UpdateUserAddressSuccess",
        payload: {
          successMessage: "User address updated successfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
       { withCredentials: true,}
    );

    dispatch({
      type: "DeleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};

// delete user
export const deleteUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserRequest",
    });

    const { data } = await axios.delete(`${server}/user/delete-user-account`, {
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

// Action to follow a shop
export const followShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: 'FOLLOW_SHOP_REQUEST',
    });

    const { data } = await axios.post(`${server}/user/follow/${shopId}`, null, {
      withCredentials: true, // Ensure credentials are sent with the request
    });

    dispatch({
      type: 'FOLLOW_SHOP_SUCCESS',
      payload: data, // Assuming backend sends data containing updated shop details
    });
  } catch (error) {
    dispatch({
      type: 'FOLLOW_SHOP_FAILED',
      payload: error.response.data.message,
    });
  }
};

// Action to unfollow a shop
export const unfollowShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: 'UNFOLLOW_SHOP_REQUEST',
    });

    const { data } = await axios.post(`${server}/user/unfollow/${shopId}`, null, {
      withCredentials: true, // Ensure credentials are sent with the request
    });

    dispatch({
      type: 'UNFOLLOW_SHOP_SUCCESS',
      payload: data, // Assuming backend sends data containing updated shop details
    });
  } catch (error) {
    dispatch({
      type: 'UNFOLLOW_SHOP_FAILED',
      payload: error.response.data.message,
    });
  }
};