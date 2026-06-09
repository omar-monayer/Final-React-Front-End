import * as XLSX from "xlsx";

export async function loginWithExcel(email, password) {
  const response = await fetch("/data/users.xlsx");

  if (!response.ok) {
    throw new Error("Users Excel file was not found.");
  }

  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  const users = XLSX.utils.sheet_to_json(worksheet);

  const foundUser = users.find((user) => {
    const userEmail = String(user.Email || "").trim().toLowerCase();
    const userPassword = String(user.Password || "").trim();

    return (
      userEmail === email.trim().toLowerCase() &&
      userPassword === password.trim()
    );
  });

  if (!foundUser) {
    return null;
  }

  return {
    email: foundUser.Email,
    name: foundUser.Name || foundUser.Email,
    role: String(foundUser.Role || "").trim().toLowerCase(),
  };
}

export function saveLoggedUser(user) {
  localStorage.setItem("loggedUser", JSON.stringify(user));
}

export function getLoggedUser() {
  const storedUser = localStorage.getItem("loggedUser");

  if (!storedUser) {
    return null;
  }

  return JSON.parse(storedUser);
}

export function logoutUser() {
  localStorage.removeItem("loggedUser");
}