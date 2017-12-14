import React, { Component } from 'react';
import Styles from './Building3D.scss';
import classNames from 'classnames/bind';
import Spinner from 'react-icons/lib/fa/spinner';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as unitActions from 'store/modules/unit';

import jquery from 'jquery';

window.$ = window.jQuery=jquery;
const $ = window.$;

require('jquery.reel');

const cx1 = classNames.bind(Styles);
var apt_able_ary = [];

//frame show
const  fs = 12;

//progress bar
const TOTAL_IMAGE_COUNT = 598;

// Light Images Store
const lightImages = {
  apt2 : {
    able: false,
    ary: [],
    vroom: 11
  },
  apt3 : {
    able: true,
    ary: [],
    vroom: 12
  },
  apt4 : {
    able: true,
    ary: [],
    vroom: 3
  },
  apt5 : {
    able: true,
    ary: [],
    vroom: 21
  },
  apt6 : {
    able: true,
    ary: [],
    vroom: 20
  },
  apt7 : {
    able: true,
    ary: [],
    vroom: 22
  },		
  apt8 : {
    able: true,
    ary: [],
    vroom: 4
  },
  apt9 : {
    able: true,
    ary: [],
    vroom: 18
  },	
  apt10 : {
    able: true,
    ary: [],
    vroom: 10
  },	
  apt11 : {
    able: true,
    ary: [],
    vroom: 14
  },	
  apt12 : {
    able: true,
    ary: [],
    vroom: 5
  },	
  apt13 : {
    able: true,
    ary: [],
    vroom: 23
  },	
  apt14 : {
    able: true,
    ary: [],
    vroom:19
  },								
  apt15 : {
    able: true,
    ary: [],
    vroom: 27
  },
  apt16 : {
    able: true,
    ary: [],
    vroom: 9
  },
  // apt17 : {
  // 	able: true,
  // 	ary: [],
  // 	vroom: 0
  // },		
  apt18 : {
    able: true,
    ary: [],
    vroom: 15
  },	
  apt19 : {
    able: true,
    ary: [],
    vroom: 16
  },					
  apt20 : {
    able: true,
    ary: [],
    vroom: 7
  },
  apt21 : {
    able: true,
    ary: [],
    vroom: 25
  },	
  apt22 : {
    able: true,
    ary: [],
    vroom: 24
  },	
  apt23 : {
    able: true,
    ary: [],
    vroom: 26
  },	
  apt24 : {
    able: true,
    ary: [],
    vroom: 8
  },	
  apt25 : {
    able: true,
    ary: [],
    vroom: 17
  },	
}

// ======== private vars ======== 
var scr, canvas, cubes, faces, nx, ny, nw, nh, xm = 0, ym = 0, cx = 0, cy = 0, cz = 0, cxb = 0, cyb = 0; 
var white, alpha, fps = 0, ncube, npoly, faceOver, drag, moved, startX = 0, startY = 0; 
var cosY, sinY, cosX, sinX, cosZ, sinZ, minZ, angleY = 0, angleX = 0, angleZ = 0; 
var bkgColor1 = "rgba(0,0,0,0.1)"; 
var bkgColor2 = "rgba(32,32,32,1)"; 
var autorotate = false, destroy = false, running = true; 
var room = 1;
var frameNumber = 2;
var building_offset = {x: 304, y: 15, w:500, h:500};
// ---- fov ---- 
var fl = 1000; 
var zoom = 0; 

