const initialState = {
    users: [],
    loading: false,
    error: null,
};


export const userReducer = (state, action) => {

    switch (action.type) {
        case "FETCH_USERS_START":

            return {
                ...state,
                loading: true,
                error: null,
            };

        case "FETCH_USERS_SUCCESS":

            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null,
            };


        case "FETCH_USERS_ERROR":

            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "ADD_USER_SUCCESS":

            return {
                ...state,

                users: [
                    ...state.users,
                    action.payload,
                ],

                error: null,
            };

        case "UPDATE_USER_SUCCESS":

            return {
                ...state,

                users: state.users.map((user) =>
                    user.id === action.payload.id
                        ? action.payload
                        : user
                ),

                error: null,
            };

        case "DELETE_USER_SUCCESS":

            return {
                ...state,

                users: state.users.filter(
                    (user) =>
                        user.id !== action.payload
                ),

                error: null,
            };


        default:
            return state;
    }
};


export { initialState };