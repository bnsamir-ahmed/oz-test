import { createContext, useEffect , useState } from "react";
import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import { config } from "../config";

const DataContext = createContext();
export const queryClient = new QueryClient();

const  DataProvider = ({children})=>{
  const [pageName, setPageName] = useState("home");
 
  const { isPending, data, error } = useQuery({
    queryKey: ["page", pageName],
    queryFn: ({ signal }) => config(pageName, signal),
  });

  useEffect(()=>{
    queryClient.invalidateQueries({
      queryKey: ["page"],
      exact: true,
    });
  }, [pageName]);
  
  const getComponentValue = (param) => {
    const matchingItems = data?.filter((ele) => ele.key.match(param));
    return matchingItems;
  };

  const ResetPageName = (page) => {
    setPageName(page);
  };

  return (
    <DataContext.Provider
      value={{
        ResetPageName,
        isPending,
        data,
        error,
        getComponentValue,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider}

