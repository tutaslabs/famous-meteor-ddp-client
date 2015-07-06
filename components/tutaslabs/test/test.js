var items = [];
var clickedItem=-1;
var clickedIndex = -1;
var _state;

var question = {one: {align: [0.06,0.03],content:
    `<h3>Reset DB</h3>This button will reset the Database to three pre-defined entries.
    This is accomplished by calling a Meteor Method on the server.
    The counter collection is updated to reflect 3 entries.
   `},


    two: {align: [0.38,0.03],content: `<h3>Add a line item</h3>
        Calls a Meteor Method to add an entry to the Chat collection. Increments the counter collection to reflect the
        adding of one item.
    `} ,
    three: {align: [0.67,0.03],content: `<h3>Get Chat Collection</h3>
        This will issue a DDP get collection on the Chat collection. The collection will be returned from
        the local collection database on the client if it is current, otherwise it will be retrieved from the server.
        The Meteor Method Call results window is used to display the text of the first record in the collection to show that it works.
    `},
    four: {align: [0.3,0.78],content: `<h3>Collection Counter Monitor</h3>
        This displays the watch results from the counter collection. Any changes to the collection will trigger a reactive
        update of this content.
    `},
    five: {align: [0.1,0.88],content: `<h3>Collection Chat Monitor</h3>
        This text field displays the results of watching the Chat collection in real time. It will display the Chat ID,
            text, and DDP message type. The message types we are interested in are added,removed and changed. The response
        from the server will contain the NEW values of the Chat record that was added or modified.
            <br><br>We do not use this data in the application. To update the Chat listings we issue a get collection whenever
                we see this collection change. Since our collection is small there is no performance impact.
    `}};


var bclicked = function(event) {
    event.stopPropagation()
    _state.set('call', {resultTo: 'test3', method: 'removeChat', payload: event.srcElement.name});
    _state.set('call', '');
}

var setClickEvents = function() {
    setTimeout(function() {
        var b = document.getElementsByClassName("but");
        for (var i= 0;i<b.length;i++)
        {
            b[i].addEventListener("click", bclicked);
        }
    },500);
}

var qclicked = function(event) {
    event.stopPropagation()
    var n = this.attributes.name.value;
    _state.set('infoContent',question[n].content);
    _state.set('displayInfo','block')

}

var setQClickEvents = function() {
    setTimeout(function() {
        var b = document.getElementsByClassName("question");
        for (var i= 0;i<b.length;i++)
        {
            b[i].addEventListener("click", qclicked);
        }
    },500);
}


var listeners = function($dispatcher,$state) {
//results from 'calls' to server
    $dispatcher.on('test',function(event) {
        $state.set('results','Add result: '+event.detail)
        setClickEvents()

    })
    $dispatcher.on('test2',function(event) {

        $state.set('results','Reset result: '+event.detail)
        setClickEvents()
    })

    $dispatcher.on('test3',function(event) {

        $state.set('results','Getlist :' +event.detail[0].text)

    })
}




