var fs = require('fs');
var srt = require('srt-stream-parser');
var srt_file = fs.createReadStream('inception.srt');

var subutitles = [];
srt_file.pipe(srt()).on('data', function(data) {
    var data = JSON.parse(data);
    subutitles.push(data);
}).on('end', function () {
    fs.writeFile('inception_subtitle.json', JSON.stringify({"results": subutitles}, null, 2));
    console.log('All done, parsed: ' + subutitles.length + ' subtitles');
});