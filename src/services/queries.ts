import { useQuery } from "@tanstack/react-query";
import { getTodosIds } from "./api";

export function useToDosIdS(){
    return useQuery({
            queryKey: ["todos"],
            queryFn: getTodosIds,
            //query will be refetched when user leaves the browser or other tab , setting it to false doesnt
            refetchOnWindowFocus: false,
        })

    

}
