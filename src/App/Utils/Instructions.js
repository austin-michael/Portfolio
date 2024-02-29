export default class Instructions {
  constructor() {
    this.isMobile =
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1;

    this.instructions = document.getElementById("instructions");

    this.instructionsText = document.getElementById("instructionsText");
    this.instructionsText.innerHTML = this.isMobile
      ? "Touch & Drag"
      : "Click & Drag";

    this.instructionsIcon = document.getElementById("instructionsIcon");
    this.instructionsIcon.innerHTML = this.isMobile
      ? '<i class="fa-solid fa-hand fa-xl"></i>'
      : '<i class="fa-solid fa-computer-mouse fa-xl"></i>';

    this.instructions.style.display = "flex";
    this.instructions.classList.add("fadeIn");

    this.createEventListeners();

    this.hasInteracted = false;
  }

  createEventListeners() {
    if (this.isMobile) {
      document.addEventListener("touchstart", () => this.handleSelect());
      document.addEventListener("touchmove", () => this.handleDrag());
    } else {
      document.addEventListener("mousedown", () => this.handleSelect());
      document.addEventListener("mousemove", () => this.handleDrag());
    }
  }

  handleSelect() {
    this.hasInteracted = true;
  }

  handleDrag() {
    if (this.hasInteracted) {
      this.hideInstructions();
    }
  }

  removeEventListeners() {
    if (this.isMobile) {
      document.removeEventListener("touchstart", () => this.handleSelect());
      document.removeEventListener("touchmove", () => this.handleDrag());
    } else {
      document.removeEventListener("mousedown", () => this.handleSelect());
      document.removeEventListener("mousemove", () => this.handleDrag());
    }
  }

  hideInstructions() {
    this.instructions.classList.add("fadeOut");
    this.removeEventListeners();
  }
}
