Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

String.prototype.clearAllSpace = function() {
    return this.replace(/\s*/g,"");
}

String.prototype.splitWithChar = function(char) {
    let str = '';
    for (let i = 0; i < this.length; ++i) {
        str = str + this.charAt(i) + char;
    }
    return str;
}