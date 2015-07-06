var getElementFromDOMElement = function(node, callback) {

    var clock = FamousFramework.FamousEngine.core.FamousEngine.getClock();
    var query = function() {
        var nodeId = node.getLocation();
        var elements = document.querySelector(nodeId.split('/')[0]).querySelectorAll('[data-fa-path]');
        for (var i = 0; i < elements.length; ++i) {
            if (elements[i].dataset.faPath === nodeId) {
                return callback(elements[i]);
            }
        }
        clock.setTimeout(query, 16);
    };
    // except for this :(
    clock.setTimeout(query, 64);
}

var renderTemplate = function(node,content) {
    var self = this;
    var scontent = content;
    getElementFromDOMElement(node, function (el) {
        var contentdiv = el.childNodes[0]
        contentdiv.innerHTML = scontent;
    }.bind(self))
}
