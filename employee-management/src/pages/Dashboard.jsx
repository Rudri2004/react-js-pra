import { useState } from "react"

import DashboardHeader from "@/components/DashboardHeader"
import EmployeeStats from "@/components/EmployeeStats"
import EmployeeForm from "@/components/EmployeeForm"
import EmployeeTable from "@/components/EmployeeTable"

function Dashboard() {
  const [editingEmployee, setEditingEmployee] = useState(null)

  const handleEdit = (employee) => {
    setEditingEmployee(employee)
  }

  const handleCancelEdit = () => {
    setEditingEmployee(null)
  }

  return (
    <div className="dashboard-page">
      <DashboardHeader />

      <main className="dashboard-content">
        <div className="dashboard-welcome">
          <h2>Dashboard Overview</h2>
          <p>
            Manage your employees and monitor your organization.
          </p>
        </div>

        <EmployeeStats />

        <EmployeeForm
          editingEmployee={editingEmployee}
          onCancelEdit={handleCancelEdit}
        />

        <EmployeeTable
          onEdit={handleEdit}
        />
      </main>
    </div>
  )
}

export default Dashboard