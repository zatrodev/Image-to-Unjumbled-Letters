const dropImg = document.getElementById("drop-img");

dropImg.addEventListener("input", () => {
    dropImg.contentEditable = false;
    const img = document.getElementsByTagName("img")[0];
    
    imgToUnjumbled(img.src);
})

function imgToUnjumbled(img){
    Tesseract.recognize(img).then(function(result){
        let unjumbled = "";
        for (let letter of result.text){
            if (letter == " ")
                unjumbled += letter;
            else
                unjumbled += String.fromCharCode(letter.charCodeAt(0) - 1)
        }

        document.getElementById("output").textContent = unjumbled;
    }).finally(() => {
        dropImg.innerHTML = "";
        dropImg.contentEditable = true;
    })
}