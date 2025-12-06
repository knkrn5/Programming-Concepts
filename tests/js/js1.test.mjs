import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const filePath = path.join(import.meta.dirname, "..", "data", "data.txt");
// const filePath = path.join(import.meta.dirname);
console.log("dir name", filePath);


// const entries = await fs.readdir(filePath, { withFileTypes: true });
// const files = entries.filter((e) => e.isFile()).length;
// const dirs = entries.filter((e) => e.isDirectory()).length;
// console.dir(entries);
// console.log(`Files: ${files}, Directories: ${dirs}`);

// const data =  await fs.readFile(filePath, "utf-8");


//################## understand in detail #########################
/* const arr = [{ "foo": "bar" }, { "baz": 42 }];
console.log("string arr", JSON.stringify(arr))
console.log("tostring arr", arr.toString())
const u8 =  new TextEncoder().encode(arr);
console.log("data", arr);
console.log("u8", u8);

const decodedArr = new TextDecoder().decode(u8);
console.log("decodedArr", decodedArr); */
