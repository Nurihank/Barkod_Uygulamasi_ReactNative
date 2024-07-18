export default class Kullanici {
    constructor(id) {
        this._id = id;
    }

    // Getter and Setter for id
    static get id() {
        return this._id;
    }
    static set id(value) {
        this._id = value;
    }
    static get image() {
        return this._image;
    }
    static set image(value) {
        this._image = value;
    }
}
