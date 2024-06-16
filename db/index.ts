import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import fs from "fs";

export type User = {
  id: string;
  fullname: string;
  position: string;
  description: string;
};

const generateFakeData = (numberOfdata: number) => {
  let index = 0;

  if (fs.existsSync("db/db.json")) {
    fs.unlink("db/db.json", (err) => {
      console.log(err);
    });
  }

  const users: Array<User> = [];

  while (index <= numberOfdata) {
    users.push({
      id: uuid(),
      fullname: faker.person.fullName(),
      position: faker.person.jobType(),
      description: faker.lorem.sentences(3),
    });
    index++;
  }

  const stringifyFaker = JSON.stringify({ users });
  fs.writeFile(
    "db/db.json",
    stringifyFaker,
    (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

generateFakeData(20);
