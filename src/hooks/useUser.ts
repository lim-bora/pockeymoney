import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";
import { User } from "@supabase/supabase-js"; //supabase type가져오기

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("사용자 정보 가져오기 에러", error.message);
      } else {
        setUser(data.user);
        console.log("data", data);
      }
    };
    fetchUser();
  }, []);

  return { user };
};

export default useUser;
