/**
 * ให้เขียนโปรแกรมแสดงสตริงที่ซ้ำที่ยาวที่สุด และจำนวนครั้งที่ซ้ำ
 * ยกตัวอย่าง เช่น
 * input: abcabcabc
 * output: abc 3
 * 
 * input: abcdabcd
 * output: abcd 2
 * 
 * input: abc
 * output: -1
 */

const args = process.argv.slice(2);
const input = args[0];

var strs = [];
for (let i = 0; i <= input.length; i++) {
    var str = input.substring(0, i);
    var match = Array.from(input.matchAll(new RegExp(str, 'g')));
    if (match.length > 1 && str.length * match.length == input.length) {
        //console.log(str, match.length);
        strs.push({ key: str, count: match.length });
    }
}
if (strs.length == 0) {
    console.log(-1);
} else {
    var most = strs.reduce((r, o) => {
        return r.count > o.count ? r : o;
    });
    console.log(most.key, most.count);
}