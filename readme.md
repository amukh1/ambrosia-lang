[![npm version](https://badge.fury.io/js/ambrosia-lang.svg)](https://www.npmjs.com/package/ambrosia-lang)

# Ambrosia

> A small *transpiled* **programming language** similar to *Lua*.

<br>

> Contact me for help, because I *will* respond. *Discord: amukh1#9613*

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation
<br>

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

<br>

To install and set up the library, run:

```sh
$ npm install ambrosia-lang
```

Or if you prefer using Yarn:

```sh
$ yarn add --dev ambroisa-lang
```

<!-- ## There is also a vscode extension:
**[Extension Link](https://marketplace.visualstudio.com/items?itemName=amukh1.ritchie)**

**Or  just search up "Ritchie" in the extensions section**

![img](./rvsco.png) -->

## Usage
<br>

### Import the library


```js
import execute from 'ambrosia-lang';
```


### Transpiling to Lua and executing

```js
execute(`
import stdio;

fun main(x) {
  return 0;
};
`, 'transpile');
```

```sh
$ Ambrosia-Lua: Hello World!
```

### Compiling to LLVM and executing

> **Warning**
> The LLVM Compiler is not yet completely implemented, and the version of the language that can be compiled depends heavily on the programming expicitly giving everything types.

```js
console.log(execute(`
import stdio;

fun i32 main(i32 argc, i8** argv) {
  return i32 0;
};
`, 'compile'));
```

```sh
$ [LLVM IR]
```

### The language

## Imports: [ stdio ]
```amb
import stdio;

println("Hello World!");
```

## Functions:
```amb
fun name(a,b) {
    return a + b;
}

let a = name(1,2);
println(a);
```

## Variables:
```amb
let a = 1;
println(a);
```

## If statements:
[Coming soon]

## Loops:
[Coming soon]

<!-- ## Wanna learn more? check out the docs: [Visit docs](https://ritchie.js.org/docs) -->

<!-- <style>
.docs {
    transition: all 0.5s ease;
    position: relative;
    top: 0px;
    background-color:#0f38f0; 
    border-radius:25px; 
    color: white; 
    padding:25px;
    border: none;
}

.docs:Hover {
    top: -10px;
    background-color: #0009a8;
        /* color: white;  */
}

.a {
      text-decoration: none;
    color: white;
    font-size: 2rem;
}

</style> -->

<!-- <button class="docs" href="/handbook/toc/" style="" onClick="()=>{alert('Missed the link?')}">
<a class="a" href="https://ritchie.js.org/docs/">Visit Docs</a>
</button> -->


<br>

## Contributing

You can contribute to the project by making a pull request on [GitHub](https://github.com/amukh1/ambrosia-lang).

## Credits

### Amukh1.

## Built With

* [NodeJS](https://nodejs.org/)
* [Javascript](https://developer.oracle.com/languages/javascript.html)
* [Love](https://amukh1.dev)

## Authors

* **Amukh1** - [Github](https://github.com/amukh1) / amukh1#9613

See also the list of [contributors](https://github.com/amukh1/ambrosia-lang/contributors) who participated in this project.

## License

[MIT License](https://mit-license.org/2022) © Amukh1