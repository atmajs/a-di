# Yet another Dependency Injection Library for JavaScript

_Highly inspired by [Autofac](https://autofac.org/)_

> We have tried to accommodate all the best DI and IoC  practices for JavaScript

`var di = new Di;`

##### &#9776;

- `1` [Registration](#1-registration)
    - `1.1` [Type](#11-type)
    - `1.2` [Instance](#12-instance)
    - `1.3` [Factory](#12-factory)
- `2` [Dependency definitions](#2-dependency-defintions)
    - `2.1` [Constructor](#21-constructor)
        - `2.1.1` [`DiEntry::using`](#211-dientry-using)
        - `2.1.2` [Meta info reader](#212-meta-info-reader)
        - `2.1.3` [_Other ways_](#213-other-ways)
    - `2.2` [Properties](#22-properties)
    - `2.3` [Methods](#23-methods)
- `3` [Consume](#3-Consume)
    - `3.1` [Initialize registered components](#31-Initialize-registered-components)
    - `3.2` [Create inherited classes](#32-create-inherited-classes)
    - `3.3` [Create function delegates](#33-create function delegates)


# `1` Registration

> The greates challenge for DI frameworks in JavaScript is to get the list of dependencies for a constructor, method, etc. JavaScript is not statically typed, so here other ways should be found to declare the dependencies. And we also try to follow the _**1st rule**_ of any di framework - `"Your classes should not be dependent on the DI itself"`.

When registering the component, we specify identifiers, by which the dependency is resolved. It can be some another `Type`, string identifier, `self-type`. _But we do not encourage you to use string identifiers._

### `1.1` Type

A `Type` in JavaScript we call a `Class` or a `Function`, as almost any _`function`_ can be used as a contructor for an instance. 


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

# `2` Dependency defintions

### `2.1` Constructor

_Under `Constructor` also plain Functions are meant._

#### `2.1.1` `DiEntry::using`

From the previous paragraph you have already seen the `using` method, when registering the `Type`. Here we say the library what are the identifiers for the arguments of the component.


> **Pros**: Your implementation is fully decoupled from the DI and the registration.

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

#### `2.1.2` Meta Info reader

> **Pros**: Your implementation is decoupled from the DI, but holds meta information for the DI library.

Per default we read the static `$inject` property on the `Type`

```javascript
class Foo {
    constructor (logger) { logger.log() }
}
Foo.$constructor = [ILog];
// ----
di
    .registerType(Foo)
    .asSelf();

```

You can override the reader and provide us with the Identifiers for injection.

```javascript
var CustomMetaReader = {
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

Under the considiration are some other ways, like decorators from ES7, but it makes then your `class` implementation to depend from `di` library and its decorator. 

:bulb: Do you have any ideas? Please share them via issues.

> **TypeScript**: initially, this project targets plain JavaScript, but TypeScript support will be also implemented.


### `2.2` Properties


Property injections are supported by `Type`_s_ components.

#### `2.2.1` `DiEntry::using`

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

#### `2.2.2` Property meta info reader

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
var CustomMetaReader = {
    getProperties (Type) {
        // return hash with {key: Identifier}
    }
};
di.defineMetaReader(CustomMetaReader);
```

#### `2.2.3` _Other ways_

:bulb: Ideas about better API - please share!


----


### `2.3` Methods

Injections into `Type`_s_functions.

#### `2.3.1` `DiEntry::using`

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
        // DummyLogger will be replaced with the registration for ILog
        logger: [ILog]
    })
    .asSelf();
```

#### `2.3.2` Method meta info reader

Per default we read the static `$methods` with `key:[Identifier, ...]` information.

```javascript
class Foo {
    doSmth (logger) { logger.log() }
}
Foo.$methods = {
    doSmth: [ILog]
};
// ----
di
    .registerType(Foo)
    .asSelf();

```

You can override the reader and provide us with the Identifiers for injection.

```javascript
var CustomMetaReader = {
    getMethods (Type) {
        // return hash with {key: [Identifier, ...]}
    }
};
di.defineMetaReader(CustomMetaReader);
```

#### `2.3.3` _Other ways_

:bulb: Ideas about better API - please share!

---

# `3` Consume

### `3.1` Initialize registered components

We inject all dependencies and return ready to use component.

```javascript
var x = di.resolve(IFoo);
```

### `3.2` Create inherited classes

The inherited class accepts empty constructor, in this case we will pass the resolved components to the base class.

```javascript
var FooWrapper = di.wrapType(IFoo);
var foo = new FooWrapper();
```

### `3.3` Create function delegates

Define function argument identifiers, and you can call the function without arguments.

```javascript
var myFunction = di.wrapFunction(IFoo, IBar, (foo, bar) => {});
myFunction();
```


:checkered_flag:

----
:copyright: MIT - 2016 Atma.js Project