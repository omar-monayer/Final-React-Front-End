import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../styles/adminforms.css";

const jobTitleOptions = [
  "CEO",
  "Founder",
  "Marketing Director",
  "Sales Manager",
  "Operations Manager",
  "Business Development Manager",
];

const companyOptions = [
  { id: 101, name: "NEXSUS" },
  { id: 102, name: "Remodco" },
  { id: 103, name: "Pro Window Remodel" },
];

const existingFilters = [
  {
    company: "NEXSUS",
    arabicName: "نكسس",
    englishName: "NEXSUS Team",
    smtpHost: "smtp.nex-sus.com",
    port: "587",
    calendly: "calendly.com/nexsus",
  },
  {
    company: "Remodco",
    arabicName: "ريمودكو",
    englishName: "Remodco Sales",
    smtpHost: "smtp.remodco.com",
    port: "465",
    calendly: "calendly.com/remodco",
  },
];

function AddCompanyFilters() {
  const [formData, setFormData] = useState({
    companyProfile: "",
    senderArabicName: "",
    senderEnglishName: "",
    numberOfLeads: "",
    smtpHost: "",
    smtpPort: "",
    smtpSender: "",
    smtpAlias: "",
    smtpAppPassword: "",
    emailSignature: "",
    proposalInfo: "",
    calendly: "",
    jobTitles: [],
    company: "",
  });

  const [message, setMessage] = useState("Ready to add company filter.");
  const [isJobPopupOpen, setIsJobPopupOpen] = useState(false);
  const [isCompanyPopupOpen, setIsCompanyPopupOpen] = useState(false);
  const [jobSearch, setJobSearch] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function toggleJobTitle(jobTitle) {
    setFormData((prev) => {
      const alreadySelected = prev.jobTitles.includes(jobTitle);

      return {
        ...prev,
        jobTitles: alreadySelected
          ? prev.jobTitles.filter((title) => title !== jobTitle)
          : [...prev.jobTitles, jobTitle],
      };
    });
  }

  function selectCompany(companyName) {
    setFormData((prev) => ({
      ...prev,
      company: companyName,
    }));

    setIsCompanyPopupOpen(false);
  }

  function handleAdd() {
    setMessage("Company filter added successfully.");
    console.log(formData);
  }

  function closePopups() {
    setIsJobPopupOpen(false);
    setIsCompanyPopupOpen(false);
  }

  const filteredJobTitles = jobTitleOptions.filter((jobTitle) =>
    jobTitle.toLowerCase().includes(jobSearch.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="admin-form-page">
        <Link to="/admin/company-filters" className="admin-back-btn">
          Back
        </Link>

        <div className="admin-form-card">
          <h2>Filter Companies</h2>

          <div className="admin-form-grid">
            <div className="admin-field-group admin-full-width">
              <label>Company Profile</label>
              <textarea
                name="companyProfile"
                className="admin-textarea"
                placeholder="Enter Company Profile"
                value={formData.companyProfile}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group">
              <label>Sender Arabic Name</label>
              <input
                name="senderArabicName"
                className="admin-input"
                type="text"
                placeholder="Enter Arabic Name"
                value={formData.senderArabicName}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group">
              <label>Sender English Name</label>
              <input
                name="senderEnglishName"
                className="admin-input"
                type="text"
                placeholder="Enter English Name"
                value={formData.senderEnglishName}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group">
              <label>Number Of Leads Each Month</label>
              <input
                name="numberOfLeads"
                className="admin-input"
                type="text"
                placeholder="Enter Number"
                value={formData.numberOfLeads}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group">
              <label>SMTP Host</label>
              <input
                name="smtpHost"
                className="admin-input"
                type="text"
                placeholder="Enter SMTP Host"
                value={formData.smtpHost}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group">
              <label>SMTP Port</label>
              <input
                name="smtpPort"
                className="admin-input"
                type="text"
                placeholder="Enter SMTP Port"
                value={formData.smtpPort}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group">
              <label>SMTP Sender</label>
              <input
                name="smtpSender"
                className="admin-input"
                type="text"
                placeholder="Enter SMTP Sender"
                value={formData.smtpSender}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group">
              <label>SMTP Alias</label>
              <input
                name="smtpAlias"
                className="admin-input"
                type="text"
                placeholder="Enter SMTP Alias"
                value={formData.smtpAlias}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group">
              <label>SMTP App Password</label>
              <input
                name="smtpAppPassword"
                className="admin-input"
                type="text"
                placeholder="Enter SMTP App Password"
                value={formData.smtpAppPassword}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group admin-full-width">
              <label>Email Signature</label>
              <textarea
                name="emailSignature"
                className="admin-textarea"
                placeholder="Enter Email Signature"
                value={formData.emailSignature}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group admin-full-width">
              <label>Proposal Info</label>
              <textarea
                name="proposalInfo"
                className="admin-textarea"
                placeholder="Enter Proposal Info"
                value={formData.proposalInfo}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group">
              <label>Calendly</label>
              <input
                name="calendly"
                className="admin-input"
                type="text"
                placeholder="Enter Calendly"
                value={formData.calendly}
                onChange={handleChange}
              />
            </div>

            <div className="admin-field-group">
              <label>Job Titles</label>
              <input
                className="admin-input"
                type="text"
                placeholder="Select Job Titles"
                value={formData.jobTitles.join(", ")}
                readOnly
                onClick={() => setIsJobPopupOpen(true)}
              />
            </div>

            <div className="admin-field-group">
              <label>Company</label>
              <div className="admin-search-box-wrap">
                <input
                  name="company"
                  className="admin-input"
                  type="text"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={handleChange}
                />

                <button
                  className="admin-search-btn"
                  type="button"
                  onClick={() => setIsCompanyPopupOpen(true)}
                >
                  🔍
                </button>
              </div>
            </div>
          </div>

          <div className="admin-form-btn-row">
            <button className="admin-form-btn" type="button" onClick={handleAdd}>
              Add
            </button>

            <span className="admin-message-label">{message}</span>
          </div>

          <div className="admin-preview-grid-container">
            <table className="admin-grid">
              <thead className="admin-grid-header">
                <tr>
                  <th>Company</th>
                  <th>Arabic Name</th>
                  <th>English Name</th>
                  <th>SMTP Host</th>
                  <th>Port</th>
                  <th>Calendly</th>
                </tr>
              </thead>

              <tbody>
                {existingFilters.map((filter) => (
                  <tr key={filter.company}>
                    <td>{filter.company}</td>
                    <td>{filter.arabicName}</td>
                    <td>{filter.englishName}</td>
                    <td>{filter.smtpHost}</td>
                    <td>{filter.port}</td>
                    <td>{filter.calendly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {(isJobPopupOpen || isCompanyPopupOpen) && (
          <div className="admin-popup-overlay" onClick={closePopups}></div>
        )}

        {isJobPopupOpen && (
          <div className="admin-popup-panel">
            <h3>Select Job Titles</h3>

            <input
              type="text"
              className="admin-popup-search"
              placeholder="Search..."
              value={jobSearch}
              onChange={(e) => setJobSearch(e.target.value)}
            />

            <div className="admin-job-list">
              {filteredJobTitles.map((jobTitle) => (
                <label className="admin-job-item" key={jobTitle}>
                  <input
                    type="checkbox"
                    checked={formData.jobTitles.includes(jobTitle)}
                    onChange={() => toggleJobTitle(jobTitle)}
                  />
                  {jobTitle}
                </label>
              ))}
            </div>

            <div className="admin-popup-actions">
              <button
                className="admin-form-btn"
                type="button"
                onClick={() => setIsJobPopupOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {isCompanyPopupOpen && (
          <div className="admin-popup-panel">
            <h3>Select Company</h3>

            <div className="admin-popup-table-container">
              <table className="admin-grid">
                <thead className="admin-grid-header">
                  <tr>
                    <th>Company Name</th>
                    <th>Company ID</th>
                    <th>Select</th>
                  </tr>
                </thead>

                <tbody>
                  {companyOptions.map((company) => (
                    <tr key={company.id}>
                      <td>{company.name}</td>
                      <td>{company.id}</td>
                      <td>
                        <button
                          className="admin-form-btn"
                          type="button"
                          onClick={() => selectCompany(company.name)}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-popup-actions">
              <button
                className="admin-form-btn"
                type="button"
                onClick={() => setIsCompanyPopupOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AddCompanyFilters;