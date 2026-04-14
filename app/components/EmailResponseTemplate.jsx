import React from 'react';

const EmailResponseTemplate = ({ name, phone, email, subject, message }) => {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{subject || 'No Subject'}</h5>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <strong>From:</strong> {name || 'Unknown'} &lt;
                    <Link href={`mailto:${email}`}>{email || 'No Email'}</Link>&gt;
                </div>
                <div className="mb-3">
                    <strong>Phone:</strong> {phone || 'No Phone provided'}
                </div>
                <hr />
                <div className="mb-3">
                    <strong>Message:</strong>
                    <p className="mt-2" style={{ whiteSpace: 'pre-wrap' }}>
                        {message || 'No message content.'}
                    </p>
                </div>
            </div>
            <div className="card-footer text-muted text-end">
                <small>Received via Your Website</small>
            </div>
        </div>
    );
};

export default EmailResponseTemplate;
