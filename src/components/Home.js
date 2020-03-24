import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

export default function home() {
    return (
        <Fragment>
            <h1>Quiz App</h1>
            <Link to="/game" className="btn">Start</Link>
            <Link to="/high-scores" className="btn">High Scores</Link>
        </Fragment>
    )
}
