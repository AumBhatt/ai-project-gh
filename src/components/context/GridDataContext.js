import React, { createContext, useEffect, useState } from 'react';


const GridDataContext = createContext();

const GridDataContextProvider = ({ children }) => {
    const [grid, setGrid, getGrid] = useState([]); // The problem
    const updateGrid = (newGrid) => {
        console.log(newGrid)
        setGrid(newGrid);
    }

    return (
        <GridDataContext.Provider value={[ grid, updateGrid, getGrid ]}>
            {children}
        </GridDataContext.Provider>
    );
};

export { GridDataContext, GridDataContextProvider };