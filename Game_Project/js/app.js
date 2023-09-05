window.addEventListener('load', function () {
    const canvas = document.querySelector('#gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280; // setting the dimensions for canvas
    canvas.height = 720; // ""
    ctx.fillStyle = '#fff';
    ctx.strokeWidth = 3;
    ctx.strokeStyle = '#000';
    ctx.font = '40px Barriecito';
    ctx.textAlign = 'center';

    document.getElementById("playButton").addEventListener("click", function () {
        const audio = new Audio("assets/audio/spooky.mp3"); // creating new object for audio
        audio.loop = true; // setting this to true will make audio loop indefinitely
        audio.play(); // play method to start playing audio
    });

    // Add an event listener to the closeTutorialButton
    document.getElementById("closeTutorialButton").addEventListener("click", function () { // Toggle the display property of the tutorial section to hide/show it
        const tutorial = document.getElementById("tutorial");
        if (tutorial.style.display === "none" || tutorial.style.display === "") {
            tutorial.style.display = "block"; // Show the tutorial
        } else {
            tutorial.style.display = "none"; // Hide the tutorial
        }

        // Add an event listener to the "Show Tutorial" button
        document.getElementById("showTutorialButton").addEventListener("click", function () {
            // const tutorial = document.getElementById("tutorial"); no need to declare again
            tutorial.style.display = "block"; // Display the tutorial
        });

    });

    const game = new Game(canvas); // creating instance of the Game class and initialize the game
    game.init(); // creates our obstacles

    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        console.log(deltaTime);
        lastTime = timeStamp;
        game.render(ctx, deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});