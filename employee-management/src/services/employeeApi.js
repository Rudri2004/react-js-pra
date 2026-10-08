const initialEmployees = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    department: "Engineering",
    position: "Frontend Developer",
    salary: 65000,
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    department: "Design",
    position: "UI/UX Designer",
    salary: 58000,
    status: "Active",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    email: "rahul@example.com",
    department: "Engineering",
    position: "Backend Developer",
    salary: 72000,
    status: "Active",
  },
  {
    id: 4,
    name: "Ananya Singh",
    email: "ananya@example.com",
    department: "HR",
    position: "HR Manager",
    salary: 62000,
    status: "Active",
  },
  {
    id: 5,
    name: "Vikram Shah",
    email: "vikram@example.com",
    department: "Marketing",
    position: "Marketing Specialist",
    salary: 54000,
    status: "Inactive",
  },
]

export const getEmployees = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedEmployees =
        localStorage.getItem("employees")

      if (savedEmployees) {
        resolve(JSON.parse(savedEmployees))
      } else {
        localStorage.setItem(
          "employees",
          JSON.stringify(initialEmployees)
        )

        resolve(initialEmployees)
      }
    }, 1000)
  })
}

export const addEmployee = async (employee) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedEmployees =
        localStorage.getItem("employees")

      const employees = savedEmployees
        ? JSON.parse(savedEmployees)
        : []

      const newEmployee = {
        ...employee,
        id: Date.now(),
      }

      const updatedEmployees = [
        ...employees,
        newEmployee,
      ]

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      )

      resolve(newEmployee)
    }, 500)
  })
}
export const updateEmployee = async (employee) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedEmployees =
        localStorage.getItem("employees")

      const employees = savedEmployees
        ? JSON.parse(savedEmployees)
        : []

      const updatedEmployees = employees.map(
        (existingEmployee) =>
          existingEmployee.id === employee.id
            ? employee
            : existingEmployee
      )

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      )

      resolve(employee)
    }, 500)
  })
}