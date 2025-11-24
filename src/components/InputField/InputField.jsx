import { useForm } from "react-hook-form";

export default function InputField(props) {

    return (
        <div className="input-group">
            <label htmlFor={props.id}>
                ${props.label}:
            </label>
            <input
                type={props.type}
                id={props.id} 
                name={props.name} 

            />
        </div>
    );
}


export default function InputField(props) {

    const { register } = useForm();
        return (
            <div className="input-group">
                <label htmlFor={props.id}>
                    ${props.label}:
                </label>
                <input
                    type={props.type}
                    id={props.id} 
                    name={props.name} 
                    {...register(`${props.name}`, {
                        required: {
                        value: true,
                        message: 'This field is required',
                    }})}
                />
            </div>
        );
    }