// ======== canvas constructor ======== 
var Canvas = function (id) { 
  this.container = document.getElementById(id); 
  this.ctx = this.container.getContext("2d"); 
  this.ctx.globalCompositeOperation = "lighten";
  this.resize = function (w, h) { 
    this.container.width = w; 
    this.container.height = h; 
  } 
}; 

	// ======== vertex constructor ======== 
	var Point = function (parent, xyz, project) { 
		this.project = project; 
		this.xo = xyz[0]; 
		this.yo = xyz[1]; 
		this.zo = xyz[2]; 
		this.cube = parent; 
	}; 
	Point.prototype.projection = function () { 
		// ---- 3D rotation ---- 
		var x = cosY * (sinZ * this.yo + cosZ * this.xo) - sinY * this.zo; 
		var y = sinX * (cosY * this.zo + sinY * (sinZ * this.yo + cosZ * this.xo)) + cosX * (cosZ * this.yo - sinZ * this.xo); 
		var z = cosX * (cosY * this.zo + sinY * (sinZ * this.yo + cosZ * this.xo)) - sinX * (cosZ * this.yo - sinZ * this.xo); 
		this.x = x; 
		this.y = y; 
		this.z = z; 
		
		if (this.project) { 
			// ---- point visible ---- 
			if (z < minZ) minZ = z; 
			this.visible = (zoom + z > 0); 
			// ---- 3D to 2D projection ---- 
			
			this.X = (nw * 0.5) + x * (fl / (z + zoom)); 
			this.Y = (nh * 0.5) + y * (fl / (z + zoom)); 

		} 
	}; 
	// ======= polygon constructor ======== 
	var Face = function (cube, index, normalVector) { 
		// ---- parent cube ---- 
		this.cube = cube; 
		// ---- coordinates ---- 
		this.p0 = cube.points[index[0]]; 
		this.p1 = cube.points[index[1]]; 
		this.p2 = cube.points[index[2]]; 
		this.p3 = cube.points[index[3]]; 
		// ---- normal vector ---- 
		this.normal = new Point(this, normalVector, false) 
		// ---- # faces ---- 
		npoly++; 
		// document.getElementById('npoly').innerHTML = npoly; 
	}; 
	Face.prototype.pointerInside = function () { 
		// ---- Is Point Inside Triangle? ---- 
		// http://2000clicks.com/mathhelp/GeometryPointAndTriangle2.aspx 
		var fAB = function (p1, p2, p3) { return (ym - p1.Y) * (p2.X - p1.X) - (xm - p1.X) * (p2.Y - p1.Y); }; 
		var fCA = function (p1, p2, p3) { return (ym - p3.Y) * (p1.X - p3.X) - (xm - p3.X) * (p1.Y - p3.Y); }; 
		var fBC = function (p1, p2, p3) { return (ym - p2.Y) * (p3.X - p2.X) - (xm - p2.X) * (p3.Y - p2.Y); }; 
		if ( 
			fAB(this.p0, this.p1, this.p3) * fBC(this.p0, this.p1, this.p3) > 0 && 
			fBC(this.p0, this.p1, this.p3) * fCA(this.p0, this.p1, this.p3) > 0 
		) return true; 
		if ( 
			fAB(this.p1, this.p2, this.p3) * fBC(this.p1, this.p2, this.p3) > 0 && 
			fBC(this.p1, this.p2, this.p3) * fCA(this.p1, this.p2, this.p3) > 0 
		) return true; 
		// ---- 
		return false; 
	}; 
	Face.prototype.faceVisible = function () { 
		// ---- points visible ---- 
		if (this.p0.visible && this.p1.visible && this.p2.visible && this.p3.visible) { 
			// ---- back face culling ---- 
			if ((this.p1.Y - this.p0.Y) / (this.p1.X - this.p0.X) < (this.p2.Y - this.p0.Y) / (this.p2.X - this.p0.X) ^ this.p0.X < this.p1.X == this.p0.X > this.p2.X) { 
				// ---- face visible ---- 
				this.visible = true; 
				return true; 
			} 
		} 
		// ---- face hidden ---- 
		this.visible = false; 
		this.distance = -99999; 
		return false; 
	}; 
	Face.prototype.distanceToCamera = function () { 
		// ---- distance to camera ---- 
		var dx = (this.p0.x + this.p1.x + this.p2.x + this.p3.x ) * 0.25; 
		var dy = (this.p0.y + this.p1.y + this.p2.y + this.p3.y ) * 0.25; 
		var dz = (zoom + fl) + (this.p0.z + this.p1.z + this.p2.z + this.p3.z ) * 0.25; 
		this.distance = Math.sqrt(dx * dx + dy * dy + dz * dz); 

	}; 
	Face.prototype.draw = function () { 
		// ---- shape face ---- 
		canvas.ctx.beginPath(); 
		// canvas.ctx.moveTo(this.p0.X, this.p0.Y); 
		// canvas.ctx.lineTo(this.p1.X, this.p1.Y); 
		// canvas.ctx.lineTo(this.p2.X, this.p2.Y); 
		// canvas.ctx.lineTo(this.p3.X, this.p3.Y); 
		canvas.ctx.moveTo(this.p0.X, this.p0.Y); 
		canvas.ctx.lineTo(this.p1.X, this.p1.Y); 
		canvas.ctx.lineTo(this.p2.X, this.p2.Y); 
		canvas.ctx.lineTo(this.p3.X, this.p3.Y); 
		canvas.ctx.closePath(); 
		// ---- light ---- 
		if (this == faceOver) { 
			var r = 255; 
			var g = 235; 
      var b = 208; 
      var a = 0.3;
		} else { 
			// ---- flat (lambert) shading ---- 
			this.normal.projection(); 
			var light = ( 
				white ? 
				this.normal.y + this.normal.z * 0.5 : 
				this.normal.z 
			) * 256; 
      var r = g = b = light; 
      var a = 0.3;
		} 
		// ---- fill ---- 
		// canvas.ctx.fillStyle = "rgba(" + 
		// 					Math.round(r) + "," + 
		// 					Math.round(g) + "," + 
		// 					Math.round(b) + "," + this.cube.alpha + ")"; 
		canvas.ctx.fillStyle = "rgba(" + 
							Math.round(r) + "," + 
							Math.round(g) + "," + 
							Math.round(b) + "," + a + ")"; 
		canvas.ctx.fill(); 
	}; 
