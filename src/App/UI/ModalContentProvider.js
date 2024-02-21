import ProjectContent from "../../../public/Modals/ProjectModal.html?raw";
import AboutContent from "../../../public/Modals/About.html?raw";
import ExperienceContent from "../../../public/Modals/Experience.html?raw";

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
