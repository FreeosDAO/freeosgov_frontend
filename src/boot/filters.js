// src/boot/filters.js
export default ({ Vue}) => {
    Vue.filter('capitalize', function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    })

    Vue.filter('secondsToDhms', function (seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d + (d == 1 ? "day" : "days") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? "hr" : "hrs") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? "min" : "mins") : "";

        if (dDisplay && hDisplay && mDisplay) {
            return dDisplay + ", " + hDisplay
        } else if (hDisplay) {
            return hDisplay + ", " + mDisplay
        } else if (dDisplay) {
            return dDisplay
        } else if(mDisplay) {
            return "<strong class='text-negative'>" + mDisplay + "</strong>"
        } else {
            return "<strong class='text-negative'><1 min</strong>"
        }
    })
  }


