class ReplyBar {
    $container;
    $content;
    $btnRemove;
    apend;

    constructor(apend, setId) {
        this.apend = apend;
        this.setId = setId;
        this.$container = document.createElement('div');
        this.$container.classList.add("reply-bar");

        this.$content = document.createElement('div');

        this.$btnRemove = document.createElement('span');
        this.$btnRemove.innerHTML = "x";
        this.$btnRemove.addEventListener('click', this.handleRemove)
    }

    setContent = (data) => {
        // this.$container.removeChild(this.$content);
        if (data.type == "text") {
            this.$content = document.createElement('div');
            this.$content.innerHTML = data.content;
        } else if (data.type == "img") {
            this.$content = document.createElement('img');
            this.$content.src = data.content;
        } else if (data.type == "youtube") {
            this.$content = document.createElement('iframe');
            this.$content.src = data.content;
        } else {
            this.$content = document.createElement('div');
            this.$content.innerHTML = "Audio";
        }
    }

    handleRemove = () => {
        this.apend(false);
        this.setId("");
        this.$container.removeChild(this.$content);
    }

    render() {
        this.$container.appendChild(this.$content);
        this.$container.appendChild(this.$btnRemove);
        return this.$container;
    }
}

export { ReplyBar }