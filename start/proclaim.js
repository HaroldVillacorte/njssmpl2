var whisper = function(message) {
    console.log('procaliming: ' + message);
};

exports.softly = whisper;

exports.loudly = function(message) {
    console.log('PROCLAIMING: ' + message);
};
