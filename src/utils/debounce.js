export  function debounce(handle, delay) {
    var timer = null;
    return function() {
        var _this = this, _args = arguments;
        if(timer) clearTimeout(timer);
        timer = setTimeout(function() {
            handle.apply(_this, _args);
        }, delay)
    }
}