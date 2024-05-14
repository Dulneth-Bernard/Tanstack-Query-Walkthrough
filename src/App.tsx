
import axios from "axios";
import { useEffect,useState } from "react";

function App() {
  const[data,setData]=useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    axios.get('http://localhost:8080/todos').then(response => {
      setData(response.data)
      setIsLoading(false)
    
    }).catch((error)=>{
        console.log(error);
      });

  },[]);

  if(isLoading){
    return(
      <div> <h1>loading.... </h1></div>
    );
  }


 



   return (
    <>
      {JSON.stringify(data)}

      {}
    </>
   );
   
  



 
}

export default App
