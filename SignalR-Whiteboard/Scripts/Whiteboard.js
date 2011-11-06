/// <reference path="jquery-1.7.js" />
/// <reference path="draw.js" />

$(document).ready(function () {

    var whiteboard = $.connection.whiteboard;

    $("#set-name").click(function (e) {
        e.preventDefault();
        var name = $("#name").val();

        if (name) {
            whiteboard.join(name)
            .fail(function (e) {
                $("#error-message").text(e);
            })
            .done(function () {
                whiteboard.getUsers()
                .done(function (users) {
                    $.each(users, function () {
                        whiteboard.addUser(this);
                    });
                });

                $("#init").hide();
                $("#draw-area").show();
            });
        }
    });

    $("#color").change(function () {
        draw.colour = $(this).val();
    });

    $("#pen-size").change(function () {
        draw.lineWidth = $(this).val();
    });

    // controls
    $("#clear").click(function () {
        draw.clear();
        whiteboard.clearBoard();
    });

    $.connection.hub.start(function () {

    });

    draw.onDraw = function (prev, current, color, width) {
        whiteboard.onDrawPen(prev, current, color, width);
    };

    whiteboard.drawPen = function (prev, current, color, width) {
        draw.drawPen(prev, current, color, width);
    }

    whiteboard.clear = function () {
        draw.clear();
    }

    whiteboard.userConnected = function (user) {
        addUser(user);
    }

    whiteboard.addUser = function (user) {
        var id = "u-" + user.Id;
        var element = document.getElementById(id);

        if (element) {
            element.replaceWith("<li id=" + id + ">" + user.Name + "</li>");
        }
        else {
            $("#users").append("<li id=" + id + ">" + user.Name + "</li>");
        }
    }

    whiteboard.removeUser = function (user) {
        var id = "#u-" + user.Id;
        var element = $(id).remove();
    }

    whiteboard.replayInstructions = function (instructions) {
        $.each(instructions, function () {
            if (this.Tool == "Pen") {
                draw.drawPen(this.StartPoint, this.EndPoint, this.Color, this.LineThickness);
            }
        });
    };
});

