/**
 * @author Joep Suijkerbuijk
 */

var lights = 0;
var rgb_light = 0;
var temprature_sensor = 0;
var infrared_led = 0;
var lightCounter = 1;
var sensorCounter = 1;
var rgbLightCounter = 1;
var previousPinItem;
var currentHoveredItem;
var currentHoveredItem_before;
var currentHoveredItem_after;
var currentDraggedItem = '';


$(document).ready(function() {

    $('.dragLight').draggable({
        drag: dragging,
        zIndex: 500,
        start: startDrag,
        helper: createLightClone,
        cursor: 'move',
        revert: true,
        scroll: false,
        containment: '#holder'
    });

    $('.dragTemp').draggable({
        drag: dragging,
        zIndex: 500,
        start: startDrag,
        helper: createTempratureClone,
        cursor: 'move',
        revert: true,
        scroll: false,
        containment: '#holder'
    });

    $('.dragRgbLed').draggable({
        drag: dragging,
        zIndex: 500,
        start: startDrag,
        helper: createRgbLedClone,
        cursor: 'move',
        revert: true,
        scroll: false,
        containment: '#holder'
    });


    $('.drop_pin').droppable( {
        drop: handlePinDrop,
        activeClass: 'drop_pin_active',
        hoverClass: 'drop_pin_hover'
    } );

    $('#added_items').droppable( {
        drop: handleOutsidePinDrop
    } );


    function createLightClone( event) {
        var clone = '<div id="draggableClone" class="dragHelperLight" value="light"></div>';
        return clone;
    }

    function createTempratureClone( event ) {
        var clone = '<div id="draggableClone" class="dragHelperTemp" value="sensor"></div>';
        return clone;
    }

    function createRgbLedClone( event ) {
        var clone = '<div id="draggableClone" class="dragHelperRgbLed" value="rgbLed" style="z-index: 500;"></div>';
        return clone;
    }



    function startCloneDrag( event, ui ) {
        previousPinItem = $(this);
        $(this).css('z-index', '500');
        checkDraggedItem(event, ui);
    }


    function startDrag( event, ui ) {
        $(this).css('z-index', '500');
        checkDraggedItem(event, ui);
    }

    function dragging(event, ui){
        currentHoveredItem = $('#added_items').find('.drop_pin_hover'); // search for hovered dom element
        var parent = currentHoveredItem.parent();
        currentHoveredItem_before = currentHoveredItem.prev();
        currentHoveredItem_after = currentHoveredItem.next();

        if (currentHoveredItem_after[0]){ // hovering above pin thingy
            // check if hovered thing is at the first of last item
            if (currentHoveredItem.index() == 0) {
                currentHoveredItem_before = currentHoveredItem.next().next();
                currentHoveredItem_after = currentHoveredItem.next();
            } else if (currentHoveredItem.index() == (parent.children().length)-2 ) {
                currentHoveredItem_before = currentHoveredItem.prev().prev();
                currentHoveredItem_after = currentHoveredItem.prev();
            }
        }

        // when the rgb led draggable hovers above a droppable whit a hover class
        if (currentDraggedItem == 'rgbLed' && currentHoveredItem_after[0]) {
            currentHoveredItem_after.addClass('drop_pin_fake_hover');
            currentHoveredItem_before.addClass('drop_pin_fake_hover');
        } else {
            $('.drop_pin').removeClass('drop_pin_fake_hover');
        }

    }




    function checkDraggedItem (event, ui) {
        if (ui.helper[0].className.search('dragHelperLight') != -1){
            // light started dragging
            currentDraggedItem = 'light';
        } else if (ui.helper[0].className.search('dragHelperTemp') != -1){
            // temp started dragging
            currentDraggedItem = 'sensor';
        } else if (ui.helper[0].className.search('dragHelperRgbLed') != -1){
            // rgbLed started dragging
            currentDraggedItem = 'rgbLed';
            if (ui.helper[0].className.search('dragHelperRgbLedGreen') != -1){
                // rgbLed started dragging
                currentDraggedItem = 'rgbLedGreen';
                currentHoveredItem_before.children( ':not(:first)' ).remove();
                currentHoveredItem_after.children( ':not(:first)' ).remove();
            }
        }
        console.log(currentDraggedItem);
        return currentDraggedItem;
    }

    function handlePinDrop( event, ui ) {

        var item = ui.draggable;
        var clone = ui.helper.clone();
        var itemType = item.attr('value'); //console.log("item :   " +  itemType);
        var pin =  $(this).attr('value'); //console.log("pin :   " +  pin);
        var offSetPos = $(ui.helper).offset();
        droppedItemClassName = ui.draggable.context.className;

        if ($(this).children('div')[0] != undefined){ // when the element contains 2 elements already
            $(this).children('div').remove(); // remove underlying div
            // bug - when item is dropped back onto is previous place, shit gets fucked up!
        }

        // second time - dragged and dropped
        if ((droppedItemClassName.search('dragHelperLight') != -1) ||  (droppedItemClassName.search('dragHelperTemp') != -1) ||  (droppedItemClassName.search('dragHelperRgbLed') != -1)) {
            $(this).append(previousPinItem);
            ui.draggable.css('z-index', '400');
            ui.draggable.position( { of: $(this), my: 'center', at: 'center' } );
            return;
        }

        if(itemType == 'light') {
            lights += 1;
        }

        ui.helper.remove();

        clone.draggable({
            drag: dragging,
            cursor: 'normal',
            scroll: false,
            containment: '#holder',
            start: startCloneDrag
        });


        // place the object in the pin div
        $(this).append(clone);
        clone.css('z-index', '400');
        clone.removeClass("ui-draggable-dragging"); // remove the class that said that this element is being dragged
        // check witch item is dropped! (type)
        if (clone[0].className.search('dragHelperLight') != -1){
            clone.attr('id',(itemType + lightCounter));
            lightCounter++;
        } else if (clone[0].className.search('dragHelperTemp') != -1){
            clone.attr('id',(itemType + sensorCounter));
            sensorCounter++;
        } else if (clone[0].className.search('dragHelperRgbLed') != -1){
            clone.attr('id',(itemType + rgbLightCounter));
            rgbLightCounter++;

            // clear pin holders if there is already a div inside it!
            if (currentHoveredItem_before.children('div')[0] != undefined){
                currentHoveredItem_before.children('div').remove();
            } if (currentHoveredItem_after.children('div')[0] != undefined){
                currentHoveredItem_after.children('div').remove();
            }

            var cloneRed = "<div id=' "+ itemType + rgbLightCounter + "Red" + "'" + " class='dragHelperRgbLed dragHelperRgbLedRed' value='rgbLed'></div>";
            currentHoveredItem_before.append(cloneRed);
            currentHoveredItem_before.removeClass('drop_pin_fake_hover');
            cloneRed = currentHoveredItem_before.children()[1];
            $(cloneRed).css('z-index', '400');
            $(cloneRed).position( { of: currentHoveredItem_before, my: 'center', at: 'center' } );
            $(cloneRed).draggable({
                drag: dragging,
                cursor: 'normal',
                scroll: false,
                containment: '#holder',
                //helper: createRgbLedClone,
                start: startCloneDrag
            });

            var cloneBlue = "<div id=' "+ itemType + rgbLightCounter + "Blue" + "'" + " class='dragHelperRgbLed dragHelperRgbLedBlue' value='rgbLed'></div>";
            currentHoveredItem_after.append(cloneBlue);
            currentHoveredItem_after.removeClass('drop_pin_fake_hover');
            cloneBlue = currentHoveredItem_after.children()[1];
            $(cloneBlue).css('z-index', '400');
            $(cloneBlue).position( { of: currentHoveredItem_after, my: 'center', at: 'center' } );
            $(cloneBlue).draggable({
                drag: dragging,
                cursor: 'normal',
                scroll: false,
                containment: '#holder',
                //helper: createRgbLedClone,
                start: startCloneDrag
            });

            //clone.draggable( 'option', 'helper', createRgbLedClone );
            clone.addClass('dragHelperRgbLedGreen');

        }
        clone.position( { of: $(this), my: 'center', at: 'center' } );
        clone.draggable( 'option', 'revert', false );

    }


    function handleOutsidePinDrop( event, ui ) {
        console.log(ui);

        var end = $("#lightStack").position().left;
        ui.helper.animate({"left": end.left}, "medium");
        //ui.helper.remove();
    }




});

