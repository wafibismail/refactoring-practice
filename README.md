# Refactoring Practice

Another set of exercises assigned by my Software Engineering lecturer to give us a taste of code refactoring. <br>
<br>
The exercises are based on Derek Banas's [Code Refactoring](https://www.youtube.com/playlist?list=PLGLfVvz_LVvSuz6NuHAzpM52qKM6bPlCV) YouTube Playlist.

### Language difference

Java was used in Derek's codes but I try to implement them in TypeScript as well.

## Bad smells:

Meaning signs that code needs refactoring:
- Duplicated Code
- Long Method
- Complex Conditional Statements
- Primitive Obsession
- Indecent Exposure
- Solution Sprawl
- Alternative Classes with Different Interfaces
- Lazy Classes
- Large Classes
- Switch Statements
- Combinatorial Explosions
- Oddball Solutions

## Some Ways of Refactoring:

### Creation Methods or Chaining Constructors ([Part 1](https://github.com/wafibismail/refactoring-practice/blob/master/part01-creation_method_or_chain_constructors.md) - in Java/md)

- a) Replace Constructors with Creation Methods
- b) Avoid Duplication with Chain Constructors
<br>

### Extracting Methods ([Part 2](https://github.com/wafibismail/refactoring-practice/blob/master/part02-extract_methods.md) - in Java/md)

Points:
- Turn code fragments into methods with descriptive names
- Make code as readable as comments
<br>

### Explaining Variables ([Part 3](https://github.com/wafibismail/refactoring-practice/blob/master/part03-explaining_variables.md) - in Java/md)

Points:
- To be used when method extraction is not an option
- Extract code segments into variables with descriptive names
- Can be performed on conditional statements; makes the code more understandable
- Also applicable to complex calculations, which in doing so shortens and further clarifies the code
<br>

### Extracting Fields & Methods Into New Classes ([Part 4](https://github.com/wafibismail/refactoring-practice/blob/master/part04-extract_to_classes.ts) - in TypeScript)

Why:
- Having too many instance variables, getters, setters, and a constructor = class that is too big
- Some of the information (fields & methods) can be extracted into new classes.
<br>

How:
- Look for pieces of information that fit together to be extracted into the same containing class. 
<br>

Bonus:
- In some cases, breaking down primitive variables e.g. BirthDay of initial type string into separate numerical components can bring better utilization capabilities.
- methods similar to toString() to shorten sequence of accessor method calls that are expected to be commonly used.
<br>

### Replacing Constructors with Factory Methods ([Part 5](https://github.com/wafibismail/refactoring-practice/blob/master/part05-factory_method.ts) - in TypeScript)

Bonus:
- "Singleton Pattern"
<br>

### Simplifying Conditionals & Replacing Their Implementation With Polymorphism ([Part 6](https://github.com/wafibismail/refactoring-practice/blob/master/part06-conditionals_and_polymorphism.ts) - in TypeScript)

Bonus:
- Guard Clause - to be used when not all conditions in if-else statements are as likely to occur compared to one another.
<br>

### Replacing Conditionals with Strategy Pattern ([Part 7](https://github.com/wafibismail/refactoring-practice/blob/master/part07-strategy_pattern.ts) - in TypeScript)

Bonus:
- Further clarification on using Guard Clause
<br>

### Implementing Template Pattern to Eliminate Duplicate Code ([Part 8](https://github.com/wafibismail/refactoring-practice/blob/master/part08-template_method.ts) - in TypeScript)
<br>

### Replacing Implied Primitive Trees with Composite Pattern ([Part 9](https://github.com/wafibismail/refactoring-practice/blob/master/part09-composite_pattern.ts) - in TypeScript)
<br>

### Builder Design Pattern ([Part 10](https://github.com/wafibismail/refactoring-practice/blob/master/part10-builder_pattern.ts) - in TypeScript)

Brief:
- The Builder Pattern allows building complex objects in a series of steps
  - Define an object class of a specific type (e.g. Sandwich).
  - Create an abstract class that contains all the methods that each class of type Sandwich must implement.
  - A Director then initializes the specified Sandwich type and provides it.
<br>

### Building Composites Using Builder Pattern ([Part 11](https://github.com/wafibismail/refactoring-practice/blob/master/part11-composite_from_builder_pattern.ts) - in TypeScript)

Note:
- Good to understand this part well. Might not be taught in common textbooks.
<br>

### To be continued ([Part 12](https://github.com/wafibismail/refactoring-practice/blob/master/part12.ts) - in TypeScript)

https://youtu.be/jTQEb96XPSE