// ======== Cube constructor ======== 
var Cube = function(parent, nx, ny, nz, room, x, y, z, w) {
  this.room = room;
  if (parent) { 
    // ---- translate parent points ---- 
    this.w = parent.w; 
    this.points = []; 
    var i = 0, p; 
    while (p = parent.points[i++]) { 
      this.points.push( 
        new Point( 
          parent, 
          [p.xo + nx, p.yo + ny, p.zo + nz], 
          true 
        ) 
      ); 
    } 
  } else { 
    // ---- create points ---- 
    this.w = w; 
    this.points = []; 
    var p = [ 
      [x-w, y-w, z-w], 
      [x+w, y-w, z-w], 
      [x+w, y+w, z-w], 
      [x-w, y+w, z-w], 
      [x-w, y-w, z+w], 
      [x+w, y-w, z+w], 
      [x+w, y+w, z+w], 
      [x-w, y+w, z+w] 
    ]; 
    for (var i in p) this.points.push( 
      new Point(this, p[i], true) 
    ); 
  } 
  // ---- faces coordinates ---- 
  var f  = [ 
    [0,1,2,3], 
    [0,4,5,1], 
    [3,2,6,7], 
    [0,3,7,4], 
    [1,5,6,2], 
    [5,4,7,6] 
  ]; 
  // ---- faces normals ---- 
  var nv = [ 
    [0,0,1], 
    [0,1,0], 
    [0,-1,0], 
    [1,0,0], 
    [-1,0,0], 
    [0,0,-1] 
  ]; 
  // ---- cube transparency ---- 
  this.alpha = alpha ? 0.5 : 1; 
  // ---- push faces ---- 
  for (var i in f) { 
    faces.push( 
      new Face(this, f[i], nv[i]) 
    ); 
  } 
  ncube++; 
}; 
//////////////////////////////////////////////////////////////////////////// 
var resize = function () { 
  // ---- screen resize ---- 
  nw = scr.offsetWidth; 
  nh = scr.offsetHeight; 
  var o = scr; 
  for (nx = 0, ny = 0; o != null; o = o.offsetParent) { 
    nx += o.offsetLeft; 
    ny += o.offsetTop; 
  } 
  canvas.resize(nw, nh); 

  var img = $("#img")[0];
  // console.log('+++++++++++++++++++++++++++++++');
  // console.log(img);
  if(img)
    drawBackground(img);
}; 
var reset = function () { 
  // ---- create first cube ---- 
  cubes = []; 
  faces = []; 
  ncube = 0; 
  npoly = 0;

  var cube_w = 30;
  var cube_offset = cube_w * 2 + 5;
  var center = new Cube(false,0,0,0, 1, 0,0,0, cube_w);
  cubes.push(center);

  var c0_10 = new Cube(center,0,cube_offset,0, 2);
  cubes.push(c0_10); 
    var c0_10_100 = new Cube(c0_10,-cube_offset,0,0, 3);
    cubes.push(c0_10_100);
    var c0_10100 = new Cube(c0_10,cube_offset,0,0, 4);
    cubes.push(c0_10100); 
  var c_100 = new Cube(center,-cube_offset,0,0, 5);
  cubes.push(c_100);
  var c010 = new Cube(center,0,-cube_offset,0, 6);
  cubes.push(c010);
    var c010_100 = new Cube(c010,-cube_offset,0,0, 7);
    cubes.push(c010_100);
    var c010100 = new Cube(c010,cube_offset,0,0, 8);
    cubes.push(c010100);
  var c100 = new Cube(center,cube_offset,0,0, 9);
  cubes.push(c100);
  var c001 = new Cube(center,0,0,-cube_offset, 10);
  cubes.push(c001);
    var c0010_10 = new Cube(c001,0,cube_offset,0, 11);
    cubes.push(c0010_10);
      var c0010_10_100 = new Cube(c0010_10,-cube_offset,0,0, 12);
      cubes.push(c0010_10_100);
      var c0010_10100 = new Cube(c0010_10,cube_offset,0,0, 13);
      cubes.push(c0010_10100);
    var c001_100 = new Cube(c001,-cube_offset,0,0, 14);
    cubes.push(c001_100);
    var c001010 = new Cube(c001,0,-cube_offset,0, 15);
    cubes.push(c001010);
      var c001010_100 = new Cube(c001010,-cube_offset,0,0, 16);
      cubes.push(c001010_100);
      var c001010100 = new Cube(c001010,cube_offset,0,0, 17);
      cubes.push(c001010100);
    var c001100 = new Cube(c001,cube_offset,0,0, 18);
    cubes.push(c001100);
  var c00_1 = new Cube(center,0,0,cube_offset, 19);
  cubes.push(c00_1);
    var c00_10_10 = new Cube(c00_1,0,cube_offset,0, 20);
    cubes.push(c00_10_10);
      var c00_10_10_100 = new Cube(c00_10_10,-cube_offset,0,0, 21);
      cubes.push(c00_10_10_100);
      var c00_10_10100 = new Cube(c00_10_10,cube_offset,0,0, 22);
      cubes.push(c00_10_10100);
    var c00_1_100 = new Cube(c00_1,-cube_offset,0,0, 23);
    cubes.push(c00_1_100);
    var c00_1010 = new Cube(c00_1,0,-cube_offset,0, 24);
    cubes.push(c00_1010);
      var c00_1010_100 = new Cube(c00_1010,-cube_offset,0,0, 25);
      cubes.push(c00_1010_100);
      var c00_1010100 = new Cube(c00_1010,cube_offset,0,0, 26);
      cubes.push(c00_1010100);
    var c00_1100 = new Cube(c00_1,cube_offset,0,0, 27);
    cubes.push(c00_1100);


}; 
var detectFaceOver = function () { 
  // ---- detect pointer over face ---- 
  var j = 0, f; 
  faceOver = false; 
  while ( f = faces[j++] ) { 
    if (f.visible) { 
      if ( f.pointerInside() ) { 
        faceOver = f;
      } 
    } else break; 
  } 
}; 
var click = function () { 
  // ---- click cube ---- 
  detectFaceOver(); 
  // console.log("------------click evented --------------------");
  // console.log(faceOver);
  if(faceOver){
    console.log("Room = " + faceOver.cube.room)
    room = faceOver.cube.room;
  }else{
    room = -1;
  }

  // for (x in lightImages){
  // 	if(lightImages[x].vroom == faceOver.cube.room){
  // 		if(lightImages[x].able){
  // 			console.log('turn light');
  // 			alert('turn light');
  // 		}else{
  // 			console.log('turn off');
  // 			alert('turn off');
  // 		}
  // 		lightImages[x].able = !lightImages[x].able
  // 		drawSpecifiedFrame();
  // 	}
  // }		

  
  // if (faceOver) { 
  // 	if (destroy) { 
  // 		if (ncube > 1) { 
  // 			var c = faceOver.cube; 
  // 			faceOver.clicked = false; 
  // 			// ---- destroy faces ---- 
  // 			var i = 0, f; 
  // 			while ( f = faces[i++] ) { 
  // 				if (f.cube == c) { 
  // 					faces.splice(--i, 1); 
  // 					npoly--; 
  // 				} 
  // 			} 
  // 			document.getElementById('npoly').innerHTML = npoly; 
  // 			// ---- destroy cube ---- 
  // 			var i = 0, o; 
  // 			while ( o = cubes[i++] ) { 
  // 				if (o == c) { 
  // 					cubes.splice(--i, 1); 
  // 					ncube--; 
  // 					break; 
  // 				} 
  // 			} 
  // 		} 
  // 	} else { 
  // 		if (!faceOver.clicked) { 
  // 			// ---- create new cube ---- 
  // 			faceOver.clicked = true; 
  // 			/*
  // 			var w = -2.15 * faceOver.cube.w; 
  // 			cubes.push( 
  // 				new Cube( 
  // 					faceOver.cube, 
  // 					w * faceOver.normal.xo, 
  // 					w * faceOver.normal.yo, 
  // 					w * faceOver.normal.zo 
  // 				) 
  // 			); 
  // 			detectFaceOver(); 
  // 			*/
  // 		} 
  // 	} 
  // } 
}; 


