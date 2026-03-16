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
