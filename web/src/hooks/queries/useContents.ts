import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../../api/endpoints/contentApi";

export const useHistory = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: () => getHistory(),
    select(data) {
      return data.data;
    },
  });
};
