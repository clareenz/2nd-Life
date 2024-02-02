import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import style from "../../styles/style";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = () => {
    console.log("ffff");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row items-center justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <header
        className="bg-gray-50 w-full py-2 fixed top-0"
        style={{ height: "16mm" }}
      >
        <div className="wrapper mx-auto flex space-x-14 items-center border-b border-gray-300">
          <div className="logo ml-14 text-3xl mb-4">2ndLife</div>
          <nav>
            <ul className="flex space-x-14">
              <li>
                <a href="#" className="nav-link">
                  shop by Category
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  On Sale
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  New Arrivals
                </a>
              </li>
            </ul>
          </nav>
          {/*end of nav menu*/}
        </div>
      </header>
      {/* Left side with the image */}
      <div className="lg:w-1/8 lg:pr-8 flex-shrink-0">
        <img src="/2ndLife_Logo.png" alt="2ndLife Logo" className="mx-auto" />
        {/* Optionally, you can add content or styling here for the image side */}
      </div>

      {/* Right side with the form */}
      <div className="lg:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create an account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border-b border-gray-300 square-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  ></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border-b border-gray-300 square-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  ></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border-b border-gray-300 square-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
                  ></input>
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    ></AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    ></AiOutlineEyeInvisible>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg bg-white hover:bg-gray-50"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileInputChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-fe8373 hover:bg-006665"
                >
                  Submit
                </button>
              </div>
              <div className={`${style.normalFlex} w-full`}>
                <h4>Already have an account?</h4>
                <Link to="/login" className="text-blue-600 pl-2">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
