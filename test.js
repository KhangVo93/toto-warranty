$('[data-toggle="collapse"]').on("click", function () {
  if ($(this).attr("aria-expanded") == "true") {
    $(this).find(".on").add($(this).find(".off")).toggleClass("off on");
  } else {
    $(this).find(".off").add($(this).find(".onn")).toggleClass("on off");
  }
});

var inputs = document.querySelectorAll(".inputfile");
Array.prototype.forEach.call(inputs, function (input) {
  var label = input.nextElementSibling,
    labelVal = label.innerHTML;

  input.addEventListener("change", function (e) {
    var fileName = "";
    if (this.files && this.files.length > 1)
      fileName = (this.getAttribute("data-multiple-caption") || "").replace(
        "{count}",
        this.files.length
      );
    else fileName = e.target.value.split("\\").pop();

    if (fileName) {
      label.innerHTML = fileName;
    } else label.innerHTML = labelVal;
  });
});
/////////////////////////////////////////////////////////

var qrcode = window.qrcode;
var video = document.createElement("video");
var canvasElement = document.getElementById("qr-canvas");
var canvas = canvasElement.getContext("2d");
var qrResult = document.getElementById("qr-result");
var outputData = document.getElementById("outputData");
var btnScanQR = document.getElementById("btn-scan-qr");
var scanning = false;

qrcode.callback = function (res) {
  if (res) {
    outputData.innerText = res;
    scanning = false;
    video.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
};

btnScanQR.onclick = function () {
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment"
    }
  }).then(function (stream) {
    scanning = true;
    qrResult.hidden = true;
    btnScanQR.hidden = true;
    canvasElement.hidden = false;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen

    video.srcObject = stream;
    video.play();
    tick();
    scan();
  });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}