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

/* ---------------- FULL RANDOM PARTICLES ---------------- */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PARTICLE_COUNT = 150;
let particles = [];

for(let i=0;i<PARTICLE_COUNT;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    dx: (Math.random()-0.5)*1.2,   // faster random
    dy: (Math.random()-0.5)*1.2
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.x += p.dx;
    p.y += p.dy;

    // bounce off edges
    if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = "rgba(0,234,255,0.7)";
    ctx.fill();
  });

  // connecting lines
  for(let i=0;i<particles.length;i++){
    for(let j=i;j<particles.length;j++){
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 120){
        ctx.beginPath();
        ctx.strokeStyle="rgba(0,234,255,0.15)";
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

/* responsive */
window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* ---------------- ROLE BUTTON SELECT LOGIC ---------------- */
const roleButtons = document.querySelectorAll(".role button");

roleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    roleButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
