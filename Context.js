import {createContext,useState} from "react"

const MoviesCards = createContext();

const MovieContext = ({children}) => {
    const [seats,setSeats] = useState([]);

    const [occupied,setOccupied] = useState([]);

    const [ticket,setTicket] = useState([]);
    return (
        <MoviesCards.Provider value={{seats,setSeats,occupied,setOccupied,ticket,setTicket}}>
            {children}
        </MoviesCards.Provider>
    )
}

export {MoviesCards,MovieContext};