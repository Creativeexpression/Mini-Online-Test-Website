const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", () => {

  const username = document.querySelector("input[type='text']").value;
  const password = document.querySelector("input[type='password']").value;

  if(username === "" || password === ""){
    alert("Please enter username and password");
    return;
  }

  alert("Login Successful");

});

/* ---------------- ROLE BUTTON SELECT LOGIC ---------------- */
const roleButtons = document.querySelectorAll(".role button");

roleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    roleButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Add this inside the loginBtn click listener in auth.js
loginBtn.addEventListener("click", () => {

  const username = document.querySelector("input[type='text']").value;
  const password = document.querySelector("input[type='password']").value;

  if(username === "" || password === ""){
    alert("Please enter username and password");
    return;
  }

  // --- ADD THESE TWO LINES ---
  localStorage.setItem("studentName", username); // Saves the name for the dashboard
  window.location.href = "student_dashboard.html"; // Redirects to your new file
  
  alert("Login Successful"); 
});

  // User's exact lines
  localStorage.setItem("studentName", username);
  window.location.href = "student_dashboard.html";
  
  alert("Login Successful"); 
});
