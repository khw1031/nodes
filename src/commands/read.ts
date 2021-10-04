import chalk from "chalk";
import { Arguments, InferredOptionTypes, Options } from "yargs";
import { loadNotes } from "../utils";

export const readDescribe = "Read your note";

export const readBuilder: { [key: string]: Options } = {
  title: {
    describe: "Note title",
    demandOption: true, // 필수 인자
    type: "string",
  },
};

export const readNote: (
  args: Arguments<InferredOptionTypes<{ [key: string]: Options }>>
) => void | Promise<void> = ({ title }) => {
  const notes = loadNotes();
  const targetNote = notes.find((note) => note.title === title);
  if (targetNote) {
    console.log(chalk.green(`[${targetNote.title}]`));
    console.log(targetNote.body);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};
