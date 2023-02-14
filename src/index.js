import React ,{useState} from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import  {List}  from './list/list';

const root=createRoot(document.getElementById("root"));

function Main(){

    const [taskName,changeTaskName]=useState('')
    const [description,changeDescription]=useState('')
    const [priority,changePriority]=useState('')
    const [complete,changeComplete]=useState('')
    const [allDetails,changeAllDetails]=useState([])

    const handleInputValues = (inputValue) =>{
      
      if(inputValue.target.name=="name"){
        changeTaskName(inputValue.target.value);
      }
      else if(inputValue.target.name=="description"){
        changeDescription(inputValue.target.value);
      }
      else if(inputValue.target.name=="priority"){
        changePriority(inputValue.target.checked);
      }
      else{
        changeComplete(inputValue.target.checked);
      }
 
    }

    const changeFilterValue = (e,index) =>{
      

      if(e.target.name=='priority'){
        var changePriority=allDetails;
        changePriority[index].priority=e.target.checked;

        changeAllDetails(changePriority)
      }
      else{
        var changeComplete=allDetails;
        changeComplete[index].complete=e.target.checked;

        changeAllDetails(changeComplete)
      }

      
    }

    const handleAllDetails = (details) =>{

      details.preventDefault();

     
      var object={
        name:taskName,
        description:description,
        priority:priority,
        complete:complete
      }

      var taskArray=allDetails;
      taskArray.push(object);

      changeAllDetails(taskArray)

      changeTaskName('');
      changeDescription('');
      changePriority(false);
      changeComplete(false);
      details.target[2].checked=false;
      details.target[3].checked=false;
      
    }
    
   return(
    <div>
      <form onSubmit={(event)=>{handleAllDetails(event);}}>
        <div>
          <label>Task name</label>
          <input onChange={(event)=>handleInputValues(event)} type={"text"} value={taskName} name="name"/>
        </div>
        <div>
          <label>Description</label>
          <input onChange={(event)=>handleInputValues(event)} type={"text"} value={description} name='description'/>
        </div>
        <div>
          <label>is Priority</label>
          <input onChange={(event)=>handleInputValues(event)} type={"checkbox"} name='priority'/>
        </div>
        <div>
          <label>is Complete</label>
          <input onChange={(event)=>handleInputValues(event)}  type={"checkbox"} name='complete'/>
        </div>
        <div>
          <input type={'submit'}/>
        </div>
      </form>

      <List details={allDetails} changeFilterValue={changeFilterValue}/>
  
    </div>
    
   );
}

root.render(<Main/>)
