/* We used this function to explore the power of closures.
* What this function help us do is that it help us with overloading 
* our function based on the number of arguments passed in at runtime 
* after adding the neccessary overloaded function using this method.
* It is a concise code, but takes brain power to understand.
*/

function addMethod(obj,name,fn){
    var old = obj[name];
    obj[name] =function(){
        if(fn.length === arguments.length){
           return fn.apply(this,arguments);
        }
        else if(typeof fn == 'function'){
            return old.apply(this,arguments);
        }
    }
}