import { useForm } from "react-hook-form";
import "./App.css";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Registration Form</h2>

      {/* Name */}
      <div className="form-group">
        <label htmlFor="name">Name</label>

        <input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
        />

        {errors.name && (
          <p className="error">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email</label>

        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <p className="error">{errors.email.message}</p>
        )}
      </div>

      {/* Age */}
      <div className="form-group">
        <label htmlFor="age">Age</label>

        <input
          type="number"
          id="age"
          {...register("age", {
            required: "Age is required",
            min: {
              value: 18,
              message: "Age must be at least 18",
            },
            max: {
              value: 60,
              message: "Age must be less than or equal to 60",
            },
          })}
        />

        {errors.age && (
          <p className="error">{errors.age.message}</p>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;