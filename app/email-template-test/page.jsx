import React from 'react';
import EmailResponseTemplate from '../components/EmailResponseTemplate';

const EmailTemplateTestPage = () => {
    const dummyData = {
        name: 'John Doe',
        phone: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
        subject: 'Inquiry about Services',
        message: 'Hello,\n\nI am interested in your consultancy services. Please contact me at your earliest convenience.\n\nBest regards,\nJohn',
    };

    return (
        <div className="container mt-5">
            <h1>Email Template Preview</h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <EmailResponseTemplate {...dummyData} />
                </div>
            </div>
        </div>
    );
};

export default EmailTemplateTestPage;
