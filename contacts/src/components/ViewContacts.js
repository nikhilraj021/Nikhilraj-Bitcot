import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

const ViewContacts = () => {
  return (
    <div className="md:flex items-center justify-center h-screen">
      <div className="p-5 md:w-1/2 lg:w-2/3 md:border-2 space-y-3">
        <h1 className="text-3xl font-bold text-center">Contacts</h1>
        <div className="flex items-center border p-2 gap-2 rounded-lg lg:w-96 mx-auto">
          <input
            type="search"
            className="w-full outline-none "
            placeholder="Search..."
          />
          <IoSearchOutline size={22} />
        </div>
        <button className="flex items-center ml-auto bg-orange-400 text-white font-bold px-5 rounded-md gap-1">
          Add <FaCirclePlus />
        </button>
      </div>
    </div>
  );
};

export default ViewContacts;
