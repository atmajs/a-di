<p align='center'>
    <img src='assets/logo.png'/>
</p>

<p align="center">
    <a href='https://travis-ci.org/tenbits/a-di' target='_blank'>
        <img src='https://travis-ci.org/tenbits/a-di.png?branch=master' />
        </a>
    <a href='http://badge.fury.io/js/a-di' target='_blank'>
        <img src='https://badge.fury.io/js/a-di.svg' />
        </a>
    <a href='http://badge.fury.io/bo/a-di' target='_blank'>
        <img src='https://badge.fury.io/bo/a-di.svg' />
        </a>
</p>

# Yet another Dependency Injection Library for JavaScript

_Highly inspired by [Autofac.NET](https://autofac.org/)_

> We have tried to accommodate all the best DI and IoC practices for JavaScript

`const di = new Di;`

##### &#9776;

- `1` [Registration](#1-registration)
    - `1.1` [Type](#11-type)
    - `1.2` [Instance](#12-instance)
    - `1.3` [Factory](#12-factory)
- `2` [Dependency definitions](#2-dependency-defintions)
    - `2.1` [Constructor](#21-constructor)
        - `2.1.1` [External definitions](#211-external-definitions)
        - `2.1.2` [In-place meta information](#212-inplace-meta-information)
        - `2.1.3` [_Other ways_](#213-other-ways)
    - `2.2` [Properties](#22-properties)
    - `2.3` [Methods](#23-methods)
- `3` [Consume](#3-Consume)
    - `3.1` [Initialize registered components](#31-Initialize-registered-components)
    - `3.2` [Create inherited classes](#32-create-inherited-classes)
    - `3.3` [Create function delegates](#33-create function-delegates)

- `4` [Additional configuration](#4-additional-configuration)

- `5` [How do we use the library?](#5-how-do-we-use-the-library)

# `1` Registration

> The greatest challenge for DI frameworks in JavaScript is to get the list of dependencies for a constructor, method, etc. JavaScript is not statically typed, so here other ways should be found to declare the dependencies. And we also try to follow the _**1st rule**_ of any di framework - `"Your classes should not be dependent on the DI itself"`.

> Though you can use it as a **Service Locator**

When registering the component, we specify identifiers, by which the dependency is resolved. It can be some another `Type`, string identifier, `self-type`. _But we do not encourage you to use string identifiers._

It is also possible to get the instance without having previously to register the Type

```ts
const foo = di.resolve(Foo);
```

> Later you can register another Type for this one.

### `1.1` Type

A `Type` in JavaScript we call a `Class` or a `Function`, as almost any _`function`_ can be used as a constructor for an instance.


```javascript
class Foo {
    constructor (bar, qux) {}
}
// ----
di
	.registerType(Foo)
    .using(IBar, IQux)
    .as(IFoo)
	.as('foo')
    .asSelf()
	.onActivated(foo => console.log(foo));
```

### `1.2` Instance

Pass already instantiated class to the container, and it will be used by all dependents
```javascript
di.registerInstance(new Foo(di.resolve(IBar), di.resolve(IQux))).as(IFoo);

// or use Initializer wich will be called on first `IFoo` require.
di.registerInstance(IBar, IFoo, (bar, foo) => new Foo(bar, foo)).as(IFoo);

// you can even suppress the lamda here
di.registerInstance(IBar, IFoo, Foo).as(IFoo);
```

### `1.3` Factory

Register a `function` which will create the instance on demand. Is similar to instance initializer, but the factory is called every time the dependency is required.

```javascript
di.registerFactory(IBar, (bar) => {}).as(IFoo);

// No arguments are defined - we pass the di itself, for the case your factory method is out of the current di scope.
di.registerFactory(di => {}).as(IFoo);
```

---

# `2` Dependency definitions

### `2.1` Constructor

_Under `Constructor` also plain Functions are meant._

#### `2.1.1` External definitions

From the previous paragraph you have already seen `using` method, when registering the `Type`. Here we say the di library what identifiers should be used to instantiate the arguments.

> :sparkles: **Pros**: Your implementation is fully decoupled from the DI and the registration itself.

```javascript
class Foo {
    constructor (logger) { logger.log() }
}
// ----
class Bar {
    log (...args) { console.log(...args) }
}
// ---
class ILog { log () {} }
// ---
di
    .registerType(Bar)
    .as(ILog);
di
    .registerType(Foo)
    .using(ILog)
    .asSelf();
```

#### `2.1.2` In-place meta information

> :sparkles: **Pros**: Your implementation is decoupled from the DI, but holds meta information for the DI library.

Per default we read the static `$inject` property on the `Type`

```javascript
class Foo {
    constructor (logger) { logger.log() }

    static $constructor = [ ILog ]
}
Foo.$constructor = [ILog];
// ----
di
    .registerType(Foo)
    .asSelf();

```

You can override the reader and provide us with the Identifiers for injection.

```javascript
let CustomMetaReader = {
    getConstructor (Type) {
        return Type.$inject;
    }
};
di.defineMetaReader(CustomMetaReader);
// ----
class Foo {
    constructor (logger) { logger.log() }
}
Foo.$inject = [ILog];
```

#### `2.1.3` _Other ways_

Under the consideration are some other ways, like decorators from ES7, but it makes then your `class` implementation to depend on `di` library and its decorator.

💬 Do you have any ideas? Please share them via issues.

> **TypeScript**: initially, this project targets plain JavaScript, but TypeScript support will be also implemented.


### `2.2` Properties


Property injections are supported by `Type`_s_ components.

#### `2.2.1` External definitions

```javascript
class Foo {
    constructor () {
        this.logger = new DummyLogger();
    }
    doSmth () {
        this.logger.log();
    }
}
// ---
di
    .registerType(Foo)
    .properties({
        // DummyLogger will be replaced with the registration for ILog
        logger: ILog
    })
    .asSelf();
```

#### `2.2.2` In-place meta information

Per default we read the static `$properties` to get the `key: Identifier` information.

```javascript
class Foo {
    constructor () { }
}
Foo.$properties = {
    logger: ILog
};
// ----
di
    .registerType(Foo)
    .asSelf();

```

You can override the reader and provide us with the Identifiers for injection.

```javascript
let CustomMetaReader = {
    getProperties (Type) {
        // return hash with {key: Identifier}
    }
};
di.defineMetaReader(CustomMetaReader);
```

#### `2.2.3` _Other ways_

💬 Ideas about better API - please share!


----


### `2.3` Methods

Injections into `Type`_s_functions.

#### `2.3.1` External definitions

```javascript
class Foo {
    doSmth (logger) {
        logger.log();
    }
}
// ---
di
    .registerType(Foo)
    .methods({
        // The method on an instance can be the called without any arguments
        // Di will provide required dependencies to the inner function
        doSmth: [ILog]
    })
    .asSelf();
```

#### `2.3.2` In-place meta information

Per default we read the static `$methods` with `key:[Identifier, ...]` information.

```javascript
class Foo {
    doSmth (logger) { logger.log() }

    static $methods = {
        doSmth: [ ILog ]
    };
}
// ----
di
    .registerType(Foo)
    .asSelf();

```

You can override the reader and provide us with the Identifiers for injection.

```javascript
const CustomMetaReader = {
    getMethods (Type) {
        // return hash with {key: [Identifier, ...]}
    }
};
di.defineMetaReader(CustomMetaReader);
```

#### `2.3.3` _Other ways_

💬 Ideas about better API - please share!

---

# `3` Consume

### `3.1` Initialize registered components

We inject all dependencies and return ready to use component.

```javascript
let x = di.resolve(IFoo);
```

### `3.2` Create inherited classes

The inherited class accepts empty constructor, in this case we will pass the resolved components to the base class.

```javascript
let FooWrapper = di.wrapType(IFoo);
let foo = new FooWrapper();
```

### `3.3` Create function delegates

Define function argument identifiers, and you can call the function without arguments.

```javascript
let myFunction = di.wrapFunction(IFoo, IBar, (foo, bar) => {});
myFunction();
```

---

# `4` Additional configuration

### `4.1` Predefine parameter values

Sometimes it is needed to set values for parameters, which will be directly passed inside the function.

```javascript
class Foo {
    constructor (bar, shouldDoSmth)
}
di
    .registerType(Foo)
    .using(Bar)
    .withParams(null, true)
```

> 1️⃣ Passing null values says the di library to resolve values from container by declared Type

> 2️⃣ Boolean `true` from sample just shows the idea of passing values. You may want to get the value from app configuration or some other source.

### `4.2` Configurate arguments

Arguments _or values_ for a constructor/function are resolved from 3 sources:
- Declared parameter values
- Type definitions
- Direct values from the current function call.

With options `"ignore" "extend" "override"` you can control how we handle the third source. Default is `"override"`



# `5` How do we use the library?

We rarely use all of those registration and configuration features.

1. All the `Services`, `Workers`, `Handlers`, `Factories` - actually everything except `Data Models` - we use mostly as singletons. Means any initialization of an Instance we do via `di.resolve`. Note, that no configuration or registration is required - when nothing specified di initializes the class as-is.

> We do this, while a class can `memoize` initialization, data, configuration, or method calls.

```ts
import { UserService } from './UserService'
// ....
let service = di.resolve(UserService);
```

2. To have more clear dependency tree structure, we define some dependencies via constructor as default parameters:

```ts
import { UserService } from './UserService'
// ....
class Foo {
    constructor (
        private service = di.resolve(UserService)
    )
}
```


2. For multiple implementations we use abstract classes.

```ts
abstract class AFoo {
    abstract log ()
    // ... some common logic
}

// Option 1. Register the implementation as a default for the base (AFoo)
@di.for(AFoo)
class SomeFoo extends AFoo () {}

// Option 2. Without the decorator, the type could be registered later somewhere in code:
di.registerType(AFoo).for(AFoo)


//# Usage 1
class UserService {
    constructor (
        foo = di.resolve(AFoo)
    ) {}
}

//# Usage 2
class UserService {
    constructor (
        @di.inject(AFoo) foo: AFoo
    ){}
}
```


🏁

----
©️ MIT — 2021 Atma.js Project