var drawLightImage = function () {	
  // console.log('-------drawLightImage -----------');
  // console.log(lightImages);
  // console.log('-------apt_able_ary------');
  // console.log(apt_able_ary);

  for (var x in lightImages){
    if(apt_able_ary.indexOf(x) < 0)
      continue;
    // console.log('x = '+ x);
    // console.log(frameNumber);

    if(lightImages[x].ary.length === 0)
      continue;

    var temp = lightImages[x].ary[Math.floor(frameNumber-1)];
    // console.log(temp);
    canvas.ctx.drawImage(temp, 304, 15, 500, 500);
  }
}
var drawBackground = function (img){

  // canvas.ctx.clearRect(0,0,1113,500);
  // console.log('------------canvas width -----------');
  // console.log(canvas.container.width);

  console.log('drawBackgrund');
  console.log(frameNumber);
  // var temp = Math.floor((canvas.container.width - 500)/2);
  
  // draw background
  canvas.ctx.fillStyle = bkgColor1; 
  canvas.ctx.fillRect(0, Math.floor(nh * 0.15), nw, Math.ceil(nh * 0.7)); 

  // draw building
  canvas.ctx.clearRect(304, 15, 500, 500);
  // console.log(img);
  if(img !== null )
    canvas.ctx.drawImage(img, 304, 15, 500, 500);

  var temp1 = canvas.ctx.globalCompositeOperation;
  canvas.ctx.globalCompositeOperation = "lighten";
  // draw light
  drawLightImage();

  canvas.ctx.globalCompositeOperation = temp1;
  // draw background
  canvas.ctx.fillStyle = bkgColor2; 
  canvas.ctx.fillRect(0, 0, nw, Math.ceil(nh * 0.15)); 
  canvas.ctx.fillStyle = bkgColor2; 
  canvas.ctx.fillRect(0, Math.floor(nh * 0.85), nw, Math.ceil(nh * 0.15)); 

  drawSpecifiedFrame();

}

