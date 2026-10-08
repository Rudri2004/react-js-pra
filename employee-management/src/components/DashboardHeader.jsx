import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

import { Button } from "@/components/ui/button"

function DashboardHeader() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="dashboard-header">

      <div className="dashboard-brand">
        <div className="dashboard-logo">
          EM
        </div>

        <div>
          <h1 className="dashboard-title">
            Employee Management
          </h1>

          <p className="dashboard-subtitle">
            Admin Dashboard
          </p>
        </div>
      </div>

      <div className="dashboard-user">

        <div className="dashboard-user-info">
          <p className="dashboard-user-name">
            {user?.name}
          </p>

          <p className="dashboard-user-email">
            {user?.email}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
        >
          Logout
        </Button>

      </div>

    </header>
  )
}

export default DashboardHeader