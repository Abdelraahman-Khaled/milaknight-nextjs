'use client';
import SectionTitle from '@/app/components/ui/SectionTitle'
import TextBox from '@/app/components/ui/TextBox'
import Link from 'next/link'
import React, { useContext } from 'react'
import { aboutAgencyData } from './data'
import { LanguageContext } from '@/app/context/LanguageContext'

const AboutAgency = () => {
    const { language } = useContext(LanguageContext);
    return (
        <div className='about-agency'>
            <div className="container">
                <div className='row'>
                    <div className="col-12">
                        <div className="about-agency-content">
                            <SectionTitle title={aboutAgencyData[language].title} description={aboutAgencyData[language].description} />
                        </div>
                        {/* cards */}
                        <div className="col-12">
                            <div className="about-agency-list">
                                {
                                    aboutAgencyData[language].cards.map((card, index) => (
                                        <TextBox key={index} className={"about-agency-item agency-item-content"} title={card.title} img={card.img} text={card.text} alt={card.alt} />
                                    ))
                                }
                            </div>

                        </div>
                        <div className="section-btn mt-4 text-center">
                            <Link href={`/${language}/about`} className="btn-default">{aboutAgencyData[language].linkText}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutAgency