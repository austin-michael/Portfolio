export default class ModalManager {
  constructor() {
    this.modal = document.getElementById("modal");
    this.modalContainer = document.getElementById("modalContainer");
    this.close = document.getElementsByClassName("close")[0];
    this.close.onclick = () => {
      this.closeModal();
    };
  }

  openModal(title, content) {
    document.getElementById("modalTitle").innerHTML = title;
    document.getElementById("modalDescription").innerHTML = content;
    this.modal.style.display = "block";
    this.modalContainer.scrollTop = 0;
    this.modal.classList.remove("fadeOut");
    this.modal.classList.add("fadeIn");
  }

  closeModal() {
    this.modal.classList.remove("fadeIn");
    this.modal.classList.add("fadeOut");
    setTimeout(() => {
      this.modal.style.display = "none";
    }, 600);
  }
}
