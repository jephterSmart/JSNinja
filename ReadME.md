# Working with Advance JavaScript Concept
In this directory, i used alot of advance concept in JS to build the test tools use for debugging website. They are powerful piece of code. They are very short, i.e., few lines of code, but yet powerful. Concept that was explored are:
1. Of Course Closures - this concept is made available by the JavaScript language itself.
Here we see how the Function constructor function does not create closure but **eval** function does create and every other static function.
2. The global Execution Context - This is grandpa, on which every function has closure on.
3. Understanding prototype chain - This guy is only accessed when a property is not found in the object, currently been worked on. So we can add properties to it and since it is *attached* at runtime, it will serve any purpose.
4. In extension to prototype chain is the ability to extend the prototype of native object contructors. This allows to generate the **bind** method for browsers that don't have that feature built in.
5. A perfect understanding of the scope Chain, how to control the ubiquitos ***this*** keyword - this is my favorite, i am no longer afraid of any JS code base.
## Recommendations
1. Learn to understand, don't immitate.
2. The Secret of JavaScript Ninja - This guy did an awesome work using the different concept to produce finish product. The code in this repository are from this book.

## What to get
 The **addMethod.js** file contains some really short but weird code, that utilize all the concept i describe above. If you can understand that code, then you can beat your chest that you are a JS ninja. This method allows us to do method overloading, i.e, the same method with different number of arguments. It took me days to get it clearly, and that is what resolved my ideas on closure. 
## Thank You For reading