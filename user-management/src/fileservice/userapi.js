const BASE_URL = "http://localhost:9001";

export const loginUser = async (email, password) => {

    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 

        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {  
        throw new Error(
            data.message || "Login failed"
        );
    }

    return data;
};

export const getUsers = async (token) => {

    const response = await fetch(
     `${BASE_URL}/userProfiles`,
        {
            method: "GET",

                    headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch users"
        );
    }

    return data;
};

export const addUser = async (user, token) => {

    const response = await fetch(
        `${BASE_URL}/userProfiles`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(user),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to add user"
        );
    }

    return data;
};

export const updateUser = async (id, user, token) => {

    const response = await fetch(
        `${BASE_URL}/userProfiles/${id}`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(user),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update user"
        );
    }

    return data;
};

export const deleteUser = async (id, token) => {

    const response = await fetch(
        `${BASE_URL}/userProfiles/${id}`,
        { method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {

                      const data = await response.json();

        throw new Error(
            data.message || "Failed to delete user"
        );
    }

    return id;
}; 