---
title: "Clean sem explicação"
description: "🛀 Arquitetura Clean como referência para o futuro..."
tags:
  - Javascript
  - Just Code
langs:
  - javascript
---

```javascript

console.log("Estou limpo");

```

## Arquitetura Clean

```javascript

/*
  DOMÍNIO 
*/
// Entidades
function Entities({ errors }) {
  function Todo({ description, done = false } = {}) {
    if (!description) {
      errors.missingTodo();
    }
    return Object.freeze({
      getDescription: () => description,
      isDone: () => done,
    });
  }

  return Object.freeze({
    Todo,
  });
}

// Casos de uso
function UseCases({ errors, entities, repositories }) {
  async function addTodo(todoData) {
    const todoEntity = entities.Todo(todoData);
    return await repositories.todo.add(todoEntity);
  }

  async function doTodo(id) {
    if (!id) {
      errors.required("id");
    }
    return await repositories.todo.do(id);
  }

  return Object.freeze({
    addTodo,
    doTodo,
  });
}

/*
  INTERFACES
*/
// Bibliotecas
function Errors({ errors } = {}) {
  function missingTodo() {
    throw new Error(errors.MISSING_TODO);
  }

  function required(item) {
    throw new Error(errors.REQUIRED + item);
  }

  return Object.freeze({
    missingTodo,
    required,
  });
}

// Repositórios
function Repositories({ database }) {
  const todo = {
    async add(todoEntity) {
      return await database.addTodo(
        todoEntity.getDescription(),
        todoEntity.isDone()
      );
    },
    async do(id) {
      return await database.doTodo(id);
    },
  };

  return Object.freeze({
    todo,
  });
}

// Apresentadores
function Presenters({ views }) {
  function addTodo(response) {
    views.addTodo(response);
  }

  function doTodo(response) {
    views.doTodo(response);
  }

  function todoError(error) {
    views.todoError(error.message);
  }

  return Object.freeze({
    addTodo,
    doTodo,
    todoError,
  });
}

// Controladores
function Controllers({ presenters, useCases }) {
  async function addTodo(todoData) {
    try {
      const response = await useCases.addTodo(todoData);
      presenters.addTodo(response);
      return response;
    } catch (error) {
      presenters.todoError(error);
    }
  }

  async function doTodo(id) {
    try {
      const response = await useCases.doTodo(id);
      presenters.doTodo(response);
      return response;
    } catch (error) {
      presenters.todoError(error);
    }
  }

  return Object.freeze({
    addTodo,
    doTodo,
  });
}

/*
  FRAMEWORKS
*/
const database = {
  async addTodo(description, done) {
    console.log("Todo adicionado ao banco de dados");
    return { id: 1, description, done };
  },

  async doTodo(id) {
    console.log(`Todo ${id} está feito no banco de dados`);
    return { id, done: true };
  },
};

/*
  INJEÇÕES DE DEPENDÊNCIA
*/
// Interfaces
const errorsInPortuguese = {
  MISSING_TODO: "Esta faltando a descrição do TODO",
  REQUIRED: "O seguinte argumento está faltando: ",
};
const errors = Errors({ errors: errorsInPortuguese });
const repositories = Repositories({ database });

// Entidades
const entities = Entities({ errors });

// Casos de uso
const useCases = UseCases({ errors, entities, repositories });

/*
  APP
*/
function Views() {
  function addTodo(response) {
    console.log({ response });
  }

  function doTodo(response) {
    console.log({ response });
  }

  function todoError(errorMessage) {
    console.log({ errorMessage });
  }

  return Object.freeze({
    addTodo,
    doTodo,
    todoError,
  });
}

function Requests({ controllers }) {
  const readline = require("readline");

  function addTodo() {
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    reader.question("Digite o seu TODO?\n", async function (description) {
      await controllers.addTodo({ description });
      reader.close();
    });
  }

  function doTodo() {
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    reader.question("Digite o id do TODO que terminou?\n", async function (id) {
      await controllers.doTodo(id);
      reader.close();
    });
  }

  return Object.freeze({
    addTodo,
    doTodo,
  });
}

function start() {
  const views = Views();
  const presenters = Presenters({ views });
  const controllers = Controllers({ presenters, useCases });
  const requests = Requests({ controllers });

  requests.doTodo();
}

start();

```
