import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
import "../app.css";

declare var GLOBAL: string;

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
