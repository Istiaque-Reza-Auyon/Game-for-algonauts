function LinkedList (this: any) {
    this.head = null;
    this.tail = null;
  }
  
  function NodeOfLL (this: any, value: any) {
    this.value = value;
    this.next = null;
  }
  
  
  LinkedList.prototype.addToHead = function (value:any) {
    const newNode = new (NodeOfLL as any)(value);
  
    if (!this.head) this.head = this.tail = newNode;
    else {
      newNode.next = this.head;
      this.head = newNode;
    }
  
    return true;
  }
  
  LinkedList.prototype.addToTail = function (value: any) {
    const newNode = new(NodeOfLL as any)(value);
  
    if (!this.tail) this.head = this.tail = newNode;
    else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  
    return true;
  }
  
  LinkedList.prototype.removeHead = function () {
    if (!this.head) return null;
  
    const prevHead = this.head;
    if (prevHead.next) this.head = prevHead.next;
    else this.head = this.tail = null;
    return prevHead.value;
  }
  
  LinkedList.prototype.contains = function (value: any) {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
  
    return false;
  }

  export default LinkedList;