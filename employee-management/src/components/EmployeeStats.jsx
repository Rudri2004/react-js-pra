import { useEmployee } from "@/context/EmployeeContext"

function EmployeeStats() {
  const { state } = useEmployee()

  const totalEmployees = state.employees.length

  const activeEmployees = state.employees.filter(
    (employee) => employee.status === "Active"
  ).length

  const inactiveEmployees = state.employees.filter(
    (employee) => employee.status === "Inactive"
  ).length

  const totalSalary = state.employees.reduce(
    (total, employee) => total + employee.salary,
    0
  )

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
    },
    {
      title: "Active Employees",
      value: activeEmployees,
    },
    {
      title: "Inactive Employees",
      value: inactiveEmployees,
    },
    {
      title: "Total Salary",
      value: `₹${totalSalary.toLocaleString("en-IN")}`,
    },
  ]

  if (state.loading) {
    return <p>Loading employee statistics...</p>
  }

  if (state.error) {
    return <p>{state.error}</p>
  }

  return (
    <div className="employee-stats">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="employee-stat-card"
        >
          <p className="employee-stat-title">
            {stat.title}
          </p>

          <h3 className="employee-stat-value">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default EmployeeStats