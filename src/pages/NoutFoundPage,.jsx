import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex flex-col flex-grow justify-center items-center gap-3">
    <h1 className="text-2xl md:text-6xl font-bold">404 - Not Found</h1>
    <p className="text-muted-foreground text-xs md:text-base">
      The page you are looking for doesnt exist
    </p>
    <Link
      to="/"
      className="md:text-base text-sm  font-bold hover:cursor-pointer hover:underline text-blue-600"
    >
      Back to home
    </Link>
  </div>
);

export default NotFoundPage;
