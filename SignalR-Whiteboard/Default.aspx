<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="SignalR_Whiteboard._Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <script src="Scripts/jquery.signalR.js" type="text/javascript"></script>
    <script src="signalr/hubs" type="text/javascript"></script>
    <script src="Scripts/draw.js" type="text/javascript"></script>
    <script src="Scripts/Whiteboard.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div id="init">
        <p id="error-message"></p>
        Set Name: <input type="text" id="name" /> <input type="button" id="set-name" value="Set" />
    </div>

    <div id="draw-area">
        <canvas id="draw" width="600" height="600"></canvas>
        <ul id="users">
        </ul>
        <ul id="controls">
            <li id="clear">Clear</li>
            <li>
                Color: 
                <select id="color">
                    <option value="red" selected="selected">Red</option>
                    <option value="blue">Blue</option>
                    <option value="black">Black</option>
                    <option value="green">Green</option>
                </select>
            </li>
            <li>
                Pen Size:
                <select id="pen-size">
                    <option value="1" selected="selected">Small</option>
                    <option value="3">Medium</option>
                    <option value="6">Large</option>
                </select>
            </li>
        </ul>
    </div>
</asp:Content>
