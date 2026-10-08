import { useState } from "react"
import { useEmployee } from "@/context/EmployeeContext"

import { Input } from "@/components/ui/input"
function EmployeeTable({ onEdit }) {
  const { state, dispatch } = useEmployee()

  const [searchText, setSearchText] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")

  // Search + department filter
  const filteredEmployees = state.employees.filter((employee) => {
    const search = searchText.toLowerCase()

    const matchesSearch =
      employee.name.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search) ||
      employee.department.toLowerCase().includes(search) ||
      employee.position.toLowerCase().includes(search)

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter

    return matchesSearch && matchesDepartment
  })

  // Get unique departments
  const departments = [
    "All",
    ...new Set(
      state.employees.map(
        (employee) => employee.department
      )
    ),
  ]

 const handleDelete = (employeeId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  )

  if (!confirmDelete) {
    return
  }

  dispatch({
    type: "DELETE_EMPLOYEE",
    payload: employeeId,
  })
}

  // Loading state
  if (state.loading) {
    return (
      <div className="employee-table-message">
        Loading employees...
      </div>
    )
  }

  // Error state
  if (state.error) {
    return (
      <div className="employee-table-message employee-table-error">
        {state.error}
      </div>
    )
  }

  return (
    <div className="employee-table-container">

      {/* Table Header */}
      <div className="employee-table-header">
        <div>
          <h2>Employees</h2>
          <p>
            Manage your organization's employees.
          </p>
        </div>

        <span className="employee-count">
          {filteredEmployees.length} Employees
        </span>
      </div>

      {/* Search + Filter */}
      <div className="employee-table-toolbar">

        <Input
          type="text"
          placeholder="Search employees..."
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
          className="employee-search"
        />

        <select
          value={departmentFilter}
          onChange={(event) =>
            setDepartmentFilter(event.target.value)
          }
          className="employee-filter"
        >
          {departments.map((department) => (
            <option
              key={department}
              value={department}
            >
              {department}
            </option>
          ))}
        </select>

      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 ? (
        <div className="employee-table-message">
          No employees found.
        </div>
      ) : (
        <div className="employee-table-wrapper">

          <table className="employee-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>

                  <td className="employee-name">
                    {employee.name}
                  </td>

                  <td>
                    {employee.email}
                  </td>

                  <td>
                    {employee.department}
                  </td>

                  <td>
                    {employee.position}
                  </td>

                  <td>
                    ₹
                    {employee.salary.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td>
                    <span
                      className={
                        employee.status === "Active"
                          ? "employee-status active"
                          : "employee-status inactive"
                      }
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td>
                   <button
                    type="button"
                    onClick={() => onEdit(employee)}
                    className="employee-edit-button"
                >
                    Edit
                </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(employee.id)
                      }
                      className="employee-delete-button"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  )
}

export default EmployeeTable