class Sounds {
    constructor() {
        this.guns = {
            machinegun: function () {
                let audio = new Audio("sounds/machinegun.mp3");
                audio.volume = 1; //trocar por variavel de volume
                audio.play();
            },
            shotgun: function () {
                let audio = new Audio("sounds/shotgun.mp3");
                audio.volume = 1; //trocar por variavel de volume
                audio.play();
            },
            rifle: function () {
                let audio = new Audio("sounds/rifle.mp3");
                audio.volume = 1; //trocar por variavel de volume
                audio.play();
            },
            missile: function () {
                let audio = new Audio("sounds/missile.mp3");
                audio.volume = 1; //trocar por variavel de volume
                audio.play();
            },
        }
    }
}