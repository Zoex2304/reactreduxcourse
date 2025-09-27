import { ContactMeButton } from "./buttons/ContactMeButton.jsx";

export const Footer = () => {
  return (
    <>
      <footer className="bg-white py-2 md:py-8 fixed left-0 bottom-0 w-full flex items-start md:items-center justify-between border-t-2 border-gray-200 px-4 flex-col md:px-12 md:flex-row lg:flex">
        <p>NovoGuard Copyright 2025</p>
        <ContactMeButton />
      </footer>
    </>
  );
};
