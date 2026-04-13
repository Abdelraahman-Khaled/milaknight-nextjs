import React from 'react';

export default function Loading() {
    return (
        <div className="react-preloader" style={{ display: 'flex' }}>
            <div className="loading-container">
                <div className="loading"></div>
                <div id="loading-icon">
                    <img alt="Milaknight loader" src="/images/icons/loader.svg" width="100" height="100" />
                </div>
            </div>
        </div>
    );
}
