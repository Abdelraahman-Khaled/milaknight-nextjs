import React from 'react'
import SectionTitle from './SectionTitle'

const HeaderDescription = ({ title, subtitle, span, desc, subtitle_end }) => {


    return (
        <div className="row align-items-center section-row">
            <div className="col-lg-7">
                <SectionTitle
                    title={title}
                    subtitle={subtitle}
                    span={span}
                    subtitle_end={subtitle_end}
                />
            </div>
            <div className="col-lg-5">
                <div className="section-content-btn">
                    <div className="section-title-content">
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderDescription