  // src/components/Header.jsx

  import { useState, useEffect } from "react";
  import { Button } from "./ui/button.jsx";
  import { Input } from "./ui/input.jsx";
  import { IoCart, IoHeart, IoSearch, IoMenu, IoClose } from "react-icons/io5";
  import { Separator } from "./ui/separator.jsx";

  /**
   * @typedef {'menu' | 'search' | null} PanelState
   */

  // Custom Hook: Encapsulates all state management logic for the header.
  const useHeaderState = () => {
    /** @type {[PanelState, React.Dispatch<React.SetStateAction<PanelState>>]} */
    const [activePanel, setActivePanel] = useState(null);

    // Toggle function that handles opening, closing, and switching panels.
    const togglePanel = (panel) => {
      setActivePanel((current) => (current === panel ? null : panel));
    };
    
    const closePanels = () => {
      setActivePanel(null);
    };

    // Effect to close panels on 'Escape' key press.
    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closePanels();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return { 
      activePanel, 
      togglePanel, 
      closePanels 
    };
  };

  // Reusable UI sub-components
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

  const AnimatedMenuIcon = ({ isOpen }) => (
    <div className="relative w-5 h-5 flex items-center justify-center">
      <IoMenu className={`size-5 absolute transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
      <IoClose className={`size-5 absolute transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
    </div>
  );

  // Abstracted component for the mobile dropdown panels to reduce JSX repetition.
  const MobilePanel = ({ isOpen, children }) => (
    <div className={`absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 md:hidden
      transition-all duration-300 ease-out origin-top ${
        isOpen 
          ? 'transform scale-y-100 opacity-100' 
          : 'transform scale-y-0 opacity-0 pointer-events-none'
      }`}>
      <div className={`px-4 py-6 transition-all duration-300 delay-100 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        }`}>
        {children}
      </div>
    </div>
  );

  // Main Header Component
  export const Header = () => {
    const { activePanel, togglePanel, closePanels } = useHeaderState();

    const isPanelOpen = activePanel !== null;
    const isMenuOpen = activePanel === 'menu';
    const isSearchOpen = activePanel === 'search';

    return (
      <>
        <header className="relative z-50">
          <nav className="w-full justify-between px-4 md:px-8 flex items-center border-b border-gray-200 h-16 font-semibold bg-white">
            {/* Logo */}
            <p className="text-xl md:text-2xl hover:cursor-pointer font-bold flex-shrink-0">
              Novoguard
            </p>

            {/* Desktop Search Bar */}
            <SearchBar className="hidden md:flex max-w-[600px] w-full mx-8" />

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <IoCart className="size-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <IoHeart className="size-5" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button>Log in</Button>
              <Button variant="outline">Sign up</Button>
            </div>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-10 w-10 transition-colors ${isSearchOpen ? 'bg-gray-100' : ''}`}
                onClick={() => togglePanel('search')}
              >
                <IoSearch className={`size-5 transition-transform ${isSearchOpen ? 'scale-110' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-10 w-10 transition-colors ${isMenuOpen ? 'bg-gray-100' : ''}`}
                onClick={() => togglePanel('menu')}
              >
                <AnimatedMenuIcon isOpen={isMenuOpen} />
              </Button>
            </div>
          </nav>

          {/* Backdrop - appears when any panel is open */}
          {isPanelOpen && (
            <div 
              className="fixed top-16 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
              onClick={closePanels}
            />
          )}

          {/* Mobile Search Panel */}
          <MobilePanel isOpen={isSearchOpen}>
            <SearchBar autoFocus />
            <Button 
              variant="ghost" 
              className="w-full mt-4 justify-center py-3 text-gray-600"
              onClick={closePanels}
            >
              Cancel
            </Button>
          </MobilePanel>
          
          {/* Mobile Menu Panel */}
          <MobilePanel isOpen={isMenuOpen}>
            <div className="space-y-6">
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start h-12">
                  <IoCart className="size-5 mr-4 text-gray-600" />
                  <span>Cart</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start h-12">
                  <IoHeart className="size-5 mr-4 text-gray-600" />
                  <span>Wishlist</span>
                </Button>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <div className="space-y-3">
                  <Button className="w-full justify-center h-12">Log in</Button>
                  <Button variant="outline" className="w-full justify-center h-12">Sign up</Button>
                </div>
              </div>
            </div>
          </MobilePanel>
        </header>
      </>
    );
  };