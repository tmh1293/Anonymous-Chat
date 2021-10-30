import { setModal } from '../app.js'
class ConfirmModal {
    $container;
    $modalConfirm;
    $title;
    $content;
    $btnYes;
    $btnNo;
    $btnArea;
    functionYes;

    constructor(functionYes,content){
        this.functionYes = functionYes;
        this.$container = document.createElement('div');
        this.$container.classList.add("modal-container");
        this.$modalConfirm = document.createElement('div');
        this.$modalConfirm.classList.add("confirm-modal")

        this.$title = document.createElement('div');
        this.$title.classList.add("title");
        this.$title.innerHTML = "THÔNG BÁO";

        this.$content = document.createElement('div');
        this.$content.classList.add("content")
        this.$content.innerHTML = content;

        this.$btnArea = document.createElement('div');
        this.$btnArea.classList.add("btn-area");
        

        this.$btnYes = document.createElement('button');
        this.$btnYes.classList.add("btn-confirm","yes");
        this.$btnYes.innerHTML = "YES";
        this.$btnYes.addEventListener('click',this.handleButtonYes)

        this.$btnNo = document.createElement('button');
        this.$btnNo.classList.add("btn-confirm","no");
        this.$btnNo.innerHTML = "NO";
        this.$btnNo.addEventListener('click',this.handleButtonNo)
    }

    handleButtonYes = () => {
        this.functionYes();
        setModal(this.$container)
    }

    handleButtonNo = () => {
        setModal(this.$container)
    }

    render() {
        this.$btnArea.appendChild(this.$btnYes)
        this.$btnArea.appendChild(this.$btnNo)
        this.$modalConfirm.appendChild(this.$title)
        this.$modalConfirm.appendChild(this.$content)
        this.$modalConfirm.appendChild(this.$btnArea)
        this.$container.appendChild(this.$modalConfirm)

        return this.$container;
    }
}

export { ConfirmModal }