# Just Another Style Sheet Syntax (jasss)
Just Another Style Sheet Syntax (jasss) language created to have fun.

## About
Jasss was created as a fun little experiment as I attempted to implement the basic features of other style sheet syntax (i.e. variables, file import). On top of that, I tried implementing the notion of abstract classes and inheritance.

## TOC
+ [Installation](#installation)
+ [Basic Usage](#basic-usage)
+ [Features](#features)
    * [File import](#file-import)
    * [Variables](#variables)
    * [Scopes](#scopes)
    * [Nested Classes](#nested-classes)
    * [Abstract Classes](#abstract-classes)
    * [Extending Classes](#extending-classes)
+ [Author](#author)

## Installation
```
    npm install jasss -g
```

## Basic Usage
#### Command line
Through the command line:
```
    jass -i <input> -o <output>

    Where:
      <input>:      Required | Path to jasss file
      <output>:     Optional | Path to output the compiled CSS file (defaults to: {<input>}.css)
```

+ __Input file:__
    + required: The input file is required.
    + type: The input file must be a `*.jasss` file.

+ __Output file:__
    + The `-o` argument is *optional*. If not set, a CSS file with the same name as the input file will be created in the same directory.

#### Manual
To do it manually:
```js
    let jasss = require("jasss");

    jasss.compileFile("./app.jasss", "./output.css");
```

## Features
### File import
Other jasss files can be imported by using the `import` function. Paths are relative to the projects root folder.

#### Example
+ __Input:__ `./Example.jasss`
```stylus
    import("./path/to/file");
```

### Variables
Variables can be declared by using a name (without white spaces) followed by an equal sign and ending with a semicollon.

#### Example
+ __Input:__ `./Example.jasss`
```stylus
    bg-color = red;
```

### Scopes
Jasss implements scopes, using a global scope and private scopes for elements. Private scopes are inherited by nested elements, along with their variables.

#### Example
+ __Input:__ `./Example.jasss`
```stylus
    bg-color = red;

    .el1 {
        background-color: bg-color;
    }

    .el2 {
        bg-color = blue;
        background-color: bg-color;
    }

    .el3 {
        bg-color = yellow;
        .el3-child {
            background-color: bg-color;
        }
    }

```
+ __Output:__
```css
    .el1 {
        background-color: red;
    }

    .el2 {
        background-color: blue;
    }

    .el3 {
    }

    .el3-child {
        background-color: yellow;
    }
```

### Nested Classes
Nested classes can inherit the parent selector by using `&` character.

#### Example
+ __Input:__ `./Example.jasss`
```stylus
    .parent {
        color: blue;
        &-child {
            color: white;
        }
    }
```
+ __Output:__
```css
    .parent {
        color: blue;
    }

    .parent-child {
        color: white;
    }
```

### Abstract Classes
Abstract classes serve as basic structure for other classes to implement. Everything contained in these classes will be inherited by the class which implents (including nested elements). This helps make the code more maintainable and to avoid repetition. These classes will not be included in the final output.

#### Usage
+ To declare a new abstract class create an element with a unique name followed by `abstract` keyword.
+ The class which will implement the abstract class should be declared with the selector followed by `implements` followed by the abstract class name.

#### Example
+ __Input:__ `./button.jasss`
```stylus
    button abstract {
        & {
            cursor: pointer;
            color: font-color;
            padding: 1rem 3rem;
            display: inline-block;
            background-color: bg-color;
        }

        &:hover {
            background-color: bg-color-hover;
        }
    }

    .btn implements button {
        bg-color = #cccccc;
        font-color = #000000;
        bg-color-hover = #dddddd;
    }

    .btn-danger implements button {
        bg-color = #b71c1c;
        font-color = #ffffff;
        bg-color-hover = #ff1744;
    }
```

+ __Output:__
```css
    .btn {
        cursor: pointer;
        color: #000000;
        padding: 1rem 3rem;
        display: inline-block;
        background-color: #cccccc;
    }

    .btn:hover {
        background-color: #dddddd;
    }

    .btn-danger {
        cursor: pointer;
        color: #ffffff;
        padding: 1rem 3rem;
        display: inline-block;
        background-color: #b71c1c;
    }

    .btn-danger:hover {
        background-color: #ff1744;
    }
```

### Extending Classes
Class can extend other classes. By doing so, they inherit the class' properties and variables, but not their nested elements.

#### Usage
+ The class which will extend another class should be declared with the selector followed by `extends` followed by the abstract class name.

#### Example
+ __Input:__ `./Text.jasss`
```css
    .bold {
        font-weight: bold;
    }

    .title extends .bold {
        font-size: 1.5em;
        padding-bottom: 0.3em;
        border-bottom: 1px solid #eaecef;
    }
```

+ __Output:__
```css
    .bold {
        font-weight: bold;
    }

    .title {
        font-size: 1.5em;
        padding-bottom: 0.3em;
        border-bottom: 1px solid #eaecef;
        font-weight: bold;
    }
```

## Author
+ [Olavo Amorim Santos](https://github.com/olavoasantos)
