/* ==========================================================================  **
## HW Instructions

See this Google doc for clarifications:

https://docs.google.com/document/d/1EH2SB-CR_OFqxHVYfaAxphQy5upvnqzVUN-Jgj2bQR8/edit?usp=sharing

** ==========================================================================  **


1. Push your solution, contained entirely in hw3.ts, back to the github classroom
   repository. Please make sure you solution compiles!!!

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc --strict --target es2019 --module commonjs hw3.ts
   ```
   to produce a file `hw3.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire hw3.ts must compile, and we must be able to run the compiled js file
   using `node`. **Do not** commit your `.js` file.
2. **Do not** change any of the function interfaces.
3. **Do not** use any external libraries.
4. Replace `throw Error("TODO")` with your code. If you do not attempt a problem,
   please leave the `throw Error("TODO")` code there unmodified.
5. Always remember to check the function input types and the output types.
6. You can create any other additional helper functions that you would like.
7. You can leave testing code in provided that your code compiles and does not
   depend on external libraries. Remember it is up to you to test your own code.
8. You can use your solutions to questions in this assignment to answer other question
   in this assignment.

** ============================================================================ */


/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */

export const HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
export const SIGNATURE = "Joseph Edradan";

// If you used resources, please list them here
export const RESOURCES_CONSULTED = [
    "hw2.ts",
];


/* ==========================================================================  **
## OPTIONAL SURVEY

This section is purely optional. We are mainly asking because we would like to
improve the homeworks to see what you're thinking as you try to solve these
problems. This will not affect your grade in any way. As a reminder, Google is a
resource that we all use.

Example queries:
1. typescript dictionary
2. split array typescript
3. find midpoint of array

** ============================================================================ */

export const GOOGLE_QUERIES: { [id: string]: string[] } = {
    "1a": [],
    "1b": [],
    "2": [],
    "3a": [],
    "3b": [],
    "3c": [],
    "bonus": [],
};


/* ==========================================================================  **
## Problem 1: Towards recursive functions with arrays (20 pts)
** ============================================================================ */


/* ----------------------------------------------------- **
### Problem 1a (10 pts):

Write a function that splits an array into two "halves".
If there are an odd number of elements, put the extra element in the left half.

Example 1:

    splitArrayOnce([]) =
        [ [], [] ]

Example 2:

    splitArrayOnce([1]) =
        [ [ 1 ], [] ]

Example 3:

    splitArrayOnce(["hello", "world"]) =
        [ [ 'hello' ], [ 'world' ] ]

Example 4:

    splitArrayOnce(["csc600", "is", "fun"]) =
        [ [ 'csc600', 'is' ], [ 'fun' ] ]

Example 5:

    splitArrayOnce([3, 2, 1, 4]) =
        [ [ 3, 2 ], [ 1, 4 ] ]

** ----------------------------------------------------- */

// My print from the previous assignment for better readability
function print(_any: any): void {
    console.log(JSON.stringify(_any, null, "    "))
}

// Basic recursive call to halve an array with depth limiter for more recursive calls on children
function recursiveHalveArray(_array: any[], depth: number): any[] {

    // Prevent any more recursive calls
    if (depth <= 0) {
        return _array
    }

    let array_temp_1: any[] = [] // TODO: Use .slice(0, mid_point)
    let array_temp_2: any[] = [] // TODO: Use .slice(mid_point)

    _array.forEach((element, index) => {
        if (index < _array.length / 2) {
            array_temp_1.push(element)
        } else {
            array_temp_2.push(element)
        }
    })

    return [recursiveHalveArray(array_temp_1, depth - 1), recursiveHalveArray(array_temp_2, depth - 1)]
}

/*
# Python splitArrayOnce

from typing import List


def halve_list_once(list_given: list) -> List[list, list]:
    # This index mid follows the rules of the assignment
    index_mid = (len(list_given) // 2 if len(list_given) / 2 == len(list_given) // 2 else len(list_given) // 2 + 1)

    return [[list_given[i] for i in range(index_mid)], [list_given[i] for i in range(index_mid, len(list_given))]]

 */

export function splitArrayOnce<T>(arr: T[]): [T[], T[]] {
    // let array_temp_1: T[] = []
    // let array_temp_2: T[] = []
    //
    // arr.forEach((element, index) => {
    //     if (index < arr.length / 2) {
    //         array_temp_1.push(element)
    //     } else {
    //         array_temp_2.push(element)
    //     }
    // })
    //
    // return [array_temp_1, array_temp_2]
    return recursiveHalveArray(arr, 1) as [T[], T[]]
}

// console.log("##########")
// console.log("1a")
// console.log(splitArrayOnce([]))
// console.log(splitArrayOnce([1]))
// console.log(splitArrayOnce(["hello", "world"]))
// console.log(splitArrayOnce(["csc600", "is", "fun"]))
// console.log(splitArrayOnce([3, 2, 1, 4]))
// console.log()

