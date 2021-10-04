export enum CommandType {
  ADD = "add",
  REMOVE = "remove",
  READ = "read",
  LIST = "list",
}

export type NoteType = {
  title: string;
  body: string;
}