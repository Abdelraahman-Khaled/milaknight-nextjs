"use client";
import React, { useState } from 'react';

const ConsultancyTabs = ({ c }) => {
    const [activeTab, setActiveTab] = useState('apply');

    return (
        <div className="our-consultancy-box">
            <div className="our-consultancy-nav">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'apply' ? 'active' : ''}`} onClick={() => setActiveTab('apply')}>
                            {c.tab_goal}
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'important' ? 'active' : ''}`} onClick={() => setActiveTab('important')}>
                            {c.tab_vision}
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'immigration' ? 'active' : ''}`} onClick={() => setActiveTab('immigration')}>
                            {c.tab_message}
                        </button>
                    </li>
                </ul>
            </div>

            <div className="tab-content">
                <div className={`consultancy-tab-item tab-pane fade ${activeTab === 'apply' ? 'show active' : ''}`}>
                    <div className="row align-items-center">
                        <div className="col-12"><p>{c.goal_text}</p></div>
                    </div>
                </div>
                <div className={`consultancy-tab-item tab-pane fade ${activeTab === 'important' ? 'show active' : ''}`}>
                    <div className="row align-items-center">
                        <div className="col-12"><p>{c.vision_text}</p></div>
                    </div>
                </div>
                <div className={`consultancy-tab-item tab-pane fade ${activeTab === 'immigration' ? 'show active' : ''}`}>
                    <div className="row align-items-center">
                        <div className="col-12"><p>{c.message_text}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsultancyTabs;
