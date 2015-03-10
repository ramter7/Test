﻿var radius = 250;
var margin = 120;
var angle = 360;
var root;
var cluster = d3.layout.cluster() 
 .size([angle, radius-margin]); 
 
var diagonal = d3.svg.diagonal.radial() 
 .projection (function(d) { return [d.y, d.x / 180* Math.PI];}); 

var svg = d3.select("body").append("svg") 
 .attr("width",2*radius) 
 .attr("height",2*radius) 
 .append("g") 
 .attr("transform","translate("+radius + "," + radius + ")");

var url = '/gh/get/response.json/meccanismocomplesso/d3.examples/tree/master/';

d3.xhr(url)
    .header("X-Requested-With", "XMLHttpRequest")
    .header("Content-Type", "application/x-www-form-urlencoded")
    .post("delay=1", function (error, request) {
    if (error) return console.warn(error.responseText);
    //d3.select('#demo').text(request.responseText);
    //root = request.responseText; 
    root =  jQuery.parseJSON( request.responseText);
//});
        
//d3.json("dendrogram02.json", function(error, root){ 
 var nodes = cluster.nodes(root); 
 var links = cluster.links(nodes); 

//d3.select('#demo').text(nodes);
//d3.select('#demo').text(nodes);
            
var link = svg.selectAll(".link") 
 .data(links) 
 .enter().append("path") 
 .attr("class","link") 
 .attr("d", diagonal); 
        
var node = svg.selectAll(".node") 
 .data(nodes) 
 .enter().append("g") 
 .attr("class","node")
 .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; }); 
 
node.append("circle") 
 .attr("r", 4.5); 
 
node.append("text")
 .attr("dy", ".31em")
 .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
 .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
 .text(function(d) { return d.name; }); 
});
