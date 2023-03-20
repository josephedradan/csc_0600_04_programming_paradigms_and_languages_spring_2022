/* ==========================================================================  **
## HW Instructions

See this Google doc for clarifications:

https://docs.google.com/document/d/1xx6gwdE5c71DiKVf9Yvq1FjjKYmGLne2VH20fUZXWTk/edit?usp=sharing

** ==========================================================================  **


1. Push your solution, contained entirely in hw2.ts, back to the github classroom
   repository. Please make sure you solution compiles!!!

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc --strict --target es2019 --module commonjs hw2.ts
   ```
   to produce a file `hw2.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire hw2.ts must compile, and we must be able to run the compiled js file
   using `node`.
2. **Do not** change any of the function interfaces.
3. **Do not** use any external libraries.
4. Replace `throw Error("TODO")` with your code. If you do not attempt a problem,
   please leave the `throw Error("TODO")` code there unmodified.
5. Always remember to check the function input types and the output types.
6. You can create any other additional helper functions that you would like.
7. You can leave testing code in provided that your code compiles and does not
   depend on external libraries. Remember it is up to you to test your own code.

** ============================================================================ */


/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */

export const HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
export const SIGNATURE = "Joseph Edradan"; // TODO: FILL ME IN

// If you used any resources, please list them here
export const RESOURCES_CONSULTED = [
    "https://youtu.be/BCg4U1FzODs", // TS Crash Course
    "https://youtu.be/nViEqpgwxHE", // TS Generics
    "https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript", // Pretty print json
    "https://youtu.be/P2LTAUO1TdA?t=610", // Change Basis -> Apply transformation -> Change Basis (Transpose -> Apply function -> Transpose)
    "https://imfaber.me/typescript-how-to-iterate-over-object-properties/", // Deal with  Element implicitly has an ‘any’ type because expression of type ‘string’ can’t be used to index type
    "https://stackoverflow.com/questions/43727889/is-it-a-good-idea-to-always-set-alwaysstrict-to-true-in-tsconfig-json" // tsconfig.json strict and alwaysStrict

];


/* ==========================================================================  **
## 1. Serious series

A series (`series<T>`) is an array that can be indexed with
1) non-contiguous integers or
2) strings.

We might, for example, have a "time-series" where the index is a date-time
as opposed to an integer.

We encode this as an array of entries where each entry (`entry<T>`) stores
1) its index (number or string) and
2) the corresponding data.

|=======================|
|  1  |  0  | -3  | 42  |  data
|=======================|
| id1 | id2 | id3 | id4 |  indices
|=======================|

** ============================================================================ */

export type entry<T> = {
    id: number | string,   // index (number or string)
    data: T              // corresponding data of type T
}

export type series<T> = {
    type: "NUMBER" | "STRING" | "ANY",   // the type of the series which should match the type of the entry
    entries: entry<T>[]                  // a series is an array of entries
};


/* ----------------------------------------------------- **
Here are some examples of series.
** ----------------------------------------------------- */

const s1: series<number> = {
    type: "NUMBER",  // "NUMBER" <-> number
    entries: [
        {id: 0, data: 1},
        {id: 1, data: 2},
        {id: 2, data: 3},
    ]
};

const s2: series<string> = {
    type: "STRING",  //  "STRING" <-> string
    entries: [
        {id: 0, data: "csc600"},
        {id: 1, data: "is"},
        {id: 2, data: "fun"},
    ]
}

const s3: series<{ hour: number, min: number }> = {
    type: "ANY",   // "ANY" for every other type
    entries: [
        {id: "a", data: {hour: 10, min: 20}},
        {id: "b", data: {hour: 10, min: 30}},
        {id: "c", data: {hour: 9, min: 40}},
    ]
}


/* ----------------------------------------------------- **
### 1a. Complete the function definition below. (10 pts)

Write a *pure* function the filters a series.
Filtering a series should work like filtering an array.
Be sure to preserve the type of the series. That is, if the input
series has a 'NUMBER' type, then the filtered series should also
have a 'NUMBER' type.


Example:
  filterSeries(s1, (x: number) => x > 1) = {
      type: 'NUMBER',
      entries: [
          { id: 1, data: 2 },
          { id: 2, data: 3 }
      ]
  }

Example:
  filterSeries(s1, (x: number) => x === 2) = {
      type: 'NUMBER',
      entries: [
          { id: 1, data: 2 }
      ]
  }

Example:
  filterSeries(s1, (x: number) => x < 0) = {
      type: 'NUMBER',
      entries: []
  }
** ----------------------------------------------------- */

