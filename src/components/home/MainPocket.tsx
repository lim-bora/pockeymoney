import useUser from "../../hooks/useUser";
import BudgetSetting from "../setting/BudgetSetting";
import useBudgetCheck from "../../hooks/useBudgetCheck";

const MainPocket = () => {
  const { user } = useUser();
  const { budget } = useBudgetCheck();

  return (
    <div className="p-[30px] bg-white w-[80%] h-[500px] rounded-[24px] shadow-md flex flex-col justify-center">
      {user?.user_metadata.nickname}
      <span>총 예산: {budget !== null ? `${budget}원` : "0원"}</span>
      <BudgetSetting />
    </div>
  );
};

export default MainPocket;
