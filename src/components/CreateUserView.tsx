
const CreateUserView = ({form, onSubmit}) => {
    const { handleSubmit } = form;
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>Username</label>
            <div>
                <input type="text" placeholder="Enter username"/>
            </div>
        </div>

        <div>
            <label>Email</label>
            <div>
                <input type="text" placeholder="Enter email"/>
            </div>
        </div>

        <button type="submit">
            Submit
        </button>
    </form>
  )
}

export default CreateUserView