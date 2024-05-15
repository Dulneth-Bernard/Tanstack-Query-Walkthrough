import { useToDosIdS } from "../services/queries";

import {  useIsFetching } from "@tanstack/react-query";

export default function ToDo(){
    //hook that returns the number of the queries that your application is loading or fetching in the background
    const isFetching = useIsFetching();
    
    //calling the useQuery function to fetch data
    const todoidQuery = useToDosIdS();

 
    
    //At this point we can assume data is available
    return(

        <>


        {/* Is fetching hook */}
        <p>Global is fetching {isFetching}</p>

        {/* fetchStatus gives information about the queryFn: Is it running or not */}
        {todoidQuery.fetchStatus}


        {/* Map through all data , if we dotn check isError and isPending typescript assumes its undefined*/}
        {todoidQuery.data?.map((id)=>(
             <p key={id}>id : {id}</p>
        ))}

    

           
        
        </>
    );

}