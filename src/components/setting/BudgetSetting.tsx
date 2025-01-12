import { supabase } from "../../client/supabaseClient";
import useUser from "../../hooks/useUser";
import useBudgetCheck from "../../hooks/useBudgetCheck";

const BudgetSetting = () => {
  const { user } = useUser();
  const { budget, setBudget } = useBudgetCheck();

  //예산 추가 및 업데이트
  const handleAddBudget = async () => {
    if (user) {
      //예산조회
      const { data: existingBudget, error: fetchError } = await supabase
        .from("budget")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (fetchError) {
        console.log("데이터 삽입 실패:", fetchError.message);
        return;
      }

      if (existingBudget) {
        //이미 예산이 설정되어있으면 업데이트
        const { data, error } = await supabase
          .from("budget")
          .update({ budget })
          .eq("user_id", user.id)
          .select();

        if (error) console.log("예산 업데이트 실패", error.message);
        else {
          alert("예산이 업데이트되었습니다.");
          console.log("data", data);
        }
      } else {
        //예산이 없으면 추가
        const { data, error } = await supabase
          .from("budget")
          .insert([{ budget, user_id: user.id, email: user.email }]);
        if (error) console.log("예산 추가 실패", error.message);
        else {
          alert("예산이 추가되었습니다.");
          console.log("data", data);
        }
      }
    } else {
      alert("사용자 정보가 없습니다.");
    }
  };

  //예산 리셋
  const handleResetBudget = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("budget")
        .delete()
        .eq("user_id", user.id);

      if (error) console.log("예산 삭제 실패", error.message);
      else {
        alert("예산이 삭제되었습니다.");
        console.log("data", data);
      }
    } else {
      alert("사용자 정보가 없습니다.");
    }
  };

  return (
    <>
      <input
        className="cmInput"
        type="number"
        value={budget ?? ""}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="예산을 입력하세요"
      />
      <button className="cmButton" onClick={handleAddBudget}>
        예산 설정하기
      </button>
      <button className="underline" onClick={handleResetBudget}>
        리셋
      </button>
    </>
  );
};

export default BudgetSetting;
