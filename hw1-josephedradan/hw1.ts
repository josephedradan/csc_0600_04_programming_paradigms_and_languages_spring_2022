/* ==========================================================================  **
## HW Instructions

See this Google doc for clarifications:

https://docs.google.com/document/d/1puXjvs3eGsSI2Cl0odm3jDmVZ2uvVBVbe-quvoXcM1g/edit?usp=sharing

** ==========================================================================  **


1. Push your solution, contained entirely in hw1.ts, back to the github classroom
   repository. Please make sure you solution compiles!!!

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc --strict --target es2019 --module commonjs hw1.ts
   ```
   to produce a file `hw1.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire hw1.ts must compile, and we must be able to run the compiled js file
   in `node`.
2. **Do not** change any of the function interfaces.
3. **Do not** use any external libraries.
4. Fill in everything that has TODO.
5. Always remember to check the function input types and the output types.
   This way, you will know at least the kind of value you need to create.

** ============================================================================ */


/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */

export const HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
export const SIGNATURE = "Joseph Edradan"; // TODO: FILL ME IN

// If you used any resources, please list them here
export const RESOURCES_CONSULTED = [
    "www.google.com", // TODO: FILL ME IN
    "https://www.youtube.com/watch?v=BwuLxPH8IDs", // The entire thing
];

/* ==========================================================================  **
## 1. Fun with TypeScript Arrays (40 pts)

This problem is a warmup to get you familiar with TypeScript syntax.
Throughout these problems, please just use basic TypeScript features:
for loops, conditionals, basic arithmetic expressions, basic string operations.

Hint: The `for` `of` construct below can be used to traverse an array.

const arr = [1, 2, 3];
for (const x of arr) {
    console.log(x);
}
>> 1
>> 2
>> 3
** ============================================================================ */

// function pyramids(amount: number): void {
//     if (amount < 0) {
//         return;
//     }
//
//     let i: number; // Just like in python
//     for (i of Array(amount).keys()) {
//
//         let z: number;
//         for (z of Array(i).keys()) {
//             console.log("#".repeat(z))
//         }
//         console.log("#".repeat(i))
//
//         for (z of Array.from(Array(i).keys()).reverse()) {
//             console.log("#".repeat(z))
//         }
//     }
// }
//
// pyramids(10)


/* ----------------------------------------------------- **
### 1a. Complete the function definition below. (8 pts)

`sumArray` takes an array of numbers and produces the sum of all the numbers in the array.

Example:
  sumArray([]) = 0

Example:
  sumArray([1, 2, 3]) = 6

Example:
  sumArray([-1, -2, 3, 10]) = 10
** ----------------------------------------------------- */

export function sumArray(arr: number[]): number {

    let temp: number = 0;

    for (const i of arr) {
        temp += i
    }
    return temp
}

// console.log(sumArray([]))
// console.log(sumArray([1, 2, 3]))
// console.log(sumArray([-1, -2, 3, 10]))

/* ----------------------------------------------------- **
### 1b. Complete the function definition below. (8 pts)

`minArray` takes an array of numbers and returns the smallest number in the array.

Example:
  minArray([]) = Number.NEGATIVE_INFINITY

Example:
  minArray([1, 2, 3]) = 1

Example:
  minArray([-1, -2, 3, 10]) = -2
** ----------------------------------------------------- */

export function minArray(arr: number[]): number {
    if (arr.length === 0) return Number.NEGATIVE_INFINITY

    let temp: number = Number.POSITIVE_INFINITY;

    for (const i of arr) {
        if (i < temp) {
            temp = i
        }
    }
    return temp
}

// console.log(minArray([]))
// console.log(minArray([1, 2, 3]))
// console.log(minArray([-1, -2, 3, 10]))

