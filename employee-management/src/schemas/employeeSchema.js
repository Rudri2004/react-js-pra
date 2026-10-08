import { z } from "zod"

export const employeeSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  department: z
    .string()
    .min(1, "Department is required"),

  position: z
    .string()
    .min(1, "Position is required"),

  salary: z
    .number({
      message: "Salary is required",
    })
    .positive("Salary must be greater than 0"),

  status: z.enum(["Active", "Inactive"]),
})