export function filterSeries<T>(s: series<T>, f: (arg: T) => boolean): series<T> {

    return {
        type: s.type,
        entries: s.entries.filter(_arg => f(_arg.data))
    }

}

// console.log("1a")
// print(filterSeries(s1, (x: number) => x > 1))
// print(filterSeries(s1, (x: number) => x === 2))
// print(filterSeries(s1, (x: number) => x < 0))
// console.log("ORIGINAL")
// print(s1)
// console.log()

/* ----------------------------------------------------- **
### 1b. Complete the function definition below. (10 pts)

Write a *pure* function the drops a series by index.
Be sure to preserve the type of the series. That is, if the input
series has a 'NUMBER' type, then the filtered series should also
have a 'NUMBER' type.


Example:
  dropSeries(s1, [1]) = {
      type: 'NUMBER',
      entries: [
          { id: 0, data: 1 },
          { id: 2, data: 3 }
      ]
  }

Example:
  dropSeries(s2, [0, 1]) = {
      type: 'STRING',
      entries: [
          { id: 2, data: 'fun' }
      ]
  }

Example:
  dropSeries(s2, [0, 1, 2]) = {
      type: 'STRING',
      entries: []
  }

Example:
  dropSeries(s3, ["c", "a"]) = {
      type: 'ANY',
      entries: [
          { id: "b", data: { hour: 10, min: 30} }
      ]
  }
** ----------------------------------------------------- */

function naiveRecursiveDeepCopy(_object: any): any {

    if (Array.isArray(_object)) {
        let temp: any = _object.map(_arg => naiveRecursiveDeepCopy(_arg))
        return temp
    } else if (_object instanceof Object) {
        let temp: any = {}
        for (const e in _object) {
            temp[e] = naiveRecursiveDeepCopy(_object[e])
        }
        return temp
    }
    return _object
}


export function dropSeries<T>(s: series<T>, indices: (number | string)[]): series<T> {
    return {
        type: s.type,
        entries: s.entries.filter(_arg => !indices.includes(_arg.id)).map(_arg => {
            return {
                id: _arg.id,
                data: naiveRecursiveDeepCopy(_arg.data)
            }
        })
    }
}

// console.log("1b")
// print(dropSeries(s1, [1]))
// print(dropSeries(s2, [0, 1]))
// print(dropSeries(s2, [0, 1, 2]))
// print(dropSeries(s3, ["c", "a"]))
// console.log("ORIGINAL")
// print(s1)
// print(s2)
// print(s3)
// console.log()

/* ----------------------------------------------------- **
### 1c. Complete the function definition below. (10 pts)

We will write a *pure* function that will be used to ensure that the
type in the series is consistent with the type of the entries that the
series contains. The `defaultType` argument, the first argument, is the
type that is used when an empty array is supplied. The `data` argument,
the second argument, is the array whose entries we need to examine to
create the appropriate type.

Example:
  updateType("NUMBER", []) = "NUMBER"

Example:
  updateType("STRING", []) = "STRING"

Example:
  updateType("ANY", []) = "ANY"

Example:
  updateType("NUMBER", [1, 2, 3]) = "NUMBER"

Example:
  updateType("NUMBER", ["csc600", "is", "fun"]) = "STRING"

Example:
  updateType("STRING", ["csc600", "is", "fun"]) = "STRING"

Example:
  updateType("NUMBER", [{x: "csc600"}, {x: "is"}, {x: "fun"}]) = "ANY"

** ----------------------------------------------------- */


