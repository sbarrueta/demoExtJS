/*
This file is part of Ext JS 3.4

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-04-03 15:07:25
*/
/**
 * @class Ext.layout.boxOverflow.Scroller
 * @extends Ext.layout.boxOverflow.None
 * Description
 */
Ext.layout.boxOverflow.Scroller = Ext.extend(Ext.layout.boxOverflow.None, {
    /**
     * @cfg animateScroll
     * @type Boolean
     * True to animate the scrolling of items within the layout (defaults to true, ignored if enableScroll is false)
     */
    animateScroll: true,
    
    /**
     * @cfg scrollIncrement
     * @type Number
     * The number of pixels to scroll by on scroller click (defaults to 100)
     */
    scrollIncrement: 100,
    
    /**
     * @cfg wheelIncrement
     * @type Number
     * The number of pixels to increment on mouse wheel scrolling (defaults to <tt>3</tt>).
     */
    wheelIncrement: 3,
    
    /**
     * @cfg scrollRepeatInterval
     * @type Number
     * Number of milliseconds between each scroll while a scroller button is held down (defaults to 400)
     */
    scrollRepeatInterval: 400,
    
    /**
     * @cfg scrollDuration
     * @type Number
     * Number of seconds that each scroll animation lasts (defaults to 0.4)
     */
    scrollDuration: 0.4,
    
    /**
     * @cfg beforeCls
     * @type String
     * CSS class added to the beforeCt element. This is the element that holds any special items such as scrollers,
     * which must always be present at the leftmost edge of the Container
     */
    beforeCls: 'x-strip-left',
    
    /**
     * @cfg afterCls
     * @type String
     * CSS class added to the afterCt element. This is the element that holds any special items such as scrollers,
     * which must always be present at the rightmost edge of the Container
     */
    afterCls: 'x-strip-right',
    
    /**
     * @cfg scrollerCls
     * @type String
     * CSS class added to both scroller elements if enableScroll is used
     */
    scrollerCls: 'x-strip-scroller',
    
    /**
     * @cfg beforeScrollerCls
     * @type String
     * CSS class added to the left scroller element if enableScroll is used
     */
    beforeScrollerCls: 'x-strip-scroller-left',
    
    /**
     * @cfg afterScrollerCls
     * @type String
     * CSS class added to the right scroller element if enableScroll is used
     */
    afterScrollerCls: 'x-strip-scroller-right',
    
    /**
     * @private
     * Sets up an listener to scroll on the layout's innerCt mousewheel event
     */
    createWheelListener: function() {
        this.layout.innerCt.on({
            scope     : this,
            mousewheel: function(e) {
                e.stopEvent();

                this.scrollBy(e.getWheelDelta() * this.wheelIncrement * -1, false);
            }
        });
    },
    
    /**
     * @private
     * Most of the heavy lifting is done in the subclasses
     */
    handleOverflow: function(calculations, targetSize) {
        this.createInnerElements();
        this.showScrollers();
    },
    
    /**
     * @private
     */
    clearOverflow: function() {
        this.hideScrollers();
    },
    
    /**
     * @private
     * Shows the scroller elements in the beforeCt and afterCt. Creates the scrollers first if they are not already
     * present. 
     */
    showScrollers: function() {
        this.createScrollers();
        
        this.beforeScroller.show();
        this.afterScroller.show();
        
        this.updateScrollButtons();
    },
    
    /**
     * @private
     * Hides the scroller elements in the beforeCt and afterCt
     */
    hideScrollers: function() {
        if (this.beforeScroller != undefined) {
            this.beforeScroller.hide();
            this.afterScroller.hide();          
        }
    },
    
    /**
     * @private
     * Creates the clickable scroller elements and places them into the beforeCt and afterCt
     */
    createScrollers: function() {
        if (!this.beforeScroller && !this.afterScroller) {
            var before = this.beforeCt.createChild({
                cls: String.format("{0} {1} ", this.scrollerCls, this.beforeScrollerCls)
            });
            
            var after = this.afterCt.createChild({
                cls: String.format("{0} {1}", this.scrollerCls, this.afterScrollerCls)
            });
            
            before.addClassOnOver(this.beforeScrollerCls + '-hover');
            after.addClassOnOver(this.afterScrollerCls + '-hover');
            
            before.setVisibilityMode(Ext.Element.DISPLAY);
            after.setVisibilityMode(Ext.Element.DISPLAY);
            
            this.beforeRepeater = new Ext.util.ClickRepeater(before, {
                interval: this.scrollRepeatInterval,
                handler : this.scrollLeft,
                scope   : this
            });
            
            this.afterRepeater = new Ext.util.ClickRepeater(after, {
                interval: this.scrollRepeatInterval,
                handler : this.scrollRight,
                scope   : this
            });
            
            /**
             * @property beforeScroller
             * @type Ext.Element
             * The left scroller element. Only created when needed.
             */
            this.beforeScroller = before;
            
            /**
             * @property afterScroller
             * @type Ext.Element
             * The left scroller element. Only created when needed.
             */
            this.afterScroller = after;
        }
    },
    
    /**
     * @private
     */
    destroy: function() {
        Ext.destroy(this.beforeScroller, this.afterScroller, this.beforeRepeater, this.afterRepeater, this.beforeCt, this.afterCt);
    },
    
    /**
     * @private
     * Scrolls left or right by the number of pixels specified
     * @param {Number} delta Number of pixels to scroll to the right by. Use a negative number to scroll left
     */
    scrollBy: function(delta, animate) {
        this.scrollTo(this.getScrollPosition() + delta, animate);
    },
    
    /**
     * @private
     * Normalizes an item reference, string id or numerical index into a reference to the item
     * @param {Ext.Component|String|Number} item The item reference, id or index
     * @return {Ext.Component} The item
     */
    getItem: function(item) {
        if (Ext.isString(item)) {
            item = Ext.getCmp(item);
        } else if (Ext.isNumber(item)) {
            item = this.items[item];
        }
        
        return item;
    },
    
    /**
     * @private
     * @return {Object} Object passed to scrollTo when scrolling
     */
    getScrollAnim: function() {
        return {
            duration: this.scrollDuration, 
            callback: this.updateScrollButtons, 
            scope   : this
        };
    },
    
    /**
     * @private
     * Enables or disables each scroller button based on the current scroll position
     */
    updateScrollButtons: function() {
        if (this.beforeScroller == undefined || this.afterScroller == undefined) {
            return;
        }
        
        var beforeMeth = this.atExtremeBefore()  ? 'addClass' : 'removeClass',
            afterMeth  = this.atExtremeAfter() ? 'addClass' : 'removeClass',
            beforeCls  = this.beforeScrollerCls + '-disabled',
            afterCls   = this.afterScrollerCls  + '-disabled';
        
        this.beforeScroller[beforeMeth](beforeCls);
        this.afterScroller[afterMeth](afterCls);
        this.scrolling = false;
    },
    
    /**
     * @private
     * Returns true if the innerCt scroll is already at its left-most point
     * @return {Boolean} True if already at furthest left point
     */
    atExtremeBefore: function() {
        return this.getScrollPosition() === 0;
    },
    
    /**
     * @private
     * Scrolls to the left by the configured amount
     */
    scrollLeft: function(animate) {
        this.scrollBy(-this.scrollIncrement, animate);
    },
    
    /**
     * @private
     * Scrolls to the right by the configured amount
     */
    scrollRight: function(animate) {
        this.scrollBy(this.scrollIncrement, animate);
    },
    
    /**
     * Scrolls to the given component.
     * @param {String|Number|Ext.Component} item The item to scroll to. Can be a numerical index, component id 
     * or a reference to the component itself.
     * @param {Boolean} animate True to animate the scrolling
     */
    scrollToItem: function(item, animate) {
        item = this.getItem(item);
        
        if (item != undefined) {
            var visibility = this.getItemVisibility(item);
            
            if (!visibility.fullyVisible) {
                var box  = item.getBox(true, true),
                    newX = box.x;
                    
                if (visibility.hiddenRight) {
                    newX -= (this.layout.innerCt.getWidth() - box.width);
                }
                
                this.scrollTo(newX, animate);
            }
        }
    },
    
    /**
     * @private
     * For a given item in the container, return an object with information on whether the item is visible
     * with the current innerCt scroll value.
     * @param {Ext.Component} item The item
     * @return {Object} Values for fullyVisible, hiddenLeft and hiddenRight
     */
    getItemVisibility: function(item) {
        var box         = this.getItem(item).getBox(true, true),
            itemLeft    = box.x,
            itemRight   = box.x + box.width,
            scrollLeft  = this.getScrollPosition(),
            scrollRight = this.layout.innerCt.getWidth() + scrollLeft;
        
        return {
            hiddenLeft  : itemLeft < scrollLeft,
            hiddenRight : itemRight > scrollRight,
            fullyVisible: itemLeft > scrollLeft && itemRight < scrollRight
        };
    }
});

