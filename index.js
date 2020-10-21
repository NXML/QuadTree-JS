import {Quad,Node,Point} from './quadtree.js'



const center = new Quad(new Point(0, 0), new Point(8, 8)); 
const a = new  Node(new Point(1, 1), 1); 
const b = new Node(new Point(2, 5), 2); 
const c = new Node(new Point(7, 6), 3); 
center.insert(a); 
center.insert(b); 
center.insert(c); 
console.log("Node a: ")
console.log(center.search(new Point(1, 1)).data )
console.log("Node b: ")
console.log(center.search(new Point(2, 5)).data)
console.log("Node c: ")
console.log(center.search(new Point(7, 6)).data)
console.log("Non-existing node: ")
console.log(center.search(new Point(5, 5)) )


console.log("All Nodes ")
console.log(center.searchArea(new Point(7, 7),new Point(8, 8),2))


  