/* ==========================================================================  **
## Midterm Instructions

1. WORK ON THIS MIDTERM ALONE!!!!!!
2. Open book, open notes, open internet.

See this Google doc for clarifications:

https://docs.google.com/document/d/1yEZ93ZyWrGIItlMrT15Z5khJw8sJwOObZzjsIvgNQsU/edit?usp=sharing

** ==========================================================================  **


1. Push your solution, contained entirely in midterm.ts, back to the github classroom
   repository. Please make sure you solution compiles!!!

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc --strict --target es2019 --module commonjs midterm.ts
   ```
   to produce a file `midterm.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire midterm.ts must compile, and we must be able to run the compiled js file
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
export const SIGNATURE = "Joseph Edradan"; // TODO: FILL ME IN

// If you used resources, please list them here
export const RESOURCES_CONSULTED = [
    "www.google.com", // TODO: FILL ME IN
];


/* ==========================================================================  **
## OPTIONAL SURVEY

This section is purely optional. We are mainly asking because we would like to
improve the homeworks to see what you're thinking as you try to solve these
problems. This will not affect your grade in any way. As a reminder, Google is a
resource that we all use.
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
## CSC 600 Midterm: The day before moving day

It's the day before moving day and that means you need to pack your stuff into containers.
We have 3 different kinds of containers that are each labeled with a name:
1. CUBE: a 10 x 10 x 10 box
2. RECTANGLE: a 10 x 10 x 5 box
3. BUNDLE: a bag that we can put other containers inside of (i.e., CUBES, RECTANGLES, or other BUNDLEs).

We can code this up with the following `Container` data type.

Unless stated otherwise, every function we write should be a pure function.

** ============================================================================ */

export type Cube = {
    tag: "CUBE",  // a 10 x 10 x 10 box
    name: string  // label of the box
};

export type Rectangle = {
    tag: "RECTANGLE",  // a 10 x 10 x 5 box
    name: string       // label of the box
};

export type Bundle = {
    tag: "BUNDLE",  // a bag
    name: string,   // label of the bag
    containers: Container[]
}

export type Container =
    Cube
    | Rectangle
    | Bundle;


export function newCube(name: string): Cube {
    return {
        tag: "CUBE",
        name: name
    };
}

export function newRectangle(name: string): Rectangle {
    return {
        tag: "RECTANGLE",
        name: name
    };
}

export function newBundle(name: string, containers: Container[]): Bundle {
    return {
        tag: "BUNDLE",
        name: name,
        containers: containers
    };
}


/* ==========================================================================  **
##

Key:
1. A CUBE or a RECTANGLE will just be notated with its name.
2. A bundle will be a enclosed off with |-| and have a name in the upper-left corner.
                                        |-|

Example:

  myStuff
 |-----------------------------------------------|
 |      kitchenware                              |
 |      |-------------------------------------|  |
 |      |                                     |  |
 |      |  cookware          silverware       |  |
 |      |  |-----------|    |--------------|  |  |
 |      |  | pots pans |    | forks knives |  |  |
 |      |  |-----------|    |--------------|  |  |
 |      ---------------------------------------  |
 |                                               |
 |  media                clothes                 |
 |  |--------------|     |--------------------|  |
 |  | movies books |     | pants shirts socks |  |
 |  |--------------|     |--------------------|  |
 |-----------------------------------------------|

The same example is given in code below.
** ============================================================================ */

export const c1 = newCube("movies");
export const c2 = newRectangle("books");
export const c3 = newBundle("media", [c1, c2]);
export const c4 =
    newBundle(
        "kitchenware",
        [
            newBundle(
                "cookware",
                [
                    newRectangle("pots"),
                    newRectangle("pans"),
                ]
            ),
            newBundle(
                "silverware",
                [
                    newCube("forks"),
                    newCube("knives"),
                ]
            ),
        ]
    )
export const c5 =
    newBundle(
        "clothes",
        [
            newCube("pants"),
            newCube("shirts"),
            newCube("socks"),
        ]
    )
export const myStuff = newBundle("mystuff", [c3, c4, c5])


/* ==========================================================================  **
## Problem 1: Basic functions on containers (25 pts)

We'll start with basic functions on containers.
1. Write *pure* functions unless stated otherwise.
2. You may assume that all names are unique, i.e., there are no duplicate labels.

** ============================================================================ */

