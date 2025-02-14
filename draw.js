const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasOption = {};

const before = { x: null, y: null };
let putBrush = false;
let x = null;
let y = null;
let eraserColor;

/**
 * キャンバスにマウス操作で描画を行えるようにする
 * @param {str} color 描画の色設定
 * @param {number} lineWidth 描画の太さの設定
 */
function drawSet(color, lineWidth) {
    setOption(color, lineWidth);

    canvas.addEventListener('mousedown', drawStart);
    canvas.addEventListener('mousemove', drawing);
    canvas.addEventListener('mouseup', drawEnd);
}
/**
 * キャンバスに描画したものを消せるようにする
 * @param {*} color 描画の色設定
 * @param {*} lineWidth 描画の太さの設定
 */
function drawSetEraser(color = "black", lineWidth = 1) {
    setOption(color, lineWidth);

    canvas.addEventListener('mousedown', drawStart);
    canvas.addEventListener('mousemove', drawEraser);
    canvas.addEventListener('mouseup', drawEnd);
}

/**
 * キャンバスにマウス操作で描画した物を背景色で上書きし消す
 * @param {*} mouse マウスオブジェクト
 */
function drawEraser(mouse) {
    if (putBrush == true) {
        const point = pointGet(mouse);
        x = point["x"];
        y = point["y"];
        movelineEraser(mouse);
        beforePointSet();
    }
}
/**
 * 設定の大きさに基づき背景色で上書きし消す
 */
function movelineEraser() {
    ctx.beginPath();
    ctx.lineWidth = document.getElementById('eraserWidth').value;
    ctx.strokeStyle = canvas.style.backgroundColor;

    ctx.moveTo(before.x, before.y);
    ctx.lineTo(x, y);
    ctx.stroke();
}

/**
 * マウスクリックにより描画操作開始の設定を行う
 * @param {*} mouse マウスオブジェクト
 */
function drawStart(mouse) {
    putBrush = true;

    const point = pointGet(mouse);
    before.x = point["x"];
    before.y = point["y"];
}

/**
 * マウスクリックにより描画操作を行う
 * @param {*} mouse マウスオブジェクト
 */
function drawing(mouse) {
    if (putBrush == true) {
        const point = pointGet(mouse);
        x = point["x"];
        y = point["y"];
        moveline(mouse);
        beforePointSet();
    }
}

/**
 * マウスクリックにした位置にを行う
 */
function moveline() {
    ctx.beginPath();
    ctx.lineWidth = document.getElementById('lineWidth').value;
    ctx.strokeStyle = document.getElementById('colorPalette').value;

    ctx.moveTo(before.x, before.y);
    ctx.lineTo(x, y);
    ctx.stroke();
}

/**
 * キャンバスへの書き込みの終了フラグを立てる
 */
function drawEnd() {
    putBrush = false;
}

/**
 * 一部のものしか変えない場合は現在のoptionを渡す
 * @param {*} color 描画の色設定
 * @param {*} lineWidth 描画の太さの設定
 */
function setOption(color = canvasOption.color, lineWidth = canvasOption.lineWidth) {
    canvasOption["strokeStyle"] = color;
    canvasOption["lineWidth"] = lineWidth;
}

/**
 * 前回のマウス位置を保持
 */
function beforePointSet() {
    before.x = x;
    before.y = y;
}
/**
 * マウスの位置情報を取得
 * @param {*} mouse マウスオブジェクト
 * @returns マウスの現在位置をx,yで受け渡し
 */
function pointGet(mouse) {
    const x = mouse.offsetX;
    const y = mouse.offsetY;
    return { "x": x, "y": y };
}


/**
 * 描画したキャンバスをjpgデータとして保存
 */
function saveCanvas() {
    const anker = document.createElement('a');

    anker.href = canvas.toDataURL();
    anker.download = 'download.jpg';
    anker.click();
}


/**
 * ペン機能の設定情報を表示
 */
function drawoption() {
    const side = document.getElementById("side");
    side.innerHTML = `
        <h3>手書き設定</h3>
        <p>線の太さ(px)</p>
        <div><input id="lineWidth" type="number" value=1></div>
        <p>線の色</p>
        <input id="colorPalette" type="color">
    `;
    console.log(document.getElementById('colorPalette').value);
    console.log(lineWidth = document.getElementById('lineWidth').value);
}
/**
 *  消しゴム機能の設定情報を表示
 */
function eraserOption() {
    const side = document.getElementById("side");
    side.innerHTML = `
        <h3>手書き設定</h3>
        <p>消しゴムの太さ(px)</p>
        <div><input id="eraserWidth" type="number" value=20></div>
    `;
}

/**
 * 描画設定のリセット
 */
function resetOption() {
    let side = document.getElementById("side");
    side.innerHTML = "<h3>描画設定</h3>";
}


/**
 * 描画設定のリセット
 */
function optionReset() {
    canvas.removeEventListener('mousedown', drawStart);
    canvas.removeEventListener('mousemove', drawing);
    canvas.removeEventListener('mouseup', drawEnd);

    canvas.removeEventListener('mousedown', drawStart);
    canvas.removeEventListener('mousemove', drawEraser);
    canvas.removeEventListener('mouseup', drawEnd);
}

/**
 * 線の太さの設定
 * @param {*} lineWidth 描画の太さの設定
 */
function eraser(lineWidth) {
    eraserColor = canvas.style.backgroundColor;
    drawSetEraser(color = eraserColor, lineWidth = lineWidth);
}

/**
 * 線の色の設定
 */
function setColor() {
    const colorPalette = document.getElementById("colorPalette");
    const color = colorPalette.value;

    setOption(color = color);
}