/* ----------------------------------------------------- **
### 1c. Complete the function definition below. (8 pts)

`concatArray` takes an array of strings and returns the concatenation
of all the strings in the array from left to right.

Example:
  concatArray([]) = ""

Example:
  concatArray(["hello", "world"]) = "helloworld"

Example:
  concatArray(["csc600", "is", "fun"]) = "csc600isfun"
** ----------------------------------------------------- */

export function concatArray(arr: string[]): string {

    let temp: string = ""

    for (const i of arr) {
        temp += i
    }
    return temp
}

// console.log(concatArray([]))
// console.log(concatArray(["hello", "world"]))
// console.log(concatArray(["csc600", "is", "fun"]))

/* ----------------------------------------------------- **
### 1d. Complete the function definition below. (8 pts)

`revConcatArray` takes an array of strings and returns the concatenation
of all the strings in the array from right to left.

Example:
  revConcatArray([]) = ""

Example:
  revConcatArray(["hello", "world"]) = "worldhello"

Example:
  revConcatArray(["csc600", "is", "fun"]) = "funiscsc600"
** ----------------------------------------------------- */

export function revConcatArray(arr: string[]): string {
    let temp: string = ""

    // for (const i of arr.reverse()) {
    //     temp += i
    // }

    for (let i = 0; i < arr.length; i++) {
        temp += arr[arr.length - 1 - i]
    }

    return temp
}


// console.log(revConcatArray([]))
// console.log(revConcatArray(["hello", "world"]))
// console.log(revConcatArray(["csc600", "is", "fun"]))

/* ----------------------------------------------------- **
### 1e. Complete the function definition below. (8 pts)

`concatAndRevConcatArray` takes an array of strings and returns both
the concatenation of all the strings in the array from left to right
and right to left. Thus `concatAndRevConcatArray` returns a tuple of 2
strings.

Example:
  concatAndRevConcatArray([]) = ["", ""]

Example:
  concatAndRevConcatArray(["hello", "world"]) = ["helloworld", "worldhello"]

Example:
  concatAndRevConcatArray(["csc600", "is", "fun"]) = ["csc600isfun", "funiscsc600"]
** ----------------------------------------------------- */

export function concatAndRevConcatArray(arr: string[]): [string, string] {
    return [concatArray(arr), revConcatArray(arr)]
}

// console.log(concatAndRevConcatArray([]))
// console.log(concatAndRevConcatArray(["hello", "world"]))
// console.log(concatAndRevConcatArray(["csc600", "is", "fun"]))


/* ==========================================================================  **
## 2. Pure Functions (30 pts)


This problem is a warmup to get you familiar with the concept of a **pure** function.
As a reminder, a pure function is a function that always produces the same outputs
given the same inputs. Also pure functions do not modify their arguments. Pure functions
are very valuable in distributed and collaborative settings because different consumers of
pure functions can trust that their own data will not be clobbered by calling a pure function.

Throughout these problems, please just use basic TypeScript features:
for loops, conditionals, basic arithmetic expressions, basic string operations.

** ============================================================================ */

/* ----------------------------------------------------- **
### 2a. Complete the function definition below. (10 pts)

`inplaceAdd1Array` takes an array of numbers and increments each element of the
array by 1 in-place. Thus `inplaceAdd1Array` is not a pure function. This style of
coding might be what you are familiar with from an imperative programming (e.g.,
C/Java) background. Note that `inplaceAdd1Array1` returns nothing, i.e., has
return type of `void`.

Example:
  const arr = [1, 2, 3];
  inplaceAdd1Array(arr);
  console.log(arr);
  >> [2, 3, 4]

  inplaceAdd1Array(arr);
  console.log(arr);
  >> [3, 4, 5]

  inplaceAdd1Array(arr);
  console.log(arr);
  >> [4, 5, 6]

  const arr2 = [1, 2, 3];
  inplaceAdd1Array(arr2);
  console.log(arr2);
  >> [2, 3, 4]
** ----------------------------------------------------- */

export function inplaceAdd1Array(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
        arr[i] += 1;
    }
}

