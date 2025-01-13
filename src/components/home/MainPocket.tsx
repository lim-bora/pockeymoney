import useUser from "../../hooks/useUser";
import BudgetSetting from "../setting/BudgetSetting";
import { useBudgetStore } from "../../store/budgetStore";

const MainPocket = () => {
  const { user } = useUser();
  const { newBudget } = useBudgetStore();

  return (
    <div className="p-[30px] bg-white w-[80%] h-[500px] rounded-[24px] shadow-md flex flex-col justify-center">
      {user?.user_metadata.nickname}
      <span>총 예산: {newBudget !== null ? `${newBudget}원` : "0원"}</span>
      <BudgetSetting />
    </div>
  );
};

export default MainPocket;
