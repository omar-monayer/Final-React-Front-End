import "../styles/actionbutton.css";

function ActionButton({ children, onClick, type = "button" }) {
  return (
    <button type={type} className="action-btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default ActionButton;