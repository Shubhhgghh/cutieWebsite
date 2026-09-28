/* =========================================
   CUTIE WEBSITE
   ========================================= */


/* ================= ELEMENTS ================= */

const questionPage = document.getElementById("questionPage");
const secondPage = document.getElementById("secondPage");
const specialPage = document.getElementById("specialPage");
const letterPage = document.getElementById("letterPage");
const memoriesPage = document.getElementById("memoriesPage");
const finalPage = document.getElementById("finalPage");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const secondYesBtn = document.getElementById("secondYesBtn");
const secondNoBtn = document.getElementById("secondNoBtn");

const continueBtn = document.getElementById("continueBtn");
const finalBtn = document.getElementById("finalBtn");

const bgMusic = document.getElementById("bgMusic");

const typingText = document.getElementById("typingText");


/* ================= PAGE SWITCH ================= */

function showPage(page) {

    document.querySelectorAll(".page").forEach(function(item) {
        item.classList.remove("active");
    });

    page.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= MUSIC ================= */

function startMusic() {

    bgMusic.volume = 0.35;

    bgMusic.play().catch(function(error) {

        console.log("Music will start after another interaction.");

    });
}


/* ================= FIRST YES ================= */

yesBtn.addEventListener("click", function() {

    startMusic();

    showSpecialPage();

});


/* ================= FIRST NO ================= */

noBtn.addEventListener("click", function() {

    startMusic();

    showPage(secondPage);

});


/* ================= SECOND YES ================= */

secondYesBtn.addEventListener("click", function() {

    showSpecialPage();

});


/* ================= MOVING NO BUTTON ================= */

function moveNoButton(button) {

    const parent = button.parentElement;

    const parentRect = parent.getBoundingClientRect();

    const buttonRect = button.getBoundingClientRect();

    const maxX =
        Math.max(
            0,
            parentRect.width - buttonRect.width
        );

    const maxY = 50;

    const randomX =
        Math.random() * maxX - maxX / 2;

    const randomY =
        Math.random() * maxY - maxY / 2;

    button.style.position = "relative";

    button.style.transform =
        `translate(${randomX}px, ${randomY}px)`;
}


/*
   On phones, "touchstart" makes the button
   move before it can easily be pressed.
*/

secondNoBtn.addEventListener("mouseenter", function() {

    moveNoButton(secondNoBtn);

});

secondNoBtn.addEventListener("touchstart", function(event) {

    event.preventDefault();

    moveNoButton(secondNoBtn);

});


/* ================= SPECIAL MESSAGE ================= */

function showSpecialPage() {

    showPage(specialPage);

    typeSpecialMessage();

}


/* ================= TYPING ANIMATION ================= */

function typeSpecialMessage() {

    const message =
        "Something special for you... 💕";

    typingText.textContent = "";

    let index = 0;

    const typingSpeed = 85;

    const timer = setInterval(function() {

        typingText.textContent += message[index];

        index++;

        if (index >= message.length) {

            clearInterval(timer);

            setTimeout(function() {

                showPage(letterPage);

            }, 2200);

        }

    }, typingSpeed);

}


/* ================= LETTER → MEMORIES ================= */

continueBtn.addEventListener("click", function() {

    showPage(memoriesPage);

});


/* ================= MEMORIES → FINAL ================= */

finalBtn.addEventListener("click", function() {

    showPage(finalPage);

    createFinalHearts();

});


/* ================= FLOATING HEARTS ================= */

const floatingHearts =
    document.getElementById("floatingHearts");


function createFloatingHeart() {

    const heart =
        document.createElement("div");

    heart.className = "floating-heart";

    const heartTypes = [
        "💗",
        "💕",
        "💖",
        "♡",
        "♥"
    ];

    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() * heartTypes.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        14 + Math.random() * 25 + "px";

    const duration =
        6 + Math.random() * 7;

    heart.style.animationDuration =
        duration + "s";

    floatingHearts.appendChild(heart);

    setTimeout(function() {

        heart.remove();

    }, duration * 1000);

}


/* Create hearts continuously */

setInterval(
    createFloatingHeart,
    700
);


/* ================= FINAL HEART EXPLOSION ================= */

function createFinalHearts() {

    for (let i = 0; i < 30; i++) {

        setTimeout(function() {

            createFloatingHeart();

        }, i * 100);

    }

}

