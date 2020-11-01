﻿class Api {
    constructor() {
        this.activePanelEl = $('#horizentalTabs>div[aria-hidden="false"]');
        this.lastDialogEl = '';
        const that = this;
        $('#horizentalTabs').on("tabsactivate", function (event, ui) {
            that.activePanelEl = ui.newPanel;
        }).on("tabsopen", function (event, ui) {
            that.activePanelEl = ui.newPanel;
        });
        $(document).on('dialogopen', function (ev, ui) {
            that.lastDialogEl = $(ev.target);
        }).on('dialogbeforeclose', function (ev, ui) {
            that.lastDialogEl = that.lastDialogEl.dialogAdapter('getPerviousDialog') || '';
        });
    }
    getTemplate(url) {
        url.constructor === Array || (url = [url]);
        url.map((item, i, arr) => {
            arr[i] = $.ajax({
                url: arr[i],
                type: 'get',
                dataType: 'html'
            });
        });
        return $.when.apply(undefined, url).then(function () {
            var arr = [];
            if (arguments[0].constructor !== Array)
                arr.push(arguments[0]);
            else
                for (var i = 0, arg = arguments, l = arg.length; i < l; i++)
                    arr.push(arg[i][0]);
            return arr;
        }).catch(function (er) { throw new Error(er.message); });
    }
}
const api = new Api();
export default api;