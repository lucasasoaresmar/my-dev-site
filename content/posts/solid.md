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
  - link: liskovs-substitution
    name: Liskov's Substitution
  - link: interface-segregation
    name: Interface Segregation
  - link: dependency-inversion
    name: Dependency Inversion
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

> Você só é responsável pelas suas ações.

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

**Certo**

Para não obrigar a vaga a gritar no console, criamos alguém para fazer isso por ela:

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

> Time que está ganhando não se mexe

Entidades devem ser abertas para extensão mas fechadas para modificação.

Isso quer dizer que uma classe **deve ser extensível** sem que seja necessário modificá-la.

Por exemplo: Nós precisamos criar a descrição de uma casa para venda:

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

**Certo:**

Mas aí descobrimos que além da casa vamos precisar fazer a descrição de um carro também. O problema é que nosso código está esperando uma casa e não um carro. 

Podemos mudar nosso Logger e acrescentar uma função de logar descrição do carro, mas aí teriamos que mexer em código que já está funcionando.

A solução é deixar nosso Logger ser **extensível** a outros items:

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

<a name="liskovs-substitution"></a>

## Liskov's Substitution

> Filho de peixe, peixinho é! 🐟🐟🐟

Objetos podem ser substituitos pelas instâncias dos seus subtipos sem alterar a funcionalidade do programa.

Por exemplo: Um peixe pode nadar e comer mas o Nemo também pode falar.

**Errado:**

```javascript

class Fish {
  // Coisas de peixe
}

class Nemo extends Fish {
  talk() {
    return "Estou perdido :(";
  }
}

const nemo = new Nemo();
const fish = new Fish();

console.log(nemo.talk());
// Estou perdido :(
console.log(fish.talk());

```

```go

package main

import (
	"fmt"
)

type Fish struct {
	// Coisas de peixe
}

type Nemo struct {
	Fish
}

func (nm *Nemo) Talk() string {
	return "Estou perdido :("
}

func main() {
	fish := Fish{}
	nemo := Nemo{}

	fmt.Println(nemo.Talk())
	// Estou perdido :(
	fmt.Println(fish.Talk())
	// Erro
}

```

```csharp

using System;

namespace ls
{

  class Program
  {
    
    public class Fish
    {
      // Coisas de peixe
    }

    public class Nemo : Fish
    {
      public string Talk()
      {
        return "Estou perdido :(";
      }
    }

    static void Main(string[] args)
    {
      Fish fish = new Fish();
      Nemo nemo = new Nemo();

      Console.WriteLine(nemo.Talk());
      // Estou perdido :(
      Console.WriteLine(fish.Talk());
      // Erro
    }
  }
}

```

**Certo:**

Só que ao tentar fazer um peixe qualquer falar, teremos um erro pois a definição de falar não existe para peixe.

Poderiamos implementar "Talk" no peixe normal e retornar "", afinal não falar nada também é uma forma de falar. Mas isso seria um comportamento bem esquisito para quem estivesse lendo esse código.

A solução pode ser usar composição, ou apenas definir os comportamentos em interfaces.

```javascript

const fishThings = () => ({
  // Coisas de peixe
});

const canTalk = () => ({
  talk: () => "Estou perdido :(",
});

function Fish() {
  return Object.freeze({
    ...fishThings(),
  });
}

function Nemo() {
  return Object.freeze({
    ...fishThings(),
    ...canTalk(),
  });
}

const nemo = Nemo();
const fish = Fish();

console.log(nemo.talk());
// Estou perdido :(

```

```go

package main

import (
	"fmt"
)

type FishBehavior struct {
	// Coisas de peixe
}

type TalkBehavior struct{}

type Fish struct {
	FishBehavior
}

type Nemo struct {
	FishBehavior
	TalkBehavior
}

func (tb *TalkBehavior) Talk() string {
	return "Estou perdido :("
}

func main() {
	nemo := Nemo{}

	fmt.Println(nemo.Talk())
	// Estou perdido :(
}

```

```csharp

using System;

namespace ls
{

  class Program
  {
    interface IFish
    {
      // Coisas de peixe
    }

    interface ITalk
    {
      string Talk();
    }

    public class Fish : IFish
    {
      // Peixe implementa IFish
    }

    public class Nemo : IFish, ITalk
    {
      public string Talk()
      {
        return "Estou perdido :(";
      }
    }

    static void Main(string[] args)
    {
      Nemo nemo = new Nemo();
      Console.WriteLine(nemo.Talk());
      // Estou perdido :(
    }
  }
}

```

