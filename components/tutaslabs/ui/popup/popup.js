FamousFramework.scene('tutaslabs:ui:popup', {
    behaviors: {
        '#popup': {
            'align': [0.5, 0.3],
            'origin': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'size': '[[identity]]',
            'position-z':10,
            'style': function(popit,color) {
                return {
                    'background-color': color,
                    'padding-top': '10px',
                    'border-radius': '20px',
                    'text-align': 'center',
                    'border': '2px black solid',
                    'display': popit
                }
            },
            'unselectable': false,
            'content': function(content) {
                return content;
            }
        },
        '.button': {
            'align': [0.5, 0.4],
            'origin': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'size': [100, 30],
            'position-z':20,
            'style': function(displayBTNS) {

                return {
                    'background-color': 'lightblue',
                    'border-radius': '15px',
                    'cursor':'pointer',
                    'text-align':'center',
                    'line-height':'30px',
                    'display': displayBTNS
                }
            },
            'content': 'Ok'
        },
        '.button2': {
            'align': [0.5, 0.7],
            'origin': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'size': [100, 30],
            'position-z':20,
            'style': function() {

                return {
                    'background-color': 'lightblue',
                    'border-radius': '15px',
                    'cursor':'pointer',
                    'text-align':'center',
                    'line-height':'30px'

                }
            },
            'content': '[[identity|buttonText]]'
        }
    },
    events: {

        '$public': {
          'content': '[[setter]]',
          'popit': '[[setter]]',
            'size': '[[setter]]',
            'buttons': '[[setter|displayBTNS]]',
            'color': '[[setter]]',
            'buttonText': '[[setter]]'
        },
        '.button': {
            'click': function($event,$state,$dispatcher) {
                $event.stopPropagation()
                $state.set('popit','none')
                $dispatcher.emit('clicked','OK')
            }
        },
        '.button2': {
            'click': function ($event, $state, $dispatcher) {
                $event.stopPropagation()
                $state.set('popit', 'none')
                $dispatcher.emit('clicked', 'CANCEL')
            }
        },
        '#popup': {
            'click': function($event,$state,$dispatcher) {
                $event.stopPropagation()
                $state.set('popit','none')
                $dispatcher.emit('clicked','CANCEL')
            }
        }
    },
    states: {
        popit: 'none',
        content: 'Delete',
        size: [150, 150],
        displayBTNS: 'block',
        color: 'red',
        buttonText: 'Cancel'

    },

    tree:
`<node id="popup">
    <node class="button"></node>
    <node class="button2"></node>
</node>`
});
