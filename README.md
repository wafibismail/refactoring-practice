# Refactoring Practice

Another set of exercises assigned by my Software Engineering lecturer to give us a taste of code refactoring. <br>
<br>
The exercises are based on Derek Banas's [Code Refactoring](https://www.youtube.com/playlist?list=PLGLfVvz_LVvSuz6NuHAzpM52qKM6bPlCV) YouTube Playlist.

### Language difference

Due to my personal inclination towards utilizing TypeScript in my projects, it seemed better for me to translate the Java codes to TypeScript. (which I only started from Part 4 onwards)<br>
<br>
I still follow the exact programming logic used in the Derek's demos.

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

## Bookmarks:
(Some ways of refactoring)

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

### Eliminate Large Accumulation Methods ([Part 12](https://github.com/wafibismail/refactoring-practice/blob/master/part12-collecting_parameters.ts) - in TypeScript)

Approaches taken:
- Further extract code fragments into new methods with descriptive names
- Use a **Collecting Parameter** to pass accumulated information
<br>

### Replace Conditionals with Command Pattern ([Part 13](https://github.com/wafibismail/refactoring-practice/blob/master/part13-command_pattern.ts) - in TypeScript)

Topics covered by Derek:
- Review of Command Pattern
- Show WHEN to use the Command Pattern
- Show the flexibility the Command Pattern adds
- Show how to replace conditionals with Command
- Show how to store commands in an ArrayList (regular Array in the case of TypeScript)
<br>

### Adapter Pattern ([Part 14](https://github.com/wafibismail/refactoring-practice/blob/master/part14-adapter_pattern.ts) - in TypeScript)

Advantages:
- Allows adding limitless amounts of subclasses without disturbing any code already written
- Makes it easier to swap in code at runtime
- Allows flexible use of method names, so we can choose names that make sense to us
<br>

### Replacing Primitive Types with A Class / Improve Type Safety ([Part 15](https://github.com/wafibismail/refactoring-practice/blob/master/part15-type_safety.ts) - in TypeScript)

Aim:
- Eliminate all operations on values that are not of the appropriate data type
<br>

How:
- Protect the program from bad input
- Replace a primitive data type with a class
<br>

### Using Decorator Pattern to Move Embellishments ([Part 16](https://github.com/wafibismail/refactoring-practice/blob/master/part16-decorator_pattern.ts) - in TypeScript)

Embellishment:
- means special case behaviour
<br>

About Decorator Pattern:
- Place each embellisment into its own class
  - which is a way better alternative to adding new code to older classes and complicating them, where they may have been compact and easy to understand to start with.
<br>

Bonus:
- In applying the Decorator Pattern, Interface Segregation principle can also be satisfied, i.e.
  - Use many specific interfaces rather than one general purpose interface
<br>

### Using Visitor Pattern to Add Functionality ([Part 17](https://github.com/wafibismail/refactoring-practice/blob/master/part17-visitor_pattern.ts) - in TypeScript)

When to use:
- Can be used when we want to perform a similar calculation on many objects

Involves:
- Method overloading
- Passing objects back and forth for data access
<br>

### Abstract Factory Pattern ([Part 18](https://github.com/wafibismail/refactoring-practice/blob/master/part18-abstract_factory_pattern.ts) - in TypeScript)

About:
- One of the most difficult to understand design patterns