// ======== draw specificed frame by frame number ======== 
var drawSpecifiedFrame = function () {
  var fn = frameNumber;
  // console.log("frame number = " + fn);
  // return false;
  
  // ---- screen background ---- 
  // canvas.ctx.fillStyle = bkgColor1; 
  // canvas.ctx.fillRect(0, Math.floor(nh * 0.15), nw, Math.ceil(nh * 0.7)); 
  // canvas.ctx.fillStyle = bkgColor2; 
  // canvas.ctx.fillRect(0, 0, nw, Math.ceil(nh * 0.15)); 
  // canvas.ctx.fillStyle = bkgColor2; 
  // canvas.ctx.fillRect(0, Math.floor(nh * 0.85), nw, Math.ceil(nh * 0.15)); 

  // canvas.ctx.fillStyle = bkgColor1; 
  // canvas.ctx.fillRect(0, 0, building_offset.x, nh);
  // canvas.ctx.fillStyle = bkgColor1; 
  // canvas.ctx.fillRect(building_offset.x+building_offset.w, 0, nw-(building_offset.x+building_offset.w), nh);


  const PI = 3.141592;
  // var temp = [];
  // for (var i = 0; i < 25; i ++){
  //   temp[i] = angleY = -2*PI/25*i; 
  // }
  // temp[75] = -175;

  // ---- easing rotations ---- 
  angleY = -2 * PI / 25 * (fn - 1); 
  angleX = 0;
  angleZ = 1;

  // console.log("angleY = " + angleY);

  // ---- pre-calculating trigo ---- 
  cosY = Math.cos(angleY); 
  sinY = Math.sin(angleY); 
  cosX = Math.cos(angleX * 0.01); 
  sinX = Math.sin(angleX * 0.01); 
  cosZ = Math.cos(angleZ * 0.01); 
  sinZ = Math.sin(angleZ * 0.01); 
  
  // ---- points projection ---- 
  minZ = 0; 
  var i = 0, c; 
  while ( c = cubes[i++] ) { 
    var j = 0, p; 
    while ( p = c.points[j++] ) { 
      p.projection(); 
    } 
  } 

  // ---- adapt zoom ---- 
  var d = -minZ + 100 - zoom; 
  zoom += (d * ((d > 0) ? 0.05 : 0.01)); 
  zoom = 800;
  // ---- faces light ---- 
  var j = 0, f; 
  
  while ( f = faces[j++] ) { 
    if ( f.faceVisible() ) { 
      f.distanceToCamera(); 
    } 
  } 
  // ---- faces depth sorting ---- 
  faces.sort(function (p0, p1) { 
    return p1.distance - p0.distance; 
  }); 
  // ---- painting faces ---- 
  j = 0; 
  while ( f = faces[j++] ) { 
      if (f.visible) { 
        f.draw(); 
      } else break; 
  } 
  // ---- animation loop ---- 
  fps++; 
  // if (running) setTimeout(run, 16); 

}

