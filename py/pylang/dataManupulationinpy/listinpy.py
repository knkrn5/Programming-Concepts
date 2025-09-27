


# 🎯=======LIST DATA MANIPULATION IN PY=======================
# 👉 In PY we can only manipulate the list data using index anotation.
# ===== adding element in list in py=========================
my_list = [10, 20, 30]

my_list.insert(1, 15)  # Insert 15 at index 1
my_list.extend([25, 35])  # Add multiple elements at the end of the list
my_list.append(40)  # Add 40 to the end of the list
my_list.remove(20)  # Remove the first occurrence of 20 from the list
my_list.remove(20)  # Remove the first occurrence of 20 from the list
popped = my_list.pop()  # Remove and return the last element (or element at a specific index if provided)
my_list.clear()  # Remove all elements from the list
my_list.reverse()  # Reverse the order of elements in the list
my_list.sort()  # Sort the list in ascending order
my_list.sort(reverse=True)  # Descending