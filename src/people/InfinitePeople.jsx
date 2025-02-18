// import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
// import InfiniteScroll from "react-infinite-scroll-component";

const initialUrl = "https://swapi.dev/api/people/";

const fetchUrl = async (url) => {
  try {
    const res = fetch(url);
    return (await res).json();
  } catch (e) {}
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({ pageParams = initialUrl }) => {
      console.log({ pageParams });
      return fetchUrl(pageParams);
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log({ lastPage, allPages });
      return lastPage.next || undefined;
    },
  });

  if (isLoading) return <div className="loading">Loading</div>;

  if (isError) return <div className="error">{error.toString()}</div>;

  console.log("Loading", data);

  return (
    <div id="scrollableDiv">
      {isFetching && <div>Fetching</div>}
      <InfiniteScroll
        // dataLength={data.pageParams.length}
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
        // loader={<h4>Loading...</h4>}
        // scrollableTarget="scrollableDiv"
      >
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </div>
  );
}

{
  //   <InfiniteScroll
  //   loadMore={() => {
  //     if (!isFetching) fetchNextPage();
  //   }}
  //   hasMore={hasNextPage}
  // >
  //   {data.pages.map((pageData) => {
  //     return pageData.results.map((person) => {
  //       return (
  //         <Person
  //           key={person.name}
  //           name={person.name}
  //           hairColor={person.hair_color}
  //           eyeColor={person.eye_color}
  //         />
  //       );
  //     });
  //   })}
  // </InfiniteScroll>
}
