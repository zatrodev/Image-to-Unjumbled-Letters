const dropImg = document.getElementById("drop-img");
const tipsDropDown = document.getElementById("click-me");
let clicked = false;

dropImg.addEventListener("input", () => {
    dropImg.contentEditable = false;
    const img = document.getElementsByTagName("img")[0];
    
    if (!img){
        document.getElementById("output").textContent = "wag kang mag-input ng text bobo — picture lang";
        dropImg.textContent = "";
        dropImg.contentEditable = true;
    }
    else 
        imgToUnjumbled(img.src);
})

tipsDropDown.onclick = () => {
    const tip = document.getElementById("tip");

    if (!clicked){
        tip.style.height = "50px";
        setTimeout(() => {
            document.getElementById("info").style.display = "block";
        }, 100);
        clicked = true;
    }
    else {
        tip.style.height = "0";
        document.getElementById("info").style.display = "none";
        clicked = false;
    }
}

function imgToUnjumbled(img){
    Tesseract.recognize(img).then(function(result){
        let unjumbled = "";
        for (let letter of result.text){
            if (letter == " " || "/[.,\\/#!$%^&*;:{}=?+-_`~()]/g".indexOf(letter) !== -1)
                unjumbled += letter;
            else
                unjumbled += String.fromCharCode(letter.charCodeAt(0) - 1)
        }

        document.getElementById("output").textContent = `${unjumbled} (${result.text})`;
    }).finally(() => {
        dropImg.innerHTML = "";
        dropImg.contentEditable = true;
    })
}