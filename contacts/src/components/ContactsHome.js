import React, { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import EditAndAddContact from "./EditAndAddContact";
import ViewContact from "./ViewContact";

const ContactsHome = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [onClickAdd, setOnClickAdd] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [searchContact, setSearchContact] = useState(""); 
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axios.get("./sample.json").then((res) => {
      setAllContacts(res.data);
    });
  }, []);

  const handleCancel = () => {
    setOnClickAdd(false);
    setEditContact(null);
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = allContacts.filter((each) => each.id !== id);
    setAllContacts(updatedContacts);
  };

  const handleAddContact = (newContact) => {
    setAllContacts([...allContacts, newContact]);
    setOnClickAdd(false);
  };

  const handleEditContact = (updatedContact) => {
    const updatedContacts = allContacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setAllContacts(updatedContacts);
    setOnClickAdd(false);
    setEditContact(null);
  };

  const handleEditClick = (contact) => {
    setEditContact(contact);
    setOnClickAdd(true);
  };

  const handleView = (contact) => {
    setSelectedContact(contact); 
  };

  const handleCloseView = () => {
    setSelectedContact(null); 
  };

  const filteredContacts = allContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchContact.toLowerCase()) ||
      contact.mobile.includes(searchContact)
  );

  return (
    <div className="md:flex items-center justify-center h-screen bg-gray-500">
      <div className="p-5 md:w-1/2 lg:w-2/3 md:border-2 space-y-3">
        <h1 className="text-3xl font-bold text-center">Contacts</h1>

        <div className="flex items-center border p-2 gap-2 rounded-lg lg:w-96 mx-auto">
          <input
            type="search"
            id="search"
            className="w-full outline-none bg-transparent"
            placeholder="Search by name or mobile..."
            value={searchContact}
            onChange={(e) => setSearchContact(e.target.value)}
          />
          <label htmlFor="search">
            <IoSearchOutline size={22} />
          </label>
        </div>

        <button
          className="flex items-center ml-auto bg-orange-400 text-white font-bold px-5 py-1 rounded-md gap-1"
          onClick={() => setOnClickAdd(true)}
        >
          Add <FaCirclePlus />
        </button>

        {onClickAdd && (
          <EditAndAddContact
            onhandleCancel={handleCancel}
            onAddContact={handleAddContact}
            contactToEdit={editContact}
            onEditContact={handleEditContact}
          />
        )}

        {filteredContacts.length > 0 ? (
          <ul className="lg:flex justify-between flex-wrap gap-x-5">
            {filteredContacts.map((eachContact) => (
              <li
                key={eachContact.id}
                className="flex items-center my-4 bg-gray-200 lg:w-72 xl:w-96 p-3"
              >
                <div className="flex items-center gap-1">
                  <span>
                    <IoMdContact size={40} />
                  </span>
                  <div className="text-xs space-y-1">
                    <h1>{eachContact.name}</h1>
                    <p>{eachContact.mobile}</p>
                  </div>
                </div>
                <div className="flex items-center ml-auto gap-2">
                  <span
                    className="cursor-pointer hover:text-green-400"
                    onClick={() => handleView(eachContact)} 
                  >
                    <IoEyeSharp />
                  </span>
                  <span
                    className="cursor-pointer hover:text-red-400"
                    onClick={() => handleDeleteContact(eachContact.id)}
                  >
                    <MdDelete />
                  </span>
                  <span
                    className="cursor-pointer hover:text-blue-400"
                    onClick={() => handleEditClick(eachContact)}
                  >
                    <MdEdit />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Contacts Found.</p>
        )}
      </div>

      {selectedContact && (
        <ViewContact contact={selectedContact} onClose={handleCloseView} />
      )}
    </div>
  );
};

export default ContactsHome;
