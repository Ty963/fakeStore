import { useForm } from "react-hook-form"

export default function LoginPage() {
    // const { register, handleSubmit, formState: { errors } } = useForm();
    const { register, handleSubmit } = useForm();

    function handleSubmit() {
        // Handle login logic here
    }

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
    <div className="wrapper">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="form-container">

            <h2>
                Login
            </h2>

            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    {...register('email')}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    {...register('password')}
                    required
                />
            </div>

            <button type="submit" className="btn">
                Login
            </button>
        </form>
    </div>
    )
}