
import { useEffect, useState } from "react";
import { getUsers } from "../fileservice/userapi";
import useUsers from "../hooks/useuser";
import UserItem from "./useritem";
import "../App.css";

function UserList({ onEdit, onDelete }) {
    const { state, dispatch } = useUsers();

    const [searchText, setSearchText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    
    const [filterField, setFilterField] = useState("all");
    const [filterValue, setFilterValue] = useState("");

   
    const [sortOrder, setSortOrder] = useState("default");

   
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    
    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                dispatch({
                    type: "FETCH_USERS_ERROR",
                    payload: "Authentication token not found",
                });
                return;
            }

            try {
                dispatch({
                    type: "FETCH_USERS_START",
                });

                const data = await getUsers(token);

                dispatch({
                    type: "FETCH_USERS_SUCCESS",
                    payload: data,
                });
            } catch (error) {
                dispatch({
                    type: "FETCH_USERS_ERROR",
                    payload: error.message,
                });
            }
        };

        fetchUsers();
    }, [dispatch]);

    
    const handleSearch = () => {
        setSearchQuery(searchText.trim());
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setSearchText("");
        setSearchQuery("");
        setCurrentPage(1);
    };

    
    const handleClearFilter = () => {
        setFilterField("all");
        setFilterValue("");
        setCurrentPage(1);
    };

   
    const filteredUsers = state.users.filter((user) => {
        const query = searchQuery.toLowerCase();

        const matchesSearch =
            (user.name || "").toLowerCase().includes(query) ||
            (user.email || "").toLowerCase().includes(query) ||
            (user.username || "").toLowerCase().includes(query) ||
            (user.phone || "").toLowerCase().includes(query);

        const matchesFilter =
            filterField === "all" ||
            String(user[filterField] || "")
                .toLowerCase()
                .includes(filterValue.trim().toLowerCase());

        return matchesSearch && matchesFilter;
    });

    
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        const salaryA = Number(a.salary) || 0;
        const salaryB = Number(b.salary) || 0;

        if (sortOrder === "lowToHigh") {
            return salaryA - salaryB;
        }

        if (sortOrder === "highToLow") {
            return salaryB - salaryA;
        }

        return 0;
    });

   
    const totalPages = Math.ceil(
        sortedUsers.length / usersPerPage
    );

    const startIndex = (currentPage - 1) * usersPerPage;

    const currentUsers = sortedUsers.slice(
        startIndex,
        startIndex + usersPerPage
    );

   
    useEffect(() => {
        if (totalPages === 0) {
            setCurrentPage(1);
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    
    if (state.loading) {
        return (
            <div className="users-page">
                <div className="status-card">
                    <div className="loader"></div>
                    <h2>Loading Users...</h2>
                    <p>
                        Please wait while users are being loaded.
                    </p>
                </div>
            </div>
        );
    }

    
    if (state.error) {
        return (
            <div className="users-page">
                <div className="status-card error-card">
                    <h2>Something went wrong</h2>
                    <p>{state.error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="users-page">
            <div className="users-container">

                {/* Header */}
                <div className="users-header">
                    <div className="users-title">
                        <h1>User Management</h1>
                        <p>Manage registered users</p>
                    </div>

                    <div className="users-header-right">

                      
                        <div className="search-box">
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) =>
                                    setSearchText(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                                placeholder="Search users..."
                            />

                            {searchQuery && (
                                <button
                                    type="button"
                                    className="clear-search"
                                    onClick={handleClearSearch}
                                >
                                    X
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            className="search-button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                      
                        <div className="filter-box">
                            <select
                                value={filterField}
                                onChange={(e) => {
                                    setFilterField(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="all">
                                    All Fields
                                </option>
                                <option value="name">
                                    Name
                                </option>
                                <option value="email">
                                    Email
                                </option>
                                <option value="username">
                                    Username
                                </option>
                                <option value="phone">
                                    Phone
                                </option>
                            </select>

                            <input
                                type="text"
                                value={filterValue}
                                onChange={(e) => {
                                    setFilterValue(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Filter value..."
                            />

                            <button
                                type="button"
                                onClick={handleClearFilter}
                            >
                                Clear Filter
                            </button>
                        </div>

                       
                        <div className="sort-box">
                            <select
                                value={sortOrder}
                                onChange={(e) => {
                                    setSortOrder(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="default">
                                    Default Order
                                </option>
                                <option value="lowToHigh">
                                    Salary: Low to High
                                </option>
                                <option value="highToLow">
                                    Salary: High to Low
                                </option>
                            </select>
                        </div>

                        
                    </div>
                </div>

            
                {state.users.length === 0 ? (
                    <div className="status-card">
                        <h2>No Users Found</h2>
                        <p>
                            There are currently no users available.
                        </p>
                    </div>
                ) : sortedUsers.length === 0 ? (
                    <div className="status-card">
                        <h2>No Matching Users</h2>
                        <p>
                            No users found matching your search or filter.
                        </p>

                        <button
                            type="button"
                            className="clear-search-result"
                            onClick={() => {
                                handleClearSearch();
                                handleClearFilter();
                            }}
                        >
                            Clear Search and Filter
                        </button>
                    </div>
                ) : (
                    <>
                     
                        <div className="users-grid">
                            {currentUsers.map((user) => (
                                <UserItem
                                    key={user.id}
                                    user={user}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>

                      
                        <div className="pagination">
                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            <span>
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserList;