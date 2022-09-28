import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res);

export default function useAPI (route:string) {
    const { data, error } = useSWR(route, fetcher)
  
    return {
      data,
      isLoading: !error && !data,
      isError: error
    }
  }