Ext.layout.boxOverflow.scroller = Ext.layout.boxOverflow.Scroller;


/**
 * @class Ext.layout.boxOverflow.VerticalScroller
 * @extends Ext.layout.boxOverflow.Scroller
 * Description
 */
Ext.layout.boxOverflow.VerticalScroller = Ext.extend(Ext.layout.boxOverflow.Scroller, {
    scrollIncrement: 75,
    wheelIncrement : 2,
    
    handleOverflow: function(calculations, targetSize) {
        Ext.layout.boxOverflow.VerticalScroller.superclass.handleOverflow.apply(this, arguments);
        
        return {
            targetSize: {
                height: targetSize.height - (this.beforeCt.getHeight() + this.afterCt.getHeight()),
                width : targetSize.width
            }
        };
    },
    
    /**
     * @private
     * Creates the beforeCt and afterCt elements if they have not already been created
     */
    createInnerElements: function() {
        var target = this.layout.innerCt;
        
        //normal items will be rendered to the innerCt. beforeCt and afterCt allow for fixed positioning of
        //special items such as scrollers or dropdown menu triggers
        if (!this.beforeCt) {
            this.beforeCt = target.insertSibling({cls: this.beforeCls}, 'before');
            this.afterCt  = target.insertSibling({cls: this.afterCls},  'after');

            this.createWheelListener();
        }
    },
    
    /**
     * @private
     * Scrolls to the given position. Performs bounds checking.
     * @param {Number} position The position to scroll to. This is constrained.
     * @param {Boolean} animate True to animate. If undefined, falls back to value of this.animateScroll
     */
    scrollTo: function(position, animate) {
        var oldPosition = this.getScrollPosition(),
            newPosition = position.constrain(0, this.getMaxScrollBottom());
        
        if (newPosition != oldPosition && !this.scrolling) {
            if (animate == undefined) {
                animate = this.animateScroll;
            }
            
            this.layout.innerCt.scrollTo('top', newPosition, animate ? this.getScrollAnim() : false);
            
            if (animate) {
                this.scrolling = true;
            } else {
                this.scrolling = false;
                this.updateScrollButtons();
            }
        }
    },
    
    /**
     * Returns the current scroll position of the innerCt element
     * @return {Number} The current scroll position
     */
    getScrollPosition: function(){
        return parseInt(this.layout.innerCt.dom.scrollTop, 10) || 0;
    },
    
    /**
     * @private
     * Returns the maximum value we can scrollTo
     * @return {Number} The max scroll value
     */
    getMaxScrollBottom: function() {
        return this.layout.innerCt.dom.scrollHeight - this.layout.innerCt.getHeight();
    },
    
    /**
     * @private
     * Returns true if the innerCt scroll is already at its right-most point
     * @return {Boolean} True if already at furthest right point
     */
    atExtremeAfter: function() {
        return this.getScrollPosition() >= this.getMaxScrollBottom();
    }
});

