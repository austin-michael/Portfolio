import ProjectContent from "../Modals/ProjectModal.html?raw";
import AboutContent from "../Modals/About.html?raw";
import ExperienceContent from "../Modals/Experience.html?raw";

export default class ModalContentProvider {
  constructor() {}

  fetchModalContents(sign) {
    switch (sign) {
      case "PROJECTS":
        return ProjectContent;
      case "ABOUT":
        return AboutContent;
      case "EXPERIENCE":
        return ExperienceContent;
    }
  }
}
