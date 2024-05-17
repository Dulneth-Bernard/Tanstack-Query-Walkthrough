import { useQuery, useQueries, keepPreviousData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProjects, getTodosIds,getProduct } from "./api";
import { getTodo } from "./api";
import { Product } from "../types/products";

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

//Infinite Queries


//Rendering lists that can additively "load more" data onto an existing set of data or "infinite scroll" is also a very common UI pattern. TanStack Query supports a useful version of useQuery called useInfiniteQuery for querying these types of lists
export function useProducts(){
//Iffinite scrolling
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam:0,
    getNextPageParam: (lastPage, _, lastPageParam)=>{
      if(lastPage.length === 0){
        //NO PAGES
        return undefined;
      }
      return lastPageParam+1;
    },
    getPreviousPageParam: (_,__,firstPageParam)=>{
      if(firstPageParam <=1 ){
        return undefined;
      }
      return firstPageParam - 1;
    }


  });
}
//If your API doesn't return a cursor, you can use the pageParam as a cursor. Because getNextPageParam and getPreviousPageParam also get the pageParamof the current page, you can use it to calculate the next / previous page param.

//null because i out useState we gaev null as no id initially
export function useProduct( id : number | null){
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["product", {id}],
    //intellisence screasm as in api we specified id as number but here its num or null, react doesnt know if ti snum or null but we know its num or null by using enable property, if there is a id only will the function run that way we dont need to worry of it being null
    queryFn:  ()  => getProduct(id!),//put ! to tell we know id is defined evon tho react does know
    //If ther is an id !! mean true enabled will be triggered as true and that whern the Queryfunction willrun 
    enabled: !!id,

    //increase performance by reducing uneccasssary dealy in loading
    placeholderData:()=>{
      // WE ARE GETTING EX {"id":13,"name":"product 13"} as a placeholder from useProducts query
      //so in devtools the query is laoidng state, but with palce holder it slaready chached and siaplyed in a blink of an eye
      //getQueryData is a synchronous function that can be used to get an existing query's cached data. If the query does not exist, undefined will be returned. docs 

      //While product is loading i can show you some part of the products becase useProductsQuery we had the id of the product so its cached
      const cachedProducts = (queryClient.getQueryData(["products"])as {pages: Product[] | undefined}) ?.pages?.flat(2)  // as is used to defined th type\
      //flat() method of Array instances creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
      //Just make our app faster
      if(cachedProducts){
        //if cache is available, return items from cahced product where id is hooks id
        return  cachedProducts.find((item)=>  item.id === id )
      }
    }
})}