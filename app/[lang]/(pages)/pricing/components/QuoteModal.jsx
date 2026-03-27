"use client";
import React from 'react';

const QuoteModal = ({ show, onClose, selectedPackage, translations }) => {
    if (!show) return null;

    return (
        <section className="order-popup" style={{ display: 'block' }}>
            <div className="overlay" onClick={onClose}>
                <div className="contact-us-form me-0" onClick={(e) => e.stopPropagation()}>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={onClose}
                        style={{ position: 'absolute', top: '15px', right: '15px' }}
                    ></button>
                    <form id="formContactPricing" method="POST">
                        <div className="row">
                            <div className="mb-4 form-group col-md-12">
                                <input
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    placeholder={translations.yourName}
                                    required
                                />
                            </div>
                            <div className="mb-4 form-group col-md-5">
                                <input
                                    id="phone"
                                    name="phone"
                                    className="form-control"
                                    placeholder={translations.phoneNumber}
                                    type="number"
                                />
                            </div>
                            <div className="mb-4 col-md-2 mb-md-0 text-center">
                                <h4>{translations.or}</h4>
                            </div>
                            <div className="mb-4 form-group col-md-5">
                                <input
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder={translations.email}
                                    type="email"
                                />
                            </div>
                            <input type="hidden" name="service" value={selectedPackage} />
                            <div className="col-lg-12">
                                <div className="contact-form-btn">
                                    <button className="btn-highlighted" type="submit">
                                        {translations.sendMessage}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default QuoteModal;
