function choiceDuration(gifLength){
    return Math.max(gifLength*2 + 1000, 10 * 1000);
}

module.exports.choiceDuration = choiceDuration;