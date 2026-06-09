import "../styles/emailpreviewmodal.css";

function EmailPreviewModal({ isOpen, email, onClose }) {
  if (!isOpen || !email) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.target.className === "email-modal") {
      onClose();
    }
  }

  return (
    <div className="email-modal" onClick={handleOverlayClick}>
      <div className="email-modal-content">
        <button className="close" type="button" onClick={onClose}>
          &times;
        </button>

        <h3>{email.subject}</h3>

        <p>
          <strong>Last Contacted:</strong> {email.lastContacted}
        </p>

        <div className="email-structure">
          <iframe
            title="Email Preview"
            className="email-frame"
            srcDoc={email.body}
          />
        </div>
      </div>
    </div>
  );
}

export default EmailPreviewModal;