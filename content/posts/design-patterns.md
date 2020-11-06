---
title: "Design Patterns/ Padrões de Código"
description: "Códigos inteligentes para pessoas preguiçosas"
tags:
  - Javascript
  - Golang
  - Csharp
langs:
  - javascript
  - go
  - csharp
sections:
  - link: strategy
    name: Strategy   
  - link: decorator
    name: Decorator
---

```javascript

console.log("Usando Javascript!");

```

```go

fmt.Println("Com Go S2");

```

```csharp

Console.WriteLine("Csharpê!");

```

Você pode resolver o problema do zero, mas se alguém já fez pra que se dar ao trabalho né :)

### Strategy <a name="strategy"></a>

Usamos sempre que uma entidade variar de comportamento de acordo com um contexto 🤨. 

Por exemplo: Precisamos de um gato que ataque com as patas, mas também precisamos de um gato robo que solte lasers pelos olhos (são 2 **contextos** de gato diferentes).

Ao invés de criarmos 2 gatos diferentes, criamos dois ataques diferentes e mudamos a **estratégia** de ataque do nosso gato de acordo com o que queremos.

```javascript

const canAttackNormally = (state) => ({
  attack: () => console.log(`${state.name} atacou!`),
});

const canAttackLaserly = (state) => ({
  attack: () => console.log(`${state.name} soltou lasers pelos olhos!`),
});

function Cat({ name, attackBehavior }) {
  const state = {
    name,
  };

  return {
    state,
    ...attackBehavior(state),
  };
}

const normalCat = Cat({ name: "Bichano", attackBehavior: canAttackNormally });
const terminatorCat = Cat({
  name: "T-1000-Bichano",
  attackBehavior: canAttackLaserly,
});

normalCat.attack();
// Bichano atacou!

terminatorCat.attack();
// T-1000-Bichano soltou lasers pelos olhos!

```

```go

package main

import (
	"fmt"
)

type attackBehavior interface {
	attack(name string)
}

type normalAttack struct{}

type laserAttack struct{}

type cat struct {
	name           string
	attackBehavior attackBehavior
}

func (na *normalAttack) attack(name string) {
	fmt.Printf("%s atacou!\n", name)
}

func (la *laserAttack) attack(name string) {
	fmt.Printf("%s soltou lasers pelos olhos!\n", name)
}

func (c *cat) attack() {
	c.attackBehavior.attack(c.name)
}

func newCat(name string, attack attackBehavior) *cat {
	return &cat{name, attack}
}

func main() {
	normalCat := newCat("Bichano", &normalAttack{})
	terminatorCat := newCat("T-1000-Bichano", &laserAttack{})

	normalCat.attack()
	// Bichano atacou!

	terminatorCat.attack()
	// T-1000-Bichano soltou lasers pelos olhos!
}

```

```csharp

using System;

namespace strategy
{

  interface IAttackBehavior
  {
    void Attack(string name);
  }

  class NormalAttack : IAttackBehavior
  {
    public void Attack(string name)
    {
      Console.WriteLine($"{name} atacou!");
    }
  }

  class LaserAttack : IAttackBehavior
  {
    public void Attack(string name)
    {
      Console.WriteLine($"{name} soltou lasers pelos olhos!");
    }
  }


  class Cat
  {
    public string Name { get; private set; }
    private IAttackBehavior AttackBehavior;
    public Cat(string name, IAttackBehavior attackBehavior)
    {
      Name = name;
      AttackBehavior = attackBehavior;
    }

    public void Attack()
    {
      AttackBehavior.Attack(Name);
    }
  }


  class Program
  {
    static void Main(string[] args)
    {
      NormalAttack normalAttack = new NormalAttack();
      LaserAttack laserAttack = new LaserAttack();

      Cat normalCat = new Cat("Bichano", normalAttack);
      Cat terminatorCat = new Cat("T-1000-Bichano", laserAttack);

      normalCat.Attack();
      // Bichano atacou!

      terminatorCat.Attack();
      // T-1000-Bichano soltou lasers pelos olhos!
    }
  }
}


```

### Decorator <a name='decorator'></a>

Serve para modificar comportamentos em um objeto, alterando suas funcionalidades (interface permanece a mesma).

Por exemplo: Temos uma pizza de muzzarela bem simples, mas queremos uma pizza de calabresa! Não precisamos criar uma pizza com linguiça e jogar a de muzzarela fora, basta **decorar** nossa pizza com linguiças.

