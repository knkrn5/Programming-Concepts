#  we cannot use dot notation with regular Python dictionaries like you can in JavaScript.


#🎯 dict.items(): - similar to object.entries() in js
dict1 = {"name": "Karan", "age": 24}

for key in dict1:
    print("Key:", key) # → Key: name, Key: age
    print("Value:", dict1[key]) # → Value: Karan, Value: 24

for key, value in dict1.items():
    print("Key:", key) # → Key: name, Key: age
    print("Value:", value) # → Value: Karan, Value: 24
