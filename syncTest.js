
window.onload = (
    function(){
        this.assert = function(value, desc) {           
            var li = document.createElement("li");               
            li.className = value ? "pass" : "fail";                      
            li.appendChild(document.createTextNode(desc));        
            document.getElementById("results").appendChild(li);   
        }
    }
     )   

