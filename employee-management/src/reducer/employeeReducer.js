export const initialEmployeeState = {
  employees: [],
  loading: false,
  error: null,
}

export function employeeReducer(state, action) {
  switch (action.type) {
    case "FETCH_EMPLOYEES_START":
      return {
        ...state,
        loading: true,
        error: null,
      }

    case "FETCH_EMPLOYEES_SUCCESS":
      return {
        ...state,
        employees: action.payload,
        loading: false,
        error: null,
      }

    case "FETCH_EMPLOYEES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }


            case "FETCH_EMPLOYEES_ERROR":
        return {
            ...state,
            loading: false,
            error: action.payload,
        }

case "ADD_EMPLOYEE":
  return {
    ...state,
    employees: [...state.employees, action.payload],
  }

case "UPDATE_EMPLOYEE":
  return {
    ...state,
    employees: state.employees.map((employee) =>
      employee.id === action.payload.id
        ? action.payload
        : employee
    ),
  }

case "DELETE_EMPLOYEE":
  return {
    ...state,
    employees: state.employees.filter(
      (employee) => employee.id !== action.payload
    ),
  }
        default:
        return state
  }
}