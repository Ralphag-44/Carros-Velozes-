class Sounds {
    constructor() {
        this.guns = {
            machineGun: function () {
                let audio = new Audio("sounds/machinegun.mp3");
                audio.volume = 1; //trocar por variavel de volume
                audio.play();
            },
            shotGun: function () {
                let audio = new Audio("sounds/shotgun.mp3").play();
                audio.volume = 1; //trocar por variavel de volume
                audio.play();
            },
            missile: function () {
                let audio = new Audio("sounds/missile.mp3").play();
                audio.volume = 1; //trocar por variavel de volume
                audio.play();
            },
        }
    }
}