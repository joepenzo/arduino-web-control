/**
 * @author Joep Suijkerbuijk
 */

var lights = 0;
var allLights = new Array();
var rgb_light = 0;
var temprature_sensor = 0;
var infrared_led = 0;


$( init );

function init() {

  $('.makeMeDraggable_1').draggable({
      containment: '#holder',
      cursor: 'move',
      revert : true,
      //helper: makeMeDraggableClone,
      stop: handleDragStop
  });

  $('.makeMeDroppable_1').droppable( {
      drop: handleDrop
  } );

}


function makeMeDraggableClone( event ) {
    var clone = '<div id="draggableHelper" class="makeMeDraggable_1"></div>';
    return clone;
}

function handleDragStop( event, ui ) {
    var offsetXPos = parseInt( ui.offset.left );
    var offsetYPos = parseInt( ui.offset.top );
    //console.log( "Drag stopped!\n\nOffset: (" + offsetXPos + ", " + offsetYPos + ")\n");
}

function handleDrop( event, ui ) {
    var item = ui.draggable;
    var itemType = item.attr('value');
    var pin =  $(this).attr('value');

    if(itemType == 'light') {
        lights += 1;
    }
    allLights.push(itemType + lights + "_" + pin);
    console.log(allLights);
//    console.log("item :   " +  item.attr('id'));
//    console.log("pin :   " +  $(this).attr('value')  );

    ui.draggable.addClass( 'correct' );
    ui.draggable.position( { of: $(this), my: 'center', at: 'center' } );
    ui.draggable.draggable( 'option', 'revert', false );
}