/* ----------------------------------------------------- **
### Problem 1a (5 pts):

Write a *pure* function to get the name of a container.

Example 1:

    getName(c1) = "movies"


Example 2:

    getName(c2) = "books"

Example 3:

    getName(c3) = "media"

Example 4:

    getName(c4) = "kitchenware"

Example 5:

    getName(c5) = "clothes"

Example 6:

    getName(mystuff) = "mystuff"

** ----------------------------------------------------- */

function print(_any: any): void {
    console.log(JSON.stringify(_any, null, "    "))
}

export function getName(container: Container): string {
    return container.name
}

// console.log("1a")
// console.log(getName(c1))
// console.log(getName(c2))
// console.log(getName(c3))
// console.log(getName(c4))
// console.log(getName(c5))
// console.log(getName(myStuff))
// console.log()

/* ----------------------------------------------------- **
### Problem 1b (10 pts):

Write a *pure* function to get the names from a list of containers. You can return the names in any order.
1. Do *not* recurse.
2. As a reminder, you can assume that there are no duplicate names.

Example 1:

    getNames([]) = []

Example 2:

    getNames([c1]) = ['movies']

Example 3:

    getNames([c1, c2]) = ['movies', 'books']

Example 4:

    getNames([c1, c2, c3]) = ['movies', 'books', 'media']

Example 5:

    getNames([c1, c2, c3, c4]) = ['movies', 'books', 'media', 'kitchenware']

Example 6:

    getNames([myStuff]) = ['mystuff']

** ----------------------------------------------------- */

export function getNames(containers: Container[]): string[] {
    return containers.map(e => {
        return e.name
    })
}

// console.log("1b")
// console.log(getNames([]))
// console.log(getNames([c1]))
// console.log(getNames([c1, c2]))
// console.log(getNames([c1, c2, c3]))
// console.log(getNames([c1, c2, c3, c4]))
// console.log(getNames([myStuff]))
// console.log()

/* ----------------------------------------------------- **
### Problem 1c (10 pts):

Write a *pure* function that, given a name and a list of containers,
returns either 1) the container in the list with that name, or 2)
`undefined` if there is not a container in the list with that name.
1. Do *not* recurse.
2. As a reminder, you can assume that there are no duplicate names.

Example 1:

    findContainer("media", []) = undefined

Example 2:
    findContainer("movies", [c1]) =
        { tag: 'CUBE', name: 'movies' }

Example 3:
    findContainer("books", [c1, c2]) =
        { tag: 'RECTANGLE', name: 'books' }

Example 4:
    findContainer("media", [c1, c2, c3]) =
        {
            tag: 'BUNDLE',
            name: 'media',
            containers: [
                { tag: 'CUBE', name: 'movies' },
                { tag: 'RECTANGLE', name: 'books' }
            ]
        }

Example 5:
    findContainer("cookware", [c1, c2, c3, c4, c5]) = undefined

** ----------------------------------------------------- */

export function findContainer(name: string, containers: Container[]): Container | undefined {
    return containers.filter(e => name === e.name)[0]
}

// console.log("1c")
// console.log(findContainer("media", []))
// console.log(findContainer("movies", [c1]))
// console.log(findContainer("books", [c1, c2]))
// console.log(findContainer("media", [c1, c2, c3]))
// console.log(findContainer("cookware", [c1, c2, c3, c4, c5]))
// console.log()


/* ==========================================================================  **
## Problem 2: Basic functions on Containers (30 pts)
** ============================================================================ */

