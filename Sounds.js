class Sounds {
    constructor() {
        this.machinegun = new Audio("sounds/machinegun.mp3");
        this.shotgun = new Audio("sounds/shotgun.mp3");
        this.missile = new Audio("sounds/missile.mp3");

        this.machinegun.volume = 0.5;
        this.shotgun.volume = 0.25;
        this.shotgun.volume = 0.5;
    };

    cloneAudio(original) {
        let duplicata = new Audio(original.src);
        duplicata.volume = original.volume;
        duplicata.muted = original.muted;
        duplicata.play();
    }
};

//pra possibilitar o mesmo audio tocando ao mesmo tempo
