// import customFetch from "../utils/customFetch";

import redditImage from "../assets/reddit-alien-alt.svg";

const Navbar = () => {
  return (
    <header className="py-6 px-24">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={redditImage} alt="Reddit Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-black text-xl font-bold">Reddit Posts</h1>
        </div>
        <nav>
          <ul className="flex gap-4">
            <li className="mr-4">
              <a
                href="#"
                className="text-black hover:text-orange-700 font-medium transition duration-300"
              >
                Hot
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black hover:text-orange-700 font-medium transition duration-300"
              >
                New
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
