import chalk from "chalk";
import { Arguments, InferredOptionTypes, Options } from "yargs";
import { loadNotes } from "../utils";

export const listDescribe = "List your notes";

export const listBuilder: { [key: string]: Options } = {};

export const listNote: (
  args: Arguments<InferredOptionTypes<{ [key: string]: Options }>>
) => void | Promise<void> = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes"));
  notes.forEach((note) => {
    console.log("- " + note.title);
  });
};
