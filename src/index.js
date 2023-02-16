import React ,{ useState} from 'react';
import { useEffect } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import  {List}  from './list/list';

const root=createRoot(document.getElementById("root"));

function Main(){

  const [taskName,changeTaskName]=useState('')
  const [description,changeDescription]=useState('')
  const [priority,changePriority]=useState(false)
  const [complete,changeComplete]=useState(false)
  const [allDetails,changeAllDetails]=useState([])

  console.log('perent rendered')

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
      var changeValue=[...allDetails];
      changeValue[index].priority=e.target.checked;
      
      changeAllDetails(changeValue)
    }
    else{
       var changeValue=[...allDetails];
       changeValue[index].complete=e.target.checked;

      changeAllDetails(changeValue)
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

    changeAllDetails([...allDetails,object])

    changeTaskName('');
    changeDescription('');
    changePriority(false);
    changeComplete(false);
      
  }

  const remove = (event,removeIndex) =>{
    var removeDetail=[...allDetails];
    var removedDetail=removeDetail.filter(function(e,index){
      return index != removeIndex;
    })

    changeAllDetails(removedDetail)
  }

  useEffect(()=>{
    console.log('alldetails',allDetails)
  },[allDetails])
    
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
          <input onChange={(event)=>handleInputValues(event)} type={"checkbox"} checked={priority} name='priority'/>
        </div>
        <div>
          <label>is Complete</label>
          <input onChange={(event)=>handleInputValues(event)}  type={"checkbox"} checked={complete} name='complete'/>
        </div>
        <div>
          <input type={'submit'}/>
        </div>
      </form>

      <List details={allDetails} changeFilterValue={changeFilterValue} remove={remove}/>
  
    </div>
    
   );
}

root.render(<Main/>)
