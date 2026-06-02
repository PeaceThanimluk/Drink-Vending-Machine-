/*=====================HTML=====================*/
const displayText = document.getElementById("display-text");
const keyBtn = document.querySelectorAll(".key-btn");
const buyBtn = document.getElementById("buy-btn");

const moneyLabel = document.getElementById("money-display");
const moneyBtn = document.getElementById("money-btn");

/*=====================VARIABLES=====================*/
let currentMoney = 0;
let selectNumber = "";

/*=====================PRODUCTS DATA=====================*/
const products = [
    { id: 1, name: "โค้กกระป๋อง", price: 17 },
    { id: 2, name: "เป๊ปซี่กระป๋อง", price: 17 },
    { id: 3, name: "สไปรท์ขวด", price: 20 },
    { id: 4, name: "น้ำเปล่าตรามิเนาร่า", price: 10 },
    { id: 5, name: "น้ำเปล่าตราเนสเล่เพียวไลฟ์", price: 7 },
    { id: 6, name: "อิชิตัน", price: 20 },
    { id: 7, name: "โออิชิเลม่อน", price: 20 },
    { id: 8, name: "โออิชิองุ่น", price: 20 },
    { id: 9, name: "Aura Monster", price: 67 }
];

/*=====================MONEY BUTTON FUNCITON=====================*/
moneyBtn.addEventListener(`click`, () => {
    currentMoney += 1;
    moneyLabel.textContent = currentMoney;
})

/*=====================KEYPAD FUNCITON=====================*/
keyBtn.forEach(button => {
    button.addEventListener(`click`, () => {
        const value = button.textContent.trim();

        if (button.classList.contains("backSpace-btn")) {
            selectNumber = selectNumber.slice(0, -1);
        }
        else {
            if (selectNumber.length < 3) { //ทำให้ป้อนได้ไม่เกิน3หลัก
                selectNumber += value;
            }
        }

        displayText.textContent = selectNumber === "" ? "0" : selectNumber;

    });
});

/*=====================BUY FUNCTION=====================*/
buyBtn.addEventListener(`click`, () => {
    const targetId = Number(selectNumber);

    //ค้นหาสินค้าว่ามีรหัสในระบบตรงกันไหม
    const matchedProduct = products.find(p => p.id === targetId);

    
    if (selectNumber.length >= 3 ) {
        alert(`ไปโดนตัวไหนมา`);
        resetKeypad();
        return;
    }

    //เงื่อนไขที่1 : ถ้ารหัสไม่มีจริงในตู้(รหัสไม่ตรง)
    if (!matchedProduct) {
        alert("บ่มีสินค้านี้โปรดเลือกให้ถูกด้วยวะฮ่าฮ่า!!!");
        resetKeypad();
        return;
    }

    if (currentMoney < matchedProduct.price) {
        alert(`เงินไม่พอซื้อ \n"${matchedProduct.name}" ราคา ${matchedProduct.price} บาท ไปทำงานมาซื้อใหม่นะ`);
        resetKeypad();
        return;
    }

    //หักเงินจากราคาสินค้า
    currentMoney -= matchedProduct.price;

    //อัพเดทจอแสดงผล
    moneyLabel.textContent = currentMoney;

    if (matchedProduct.id === 9) {
        alert(`คุณได้ซื้อ "${matchedProduct.name}" และได้กลายเป็น Aura monster แล้ว Let larp larp!!`);
    }
    else {
        alert(`คุณได้ซื้อ "${matchedProduct.name}" เงินคงเหลือ ${currentMoney} ขอให้แซ่บๆ`);
    }

    resetKeypad();
})

/*=====================RESET LABEL=====================*/

function resetKeypad() {
    selectNumber = "";
    displayText.textContent = "0";
}