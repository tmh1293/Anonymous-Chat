class Notification {
    $container;
    $message;

    constructor(alert,message,type) {
        this.$container = document.createElement("div");
        this.$container.classList.add("alert-message");
        this.$container.classList.add(`${type}`);
        this.$container.innerHTML = `<b>${alert}</b> ${message}`
    }

    render(){
        return this.$container;
    }
}

export { Notification };