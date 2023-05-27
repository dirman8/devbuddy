import CreateUserLogic from "./CreateUserLogic";
import { useQuery } from "react-query";

const CreateUserApollo = () => {
    const {isLoading, data} = useQuery("createUserData", ()=> fetch("https://jsonplaceholder.typicode.com/users/1").then((res) => res.json()));

    const handleSubmit = async (data) => {
        const submitData = {
            name: data.username,
            email: data.email,
            createdAt: Date.now().toString()
        };

        console.log("data sent to httpbin")

        return fetch("http://httpbin.org/post", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(submitData)
        })
    }

    if (isLoading) return <div>Loading...</div>

    const defaultValues = {
        username: data?.name ?? "",
        email: data?.email ?? ""
    }

  return (
    <CreateUserLogic defaultValues={defaultValues} onSubmit={handleSubmit}/>
  )
}

export default CreateUserApollo