import { useEmployee } from "@/context/EmployeeContext"

function useEmployees() {
  const { state, dispatch } = useEmployee()

  return {
    employees: state.employees,
    loading: state.loading,
    error: state.error,
    dispatch,
  }
}

export default useEmployees