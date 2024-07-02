import { useForm } from "react-hook-form";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from "../../utils/styles";
import styles from "./index.module.scss";
import { CreateConversationParams } from "../../utils/types";
import { Dispatch, FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { createConversationThunk } from "../../store/conversationSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationForm: FC<Props> = ({ setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationParams>({});
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (data: CreateConversationParams) => {
    console.log(data);
    dispatch(createConversationThunk(data))
    .unwrap()
    .then(({ data }) => {
        console.log(data);
        console.log("done");
        setShowModal(false);
        navigate(`/conversations/${data.id}`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          <InputField
            {...register("email", { required: "Email is required" })}
          />
        </InputContainer>
      </section>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField
            {...register("message", { required: "Message is required" })}
          />
        </InputContainer>
      </section>
      <Button>Create Conversation</Button>
    </form>
  );
};
