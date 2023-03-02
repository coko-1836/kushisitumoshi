const fs = require('fs');
const { generate, BLANK_PDF } = require('@pdfme/generator');

const file = fs.readFileSync('template.json');
const template = JSON.parse(file);
function generateSeatNumber() {
    var alps = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    var nums = "0123456789";
    return alps[Math.floor(Math.random() * alps.length)] + Array.from(Array(6)).map(() => nums[Math.floor(Math.random() * nums.length)]).join('');
}
let name = '釧湿 太郎';
let kanaName = 'クシシツ タロウ';
let number = generateSeatNumber();
let gakka = '情報工学科';
let senbatsu = "一般選抜";
const inputs = [{ 
    name: name, 
    kanaName: kanaName,
    number : number,
    gakka: gakka,
    senbatsu: senbatsu,
    date: "20XX/8/XX"
}];

const font = {
    ipaexg: {
       data: fs.readFileSync('ipaexg.ttf'),
       fallback: true,
    },
   }

generate({ template, inputs, options: { font } }).then((pdf) => {
    fs.writeFileSync('受験票.pdf', pdf);
});