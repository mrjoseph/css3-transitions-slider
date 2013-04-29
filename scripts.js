var animate = animate || {};

animate = {
    settings :{
        distance : 400,
        speed : 1000,
        right : document.getElementById('move-right'),
        left : document.getElementById('move-left'),
        active: false,
        pos : 'left'
    },
    load : (function(){
        //Create Constructor Function
        MoveBox = function(elem,fx,ease,speed,position,callback){
            this.elem = document.getElementById(elem);
            this.fx = fx;
            this.ease = ease;
            this.speed = speed;
            this.position = position;
            this.easeSpeed = this.ease + this.speed+ 'ms';
        };

        //Create Prototype
        MoveBox.prototype = {
            Constructor : MoveBox,
			n : this.elem,
			animate : function(dis,n){
                this.elem.removeAttribute('style');
                this.elem.style[this.fx] = this.easeSpeed;
                this.elem.style.position = this.position;
                this.elem.style.left = dis + 'px';
                if(typeof n !== 'undefined'){
                    n();
                }
                return this.elem;
            }
        };
        // this relates to animate = {}
        var _this = this;
        //Create element with these settings
        var element = new MoveBox('box','-webkit-transition','all ',_this.settings.speed,'absolute');
        //Load these settings on page load
        element.animate();
        //Get the element for future reference
        var currentBox = element.animate();
        //add the current position into the box
        currentBox.innerHTML = _this.settings.pos;
        //And any events that you want to happen
        //once the animation has finished
        var callback = function(){
            setTimeout(function(){
               currentBox.innerHTML = _this.settings.pos;
                _this.settings.active = false;
            },_this.settings.speed);
        };

        //Controls Right
        _this.settings.right.addEventListener('click',function(){
            if(!_this.settings.active)
                _this.settings.active = true;
                element.animate(_this.settings.distance,function(){
                    if(_this.settings.pos == 'left'){
                        callback();
                        _this.settings.pos = 'right';
                    }
                });
        },false);
        //Controls Left
        _this.settings.left.addEventListener('click',function(){
            if(!_this.settings.active)
                _this.settings.active = true;
                element.animate(_this.settings.distance - _this.settings.distance,function(){
                    if(_this.settings.pos === 'right'){
                        callback();
                        _this.settings.pos = 'left';
                    }
                });
        },false);
    })
};
window.load = animate.load();

