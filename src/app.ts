// Generic function
// type constraints

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max" }, { age: 20 }); // OK

// console.log(mergedObj);

interface Lenghty {
  length: number;
}

function countAndDescribe<T extends Lenghty>(element: T) {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

function extractAndConvert<T, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

class DataStorage<T> {
  private data: T[] = [];
  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Kim");

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function crateCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
}
