import React, { useEffect, useState } from 'react';

function Board() {
    const [values, setValues] = useState(Array(10).fill('-'));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [PlayerOne, setPlayerOne] = useState('');
    const [PlayerTwo, setPlayerTwo] = useState('');
    const [gameHistory, setGameHistory] = useState([]);
    const [playerNameBoard, setplayerNameBoard] = useState(false)
    const [playerInput, setplayerInput] = useState(true)


    function checkWin(values) {
        // console.log(values, 'values');
        const wins = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [3, 6, 9], [1, 4, 7], [2, 5, 8],
            [1, 4, 8], [3, 5, 7]
        ];

        for (let i = 0; i < wins.length; i++) {

            const [a, b, c] = wins[i];
            if (values[a] !== '-' && values[a] === values[b] && values[a] === values[c]) {
                return values[a];
            }
        }

        return null;
    }

    const handleClick = (index) => {
        if (values[index] === '-' && winner === null) {
            const newValues = [...values];
            newValues[index] = currentPlayer;
            setValues(newValues);
            setCurrentPlayer(currentPlayer === 'X' ? '0' : 'X');

            const win = checkWin(newValues);
            console.log(newValues, 'win');

            if (win) {
                setWinner(win);
                updateGameHistory(win);
            }

            if (newValues.filter(value => value === '-').length === 1) {
                alert('Match Draw');
                handleReset();
            }
        }
    };

    const updateGameHistory = (win) => {
        const newGameHistory = [...gameHistory,
        {
            winner: win === 'X' ? PlayerOne : PlayerTwo,
            loser: win === 'X' ? PlayerTwo : PlayerOne,
        }
        ];
        setGameHistory(newGameHistory);
    };

    const handleReset = () => {
        setValues(Array(10).fill('-'));
        setCurrentPlayer('X');
        setWinner(null);
    };

    const handleResetPlayer = () => {
        setPlayerOne('');
        setPlayerTwo('');
        setWinner(null);
        handleReset();
        setplayerNameBoard(false);
        setplayerInput(true);
    };

    const handleSubmit = () => {
        if (PlayerOne && PlayerTwo) {
            setplayerNameBoard(true);
            setplayerInput(false)
        } else {
            alert('please provide player names')
        }
    };
    return (
        <div className="container mt-5">
            <h2 className='text-center mb-5'>{winner ? `Winner is : ${winner === 'X' ? PlayerOne : winner === '0' ? PlayerTwo : ''}` : `Current Player is : ${currentPlayer === 'X' ? PlayerOne : PlayerTwo}`}</h2>

            {playerNameBoard && (
                <>
                    <h2>Players Names</h2>
                    <p>Player One : {PlayerOne}</p>
                    <p>Player Two : {PlayerTwo}</p>
                </>
            )}

            {playerInput && (
                <div className="container d-flex">
                    <label htmlFor="" className='ms-5'>Player One : </label>
                    <input type="text" value={PlayerOne} onChange={(e) => setPlayerOne(e.target.value)} className="form-control w-25 ms-5" />

                    <label htmlFor="" className='ms-4'>Player Two : </label>
                    <input type="text" value={PlayerTwo} onChange={(e) => setPlayerTwo(e.target.value)} className="form-control w-25 ms-5" />

                    <button onClick={handleSubmit} className='btn btn-success ms-5'>Submit</button>
                </div>
            )}
            <button onClick={handleResetPlayer} className='btn btn-danger ms-5'>Reset Names</button>

            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col">
                        <div className="box1 d-flex justify-content-center">
                            <button className='border btn btn-dark btn-lg' onClick={() => handleClick(1)} disabled={values[1] !== '-'}>{values[1]}</button>
                            <button className='border btn btn-dark btn-lg' onClick={() => handleClick(2)} disabled={values[2] !== '-'}>{values[2]}</button>
                            <button className='border btn btn-dark btn-lg' onClick={() => handleClick(3)} disabled={values[3] !== '-'}>{values[3]}</button>
                        </div>
                        <div className="box2 d-flex justify-content-center">
                            <button className='border btn btn-dark btn-lg' onClick={() => handleClick(4)} disabled={values[4] !== '-'}>{values[4]}</button>
                            <button className='border btn btn-dark btn-lg' onClick={() => handleClick(5)} disabled={values[5] !== '-'}>{values[5]}</button>
                            <button className='border btn btn-dark btn-lg' onClick={() => handleClick(6)} disabled={values[6] !== '-'}>{values[6]}</button>
                        </div>
                        <div className="box3 d-flex justify-content-center">
                            <button className='border btn btn-dark btn-lg' onClick={() => handleClick(7)} disabled={values[7] !== '-'}>{values[7]}</button>
                            <button className='border btn btn-dark btn-lg' onClick={() => handleClick(8)} disabled={values[8] !== '-'}>{values[8]}</button>
                            <button className='border btn btn-dark btn-lg' onClick={() => handleClick(9)} disabled={values[9] !== '-'}>{values[9]}</button>
                        </div>
                        <div className="container d-flex justify-content-center mt-3">
                            <button className='btn btn-danger ' onClick={handleReset}>Reset Game</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='mt-5' />
            <div className="container mt-3">
                <caption className='text-center d-block mt-5'>Game History </caption>
                <table className="table table-stripped table-hover table-bordered">
                    <thead className='table-success text-center'>
                        <tr>
                            <th>No of turns</th>
                            <th>Winner</th>
                            <th>Loser</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameHistory.map((game, index) => (
                            // console.log(game, 'this is game'),
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{game.winner}</td>
                                <td>{game.loser}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Board;
