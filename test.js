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
