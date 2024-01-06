import { Frown } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
      <div className="yFlex gap-4">
        <Frown className=" w-16 h-16 text-gray-600" />{" "}
        <h1 className="text-4xl font-bold text-gray-800 ">Page Not Found</h1>
        <p className="text-lg text-gray-600">
          Sorry, the requested page does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