function recursiveNonIterableTypeGetter(_object: any, _set: Set<any>): void {

    if (Array.isArray(_object)) {
        // UNCOMMENT THE BELOW IF YOU WANT TO ACCOUNT FOR ARRAYS
        // _set.add(typeof _object)

        // UNCOMMENT THE BELOW FOR RECURSIVE CALLS FOR ARRAYS
        _object.forEach(_arg => recursiveNonIterableTypeGetter(_arg, _set))
    } else if (_object instanceof Object) {
        // UNCOMMENT THE BELOW IF YOU WANT TO ACCOUNT FOR OBJECTS
        // _set.add(typeof _object)

        // UNCOMMENT THE BELOW FOR RECURSIVE CALLS FOR OBJECTS
        for (const e in _object) {
            // console.log(`${e} ${_object[e]}`)
            recursiveNonIterableTypeGetter(_object[e], _set)
        }
    } else {
        _set.add(typeof _object)
    }

}

export function updateType<T>(defaultType: "NUMBER" | "STRING" | "ANY",
                              data: T[]): "NUMBER" | "STRING" | "ANY" {


    const setTemp = new Set<string>()

    // recursiveNonIterableTypeGetter(data, setTemp)

    // THIS IS ONLY FOR 1 LAYER DEEP
    for (const item of data) {
        setTemp.add(typeof item)
    }

    // console.log(setTemp)

    if (setTemp.size > 1) {
        return "ANY"
    } else if (setTemp.size === 1) {

        let valueTemp = setTemp.keys().next().value;

        if (valueTemp === "number") return "NUMBER"
        else if (valueTemp === "string") return "STRING"
        else return "ANY"
    }
    return defaultType;

}

// console.log("1c")
// print(updateType("NUMBER", []))
// print(updateType("STRING", []))
// print(updateType("ANY", []))
// print(updateType("NUMBER", [1, 2, 3]))
// print(updateType("NUMBER", ["csc600", "is", "fun"]))
// print(updateType("STRING", ["csc600", "is", "fun"]))
// print(updateType("NUMBER", [{x: "csc600"}, {x: "is"}, {x: "fun"}]))
// console.log()

/* ----------------------------------------------------- **
### 1d. Complete the function definition below. (10 pts)

Write a *pure* function the maps a function across a series.
Mapping a series should work like mapping an array.

1. Leave the indices unmodified.
2. Be sure to change the type of the array to the new output type.
   That is, if the input series contains numbers and the output series
   contains strings, you should change the type from 'NUMBER' to 'STRING'.
   If the series is empty, do not change the type. Hint: use updateType.


Example:
  mapSeries(s1, (x: number) => x + 1) = {
      type: 'NUMBER',
      entries: [
        { id: 0, data: 2},
        { id: 1, data: 3},
        { id: 2, data: 4},
      ]
  }

Example:
  mapSeries(s1, (x: number) => x + "foo") = {
      type: 'STRING',
      entries: [
        { id: 0, data: '1foo'},
        { id: 1, data: '2foo'},
        { id: 2, data: '3foo'},
      ]
  }

Example:
  mapSeries(s1, (x: number) => ({x: 'x'})) = {
      type: 'ANY',
      entries: [
        { id: 0, data: {x: 'x'} },
        { id: 1, data: {x: 'x'} },
        { id: 2, data: {x: 'x'} },
      ]
  }
** ----------------------------------------------------- */

export function mapSeries<S, T>(s: series<S>, f: (arg: S) => T): series<T> {

    let entriesPseudo = s.entries.map(_arg => {
        return {
            id: _arg.id,
            data: f(naiveRecursiveDeepCopy(_arg.data))
        }
    })

    return {
        type: updateType(s.type, entriesPseudo.map(_arg => _arg.data)),
        entries: entriesPseudo
    }
}

// console.log("1d")
// print(mapSeries(s1, (x: number) => x + 1))
// print(mapSeries(s1, (x: number) => x + "foo"))
// print(mapSeries(s1, (x: number) => ({x: 'x'})))
// console.log("ORIGINAL")
// print(s1)
// console.log()

