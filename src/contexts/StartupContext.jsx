import { createContext, useContext, useState, useEffect } from "react";

const StartupContext = createContext()

export const useStartupContext = () => useContext(StartupContext)

export const StartupProvider = ({ children }) => {
    const [checkRole, setCheckRole] = useState(() => {
        const storedRole = sessionStorage.getItem('role');
        return storedRole ? JSON.parse(storedRole) : []
    })

    useEffect(() => {
        sessionStorage.setItem('role', JSON.stringify(checkRole))
    }, [checkRole])

    const selectedRole = (role) => {
        setCheckRole(role);
    }

    // const addToFavs = (movie) => {
    //     setFavorites((prev) => [...prev, movie])
    // }

    // const removeFromFavs = (movieId) => {
    //     setFavorites((prev) => prev.filter(movie => movie.id !== movieId))
    // }

    // const isFavs = (movieId) => {
    //     return favorites.some(movie => movie.id === movieId)
    // }

    const value = {
        selectedRole,
        checkRole,
    }

    return <StartupContext.Provider value={value}>
        {children}
    </StartupContext.Provider>
}