/* ----------------------------------------------------- **
### Problem 1b (10 pts):

Write a function that splits an array into two "halves" and then
splits each half respectively again into two "havles". Thus you will
end up with 4 "quarters" at the end. As before, if there are an odd
number of elements, put the extra element in the left half.


Example 1:

    splitArrayTwice([]) =
        [ [ [], [] ], [ [], [] ] ]

Example 2:

    splitArrayTwice([1]) =
        [ [ [ 1 ], [] ], [ [], [] ] ]

Example 3:

    splitArrayTwice(["hello", "world"]) =
        [ [ [ 'hello' ], [] ], [ [ 'world' ], [] ] ]

Example 4:

    splitArrayTwice(["csc600", "is", "fun"]) =
        [ [ [ 'csc600' ], [ 'is' ] ], [ [ 'fun' ], [] ] ]

Example 5:

    splitArrayTwice([3, 2, 1, 4]) =
        [ [ [ 3 ], [ 2 ] ], [ [ 1 ], [ 4 ] ] ]

** ----------------------------------------------------- */

export function splitArrayTwice<T>(arr: T[]): [[T[], T[]], [T[], T[]]] {
    return recursiveHalveArray(arr, 2) as [[T[], T[]], [T[], T[]]]
}

// console.log("##########")
// console.log("1b")
// print(splitArrayTwice([]))
// print(splitArrayTwice([1]))
// print(splitArrayTwice(["hello", "world"]))
// print(splitArrayTwice(["csc600", "is", "fun"]))
// print(splitArrayTwice([3, 2, 1, 4]))
// console.log()

/* ==========================================================================  **
## Problem 2: Recursive functions with arrays (25 pts)

What if you had to write splitArrayThree? That would be quite the mess.
In this problem, we'll use an algebraic data types (ADTs) called
`NestedArray<T>` to encode an arbitrary sequence of nested arrays that
hold elements of type `T`.

** ============================================================================ */

export type NestedArray<T> =
    {
        tag: "LEAF"
    }
    | {
    tag: "NODE",
    contents: T,
    left: NestedArray<T>,
    right: NestedArray<T>
};

export function mkNALeaf<T>(): NestedArray<T> {
    return {
        tag: "LEAF"
    };
}

export function mkNANode<T>(contents: T, left: NestedArray<T>, right: NestedArray<T>): NestedArray<T> {
    return {
        tag: "NODE",
        contents: contents,
        left: left,
        right: right
    };
}

export const tr1 =
    mkNALeaf();

export const tr2 =
    mkNANode(
        1,
        mkNALeaf(),
        mkNALeaf()
    );

export const tr3 =
    mkNANode(
        "hello",
        mkNALeaf(),
        mkNANode(
            "world",
            mkNALeaf(),
            mkNALeaf()
        )
    );

export const tr4 =
    mkNANode(
        'is',
        mkNANode(
            'csc600',
            mkNALeaf(),
            mkNALeaf()
        ),
        mkNANode(
            'fun',
            mkNALeaf(),
            mkNALeaf()
        )
    )

export const tr5 =
    mkNANode(
        2,
        mkNANode(
            3,
            mkNALeaf(),
            mkNALeaf()
        ),
        mkNANode(
            1,
            mkNALeaf(),
            mkNANode(
                4,
                mkNALeaf(),
                mkNALeaf()
            )
        )
    );


/* ----------------------------------------------------- **
Write a function that builds a data structure of type NestedArray<T>
out of an array of T. It does so by
1. creating a leaf node if `arr` is empty
2. splitting `arr` into `arr1` and `arr2`  following the same specification
   as `splitArrayOnce` and
   - using the last element of `arr1` as the value of the current node
   - recursively using `arr1` without the last element as the left child and
   - recursively using `arr2 as the right child.


Example 1:

    splitArray([]) = tr1

           *

Example 2:

    splitArray([1]) = tr2

          1
         / \
        *   *

Example 3:

    splitArray(["hello", "world"]) = tr3

       "hello"
       /    \
      *    "world"
            /  \
           *    *

Example 4:

    splitArray(["csc600", "is", "fun"]) = tr4

          "is"
         /    \
   "csc600"   "fun"
      / \      / \
     *   *    *   *

Example 5:

    splitArray([3, 2, 1, 4]) = tr5

            2
          /   \
         3     1
        / \   / \
       *   * *   4
                / \
               *   *

** ----------------------------------------------------- */