<a name="interface-segregation"></a>

## Interface Segregation

> Leve apenas o que precisar

Não obrigue suas entidades a terem coisas que elas não vão usar.

Por exemplo: Ao fazer um jogo, você pode criar um aventureiro base para as suas outras classes. Entre as habilidade de um aventureiro estão roubar e soltar uma bola de fogo.

**Errado:**

```javascript

function Adventurer() {
  function fireball() {
    console.log("Fireball!");
  }

  function steal() {
    console.log("Roubando!");
  }

  return Object.freeze({
    fireball,
    steal,
  });
}

const gandalf = Adventurer();
const bilbo = Adventurer();

gandalf.fireball();
// Fireball!

bilbo.steal();
// Roubando!

```

```go

package main

import (
	"fmt"
)

type Adventurer interface {
	Fireball()
	Steal()
}

type Mage struct{}

func (mg *Mage) Fireball() {
	fmt.Println("Fireball!")
}

func (mg *Mage) Steal() {
	fmt.Println("Não posso roubar")
}

type Burgler struct{}

func (bg *Burgler) Fireball() {
	fmt.Println("Não posso fazer magia")
}

func (bg *Burgler) Steal() {
	fmt.Println("Roubando!")
}

func main() {
	gandalf := Mage{}
	bilbo := Burgler{}

	gandalf.Fireball()
	// Fireball!

	bilbo.Steal()
	// Roubando!
}

```

```csharp

using System;

namespace is
{
  class Program
  {
    interface IAdventurer
    {
      void Fireball();
      void Steal();
    }

    class Mage : IAdventurer
    {
      public void Fireball()
      {
        Console.WriteLine("Fireball!");
      }
      public void Steal()
      {
        throw new NotImplementedException();
      }
    }

    class Burgler : IAdventurer
    {
      public void Fireball()
      {
        throw new NotImplementedException();
      }
      public void Steal()
      {
        Console.WriteLine("Stealing!");
      }
    }

    static void Main(string[] args)
    {
      Mage gandalf = new Mage();
      Burgler bilbo = new Burgler();

      gandalf.Fireball();
      // Fireball!

      bilbo.Steal();
      // Stealing!
    }
  }
}

```

**Certo:**

O problema é que um ladrão comum não solta bolas de fogo, e nem um mago rouba ninguém. Então basta separar essas habilidades de acordo com quem é responsável por elas.

```javascript

const canSteal = () => ({
  steal: () => console.log("Roubando!"),
});

const canFireball = () => ({
  fireball: () => console.log("Fireball"),
});

function Mage() {
  return Object.freeze({
    ...canFireball(),
  });
}

function Burgler() {
  return Object.freeze({
    ...canSteal(),
  });
}

const gandalf = Mage();
const bilbo = Burgler();

gandalf.fireball();
// Fireball!

bilbo.steal();
// Roubando!

```

```go

package main

import (
	"fmt"
)

type Sorcerer interface {
	Fireball()
}

type Stealer interface {
	Steal()
}

type Mage struct{}

type Burgler struct{}

func (mg *Mage) Fireball() {
	fmt.Println("Fireball!")
}

func (bg *Burgler) Steal() {
	fmt.Println("Roubando!")
}

func main() {
	gandalf := Mage{}
	bilbo := Burgler{}

	gandalf.Fireball()
	// Fireball!

	bilbo.Steal()
	// Roubando!
}

```

```csharp

using System;

namespace is
{
  class Program
  {
    interface IBurgler
    {
      void Steal();
    }

    interface IMage
    {
      void Fireball();
    }

    class Mage : IMage
    {
      public void Fireball()
      {
        Console.WriteLine("Fireball!");
      }
    }

    class Burgler : IBurgler
    {
      public void Steal()
      {
        Console.WriteLine("Stealing!");
      }
    }

    static void Main(string[] args)
    {
      Mage gandalf = new Mage();
      Burgler bilbo = new Burgler();

      gandalf.Fireball();
      // Fireball!

      bilbo.Steal();
      // Stealing!
    }
  }
}

```

<a name="dependency-inversion"></a>

## Dependency Inversion

