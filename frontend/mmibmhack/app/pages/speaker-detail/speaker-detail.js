import {NavController, NavParams, Page} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/speaker-detail/speaker-detail.html'
})
export class SpeakerDetailPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    this.navParams = navParams;
    this.speaker = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }
}
