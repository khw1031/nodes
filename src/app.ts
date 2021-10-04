import yargs from "yargs";
import { addBuilder, addDescribe, addNote } from "./commands/add";
import { removeBuilder, removeDescribe, removeNote } from "./commands/remove";
import { CommandType } from "./typings";

// Creates command
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
