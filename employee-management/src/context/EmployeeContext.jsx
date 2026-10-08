import { createContext, useContext, useEffect, useReducer } from "react"

import {
  employeeReducer,
  initialEmployeeState,
} from "@/reducer/employeeReducer"

import { getEmployees } from "@/services/employeeApi"

const EmployeeContext = createContext()

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(
    employeeReducer,
    initialEmployeeState
  )

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        dispatch({ type: "FETCH_EMPLOYEES_START" })

        const data = await getEmployees()

        dispatch({
          type: "FETCH_EMPLOYEES_SUCCESS",
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: "FETCH_EMPLOYEES_ERROR",
          payload: error.message,
        })
      }
    }

    fetchEmployees()
  }, [])

  useEffect(() => {
    if (state.employees.length > 0) {
      localStorage.setItem(
        "employees",
        JSON.stringify(state.employees)
      )
    }
  }, [state.employees])

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployee() {
  return useContext(EmployeeContext)
}