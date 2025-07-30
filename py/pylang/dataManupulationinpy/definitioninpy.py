# 🎯 Unlimited args in python definition
# **kargs lets us pass unlimited named argument and then converts all the passed arguments into a dictionary: - kargs = {key: value}
def greet_user(**kwargs):
    print(kwargs)

greet_user(name="Karan", age=22) # Output: {'name': 'Karan', 'age': 22} the name of the dictionary is kwargs(whatever we name it in the function parameter)

# *args lets us pass unlimited positional arguments and then converts all the passed arguments into a tuple: - args = (value1, value2, value3)
def add_numbers(*args):
    total = 0
    for num in args:
        total += num
    return total