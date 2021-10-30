const iconList = ['🤣', '😂', '😊', '😩', '😒', '😘', '😝', '😤', '😦', '😨', '😩', '😬', '😭', '😴', '😵', '😷', '🙃', '🤐', '🤑', '🤢', '🤡', '🤧', '🤨', '🤩', '🤪', '🤫', '🤬', '🤭', '🤮', '🤯', '🧐']
class IconModal {
    $container;
    $modal;
    $titleIconModal;
    $icon;
    $modalIconContainer;
    inputValue;
    setIcon;
    closeModal;

    constructor(setIcon) {
        this.setIcon = setIcon;
        this.$container = document.createElement('div');
        this.$container.style.display = "none";
        this.$container.classList.add('modal-container');

        this.$container.addEventListener('click', () => {
            this.setVisible(false);
            //console.log("set false");
        })

        this.$modalIconContainer = document.createElement('div');
        this.$modalIconContainer.classList.add('icon-modal-container');

        this.$titleIconModal = document.createElement('div')
        this.$titleIconModal.classList.add('title-icon-modal');
        this.$titleIconModal.innerHTML = 'Emoji';

        this.$modal = document.createElement('div');
        this.$modal.classList.add("icon-modal");

        iconList.forEach(icon => {
            this.$icon = document.createElement('div');
            this.$icon.classList.add("icon-items")
            this.$icon.innerHTML = icon;
            this.$icon.addEventListener('click', () => {
                this.setIcon(icon);
            })
            this.$modal.appendChild(this.$icon);
        })
    }

    setVisible(visible) {
        if (visible) {
            this.$container.style.display = "flex";
        } else {
            this.$container.style.display = "none";
        }
    }

    render() {
        this.$modalIconContainer.appendChild(this.$titleIconModal)
        this.$modalIconContainer.appendChild(this.$modal)

        this.$container.appendChild(this.$modalIconContainer)
        return this.$container;
    }
}

export { IconModal }