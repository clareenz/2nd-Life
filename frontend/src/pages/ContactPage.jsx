import React from "react";
import { AiFillFacebook, AiFillTwitterCircle, AiFillYoutube, AiFillInstagram } from "react-icons/ai";

const ContactPage = () => {
  return (
    <>
      <header className="text-white py-4 bg-gradient-to-r from-[#4509AE] via-[#794DC5] to-[#000000]">
        <div className="container mx-auto flex justify-between items-center px-6 lg:px-20">
          <div className="flex items-center">
            <img
              src="128.png"
              alt="NAMS Tech Logo"
              className="w-12 h-auto md:w-16 lg:w-20"
            />
            <h1 className="ml-3 text-3xl font-bold animate__animated animate__fadeInDown">
              NAMS Tech
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6 text-lg">
              <li>
                <a
                  href="/about"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  2ndLife
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-semibold text-[#531484] mb-8 text-center animate__animated animate__fadeInUp">
            Contact Us
          </h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-1/2 p-4 animate__animated animate__fadeInUp">
              <form className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-2xl shadow-sm focus:outline-none focus:ring-[#531484] focus:border-[#531484]"
                    type="text"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-2xl shadow-sm focus:outline-none focus:ring-[#531484] focus:border-[#531484]"
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-2xl shadow-sm focus:outline-none focus:ring-[#531484] focus:border-[#531484]"
                    id="message"
                    name="message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    className="bg-[#531484] text-white font-bold py-2 px-4 rounded-full hover:bg-[#794DC5] focus:outline-none focus:ring-2 focus:ring-[#794DC5] focus:ring-opacity-50"
                    type="submit"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-1/2 p-4 animate__animated animate__fadeInUp">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center lg:text-left">
                <h3 className="text-xl font-semibold text-[#531484] mb-4">School</h3>
                <p className="text-gray-700 mb-4">
                 University of the Philippines Cebu
                </p>
                <h3 className="text-xl font-semibold text-[#c2a2db] mb-4">Contact Information</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Email:</strong> namstech.2024@gmail.com
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Phone:</strong> 09635916807
                </p>
                <h3 className="text-xl font-semibold text-[#531484] mb-4">Follow Us</h3>
                <div className="flex justify-center lg:justify-start space-x-4">
                  <a href="#" className="text-[#531484] hover:text-[#794DC5]">
                    <AiFillFacebook size={30} />
                  </a>
                  <a href="#" className="text-[#531484] hover:text-[#794DC5]">
                    <AiFillTwitterCircle size={30} />
                  </a>
                  <a href="#" className="text-[#531484] hover:text-[#794DC5]">
                    <AiFillYoutube size={30} />
                  </a>
                  <a href="#" className="text-[#531484] hover:text-[#794DC5]">
                    <AiFillInstagram size={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
