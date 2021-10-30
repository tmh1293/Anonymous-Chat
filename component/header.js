import { ViewStart } from './viewStart.js'
import { setScreen, showNotification, setModal } from '../app.js'
import { Notification } from './notification.js'
import { ConfirmModal } from './confirmModal.js'
class Header {
    $container;
    $title;
    $btnOut;
    $confirm;

    id;
    idRoomChat;
    constructor(id, idRoomChat) {
        this.id = id;
        this.idRoomChat = idRoomChat;
        this.$container = document.createElement('div');
        this.$container.classList.add("header")

        this.$containerInfo = document.createElement('div')
        this.$containerInfo.classList.add('containerInfo')

        this.$imgAvaContainer = document.createElement('div');
        this.$imgAvaContainer.classList.add("imgAvaContainer")
        this.$image = document.createElement('div');
        this.$image.classList.add('avaHeader')
            // this.$image.src = '../img/ava2.png';

        this.$title = document.createElement('div');
        this.$title.classList.add('nickname')
        this.$title.innerHTML = "Người lạ";



        this.$btnOut = document.createElement('button');
        this.$btnOut.classList.add('btnLogOut')
            // this.$btnOut.innerHTML = "Rời khỏi đây";

        this.$confirm = new ConfirmModal(this.handleGetOut, "Bạn chắc chắn rời khỏi đây?");
        this.$btnOut.addEventListener("click", this.handleConfirm)
    }

    handleConfirm = () => {
        setModal(this.$confirm.render(), true)
    }

    handleGetOut = () => {
        document.cookie = `uid=`;
        db.collection("users").doc(this.id).delete().then(() => {
            //console.log("Document successfully deleted!");
            db.collection("roomChat").doc(this.idRoomChat).delete().then(() => {
                const viewStart = new ViewStart();
                setScreen(viewStart);
                const noti = new Notification('Oops!', `You and the stranger has been disconnect`, "danger");
                showNotification(noti.render())
            })
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        // setModal(this.$confirm.render(),false)
        // this.$confirm.handleButtonNo()
    }

    render() {
        this.$container.appendChild(this.$containerInfo)
        this.$containerInfo.appendChild(this.$imgAvaContainer)
        this.$imgAvaContainer.appendChild(this.$image);
        this.$containerInfo.appendChild(this.$title);
        this.$container.appendChild(this.$btnOut)
        return this.$container;
    }
}

export { Header };