welcome = 'Hello World'

# Instand use {} he uses : to indicate a function or conditional case.
if (welcome) :
    print('Hello World is working')
else :
    print('Hello World is not working')


# Using for
thislist = ['apple', 'banana', 'cherry']
for x in thislist:
    print(x)

# This apple is in the list
thislist = ['apple', 'banana', 'cherry']
if "apple" in thislist:
    print("apple is in the list")

# How many items are in the list
thislist = ['apple', 'banana', 'cherry']
print('Are', len(thislist), 'items in the list')

# Copy a list
thislist = ['apple', 'banana', 'cherry']
newlist = thislist.copy() # Or list(thislist)