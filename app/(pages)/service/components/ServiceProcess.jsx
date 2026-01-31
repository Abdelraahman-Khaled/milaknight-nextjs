"use client";
import React, { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from '../../../context/LanguageContext';

const ServiceProcess = ({ step }) => {
    const { language } = useContext(LanguageContext);
    return (
        <div className="process-step-item">
            <div className="process-step-content">
                <div className="process-step-header">
                    <div className="icon-box">
                        <Image alt={step.title} src={step.icon} width={50} height={50} />
                    </div>
                    <div className="process-step-no">
                        <h3>{language === 'ar' ? 'خطوة' : 'Step'} <span>{step.step_no.replace(/[^0-9]/g, '')}</span></h3>
                    </div>
                </div>
                <div className="process-step-body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                </div>
            </div>
            <div className="process-step-image">
                <figure className="image-anime">
                    <Image alt={step.image_alt || step.title} src={step.image} width={400} height={300} loading="lazy" />
                </figure>
            </div>
        </div>
    );
};

export default ServiceProcess;
