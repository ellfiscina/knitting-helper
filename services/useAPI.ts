import useSWR from "swr";
import axios from 'axios';

const fetcher = (url: string) => axios.get(url, {params: {query: 'drops snow'}}).then((res) => res.data);

export default function useAPI (route:string) {
  const { data, error } = useSWR(route, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
