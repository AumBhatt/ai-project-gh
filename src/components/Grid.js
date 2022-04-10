import React, { useState, useContext, useEffect } from 'react';
import { GridDataContext, GridDataContextProvider } from './context/GridDataContext';
import Cell from './Cell';
import a_star from './logic/a_star';

import './Grid.css'

const Grid = (props) => {
    const [dims, setDims] = useState(
		{
			rows: 0, 
			cols: 0
		}
	);

    const [gridGenerated, setGridGenerated] = useState(false);
    const [originalGrid, setOriginalGrid] = useState([]);
    let startPos, endPos;
    const [pathStatus, setPathStatus] = useState(-1);
    
    const [grid, updateGrid] = useContext(GridDataContext);
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);
    const [gridList, setGridList] = useState(
        [
            {
                key: new Number(),
                coordinates: {
                    row: new Number(),
                    col: new Number(),
                },
                color: new String()
            
            }
        ]
    );
    
    const generateGrid = (dims) => {
        setGridGenerated(true);
        let tempGrid = new Array(dims.rows).fill(0).map(() => new Array(dims.cols).fill(1));
        for(let x=0; x<5*(dims.rows+dims.cols); ++x) {
            let i = Math.floor(Math.random() * dims.rows);
            let j = Math.floor(Math.random() * dims.cols);
            tempGrid[i][j] = Math.floor(Math.random() * 2);
            // console.log(tempGrid[i][j])
        }
        updateGrid(tempGrid);
        setOriginalGrid(tempGrid);

        console.log(dims)
    };

    const clearGrid = () => {
        let tempGrid = grid;
        for(let i in tempGrid) {
            for(let j in tempGrid) {
                if(tempGrid[i][j] === 25 || tempGrid[i][j] === -1 || tempGrid[i][j] === 50)
                {
                    console.log('uncolor');
                    tempGrid[i][j] = 1;
                }
            }
        }
        updateGrid(tempGrid);
        generateGridList();
        setPathStatus(-1);
    }

    const checkStartEnd = () => {
        for(let i in grid) {
            for(let j in grid) {
                if(grid[i][j] === -1) {
                    startPos = {
                        row: i,
                        col: j
                    };
                    console.log('found start')
                    setStart(true);
                    break;
                }
                if(grid[i][j] === 50) {
                    endPos = {
                        row: i,
                        col: j
                    };
                    console.log('found end')
                    setEnd(true);
                    break;
                }
                
            } // j
        } // i
        if(start && end && startPos && endPos)
            drawPath(a_star(grid, startPos, endPos))

        console.log("Grid = start", start, "end",  end)
    };

    const drawPath= (path) => {
        console.log('path :',path)
        let tempGrid = grid;
        if(path.length !==0) {
            for(let i=0; i<path.length - 1; ++i) {
                tempGrid[path[i].x][path[i].y] = 25;
            }
            setPathStatus(1);
        }
        else {
            setPathStatus(0);
            // console.log();
        }
        console.log("temp:", tempGrid)
        updateGrid(tempGrid)
        generateGridList()
    }

    useEffect(() => {
        checkStartEnd()
        // await getGrid();
        generateGridList();
        console.log(grid)
    }, [start, end, grid])
    useEffect(() => {
        generateGrid(dims)
    }, [dims])
    
    const generateGridList = () => {
        let tempList = [];
        let key = -1;
        for (let i=0; i<grid.length; ++i) {
            for(let j=0; j<grid[i].length; ++j) {
                tempList.push(
                    {
                        key: ++key,
                        coordinates: {
                            row: i,
                            col: j
                        },
                        color:
                            (grid[i][j] === 50) ? 'bg_green' :
                            (grid[i][j] === 25) ? 'bg_orange' :
                            (grid[i][j] === -1) ? 'bg_red' : 
                            (grid[i][j] === 0) ? 'bg_black' : 'bg_white' 
                    }
                )
            }
        }
        setGridList(tempList);
        // console.log(tempList)
    }
    
    const styles = {
        gridContainer: {
            gridTemplateRows: `repeat(${dims.rows}, 17px)`,
            gridTemplateColumns: `repeat(${dims.cols}, 17px)`,
    
        },
    };

    return (
        <div className='mainContainer'>
            <div className="dimInputs">
                <div className='inputsContainer'>
                    <div className='inputItems'>Rows: <input type="number" defaultValue="0" id="rowInput" /></div>
                    <div className='inputItems'>Columns: <input type="number" defaultValue="0" id="colInput" /></div>
                </div>
                <div className='btnContainer'>
                    <input
                        className='inputButton'
                        type="button"
                        value="Generate Grid"
                        onClick={
                            () => {
                                let rowCount = parseInt(document.getElementById('rowInput').value);
                                let colCount = parseInt(document.getElementById('colInput').value);
                                if(rowCount > 0 && colCount > 0 && rowCount < 30 && colCount < 30) {
                                    setDims({
                                            rows: rowCount,
                                            cols: colCount
                                        });
                                }
                                else if (rowCount <= 0 || colCount <= 0)
                                {
                                    alert("⚠ Number of rows or columns \ncannot be zero or negative.")
                                }
                                else if (rowCount >= 30 || colCount >= 30)
                                {
                                    alert("⚠ Maximum row/column count reached : \nApplied as the grid may overflow the screen.")
                                }
                                generateGrid(dims)

                                // document.getElementsByClassName('grid-container').style.opacity = 0;
                            }
                        } 
                    />
                    <input
                        className='inputButton'
                        type="button"
                        value="Clear Path"
                        onClick={() => clearGrid()}
                    />
                </div>
                <div className='pathStatus' style={{
                    background: (pathStatus === 1) ? '#44bd32' :(pathStatus === 0) ? '#e84118' : 'inherit'
                }}>
                    Path: {
                        (pathStatus === 1) ? 'Found ✅' :
                        (pathStatus === 0) ? 'Does not exits ❌' : 'Unknown ❓'
                    }
                </div>
            </div> {/* dim-inputs */}
            <div style={styles.gridContainer} className="gridContainer">
                {
                    gridList.map(cell => {
                        return (
                            <Cell
                                key={cell.key}
                                coordinates={cell.coordinates}
                                color={cell.color}
                                change={generateGridList}
                                checkStartEnd={checkStartEnd}
                            ></Cell>
                        );
                    })
                }
                {/* <input type="button" value="update" onClick={() => updateGrid([1])} /> */}
                {/* <div>Grid : {grid}</div> */}
                
            </div>
            
        </div>
    );
}



export default Grid;