import { useQueryClient, useMutation } from "react-query";
import { updateFix } from "../../../firebase/firebase";


export const useFixture = (data) => {
  const queryClient = useQueryClient();

  queryClient.setQueryData();
};

export const MutateLeagueCache = (queryClient) => {
  // const queryClient = useQueryClient();

  return (data, currentUser, route) => {
    const uid = currentUser.uid;

    queryClient.setQueryData(["league", uid, route], data);
  };
};

export const useUpdateFixture = (currentUser) => {
  const { mutate } = useMutation(({data, dayIdx, route}) => updateFix(currentUser, data, dayIdx, route));

  return mutate;
}