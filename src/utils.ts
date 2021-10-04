import fs from "fs";
import path from "path";
import { NoteType } from "./typings";

export const loadNotes = (): NoteType[] => {
  try {
    const dataBuffer = fs.readFileSync(path.join("src", "db", "notes.json"));
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

export const saveNotes = (notes: NoteType[]) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(path.join("src", "db", "notes.json"), dataJSON);
};
