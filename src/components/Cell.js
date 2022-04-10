import { useContext, useEffect, useState } from 'react';
import { GridDataContext, GridDataContextProvider } from './context/GridDataContext';
import a_star from './logic/a_star';

import './Cell.css'

const Cell = (props) => {
    const [grid, updateGrid] = useContext(GridDataContext);

    let start = false;
    let end = false;
    let startPos, endPos;

    const colorCell = (row, col, val) => {
        let temp = grid;
        temp[row][col] = val;
        updateGrid(temp);
        props.change();
    }
    const applyAstar = () => {
        a_star(grid, startPos, endPos);
    };
    return (
        <div className='cellItem' style={{...styles.cell, ...styles[props.color]}}
            onClick={
                () => {
                        let color;
                        let row = props.coordinates.row, col = props.coordinates.col;
                        if(props.color !== 'bg_black') {
                            
                            for(let i in grid) {
                                for(let j in grid) {
                                    if(grid[i][j] === -1) {
                                        console.log('cell found start')
                                        start = true;
                                        startPos = {
                                            row: i, 
                                            col: j
                                        }
                                        break;
                                    }
                                    if(grid[i][j] === 50) {
                                        console.log('cell found end')
                                        end = true;
                                        endPos = {
                                            row: i, 
                                            col: j
                                        }
                                        break;
                                    }
                                } // j
                            } // i

                            if(!start && !end) {
                                color = -1;
                                start = !start;
                                colorCell(row, col, color);
                            }
                            else if(!end) {
                                color = 50;
                                end = !end;
                                colorCell(row, col, color);
                            }
                            props.checkStartEnd()
                            console.log("cell = start:", start, "end:", end)
                            
                        }
                    }
                }>
        </div>
    );
}

const styles = {
    cell: {
        
    },
    bg_white: {
        backgroundColor: 'white',
    },
    bg_black: {
        color: 'white',
        backgroundColor: 'inherit',
    },
    bg_green: {
        color: 'black',
        backgroundColor: 'green',
    },
    bg_red: {
        color: 'black',
        backgroundColor: 'red',
    },
    bg_orange: {
        color: 'black',
        backgroundColor: 'orange',
    },
};

export default Cell;