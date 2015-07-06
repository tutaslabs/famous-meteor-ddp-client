FamousFramework.scene('famous:layouts:scroll-view', {
    behaviors: {
        '$self': {

            position: function(scrollViewPosition) {
                return scrollViewPosition;
            },
            size: function(scrollViewSize){
                return scrollViewSize;
            },

            style: function(border) {
                var style = {};
                style.overflow = 'scroll';
                if (border) style.border = border;
                return style;
            }
        },
        '.item' : {
            '$yield' : '.scroll-view-item',
            'size' : function(itemHeight) {
                 return [undefined, itemHeight];
            },
            'position' : function($index, itemHeight) {
                return [0, $index * itemHeight];
            }
        }
    },
    events: {
        '$public': {
            'item-height' : '[[setter|camel]]',
            'scroll-view-position' : '[[setter|camel]]',
            'scroll-view-size' : '[[setter|camel]]',
            'position': '[[setter]]',
            'size': '[[setter]]',
            'style': '[[setter]]'
        }
    },
    states: {
        itemHeight: 50,
        scrollViewSize: [400, 800],
        scrollViewPosition: [100, 100],
        border: '3px solid #40b2e8'
    }, 
    tree: `
        <node class='item'></node>
    `
});
