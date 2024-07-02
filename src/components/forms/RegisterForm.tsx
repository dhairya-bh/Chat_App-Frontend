import React from "react";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../utils/styles";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CreateUserDetails } from "../../utils/types";
import { postRegisterUser } from "../../utils/api";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDetails>();
  console.log(errors)
  const onSubmit = async (data :CreateUserDetails) => {
    try {
      await postRegisterUser(data);
    } catch (error) {
      console.log(error)
    }
      
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
          })}
        />
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField
            type="text"
            id="firstName"
            {...register("firstName", {
              required: "First Name is required",
            })}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField
            type="text"
            id="lastName"
            {...register("lastName", {
              required: "Last Name is required",
            })}
          />
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
      </InputContainer>
      <Button className={styles.button}>Create Account</Button>
      <div className={styles.footerText}>
        <span>Already have an account? </span>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
    </form>
  );
};
