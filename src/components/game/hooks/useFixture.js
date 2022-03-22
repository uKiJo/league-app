import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { updateFix, updateTable } from "../../../firebase/firebase";

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
  const success = () =>
    toast.success("Fixture updated successfully", {
      duration: 5000,
      style: {
        fontSize: "15px",
        color: "red",
        border: "1px solid black",
      },
    });

  const { mutate } = useMutation(
    ({ data, dayIdx, route }) => updateFix(currentUser, data, dayIdx, route),
    {
      onSuccess: () => {
        success();
      },
    }
  );

  return mutate;
};

export const useUpdateTable = (currentUser) => {
  const { mutate } = useMutation(({ data, league }) =>
    updateTable(currentUser, data, league)
  );

  return mutate;
};
