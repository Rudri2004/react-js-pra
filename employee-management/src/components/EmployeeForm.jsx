import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useEmployee } from "@/context/EmployeeContext"
import { employeeSchema } from "@/schemas/employeeSchema"
import {
  addEmployee,
  updateEmployee,
} from "@/services/employeeApi"

function EmployeeForm({ editingEmployee, onCancelEdit }) {
  const { dispatch } = useEmployee()

  const [successMessage, setSuccessMessage] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: editingEmployee?.name || "",
      email: editingEmployee?.email || "",
      department: editingEmployee?.department || "",
      position: editingEmployee?.position || "",
      salary: editingEmployee?.salary || "",
      status: editingEmployee?.status || "Active",
    },
  })

  useEffect(() => {
    if (editingEmployee) {
      reset({
        name: editingEmployee.name,
        email: editingEmployee.email,
        department: editingEmployee.department,
        position: editingEmployee.position,
        salary: editingEmployee.salary,
        status: editingEmployee.status,
      })
    }
  }, [editingEmployee, reset])

  const onSubmit = async (data) => {
    // UPDATE employee
    if (editingEmployee) {
      const updatedEmployee = {
        id: editingEmployee.id,
        name: data.name,
        email: data.email,
        department: data.department,
        position: data.position,
        salary: data.salary,
        status: data.status,
      }

      dispatch({
        type: "UPDATE_EMPLOYEE",
        payload: updatedEmployee,
      })

      setSuccessMessage(
        "Employee updated successfully!"
      )

      reset({
        name: "",
        email: "",
        department: "",
        position: "",
        salary: "",
        status: "Active",
      })

      onCancelEdit()

      return
    }

    // ADD employee
    const newEmployee = await addEmployee({
      name: data.name,
      email: data.email,
      department: data.department,
      position: data.position,
      salary: data.salary,
      status: data.status,
    })

    dispatch({
      type: "ADD_EMPLOYEE",
      payload: newEmployee,
    })

    reset({
      name: "",
      email: "",
      department: "",
      position: "",
      salary: "",
      status: "Active",
    })

    setSuccessMessage(
      "Employee added successfully!"
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="employee-form"
    >
      <div className="employee-form-header">
        <h2>
          {editingEmployee
            ? "Edit Employee"
            : "Add Employee"}
        </h2>

        <p>
          {editingEmployee
            ? "Update employee information."
            : "Create a new employee record."}
        </p>
      </div>

      {successMessage && (
        <div className="employee-form-success">
          {successMessage}
        </div>
      )}

      <div className="employee-form-grid">

        {/* Name */}
        <div className="employee-form-field">
          <label htmlFor="name">
            Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter employee name"
            {...register("name")}
          />

          {errors.name && (
            <p className="employee-form-error">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="employee-form-field">
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter employee email"
            {...register("email")}
          />

          {errors.email && (
            <p className="employee-form-error">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Department */}
        <div className="employee-form-field">
          <label htmlFor="department">
            Department
          </label>

          <input
            id="department"
            type="text"
            placeholder="e.g. Engineering"
            {...register("department")}
          />

          {errors.department && (
            <p className="employee-form-error">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* Position */}
        <div className="employee-form-field">
          <label htmlFor="position">
            Position
          </label>

          <input
            id="position"
            type="text"
            placeholder="e.g. Frontend Developer"
            {...register("position")}
          />

          {errors.position && (
            <p className="employee-form-error">
              {errors.position.message}
            </p>
          )}
        </div>

        {/* Salary */}
        <div className="employee-form-field">
          <label htmlFor="salary">
            Salary
          </label>

          <input
            id="salary"
            type="number"
            placeholder="Enter salary"
            {...register("salary", {
              valueAsNumber: true,
            })}
          />

          {errors.salary && (
            <p className="employee-form-error">
              {errors.salary.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div className="employee-form-field">
          <label htmlFor="status">
            Status
          </label>

          <select
            id="status"
            {...register("status")}
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          {errors.status && (
            <p className="employee-form-error">
              {errors.status.message}
            </p>
          )}
        </div>

      </div>

      {/* Buttons */}
      <div>
        <button
          type="submit"
          className="employee-form-button"
        >
          {editingEmployee
            ? "Update Employee"
            : "Add Employee"}
        </button>

        {editingEmployee && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="employee-cancel-button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default EmployeeForm