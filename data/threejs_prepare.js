var fs = require('fs');
var colors = require('./colors.json');
var shots = require('./inception_shots2.json');
var words = require('./inception_subtitle.json').results;
var seq = [];
var dreamseq = [];
var realseq = [];
var startlogged = 0;
var endlogged = 0;

function saveData() {
    fs.writeFile("3dinception.json", JSON.stringify({
        seq: seq,
        real: realseq,
        dream: dreamseq
    }), function(err) {
        if (err) throw err;
        console.log("--Data Saved.");
    });
}

function countwords() {
    var reality = []
    for (var i = 0; i < words.length; i++) {
        if (words[i].dialogs.join().indexOf("real") > -1 && words[i].dialogs.join().indexOf("realize") == -1 && words[i].dialogs.join().indexOf("really") == -1){
            realseq.push([words[i].start, words[i].end]);
        }
        if (words[i].dialogs.join().indexOf("dream") > -1){
            dreamseq.push([words[i].start, words[i].end]);
        }
    }
    saveData();
}

// function getkeywords() {
//     var allwords = [];
//     var obj;
//     for (var i = 0; i < words.length; i++) {
//         allwords = words[i].dialogs.join().split(" ").concat(allwords);
//         console.log(allwords.length);
//     }
//     setTimeout(function(){
//         countwords();
//     }, 2000)
//     console.log(allwords.length);
// }

function levels(index) {

    endlogged = Math.floor(shots[index].endtime / 100) + 4;
    for (var i = startlogged; i <= endlogged; i++) {
        if (i < 3) {
            seq.push({
                id: i,
                color: colors[i],
                level: "Opening Credits"
            });
        } else {
            seq.push({
                id: i,
                color: colors[i],
                level: shots[index].level
            });
        }
    }
    setTimeout(function() {
        console.log(seq);
        index++;
        if (index < shots.length) {
            startlogged = endlogged + 1;
            levels(index);
        } else {
            countwords();
        }
    }, 1000);

}

levels(0);
// getkeywords();
// countwords();
