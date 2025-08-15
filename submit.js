//always subscribe to ready event and implement widget related code
//inside callback function , it is the best practice while developing widgets
JFCustomWidget.subscribe("ready", function () {
    var label = JFCustomWidget.getWidgetSetting('QuestionLabel');
    document.getElementById('labelText').innerHTML = label;
    //subscribe to form submit event
    JFCustomWidget.subscribe("submit", function () {
        validator = true;
        var table = document.getElementById("answers");
        for (var i = 0, row; row = table.rows[i]; i++) {
            var counter = 0;
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (col.id.includes("Money")) {
                    if (col.chlidren[0].value === "") { counter++; }
                }
            }
            if (counter > 3) {
                validator = false;
                break;
            }
        }
        var msg = {
            //you should valid attribute to data for JotForm
            //to be able to use youw widget as required
            valid: validator,
            value: document.getElementById('userInput').value
        }
        // send value to JotForm
        JFCustomWidget.sendSubmit(msg);
    });
});