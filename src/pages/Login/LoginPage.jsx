import { useForm } from "react-hook-form"
import fakeStoreApi from "../../services/api/fakeStoreApi";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField/InputField";

export default function LoginPage() {
    // const { register, handleSubmit, formState: { errors } } = useForm();
    const { register, handleSubmit } = useForm();

    async function handleFormSubmit(data) {
        // TODO: implement login logic, implement more logic and navigation after successful context implementation.
        const response = await fakeStoreApi.authenticateUser(data.username, data.password);
        console.log(response);
    }

    return (
    <div className="wrapper">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="form-container">

            <h2>
                Login
            </h2>

            <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id="username" 
                    name="username" 
                    {...register('username', {
                        required: {
                        value: true,
                        message: 'This field is required',
                    }})}
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    {...register('password', {
                        required: {
                        value: true,
                        message: 'This field is required',
                    }})}
                />
            </div>

            <button type="submit" className="btn">
                Login
            </button>

            <Link to="/register" className="link">
                Register here
            </Link>

        </form>
    </div>
    )
}