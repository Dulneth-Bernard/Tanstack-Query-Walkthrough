import { useQuery, useQueries } from "@tanstack/react-query";
import { getTodosIds } from "./api";
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
