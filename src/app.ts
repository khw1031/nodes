import chalk from "chalk";
import yargs from "yargs";
import { addBuilder, addDescribe, addNote } from "./commands/add";
import { removeBuilder, removeDescribe, removeNote } from "./commands/remove";
import { CommandType } from "./typings";

// const command = (yargs.argv._[0]);

// Create add command
yargs
  .command(CommandType.ADD, addDescribe, addBuilder, addNote)
  .command(CommandType.REMOVE, removeDescribe, removeBuilder, removeNote)
  .command(CommandType.LIST, "List your notes", () => {
    console.log("Listing out all note");
  })
  .command(CommandType.READ, "Read a note", () => {
    console.log("Reading a note");
  })
  .parse();

// switch (command) {
//   case CommandType.ADD:
//     console.log("Adding notes");
//     break;
//   case CommandType.REMOVE:
//     console.log("Removing note");
//     break;
//   default:
//     break;
// }
