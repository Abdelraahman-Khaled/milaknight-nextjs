import React from 'react'

const TextBox = ({ title, text, className }) => {
    return (
        <div className={`about-us-body ${className}`}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>)
}

export default TextBox