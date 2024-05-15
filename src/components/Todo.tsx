import { useToDosIdS } from "../services/queries";

export default function ToDo(){

    //calling the useQuery function to fetch data
    const todoidQuery = useToDosIdS();

    //we have access to values in object from useQuery
    if(todoidQuery.isPending){
        return <span>loading...</span>
    }

    if(todoidQuery.isError){
        return <span>error </span>
    }
    
    //At this point we can assume data is available
    return(

        <>
        {todoidQuery.data.map((id)=>(
             <p key={id}>{id}</p>
        ))}

        {todoidQuery.fetchStatus}

           
        
        </>
    );

}