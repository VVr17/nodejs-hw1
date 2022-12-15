const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid"); // for ID generation

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contactList = await fs.readFile(contactsPath, "utf8");

    console.log(`get contact list: `);
    console.table(JSON.parse(contactList));
  } catch (error) {
    console.log("Error", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await fs.readFile(contactsPath, "utf8");
    const contact = JSON.parse(contactList).find(({ id }) => id === contactId);

    console.log(`get contact by id: ${contactId}`);
    console.table(contact);
  } catch (error) {
    console.log("Error", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactListData = await fs.readFile(contactsPath, "utf8");
    const contactList = JSON.parse(contactListData);

    const isInList = contactList.find(({ id }) => id === contactId);
    if (!isInList)
      throw new Error(
        `incorrect ID. Contact with ID ${contactId} is not in the list`
      );

    const updatedContactList = contactList.filter(({ id }) => id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContactList),
      "utf8"
    );

    console.log(`Contact with id ${contactId} has been removed`);
  } catch (error) {
    console.log("Error", error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { name, email, phone, id: uid(4) };

    const contactListData = await fs.readFile(contactsPath, "utf8");
    const contactList = JSON.parse(contactListData);
    contactList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactList), "utf8");

    console.log(`Contact ${name} has been added to the list`);
  } catch (error) {
    console.log("Error", error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
