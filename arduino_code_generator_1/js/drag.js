/**
 * @author Joep Suijkerbuijk
 */

var lights = 0;
var rgb_light = 0;
var temprature_sensor = 0;
var infrared_led = 0;
var counter = 1;
var previousPinItem;


$(document).ready(function() {

    $('.dragLight').draggable({
        helper: createLightClone,
        cursor: 'move',
        revert: true,
        scroll: false,
        containment: '#holder'
    });

    $('.dragTemp').draggable({
        helper: createTempratureClone,
        cursor: 'move',
        revert: true,
        scroll: false,
        containment: '#holder'
    });


    $('.drop_pin').droppable( {
        drop: handlePinDrop
    } );


    $('#added_items').droppable( {
        drop: handleOutsidePinDrop
    } );


    function createLightClone( event ) {
        var clone = '<div id="draggableClone" class="dragHelperLight" value="light"></div>';
        return clone;
    }

    function createTempratureClone( event ) {
            var clone = '<div id="draggableClone" class="dragHelperTemp" value="temp"></div>';
            return clone;
        }

    function startCloneDrag( event, ui ) {
        previousPinItem = $(this);
    }

    function handlePinDrop( event, ui ) {

        var item = ui.draggable;
        var clone = ui.helper.clone();
        var itemType = item.attr('value'); //console.log("item :   " +  itemType);
        var pin =  $(this).attr('value'); //console.log("pin :   " +  pin);
        var offSetPos = $(ui.helper).offset();
        droppedItemClassName = ui.draggable.context.className;

        // second time - dragged and dropped
        if ((droppedItemClassName.search('dragHelperLight') != -1) ||  (droppedItemClassName.search('dragHelperTemp') != -1)) {
            $(this).append(previousPinItem);
            ui.draggable.position( { of: $(this), my: 'center', at: 'center' } );
            return;
        }

        if(itemType == 'light') {
            lights += 1;
        }

        ui.helper.remove();

        clone.draggable({
            cursor: 'normal',
            scroll: false,
            start: startCloneDrag
        });

        $(this).append(clone);
        clone.attr('id',(itemType + counter));
        clone.position( { of: $(this), my: 'center', at: 'center' } );
        clone.draggable( 'option', 'revert', false );

        counter++;
    }

    function handleOutsidePinDrop( event, ui ) {
        //console.log("-------");
        //console.log(ui);

        var end = $("#lightStack").position().left;
        ui.helper.animate({"left": end.left}, "medium");

        //ui.helper.remove();
    }




});