// const arr = [1, 2, 3];
// inplaceAdd1Array(arr);
// console.log(arr);
//
// inplaceAdd1Array(arr);
// console.log(arr);
//
// inplaceAdd1Array(arr);
// console.log(arr);
//
// const arr2 = [1, 2, 3];
// inplaceAdd1Array(arr2);
// console.log(arr2);


/* ----------------------------------------------------- **
### 2b. Complete the function definition below. (10 pts)

`copyNumArray` takes an array of numbers and returns a duplicate.
`copyNumArray` is an example of a *pure* function. In particular,
creating a copy of an input data structure is a good heuristic for
making a function pure.

Example:
  const arr1 = [1, 2, 3];
  const arr2 = copyNumArray(arr1);
  inplaceAdd1Array(arr1);
  console.log(arr1);
  >> [2, 3, 4]

  console.log(arr2);
  >> [1, 2, 3]

Example:
  const arr = [1, 2, 3, 4];
  console.log(inplaceAdd1Array(copyNumArray(arr)));
  >> undefined

  const arr2 = copyNumArray(arr);
  inplaceAdd1Array(arr2);
  console.log(arr2);
  >> [2, 3, 4, 5]
  console.log(arr);
  >> [1, 2, 3, 4]
** ----------------------------------------------------- */

export function copyNumArray(arr: number[]): number[] {
    let arr2: number[] = []

    for (const i of arr) {
        arr2.push(i)
    }
    return arr2
}

// const arr1 = [1, 2, 3];
// const arr2 = copyNumArray(arr1);
// inplaceAdd1Array(arr1);
// console.log(arr1);
// console.log(arr2);

// const arr = [1, 2, 3, 4];
// console.log(inplaceAdd1Array(copyNumArray(arr)));
// const arr2 = copyNumArray(arr);
// inplaceAdd1Array(arr2);
// console.log(arr2);
// console.log(arr);

/* ----------------------------------------------------- **
### 2c. Complete the function definition below. (10 pts)

`add1Array` is a *pure* function that increments each element of an array
without modifying the array passed in. Now would be a good time to compare
and contrast `add1Array` and `inplaceAdd1Array` to see how different the
reasoning with a pure and impure function is.

Example:
  const arr = [1, 2, 3];
  console.log(add1Array(arr));
  >> [2, 3, 4]
  console.log(arr);
  >> [1, 2, 3]
  console.log(add1Array(arr));
  >> [2, 3, 4]
  console.log(arr);
  >> [1, 2, 3]
** ----------------------------------------------------- */

export function add1Array(arr: number[]): number[] {
    let arr2: number[] = []

    for (const i of arr) {
        arr2.push(i + 1)
    }
    return arr2
}

// const arr = [1, 2, 3];
// console.log(add1Array(arr));
// console.log(arr);
// console.log(add1Array(arr));
// console.log(arr);

/* ==========================================================================  **
## 3. Other TypeScript Features (30 pts)

This problem is a warmup to get you familiar with other TypeScript features,
including generics, dictionary types, and record types. You should have encountered
these language features in other languages (e.g., C/Java). We'll also get more practice
with writing pure functions.

** ============================================================================ */


/* ----------------------------------------------------- **
### 3a. Complete the function definition below. (10 pts)

`copyArray` is a *generic* and *pure* function that returns a copy of an array.

Example:
  const arr = ["csc600", "is", "fun"];
  const arr2 = copyArray(arr);
  arr[0] = "life";
  console.log(arr2);
  >> ["csc600", "is", "fun"]

Example:
  const arr = [1, 2, 3, 4];
  const arr2 = copyArray(arr);
  arr[0] = -1;
  console.log(arr2);
  >> [1, 2, 3, 4]
** ----------------------------------------------------- */

export function copyArray<T>(arr: T[]): T[] {
    let arr2: T[] = []

    for (const i of arr) {
        arr2.push(i)
    }
    return arr2
}

