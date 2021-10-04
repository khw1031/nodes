import chalk from "chalk";
import { Arguments, InferredOptionTypes, Options } from "yargs";
import { NoteType } from "../typings";
import { loadNotes, saveNotes } from "../utils";

export const addDescribe = "Add a new note";

export const addBuilder: { [key: string]: Options } = {
  title: {
    describe: "Note title",
    demandOption: true, // 필수 인자
    type: "string",
  },
  body: {
    describe: "Note body",
    demandOption: true,
    type: "string",
  },
};

export const addNote: (
  args: Arguments<InferredOptionTypes<{ [key: string]: Options }>>
) => void | Promise<void> = ({ title, body }) => {
  const notes = loadNotes();
  const duplicatedNote = notes.find((note) => note.title === title);

  if (!duplicatedNote) {
    const newNotes = [...notes, { title, body }] as NoteType[];
    saveNotes(newNotes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};
