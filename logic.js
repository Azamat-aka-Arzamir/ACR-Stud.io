var obj = {
    key1: "value1"
}
console.log(obj);

function New(_header, _text, _image){
    this.header = _header;
    this.text=_text;
    this.image = _image;
    this.func = ()=>{console.log(this.image)}
    this.obj = {
        smth:"sometext"
    }
}
const new1 = new New("smth","smthsmth","PAZIK.jpg");
console.log(new1.obj);
new1.func();

class SMTH{

}