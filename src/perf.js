"use strict";

var items = [];
var map = new Map();
var i = 100;
while(--i > -1) {
	var element = { child: {} };
	items.push(element);
	map.set(element.child, element);
}

var anchor = items[99].child;
function mapGet() {
	return map.get(anchor)
}
function arrayGet() {
	var arr = items,
		imax = arr.length,
		i = -1, _x = anchor;
	while(++i < imax) {
		if (arr[i].child === _x) return arr[i];
	}
	throw Error('Not found');
}

let looper = (callback) => {
  let n = 200000;
  while (n > 0) {
    callback(n);
    n--;
  }
}

let timer = (log, callback) => {
  let start = Date.now();
  callback()
  console.log(log, Date.now() - start);
}


timer('Map int key get took: ', () => looper(mapGet));
timer('Array int key get took: ', () => looper(arrayGet));
