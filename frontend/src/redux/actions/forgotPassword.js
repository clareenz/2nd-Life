import axios from 'axios';

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "ForgotPasswordRequest",
    });
    // Make a request to your backend endpoint for forgot password
    await axios.post(`${server}/api/v2/forgot-password`, { email }, { withCredentials: true });
    dispatch({
      type: "ForgotPasswordSuccess",
    });
  } catch (error) {
    dispatch({
      type: "ForgotPasswordFail",
      payload: error.response.data.message,
    });
  }
};
