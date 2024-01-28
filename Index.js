import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';



console.log(tweetsData);

const tweetInput = document.getElementById("tweet-input");

//<--- No longer needed but kept for reference --->
// const tweetBtn = document.getElementById("tweet-btn");
// tweetBtn.addEventListener("click", function (e) {
//   console.log(tweetInput.value);
//   console.log(e.target)
// });

document.addEventListener("click", function (e) {
  // console.log(e.target.dataset.like);
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
    console.log(e.target.dataset.reply);
  } else if (e.target.id === 'tweet-btn'){
    handleTweetBtnClick()
  }
});

function handleLikeClick(tweetId) {
  let targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  console.log(targetTweetObj.likes);

  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
    // targetTweetObj.isLiked = true;
  } else {
    // targetTweetObj.isLiked = false;
    targetTweetObj.likes++;
  }
  // toggle
  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  render();
}

function handleRetweetClick(tweetId) {
  console.log(tweetId);
  let targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];
  console.log(targetTweetObj.retweets);

  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleTweetBtnClick(){
  console.log(tweetInput.value);
}

function getFeedHtml() {
  let feedHtml = "";
  tweetsData.forEach(function (tweet) {
    let likeIconClass = "";

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }
    let retweetedIconClass = "";

    if (tweet.isRetweeted) {
      retweetedIconClass = "retweeted";
    }

    let repliesHtml = "";

    if (tweet.replies.length > 0) {
      console.log(tweet.uuid);
      tweet.replies.forEach(function (reply) {
        repliesHtml += `<div class="tweet-reply">
        <div class="tweet-inner">
            <img src="${reply.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${reply.handle}</p>
                    <p class="tweet-text">${reply.tweetText}</p>
                </div>
            </div>
    </div>`;
      });
    }

    feedHtml += `<div class="tweet">
    <div class="tweet-inner">
    <img src=${tweet.profilePic} class="profile-pic">
    <div>
        <p class="handle">${tweet.handle}</p>
        <p class="tweet-text">${tweet.tweetText}</p>
        <div class="tweet-details">
            <span class="tweet-detail">
            <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                ${tweet.replies.length}
            </span>
            <span class="tweet-detail">
            <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                ${tweet.likes}
            </span>
            <span class="tweet-detail">
            <i class="fa-solid fa-retweet ${retweetedIconClass}" data-retweet="${tweet.uuid}"></i>
                ${tweet.retweets}
            </span>
        </div>   
    </div>            
</div>
<div id="replies-${tweet.uuid}" class="hidden">
${repliesHtml}
</div>   
</div>`;
  });
  return feedHtml;
}

console.log(getFeedHtml());

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
