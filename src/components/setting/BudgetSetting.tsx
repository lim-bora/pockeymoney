import { fetchBudget } from "../../api/fetchBudget";
import { supabase } from "../../client/supabaseClient";
import useUser from "../../hooks/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useBudgetStore } from "../../store/budgetStore";

const BudgetSetting = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { newBudget, setNewBudget } = useBudgetStore();

  const {
    data: existingBudget,
    error: fetchError,
    isLoading,
  } = useQuery(["budgetKey", user?.id], () => fetchBudget(user!.id), {
    enabled: !!user,
  });

  const addOrUpdateBudget = useMutation(
    async (newBudget: number) => {
      if (existingBudget) {
        //이미 예산이 설정되어있으면 업데이트
        const { data, error } = await supabase
          .from("budget")
          .update({ budget: newBudget })
          .eq("user_id", user!.id)
          .select();

        if (error) {
          throw new Error(error.message);
        }
        alert("예산이 업데이트되었습니다.");

        return data;
      } else {
        const { data, error } = await supabase
          .from("budget")
          .insert([
            { budget: newBudget, user_id: user?.id, email: user?.email },
          ])
          .select();

        if (error) {
          throw new Error(error.message);
        }
        alert("예산이 추가되었습니다.");
        return data;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["budgetKey", user?.id]);
      },
    }
  );

  //예산 리셋
  const resetBudget = useMutation(
    async () => {
      const { data, error } = await supabase
        .from("budget")
        .update({ budget: 0 })
        .eq("user_id", user!.id)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      setNewBudget(0);
      alert("예산이 리셋되었습니다.");
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["budgetKey", user?.id]);
      },
    }
  );

  const handleAddOrUpdateBudget = () => {
    if (newBudget !== null) {
      addOrUpdateBudget.mutate(newBudget);
    }
  };

  const handleResetBudget = () => {
    resetBudget.mutate();
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (fetchError) {
    // return <div>에러: {fetchError.message}</div>;
  }

  return (
    <>
      <input
        className="cmInput"
        type="number"
        value={newBudget ?? ""}
        onChange={(e) => setNewBudget(Number(e.target.value))}
        placeholder="예산을 입력하세요"
      />
      <button className="cmButton" onClick={handleAddOrUpdateBudget}>
        예산 설정하기
      </button>
      <button className="underline" onClick={handleResetBudget}>
        리셋
      </button>
    </>
  );
};

export default BudgetSetting;
