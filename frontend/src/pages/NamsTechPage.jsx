import Paragraph from "antd/es/typography/Paragraph";
import React from "react";

const NamsTechPage = () => {
  const teamMembers = [
    {
      name: "Shaira Joy Macale",
      role: "Project Manager",
      skills: "Full Stack Developer",
      motto: "Leading with passion and precision.",
      image: "cat4.jpg",
    },
    {
      name: "Mc Clareenz Zerrudo",
      role: "Lead Developer",
      skills: "Full Stack Developer",
      motto: "Coding the future, one line at a time.",
      image: "cat3.jpg",
    },
    {
      name: "Nikka Joie Mendoza",
      role: "UI/UX Designer",
      skills: "Frontend Developer",
      motto: "Designing with creativity and purpose.",
      image: "cat5.jpg",
    },
    {
      name: "Amielle Jaezxier Perez",
      role: "Lead QA",
      skills: "Frontend Developer",
      motto: "Ensuring quality with every click.",
      image: "cat2.jpg",
    },
  ];

  const projects = [
    {
      title: "2ndLife: Buy and Sell",
      description:
        "An e-commerce website designed to facilitate the buying and selling of secondhand items/ products.",
      image: "2ndLife.png",
      link: "/",
    },
    // {
    //   title: "Project Two",
    //   description: "Description of Project Two.",
    //   image: "https://via.placeholder.com/300",
    //   link: "#",
    // },
    // {
    //   title: "Project Three",
    //   description: "Description of Project Three.",
    //   image: "https://via.placeholder.com/300",
    //   link: "#",
    // },
    // {
    //   title: "Project Four",
    //   description: "Description of Project Four.",
    //   image: "https://via.placeholder.com/300",
    //   link: "#",
    // },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="text-white py-4 bg-gradient-to-r from-[#4509AE] via-[#794DC5] to-[#000000]">
        <div className="container mx-auto flex flex-col items-center">
          <div className="flex justify-center">
            <img
              src="128.png"
              alt="NAMS Tech Logo"
              className="w-16 h-auto md:w-24 lg:w-32"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold animate__animated animate__fadeInDown">
              NAMS Tech
            </h1>
            <p className="text-base md:text-lg lg:text-xl mt-2 animate__animated animate__fadeInDown animate__delay-1s">
              Wired for what's next
            </p>
          </div>
        </div>
      </header>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-semibold text-[#531484] mb-4 animate__animated animate__fadeInLeft">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg animate__animated animate__fadeInLeft animate__delay-1s">
            At NAMS Tech, our mission is to provide innovative solutions that
            enhance everyday life. We are committed to excellence, creativity,
            and sustainability.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#ECE5FF]">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-semibold text-[#531484] mb-4 animate__animated animate__fadeInRight">
            Our Vision
          </h2>
          <p className="text-gray-700 text-lg animate__animated animate__fadeInRight animate__delay-1s">
            To be a global leader in technology and innovation, making a
            positive impact on society and the environment.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-semibold text-[#531484] mb-8 text-center animate__animated animate__fadeInUp">
            Meet the Team
          </h2>
          <div className="flex flex-wrap justify-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`max-w-sm w-full lg:w-1/4 p-4 animate__animated animate__fadeInUp animate__delay-${index}s`}
              >
                <div className="relative group">
                  <div className="bg-white rounded-lg shadow-lg p-6 text-center group-hover:scale-100 transition-transform duration-300">
                    <img
                      src={member.image}
                      alt="Team member"
                      className="w-32 h-32 rounded-full mx-auto"
                    />
                    <h3 className="text-xl font-semibold mt-4">
                      {member.name}
                    </h3>
                    <p className="text-gray-700">{member.role}</p>
                    <p className="text-gray-700">{member.skills}</p>
                  </div>
                  <div className="absolute inset-0 bg-white rounded-lg shadow-lg p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                    <h3 className="text-xl font-semibold mt-4">
                      {member.name}
                    </h3>
                    <p className="text-gray-700">{member.role}</p>
                    <p className="text-gray-700">{member.skills}</p>
                    <p className="text-gray-700 mt-4 italic">
                      "{member.motto}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#ECE5FF]">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-semibold text-[#531484] mb-8 text-center animate__animated animate__fadeInUp">
            Our Projects
          </h2>
          <div className="flex flex-wrap justify-center">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`max-w-sm w-full lg:w-1/3 p-4 animate__animated animate__fadeInUp animate__delay-${index}s`}
              >
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="text-xl font-semibold mt-4 text-[#006665]">
                    {project.title}
                  </h3>
                  <Paragraph className="text-gray-700 mt-2 text-align-justify">
                    {project.description}
                  </Paragraph>
                  <a
                    href={project.link}
                    className="text-[#006665] text-[14px] hover:text-[#FF8474] mt-4 block"
                  >
                    Go to website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#ECE5FF]">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-semibold text-[#531484] mb-4 animate__animated animate__fadeInLeft">
            Contact Us
          </h2>
          <p className="text-gray-700 text-lg mb-8 animate__animated animate__fadeInLeft animate__delay-1s">
            We'd love to hear from you! Reach out to us at
            namstech.2024@gmail.com or follow us on social media.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="text-gray-700 hover:text-green-700 duration-300 animate__animated animate__bounceIn"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-green-700 duration-300 animate__animated animate__bounceIn animate__delay-1s"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-green-700 duration-300 animate__animated animate__bounceIn animate__delay-2s"
            >
              <i className="fab fa-linkedin-in text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-green-700 duration-300 animate__animated animate__bounceIn animate__delay-3s"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r  from-[#4509AE] via-[#794DC5] to-[#000000] text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 NAMS Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NamsTechPage;
