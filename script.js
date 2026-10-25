// Object storing the 3 specific categories and their separate passwords
const CATEGORY_CREDENTIALS = {
  "CHIRAG": "chirag@123",
  "SONIA": "sonia@123",
  "GOURAV{Admin}": "gourav@123"
};

// Password visibility toggle
function togglePassword() {
  const pwdField = document.getElementById("password");
  pwdField.type = pwdField.type === "password" ? "text" : "password";
}

// Custom toast notification function
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

// Main login handler
function handleLogin(event) {
  event.preventDefault();

  const category = document.getElementById("category").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const loginBtn = document.getElementById("loginBtn");

  // 1. Check for empty fields
  if (!category || !username || !password) {
    showToast("Please fill in all fields .", "error");
    return;
  }

  // 2. Validate if chosen category exists
  if (!CATEGORY_CREDENTIALS.hasOwnProperty(category)) {
    showToast("Invalid Category!  Please Choose{SONIA} {Admin GOURAV} {CHIRAG}", "error");
    return;
  }

  // Activate loading state on button
  loginBtn.disabled = true;
  loginBtn.innerHTML = `<span class="spinner"></span> Face ID Verifying...`;

  setTimeout(() => {
    const requiredPassword = CATEGORY_CREDENTIALS[category];

    // 3. Match password with the selected category
    if (password === requiredPassword) {
      showToast(`Welcome ${category}!  Face Id Redirecting...`, "success");
    // 3. Match password with the selected category
    if (password === requiredPassword) {
      showToast(`Welcome ${category}! Face ID Redirecting...`, "success");

      // Dynamic redirection based on category
      let targetPage = "welcome.html"; // Default fallback page

      if (category === "SONIA") {
        targetPage = "sonia.html";
      } else if (category === "CHIRAG") {
        targetPage = "chirag.html";
      } else if (category === "GOURAV{Admin}") {
        targetPage = "gourav.html";
      }

      // Execute redirection after delay
      setTimeout(() => {
        window.location.href = targetPage;
      }, 1500);

    } else {
      // Incorrect password for this category
      loginBtn.disabled = false;
      loginBtn.innerHTML = "Log In";
      showToast(`Invalid Password and Face Id not found (${category})!`, "error");
    }


    } else {
      // Incorrect password for this category
      loginBtn.disabled = false;
      loginBtn.innerHTML = "Log In";
      showToast(`Invalid Password and Face Id is not found${category}!`, "error");
    }
  }, 1200); 
}
