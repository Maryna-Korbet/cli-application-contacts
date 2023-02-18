const { Command } = require("commander");

const {
    listContacts,
    getContactById,
    removeContact, 
    addContact
} = require ("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

require('colors');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log('Array of all contacts:'.bgGreen);
      const allContacts = await listContacts();
      return console.table(allContacts);

    case "get":
      console.log('Contact found:'.bgBlue);
      const oneContact = await getContactById(id);
      return console.log(oneContact);

    case "add":
      console.log('A contact has been added:'.bgYellow);
      const newContact = await addContact({name, email, phone});
      return console.log(newContact);

    case "remove":
      console.log('Contact has been deleted:'.bgMagenta);
      const deleteContact = await removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

