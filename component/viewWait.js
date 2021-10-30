import { ViewChat } from './viewChat.js'
import { ViewStart } from './viewStart.js'
import { setScreen, showNotification } from '../app.js'
import { Notification } from "./notification.js"

class ViewWait {
    $container;
    $animationWait;

    $buttonCancel;
    id;
    $tay;
    $than;
    $dau;
    $mat;

    $loadingText;
    $loadingTextWords;

    $span1;
    $span2;
    $span3;
    $span4;
    $span5;
    $span6;
    $span7;
    $span8;
    $span9;
    $span10;
    $span11;
    $span12;
    $span13;
    $span14;
    $span15;
    $span16;
    $span17;
    $span18;
    $span19;
    $span20;

    constructor(id) {
        this.$container = document.createElement('div');
        this.$container.classList.add("view-wait");

        this.$animationWait = document.createElement('div');
        this.$animationWait.classList.add("animationWait");


        this.$than = document.createElement('div')
        this.$than.classList.add("than");

        this.$tay = document.createElement('tay')
        this.$tay.classList.add("tay");
        this.$dau = document.createElement('dau')
        this.$dau.classList.add("dau");

        this.$mat = document.createElement('mat')
        this.$mat.classList.add("mat");

        this.$loadingText = document.createElement('div')
        this.$loadingText.classList.add("loadingText");

        this.$loadingTextWords = document.createElement('div')
        this.$loadingTextWords.classList.add("loadingTextWords");

        this.$span1 = document.createElement('span')
        this.$span1.innerHTML = "Đ";
        this.$span2 = document.createElement('span')
        this.$span2.innerHTML = "A";
        this.$span3 = document.createElement('span')
        this.$span3.innerHTML = "N";
        this.$span4 = document.createElement('span')
        this.$span4.innerHTML = "G";

        this.$span18 = document.createElement('span')
        this.$span18.innerHTML = " ";

        this.$span5 = document.createElement('span')
        this.$span5.innerHTML = "T";
        this.$span6 = document.createElement('span')
        this.$span6.innerHTML = "Ì";
        this.$span7 = document.createElement('span')
        this.$span7.innerHTML = "M";

        this.$span19 = document.createElement('span')
        this.$span19.innerHTML = " ";

        this.$span8 = document.createElement('span')
        this.$span8.innerHTML = "N";
        this.$span9 = document.createElement('span')
        this.$span9.innerHTML = "G";
        this.$span10 = document.createElement('span')
        this.$span10.innerHTML = "Ư";
        this.$span11 = document.createElement('span')
        this.$span11.innerHTML = "Ờ";
        this.$span12 = document.createElement('span')
        this.$span12.innerHTML = "I";

        this.$span20 = document.createElement('span')
        this.$span20.innerHTML = " ";

        this.$span13 = document.createElement('span')
        this.$span13.innerHTML = "L";
        this.$span14 = document.createElement('span')
        this.$span14.innerHTML = "Ạ";
        this.$span15 = document.createElement('span')
        this.$span15.innerHTML = ".";
        this.$span16 = document.createElement('span')
        this.$span16.innerHTML = ".";
        this.$span17 = document.createElement('span')
        this.$span17.innerHTML = ".";

        this.$buttonCancel = document.createElement('button');
        this.$buttonCancel.innerHTML = "Hủy";
        this.$buttonCancel.addEventListener("click", this.handleBtnCancel)
        this.id = id;
    }

    handleBtnCancel = () => {
        db.collection("users").doc(this.id).delete().then(() => {
            const viewStart = new ViewStart();
            setScreen(viewStart);
        }).catch((error) => {
            console.log(error)
        });
    }

    eventListener = () => {
        //listen collection chatRoom nếu có room có id của mình, thì chuyển sang màn hình chat
        db.collection("roomChat")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    //console.log("wait => chat"+change.doc.id)
                    if (change.type === "added") {
                        if (change.doc.data().users.indexOf(this.id) !== -1) {
                            const viewChat = new ViewChat(this.id, change.doc.id)
                            setScreen(viewChat)
                            viewChat.eventListener();
                            viewChat.messageListener();
                            const noti = new Notification('Hurray!', `You found someone`, "success");
                            showNotification(noti.render())
                        }
                    }
                    if (change.type === "modified") {
                        //console.log("Change Room: ", change.doc.id);
                    }
                    if (change.type === "removed") {
                        //console.log("Remove Room: ", change.doc.id);
                    }
                });
            });
    }

    render() {

        this.$container.appendChild(this.$animationWait)

        this.$animationWait.appendChild(this.$dau)
        this.$animationWait.appendChild(this.$mat)
        this.$animationWait.appendChild(this.$than)
        this.$animationWait.appendChild(this.$tay)

        this.$container.appendChild(this.$loadingText)
        this.$loadingText.appendChild(this.$loadingTextWords)

        this.$loadingTextWords.appendChild(this.$span1)
        this.$loadingTextWords.appendChild(this.$span2)
        this.$loadingTextWords.appendChild(this.$span3)
        this.$loadingTextWords.appendChild(this.$span4)
        this.$loadingTextWords.appendChild(this.$span18)

        this.$loadingTextWords.appendChild(this.$span5)
        this.$loadingTextWords.appendChild(this.$span6)
        this.$loadingTextWords.appendChild(this.$span7)

        this.$loadingTextWords.appendChild(this.$span19)


        this.$loadingTextWords.appendChild(this.$span8)
        this.$loadingTextWords.appendChild(this.$span9)
        this.$loadingTextWords.appendChild(this.$span10)
        this.$loadingTextWords.appendChild(this.$span11)
        this.$loadingTextWords.appendChild(this.$span12)

        this.$loadingTextWords.appendChild(this.$span20)


        this.$loadingTextWords.appendChild(this.$span13)
        this.$loadingTextWords.appendChild(this.$span14)
        this.$loadingTextWords.appendChild(this.$span15)
        this.$loadingTextWords.appendChild(this.$span16)
        this.$loadingTextWords.appendChild(this.$span17)


        this.$container.appendChild(this.$buttonCancel)
        return this.$container;
    }
}

export { ViewWait }