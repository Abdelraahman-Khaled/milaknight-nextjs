"use client";

import React, { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import { privacyPolicyData } from "@/app/data/privacyPolicyData";

const PrivacyPolicyContent = () => {
  const { language } = useContext(LanguageContext);
  const data = privacyPolicyData[language] || privacyPolicyData.en;

  return (
    <section className="privacy-policy-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="privacy-card p-4 p-md-5 bg-white shadow-sm rounded-4">
              <div className="mb-4">
                <span className="text-primary fw-bold">{data.lastUpdated}</span>
              </div>
              
              {data.sections.map((section, index) => (
                <div key={index} className="mb-5">
                  <h2 className="h4 mb-3 fw-bold text-dark">{section.heading}</h2>
                  <p className="text-muted leading-relaxed" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .leading-relaxed {
          line-height: 1.8;
        }
        .privacy-card {
          border: 1px solid #f0f0f0;
        }
        h2 {
          position: relative;
          padding-bottom: 10px;
        }
        h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: ${language === 'ar' ? 'auto' : '0'};
          right: ${language === 'ar' ? '0' : 'auto'};
          width: 50px;
          height: 3px;
          background-color: var(--primary-color, #007bff);
        }
      `}</style>
    </section>
  );
};

export default PrivacyPolicyContent;
