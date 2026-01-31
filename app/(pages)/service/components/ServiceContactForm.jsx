"use client";
import React, { useState, useEffect, useContext } from 'react';
import emailjs from 'emailjs-com';
import { LanguageContext } from '@/app/context/LanguageContext';

const ServiceContactForm = ({ serviceName, ctaData }) => {
    const { language } = useContext(LanguageContext);
    const [status, setStatus] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: serviceName,
        time: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert(language === 'ar' ? "الاسم مطلوب." : "Name is required.");
            return;
        }

        if (!formData.phone.trim() && !formData.email.trim()) {
            alert(language === 'ar' ? "يرجى إدخال رقم الهاتف أو البريد الإلكتروني على الأقل." : "Please enter at least a phone number or email.");
            return;
        }

        const currentFormData = {
            ...formData,
            time: new Date().toLocaleString()
        };

        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

        emailjs.send(serviceID, templateID, currentFormData, userID)
            .then(() => {
                setStatus('success');
                setFormData({ ...formData, name: '', phone: '', email: '' });
                setTimeout(() => setStatus(null), 5000);
            }, (err) => {
                alert(language === 'ar' ? "تعذر الإرسال. حاول لاحقاً." : "Failed to send. Try again later.");
                console.error('EmailJS Error:', err);
                setStatus('error');
            });
    };

    return (
        <div className="contact-us-form me-0 mt-4">
            <form onSubmit={handleSubmit} className="row">
                <div className="form-group col-md-12 mb-4">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder={language === 'ar' ? "اسمك" : "Your Name"}
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-md-5 mb-4">
                    <input
                        type="number"
                        name="phone"
                        className="form-control"
                        placeholder={language === 'ar' ? "رقم الهاتف" : "Phone Number"}
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4 mb-md-0 mt-md-3 col-md-2 text-center">
                    <h4>{language === 'ar' ? "أو" : "OR"}</h4>
                </div>

                <div className="form-group col-md-5 mb-4">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder={language === 'ar' ? "البريد الإلكتروني" : "Email Address"}
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-lg-12">
                    <div className="contact-form-btn">
                        <button type="submit" className="btn-highlighted">
                            {ctaData.btn_text}
                        </button>
                    </div>
                </div>

                {status === 'success' && (
                    <div className="col-12 mt-3 text-center">
                        <div className="alert alert-success">
                            {language === 'ar' ? "تم إرسال طلبك بنجاح!" : "Your request has been sent successfully!"}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ServiceContactForm;