class Building3D extends Component{

  state = {
    imageLoading: false
  }

  handleRoomSelect = () => {
    if(this.props.loadingLightImages) return;

    console.log('handleRoomSelect evented');
    if(room !== undefined && room > 0 && apt_able_ary.length > 0){
      console.log(room);
      let apt = '';
      for (let x in lightImages){
        if(lightImages[x].vroom === room)
        {
          apt = x;
          break;
        }
      }

      if(apt === '' || apt_able_ary.indexOf(apt) < 0) return;

      const units = this.props.units;
      if(units.length <= 0) return;
      const result = units.find(item => (item.render === apt));
      if(result === undefined) return;
      
      this.props.UnitActions.setUnit(result);
    }
    
  }
  addImageProcess = (src) => {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }
  
  loadImages = async () => {
    // load images for rendering lights
    console.log('loading images of light data ...............');
    let progress = 0;
    this.props.UnitActions.setProgressValue(0);
    for (var x in lightImages) {
      // var able = lightImages[x].able;

      for( var i = 0; i < 301; i++){        
        if (i % fs !== 0) 
          continue;

        var temp = x.slice(3);
        var str_dir = (100 + parseInt(temp, 10)).toString().slice(1);
        var str_img = (10000 + i).toString().slice(1);
        var src = `/UNTOUCHED/lights/Lights_Light_Apt_${str_dir + str_img}.jpg`;

        // console.log('async test start');
        var img;
        try{
          img = await this.addImageProcess(src);
          img.width = 500;
          img.height = 500;
          progress ++;
          this.props.UnitActions.setProgressValue(progress / TOTAL_IMAGE_COUNT * 100);
        }catch (e){
          console.log(`${src} image loading error:`);
          console.log(e);
        } 
        // console.log('async test end');
        
        lightImages[x].ary.push(img); 
      }
    }

    console.log('loading successfully finished.')
    // console.log(lightImages);
  }