> Não se defina pelo que você tem

Seus objetos devem depender de abstrações, não de casos concretos. 👻

Por exemplo: Eu quero ver quanto de dinheiro eu tenho na minha carteira.

**Errado:**

```javascript

function Wallet() {
  return Object.freeze({
    money: () => console.log("R$100,00"),
  });
}

function Person() {
  const state = {
    wallet: Wallet(),
  };

  return Object.freeze({
    checkMoney: () => state.wallet.money(),
  });
}

const me = Person();
me.checkMoney();
// R$100,00

```

```go

package main

import (
	"fmt"
)

type Wallet struct{}

type Person struct {
	Wallet *Wallet
}

func (wl *Wallet) Money() {
	fmt.Println("R$100,00")
}

func (per *Person) CheckMoney() {
	per.Wallet.Money()
}

func main() {
	me := Person{}

	me.CheckMoney()
	// R$100,00
}

```

```csharp

using System;

namespace di
{
  class Program
  {

    class Wallet
    {
      public void Money()
      {
        Console.WriteLine("R$100,00");
      }
    }

    class Person
    {
      public Wallet Wallet { get; }
      public Person()
      {
        Wallet = new Wallet();
      }

      public void CheckMoney()
      {
        Wallet.Money();
      }
    }

    static void Main(string[] args)
    {
      Person me = new Person();
      me.CheckMoney();
      // R$100,00
    }
  }
}

```

**Certo:**

Mas se eu quiser ver o quanto de dinheiro eu tenho na minha conta vou ter um problema, porque eu apenas conheço a minha carteira.

```javascript

const canKeepMoney = ({ amount }) => ({
  money: () => console.log(amount),
});

function MoneyKeeper({ amount = "R$100,00" } = {}) {
  return Object.freeze({
    ...canKeepMoney({ amount }),
  });
}

function Person({ moneyKeeper } = {}) {
  const state = {
    moneyKeeper,
  };

  return Object.freeze({
    checkMoney: () => state.moneyKeeper.money(),
    setMoneyKeeper: (moneyKeeper) => (state.moneyKeeper = moneyKeeper),
  });
}

const wallet = MoneyKeeper();
const bankAccount = MoneyKeeper({ amount: "R$300,00" });

const me = Person({ moneyKeeper: wallet });
me.checkMoney();
// R$100,00

me.setMoneyKeeper(bankAccount);
me.checkMoney();
// R$300,00

```

```go

package main

import (
	"fmt"
)

type MoneyKeeper interface {
	Money()
}

type Wallet struct{}

type BankAccount struct{}

type Person struct {
	MoneyKeeper MoneyKeeper
}

func (wl *Wallet) Money() {
	fmt.Println("R$100,00")
}

func (ba *BankAccount) Money() {
	fmt.Println("R$300,00")
}

func (per *Person) CheckMoney() {
	per.MoneyKeeper.Money()
}

func (per *Person) SetMoneyKeeper(moneyKeeper MoneyKeeper) {
	per.MoneyKeeper = moneyKeeper
}

func main() {
	wallet := Wallet{}
	bankAccount := BankAccount{}
	me := Person{&wallet}

	me.CheckMoney()
	// R$100,00

	me.SetMoneyKeeper(&bankAccount)
	me.CheckMoney()
	// R$300,00
}

```

```csharp

using System;

namespace di
{
  class Program
  {

    interface IMoneyKeeper
    {
      void Money();
    }

    class Wallet : IMoneyKeeper
    {
      public void Money()
      {
        Console.WriteLine("R$100,00");
      }
    }

    class BankAccount : IMoneyKeeper
    {
      public void Money()
      {
        Console.WriteLine("R$300,00");
      }
    }

    class Person
    {
      public IMoneyKeeper MoneyKeeper { get; set; }
      public Person(IMoneyKeeper moneyKeeper)
      {
        MoneyKeeper = moneyKeeper;
      }

      public void CheckMoney()
      {
        MoneyKeeper.Money();
      }
    }

    static void Main(string[] args)
    {
      Wallet wallet = new Wallet();
      BankAccount bankAccount = new BankAccount();

      Person me = new Person(wallet);
      me.CheckMoney();
      // R$100,00

      me.MoneyKeeper = bankAccount;
      me.CheckMoney();
      // R$300,00
    }
  }
}

```