export function splitArray<T>(arr: T[]): NestedArray<T> {

    // Base case, no children
    if (arr.length == 0) {
        return {tag: "LEAF"} // TODO: USE the function mkNANode instead
    }

    let array_halved: [T[], T[]] = splitArrayOnce(arr)

    // Can be one lined...
    let left: T[] = array_halved[0]
    let right: T[] = array_halved[1]

    // New array nested
    let array_nested_temp: NestedArray<T> = { // TODO: USE the function mkNANode instead
        tag: "NODE",
        contents: left[array_halved[0].length - 1], // Last element of the left array is the current node
        left: left.length == 0 ? {tag: "LEAF"} : splitArray(left.slice(0, left.length - 1)), // Left array excluding the last node will be the new left array
        right: right.length == 0 ? {tag: "LEAF"} : splitArray(right)
    }

    return array_nested_temp

}

// console.log("##########")
// console.log("2")
// print(splitArray([]))
// print(splitArray([1]))
// print(splitArray(["hello", "world"]))
// print(splitArray(["csc600", "is", "fun"]))
// print(splitArray([3, 2, 1, 4]))
// console.log()

/* ==========================================================================  **
## Problem 3: Recursive functions with trees (55 pts)

An NaryTree is a Tree that has any number of children.

Example 1 (ntr1):

     *   (no children)

Example 2 (ntr2):

     1   (1 child)
     |
     *

Example 3 (ntr3):

     1   (1 child)
     |
     2   (1 child)
     |
     *

Example 4 (ntr4):

      1     (2 children)
     / \
    2   3   (1 child)
    |   |
    *   *

Example 5 (ntr5):

         1       (1 child)
         |
         2       (3 children)
       / | \
      3  4  5    (1 child)
      |  |  |
      *  *  6    (1 child)
            |
            *

** ============================================================================ */

export type NaryTree<T> =
    {
        tag: "LEAF",                     // no children
    }
    |
    {
        tag: "NODE",
        contents: T,
        firstChild: NaryTree<T>,         // contains the first child
        restChildren: NaryTree<T>[]      // contains children 2 through ...
    }

export function mkNaryLeaf<T>(): NaryTree<T> {
    return {
        tag: "LEAF"
    };
}

export function mkNaryNode<T>(contents: T, children: NaryTree<T>[]): NaryTree<T> {
    if (children.length === 0) {
        return {
            tag: "NODE",
            contents: contents,
            firstChild: mkNaryLeaf(),
            restChildren: []
        }
    } else {
        return {
            tag: "NODE",
            contents: contents,
            firstChild: children[0],
            restChildren: children.slice(1)
        };
    }
}

const ntr1: NaryTree<number> =
    mkNaryLeaf();

const ntr2 =
    mkNaryNode(
        1,
        []
    );

const ntr3 =
    mkNaryNode(
        1,
        [
            mkNaryNode(2, [])
        ]
    );

const ntr4 =
    mkNaryNode(
        1,
        [
            mkNaryNode(2, []),
            mkNaryNode(3, [])
        ]
    );

const ntr5 =
    mkNaryNode(
        1,
        [
            mkNaryNode(
                2,
                [
                    mkNaryNode(3, []),
                    mkNaryNode(4, []),
                    mkNaryNode(
                        5,
                        [
                            mkNaryNode(6, []),
                        ]),
                ]
            )
        ]
    );


/* ----------------------------------------------------- **
### Problem 3a (15 pts):

Example 1:

    heightNaryTree(ntr1) = 0

Example 2:

    heightNaryTree(ntr2) = 1

Example 3:

    heightNaryTree(ntr3) = 2

Example 4:

    heightNaryTree(ntr4) = 2

Example 5:

    heightNaryTree(ntr5) = 4

** ----------------------------------------------------- */


export function heightNaryTree<T>(naTr: NaryTree<T>): number {

    // Leaf type
    if (naTr.tag === "LEAF") {
        return 0 // Leafs don't count, so 0
    }

    let array_height: number[] = []

    // Handle first child
    array_height.push(heightNaryTree(naTr.firstChild))

    // Handle the rest of the children
    naTr.restChildren.forEach(n_array_tree => {
        array_height.push(heightNaryTree(n_array_tree))

    })

    // Return the deepest child + 1. Use 1 because non leafs are not accounted for
    return Math.max(...array_height) + 1

}

// console.log("##########")
// console.log("3a")
// console.log(heightNaryTree(ntr1))
// console.log(heightNaryTree(ntr2))
// console.log(heightNaryTree(ntr3))
// console.log(heightNaryTree(ntr4))
// console.log(heightNaryTree(ntr5))
// console.log()

