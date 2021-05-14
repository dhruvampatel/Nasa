import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ handleDate }) {

    return (
        <div className="navbar">
            <ul>
                <Link className="link" to="/" exact >Take Me Home</Link>
            </ul>
        </div>
    );
}