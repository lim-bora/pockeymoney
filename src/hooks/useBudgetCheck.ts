import { useEffect, useState } from "react";
import useUser from "./useUser";
import { supabase } from "../client/supabaseClient";

const useBudgetCheck = () => {
  const [budget, setBudget] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchBudget = async () => {
      if (user) {
        const { data: existingBudget, error: fetchError } = await supabase
          .from("budget")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (fetchError) {
          console.log("예산 조회 실패:", fetchError.message);
          return;
        } else {
          setBudget(existingBudget.budget);
        }
      }
    };
    fetchBudget();
  }, [user, budget]);

  return { budget, setBudget };
};

export default useBudgetCheck;
