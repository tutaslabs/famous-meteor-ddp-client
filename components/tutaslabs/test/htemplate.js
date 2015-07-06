
/**
 * Attach:
 *      To attach raw engine code to a component,
 *      simply pass in the component, version and
 *      the context that it'll live in.
 *
 *      Inside of our executable function, we'll
 *      have access to the node of that context
 *      and can use it with
 */
FamousFramework.attach('#htemplate', function(node) {


    var source = `<div>This line is an example of <b>handlebars</b> rendered template {{title}} cost is {{cost}}
                    <br>The list items are also templated to allow displaying more complex content
                    <br>Click on list item to see a <b>delete</b> popup.</div>`
    var temp = Handlebars.compile(source);
    var context = {title: "test",cost: 25};
    var html = temp(context);

    renderTemplate(node,html);
});
