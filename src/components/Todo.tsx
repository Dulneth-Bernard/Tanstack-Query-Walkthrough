import { useToDosIdS, useTodos } from "../services/queries";


export default function ToDo(){

    
    //calling the useQuery function to fetch data
    const todoidQuery = useToDosIdS();

    //calling use useTodo query
    const todoQueries = useTodos(todoidQuery.data);
    
    //At this point we can assume data is available
    return(

        <>


        {/* Its going to fetch 1 by 1 in parallel , goof for performance, usefull for multiple queries you dont know how many   */}
        <ul>
            {todoQueries.map(({data})=>(
                <li key={data?.id}>
                    <div>id : {data?.id}</div>
                    <span>
                        <strong>Title: </strong> {data?.title}
                        <strong> Desc: </strong>{data?.description}

                    </span>

                </li>
            
            ))}
        </ul>
       
    

           
        
        </>
    );

}