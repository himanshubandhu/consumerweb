//The URIs of the REST endpoint
LOGIC3 = "https://prod-54.northeurope.logic.azure.com/workflows/e2fa36d53c1f44dc875a4079505d19f4/triggers/manual/paths/invoke/rest/v1/videodata?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GD5_dH_DGQSufKV5CppwxwupVHOIaQu-5FQKkD4zpHQ";
LOGIC2 = "https://prod-62.northeurope.logic.azure.com/workflows/22d4979a379440549889e1d9a2eb3903/triggers/manual/paths/invoke/rest/v1/videocomments?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=REFMbWRpAag-YhiMoLyn3Q6wbnS1Z8ykom6X294Wli8"
LOGIC4 = "https://prod-26.northeurope.logic.azure.com/workflows/8a5f5547da974fedb683e8d6b43b5080/triggers/manual/paths/invoke/rest/v1/videocomments?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zy6Zyq1WlgTnS4LIa7FdJ2AMmvxwORhkAzZwKwA7HTE"

LOGIC5 = "https://prod-15.northeurope.logic.azure.com/workflows/c990d4465cde4b4a872f855c8b5f6dfd/triggers/manual/paths/invoke/rest/v1/videodata/"
LOGIC51 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jC5oeZ-goKFWZIujOS_IugSkRJELWDRgP5ajP771JWA"

BLOB_ACCOUNT = "https://hopethatstorage.blob.core.windows.net";


//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

  $("#retComments").click(function(){

    //Run the get asset list function
    getComments();

  });

  $("#retVidID").click(function(){

    //Run the get asset list function
    getVidID();

  });
  //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

window.onload = getClientPrincipal()

//A function to retrieve logged in user info
async function getClientPrincipal() {
  const response = await fetch('/.auth/me');
  const payload = await response.json();
  const { clientPrincipal } = payload;
  const user = clientPrincipal.userDetails;
  return user;  

}


//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){  
  getClientPrincipal().then((user) => {

  //Construct JSON Object for new item
  var subObj = {
    videoID: $('#videoID').val(),
    userName: user,
    Comment: $('#Comment').val(),
    Rating: $('#Rating').val()

    }

  //Convert to a JSON String
  subObj = JSON.stringify(subObj);

  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: LOGIC2,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
    }).done(function (response) {
    getComments();
    });
    
})};

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){

  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(LOGIC3, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {

      items.push( "<hr />");
      items.push("<video width='500' height='400' controls>");
      items.push("<source src="+BLOB_ACCOUNT + val["filePath"] +" /> <br />");
      items.push("</video>");
      items.push( "<br>");
      items.push( "Video ID: " + val["videoID"] + "<br />");
      items.push( "Title: " + val["Title"] + "<br />");
      items.push( "Publisher: " + val["Publisher"] + "<br />");
      items.push( "Producer: " + val["Producer"] + "<br />");
      items.push( "Genre: " + val["Genre"] + "<br />");
      items.push( "Age Rating: " + val["ageRating"] + "<br />");
      items.push( "Uploaded By: " + val["userName"] + "<br />");

     });

      //Clear the assetlist div 
      $('#ImageList').empty();

      //Append the contents of the items array to the ImageList Div
      $( "<ul/>", {
       "class": "my-new-list",
       html: items.join( "" )
     }).appendTo( "#ImageList" );
   });
}

//A function to get a list of all the comments and write them to the Div with the CommentList Div
function getComments(){

  //Replace the current HTML in that div with a loading message
  $('#CommentList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(LOGIC4, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {

      items.push( "<hr />");
      items.push( "Video ID: " + val["videoID"] + "<br />");
      items.push( "User Name: " + val["userName"] + "<br />");
      items.push( "Comment: " + val["Comment"] + "<br />");
      items.push( "Rating: " + val["Rating"] + "<br />");


     });

      //Clear the assetlist div 
      $('#CommentList').empty();

      //Append the contents of the items array to the ImageList Div
      $( "<ul/>", {
       "class": "my-new-comments",
       html: items.join( "" )
     }).appendTo( "#CommentList" );
   });
}


//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVidID(){

  videoIDSearch = $('#videoIDSearch').val();

  //Replace the current HTML in that div with a loading message
  $('#VideoIDList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(LOGIC5 + videoIDSearch + LOGIC51, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {

      items.push( "<hr />");
      items.push("<video width='500' height='400' controls>");
      items.push("<source src="+BLOB_ACCOUNT + val["filePath"] +" /> <br />");
      items.push("</video>");
      items.push( "<br>");
      items.push( "Video ID: " + val["videoID"] + "<br />");
      items.push( "Title: " + val["Title"] + "<br />");
      items.push( "Publisher: " + val["Publisher"] + "<br />");
      items.push( "Producer: " + val["Producer"] + "<br />");
      items.push( "Genre: " + val["Genre"] + "<br />");
      items.push( "Age Rating: " + val["ageRating"] + "<br />");
      items.push( "Uploaded By: " + val["userName"] + "<br />");

     });

      //Clear the assetlist div 
      $('#VideoIDList').empty();

      //Append the contents of the items array to the ImageList Div
      $( "<ul/>", {
       "class": "my-new-video-list",
       html: items.join( "" )
     }).appendTo( "#VideoIDList" );
   });
}