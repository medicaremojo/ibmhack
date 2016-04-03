import {Page, NavParams} from 'ionic-angular';
import {RoadmapPage} from '../roadmap/roadmap';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {Tutorial} from '../tutorial/tutorial';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavParams]];
  }

  constructor(navParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    // set the root pages for each tab
    this.tab1Root = RoadmapPage;
    this.tab2Root = SpeakerListPage;
  }
}
