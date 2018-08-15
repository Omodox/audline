import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  sid = localStorage.getItem('sid');
  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        setTimeout(function () {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }, 1000);
      }
    });
  }

  ngOnInit() {
    if (!this.sid)
    (function () {
      let D = new Date(),
        d = <any>document,
        b = 'body',
        ce = 'createElement',
        ac = 'appendChild',
        st = 'style',
        ds = 'display',
        n = 'none',
        gi = 'getElementById',
        lp = d.location.protocol,
        wp = lp.indexOf('http') == 0 ? lp : 'https:';
      var i = d[ce]('iframe');
      i[st][ds] = n; d[gi]("M403150ScriptRootC668347")[ac](i);
      try {
        var iw = i.contentWindow.document; iw.open();
        iw.writeln("<ht" + "ml><bo" + "dy></bo" + "dy></ht" + "ml>");
        iw.close(); var c = iw[b];
      }
      catch (e) {
        var iw = d;
        var c = d[gi]("M403150ScriptRootC668347");
      }
      var dv = iw[ce]('div');
      dv.id = "MG_ID"; dv[st][ds] = n; dv.innerHTML = 668347;
      c[ac](dv);
      var s = iw[ce]('script');
      s.async = 'async';
      s.defer = 'defer';
      s.charset = 'utf-8';
      s.src = wp + "//jsc.marketgid.com/a/u/audline.net.668347.js?t=" + D.getFullYear() + D.getMonth() + D.getUTCDate() + D.getUTCHours(); c[ac](s);
    })();

  }


}