/* ----------------------------------------------------- **
### Problem 2a (15 pts):

Write a *pure* function that, given a bundle and a name, removes any container
with that name from the bundle.
1. Do *not* recurse.
2. As a reminder, you can assume that there are no duplicate names.

Example 1:
    removeContainerFromBundle(c4, "cookware") =
        {
            tag: 'BUNDLE',
            name: 'kitchenware',
            containers: [
                {
                    tag: 'BUNDLE',
                    name: 'silverware',
                    containers: [
                        { tag: 'CUBE', name: 'forks' },
                        { tag: 'CUBE', name: 'knives' }
                    ]
                }
            ]
        }

Example 2:
    removeContainerFromBundle(c4, "silverware") =
        {
            tag: 'BUNDLE',
            name: 'kitchenware',
            containers: [
                {
                    tag: 'BUNDLE',
                    name: 'cookware',
                    containers: [
                        { tag: 'RECTANGLE', name: 'pots' },
                        { tag: 'RECTANGLE', name: 'pans' }
                    ]
                }
            ]
        }

Example 3:
    removeContainerFromBundle(c4, "media") =
        {
            tag: 'BUNDLE',
            name: 'kitchenware',
            containers: [
                {
                    tag: 'BUNDLE',
                    name: 'silverware',
                    containers: [
                        { tag: 'CUBE', name: 'forks' },
                        { tag: 'CUBE', name: 'knives' }
                    ]
                },
                {
                    tag: 'BUNDLE',
                    name: 'cookware',
                    containers: [
                        { tag: 'RECTANGLE', name: 'pots' },
                        { tag: 'RECTANGLE', name: 'pans' }
                    ]
                }
            ]
        }

Example 4:
    removeContainerFromBundle(c4, "pots") =
        {
            tag: 'BUNDLE',
            name: 'kitchenware',
            containers: [
                {
                    tag: 'BUNDLE',
                    name: 'silverware',
                    containers: [
                        { tag: 'CUBE', name: 'forks' },
                        { tag: 'CUBE', name: 'knives' }
                    ]
                },
                {
                    tag: 'BUNDLE',
                    name: 'cookware',
                    containers: [
                        { tag: 'RECTANGLE', name: 'pots' },
                        { tag: 'RECTANGLE', name: 'pans' }
                    ]
                }
            ]
        }


Example 5:
    removeContainerFromBundle(newBundle("cookware", [newRectangle("pots"), newRectangle("pans")]), "pots") =
        {
            tag: 'BUNDLE',
            name: 'cookware',
            containers: [ { tag: 'RECTANGLE', name: 'pans' } ]
        }

** ----------------------------------------------------- */

export function removeContainerFromBundle(bundle: Bundle, name: string): Bundle {
    return newBundle(bundle.name, bundle.containers.filter(e => e.name !== name))
}

// console.log("2a")
// console.log("Example 1:")
// print(removeContainerFromBundle(c4, "cookware"))
// console.log("Example 2:")
// print(removeContainerFromBundle(c4, "silverware"))
// console.log("Example 3:")
// print(removeContainerFromBundle(c4, "media"))
// console.log("Example 4:")
// print(removeContainerFromBundle(c4, "pots"))
// console.log("Example 5:")
// print(removeContainerFromBundle(newBundle("cookware", [newRectangle("pots"), newRectangle("pans")]), "pots"))
// console.log()

/* ----------------------------------------------------- **
### Problem 2b (15 pts):

Write a *pure* function that adds a container with a certain tag to a bundle (at the end of the bundle).
1. If the bundle already contains a container with that name,
   do not add the container and return the bundle unmodified.
2. You do *not* need to recursively check the containers within the
   current bundle.
3. Hint: you may want to use `findContainer`.
4. If you are creating a "BUNDLE", create it with an empty `containers` field.

Example 1:

    addContainerToBundle(c5, "shirts", "RECTANGLE") =
        {
            tag: 'BUNDLE',
            name: 'clothes',
            containers: [
                { tag: 'CUBE', name: 'pants' },
                { tag: 'CUBE', name: 'shirts' },
                { tag: 'CUBE', name: 'socks' }
            ]
        }

Example 2:

    addContainerToBundle(c5, "coats", "RECTANGLE") =
        {
            tag: 'BUNDLE',
            name: 'clothes',
            containers: [
                { tag: 'CUBE', name: 'pants' },
                { tag: 'CUBE', name: 'shirts' },
                { tag: 'CUBE', name: 'socks' },
                { tag: 'RECTANGLE', name: 'coats' }
            ]
        }

Example 3:

    addContainerToBundle(c5, "coats", "BUNDLE") =
        {
            tag: 'BUNDLE',
            name: 'clothes',
            containers: [
                { tag: 'CUBE', name: 'pants' },
                { tag: 'CUBE', name: 'shirts' },
                { tag: 'CUBE', name: 'socks' },
                { tag: 'BUNDLE', name: 'coats', containers: [] }
            ]
        }

** ----------------------------------------------------- */


