var friendsData = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res){
        let userData = req.body;
        // Convert scores array string-numbers to type numbers
        let userScore = userData.scores.map(num => Math.abs(num));
        // Call function to find match friend and store it
        let matchFriend = findCompatibleFriend(userScore);
        // Replace score array with string-numbers to an array with all type numbers
        userData.scores = userScore;
        // Save user data to friends data
        friendsData.push(userData);
        // Respond with match friend data
        res.json(matchFriend);
    });
}
/* Function compares the difference between current user's scores
   against those from other users */
function findCompatibleFriend(userScore) {
    // Stores match friend data
    let friendBestMatch;
    // Stores the least amount of difference-score.
    // 40 is the max num of least possible difference-score
    let leastScoreDifference = 40;
    // Loop through other users data
    for (let friend of friendsData) {
        let totalDifference = 0;
        // Loop through current user scores and other users scores
        for (let i = 0; i < 10; i++) {
            // Based on scores position array, check if current user's score
            // is different to other user's score. If true, subtract both
            // scores and add up to totalDifference variable
            if (userScore[i] !== friend.scores[i]) {
                totalDifference+= Math.abs(userScore[i] - friend.scores[i]);
            };
        }
        // Condition checks if least score difference is greater than
        // totalDifference. If true replace least score with total 
        // difference value and store other user data to friendBestMatch
        if (leastScoreDifference > totalDifference) {
            leastScoreDifference = totalDifference;
            friendBestMatch = friend;
        }
    }
    return friendBestMatch;
}


