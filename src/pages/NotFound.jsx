import { Frown } from "lucide-react";

const NotFound = () => {
  return (
    <div className="notFound ">
      <div className="yFlex gap-4">
        <Frown className=" icon-notFound" />{" "}
        <h1 className="notFound-heading ">Page Not Found</h1>
        <p className="notFound-para">
          Sorry, the requested page does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
