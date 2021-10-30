import { setModal } from '../app.js'
const rule = [
    '1 - Ứng dụng này hoàn toàn miễn phí.',
    '2 - Bạn không cần phải đăng ký tài khoản.',
    '3 - Tính cách của bạn sẽ quan trọng hơn bạn trông như thế nào.',
    '4 - Hãy thận trọng và lịch sự khi kết nối với người lạ.',
    '5 - Ví lý do an toàn của bạn, KHÔNG chia sẻ thông tin cá nhân.',

]
class RuleModal {
    $container;
    $ruleModal;
    $title;
    $contentArea;
    $rule
    $btnConfirm;
    $span1;
    $span2;
    $span3;
    $span4;
    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add("modal-container")
        this.$ruleModal = document.createElement('div');
        this.$ruleModal.classList.add("rule-modal");

        this.$title = document.createElement('div');
        this.$title.classList.add("title")
        this.$title.innerHTML = "THÔNG TIN"

        this.$contentArea = document.createElement('div');

        rule.forEach((item) => {
            this.$rule = document.createElement('p');
            this.$rule.innerHTML = item;
            this.$contentArea.appendChild(this.$rule)
        })
        this.$btnConfirm = document.createElement('div');
        this.$btnConfirm.classList.add('btnConfirm')
        this.$span1 = document.createElement('span');
        this.$span2 = document.createElement('span');
        this.$span3 = document.createElement('span');
        this.$span4 = document.createElement('span');
        this.$btnConfirm.innerHTML = "Confirm";



        this.$btnConfirm.addEventListener('click', this.handleConfirm)
    }

    handleConfirm = () => {
        setModal(this.$container, false)
    }

    render() {
        this.$ruleModal.appendChild(this.$title);
        this.$ruleModal.appendChild(this.$contentArea);

        this.$ruleModal.appendChild(this.$btnConfirm);
        this.$btnConfirm.appendChild(this.$span1);
        this.$btnConfirm.appendChild(this.$span2);
        this.$btnConfirm.appendChild(this.$span3);
        this.$btnConfirm.appendChild(this.$span4);

        this.$container.appendChild(this.$ruleModal)
        return this.$container;
    }
}

export { RuleModal }