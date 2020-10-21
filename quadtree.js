export class Point {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }


}

export class Node {
    constructor(position, data = 0) {
        this.pos = position;
        this.data = data;
    }
}

/**
 * Main Quad Tree Class
 */
export class Quad {
    // Hold details of the boundary of this node 
    // Point topLeft; 
    // Point botRight; 

    // Contains details of node 
    // Node *n; 

    // Children of this tree 
    // Quad *topLeftTree; 
    // Quad *topRightTree; 
    // Quad *botLeftTree; 
    // Quad *botRightTree; 




    constructor(topL = new Point(0, 0), botR = new Point(0, 0)) {
        this.n = null;
        this.topLeftTree = null;
        this.topRightTree = null;
        this.botLeftTree = null;
        this.botRightTree = null;
        this.topLeft = topL;
        this.botRight = botR;
    }


}


    Quad.prototype.insert = function(node) {
    if (node == null)
    return;

    // Current quad cannot contain it 
    if (!this.inBoundary(node.pos))
    return;

    // We are at a quad of unit area 
    // We cannot subdivide this quad further 
    if (Math.abs(this.topLeft.x - this.botRight.x) <= 1 && Math.abs(this.topLeft.y - this.botRight.y) <= 1)
{
    if (this.n == null)
    this.n = node;
    return;
}

    if ((this.topLeft.x + this.botRight.x) / 2>= node.pos.x)
{
    // Indicates topLeftTree 
    if ((this.topLeft.y + this.botRight.y) / 2>= node.pos.y)
{
    if (this.topLeftTree == null)
    this.topLeftTree = new Quad(
    new Point(this.topLeft.x, this.topLeft.y),
    new Point((this.topLeft.x + this.botRight.x) / 2,
    (this.topLeft.y + this.botRight.y) / 2));
    this.topLeftTree.insert(node);
}

// Indicates botLeftTree 
else
{
    if (this.botLeftTree == null)
    this.botLeftTree = new Quad(
    new Point(this.topLeft.x,
    (this.topLeft.y + this.botRight.y) / 2),
    new Point((this.topLeft.x + this.botRight.x) / 2,
    this.botRight.y));
    this.botLeftTree.insert(node);
}
}
else
{
    // Indicates topRightTree 
    if ((this.topLeft.y + this.botRight.y) / 2>= node.pos.y)
{
    if (this.topRightTree == null)
    this.topRightTree = new Quad(
    new Point((this.topLeft.x + this.botRight.x) / 2,
    this.topLeft.y),
    new Point(this.botRight.x,
    (this.topLeft.y + this.botRight.y) / 2));
    this.topRightTree.insert(node);
}

// Indicates botRightTree 
else
{
    if (this.botRightTree == null)
    this.botRightTree = new Quad(
    new Point((this.topLeft.x + this.botRight.x) / 2,
    (this.topLeft.y + this.botRight.y) / 2),
    new Point(this.botRight.x, this.botRight.y));
    this.botRightTree.insert(node);
}
}
}



    Quad.prototype.search = function(p) {
    // Current quad cannot contain it 
    if (!this.inBoundary(p))
    return null;

    // We are at a quad of unit length 
    // We cannot subdivide this quad further 
    if (this.n != null)
    return this.n;

    if ((this.topLeft.x + this.botRight.x) / 2>= p.x)
{
    // Indicates topLeftTree 
    if ((this.topLeft.y + this.botRight.y) / 2>= p.y)
{
    if (this.topLeftTree == null)
    return null;
    return this.topLeftTree.search(p);
}

// Indicates botLeftTree 
else
{
    if (this.botLeftTree == null)
    return null;
    return this.botLeftTree.search(p);
}
}
else
{
    // Indicates topRightTree 
    if ((this.topLeft.y + this.botRight.y) / 2>= p.y)
{
    if (this.topRightTree == null)
    return null;
    return this.topRightTree.search(p);
}

// Indicates botRightTree 
else
{
    if (this.botRightTree == null)
    return null;
    return this.botRightTree.search(p);
}
}
}


    Quad.prototype.inBoundary = function(p) {
    return (p.x>= this.topLeft.x &&
    p.x <= this.botRight.x &&
    p.y>= this.topLeft.y &&
    p.y <= this.botRight.y);
}

Quad.prototype.colide= function(rect1,rect2){
    if (rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.height + rect1.y >= rect2.y) {
         return true
     }
     return false;

}




Quad.prototype.searchArea = function(p0, p1,toFind) {

 
    if(typeof this.n?.data === 'object' && this.n?.data && 'id' in this.n?.data){
        if(this.n.data.id === toFind.id)
        return this.n?.data;
    }

    // We are at a quad of unit length 
    // We cannot subdivide this quad further 
    else if (this.n?.data === toFind){
        return this.n?.data;
    }

    const searchRect = {
        x: p0.x,
        y: p0.y,
        width :Math.abs(p1.x-p0.x),
        height :Math.abs(p1.y-p0.y),
    }

    const thisRect = {
        x : this.topLeft.x,
        width :Math.abs(this.topLeft.x - this.botRight.x),
        y:this.topLeft.y,
        height:Math.abs(this.topLeft.y-this.botRight.y)
    }

    if(!this.colide(searchRect,thisRect)){
        return null;
    }


    const trees = [this.topLeftTree,this.topRightTree,this.botLeftTree,this.botRightTree]

    let returnValue
    for (const tree of trees) {
        returnValue = tree && tree.searchArea(p0,p1,toFind)
        if(returnValue != null){
            return returnValue
        }
    }
    return null










}