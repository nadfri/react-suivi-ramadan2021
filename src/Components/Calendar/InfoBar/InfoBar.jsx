import React from 'react';
import "./InfoBar.scss"

function InfoBar() {

    

    return (
        <div className="InfoBar">
            <span className="date">
                {new Intl.DateTimeFormat('fr-FR-u-ca-islamic', {day: 'numeric', month: 'long',weekday: 'long',year : 'numeric'}).format(Date.now())}
                </span>
        </div>
    );
}

export default InfoBar;