/* ==========================================================================  **
## 2. Basic TypeSafe Dataframes with up to 2 columns. (25 pts)

A dataframe is like an Excel spreadsheet table where we label the rows and columns.
In this problem, we will only consider dataframes with two columns.
Because we only have two columns, we will be able to express constraints on the types of
the columns that we have using the type system.

=====================
|     | col1 | col2 |
|=====|======|======|
| id1 |  x1  |  y1  |
| id2 |  x2  |  y2  |
| id3 |  x3  |  y3  |
=====================

Each column of the dataframe is captured with the `column<T>` type.
The entire dataframe is encoded with the `typesafeDataframe2<T, U>` type.
Like a series, the rows of a dataframe can be indexed with numbers or strings.
Unlike a series, the indices are shared for every column of the dataframe.
You can assume that the length of indices, column1, and column2 are the same.

** ============================================================================ */

export type column<T> = {
    name: string,
    type: "STRING" | "NUMBER" | "ANY",
    data: T[]
};

export type typesafeDataframe2<T, U> = {  // Can assume that
    indices: number[] | string[],         // indices.length === column1.length === column2.length
    column1: column<T>,
    column2: column<U>
};


const df1: typesafeDataframe2<string, number> = {
    indices: [
        0,
        1
    ],
    column1: {
        name: "courseid",
        type: "STRING",
        data: ["CSC600", "CSC601"]
    },
    column2: {
        name: "rating",
        type: "NUMBER",
        data: [5, 1]
    }
};

const df2: typesafeDataframe2<number, string> = {
    indices: [
        "beans",
        "rice",
        "chicken",
        "steak"
    ],
    column1: {
        name: "inventory",
        type: "NUMBER",
        data: [1, 2, 3, 4]
    },
    column2: {
        name: "units",
        type: "STRING",
        data: ["cans", "bags", "whole", "whole"]
    }
};


/* ----------------------------------------------------- **
### 2a. Complete the function definition below. (10 pts)

Write a *pure* function that returns the appropriate column of the dataframe as a series.
If the column name is not in the dataframe, return undefined.

Example:
  tsdf2Get(df1, "courseid") = {
    type: 'STRING',
    entries: [
        { id: 0, data: 'CSC600' },
        { id: 1, data: 'CSC601' }
    ]

  tsdf2Get(df1, 'rating') = {
    type: 'NUMBER',
    entries: [
        { id: 0, data: 5 },
        { id: 1, data: 1 } ]
    }

  tsdf2Get(df1, 'bestInstructor') = undefined

  tsdf2Get(df2, 'units') = {
    type: 'STRING',
    entries: [
        { id: 'beans', data: 'cans' },
        { id: 'rice', data: 'bags' },
        { id: 'chicken', data: 'whole' },
        { id: 'steak', data: 'whole' }
    ]
  }
}

** ----------------------------------------------------- */


function isColumn(object: any): boolean {
    if (typeof object.name !== 'string') {
        return false
    }
    if (object.type !== "STRING" && object.type !== "NUMBER" && object.type !== "ANY") {
        return false
    }
    if (!Array.isArray(object.data)) {
        return false
    }
    return true

}

export function tsdf2Get<T, U>(tsdf: typesafeDataframe2<T, U>, name: string): series<T> | series<U> | undefined {

    /*
    The below prevents:
        TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
        'typesafeDataframe2<T, U>'. No index signature with a parameter of type 'string' was found on type
        'typesafeDataframe2<T, U>'.
     */
    let _property: keyof typeof tsdf

    // Loop over tsdf's properties
    for (_property in tsdf) {

        // Check if tsdf's property is an object
        if (tsdf[_property] instanceof Object) {

            // Type assertion as object
            let tsdf_property = tsdf[_property] as object

            // Check if object is a column object
            if (isColumn(tsdf_property)) {

                // Stating type (can use initialization and assignment in one line as an alternative)
                let tsdf_property_column: column<any>;

                // Type assertion as column<any>
                tsdf_property_column = tsdf_property as column<any>

                // Compare the value of column's name to the given name
                if (tsdf_property_column.name === name) {

                    // Make a series literal object
                    let _series: series<any> = {
                        type: tsdf_property_column.type,
                        entries: tsdf_property_column.data.map((_arg, index) => {

                            // Make temp entry literal object
                            let _entry_temp: entry<any> = {
                                id: tsdf.indices[index], // Get the ID from the tsdf's indices object based on the index of the _arg
                                data: _arg
                            }
                            return _entry_temp

                        })
                    }
                    return _series
                }
            }

        }
    }
}

