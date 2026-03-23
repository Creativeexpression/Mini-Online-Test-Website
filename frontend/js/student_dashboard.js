/* ---------- CYBER-GRID BACKGROUND ENGINE ---------- */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function initBackground() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(0, 234, 255, 0.08)"; // Very subtle cyan
        ctx.lineWidth = 1;

        const spacing = 50;
        const time = Date.now() * 0.001;

        // Draw vertical lines with a slight "flow" animation
        for (let x = 0; x <= canvas.width; x += spacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + Math.sin(time + x) * 10, canvas.height);
            ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= canvas.height; y += spacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y + Math.cos(time + y) * 10);
            ctx.stroke();
        }
        
        requestAnimationFrame(drawGrid);
    }
    drawGrid();
}
initBackground();
window.onresize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };

/* ---------- UPDATED DASHBOARD LOGIC ---------- */
document.addEventListener("DOMContentLoaded", () => {
const studentData = JSON.parse(localStorage.getItem("studentData") || '{}');
const savedName = studentData.name || "User";
    const headerElement = document.getElementById("student-name-header");
    
    // 1. Typing Effect Logic
    let i = 0;
    const speed = 100; // Speed in milliseconds
    headerElement.innerText = ""; // Start empty for typing

    function typeWriter() {
        if (i < savedName.length) {
            headerElement.innerText += savedName.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typing after a brief delay
    setTimeout(typeWriter, 500);

    // 2. Set Profile Initial
    document.getElementById("profile-initial").innerText = savedName.charAt(0).toUpperCase();

    //Set Profile Initial (First letter)

    const initial = savedName.charAt(0).toUpperCase();

    document.getElementById("profile-initial").innerText = initial;



    // Dropdown Toggle Logic

    const trigger = document.getElementById('profileTrigger');

    const menu = document.getElementById('profileMenu');



    trigger.addEventListener('click', (e) => {

        e.stopPropagation();

        menu.classList.toggle('active');

    });



    // Close dropdown when clicking anywhere else

    document.addEventListener('click', () => {

        menu.classList.remove('active');

    });

});

    


/* ---------- HARDWARE & MODAL LOGIC ---------- */

async function checkHardware(examId) {

    const modal = document.getElementById('cameraModal');

    const video = document.getElementById('preview');

    const startBtn = document.getElementById('confirmStart');

   

    modal.style.display = 'block';



    try {

        const stream = await navigator.mediaDevices.getUserMedia({

            video: true,

            audio: true

        });

       

        video.srcObject = stream;

        startBtn.disabled = false;

       

        startBtn.onclick = () => {

            stream.getTracks().forEach(track => track.stop());

            alert("🔒 Secure Session Initiated for: " + examId);

        };

    } catch (err) {

        alert("Access Denied: Camera and Microphone are mandatory for this proctored portal.");

        modal.style.display = 'none';

    }

}



document.getElementById('cancelCheck').addEventListener('click', () => {

    document.getElementById('cameraModal').style.display = 'none';

    const video = document.getElementById('preview');

    if (video.srcObject) video.srcObject.getTracks().forEach(t => t.stop());

});



window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

});

/* ---------- NOTIFICATION SIDEBAR LOGIC ---------- */
const closeNotif = document.getElementById('closeNotif');
const notifTrigger = document.getElementById('notifTrigger');
const notifSidebar = document.getElementById('notifSidebar');
const notifBadge = document.querySelector('.notification-badge');

notifTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    notifSidebar.classList.add('active');
        
    // Remove the red dot when opened
    if (notifBadge) {
            notifBadge.style.display = 'none';
    }
});
// Open Sidebar
notifTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    notifSidebar.classList.add('active');
});

// Close Sidebar via X button
closeNotif.addEventListener('click', () => {
    notifSidebar.classList.remove('active');
});

// Close Sidebar if clicking outside
document.addEventListener('click', (e) => {
    if (!notifSidebar.contains(e.target) && e.target !== notifTrigger) {
        notifSidebar.classList.remove('active');
    }
});
