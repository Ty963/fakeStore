import { useForm } from "react-hook-form";
import fakeStoreApi from "../../services/api/fakeStoreApi";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const { register, handleSubmit } = useForm();

    async function handleFormSubmit(data) {
        console.log(data);
        // const response = await fakeStoreApi.registerUser(data.username, data.email, data.password);
        // console.log(response);
    }

    return (
        <div className="wrapper">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="form-container">

            <h2>
                Register
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
                <label htmlFor="email">Email:</label>
                <input
                    type="email" 
                    id="email" 
                    name="email" 
                    {...register('email', {
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
                Register
            </button>

            <Link to="/" className="link">
                Login here
            </Link>

        </form>
        </div>
    );
}