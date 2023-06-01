import { useForm } from "react-hook-form"
import CreateUserView from "./CreateUserView"
import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

const yup = require("yup");

const CreateUserLogic = ({defaultValues, onSubmit}) => {

  const CreateUserFormSchema = yup.object().shape({
    username: yup.string().min(5).required(),
    email:yup.string().email().required()
  });

  
  const form = useForm({
    mode:"onSubmit",
    defaultValues,
    resolver: yupResolver(CreateUserFormSchema)
  });

  const handleSubmit = async (data) => {
    await onSubmit(data)
    .then(() => form.reset(data))
    .catch((err) => console.error(err))
  };

  return (
    <CreateUserView form={form} onSubmit={handleSubmit} />
  )
}

export default CreateUserLogic