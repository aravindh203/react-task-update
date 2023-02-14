import React,{useState} from "react";

 export function List(details){
    
    const [priority,changePriority]=useState(false);
    const [complete,changeComplete]=useState(false);

    var filterdDetails=details.details;

    if(priority==true && complete==false){
        var priorityFilter=details.details.filter(function(e){
            return e.priority==true
        })

        filterdDetails=priorityFilter;
        console.log('filter',priorityFilter)
                
    }
            else if(priority==false && complete==true){
                var completeFilter=details.details.filter(function(e){
                    return e.complete==true
                })

                filterdDetails=completeFilter;
                
            }
            else if(priority==true && complete==true){
                var priorityCompleteFilter=details.details.filter(function(e){
                    return e.priority==true && e.complete==true
                })

                filterdDetails=priorityCompleteFilter
                
            }
            else{
                filterdDetails=details.details;
            }

    function changeInputValue(event){
        if(event.target.name=='filter-priority'){
            changePriority(event.target.checked)

        }
        else{
            changeComplete(event.target.checked)
        }
    }

    return(
        <div>
            <div>
                <label>priority</label>
                <input type={'checkbox'} name='filter-priority' onChange={(event)=>changeInputValue(event)}/>
            </div>
            <div>
                <label>complete</label>
                <input type={'checkbox'} name='filter-Complete' onChange={(event)=>changeInputValue(event)}/>
            </div>
                       
                 {

                    filterdDetails.map((e,index)=>{
                        return(
                            <div className="hello" key={index} >
                                <h1>{e.name}</h1>
                                <p>{e.description}</p>
                                {e.priority ? <input type={'checkbox'} name='priority' onChange={(button)=>details.changeFilterValue(button,index)} defaultChecked/>:<input name='priority' onChange={(button)=>details.changeFilterValue(button,index)} type={'checkbox'} />}                               
                                {e.complete ? <input type={'checkbox'} name='complete' onChange={(button)=>details.changeFilterValue(button,index)} defaultChecked/>:<input name='complete' onChange={(button)=>details.changeFilterValue(button,index)} type={'checkbox'} />}  
                            </div>
                        );
                    })}   
        </div>
        );
    
}


