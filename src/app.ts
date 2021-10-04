import yargs from "yargs";
import { addBuilder, addDescribe, addNote } from "./commands/add";
import { listBuilder, listDescribe, listNote } from "./commands/list";
import { readBuilder, readDescribe, readNote } from "./commands/read";
import { removeBuilder, removeDescribe, removeNote } from "./commands/remove";
import { CommandType } from "./typings";

// Creates command
yargs
  .command(CommandType.ADD, addDescribe, addBuilder, addNote)
  .command(CommandType.REMOVE, removeDescribe, removeBuilder, removeNote)
  .command(CommandType.LIST, listDescribe, listBuilder, listNote)
  .command(CommandType.READ, readDescribe, readBuilder, readNote)
  .parse();
