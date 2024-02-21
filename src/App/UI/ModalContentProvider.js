import ProjectContent from "../../../public/Modals/ProjectModal.html?raw";

export default class ModalContentProvider {
  constructor() {
    this.modalContents = {
      PROJECTS: "/Modals/ProjectModal.html",
      EXPERIENCE: "/Modals/ExperienceModal.html",
      ABOUT: "Modals/AboutModal.html",
    };
  }

  fetchModalContents(sign) {
    switch (sign) {
      case "PROJECTS":
        return ProjectContent;
    }
  }
}
