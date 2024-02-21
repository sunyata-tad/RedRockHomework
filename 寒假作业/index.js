//搜索功能
async function searchsong() {
  var input = document.getElementsByClassName('searchframe');
  var keywords = input[0].value;
  fetch('http://localhost:3000/search?keywords='+encodeURIComponent(keywords))
  .then((response) => response.json())
  .then((data) => {
    const songs = data.result.songs;
    // 获取容器
    const container = document.getElementById("search")

    // 生成歌曲列表
    songs.forEach(song => {
      window.songId = song.id
        const songElement = document.createElement("div");
        // 歌曲封面
        const img = document.createElement("img");
        img.src = song.artists[0].img1v1Url;//没有翻到歌曲封面的接口或者url，就拿里面不知道什么图片凑数了
        songElement.appendChild(img);
        // 歌曲详情
        const songDetails = document.createElement("div");
        songDetails.innerHTML = `
            <div>
                <strong>${song.name}</strong>
                <p>${song.artists.map(artist => artist.name).join(", ")}</p>
                <button onclick='addMusic()'>播放</button>
            </div>
        `;
        songElement.appendChild(songDetails);
        container.appendChild(songElement);
    });
  })
}//获取歌曲信息
//搜索界面
//实现侧边栏功能的代码
document.addEventListener("DOMContentLoaded", function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link'); // 获取所有的侧边栏链接
    let main = document.getElementById('main')//选择主要内容区
    const contentSections = main.querySelectorAll(':scope > *'); // 获取所有的内容区域,同时不获取其子元素
    document.getElementById('home').style.display = 'block';
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('data-target'); // 获取目标内容区域的 ID
        
        // 显示目标内容区域，隐藏其他内容区域
        contentSections.forEach(section => {
          if (section.id === targetId) {
            section.style.display = 'block';
          } else {
            section.style.display = 'none';
          }
        });
      });
    });
  });
//轮播图 该部分调整修改自https://juejin.cn/post/7032161243431763976
// 获取左右按钮和图片列表
let oLeft = document.querySelector(".left");
let oRight = document.querySelector(".right");
let oImgList = document.querySelector(".img-list");

// 克隆第一张图片
let clonefirstImg = oImgList.firstElementChild.cloneNode();
// 将第一张图片添加至图片列表的末尾
oImgList.appendChild(clonefirstImg);

// 图片索引 代表当前是第几张图片  index:0代表第一张图片
let index = 0;

// 设置函数节流锁
let lock = true;
function handleRightBtn() {
  if (!lock) return;
  index++;
  oImgList.style.left = index * -800 + "px";
  oImgList.style.transition = "0.5s ease";

  if (index === 8) {
    index = 0;
    setTimeout(() => {
      oImgList.style.left = 0;
      // 取消过渡 500毫秒之后切换第一张
      oImgList.style.transition = "none";
    }, 500);
   }

  // 设置小圆点的高亮
  setCircles();
  // 关锁
  lock = false;
  setTimeout(() => {
    lock = true;
  }, 500);
}

// 右按钮的实现
oRight.addEventListener("click", handleRightBtn);

// 左按钮的实现  瞬间切换到假图然后拉到真实最后一张图片
oLeft.addEventListener("click", () => {
  if (!lock) return;
  index--;
  if (index === -1) {
    oImgList.style.left = 8 * -800 + "px";
    oImgList.style.transition = "none";
    index = 7;
    setTimeout(() => {
      oImgList.style.left = index * -800 + "px";
      oImgList.style.transition = "0.5s ease";
    }, 0);
  } 
  else {
    oImgList.style.left = index * -800 + "px";
  }

  // 设置小圆点的高亮
  setCircles();

  lock = false;
  setTimeout(() => {
    lock = true;
  }, 500);
});

// 获取小圆点
const circles = document.querySelectorAll(".circle");

// 小圆点高亮的显示
function setCircles() {
  for (let i = 0; i < circles.length; i++) {
    if (i === index) {
      circles[i].classList.add("active");
    } else {
      circles[i].classList.remove("active");
     }
  }
}

// 小圆点点击切换图片 使用事件代理
const oCircle = document.querySelector(".circle-list");
oCircle.addEventListener("click", (e) => {
  // 当我点击小圆点的时候
  if (e.target.nodeName.toLowerCase() === "li") {
    // 当前元素的data-n对应得值 和index一一对应
    const n = Number(e.target.getAttribute("data-n"));
    index = n;
    setCircles();
    oImgList.style.transition = "0.5s ease";
    oImgList.style.left = index * -800 + "px";
  }
});

// 自动轮播
let autoplay = setInterval(handleRightBtn, 2000);
const oWrap = document.getElementById("wrap");
// 移入停止轮播
oWrap.addEventListener("mouseenter", () => {
  clearInterval(autoplay);
});
// 移出继续轮播
oWrap.addEventListener("mouseleave", () => {
  // 设表先关
  clearInterval(autoplay);
  autoplay = setInterval(handleRightBtn, 2000);
});
//播放器
var playlist = [];//歌曲列表
async function addMusic(){
  fetch('http://localhost:3000/song/url?id='+encodeURIComponent(songId))
  .then((response) => response.json())
  .then(data =>{
    const songurl = data.data[0].url;
    source.src = songurl;
    if(playlist.includes(songurl)){
      playMusic();
    } 
    else{
      playlist.push(source.src);
      playMusic();
    }
  })
}
function playMusic() {
  var audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.play()
}
var source = document.getElementById('source');
let currentTrackIndex = 0;
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  var nextTrackSrc = playlist[currentTrackIndex];
  source.src=nextTrackSrc
  playMusic;
}//下一首功能

function previousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  var previousTrackSrc = playlist[currentTrackIndex];
  source.src=previousTrackSrc
  playMusic();
}//上一首功能