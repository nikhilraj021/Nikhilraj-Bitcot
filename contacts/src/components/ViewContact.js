import React from "react";
import { ImCancelCircle } from "react-icons/im";

const ViewContact = ({ contact, onClose }) => {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 w-80 md:w-96 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-4">Contact Details</h2>

        <div className="mb-3">
          <h3 className="font-semibold">Name:</h3>
          <p>{contact.name}</p>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold">Mobile:</h3>
          <p>{contact.mobile}</p>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold">Email:</h3>
          <p>{contact.email}</p>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold">Address:</h3>
          <p>{contact.address || "Not provided"}</p>
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <ImCancelCircle size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
