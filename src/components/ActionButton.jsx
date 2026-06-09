import "../styles/actionbutton.css";

function ActionButton({ children, type = "button", onClick }) {
  return (
    <button className="action-btn" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default ActionButton;