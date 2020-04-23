class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
    }

    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // Loop over the pads

        activeBars.forEach((bar) => {
            // Smoothing the animation by the bpm
            if (this.bpm > 300) {
                bar.style.animation = `playTrack 0.1s alternate ease-in-out 2`;
            } else if (this.bpm > 200) {
                bar.style.animation = `playTrack 0.2s alternate ease-in-out 2`;
            } else {
                bar.style.animation = `playTrack 0.25s alternate ease-in-out 2`;
            }
            // Check if pads are actives
            if (bar.classList.contains("active")) {
                // Check which sound
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });

        this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;

        // Check if it's playing
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
            this.updateBtn();
        } else {
            // Clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.updateBtn();
        }
    }
    updateBtn() {
        if (this.isPlaying) {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }

    changeSound(e) {
        const selectioName = e.target.name;

        switch (selectioName) {
            case "kick-select":
                this.kickAudio.src = e.target.value;
                break;
            case "snare-select":
                this.snareAudio.src = e.target.value;
                break;
            case "hihat-select":
                this.hihatAudio.src = e.target.value;
        }
    }

    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        const i = e.target.children[0];

        if (i.classList.contains("fa-volume-up")) {
            i.classList.remove("fa-volume-up");
            i.classList.add("fa-volume-mute");
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            i.classList.remove("fa-volume-mute");
            i.classList.add("fa-volume-up");
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
}

// Instances
const drumKit = new DrumKit();

// Event Listeners

// -------------------------------------------------

// Change the sound
drumKit.selects.forEach((select) => {
    select.addEventListener("change", function (e) {
        drumKit.changeSound(e);
    });
});

// -------------------------------------------------

// Activate the pads
drumKit.pads.forEach((pad) => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

// -------------------------------------------------

// Start with the button
drumKit.playBtn.addEventListener("click", function () {
    // drumKit.index = 0;
    drumKit.start();
});

// -------------------------------------------------

// Mute the track
drumKit.muteBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        drumKit.mute(e);
    });
});
