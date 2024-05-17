import { useState } from "react"
import { useProjects } from "../services/queries";

export default function Projects(){

    //State for the page
    const[page,setPage] = useState(1);

    const {data , isPending,isError,error,isPlaceholderData,isFetching} = useProjects(page);

  
    return(
       
    <>
        <div>
            {isPending ?(
               <p> Loading....</p> 
            ) : isError ?
             (<div>Errro : {error.message}</div>) :
             //No error
             <div>
                {data.map((project)=>(
                    <p key={project.id}> {project.name}</p>

                ))}
             </div>
            
             }

             <span>
                current page : {page}
             </span>
             <button onClick={()=>{ setPage((old)=> Math.max(old-1,0))}}> Previos Page</button>
             {" "}
             <button
             onClick={()=>{
                if(!isPlaceholderData){
                    setPage((old)=>old +1 )
                }
             }}
             disabled={isPlaceholderData}
            //Tehn i have placeholder Data
             >
                Next page
                </button>
                {isFetching? <span>lOADING.....</span> : null}

            
        </div>

    </>);
}