
/* Theme Logic */
const Theme = [
    /* Dark */
    {
        bg_body: "rgb(39, 39, 39)",
        calC_body: '#262626',
        Text: "#fff"
    },
    /*Light*/
    {
        bg_body: 'rgb(224, 246, 251)',
        calC_body: '#e0f6fb',
        Text: "rgba(0,0,0,.8)"
    }
];
const ChageTheme = (Selected) => {
    $('body').css('background-color', Theme[Selected].bg_body);
    $('.calC').css('background', Theme[Selected].calC_body);
    $('Button').css('color', Theme[Selected].Text);
    $('.answer').css('color', Theme[Selected].Text);
    if (Selected == 1)
        $('.history').css({ 'background': `linear-gradient(#e0f6fb,black )`, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' });
    else
        $('.history').css({ 'background': `linear-gradient(#262626,white)`, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' });

}


$("#theme").click(() => {
    $("#theme").toggleClass('fa-sun');
    $("#theme").toggleClass('fa-moon');
    let CurrTheme = $('body').css('background-color');
    (CurrTheme == Theme[0].bg_body) ? ChageTheme(1) : ChageTheme(0);


});

/* Calculator Logic */

$("#erase").click(function (e) {
    e.preventDefault();
    $(".answer").html("0");
    $(".history").html("");
});

// Maintain Keyboard Input
$(document).keydown(function (e) {
    let InputString = "0";
    if ((e.key >= "0" && e.key <= "9") || e.key == "%" || e.key == "/" || e.key == "*" || e.key == "+" || e.key == "-" || e.key == "Enter" || e.key == "Backspace" || e.key == ".") {
        switch (e.key) {
            case "Enter":
                InputString = "=";
                break;
            case "Backspace":
                InputString = "C";
                break;
            default:
                InputString = e.key;
                break;
        }
        CalC(InputString);
    }
});

const CalC = (InputString) => {
    let ResultString = $(".answer").html();
    if (ResultString.length > 24)
        $(".answer").css("font-size", "20px")
    else if (ResultString.length > 21)
        $(".answer").css("font-size", "22px")
    else if (ResultString.length > 17)
        $(".answer").css("font-size", "24px")
    else
        $(".answer").css("font-size", "30px")

    let LastChar = ResultString.charAt($(".answer").html().length - 1)
    switch (InputString) {
        case "=":
            if (isNaN(ResultString) && LastChar != "/" && LastChar != "*" && LastChar != "+" && LastChar != "-" && LastChar != "%") {
                $(".history").append("<span>" + ResultString + "</span>");
                ResultString = (eval(ResultString))
            }
            break;
        case "C":
            ResultString = ResultString.substr(0, $(".answer").html().length - 1);
            if (ResultString == "" || ResultString == "-") ResultString = "0";
            break;
        case "+/-":
            if (ResultString.charAt(0) != "-")
                ResultString = "-" + ResultString;
            else
                ResultString = ResultString.substr(1, $(".answer").html().length)
            break;
        default:

            if (ResultString == "0" && InputString != "." && InputString != "+" && InputString != "/" && InputString != "*" && InputString != "%")
                ResultString = InputString;
            else {
                if ((LastChar == "/" || LastChar == "*" || LastChar == "+" || LastChar == "-" || LastChar == "%") && (InputString == "/" || InputString == "*" || InputString == "-" || InputString == "+" || InputString == "%")) {
                }
                else if (ResultString == "-0")
                    ResultString = "-" + InputString;
                else {

                    ResultString += InputString;
                }

            }
    }
    if (ResultString == "Infinity") {
        alert("Infinity");
        ResultString = "0";
    }

    $(".answer").html(ResultString);
}