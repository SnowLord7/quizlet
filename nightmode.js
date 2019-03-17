/*
var styles = document.querySelectorAll('link[rel=stylesheet]');
var obj = {
    'url': document.location.pathname,
        'styles': []
    };
    for (let i = 0; i < styles.length; i++) {
        let href = styles[i].href.slice(23);
        obj.styles.push(href);
    }
    console.log('`', JSON.stringify(obj), '`');
    */

    /*
    var sheets = document.querySelectorAll('link[rel=stylesheet]');
    var styles = [];
    for (let i = 0; i < sheets.length; i++) {
        let href = sheets[i].href.slice(23);
        styles.push(href);
    }
    console.log('`', JSON.stringify(styles), '`');
    */

(function () {
    if (window['nightmodeEnabled'] != 1) {
        window['nightmodeEnabled'] = 1;
        var data = [
            {
                "url": "/latest",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/dashboard/index.night.vsBDU.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/mission",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/blog",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/jobs",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/mobile",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/teachers",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/features/live",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/features/learn",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/features/diagrams",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/press",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/create-set",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/create_set/index.night.zKccS.n.css",
                    "/diagrams/index.night.uBebu.n.css",
                    "/ui/index.night.RUUdp.n.css"
                ]
            },
            {
                "url": "/settings",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/dashboard/index.night.vsBDU.n.css",
                    "/settings/index.night.DD9W9.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/privacy",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/tos",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/honor-code",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/guidelines",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/cookies",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/dmca",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/about/index.night.DCnGj.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/flash-cards/",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/set/index.night.pyzge.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            { "url": "/323070301/flashcards", "styles": ["/global/index.night.eE4x7.n.css", "/mode/index.night.C8QDK.n.css", "/cards/index.night.knbrY.n.css", "/ui/index.night.RUUdp.n.css"] },
            {
                "url": "/learn",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/mode/index.night.FaFJH.n.css",
                    "/diagrams/index.night.uBebu.n.css",
                    "/assistant/index.night.hGx8A.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/write",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/mode/index.night.FaFJH.n.css",
                    "/learn/index.night.VVEuQ.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/spell",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/mode/index.night.FaFJH.n.css",
                    "/speller/index.night.gnyXm.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/test",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/mode/index.night.FaFJH.n.css",
                    "/test/index.night.umTtB.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/match",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/mode/index.night.FaFJH.n.css",
                    "/highscores/index.night.Te7qk.n.css",
                    "/diagrams/index.night.uBebu.n.css",
                    "/match/index.night.bvrQ7.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/gravity",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/mode/index.night.FaFJH.n.css",
                    "/highscores/index.night.Te7qk.n.css",
                    "/gravity/index.night.GJWjS.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            },
            {
                "url": "/autosaved",
                "styles": [
                    "/global/index.night.NchpQ.n.css",
                    "/create_set/index.night.zKccS.n.css",
                    "/diagrams/index.night.uBebu.n.css",
                    "/ui/index.night.EbScH.n.css"
                ]
            }
        ];

        var sheets = [
            '/global/index.night.eE4x7.n.css',
            '/set/index.night.Wr8QC.n.css',
            '/ui/index.night.RUUdp.n.css',
            '/create_set/index.night.A8Dyb.n.css',
            '/dashboard/index.night.b5g8T.n.css',
            '/assistant/index.night.Euzyt.n.css',
            '/diagrams/index.night.XDfhb.n.css',
            '/features/index.night.Euzyt.n.css',
            '/global/index.night.WJFx9.n.css',
            '/about/index.night.mZzem.n.css',
            '/cards/index.night.Y9bsr.n.css',
            '/mode/index.night.JEmdQ.n.css',
            '/set/index.night.jb5DK.n.css',
            '/settings/index.night.3Vs7F.n.css',
            '/highscores/index.night.Cpwx4.n.css',
            '/gravity/index.night.y5P5Z.n.css',
            '/test/index.night.nE3kY.n.css',
            '/match/index.night.WQH8m.n.css',
            '/learn/index.night.MWnrD.n.css',
            '/speller/index.night.RYJyf.n.css',
            '/live_game/teacher/index.xYkv5.n.css',
            '/prismic/index.night.rnpSb.n.css',
            '/set/index.night.YDwPt.n.css'
        ];
        var regex = /(?:\/)(dashboard|assistant|create_set|live_game|highscores|diagrams|features|prismic|global|gravity|settings|speller|learn|match|about|cards|test|mode|set|ui)(?:\/.+)/;
        var styles = document.querySelectorAll('link[rel=stylesheet]');

        try {
            if (document.getElementsByClassName('ProfileHeader-username')[0].textContent == window.location.pathname.slice(1)) {
                var profile = ["/global/index.night.eE4x7.n.css", "/dashboard/index.night.RWMxm.n.css", "/ui/index.night.RUUdp.n.css"];
                for (let i = 0; i < styles.length; i++) styles[i].href = "/a/c" + profile[i];
            } else { throw undefined }
        } catch (e) {
            let found = false;
            for (let j = 0; j < data.length; j++) {
                if (document.location.pathname.indexOf(data[j].url) != -1) {
                    found = true;
                    for (let i = 0; i < data[j].styles.length; i++) {
                        let href = styles[i].href.slice(19).replace(regex, (type) => {
                            let sheet = data[j].styles.filter((_) => {
                                let term = type.match(regex)[1];
                                return _.indexOf(term) != -1;
                            })[0];
                            return sheet;
                        });
                        styles[i].href = href;
                    }
                }
            }
            if (!found) {
                for (let i = 0; i < styles.length; i++) {
                    let href = styles[i].href.slice(19).replace(regex, (type) => {
                        let sheet = sheets.filter((_) => {
                            let term = type.match(regex)[1];
                            return _.indexOf(term) != -1;
                        })[0];
                        return sheet;
                    });
                    styles[i].href = href;
                }
            }
        }
    }
})();
