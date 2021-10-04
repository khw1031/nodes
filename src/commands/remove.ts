import chalk from "chalk";
import { Arguments, InferredOptionTypes, Options } from "yargs";
import { loadNotes, saveNotes } from "../utils";

export const removeDescribe = "Remove a note";

export const removeBuilder: { [key: string]: Options } = {
  title: {
    describe: "Note title",
    demandOption: true,
    type: "string",
  },
};

export const removeNote: (
  args: Arguments<InferredOptionTypes<{ [key: string]: Options }>>
) => void | Promise<void> = ({ title }) => {
  deleteNotes(title as string);
};

const deleteNotes = (title: string) => {
  const notes = loadNotes();
  const remainedNotes = notes.filter((note) => note.title !== title);
  if (remainedNotes.length === notes.length) {
    console.log(chalk.red.inverse("No note found"));
  } else {
    saveNotes(remainedNotes);
    console.log(chalk.green.inverse("Note removed!"));
  }
};
