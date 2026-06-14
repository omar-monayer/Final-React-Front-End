import "../styles/emailpreviewmodal.css";

function EmailPreviewModal({ email, onClose }) {
  if (!email) return null;

  return (
    <div className="email-modal-overlay">
      <div className="email-modal">
        <div className="email-modal-header">
          <h2>Email Preview</h2>

          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="email-modal-body">
          <p>
            <strong>Subject:</strong> {email.subject}
          </p>

          <p>
            <strong>Last Contacted:</strong>{" "}
            {email.lastContacted
              ? new Date(email.lastContacted).toLocaleString()
              : "Not contacted yet"}
          </p>

          <hr />

          <div
            className="email-html-content"
            dangerouslySetInnerHTML={{ __html: email.body }}
          />
        </div>
      </div>
    </div>
  );
}

export default EmailPreviewModal;