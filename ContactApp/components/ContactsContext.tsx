import axios from "axios";
import { createContext, useState } from "react";

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

export const ContactsContext = createContext({
  mainColor: "#000",
  AuthenticationKey: "",
  setAuthenticationKey: (key: string) => {},
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
  contacts: [] as Contact[],
  setContacts: (contacts: Contact[]) => {},
  addContact: async (contact: Contact) => {},
  deleteContact: (id: number) => {},
  updateContact: (id: number, updatedContact: Contact) => {},
  getContacts: () => {},
  getContactById: (id: number): Contact | undefined => {
    return undefined;
  },
  changeColor: (color: string) => {},
});

export const ContactsProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [mainColor, setMainColor] = useState<string>("#000");
  const [AuthenticationKey, setAuthenticationKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const addContact = async (contact: Contact) => {
    try {
      const response: any = await axios.post("http://localhost:3000/contacts", {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        notes: contact.notes,
      });
      console.log("data sent", response);
      setContacts([...contacts, response.data.contact]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = (id: number) => {
    try {
      axios.delete(`http://localhost:3000/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = (id: number, updatedContact: Contact) => {
    try {
      axios.put(`http://localhost:3000/contacts/${id}`, {
        name: updatedContact.name,
        email: updatedContact.email,
        phone: updatedContact.phone,
        address: updatedContact.address,
        notes: updatedContact.notes,
      });
      setContacts(
        contacts.map((contact) =>
          contact.id === id ? updatedContact : contact
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const changeColor = (color: string) => {
    setMainColor(color);
  };
  const getContacts = () => {
    return contacts;
  };

  const getContactById = (id: number): Contact | undefined => {
    return contacts.find((contact) => contact.id === id);
  };

  return (
    <ContactsContext.Provider
      value={{
        mainColor,
        contacts,
        setContacts,
        addContact,
        deleteContact,
        updateContact,
        getContacts,
        getContactById,
        changeColor,
        AuthenticationKey,
        setAuthenticationKey,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