/* ----------------------------------------------------- **
### Problem 3b (20 pts):

Example 1:

    mapNaryTree(ntr1, (x) => x + 1) =

     *

Example 2:

    mapNaryTree(ntr2, (x) => x + 1) =

     2
     |
     *

Example 3:

    mapNaryTree(ntr3, (x) => 2*x) =

     2
     |
     4
     |
     *

Example 4:

    mapNaryTree(ntr4, (x) => 1) =

      1
     / \
    1   1
    |   |
    *   *

Example 5:

    mapNaryTree(ntr5, (x) => x + 2) =

         3
         |
         4
       / | \
      5  6  7
      |  |  |
      *  *  8
            |
            *
** ----------------------------------------------------- */

// My naive recursive deep copy from hw2
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

export function mapNaryTree<T, U>(naTr: NaryTree<T>, f: (arg: T) => U): NaryTree<U> {

    // Handle leaf (WARNING: leaf is not copied)
    if (naTr.tag === "LEAF") {
        return naiveRecursiveDeepCopy(naTr) // TODO: USE the function mkNaryNode instead
    }

    /*
    Make new n array tree

    Notes:
        Do not Naive Recursive Deep Copy on children due to the possibility of a NaryTree<T> being created on
        recursive call. Assume that children are only used for traversing.

        Naive recursive deep copy should be fine for the "contents" property as we don't know what T is.
    */
    let n_array_tree_new: NaryTree<U> = { // TODO: USE the function mkNaryNode instead
        tag: naiveRecursiveDeepCopy(naTr.tag),
        contents: f(naiveRecursiveDeepCopy(naTr.contents)),
        firstChild: mapNaryTree(naTr.firstChild, f),
        restChildren: naTr.restChildren.map(n_array_tree_temp => {
            return mapNaryTree(n_array_tree_temp, f)
        })
    }

    return n_array_tree_new

}

// console.log("##########")
// console.log("3b")
// print(mapNaryTree(ntr1, (x) => x + 1))
// print(mapNaryTree(ntr2, (x) => x + 1))
// print(mapNaryTree(ntr3, (x) => 2 * x))
// print(mapNaryTree(ntr4, (x) => 1))
// print(mapNaryTree(ntr5, (x) => x + 2))
// console.log("ORIGINAL")
// print(ntr1)
// print(ntr2)
// print(ntr3)
// print(ntr4)
// print(ntr5)
// console.log()

/* ----------------------------------------------------- **
### Problem 3c (20 pts):

Recursively convert a data-structure of type `NestedArray<T>` into a
data-structure of type `NaryTree<T>` following these rules:
1. a NestedArray leaf is converted into a NaryTree leaf
2. a NestedArray node is converted into a NaryTree node where
   - the `left` child becomes the `firstChild`
   - the `right` child becomes the first and only element of `restChildren`.

                  1
                 / \
firstChild  --> *   *  <-- restChildren is 1 element array with *


Example 1:

    nestedArrayToNaryTree(tr1) =

           *

Example 2:

    nestedArrayToNaryTree(tr2) =

          1
         / \
        *   *

Example 3:

    nestedArrayToNaryTree(tr3) =

       "hello"
       /    \
      *    "world"
            /  \
           *    *

Example 4:

    nestedArrayToNaryTree(tr4) =

          "is"
         /    \
   "csc600"   "fun"
      / \      / \
     *   *    *   *

Example 5:

    nestedArrayToNaryTree(tr5) =

            2
          /   \
         3     1
        / \   / \
       *   * *   4
                / \
               *   *

** ----------------------------------------------------- */

export function nestedArrayToNaryTree<T>(na: NestedArray<T>): NaryTree<T> {

    // Handle leaf (WARNING: leaf is not copied)
    if (na.tag === "LEAF") {
        return naiveRecursiveDeepCopy(na) as NaryTree<T> // Both leaf types are pretty much the same // TODO: USE mkNaryNode instead
    }

    /*
    Make new n array tree

    Notes:
        Do not Naive Recursive Deep Copy on children due to the possibility of a NaryTree<T> being created on
        recursive call. Assume that children are only used for traversing.

        Naive recursive deep copy should be fine for the "contents" property as we don't know what T is.
    */
    let n_array_tree_new: NaryTree<T> = { // TODO: USE the function mkNaryNode instead
        tag: naiveRecursiveDeepCopy(na.tag), // Strings need no copy
        contents: naiveRecursiveDeepCopy(na.contents),
        firstChild: nestedArrayToNaryTree(na.left),
        restChildren: [nestedArrayToNaryTree(na.right)]
    }

    return n_array_tree_new;
}

// console.log("##########")
// console.log("3c")
// print(nestedArrayToNaryTree(tr1))
// print(nestedArrayToNaryTree(tr2))
// print(nestedArrayToNaryTree(tr3))
// print(nestedArrayToNaryTree(tr4))
// print(nestedArrayToNaryTree(tr5))
// console.log("ORIGINAL")
// print(tr1)
// print(tr2)
// print(tr3)
// print(tr4)
// print(tr5)
// console.log()
