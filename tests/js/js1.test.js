const someSharedArray = ['foo', 'bar']

const myObj = {
  field1: someSharedArray,
  field2: someSharedArray,
  field3: someSharedArray,
}

const myObjCloned = structuredClone(myObj)

console.log(myObjCloned)
/**
{
    "field1": ["foo", "bar"],
    "field2": ["foo", "bar"],
    "field3": ["foo", "bar"],
}
**/

myObjCloned.field2[1] = 'baz'

// At this point:
// Expected: only `field2`'s value should change, because `myObjCloned` was deeply cloned.
// Actual: all fields' values change, because they all still point to `someSharedArray`

console.log(myObjCloned)
/**
{
    "field1": ["foo", "baz"],
    "field2": ["foo", "baz"],
    "field3": ["foo", "baz"],
}
**/