// console.log("2a")
// print(tsdf2Get(df1, "courseid"))
// print(tsdf2Get(df1, 'rating'))
// print(tsdf2Get(df1, 'bestInstructor'))
// print(tsdf2Get(df2, 'units'))
// console.log("ORIGINAL")
// print(df1)
// print(df2)
// console.log()

/* ----------------------------------------------------- **
### 2b. Complete the function definition below. (15 pts)

Write a *pure* function that applies a function to each row of a dataframe.
This function should behave very similarly to map on an array.


Example:
  tsdf2Apply(df2, (x) => [x[0], x[1]]) = {
    indices: [ 'beans', 'rice', 'chicken', 'steak' ],
    column1: { name: 'inventory', type: 'NUMBER', data: [ 1, 2, 3, 4 ] },
    column2: {
        name: 'units',
        type: 'STRING',
        data: [ 'cans', 'bags', 'whole', 'whole' ]
    }
  }

Example:
  tsdf2Apply(df2, (x) => [x[0] + 1, "foo" + x[1]]) = {
    indices: [ 'beans', 'rice', 'chicken', 'steak' ],
    column1: { name: 'inventory', type: 'NUMBER', data: [ 2, 3, 4, 5 ] },
    column2: {
        name: 'units',
        type: 'STRING',
        data: [ 'foocans', 'foobags', 'foowhole', 'foowhole' ]
    }
  }

** ----------------------------------------------------- */

// Python's zip, Numpy transpose, or Pandas transpose
function transpose(_array: any[]): any[] {
    // Use 0th row's indices to get the index item for each row
    return _array[0].map((column_item: any, index_column_item: number) => _array.map(row => row[index_column_item]))
}

function transposeApplyFunctionTranspose(_array: any[], f: (row: any) => any): any[] {

    let array_transposed: any[] = transpose(_array)
    let array_transposed_modified: any[] = array_transposed.map(row => f(row))
    let array_modified: any[] = transpose(array_transposed_modified)

    return array_modified
}


export function tsdf2Apply<T, U, T2, U2>(tsdf: typesafeDataframe2<T, U>, f: (row: [T, U]) => [T2, U2]): typesafeDataframe2<T2, U2> {

    let array_df_column: [any, any] = naiveRecursiveDeepCopy([tsdf.column1, tsdf.column2])
    let array_df_row_modified: any[] = transposeApplyFunctionTranspose([tsdf.column1.data, tsdf.column2.data], f)

    for (let i = 0; i < array_df_column.length; i++) {
        array_df_column[i].type = updateType(array_df_column[i].type, array_df_row_modified[i])
        array_df_column[i].data = array_df_row_modified[i]
    }

    return {
        indices: naiveRecursiveDeepCopy(tsdf.indices),
        column1: array_df_column[0],
        column2: array_df_column[1],
    }
}

// console.log("2b")
// print(tsdf2Apply(df2, (x) => [x[0], x[1]]))
// print(tsdf2Apply(df2, (x) => [x[0] + 1, "foo" + x[1]]))
// console.log("ORIGINAL")
// print(df1)
// print(df2)
// console.log()


/* ==========================================================================  **
## 3. Advanced TypeSafe Dataframes (35 pts)

The issue with the previous definition of the dataframe is that we could only
declare two columns. What if we wanted more?

In this problem, we'll extend the dataframe `typesafeDataframe2` to hold on
arbitrary number of columns. The downside is that we will need to work harder to
get the type-system to help us out. Moreover, we may not be able to express as
precise types as we did compared with the previous version.
** ============================================================================ */

export type typesafeDataframe<T> = {
    indices: number[] | string[],
    columns: column<number | string | T>[]
};


const df3: typesafeDataframe<undefined> = {
    indices: [
        0,
        1
    ],
    columns: [
        {
            name: "courseid",
            type: "STRING",
            data: ["CSC600", "CSC601"]
        },
        {
            name: "rating",
            type: "NUMBER",
            data: [5, 1]
        }
    ]
};

