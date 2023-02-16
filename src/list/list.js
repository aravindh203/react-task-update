import React,{useEffect, useState} from "react";

 export function List(details){
    
    const [priority,changePriority]=useState(false);
    const [complete,changeComplete]=useState(false);
    const [taskDetails,changeTaskDetails]=useState(details.details)
    
    useEffect(()=>{
        applayFilter();
    },[priority,complete])


    useEffect(()=>{
        changeTaskDetails(details.details)
    },[details.details])
    
    const applayFilter = () =>{
        if(priority==true && complete==false){
            var filterdDetails=details.details.filter(function(e){
                return e.priority==true
            })  
            
            changeTaskDetails(filterdDetails)
        }
        else if(priority==false && complete==true){
            var filterdDetails=details.details.filter(function(e){
                return e.complete==true
            })                

            changeTaskDetails(filterdDetails)
        }
        else if(priority==true && complete==true){
            var filterdDetails=details.details.filter(function(e){
                return e.priority==true && e.complete==true
            })             

            changeTaskDetails(filterdDetails)
        }
        else{
            filterdDetails=details.details;

            changeTaskDetails(filterdDetails)
        }
    }

    function changeInputValue(event){

        console.log(event)
        if(event.target.name==='filter'){
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
                <input type={'checkbox'} name='filter' checked={priority} onChange={(event)=>changeInputValue(event)}/>
            </div>
            <div>
                <label>complete</label>
                <input type={'checkbox'} name="complete" checked={complete} onChange={(event)=>changeInputValue(event)}/>
            </div>
                       
                 {

                    taskDetails.map((e,index)=>{
                        return(
                            <div key={index} >
                                <h1>{e.name}</h1>
                                <p>{e.description}</p>
                                <input type={'checkbox'} name='priority' checked={e.priority} onChange={(button)=>details.changeFilterValue(button,index)} />
                                <input type={'checkbox'} name='complete' checked={e.complete} onChange={(button)=>details.changeFilterValue(button,index)}/>                             
                                <button onClick={(event)=>details.remove(event,index)}>remove</button>
                            </div>
                        );
                    })
                }   
        </div>
        );
    
}


