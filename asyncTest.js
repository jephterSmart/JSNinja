/* This combine alot of techniques - function expression, immediately invoked function expresssion (IIFE)
 *, timers - to build an async Test suit. 
 * This enables us to test our aynchronous application at runtime, this code make available
 * to us some functions - pause(), assert(),test() - which is made possible by IIFE. The code require us to 
 * have an ID(#) of results on our HTML page.
 */
(
    function() {  
        var queue = [],
         paused = false, results;       
         this.assert = function assert(value, desc) {     
            var li = document.createElement("li");         
             li.className = value ? "pass" : "fail";        
               li.appendChild(document.createTextNode(desc));
               results.appendChild(li);      
                   if (!value) {          
                         li.parentNode.parentNode.className = "fail";      
                           }        
                 return li;      
                 };  
                this.pause = function() {  
                       paused = true;       
                      };       
                this.resume = function() {
                paused = false;
                setTimeout(runTest, 1);       
                };        
               function runTest() {    
                 if (!paused && queue.length) { 
                    queue.shift()();  if (!paused) {    
                         resume();          
                         }        
                     }        
                   }     
        this.test = function test(name, fn) {  
           queue.push(function() {     
               results = document.getElementById("results");         
                results = assert(true, name).appendChild( document.createElement("ul"));      
                    fn(); 
                   }); 

                  runTest();    
                  };     
                })();//outer IIFE  

                window.onload = function() { 
                  test("Async Test #1", function() { 
                    pause();
                    setTimeout(function() {       
                    assert(true, "First test completed");           
                     resume();          }, 5000);    
                       });       
                       
                   test("Async Test #2", function() {      
                   pause();
                   setTimeout(function() {          
                   assert(true, "Second test completed");         
                  resume();          }, 10000);  
                     }); 
                      
                    };
