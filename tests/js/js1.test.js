const a = {};              // 'a' is an empty object
const b = { name: 'tilak' }; // 'b' is an object
const c = { name: 'ram' };   // 'c' is also an object

// Using objects 'b' and 'c' as keys in object 'a'
// Note: When using objects as keys, they are converted to strings, which results in '[object Object]' for both 'b' and 'c'. that's why the last one [object Object] will overwrite the first one.
a[b] = { name: 'ankit' };    // using object 'b' as key
a[c] = { name: 'rahul' };    // using object 'c' as key

//output
console.log(a);