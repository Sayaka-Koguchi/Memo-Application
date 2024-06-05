/**
 * let ●●● = [];
 * $("●●●")
 * 
$("#●●●").on("click", function () {

});

for (let i = 0; i < ●●●; i++) {

}
 *
 *
 *
 *
 */



//タスクを配列形式にする
let taskList = [];
console.log(taskList);


//リロードしてもlocalstorageに残っているデータを表示させる
const task = localStorage.getItem("todoText");//localstorageのデータを取ってくる

//localstorageにキーが存在しないことを条件にするためnullを使用
if(task !== null){
    taskList = JSON.parse(task);//JSON文字列を配列やオブジェクトに変換
    for(let i=0; i<taskList.length; i++){
        $("#todoList").append(`<li>${taskList[i]}<button class="completeBtn" data-index="${i}">完了</button></li>`);
    }
}


//追加
$("#addTodoBtn").on("click", function(){
    //入力されたテキスト情報を取得
    const todoText = $("#todoText").val();
    // alert("保存"); クリックボタン確認
    
    if("#todoText" !==""){   
    // localStorage.setItem("todoText",todoText);
    //タスクを配列に追加
    taskList.push(todoText); //配列の末尾に追加
    //文字列に変換の上localstorageに保存
    localStorage.setItem("todoText",JSON.stringify(taskList));
    console.log(taskList);
    const index = taskList.length - 1; // 新しく追加されたタスクのインデックスを取得（配列のインデックスは0始まりで個数とズレる）
    $("#todoList").append(`<li>${todoText}<button class="completeBtn" data-index="${index}">完了</button></li>`); //To DOにタスクを追加・完了ボタン追加
    $("#todoText").val(""); // 入力枠のデータ削除
    }

    //To doがなくなったらComplete!表示
    if(task == null || taskList.length === 0){
        $("#result").html("Complete! Well Done!");
    }else{
        $("#result").html("");
    }    

});

//完了
$(document).on("click",".completeBtn",function(){

    const index = $(this).data("index");//クリックされたボタンのdata-index属性を取得
    taskList.splice(index,1);//指定されたインデックスのタスクを削除
    localStorage.setItem("todoText",JSON.stringify(taskList));//更新されたtaskListをlocalStorageに保存
    $(this).parent().remove();//クリックされたボタンの親要素（<li>）を削除

    //インデックスを再設定 リスト項目をeachメソッドでループ処理。
    //現在のリスト項目を$(this)で取得、完了ボタンの'data-index'属性を
    //ループの現在のインデックス(i)に設定
    $("#todoList li").each(function(i){
        $(this).find("completeBtn").data("index,i");//各完了ボタンのdata-index属性を更新
    });

    //To doがなくなったらComplete!表示
    if(task == null || taskList.length === 0){
        $("#result").html("Complete! Well Done!");
    }else{
        $("#result").html("");
    }

});



//全削除
$("#deleteTodoBtn").on("click", function(){
    //入力されたテキスト情報を取得
    // localStorage.removeItem("todoText");あるKeyのデータを削除する。
    
    //全てのデータを削除する。
    localStorage.clear();

    // 画面上のタスクを削除
    $("#todoList").empty();

    //"TO DO"追記
    $("#todoList").text("- To Do -");

    //タスクリストの配列もクリア
    taskList = [];

    //To doがなくなったらComplete!表示
    $("#result").html("Complete! Well Done!");

    // alert("削除"); //クリックボタン確認
    
});