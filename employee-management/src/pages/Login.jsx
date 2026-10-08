import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

import { loginSchema } from "@/schemas/loginSchema"
import { loginUser } from "@/services/authApi"
import { useAuth } from "@/context/AuthContext"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setLoginError("")

      const response = await loginUser(
        data.email,
        data.password
      )

      login(response.user, response.token)

      navigate("/dashboard")
    } catch (error) {
      setLoginError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="login-logo">
            EM
          </div>

          <h1 className="login-title">
            Welcome Back
          </h1>

          <p className="login-subtitle">
            Sign in to your employee management account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
        >
          <div className="login-field">
            <Label htmlFor="email">
              Email Address
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="login-field">
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {loginError && (
            <p className="text-sm text-red-500">
              {loginError}
            </p>
          )}

          <Button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="login-footer">
          Employee Management System
        </p>

      </div>
    </div>
  )
}

export default Login