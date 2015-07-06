FamousFramework.scene('tutaslabs:layouts:scroll-view', {
    behaviors: {
        //self seems to be broke so we define our scrollview container as sv
        '#sv': {

//            position: '[[identity]]',
            align: '[[identity]]',
            origin: '[[identity]]',

            size: '[[identity]]',

            style: function(border) {
                var style = {};
                style.overflow = 'scroll';
                if (border) style.border = border;
                return style;
            }
        },
        '.item' : {
            '$yield' : '.scroll-view-item',
            'size' : function(iheight) {
                 return [undefined, iheight];
            }
        }
    },
    events: {
        '$public': {
            'iheight' : '[[setter]]',
            'position' : '[[setter]]',
            'size' : '[[setter]]',
            'align': '[[setter]]'
        }
    },
    states: {
        iheight: 50,
        size: [400, 400],
        position: [100, 100],
        border: '2px solid black',
        align: [0,0],
        origin: [0,0]

    }, 
    tree: `
<node id="sv">

        <node class='item'></node>
</node>

    `
});
