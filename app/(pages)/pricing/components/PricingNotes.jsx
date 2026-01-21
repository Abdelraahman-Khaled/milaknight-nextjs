"use client";
import React from 'react';
import { pricingNotes } from '@/app/data/pricingData';

const PricingNotes = ({ language }) => {
    return (
        <section className="notes">
            <div className="container">
                <h4>{pricingNotes.title[language]}</h4>
                {pricingNotes.notes[language].map((note, idx) => (
                    <p key={idx}>{note}</p>
                ))}
            </div>
        </section>
    );
};

export default PricingNotes;