const df4: typesafeDataframe<any> = {
    indices: [
        0,
        1
    ],
    columns: [
        {
            name: "courseid",
            type: "STRING",
            data: ["CSC600", "CSC601"]
        },
        {
            name: "rating",
            type: "NUMBER",
            data: [5, 1]
        },
        {
            name: "students",
            type: "ANY",
            data: [["jane", "john"], ["jill", "joe"]]
        }
    ]
};

const df5: typesafeDataframe<undefined> = {
    indices: [
        0,
        1
    ],
    columns: [
        {
            name: "courseid",
            type: "ANY",  // Note that type is mismatched with type of data.
            data: ["CSC600", "CSC601"]
        },
        {
            name: "rating",
            type: "NUMBER",
            data: [5, 1]
        }
    ]
};


/* ----------------------------------------------------- **
### 3a. Complete the function definition below. (10 pts)

Write a *pure* function that checks all the purported types given in each column
matches the type of the elements in the array. That is,
1. column<number> should have "NUMBER" as it's type,
2. column<string> should have "STRING" as it's type, and
3. column<T> should have "ANY" as it's type.

Example:
  tsdfCheckTypes(df3) = true

Example:
  tsdfCheckTypes(df4) = true

Example:
  tsdfCheckTypes(df5) = false

** ----------------------------------------------------- */

export function tsdfCheckTypes<T>(tsdf: typesafeDataframe<T>): boolean {
    for (const _column of tsdf.columns) {

        // Direct comparison ignores checking if _column.type has a valid value or not
        if (_column.type !== updateType(_column.type, _column.data)) {
            return false
        }
    }
    return true
}

// console.log("3a")
// print(tsdfCheckTypes(df3))
// print(tsdfCheckTypes(df4))
// print(tsdfCheckTypes(df5))
// console.log("ORIGINAL")
// print(df3)
// print(df4)
// print(df5)
// console.log()


/* ----------------------------------------------------- **
### 3b. Complete the function definition below. (25 pts)

Write a *pure* function that applies a function to each row of a dataframe.
This function should behave very similarly to map on an array.

Example:
  tsdfApply(df4, (row) => [row[0], row[1], row[2]]) = {
    indices: [ 0, 1 ],
    columns: [
        {
            name: 'courseid',
            type: 'STRING',
            data: [ 'CSC600', 'CSC601' ]
        },
        {
            name: 'rating',
            type: 'NUMBER',
            data: [ 5, 1 ]
        },
        {
            name: 'students',
            type: 'ANY',
            data: [ ['jane', 'john'], ['jill', 'joe'] ]
        }
    ]
    }

Example:
  tsdfApply(df4, (row) => [row[0] + "!", row[1] + "?", row[2].map((x: string) => x.toUpperCase())]) = {
    indices: [ 0, 1 ],
    columns: [
        {
            name: 'courseid',
            type: 'STRING',
            data: [ 'CSC600!', 'CSC601!' ]
        },
        {
            name: 'rating',
            type: 'STRING',
            data: [ '5?', '1?' ]
        },
        {
            name: 'students',
            type: 'ANY',
            data: [ ['JANE', 'JOHN'], ['JILL', 'JOE'] ]
        }
    ]
  }

** ----------------------------------------------------- */

export function tsdfApply<T, U>(tsdf: typesafeDataframe<T>,
                                f: (row: (number | string | T)[]) => (number | string | U)[]): typesafeDataframe<U> {

    let array_df_column: [any, any] = naiveRecursiveDeepCopy(tsdf.columns)

    let array_df_row_modified: any[] = transposeApplyFunctionTranspose(tsdf.columns.map(_column => _column.data), f)

    for (let i = 0; i < array_df_column.length; i++) {

        array_df_column[i].type = updateType(array_df_column[i].type, array_df_row_modified[i])
        array_df_column[i].data = array_df_row_modified[i]
    }

    return {
        indices: naiveRecursiveDeepCopy(tsdf.indices),
        columns: array_df_column
    }
}

// console.log("3b")
// print(tsdfApply(df4, (row) => [row[0], row[1], row[2]]))
// print(tsdfApply(df4, (row) => [row[0] + "!", row[1] + "?", row[2].map((x: string) => x.toUpperCase())]))
// console.log("ORIGINAL")
// print(df4)
// console.log()


function print(_any: any): void {
    console.log(JSON.stringify(_any, null, "    "))
}
