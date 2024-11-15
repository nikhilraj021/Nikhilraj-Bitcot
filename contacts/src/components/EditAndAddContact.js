import React, { useState, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";

const EditAndAddContact = ({ onhandleCancel, onAddContact, contactToEdit, onEditContact }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setMobile(contactToEdit.mobile);
      setEmail(contactToEdit.email);
      setAddress(contactToEdit.address);
    } else {
      setName("");
      setMobile("");
      setEmail("");
      setAddress("");
    }
  }, [contactToEdit]);

  const handleClear = () => {
    setName("");
    setMobile("");
    setEmail("");
    setAddress("");
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!mobile.trim()) {
      validationErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      validationErrors.mobile = "Mobile number must be 10 digits";
    }


    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (address && address.trim().length === 0) {
      validationErrors.address = "Address cannot be empty if provided";
    }

    if (Object.keys(validationErrors).length === 0) {
      if (contactToEdit) {
        const updatedContact = {
          id: contactToEdit.id,
          name,
          mobile,
          email,
          address,
        };
        onEditContact(updatedContact);
      } else {
        const newContact = {
          id: uuidv4(), 
          name,
          mobile,
          email,
          address,
        };
        onAddContact(newContact);
      }
      handleClear(); 
    } else {
      setErrors(validationErrors); 
    }
  };

  return (
    <div className="fixed inset-4 bg-blue-100 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 p-3 w-60 md:w-96">
        <h1 className="text-center font-bold">
          {contactToEdit ? "Edit Contact" : "Add Contact"}
        </h1>
        <span className="flex justify-end" onClick={onhandleCancel}>
          <ImCancelCircle size={30} />
        </span>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border p-1 text-xs lg:text-sm outline-none"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="mobile" className="font-bold">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="text"
              className="border p-1 text-xs lg:text-sm outline-none"
              placeholder="Enter Mobile"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
            {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border p-1 text-xs lg:text-sm outline-none"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="font-bold">
              Address
            </label>
            <textarea
              id="address"
              placeholder="Enter Your Complete Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="border p-1 text-xs lg:text-sm outline-none"
            ></textarea>
            {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
          </div>

          <div className="flex justify-center gap-5">
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-800 text-white font-semibold p-1 px-3 rounded-lg"
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-orange-600 text-white font-semibold p-1 px-3 rounded-lg"
            >
              {contactToEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAndAddContact;
