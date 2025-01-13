import { supabase } from "../client/supabaseClient";

// 예산 조회
export const fetchBudget = async (userId: string) => {
  const { data, error } = await supabase
    .from("budget")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
