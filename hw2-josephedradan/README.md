[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7120829&assignment_repo_type=AssignmentRepo)

# HW2

- `hw2.ts` contains hw2.
- To submit, please push `hw2.ts` back to the repository.
  - DO NOT add `node_modules`.
- Your code needs to compile with no errors with
  ```
  tsc --strict --target es2019 --module commonjs hw2.ts
  ```
  This command will produce a file `hw2.js` which you can run with `node`.
  If your code does not compile, we will not grade your submission.
- You can run your compiled code with
  ```
  node hw2.js
  ```

Window's Powershell Oneliner:

    tsc --strict --target es2019 --module commonjs hw2.ts; node hw2.js;

_Original Repo_: https://github.com/SFSU-CSC600-S22/hw2-josephedradan/tree/d85aea2ef5cc95352f89846dfbca27b647c75530

_Grader_: https://github.com/aaronbembenek
