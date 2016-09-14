`var di = new Di;`

1. Classes

```
class Foo { 
    constructor (bar, qux) {}
}
di
	.registerType(Foo)
    .using(IBar, IQux)
	.as(IFoo)
	.as('foo')
	.onActivated(foo => console.log(foo));
```

2. Instances
```
di.registerInstance(new Foo).as(IFoo);
```

3. Factories

```
di.registerFactory(IBar, (bar) => {}).as(IFoo);
```


#### Consume container

_Create a wrapper fn with auto injected dependencies_

```
var fn = di.createMethod(IFoo, function Test (foo) {
	
});
fn ();

```