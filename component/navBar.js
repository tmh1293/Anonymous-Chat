import { IconModal } from './iconModal.js'
class NavBar {
    $container;
    $icon;
    $iconModal;
    icon;
    $lblAttach;
    $attach;

    id;
    idRoomChat;

    constructor(icon, id, idRoomChat) {
        this.id = id;
        this.idRoomChat = idRoomChat;
        this.icon = icon;


        this.$container = document.createElement('div');
        this.$container.classList.add('nav-bar');

        this.$icon = document.createElement('div');
        this.$icon.title = "Emoji :)"
        this.$icon.classList.add("reactionIcon")
        this.$icon.addEventListener("click", this.handleIconClick);

        this.$lblAttach = document.createElement('label');
        this.$lblAttach.classList.add("btnSendPic");
        this.$lblAttach.setAttribute("for", "inputFile")
        this.$lblAttach.title = "Gửi ảnh";
        this.$attach = document.createElement('input');
        this.$attach.setAttribute("id", "inputFile");
        this.$attach.setAttribute("accept", "image/*");
        this.$attach.title ="Gửi audio";
        this.$attach.type = "file";
        this.$attach.style = "position:fixed;top:-100em";
        this.$attach.addEventListener("change", this.handleSendImg)
        this.$iconModal = new IconModal(this.icon);

        this.$lblAttachAudio = document.createElement('label');
        this.$lblAttachAudio.classList.add("btnSendAudio");
        this.$lblAttachAudio.setAttribute("for", "inputAudio")
        this.$attachAudio = document.createElement('input');
        this.$attachAudio.setAttribute("id", "inputAudio");
        this.$attachAudio.setAttribute("accept", "audio/*");
        this.$attachAudio.type = "file";
        this.$attachAudio.style = "position:fixed;top:-100em";
        this.$attachAudio.addEventListener("change", this.handleSendAudio)


    }


    handleIconClick = () => {
        this.$iconModal.setVisible(true);
    }

    handleSendAudio = async(event) => {
        const files = event.target.files[0];
        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child(files.name);

        await fileRef.put(files).then(() => {
            console.log("Uploaded file", files);
        });
        const fileUrl = await fileRef.getDownloadURL();
        db.collection('messages').add({
            sender: this.id,
            content: fileUrl,
            reply: "none",
            type: "audio",
            room: this.idRoomChat,
            sentAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((docRef) => {
            console.log(docRef)
        }).catch((error) => {
            console.log(error)
        })
    }

    handleSendImg = async(event) => {
        const files = event.target.files[0];
        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child(files.name);

        await fileRef.put(files).then(() => {
            console.log("Uploaded file", files);
        });
        const fileUrl = await fileRef.getDownloadURL();
        //console.log(fileUrl)

        db.collection('messages').add({
            sender: this.id,
            content: fileUrl,
            reply: "none",
            type: "img",
            room: this.idRoomChat,
            sentAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((docRef) => {
            console.log(docRef)
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        // this.$container.appendChild(this.)
        this.$container.appendChild(this.$icon);
        this.$container.appendChild(this.$iconModal.render());
        this.$container.appendChild(this.$lblAttach);
        this.$container.appendChild(this.$attach);
        this.$container.appendChild(this.$lblAttachAudio);
        this.$container.appendChild(this.$attachAudio);
        return this.$container;
    }
}

export { NavBar };