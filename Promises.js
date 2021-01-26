/* This is how i think promises are implemented
* tell me if i am wrong
*/

function Promises(funcToWork){
    let self = this;
    this._state = 'pending';
    this._resolveQueue = [];
    this._rejectedQueue = [];
    this._value = undefined;
    this._reason = undefined;
    if(typeof funcToWork === 'function')
    funcToWork(this._resolve.bind(self) //i.e produce a function that look similar to this one
    // but the 'this' keyword inside the new function should be the instance object
    ,this._reject.bind(self)// Do similar thing here too.
    )
}
Promises.prototype._runResolver = function(){
    while(this._resolveQueue.length > 0){
        let returnObj = this._resolveQueue.shift();
        /* we have proObj as promise if in our invocation of the handler
         * onSucceed function on a later time, the onSucceed function returns a Promise object.
         * If it return a promise object call its then method immediately add the function to 
         * the queue of this new proObj we have and return another "new Promises" object.
         * ("GOTO // comments below TO MAKE SENSE of it.")
         * When function in the queue is going to run on a later time, -- This later time
         * is determined by when the proObj resolve() method is going to be called --  it will look at
         * what was return from the last then() call which is kept in the queue. 
         * and call the "new Promises" object resolve() method. 
        */
        let returnedFromInvocation = returnObj.handler(this._value);
        if(returnedFromInvocation && returnedFromInvocation instanceof Promises){
            //This then() method will be called by the resolve() method
            //of the proObj that was 'returned from the call of the last onSucceed invocation' by 
            // the resolve function of the first Promises object, i.e., returnObj.handler() invocation.
            //So therefore, after calling the then() method, the "new Promises" object that was
            //returned from the first Promises object then() method is resolved on, i.e., myPromise.
            returnedFromInvocation.then(function(v){
                //The promise prop is thesame myPromise object that was returned from the then() method
                // of the first Promises object. Therefore, the resolve() method will run the nested then()
                //method argument. i.e., what was chained to the first Promises then method.
                returnObj.promise._resolve(v);
            })
        }
        //this block handles the case when what we returned from our invocation of onSucceed is not
        // a Promises obj.
        else{
            //just call the chained then() method resolve, and pass in the non-promise object
            // which may be a primitive type or an object.
            //This then again call the onSucceed argument of the chained then() method., i.e without
            // wasting time. 
            returnObj.promise._resolve(returnedFromInvocation)
        }
    }
}
Promises.prototype._resolve = function(value){
    if(this._state === 'pending'){
        this._state = 'resolved';
        this._value = value; 
        this._runResolver();  
    }

}
Promises.prototype._runRejecter = function(){
    while(this._rejectedQueue.length > 0){
        let returnObj = this._resolveQueue.shift();
        let returnedFromInvocation = returnObj.handler(this._reason);
        if(returnedFromInvocation && returnedFromInvocation instanceof Promises){
            returnedFromInvocation.then(function(v){
                returnObj.promise._resolve(v);
            })
        }
        else{
            returnObj.promise._resolve(returnedFromInvocation)       
        }
    }
}
Promises.prototype._reject = function(reason){
    if(this._state ==='pending'){
        this._state = 'rejected';
        this._reason = reason;
        this._runRejecter()
    }
}
Promises.prototype.then = function(onSucceed, onFail){
    let myPromise = new Promises();
    
        this._resolveQueue.push({
            handler:onSucceed,
            promise: myPromise
        })
        if(this._state === 'resolved'){
        this._runResolver();
        }
        return myPromise;
    
}
Promises.prototype.catch = function(onFail){
    let myPromise = new Promises();
    this._rejectedQueue.push({
        handler:onFail,
        promise: myPromise
    })
    if(this._state === 'rejected'){
        this._runRejecter();
    }
    return myPromise;
}

const mypromise = new Promises(function(resolve,reject){
    setTimeout(() => {//This is going to be tied to the Event Loop, i.e., this will run after all my code 
        //has finish running.
        console.log('what the fuck');
        resolve('resolve called.')
    },3000)
})
//This state the function to be executed when resolved is called.
mypromise.then(function(data){
    console.log("This is what i want to do after resolved is called and look " 
    + "at the data that was passed: " + data);
}) ;
mypromise.then(function(data){
    console.log('This is the second call of my then. this is the data:' + data )
})
mypromise.then(function(data) {
    console.log('third call: '+ data)
    //if we do this line 23 to 45 is run.
    return new Promises(function(resolve,reject){
        setTimeout(function(){
            console.log('This occur after 6 secs');
            //call line 41, i.e the then() method
            resolve('call line 41, i.e the then() method')
        }, 3000)
    })
}).then(function(data){
    //this invocation is carried out by line 45, after the resolve function is called.
    console.log('did work.')
    console.log(data)
})

mypromise.then(function(data) {
    console.log('fourth call: '+ data)
    setTimeout(function(){
        console.log('will i ever be called.')
    },3000)
    return data + ' worked immediately'
})
.then(function(data){
    console.log(data)
})