  init = async () => {
    console.log('Building3D Component init ....');

    this.props.UnitActions.setLoadingLightImageState(true);

    await this.loadImages();

    // ---- init script ---- 
    scr = document.getElementById("screen"); 
    // scr = this.refs.screen; 
    // const temp = this.refs.canvas;
    canvas  = new Canvas("canvas"); 

    // ======== initialize frameNumber  ======== 
    console.log('initialize frameNumber');
    frameNumber = 1;

    // ---- engine start ---- 
    reset(); 

    // ---- screen size ---- 
    resize(); 
    window.addEventListener('resize', resize, false); 

    // ======== unified touch/mouse events handler ======== 
		scr.ontouchstart = scr.onmousedown = function (e) { 
			if (!running) return true; 
			// ---- touchstart ---- 
			if (e.target !== canvas.container) return; 
			e.preventDefault(); // prevents scrolling 
			if (scr.setCapture) scr.setCapture(); 
			moved = false; 
			drag = true; 
			startX = (e.clientX !== undefined ? e.clientX : e.touches[0].clientX) - nx; 
			startY = (e.clientY !== undefined ? e.clientY : e.touches[0].clientY) - ny; 
		}; 
		scr.ontouchmove = scr.onmousemove = function(e) { 
			if (!running) return true; 
			// ---- touchmove ---- 
			e.preventDefault(); 
			xm = (e.clientX !== undefined ? e.clientX : e.touches[0].clientX) - nx; 
			ym = (e.clientY !== undefined ? e.clientY : e.touches[0].clientY) - ny; 
			detectFaceOver(); 
			if (drag) { 
				cx = cxb + (xm - startX);
				cy = cyb - (ym - startY); 
			} 
			if (Math.abs(xm - startX) > 10 || Math.abs(ym - startY) > 10) { 
				// ---- if pointer moves then cancel the tap/click ---- 
				moved = true; 
			} 
		}; 
		scr.ontouchend = scr.onmouseup = function(e) { 
			if (!running) return true; 
			// ---- touchend ---- 
			e.preventDefault(); 
			if (scr.releaseCapture) scr.releaseCapture(); 
			drag = false; 
			cxb = cx; 
			cyb = cy; 
			if (!moved) { 
				// ---- click/tap ---- 
				xm = startX; 
				ym = startY; 
        click(); 
        // if(room > 0)
        //   this.handleRoomSelect(room);
			} 
		}; 
		scr.ontouchcancel = function(e) { 
			if (!running) return true; 
			// ---- reset ---- 
			if (scr.releaseCapture) scr.releaseCapture(); 
			moved = false; 
			drag = false; 
			cxb = cx; 
			cyb = cy; 
			startX = 0; 
			startY = 0; 
    }; 
    
    // ======== building image onload events handler ======== 
    const rotater = this.refs.rotater;
    // console.log(img.id);
    rotater.onload = ()=>{
      console.log('image onload evented');
      console.log(frameNumber);
      // if((frameNumber-1) % fs !== 0)
      //   return;
      drawBackground(rotater);
      // drawSpecifiedFrame();
    };

    // ======== frame change events handler ======== 
		$("#img").bind('frameChange',  (evnt, nothing, frame) => {
      frameNumber = frame;
      // console.log('frame number:');
      // console.log(frame);
			// drawLightImage();
    });
    
    this.props.UnitActions.setLoadingLightImageState(false);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    const units = this.props.units;
    const light_states = [];

    units.forEach((unit) => {
      light_states.push(unit.render)
    });

    const lights = light_states;
    apt_able_ary = lights;

    console.log('---componentDidUpdate---');
    console.log(this.props.loadingLightImages);

    console.log(this.props.loadingLightImages ? 'Image Loading...' : 'Image Loaded');
    if(this.props.loadingLightImages)
      return;

    console.log('old values');
    console.log(scr);
    console.log(canvas);
    console.log(lightImages);
    var img = $("#img")[0];
    console.log('+++++++++++++++++++++++++++++++');
    console.log(img);
    if(img)
      drawBackground(img);
  }

  render() {
    const units = this.props.units;
    const light_states = [];

    units.forEach((unit) => {
      light_states.push(unit.render)
    });

    console.log('light information');
    console.log(light_states);

    apt_able_ary = light_states;
    const {loadingLightImages} = this.props;

    console.log('render old values');
    console.log(scr);
    console.log(canvas);
    console.log(lightImages);

    return (
      <div id='screen' ref='screen' onMouseUp={this.handleRoomSelect} className = {cx1('building-3d')} >
        <canvas id='canvas' ref='canvas'/>
        <div className = {cx1('reel-containter')}>
          <img id="img" ref='rotater' width="100%" height="100%" alt="Untouched Pro" src="/UNTOUCHED/Building/000001.jpg" 
              className="reel" data-images="/UNTOUCHED/Building/000###.jpg|001..026"/>
        </div>
        { loadingLightImages && 
          <div className = {cx1('image-loader-spin')}>
            {/* <div class={cx1('loader')}></div> */}
            {/* <Spinner className = {cx1('spin')} /> */}
            <svg className={cx1('spinner')} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
              <circle className={cx1('path')} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
            <div className = {cx1('percent')}>
              {' '+ Math.ceil(this.props.curProgressValue)+'%'}
            </div>
          </div>
        }
        { loadingLightImages && 
          <div className={cx1("progress")}>
            <div id='determinate' className={cx1("determinate")} style={{width: this.props.curProgressValue+'%'}}></div>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    units: state.unit.get('unitsData').toJS(),
    selectedUnit: state.unit.get('selectedUnit').toJS(),
    loadingLightImages: state.unit.get('loadingLightImages'),
    curProgressValue: state.unit.get('curProgressValue')
  }),
  (dispatch) => ({
    UnitActions: bindActionCreators(unitActions, dispatch)
  })
)(Building3D);