export function addContainerToBundle(bundle: Bundle, name: string, tag: "CUBE" | "RECTANGLE" | "BUNDLE"): Bundle {

    // No container with name within given bundle
    if (findContainer(name, bundle.containers) === undefined) {
        if (tag == "CUBE") {
            return newBundle(bundle.name, [...bundle.containers, newCube(name)])
        } else if (tag == "RECTANGLE") {
            return newBundle(bundle.name, [...bundle.containers, newRectangle(name)])
        } else if (tag == "BUNDLE") {
            return newBundle(bundle.name, [...bundle.containers, newBundle(name, [])])
        }
    }
    return bundle
}

// console.log("2b")
// console.log("Example 1")
// print(addContainerToBundle(c5, "shirts", "RECTANGLE"))
// console.log("Example 2")
// print(addContainerToBundle(c5, "coats", "RECTANGLE"))
// console.log("Example 3")
// print(addContainerToBundle(c5, "coats", "BUNDLE"))
// console.log()

/* ==========================================================================  **
## Problem 3: Complex functions on Containers (45 pts)

** ============================================================================ */


/* ----------------------------------------------------- **
### Problem 3a (20 pts):

Suppose you want to compute the amount of space your stuff takes up.
1. A "CUBE" has a volume of 100 cubic inches.
2. A "RECTANGLE" has a volume of 50 cubic inches.
3. A "BUNDLE" has a volume of the stuff contained inside of it.

Write a *pure* function that computes the volume of a container.

Example 1:

    volumeOfContainer(c1) = 100

Example 2:

    volumeOfContainer(c2) = 50

Example 3:

    volumeOfContainer(c3) = 150

Example 4:

    volumeOfContainer(c4) = 300

Example 5:

    volumeOfContainer(c5) = 300

Example 6:

    volumeOfContainer(myStuff) = 750

** ----------------------------------------------------- */

export function volumeOfContainer(container: Container): number {
    if (container.tag == "CUBE") {
        return 100
    } else if (container.tag == "RECTANGLE") {
        return 50
    } else if (container.tag == "BUNDLE") {
        return container.containers.map(_container => volumeOfContainer(_container)).reduce((previousValue, currentValue) => {
            return previousValue + currentValue
        })
    }
    return 0
}

// console.log("3a")
// console.log(volumeOfContainer(c1))
// console.log(volumeOfContainer(c2))
// console.log(volumeOfContainer(c3))
// console.log(volumeOfContainer(c4))
// console.log(volumeOfContainer(c5))
// console.log(volumeOfContainer(myStuff))
// console.log()

/* ----------------------------------------------------- **
### Problem 3b (25 pts):

Write a *pure* function that gathers all the labels in all of the containers.
You can return the labels in any order.

Example 1:
    allLabelsInContainer(c1) =
        [ 'movies' ]

Example 2:
    allLabelsInContainer(c2) =
        [ 'books' ]

Example 3:
    allLabelsInContainer(c3) =
        [ 'media', 'movies', 'books' ]

Example 4:
    allLabelsInContainer(c4) =
        [
            'kitchenware',
            'cookware',
            'pots',
            'pans',
            'silverware',
            'forks',
            'knives'
        ]

Example 5:
    allLabelsInContainer(c5) =
        [ 'clothes', 'pants', 'shirts', 'socks' ]

Example 6:
    allLabelsInContainer(myStuff) =
        [
            'mystuff',     'media',
            'movies',      'books',
            'kitchenware', 'cookware',
            'pots',        'pans',
            'silverware',  'forks',
            'knives',      'clothes',
            'pants',       'shirts',
            'socks'
        ]

** ----------------------------------------------------- */

// Not pure btw
function dfs_recursive_label_retriever(container: Container, array_string: string[]): string[] {
    array_string.push(container.name)
    if (container.tag == "BUNDLE") {
        container.containers.forEach(_container => dfs_recursive_label_retriever(_container, array_string))
    }
    return array_string // Unnecessary return, used for one liner solution
}

// Pure
export function allLabelsInContainer(container: Container): string[] {
    return dfs_recursive_label_retriever(container, [])
}

// console.log("3b")
// console.log("Example 1:")
// print(allLabelsInContainer(c1))
// console.log("Example 2:")
// print(allLabelsInContainer(c2))
// console.log("Example 3:")
// print(allLabelsInContainer(c3))
// console.log("Example 4:")
// print(allLabelsInContainer(c4))
// console.log("Example 5:")
// print(allLabelsInContainer(c5))
// console.log("Example 6:")
// print(allLabelsInContainer(myStuff))
// console.log()

