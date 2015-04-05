$(function(){
  $window = $('#window'), $bird = $('#bird'),  transition=false,
  pipeId = 0, vertical= false, pigs = [];
  var time = new Date().getTime();
  var myo = Myo.create(0);

  myo.on('wave_out', function(){
	if(!isIntervalCorrect()) {
		return;
	}
	goRight();
  });
  myo.on('fist', function(){
	if(!isIntervalCorrect()) {
		return;
	}
	goUp();
  });
  myo.on('fingers_spread', function(){
	if(!isIntervalCorrect()) {
		return;
	}
	goDown();
  });
  myo.on('wave_in', function(){
	if(!isIntervalCorrect()) {
		return;
	}
	goLeft();
  });
  myo.on('fingers_spread', function(){
		if(!isIntervalCorrect()) {
			return;
		}
		if(vertical) {
			vertical = false;
		} else {
			vertical = true;
		}
  });
  function goLeft() {
	pos = $bird.position();
	left = pos.left;
	value = pos.top;
	if(left+50 >= $window.position().left)
		$bird.animate({'left':left-30, 'top':value-40}, 200).animate({'left':left-60, 'top':value}, 200);
	else 
		$bird.position().left = 0;
	checkOverlap();
  }
  
  function isIntervalCorrect() {
	newTime = new Date().getTime();
	if(newTime - time >= 400) {
		time = newTime;
		return true;
	} else {
		return false;
	}
  }
  
  function goUp() {
	pos = $bird.position();
	left = pos.left;
	value = pos.top;
	if(value-50 >= 172)
		$bird.animate({'left':left, 'top':value-50}, 300);
	else 
		$bird.animate({'left':left, 'top':172}, 300);
	checkOverlap();	
  }
  
  function goRight() {
	pos = $bird.position();
	left = pos.left;
	value = pos.top;
	winPos = $window.width() - $bird.width();
	if(left+50 <= winPos)
		$bird.animate({'left':left+30, 'top':value-40}, 200).animate({'left':left+60, 'top':value}, 200);
	else
		$bird.animate({'left':winPos, 'top':value}, 200);
	checkOverlap();
  }
  
  function createPigs() {
	topLimit = 230;
	$pig = $('.template').clone();
	bottomLimit = $window.height() - $pig.height() - topLimit;
	leftLimit = $window.width() - $pig.width();
	i = 0;
	while(i<10) {
		left = Math.floor(Math.random() * leftLimit);
		if(left < $bird.width()) {
			left += $bird.width();
		}
		topVal = topLimit + Math.floor(Math.random() * bottomLimit);
		$pig.removeClass('template').css({'top':topVal,'left':left});
		$window.append($pig);
		i++;
		$pig = $('.template').clone();
		pigs.push($pig);
	}
  }
  
  function goDown() {
	pos = $bird.position();
	left = pos.left;
	value = pos.top;
	winPos = $window.height() - $bird.height();
	if(value+50 <= winPos)
		$bird.animate({'left':left, 'top':value+50}, 300);
	else
		$bird.animate({'left':left, 'top':winPos}, 300);
	checkOverlap();
  }

  function checkOverlap() {
	i = 0;
	bTop = $bird.position().top, bWidth = $bird.width(), bLeft = $bird.position().left,bHeight = $bird.height();
	array = [];
	while(i<pigs.length) {
		pTop = pigs[i].position().top, pWidth = pigs[i].width(), pLeft = pigs[i].position().left,pHeight = pigs[i].height();
		//if(bTop >=pTop && bTop <= bTop + pHeight && bLeft >=pLeft && bLeft <= bLeft + pLeft) {
		diffTop = pTop - bTop;
		diffTop = diffTop < 0? diffTop*-1:diffTop;
		diffLeft = pLeft - bLeft;
		diffLeft = diffLeft < 0? diffLeft*-1:diffLeft;
		if(diffTop < pHeight && diffLeft < pWidth) {
			pigs[i].fadeOut(300);
		} else {
			array.push(pigs[i]);
		}
		i++;
	}
	pigs = array;
  }
	$(window).keydown(function(e){
		switch(e.keyCode) {
		case 37:
		goLeft();
		e.preventDefault();
		break;
		case 38:
		goUp();
		e.preventDefault();
		break;
		case 39:
		goRight();
		e.preventDefault();	
		break;
		case 40:
		goDown();
		e.preventDefault();	
		break;
		default:
		break;	
		}
	});
	createPigs();
});