$(function(){
    document.getElementById("input1").value=localStorage.id;
    document.getElementById("input2").value=localStorage.timestamp;
    for(var i=0;i<4;i++){
        document.getElementById("td"+i+"1").innerText=localStorage.name[i];
        document.getElementById("td"+i+"2").innerText=localStorage.card[i][0];
        document.getElementById("td"+i+"3").innerText=localStorage.card[i][1];
        document.getElementById("td"+i+"4").innerText=localStorage.card[i][2];
        document.getElementById("td"+i+"5").innerText=localStorage.score[i];
        document.getElementById("td"+i+"6").innerText=localStorage.play_id[i];
    }
    // document.getElementById("input11").value=localStorage.name[0];
    // document.getElementById("input12").value=localStorage.card[0];
    // document.getElementById("input13").value=localStorage.score[0];
    // document.getElementById("input14").value=localStorage.play_id[0];
    // document.getElementById("input21").value=localStorage.name[1];
    // document.getElementById("input22").value=localStorage.card[1];
    // document.getElementById("input23").value=localStorage.score[1];
    // document.getElementById("input24").value=localStorage.play_id[1];
    // document.getElementById("input31").value=localStorage.name[2];
    // document.getElementById("input32").value=localStorage.card[2];
    // document.getElementById("input33").value=localStorage.score[2];
    // document.getElementById("input34").value=localStorage.play_id[2];
    // document.getElementById("input41").value=localStorage.name[3];
    // document.getElementById("input42").value=localStorage.card[3];
    // document.getElementById("input43").value=localStorage.score[3];
    // document.getElementById("input44").value=localStorage.play_id[3];
})