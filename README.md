<h1 align="center">Intor Translator</h1>

<p align="center">
The <a href="https://github.com/yiming-liao/intor">Intor</a> translation engine
</p>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/intor-translator?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/intor-translator)
[![Coverage Status](https://img.shields.io/coveralls/github/yiming-liao/intor-translator.svg?branch=main&style=flat&colorA=000000&colorB=000000)](https://coveralls.io/github/yiming-liao/intor-translator?branch=main)
[![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue?style=flat&colorA=000000&colorB=000000)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/npm/l/intor-translator?style=flat&colorA=000000&colorB=000000)](LICENSE)

</div>

## Features

- **Modular Pipeline** – A pluggable, hook-driven flow for any translation logic.
- **Typed Autocomplete** – Inferred keys and locales with precise, reliable completion.
- **Framework-Agnostic** – A lightweight engine that runs anywhere in JavaScript.

## Installation

```bash
# npm
npm install intor-translator

# yarn
yarn add intor-translator

# pnpm
pnpm add intor-translator
```

Or load it directly from a CDN:

```js
import { Translator } from "https://cdn.jsdelivr.net/npm/intor-translator/+esm";
```

## Quick Start

```typescript
import { Translator } from "intor-translator";

const messages = {
  en: {
    hello: "Hello World",
    greeting: "Hello, {name}!", // Use curly braces for replacements
  },
};

// Create a translator instance
const translator = new Translator({ messages, locale: "en" });

// Use the translator
translator.t("hello"); // -> Hello World
translator.t("greeting", { name: "John doe" }); // -> Hello, John doe!
```

---

## Handlers & Hooks

Intor Translator is powered by **a flexible pipeline** that lets you control how translations behave and how they are rendered.

### Handlers — format the final output

<sup>_changing how translations look_.</sup>

Handlers operate on the resolved message, use them to:

- format ICU messages
- apply custom plural logic
- post-process output
- style or transform the final string

### Hooks — shape the translation flow

<sup>_changing how translations work_.</sup>

Hooks run through the pipeline and can intercept any stage, use them to:

- transform keys or messages
- adjust fallback behavior
- implement loading or missing logic
- attach metadata or analytics

> Together, they form a customizable translation pipeline — structured, predictable, beautifully simple.

---

## Rich Message Processing

This module provides a semantic message processing flow for **_translated rich-formatted strings_**.

- Tokenize → AST → renderer-driven output
- Environment-agnostic by design

Read the documentation: [Message Processing ↗](https://github.com/yiming-liao/intor-translator/tree/main/src/message)

---

**_For more advanced usage, see the full examples._**
[View examples ↗](https://github.com/yiming-liao/intor-translator/tree/main/examples)

**_See full benchmark details:_** [bench ↗](https://github.com/yiming-liao/intor-translator/tree/main/bench)
