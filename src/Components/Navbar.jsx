import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import campSecIcon from "../assets/CampSec.png";
import campSecDiffLogo from "../assets/Campsec-logo3.png"
export const Navbars = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-white">
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-white">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-white">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-white">
          Blocks
        </a>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Button
          variant="gradient"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </Button>
        ;
      </Typography>
    </ul>
  );

  return (
    <div className=" max-h-[768px] w-[calc(100%)] overflow-auto">
      <Navbar className="navigation sticky top-0 z-10 h-max max-w-full rounded-none py-2 lg:py-4 bg-[#041c2d] text-white border-3 border-[#b0bec5] rounded-md">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className=" cursor-pointer py-1.5 font-medium text-white"
          >
            <div className="image_icon">
              {/* <img src={campSecIcon} style={{ width: "80px" }} alt="" /> */}
              <img src={campSecDiffLogo} style={{ width: "80px" }} alt="" />
            </div>
          </Typography>
          <div className="flex items-center  pr-4">
            <div className=" hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-white hover:bg-green focus:bg-green active:bg-green lg:hidden "
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>{navList}</MobileNav>
      </Navbar>
    </div>
  );
};
