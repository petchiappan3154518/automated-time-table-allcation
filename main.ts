import "./style.css";
let teachersData = [
  { id: "001", subjects: ["tamil", "english"], name: "sfyds" },
  { id: "002", subjects: ["english", "math"] },
  { id: "003", subjects: ["scie", "soci"] },
  { id: "004", subjects: ["tamil", "soci"] },
  { id: "005", subjects: ["english", "soci"] },
  { id: "006", subjects: ["tamil", "soci"] },
  { id: "007", subjects: ["english", "socil"] },
  { id: "008", subjects: ["english", "soci"] }
];

let a = [
  { name: "I" },
  { name: "II" },
  { name: "III" },
  { name: "IV" },
  { name: "V" },
  { name: "VI" },
  { name: "VII" },
  { name: "VIII" }
];

let y = [];
let z = [];

// Teacher Class

class Teacher {
  constructor(
    public id: string,
    public subjects: Array<string>,
    public day: number,
    public hour: number
  ) {}
}

// ClassRoom Class

class Classroom {
  teacher: Teacher;
  constructor(public name: string, public day: number, public hour: number) {}
}

// School Class

class School {
  classRooms: Array<Classroom> = [];

  teachers: Array<Teacher> = [];

  constructor(
    public name: string,
    public workingDays: number,
    public hours: number
  ) {}

// Import Teachers

  importTeachers(arr: Array<{ id: string; subjects: Array<string> }>) {
    for (const x of arr) {
      for (let i = 0; i < this.workingDays; i++) {
        for (let j = 0; j < this.hours; j++) {
          const teacher = new Teacher(x.id, x.subjects, i + 1, j + 1);
          this.teachers.push(teacher);
        }
      }
    }
  }

// Add ClassRooms

  addClassRoom(name: string) {
    for (let i = 0; i < this.workingDays; i++) {
      for (let j = 0; j < this.hours; j++) {
        const classRoom = new Classroom(name, i + 1, j + 1);
        this.classRooms.push(classRoom);
      }
    }
  }

// Teachers Shuffle

  Shuffle() {
    this.teachers = this.teachers.sort(() => Math.random() - 0.5);
  }

// Assign Teacher to Class

  assign(x) {
    const teacfound = this.teachers.filter(
      teacher => teacher.day == x.day && teacher.hour == x.hour
    );

    for (let j = 0; j < 1; j++) {
      x.teacher = teacfound[j];
    }
  }

  start() {
    this.Shuffle();

    for (let x of this.classRooms) {
      let s = this.assign(x);
    }
  }
}

const sample = new School("Sample", 6, 8);

sample.importTeachers(teachersData);
sample.addClassRoom("I");
sample.addClassRoom("II");
sample.addClassRoom("III");
sample.addClassRoom("IV");
sample.addClassRoom("V");
sample.addClassRoom("VI");
sample.addClassRoom("VII");
sample.addClassRoom("VIII");

sample.start();

//divide classRoom day

function daydiv(t) {
  for (let i = 0; i < 6; i++) {
    var rowfound = t.filter(teachers => teachers.day == i + 1);
      for(let j=0;j<8;j++){
        t.shift();
      }
    t.push(rowfound);
  }
  y.push(t);
} 

// divide classRooms

function clsdiv(data) {
  for (var i = 0; i < 8; i++) {
    var clsfound = data.filter(teachers1 => teachers1.name == a[i].name);
    daydiv(clsfound);
  }
}

clsdiv(sample.classRooms);

//create cell <td>

const createColumn = (data) => {
  const td = document.createElement('td')
  const text = document.createTextNode(data.name);
  td.appendChild(text)
  return td;
}

//create row <tr>

const createRow = (data) => {
  const tr = document.createElement('tr');
  for (const i of data) {
    const col = createColumn(i);
    tr.appendChild(col)
  }
  return tr;
}

// create table <table>

function createTable(data){
  const table = document.createElement('table');
  table.setAttribute("border",'2');
  for (const i of data) {
    const col = createRow(i);
    table.appendChild(col)
  }
  return table;
}

for(let l of y){
  const table2 = createTable(l);
  document.getElementById('app').appendChild(table2);
}
