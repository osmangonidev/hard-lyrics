const apiUrl="https://api.lyrics.ovh";
let inputSong=""

document.getElementById('search-btn').addEventListener('click',()=>{
    inputSong=document.getElementById('input-song').value;
    const inputLength=inputSong.length;
    console.log(inputLength);
    if(inputLength>1){
        searchResult();
    }
    else{
        alert("Please Input Song Name");
    }
    
});


async function searchResult() {
    const res = await fetch(`${apiUrl}/suggest/${inputSong}`);
    const data = await res.json();
    const allList=data.data;
    const firstTen=allList.slice(0,10)
    setInnerText(firstTen);
}


function setInnerText(array){
    for(let i=0;array.length>i;i++){
        const element=array[i];
        const title=element.title;
        const name=element.artist.name;
        const album=element.album.title
        document.getElementById(`title-${i}`).innerText=title;
        document.getElementById(`name-${i}`).innerText=name;
        document.getElementById(`album-${i}`).innerText=album;
    }
}
document.getElementById('result-wrapper').addEventListener('click',e=>{
    const targetBtn = e.target;
    if (targetBtn.tagName === 'BUTTON') {
        const buttonNumber= parseInt(targetBtn.getAttribute('data-buttonNumber'));
        clickedBtn(buttonNumber);
    }
});

async function clickedBtn(buttonNumber){
    const res = await fetch(`${apiUrl}/suggest/${inputSong}`);
    const data = await res.json();
    const allList=data.data;
    const firstTen=allList.slice(0,10);
    const target=firstTen[buttonNumber];
    const songTitle=target.title;
    const artist=target.artist.name;
    getLyrics(artist,songTitle);
}


async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    document.getElementById('lyrics-title').innerText=songTitle;
    const lyrics = data.lyrics;
    if (lyrics==undefined){
        console.log("Lyrics is not found (Because Api not provided this lyrics) ")
        const notFoundMessage="Lyrics is not found (Because Api not provided this lyrics, Please try another.) ";
        document.getElementById('lyrics').innerText=notFoundMessage;
    }
    else{
        console.log(lyrics);
        document.getElementById('lyrics').innerText=lyrics;
    }
}

