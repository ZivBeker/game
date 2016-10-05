
var EMPTY = 0,  PLAYER1 = 1, PLAYER2 = 2;

var PLAYER_HTML = ["", "<i class=\"fa fa-dollar\"></i>", "<i class=\"fa fa-btc\"></i>"] // The content of the table for each player

var board; // This will hold a two dimensional array that will represent the board
var currentPlayer;

function generate_table_html(height, width) {
    result = "";
    for (var i = 0; i < height; i++) {
        result += "<tr>\n"; // row open tag. + is used to concatenate strings.
        for (var j = 0; j < width; j++) {
            // The "replace" is a string method. It takes as an argument a regular expression (read more online).
            // /row/g means - replace ALL occurrences of the word row (g stands for global).
            // This is used to create proper unique ids and unique handle_click parameters for each cell
            cell_td_tag = "<td id=\"cell_row_col\" onclick=\"handle_click(row,col)\"></td>\n".replace(/row/g, i).replace(/col/g, j);
            result += cell_td_tag;
        }
        result += "<\tr>\n" // row closing tag
    }
    return result;
}

// Initialzes the two dimensional array to hold empty cells
function init_board(height, width) {
    board = []; // an empty array
    for (var i = 0; i < height; i++) {
        row = [] 
        for (var j = 0; j < width; j++) {
            row.push(EMPTY); // push adds an element to the array
        }
        board.push(row);
    }
}

// Handles the on_click event on a cell
function handle_click(i) {
    if (currentPlayer == EMPTY) {
        return; // Game over
    }
    if (board[i][1] == currentPlayer) {
        if(currentPlayer == PLAYER1)
        {
            if (i==0)
                return;
            if (board[i-1][1]!=EMPTY && (i==1 || board[i-2][1]!=EMPTY ))
                return;
            if (board[i-1][1]==EMPTY)
            {
                board[i-1][1]=currentPlayer;
                board[i][1]=EMPTY;
            }
            board[i-2][1] = currentPlayer;
            board[i][1]=EMPTY;
        }
        if(currentPlayer == PLAYER2)
        {
            if (i==6)
                return;
            if (board[i+1][1]!=EMPTY && (i==5 || board[i+2][1]!=EMPTY ))
                return;
            if (board[i+1][1]==EMPTY)
            {
                board[i+1][1]=currentPlayer;
                board[i][1]=EMPTY;
            }
            board[i+2][1] = currentPlayer;
            board[i][1]=EMPTY;
        }
    }
    // jQuery for getting a specific cell and changing its html content
    $("#cell_row_col".replace("row", i).replace("col", 1))
        .html(PLAYER_HTML[currentPlayer]); 
    test_victory();
    currentPlayer = PLAYER1 + PLAYER2 - currentPlayer; // Switch current player
}

// Tries to find WIN_LENGTH consecutive cells of a given players from a given point (i,j) in a given direction (di,dj)
function test_win() {
    for (var i=0; i<7; i++){
        if (i<3) {
             if (board[i][1]!=PLAYER1)
                return;
        }
        if (i>3) {
             if (board[i][1]!=PLAYER2)
                return;
        }
        handle_win();
    }
}

// Mark winning sequence and change the current player to EMPTY
function handle_win() {
    for (var k = 0; k < 7; k++) {
        $("#cell_row_col".replace("row", 7).replace("col", 1)).addClass("wincell"); // This code adds a css class to the given tag
    }
    currentPlayer = EMPTY;
}

$(document).ready(function () {

    var tableContents = generate_table_html(SIZE, SIZE);
    init_board(7, 1);
    currentPlayer = PLAYER1;
    $("#gameTable").html(tableContents); // Set the html of the object whose id is gameTable to variable tableContents

});