// const arr = ["csc600", "is", "fun"];
// const arr2 = copyArray(arr);
// arr[0] = "life";
// console.log(arr2);

// const arr = [1, 2, 3, 4];
// const arr2 = copyArray(arr);
// arr[0] = -1;
// console.log(arr2);

/* ----------------------------------------------------- **
### 3b. Complete the function definition below. (10 pts)

`copyDictionary` is a *pure* function that returns a copy of a dictionary.

Example:
  const dict = {
      "hello": 1,
      "world": 2
  };
  const dict2 = copyDictionary(dict);
  dict["hello"] = -1;
  console.log(dict2);
  >> {"hello": 1, "world": 2}


Hint: you may want to use the code below to traverse a dictionary

for (const [key, val] of Object.entries(dict)) {
    console.log(key, val);
}
>> "hello" 1
>> "world" 2
** ----------------------------------------------------- */

export function copyDictionary(dict: { [key: string]: number }): { [key: string]: number } {

    let temp: { [key: string]: number } = {}

    for (const [key, val] of Object.entries(dict)) {
        temp[key] = val;
    }
    return temp
}

// const dict = {
//     "hello": 1,
//     "world": 2
// };
// const dict2 = copyDictionary(dict);
// dict["hello"] = -1;
// console.log(dict2);

/* ----------------------------------------------------- **
### 3c. Complete the function definition below. (10 pts)

`copyTsRecord` returns a copy of a user-defined data structure.
It is a *pure* and *generic* function.
Make sure to also copy the dictionary! Hint: can you use a function that you previously defined?

Example:
  const rec = {
    myStr: "hello",
    myNum: 42,
    myDict: {
        "csc600": -1,
        "is": -2,
        "fun": 3
    }
  };
  const rec2 = copyTsRecord(rec);
  rec.myStr = "foobar";
  console.log(rec2);
  >> {myStr: "hello", myNum: 42, myDict: {"csc600": -1, "is": -2, "fun": 3}}
** ----------------------------------------------------- */

type tsRecord = {
    myStr: string,
    myNum: number,
    myDict: { [key: string]: number }
}

export function copyTsRecord(tsRec: tsRecord): tsRecord {
    return {
        myStr: tsRec.myStr,
        myNum: tsRec.myNum,
        myDict: copyDictionary(tsRec.myDict)
    }
}

// const rec = {
//     myStr: "hello",
//     myNum: 42,
//     myDict: {
//         "csc600": -1,
//         "is": -2,
//         "fun": 3
//     }
// };
//
// const rec2 = copyTsRecord(rec);
// rec.myStr = "foobar";
// console.log(rec2);

/* ==========================================================================  **
## Bonus. (10 pts)

This is a bonus that introduces a generic dictionary and record.
It behaves just like tsRecord, except that the dictionary can contain values of
any type T. Write the `copyGenericTsRecord` function. Make sure to also copy the
dictionary!
** ============================================================================ */

type genericTsRecord<T> = {
    myStr: string,
    myNum: number,
    myDict: { [key: string]: T }
}

export function copyGenericTsRecord<T>(tsRec: genericTsRecord<T>): genericTsRecord<T> {
    return {
        myStr: tsRec.myStr,
        myNum: tsRec.myNum,
        myDict: (() => {
            let temp: { [key: string]: T } = {}

            for (const [key, val] of Object.entries(tsRec.myDict)) {
                temp[key] = val;
            }
            return temp
        })(),
    }
}

// const rec = {
//     myStr: "hello",
//     myNum: 42,
//     myDict: {
//         "csc600": -1,
//         "is": -2,
//         "fun": 3
//     }
// };
// console.log(rec);
// const rec2 = copyGenericTsRecord(rec);
// rec.myStr = "foobar";
// rec.myDict.fun = 43;
// console.log(rec2);
// console.log(rec);
