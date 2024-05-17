import { useProducts,useProduct } from "../services/queries"
import { Fragment, useState } from "react";

export default function Products(){

    const productsQuery = useProducts();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
   //Getting queries conditionally or get Queries based on previos Queries
    //Get complete to do by Id:
    const productQuery =useProduct(selectedProductId);


    return (
        <>
          {productsQuery.data?.pages.map((group, index) => (
            // Becasue of the key we have to use fragment kyeyword
            <Fragment key={index}>
              {group.map((product) => (
                <Fragment key={product.id}>
                  <button onClick={() => setSelectedProductId(product.id)}>
                    {product.name}
                  </button>
                  <br />
                </Fragment>
              ))}
            </Fragment>
          ))}
          <br />
          <div>
            <button
              onClick={() => productsQuery.fetchNextPage()}
              disabled={
                !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
              }
            //   The isFetchingNextPage and isFetchingPreviousPage booleans are now available to distinguish between a background refresh state and a loading more state
            >
              {productsQuery.isFetchingNextPage
                ? "Loading more..."
                : productsQuery.hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </button>
          </div>
          <div>Selected product:</div>
          {JSON.stringify(productQuery.data)}
        </>
      );
}

//A hasNextPage boolean is now available and is true if getNextPageParam returns a value other than null or undefined
//A hasPreviousPage boolean is now available and is true if getPreviousPageParam returns a value other than null or