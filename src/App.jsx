import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
// import { InfiniteSpecies } from "./species/InfiniteSpecies";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

function App() {
  const [queryClient, setQueryClient] = useState(new QueryClient());

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <InfinitePeople />
        {/* <InfiniteSpecies /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
