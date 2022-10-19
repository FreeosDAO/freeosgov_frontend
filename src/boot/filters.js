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

    Vue.filter('shortNumber', function(value){
        let newValue = parseFloat(value);
        if(newValue < 100){
            newValue = newValue.toFixed(4)
        }
        else{
            newValue = newValue.toString().split('.')[0].length > 3 ? newValue.toPrecision(3) : newValue.toFixed(2);
        }
        
        newValue = parseFloat(newValue); //remove trailing 0s

        const suffixes = ["", "K", "M", "B","T"];
        let suffixNum = 0;
        while (newValue >= 1000) {
            newValue /= 1000;
            suffixNum++;
        }
        

        newValue += suffixes[suffixNum];
        return newValue;
    })

    Vue.filter('roundTo4Decimal', function(value){
        if(value){
            let newValue = parseFloat(value);
            return Math.round(newValue * 10) / 10000;
        }else{
            return 0;
        }
    })

    Vue.filter('roundTo6Decimal', function(value){
        if(value){
            let newValue = parseFloat(value);
            return Math.round(newValue * 1000000) / 1000000;
        }else{
            return 0;
        }
    })

    Vue.filter('roundToDecimal', function(value, precision){
        precision ? precision : 4;
        let pw = 10 ** precision;
        if(value){
            let newValue = parseFloat(value);
            return Math.round(newValue * pw) / pw;
        }else{
            return 0;
        }
    })

  }

  

  



