import { ViewStart } from './viewStart.js'
import { setScreen, showNotification } from '../app.js'
import { Notification } from "./notification.js"
import { MessageItem } from "./messageItem.js"
import { NavBar } from './navBar.js'
import { ReplyBar } from './replyBar.js'
import { Header } from './header.js'
const badWord = ['dm', 'đm', 'vcl', 'vl', 'đmm', 'dmm', 'vc']
class ViewChat {
    $container;
    $header;

    $messageList;
    $composer
    $inputMessage;
    $btnSend;
    $navBar;
    $footerArea;

    $replyBar;
    $contentReply;

    replyId;
    setId;
    id;
    idRoomChat;

    constructor(id, idRoomChat) {
        this.id = id;
        this.idRoomChat = idRoomChat;
        this.$container = document.createElement('div');
        this.$container.classList.add("chat-container", "flex", "flex-col")


        this.$header = new Header(this.id, this.idRoomChat)

        this.$messageList = document.createElement('div');
        this.$messageList.classList.add("message-list", "flex-1");

        this.$footerArea = document.createElement('div');
        this.$footerArea.classList.add('footerContainer');


        this.$navBar = new NavBar(this.insertIcon, this.id, this.idRoomChat);

        this.$replyBar = document.createElement('div');
        this.$contentReply = new ReplyBar(this.apendReply, this.setIdReply);

        this.$composer = document.createElement('form');
        this.$composer.classList.add("flex", "composer");
        this.$composer.addEventListener('submit', this.handleSendMessage);

        this.$inputMessage = document.createElement('input');
        this.$inputMessage.classList.add("input-message", "flex-1");
        this.$inputMessage.placeholder = "Nhập tin nhắn tới Người lạ";

        this.$btnSend = document.createElement('button');
        this.$btnSend.classList.add("btn-send");
    }

    exitBrowser = () => {
        window.addEventListener('beforeunload', async function(event) {
            //event.preventDefault();
            await this.handleGetOut();
        });
    }

    apendReply = (bool) => {
        if (bool) {
            if (this.$replyBar.hasChildNodes()) {
                document.getElementsByClassName("reply-bar")[0].innerHTML = " ";
            }
            this.$replyBar.appendChild(this.$contentReply.render())
        } else {
            this.$replyBar.removeChild(this.$contentReply.render())
        }
    }

    setIdReply = (id) => {
        this.replyId = id;
        //console.log(this.replyId);
    }

    insertIcon = (icon) => {
        this.$inputMessage.value += icon;
    }

    messageListener = () => {
        db.collection("messages").where('room', '==', this.idRoomChat)
            .orderBy("sentAt")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    //console.log(change.doc.id)
                    if (change.type === "added") {
                        const data = change.doc.data();
                        const $messageItem = new MessageItem(data, this.$contentReply.setContent, this.apendReply, this.setIdReply, change.doc.id);
                        if (data.type == "audio") {
                            $messageItem.setAudioMessages();
                        }
                        this.$messageList.insertBefore($messageItem.render(), this.$messageList.childNodes[0])
                    }
                })
            });
    }

    matchYoutubeUrl = (url) => {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
            return url.match(p)[1];
        }
        return false;
    }

    filterBadWord = (string) => {
        let subString = string.toLowerCase().split(" ");
        let x = false;
        subString.filter((w) => {
            if (badWord.includes(w)) {
                x = true;
            }
        })
        return x;
    }

    handleSendMessage = (e) => {
        e.preventDefault();
        let fil = this.filterBadWord(this.$inputMessage.value)
            //console.log(fil)
        let beforeSend = this.$inputMessage.value;
        let typeMess = "text";
        if (beforeSend == "") {
            return;
        }
        if (fil) {
            beforeSend = "Xin lỗi, tôi vừa có ý định gửi gắm đến bạn những lời không hay";
        }

        this.setId = "none";
        if (this.replyId) {
            this.setId = this.replyId;
            this.apendReply(false)
        }
        let checkYoutube = this.matchYoutubeUrl(this.$inputMessage.value)
        if (checkYoutube) {
            beforeSend = `https://www.youtube.com/embed/${checkYoutube}`
            typeMess = "youtube"
        }
        // console.log(this.id +"+"+ this.$inputMessage.value + "+"+ this.idRoomChat)
        db.collection('messages').add({
            sender: this.id,
            content: beforeSend,
            type: typeMess,
            room: this.idRoomChat,
            reply: this.setId,
            sentAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((docRef) => {
            //console.log(docRef)
        }).catch((error) => {
            console.log(error)
        })
        this.replyId = "";
        this.setId = "none";
        this.$inputMessage.value = "";
    }

    handleGetOut = () => {
        document.cookie = `uid=`;
        db.collection("users").doc(this.id).delete().then(() => {
            db.collection("roomChat").doc(this.idRoomChat).delete().then(() => {
                const viewStart = new ViewStart();
                setScreen(viewStart);
            })



        }).catch((error) => {});
    }

    eventListener = () => {
        db.collection("roomChat")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    //console.log("check room: "+change.doc.id)
                    if (change.type === "removed") {
                        //console.log(change.doc.id)
                        //console.log(this.idRoomChat)//??
                        if (change.doc.id == this.idRoomChat) {
                            this.$header.handleGetOut();

                        }
                    }
                });
            });
    }

    render() {
        this.$composer.appendChild(this.$inputMessage)
        this.$composer.appendChild(this.$btnSend)

        this.$footerArea.appendChild(this.$navBar.render())
        this.$footerArea.appendChild(this.$replyBar);
        this.$footerArea.appendChild(this.$composer);

        this.$container.appendChild(this.$header.render());
        this.$container.appendChild(this.$messageList);


        this.$container.appendChild(this.$footerArea);


        return this.$container;

    }
}



export { ViewChat }