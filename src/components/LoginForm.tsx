import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// 로그인 회원가입 mode 속성
interface LoginFormProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

//입력 필드의 타입
interface FormValues {
  nickname: string;
  email: string;
  password: string;
}

const LoginForm = ({ mode, setMode }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // 폼이 제출될 때 호출함수
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-center ">{mode === "login" ? "LOGIN" : "AUTH"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mode === "signup" ? (
          <>
            <div className="flex flex-col">
              <label htmlFor="nickname">nickname</label>
              <input
                id="nickname"
                className="cmInput"
                {...register("nickname", { required: "닉네임을 입력하세요" })}
              />
              {errors.nickname && <p>{errors.nickname.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">email</label>
              <input
                id="email"
                className="cmInput"
                type="email"
                {...register("email", { required: "이메일을 입력하세요" })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">password</label>
              <input
                id="password"
                className="cmInput"
                type="password"
                {...register("password", { required: "비밀번호를 입력하세요" })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button type="submit">회원가입하기</button>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <label htmlFor="email">email</label>
              <input
                id="email"
                className="cmInput"
                type="email"
                {...register("email", { required: "이메일을 입력하세요" })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">password</label>
              <input
                id="password"
                className="cmInput"
                type="password"
                {...register("password", { required: "비밀번호를 입력하세요" })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button className="cmButton" type="submit">
              로그인하기
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
