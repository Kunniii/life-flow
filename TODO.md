# Todo

That is too bad, the code now is

```py
if "condition is true" "do this"
```

But i actually need this

```py
if "condition is true" "do this"
else "do that"
```

By this, the code will be more informative and more flexible.

So, a pair of `if - else` will be one task. Then how should it flow?

E.g

```py
if "the installation is completed" "continue to install the services"
else "wait for the installation and find more information about installing the service"

if "the deadline of NWC is close" "do the NWC ASAP"
else "do NWC but search for more information about that problem"
```

For example, if the case 1 satisfied the condition, i will continue to install the services on the server.

If it is not, I will do the else statement. After that, go back to check if the condition is satisfied...

But this could also create a lot of edge cases.

What if the else statement is point to the next if statement?

And, how about nested if else if else condition which will depend on the previous condition?

Anyway, i will investigate on this later. Let's find a way to use the system with this limitation.
