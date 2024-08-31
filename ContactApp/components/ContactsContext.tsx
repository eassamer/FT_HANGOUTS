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
  contacts: [] as Contact[],
  setContacts: (contacts: Contact[]) => {},
  addContact: (contact: Contact) => {},
  deleteContact: (id: number) => {},
  updateContact: (id: number, updatedContact: Contact) => {},
  getContacts: () => {},
  getContactById: (id: number) => {},
});

export const ContactsProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const updateContact = (id: number, updatedContact: Contact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  const getContacts = () => {
    return contacts;
  };

  const getContactById = (id: number) => {
    return contacts.find((contact) => contact.id === id);
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        addContact,
        deleteContact,
        updateContact,
        getContacts,
        getContactById,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
