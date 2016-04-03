import {Page, NavController, MenuController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';


@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  static get parameters() {
    return [[NavController], [MenuController]];
  }

  constructor(nav, menu) {
    this.nav = nav;
    this.menu = menu;
    this.showSkip = true;

    this.slides = [
      {
        title: " What is MedicareMojo?",
        description: "MedicareMojo is the ease of a consumer tax app with the power of legal cognition software",
        image: "img/drawable-xxxhdpi-icon.png",
      }
    ];
  }

  startApp() {
    this.nav.push(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    // the left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
