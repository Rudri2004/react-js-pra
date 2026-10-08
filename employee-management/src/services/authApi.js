export const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        email === "admin@example.com" &&
        password === "admin123"
      ) {
        resolve({
          token: "fake-auth-token-123",
          user: {
            id: 1,
            name: "Admin User",
            email: "admin@example.com",
          },
        })
      } else {
        reject(new Error("Invalid email or password"))
      }
    }, 1000)
  })
}