class Sounds {
    constructor() {
        this.shotgun = new Audio("sounds/shotgun.mp3");
        this.machinegun = new Audio("sounds/machinegun.mp3");

        this.shotgun.volume = 0.25;
    };

    cloneAudio(original) {
        let duplicata = new Audio(original.src);
        duplicata.volume = original.volume;
        duplicata.muted = original.muted;
        duplicata.play();
    }
};

//pra possibilitar o mesmo audio tocando ao mesmo tempo
