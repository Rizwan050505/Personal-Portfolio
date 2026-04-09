const scriptURL = "https://script.google.com/macros/s/AKfycbynNmzSJ8tlJwoD8P294FTy5j1Gz1S_ms1y170QwsIwOGKAA6OEi3bmfKGCIWXrVC8r/exec";

window.opentab = function opentab(event, tabname) {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");

    for (const tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (const tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    if (event && event.currentTarget) {
        event.currentTarget.classList.add("active-link");
    }

    const selectedTab = document.getElementById(tabname);
    if (selectedTab) {
        selectedTab.classList.add("active-tab");
    }
};

window.openmenu = function openmenu() {
    const sidemenu = document.getElementById("sidemenu");
    if (sidemenu) {
        sidemenu.style.right = "0";
    }
};

window.closemenu = function closemenu() {
    const sidemenu = document.getElementById("sidemenu");
    if (sidemenu) {
        sidemenu.style.right = "-200px";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const roleText = document.getElementById("role-text");
    const roles = [
        "UI/UX Designer",
        "Full Stack Developer",
        "Frontend Developer",
        "Backend Developer",
        "Web Developer"
    ];

    if (roleText && roles.length > 1) {
        let currentIndex = 0;
        setInterval(() => {
            roleText.classList.add("role-changing");
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % roles.length;
                roleText.textContent = roles[currentIndex];
                roleText.classList.remove("role-changing");
            }, 200);
        }, 2500);
    }

    const form = document.forms["submit-to-google-sheet"];
    const msg = document.getElementById("msg");

    if (!form || !msg) {
        return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
            .then(() => {
                msg.textContent = "Message sent successfully!!";
                setTimeout(() => {
                    msg.textContent = "";
                }, 5000);
                form.reset();
            })
            .catch((error) => {
                console.error("Error!", error.message);
                msg.textContent = "Something went wrong. Please try again.";
                setTimeout(() => {
                    msg.textContent = "";
                }, 5000);
            });
    });
});