Ext.layout.boxOverflow.scroller.vbox = Ext.layout.boxOverflow.VerticalScroller;


/**
 * @class Ext.layout.boxOverflow.HorizontalScroller
 * @extends Ext.layout.boxOverflow.Scroller
 * Description
 */
Ext.layout.boxOverflow.HorizontalScroller = Ext.extend(Ext.layout.boxOverflow.Scroller, {
    handleOverflow: function(calculations, targetSize) {
        Ext.layout.boxOverflow.HorizontalScroller.superclass.handleOverflow.apply(this, arguments);
        
        return {
            targetSize: {
                height: targetSize.height,
                width : targetSize.width - (this.beforeCt.getWidth() + this.afterCt.getWidth())
            }
        };
    },
    
    /**
     * @private
     * Creates the beforeCt and afterCt elements if they have not already been created
     */
    createInnerElements: function() {
        var target = this.layout.innerCt;
        
        //normal items will be rendered to the innerCt. beforeCt and afterCt allow for fixed positioning of
        //special items such as scrollers or dropdown menu triggers
        if (!this.beforeCt) {
            this.afterCt  = target.insertSibling({cls: this.afterCls},  'before');
            this.beforeCt = target.insertSibling({cls: this.beforeCls}, 'before');
            
            this.createWheelListener();
        }
    },
    
    /**
     * @private
     * Scrolls to the given position. Performs bounds checking.
     * @param {Number} position The position to scroll to. This is constrained.
     * @param {Boolean} animate True to animate. If undefined, falls back to value of this.animateScroll
     */
    scrollTo: function(position, animate) {
        var oldPosition = this.getScrollPosition(),
            newPosition = position.constrain(0, this.getMaxScrollRight());
        
        if (newPosition != oldPosition && !this.scrolling) {
            if (animate == undefined) {
                animate = this.animateScroll;
            }
            
            this.layout.innerCt.scrollTo('left', newPosition, animate ? this.getScrollAnim() : false);
            
            if (animate) {
                this.scrolling = true;
            } else {
                this.scrolling = false;
                this.updateScrollButtons();
            }
        }
    },
    
    /**
     * Returns the current scroll position of the innerCt element
     * @return {Number} The current scroll position
     */
    getScrollPosition: function(){
        return parseInt(this.layout.innerCt.dom.scrollLeft, 10) || 0;
    },
    
    /**
     * @private
     * Returns the maximum value we can scrollTo
     * @return {Number} The max scroll value
     */
    getMaxScrollRight: function() {
        return this.layout.innerCt.dom.scrollWidth - this.layout.innerCt.getWidth();
    },
    
    /**
     * @private
     * Returns true if the innerCt scroll is already at its right-most point
     * @return {Boolean} True if already at furthest right point
     */
    atExtremeAfter: function() {
        return this.getScrollPosition() >= this.getMaxScrollRight();
    }
});

Ext.layout.boxOverflow.scroller.hbox = Ext.layout.boxOverflow.HorizontalScroller;