FamousFramework.scene('tutaslabs:test', {
    behaviors: {
        '$self': {
            style: {
                'background-color': 'lightblue'
            }
        },
        '#pop1': {
            'content': 'Delete Item?',
            'buttons': 'block',
            'popit': function(displayPOP) {
                return displayPOP;
            }
        },
        '#pop2': {
            'content': '[[identity|infoContent]]',
            'size': [400,400],
            'buttons': 'none',
            'color': 'azure',
            'buttonText': 'Close',
            'popit': function(displayInfo) {
                return displayInfo;
            }
        },

        '#htemplate' : {
            size: [undefined, 50],
            'align': [0.2, 0.1],
            'origin': [0.5, 0.5],
            content: ' '
        },
        '#notice' : {
            size: [200, 50],
            'align': [0.38, 0.65],
            'origin': [0.5, 0.5],
            content: 'Meteor Method Call Results '
        },

        'tutaslabs:meteor-ddp': {
            'connect': '[[identity]]',
            'call': '[[identity]]',
            'getcol': '[[identity]]'
        },
        '#text': {
            'align': [0.5, 0.8],
            'origin': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'size': [200, 50],
            'style': {
                'background-color': 'red', 'text-align': 'center', 'line-height': '50px', 'pointer': 'none',
                'border-radius': '5px'
            },
            'content': function (counter) {
                return 'Number of items is: ' + counter;
            },
            'unselectable': true

        },
        '#response': {
            'align': [0.5,0.9],
            'origin': [0.5,0.5],
            'mount-point': [0.5,0.5],
            'size': [500,50],
            'style': {
                'background-color':'lightgreen','text-align':'center','line-height':'50px',
                'border-radius': '5px'
            },
            'content': '[[identity|chat]]',
            'unselectable':true

        },

        '#button': {
            'align': [0.5,0],
            'origin': [0.5,0],
            'mount-point': [0.5,0],
            'size': [100,50],
            'style': {
                'background-color':'yellow','text-align':'center','line-height':'50px','cursor':'pointer',
                'border-radius': '20px'
            },
            'content': 'Add',
            'unselectable': true

        },
        '#getcol': {
            'align': [0.8,0],
            'origin': [0.5,0],
            'mount-point': [0.5,0],
            'size': [100,50],
            'style': {
                'background-color':'yellow','text-align':'center','line-height':'50px','cursor':'pointer',
                'border-radius': '20px'
            },
            'content': 'GetCol',
            'unselectable': true

        },
        '#results': {
            'align': [0.5,0.68],
            'origin': [0.5,0],
            'mount-point': [0.5,0],
            'size': [300,50],
            'style': {
                'background-color':'lightyellow','text-align':'center','line-height':'50px',
                'overflow':'hidden'
            },
            'content': '[[identity|results]]',
            'unselectable': true

        },
        '#reset': {
            'align': [0.2,0],
            'origin': [0.5,0],
            'mount-point': [0.5,0],
            'size': [100,50],
            'style': {
                'background-color':'yellow','text-align':'center','line-height':'50px','cursor':'pointer',
                'border-radius': '20px'
            },
            'content': 'Reset DB',
            'unselectable': true

        },
        'scroll-view': {
            'iheight': 50,
            'size': [500, 300],
            'align': [0.2,0.2]


        },
        '.scroll-view-item': {
            style: function($index,clicked) {
                var bc = 'white';
                if ($index===clickedIndex) {
                    bc = 'lightblue';
                }
                return {
                'background-color': bc,
                'border': '1px solid black',
                'color': '#40b2e8',
                'font-family': 'Lato',
                'font-size': '30px',
                'padding': '10px'
            }

            },

            'unselectable': true,
            'position' : function($index, iheight) {
                return [0, $index * iheight];
            },

            '$repeat': function (colres,itemTemp,clicked) {

                var mess = []
                var x=0;
                for (var i in colres) {
                    items[x]= i;
                    x++;
                    var temp = Handlebars.compile(itemTemp);
                    var context = {title: colres[i].text,index: x,key: i,cost: 25};
                    var html = temp(context);
                    mess.push({
                        content: html
                    });
                }
                return mess;
            }
        },
        '.question': {
            size: [20,20],
            content: '?',
            origin: [0.5,0.5],
            'position-z': 10,

            style: {
                'border-radius':'10px',
                'color':'white',
                'background-color':'blue',
                'text-align':'center',
                'cursor':'pointer',
                'border':'1px black solid'
            },
            '$repeat': function() {
                var mess = [];
                    for (var i in question) {
                        mess.push(
                            {align: question[i].align,
                            attributes: {name: i}}

                        )
                    }

                return mess;
                }

        }


    },

    events: {
        '#pop1': {
            'clicked': function($payload,$event,$state) {
                $state.set('displayPOP','none')
                clickedIndex = -1;
                $state.set('clicked',!$state.get('clicked'));
                if ($payload === 'OK') {
                    $state.set('call', {resultTo: 'test3', method: 'removeChat', payload: clickedItem});
                    $state.set('call', '');
                }
            }

        },
        '#pop2': {
            'clicked': function ($payload, $event, $state) {

                $state.set('displayInfo', 'none')
            }
        },

        '$lifecycle': {
            'post-load': function ($state,$dispatcher) {
                _state = $state;

                var c = $state.get('connect');
                listeners($dispatcher,$state)
                if (c === '') {
                    var host = window.location.host;
                    if (host.indexOf('ocalhost') > 0) {
                        host = 'localhost:3000';
                    }
                    $state.set('connect', {debug: true,uri: 'ws://' + host + '/websocket', watch: ['counter', 'chat']})
                }
                setClickEvents();
                setQClickEvents();

            }

        },
        'tutaslabs:meteor-ddp': {
            'chat': function($payload,$event,$state) {
                $state.set('chat','ID: '+$payload.chg._id+' Text: '+$payload.chg.text+' Msg: '+$payload.mess)
                if ($payload.mess === 'removed' || $payload.mess === 'changed' || $payload.mess === 'added') {
                    $state.set('getcol',{col: 'chat',res: 'getChat'});
                    $state.set('getcol','');
                    setClickEvents();

                }
            },

            'counter': function($payload,$event,$state) {
                $state.set('counter',$payload.chg.count);

            },
            'getChat': function($payload,$event,$state){

                $state.set('colres',$payload);
                setClickEvents();

            },
            'error': function($payload,$dispatcher) {
                console.warn('error ',$payload);
            }

        },
        '.scroll-view-item' : {
            'click' : function($index,$event,$state) {
                clickedItem = items[$index];
                clickedIndex = $index;
                $state.set('displayPOP','block');
                $state.set('clicked',!$state.get('clicked'));
            }
        },
        '#reset': {
            'click': function($event,$state) {
                $event.stopPropagation()
                $state.set('call',{resultTo: 'test2',method: 'reset',payload: []});
                $state.set('call','');

            }
        },
        '#button': {
            'click': function ($event, $state) {
                $event.stopPropagation()
                $state.set('call', {resultTo: 'test', method: 'addChat', payload: {text: 'I was added', descr: 'this is a test'}})
                $state.set('call', '')

            }
        },
        '#getcol': {
            'click': function($event,$state) {
                $state.set('call',{resultTo: 'test3',method: 'getlist',payload: []});
                $state.set('call','');

            }
        }
    },

    states: {
        'displayPOP': 'none',
        'displayInfo': 'none',
        'iheight': 50,
        'connect':'',
        'counter': 0,
        'chat': 'this is it',
        'call': '',
        'getcol':'',
        'colres': '',
        'clicked': false,
        'results': '',
        'itemTemp':  `<div>Text is: {{title}}
                        cost is {{cost}}
                        <button class="but" name="{{key}}" >Delete</button></div>`,
        'infoContent': 'this is info'

    },

    tree: 'tree.html'

}).config({
    imports: {
        'tutaslabs:ui': ['popup'],
        'tutaslabs:layouts': ['scroll-view'],
    },
    includes: ['htemplate.js','helpers.js']
});
