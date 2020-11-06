---
title: "S.O.L.I.D."
description: "Príncipios para ser um desenvolvedor sólido"
tags:
  - Javascript
  - Golang
  - Csharp
langs:
  - javascript
  - go
  - csharp
sections:
  - link: single-responsability
    name: Single Responsability
  - link: open-closed
    name: Open Closed
---

```javascript

console.log("I'm SOLID!");

```

```go

fmt.Println("Going SOLID!");

```

```csharp

Console.WriteLine("Csharp is rock SOLID!");

```

<a name="single-responsability"></a>

## Single Responsability

Uma classe deve fazer apenas uma coisa e ter apenas uma razão para mudar. É só isso mesmo.

Por exemplo: Temos uma vaca 🐄 que diz "Muuuuuu". Essa vaca não tem obrigação de saber onde queremos que esse "Muuuuuu" apareça, pois isso não é responsabilidade dela.

**Errado:**
```javascript

function Cow() {
  return Object.freeze({
    say: () => console.log("Muuuuuuuu"),
  });
}

const mimosa = Cow();
mimosa.say();
// Muuuuuuuu

```

```go

package main

import (
	"fmt"
)

type Cow struct{}

func (cw *Cow) Say() {
	fmt.Println("Muuuuuuuu")
}

func main() {
	mimosa := Cow{}
	mimosa.Say()
	// Muuuuuuuu
}

```

```csharp

using System;

namespace srp
{

  class Cow
  {
     public void Say()
     {
       Console.WriteLine("Muuuuuu");
     }
  }
  

  class Program
  {
    static void Main(string[] args)
    {
      Cow mimosa = new Cow();
      mimosa.Say();
    }
  }
}

```

**Certo:**
```javascript

function Cow() {
  return Object.freeze({
    say: () => "Muuuuuuuu",
  });
}

function Logger() {
  return Object.freeze({
    log: (value) => console.log(value),
  });
}

const mimosa = Cow();
const logger = Logger();

logger.log(mimosa.say());
// Muuuuuuuu

```

```go

package main

import (
	"fmt"
)

type Cow struct{}

type Logger struct{}

func (cw *Cow) Say() string {
	return "Muuuuuuuu"
}

func (lg *Logger) Log(data interface{}) {
	fmt.Println(data)
}

func main() {
	mimosa := Cow{}
	logger := Logger{}

	logger.Log(mimosa.Say())
	// Muuuuuuuu
}

```

```csharp

using System;

namespace srp
{

  class Cow
  {
     public string Say()
     {
       return "Muuuuuu";
     }
  }

  class Logger
  {
    public void Log(string data)
    {
      Console.WriteLine(data);
    }
  }
  

  class Program
  {
    static void Main(string[] args)
    {
      Cow mimosa = new Cow();
      Logger logger = new Logger();

      logger.Log(mimosa.Say());
      // Muuuuuu
    }
  }
}

```

<a name="open-closed"></a>

## Open Closed

Entidades devem ser abertas para extensão mas fechadas para modificação.

Isso quer dizer que uma classe **deve ser extensível** sem que seja necessário modificá-la.

Por Exemplo: Nós precisamos criar a descrição de uma casa para venda:

**Errado:**

```javascript

function House({ numberOfRooms = 0 } = {}) {
  return Object.freeze({
    getNumberOfRooms: () => numberOfRooms,
  });
}

function Logger() {
  return Object.freeze({
    log: (house) =>
      console.log(`Essa casa tem ${house.getNumberOfRooms()} cômodos.`),
  });
}

const house = House({ numberOfRooms: 5 });
const logger = Logger();

logger.log(house);
// Essa casa tem 5 cômodos.

```

```go

package main

import (
	"fmt"
)

type House struct {
	NumberOfRooms int
}

type Logger struct{}

func (hs *House) Description() string {
	return fmt.Sprintf("Essa casa tem %d cômodos.", hs.NumberOfRooms)
}

func (lg *Logger) Log(house House) {
	fmt.Println(house.Description())
}

func main() {
	logger := Logger{}
	house := House{5}

	logger.Log(house)
}

```

```csharp

using System;

namespace ocp
{

  class House
  {
    public int NumberOfRooms { get; private set; }
    public House(int numberOfRooms)
    {
      NumberOfRooms = numberOfRooms;
    }

    public string Description()
    {
      return $"Essa casa tem {NumberOfRooms} cômodos.";
    }
  }

  class Logger
  {
    public void Log(House house)
    {
      Console.WriteLine(house.Description());
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
      Logger logger = new Logger();
      House house = new House(3);

      logger.Log(house);
    }
  }
}

```

Mas aí descobrimos que além da casa vamos precisar fazer a descrição de um carro também. O problema é que nosso código está esperando uma casa e não um carro. 

Podemos mudar nosso Logger e acrescentar uma função de logar descrição do carro, mas aí teriamos que mexer em código que já está funcionando.

A solução é deixar nosso Logger ser **extensível** a outros items:

**Certo:**

```javascript

function House({ numberOfRooms = 0 } = {}) {
  return Object.freeze({
    description: () => `Essa casa tem ${numberOfRooms} cômodos.`,
  });
}

function Car() {
  return Object.freeze({
    description: () => `Essa carro é maravilhoso.`,
  });
}

function Logger() {
  return Object.freeze({
    log: (saleable) => console.log(saleable.description()),
  });
}

const house = House({ numberOfRooms: 5 });
const car = Car();
const logger = Logger();

logger.log(house);
// Essa casa tem 5 cômodos.

logger.log(car);
// Essa carro é maravilhoso.

```

```go

package main

import (
	"fmt"
)

type Saleable interface {
	Description() string
}

type House struct {
	NumberOfRooms int
}

type Car struct{}

type Logger struct{}

func (hs *House) Description() string {
	return fmt.Sprintf("Essa casa tem %d cômodos.", hs.NumberOfRooms)
}

func (car *Car) Description() string {
	return fmt.Sprintf("Esse carro é maravilhoso.")
}

func (lg *Logger) Log(saleable Saleable) {
	fmt.Println(saleable.Description())
}

func main() {
	logger := Logger{}
	house := House{5}
	car := Car{}

	logger.Log(&house)
	logger.Log(&car)
}

```

```csharp

using System;

namespace ocp
{

  interface ISaleable
  {
    string Description();
  }

  class House : ISaleable
  {
    public int NumberOfRooms { get; private set; }
    public House(int numberOfRooms)
    {
      NumberOfRooms = numberOfRooms;
    }

    public string Description()
    {
      return $"Essa casa tem {NumberOfRooms} cômodos.";
    }
  }

  class Car : ISaleable
  {
    public string Description()
    {
      return "Esse carro é maravilhoso";
    }
  }

  class Logger
  {
    public void Log(ISaleable saleable)
    {
      Console.WriteLine(saleable.Description());
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
      Logger logger = new Logger();
      House house = new House(3);
      Car car = new Car();

      logger.Log(house);
      logger.Log(car);
    }
  }
}

```