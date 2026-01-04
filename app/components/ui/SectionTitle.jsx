import React from 'react'

const SectionTitle = ({ title, subtitle, span, subtitle_end, description }) => {
    return (
        <div className="section-title">
            <h2 className="first-section-title">{title}</h2>
            <p>
                {subtitle && subtitle} {span && <span>{span}</span>} {subtitle_end && subtitle_end}
            </p>
            {
                description && (
                    <p>
                        {description}
                    </p>
                )
            }
        </div >
    )
}

export default SectionTitle