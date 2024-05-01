import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-2 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-[20px] font-[600px] text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover-white"
                >
                  Our Stroy
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover-white"
                >
                  Faq
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600px] text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="y-space-3">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover-white"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover-white"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover-white"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600px] text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover-white"
                >
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover-white"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover-white"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-[600px] text-black dark:text-white">
              Contact Info
            </h3>
            <br />
            <p className="pb-2 text-base text-black dark:text-gray-300 dark:hover-white">
              Call us: 0435435093485
            </p>
            <p className="pb-2 text-base text-black dark:text-gray-300 dark:hover-white">
              Call us: 0435435093485
            </p>
            <p className="pb-2 text-base text-black dark:text-gray-300 dark:hover-white">
              Call us: 0435435093485
            </p>
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white">
          Copyriht @ 2023 Elearning | All Rights Reverse
        </p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
