import Image from 'next/image'
import React from 'react'

const TextBox = ({ title, text, className, img }) => {
    return (
        <div className={` ${className}`}>
            {
                img &&
                (
                    <div className="icon-box">
                        <Image alt="شركة تسويق رقمي" src={img} width={50} height={50} />
                    </div>
                )
            }
            <h3>{title}</h3>
            <p>{text}</p>
        </div>)
}

export default TextBox