/* ==========================================================================  **
## Bonus (30 pts):

Write a *pure* function that traverses a path given as a string array and adds a container to the bundle at that location.
The path is similar to a file-system path that you might use.
Add the container to the end of the bundle.
If a container already exists with the name at that path, return the entire bundle unmodified.

Example 1:

    addContainerToBundleAtPath(["media"], newCube("squidGame"), c3) =
        {
            tag: 'BUNDLE',
            name: 'media',
            containers: [
                { tag: 'CUBE', name: 'movies' },
                { tag: 'RECTANGLE', name: 'books' },
                { tag: 'CUBE', name: 'squidGame' }
            ]
        }

Example 2:

    addContainerToBundleAtPath([], newCube("squidGame"), c3) =
        {
            tag: 'BUNDLE',
            name: 'media',
            containers: [
                { tag: 'CUBE', name: 'movies' },
                { tag: 'RECTANGLE', name: 'books' }
            ]
        }

Example 3:

    addContainerToBundleAtPath(["kitchenware", "silverware"], newCube("spoons"), c4) =
        {
            tag: 'BUNDLE',
            name: 'kitchenware',
            containers: [
                {
                    tag: 'BUNDLE',
                    name: 'silverware',
                    containers: [
                        { tag: 'CUBE', name: 'forks' },
                        { tag: 'CUBE', name: 'knives' },
                        { tag: 'CUBE', name: 'spoons' }
                    ]
                },
                {
                    tag: 'BUNDLE',
                    name: 'cookware',
                    containers: [
                        { tag: 'RECTANGLE', name: 'pots' },
                        { tag: 'RECTANGLE', name: 'pans' }
                    ]
                }
            ]
        }
** ============================================================================ */

// From hw2
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

// Not pure btw
function add_container(path: string[], container_to_add: Container, bundle_to_be_traversed: Bundle, index: number): boolean {

    // If the path's depth is correct and if current relative sub path name === current bundle_to_be_traversed name
    if (index + 1 === path.length && path[index] === bundle_to_be_traversed.name) {

        // If container_to_add.name does not exist in bundle_to_be_traversed's container's names
        if (findContainer(container_to_add.name, bundle_to_be_traversed.containers) === undefined) {
            bundle_to_be_traversed.containers.push(container_to_add)
            return true
        }
    } else {

        /*
        Loop over bundle's containers

        Notes:
            JavaScript's Array.prototype.some() is Python's any()

            .some() on an empty array will return false by default
         */
        return bundle_to_be_traversed.containers.some(_container => {

            // If index + 1 is valid in path length and if index + 1 relative sub path name === _container name
            if (index + 1 < path.length && path[index + 1] === _container.name) {

                // If container is a bundle
                if (_container.tag === "BUNDLE") {
                    return add_container(path, container_to_add, _container, index + 1)
                }
            }

            // Invalid index or incorrect current container name or not a bundle
            return false
        })
    }

    // All else fails for some reason...
    return false
}

// Pure
export function addContainerToBundleAtPath(path: string[], container: Container, bundle: Bundle): Bundle {

    let bundle_copy: Bundle = naiveRecursiveDeepCopy(bundle)

    let was_container_added: boolean = add_container(path, container, bundle_copy, 0)
    // console.log(was_container_added)

    if (was_container_added) {
        return bundle_copy
    }
    return bundle
}

// FOR TESTING
// c3.containers.push(newRectangle("squidGame"))

// console.log("Bonus")
// console.log("Example 1:")
// print(addContainerToBundleAtPath(["media"], newCube("squidGame"), c3))
// console.log("Example 2:")
// print(addContainerToBundleAtPath([], newCube("squidGame"), c3))
// console.log("Example 3:")
// print(addContainerToBundleAtPath(["kitchenware", "silverware"], newCube("spoons"), c4))
// console.log()

// console.log("*** DEBUGGING ***")
// console.log("c1")
// print(c1)
// console.log("c2")
// print(c2)
// console.log("c3")
// print(c3)
// console.log("c4")
// print(c4)
// console.log("c5")
// print(c5)
// console.log("myStuff")
// print(myStuff)

