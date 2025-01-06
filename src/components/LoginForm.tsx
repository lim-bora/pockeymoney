import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../client/supabaseClient";
import { useNavigate } from "react-router-dom";

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

// Zod 스키마 - 회원가입
const signupSchema = z.object({
  nickname: z.string().min(2, "닉네임은 최소 2자 이상이어야 합니다"),
  email: z.string().email("유효한 이메일을 입력하세요"),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

// Zod 스키마 - 로그인
const loginSchema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요"),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

const LoginForm = ({ mode, setMode }: LoginFormProps) => {
  const navigate = useNavigate();
  const schema = mode === "login" ? loginSchema : signupSchema; //상태에따른 스키마호출
  //1, useForm을 사용하여 폼 상태를 관리 -> form의 기능들 사용
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) }); // useForm에 zodResolver를 사용하여 스키마를 전달
  // schema(개요) : zod 스키마
  // register(등록) : input 요소를 등록하는 함수
  // resolver(해결사) : 유효성 검사를 수행하는 함수
  // required(필수) : 필수 입력 필드를 나타내는 옵션
  // zodResolver : zod 스키마를 사용하여 유효성 검사를 수행하는 HookForm의 리졸버

  // 폼이 제출될 때 호출함수
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            nickname: data.nickname,
          },
        },
      });

      if (error) {
        console.log("회원가입 에러", error.message);
      } else {
        alert("회원가입 완료");
        setMode(mode === "signup" ? "login" : "signup");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.log("로그인 에러", error.message);
        alert(`로그인 정보를 다시 확인해주세요!`);
      } else {
        alert(`환영합니다!`);
        navigate("/home");
      }
    }
  };

  console.log("watch", watch()); //값을 실시간으로 확인

  return (
    <div>
      <h1 className="text-center ">{mode === "login" ? "LOGIN" : "AUTH"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mode === "signup" && (
          <div className="flex flex-col">
            <label htmlFor="nickname">nickname</label>
            <input
              id="nickname"
              className="cmInput"
              placeholder="닉네임을 입력하세요."
              {...register("nickname", { required: "닉네임을 입력하세요" })}
            />
            {errors.nickname && (
              <p className="text-accentText">{errors.nickname.message}</p>
            )}
          </div>
        )}
        <div className="flex flex-col">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            className="cmInput"
            placeholder="이메일을 입력하세요."
            {...register("email")}
          />
          {errors.email && (
            <p className="text-accentText">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            className="cmInput"
            placeholder="비밀번호를 입력하세요."
            {...register("password")}
          />
          {errors.password && (
            <p className="text-accentText">{errors.password.message}</p>
          )}
        </div>
        <button className="cmButton" type="submit">
          {mode === "login" ? "로그인하기" : "회원가입하기"}
        </button>
      </form>
      <p>
        {mode === "login"
          ? "아직 계정이 없으신가요?"
          : "이미 계정이 있으신가요?"}
        <span
          className="cursor-pointer "
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "회원가입 하기" : "로그인 하기"}
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
