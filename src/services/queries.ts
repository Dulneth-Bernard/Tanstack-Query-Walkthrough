import { useQuery, useQueries, keepPreviousData } from "@tanstack/react-query";
import { getProjects, getTodosIds } from "./api";
import { getTodo } from "./api";

//Get all the todos
export function useToDosIdS(){
    return useQuery({
            queryKey: ["todos"],
            queryFn: getTodosIds,
            //query will be refetched when user leaves the browser or other tab , setting it to false doesnt
            refetchOnWindowFocus: false,
        })

    

}


//Get to fo by id

// one way of using this
// export function useTodo(id: number) {
//   return useQuery({
//     queryKey: ["todo", id],
//     queryFn: () => readTodo(id),
//     // find a use case for this
//   });
// }

//useQueries accepts an options object with a queries key whose value is an array of query objects. It returns an array of query results
    export function useTodos(ids: (number | undefined)[] | undefined) {
        return useQueries({
            //looping through ids
          queries: (ids ?? []).map((id) => {
            return {
              queryKey: ["todo", {id}],
              queryFn: () => getTodo(id!),
            };
          }),
        });
      
      

}



//Query to get the pageinated queries
export function useProjects(page:number){
  return useQuery({
    queryKey:["projects", {page}],
    queryFn: ()=>getProjects(page),
    placeholderData: keepPreviousData,
    //basically placeholderData, when someone paginates to next page itll cause a flickerand update ui, with this placeholder
    //it says keep the cprevios page data until next page data is loaded then update so user has see no data transitions
  });

}

// it would still technically work fine, but the UI would jump in and out of the success and pending states as different queries are created and destroyed for each page or cursor. By setting placeholderData to (previousData) => previousData or keepPreviousData function exported from TanStack Query, we get a few new things:

// The data from the last successful fetch is available while new data is being requested, even though the query key has changed.
// When the new data arrives, the previous data is seamlessly swapped to show the new data.
// isPlaceholderData is made available to know what data the query is currently providing you