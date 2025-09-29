import { useEffect, useState } from "react";
import { IoMenu, IoClose, IoHeart, IoCart, IoSearch } from "react-icons/io5";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Separator } from "@radix-ui/react-separator";
import { Link, useLocation } from "react-router-dom";

/**
 * @typedef {'menu' | 'search' | null} PanelState
 */
const useHeaderState = () => {
  const location = useLocation();

  useEffect(() => closePanels(), [location]);

  /** @type {[PanelState, React.Dispatch<React.SetStateAction>]} */
  const [activePanel, setActivePanel] = useState(null);
  const tooglePanel = (panel) => {
    setActivePanel((current) => (current === panel ? null : panel));
  };
  const closePanels = () => {
    setActivePanel(null);
  };

  return {
    activePanel,
    tooglePanel,
    closePanels,
  };
};

const Hamburger = ({ isOpen }) => (
  <div className={`relative size-5 flex items-center justify-center`}>
    <IoMenu
      className={`size-5 absolute transition-all  duration-300 ${
        isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
      }`}
    />
    <IoClose
      className={`size-5 absolute transition-all  duration-300 ${
        isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
      }`}
    />
  </div>
);

const SearchBar = ({ className = "", autoFocus = false }) => (
  <div className={`relative flex items-center ${className}`}>
    <IoSearch className="absolute left-3 size-5 text-gray-400 z-10" />
    <Input
      placeholder="Search products..."
      className="pl-10"
      autoFocus={autoFocus}
    />
  </div>
);

const MobilePanel = ({ isOpen, children }) => (
  <div
    className={`absolute w-full origin-top top-full left-0 bg-white border-b border-gray-200 shadow-lg z-50 md:hidden transition-all duration-300 ease-in-out ${
      isOpen
        ? "transform scale-y-100 opacity-100"
        : "transform scale-y-0 opacity-0"
    }`}
  >
    <div
      className={`px-4 py-6 transition-all duration-300 delay-100  ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      {children}
    </div>
  </div>
);

export const Header = () => {
  const { activePanel, tooglePanel, closePanels } = useHeaderState();

  const isPanelOpen = activePanel !== null;
  const isSearchOpen = activePanel === "search";
  const isMenuOpen = activePanel === "menu";

  return (
    <>
      <header className="relative border">
        <nav className="w-full relative z-50 flex justify-between px-4 md:px-8 items-center h-16 bg-white">
          {/* logo */}
          <Link to="/">
            <p className="text-xl md:text-2xl font-bold hover:cursor-pointer flex-shrink-0">
              NovoGuard
            </p>
          </Link>
          {/* desktop searchbar */}
          <SearchBar className="w-full max-w-[600px] mx-8 hidden md:flex" />

          {/* desktop icons button*/}
          <div className="hidden md:flex items-center justify-between gap-6 ">
            {/* cart and wishLisht icon */}
            <div className="flex justify-between items-center gap-3">
              <Link to="/cart">
                <Button variant="ghost" size="icon">
                  <IoCart className="size-6" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <IoHeart className="size-6" />
              </Button>
            </div>
            <Separator
              orientation="vertical"
              // Ditambahkan lebar (w-px) dan warna (bg-gray-200)
              className="h-6 w-px bg-gray-200"
            />
            {/* auth button */}
            <div className="flex items-center gap-3">
              <Button>Log In</Button>
              <Button variant="ghost">Sign In</Button>
            </div>
          </div>

          {/* mobile icons button*/}
          <div className="flex md:hidden items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`size-10 transition-all ${
                isSearchOpen && "bg-gray-100"
              }`}
              onClick={() => tooglePanel("search")}
            >
              <IoSearch
                className={`size-5 transition-transform ${
                  isSearchOpen && "scale-110"
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`size-10 transition-all ${
                isMenuOpen && "bg-gray-100"
              }`}
              onClick={() => tooglePanel("menu")}
            >
              <Hamburger isOpen={isMenuOpen} />
            </Button>
          </div>
        </nav>

        {/* backdrop*/}
        {isPanelOpen && (
          <div
            className="fixed z-40 inset-0 bg-black/20 backdrop-blur-sm md:hidden transition-opacity duration-300"
            onClick={closePanels}
          ></div>
        )}

        {/* mobile searchbar*/}
        <MobilePanel isOpen={isSearchOpen}>
          <SearchBar autoFocus />
          <Button
            variant="ghost"
            className="w-full mt-5 justify-center text-gray-600 flex"
            onClick={closePanels}
          >
            Close
          </Button>
        </MobilePanel>

        {/* mobile menu*/}
        <MobilePanel isOpen={isMenuOpen}>
          <div className="space-y-6">
            {/* icon */}
            <div className="space-y-3">
              <Link to="/cart">
                <Button variant="ghost" className="w-full h-12 justify-start">
                  <IoCart className="size-5 mr-3 text-gray-600" />
                  <span>Cart</span>
                </Button>
              </Link>
              <Button variant="ghost" className="w-full h-12 justify-start">
                <IoHeart className="size-5 mr-3 text-gray-600" />
                <span>Wishlist</span>
              </Button>
            </div>

            {/* auth */}
            <div className="border-t border-gray-100 pt-6">
              <div className="space-y-3">
                <Button className="w-full justify-center h-12 ">Log In</Button>
                <Button
                  variant="outline"
                  className="w-full justify-center h-12"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </MobilePanel>
      </header>
    </>
  );
};