```javascript

function makePizza({
  cost = 23.0,
  ingredients = ["dough", "cheese", "tomato sauce"],
} = {}) {
  return Object.freeze({
    getCost: () => cost,
    getIngredients: () => ingredients,
  });
}

function withSausage(pizza) {
  return Object.freeze({
    getCost: () => pizza.getCost() + 5,
    getIngredients: () => [...pizza.getIngredients(), "sausage"],
  });
}

const pizza = makePizza();
console.log(pizza.getCost(), pizza.getIngredients());
// 23 [ 'dough', 'cheese', 'tomato sauce' ]

const pizzaWithSausage = withSausage(pizza);
console.log(pizzaWithSausage.getCost(), pizzaWithSausage.getIngredients());
// 28 [ 'dough', 'cheese', 'tomato sauce', 'sausage' ]

```

```go

package main

import (
	"fmt"
)

type Pizza struct {
	cost        float32
	ingredients []string
}

type PizzaWithSausage struct {
	pizza *Pizza
}

func (pz *Pizza) Cost() float32 {
	return pz.cost
}

func (pz *Pizza) Ingredients() []string {
	return pz.ingredients
}

func (pws *PizzaWithSausage) Cost() float32 {
	return pws.pizza.Cost() + 5
}

func (pws *PizzaWithSausage) Ingredients() []string {
	return append(pws.pizza.Ingredients(), []string{"sausage"}...)
}

func main() {
	pizza := Pizza{23.00, []string{"dough", "cheese", "tomato sauce"}}
	fmt.Println(pizza.Cost(), pizza.Ingredients())
	// 23 [dough cheese tomato sauce]

	pizzaWithSausage := PizzaWithSausage{&pizza}
	fmt.Println(pizzaWithSausage.Cost(), pizzaWithSausage.Ingredients())
	// 28 [dough cheese tomato sauce sausage]
}

```

```csharp

using System;
using System.Collections.Generic;

namespace decorator
{
  interface IPizza
  {
    double Cost { get; }
    List<string> Ingredients { get; }
  }

  class Pizza : IPizza
  {
    public double Cost { get; }
    public List<string> Ingredients { get; }
    public Pizza(double cost, List<string> ingredients)
    {
      Cost = cost;
      Ingredients = ingredients;
    }
  }

  class PizzaWithSausage : IPizza
  {
    public double Cost { get; }
    public List<string> Ingredients { get; }
    IPizza Pizza;
    public PizzaWithSausage(IPizza pizza)
    {
      Pizza = pizza;
      Cost = pizza.Cost + 5;
      Ingredients = pizza.Ingredients;
      Ingredients.Add("sausage");
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
      List<string> ingredients = new List<string> { "dough", "muzzarela", "tomato sauce" };

      Pizza pizza = new Pizza(23.00, ingredients);
      Console.Write("{0} ", pizza.Cost);
      pizza.Ingredients.ForEach(i => Console.Write("{0} ", i));
      // 23 dough muzzarela tomato sauce

      Console.WriteLine();

      IPizza pizzaWithSausage = new PizzaWithSausage(pizza);
      Console.Write("{0} ", pizzaWithSausage.Cost);
      pizzaWithSausage.Ingredients.ForEach(i => Console.Write("{0} ", i));
      // 28 dough muzzarela tomato sauce sausage
    }
  }
}

```

Ahhh... é bem comum decorar funções com funções de ordem superior:

```javascript

const double = (func) => (x) => func(2 * x);
const add5 = (func) => (x) => func(x + 5);
const identity = (x) => x;

const add5AndDouble = add5(double(identity));
const doubleAndAdd5 = double(add5(identity));

console.log(add5AndDouble(3), doubleAndAdd5(3));
//16 11

```

```go

package main

import (
	"fmt"
)

type operation func(int) int

func double(op operation) operation {
	return func(x int) int {
		return op(2 * x)
	}
}

func add5(op operation) operation {
	return func(x int) int {
		return op(x + 5)
	}
}

func identity(x int) int {
	return x
}

func main() {
	add5AndDouble := add5(double(identity))
	doubleAndAdd5 := double(add5(identity))

	fmt.Println(add5AndDouble(3), doubleAndAdd5(3))
	//16 11
}

```

```csharp

using System;

namespace decorator
{
  using Operation = Func<int, int>;

  class Program
  {
    static void Main(string[] args)
    {
      Operation Add5(Operation op)
      {
        Operation w = x => op(x + 5);
        return w;
      }

      Operation Double(Operation op)
      {
        Operation w = x => op(2 * x);
        return w;
      }

      Operation identity = x => x;
      Operation add5AndDouble = Add5(Double(identity));
      Operation doubleAndAdd5 = Double(Add5(identity));

      Console.WriteLine(add5AndDouble(3));
      // 16
      Console.WriteLine(doubleAndAdd5(3));
      // 11
    }
  }
}

```