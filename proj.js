var lat,long;

$(document).ready(function()
{
    $.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function () {
        FB.init({ appId: '1935905169978432', status: true, cookie: true, xfbml: true });
    });
    localStorage.clear();
    var options = {
  enableHighAccuracy: true
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  lat=crd.latitude;
  long=crd.longitude;
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
});

$(document).ready(function(){
$("#clear_button").click(function(){
    $("#inp").val("");
    document.getElementById("pill-content").style.display="none";
    document.getElementById("panel-content").style.display="none";
    localStorage.clear();
});
});

$(document).ready(function(){
$("#search_button").click(function(){



  var typ=$(".nav-pills .active").text();



  if(typ=="Favorites")
  {
  func_favParse();
  }
  else
  {      var inp_text=$("#inp").val();
        var inp_text=inp_text.replace(" ","%20");
  //alert(inp_text);
  if(inp_text=="" || inp_text==" ")
  {
    alert("Invalid search query");
  }
  else {
    document.getElementById("pill-content").style.display="block";
    document.getElementById("panel-content").style.display="none";
    var txt="<div class=\"progress pad_progress\"><div class=\"progress-bar progress-bar-info progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 50%\">";
        txt+="<span class=\"sr-only\">50% Complete</span></div></div>";
        document.getElementById("pill-content").innerHTML=txt;
    //var lat=34.0199122,long=-118.2864086;
    $.ajax({
    url:'http://sample-env.nhdgnefbsv.us-west-2.elasticbeanstalk.com/index.php',
    data:{keyword:inp_text, type:typ,latitude:lat,longitude:long},
    datatype: "json",
    type: 'GET',
    success:function(response)
    {

      var json_object=JSON.parse(response);
      func_userParse(json_object,typ);

    },
    error:function(xhr,status,error)
    {
      alert("fail");
    }
    });

  }
  }


});
});


$(document).ready(function(){
    $(".nav-pills li").click(function(){
      $(".nav-pills li").removeClass("active");
      $(this).addClass("active");


      var typ=$(this).text();


if(typ=="Favorites")
{
  func_favParse();
}
else
{      var inp_text=$("#inp").val();
      var inp_text=inp_text.replace(" ","%20");
      if(inp_text=="" || inp_text==" ")
      {
        alert("Invalid search query");
      }
      else {
        //var lat=34.0199122,long=-118.2864086;
        document.getElementById("pill-content").style.display="block";
        document.getElementById("panel-content").style.display="none";

        var txt="<div class=\"progress pad_progress\"><div class=\"progress-bar progress-bar-info progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 50%\">";
            txt+="<span class=\"sr-only\">50% Complete</span></div></div>";
            document.getElementById("pill-content").innerHTML=txt;
        $.ajax({
        url:'http://sample-env.nhdgnefbsv.us-west-2.elasticbeanstalk.com/index.php',
        data:{keyword:inp_text, type:typ,latitude:lat,longitude:long},
        datatype: "json",
        type: 'GET',
        success:function(response)
        {

          var json_object=JSON.parse(response);
          func_userParse(json_object,typ);

        },
        error:function(xhr,status,error)
        {
          alert("fail");
        }
        });

      }
}
    });
});

function func_favParse()
{
  var leng=localStorage.length;
  var i;
  var html_text="<table class=\"table table-hover table-responsive\"><tr><th>#</th><th>Profile Photo</th><th>Name</th><th>Type</th><th>Favorite</th><th>Details</th></tr>";
  for(i=0;i<leng;i++)
  {
    var j=i+1;
    var string1=localStorage.getItem(localStorage.key(i));
    var str_arr=string1.split("$");
    var id=localStorage.key(i);
    html_text=html_text+"<tr><td>"+j+"</td><td><a target=\"_blank\" href='"+str_arr[0]+"'><img src='"+str_arr[0]+"'height=100px width=100px></a></td><td>"+str_arr[1]+"</td><td>"+str_arr[2]+"</td><td ><a href=\"#\" onclick=\"trash('"+localStorage.key(i)+"','"+str_arr[0]+"','"+str_arr[1]+"','"+str_arr[2]+"','star"+i+"')\" ><span class=\"well well-sm glyphicon glyphicon-trash\" ></span></a></td><td><a href=\"#\" onclick=\"detailing('"+id+"')\" ><span class=\"well well-sm glyphicon glyphicon-chevron-right\"></span></a></td></tr>";
  }

  html_text=html_text+"</table>";
  document.getElementById("pill-content").innerHTML=html_text;
}
function trash(id,pic,name,type,ident)
{
  localStorage.removeItem(id);
  func_favParse();
}

function func_userParse(json_object,typ)
{
  //alert("success");
      var html_text="<table class=\"table table-hover table-responsive\"><tr><th>#</th><th>Profile Photo</th><th>Name</th><th>Favorite</th><th>Details</th></tr>";
      var i=1;
      $.each(json_object['data'], function(key,item)
      {

        var name=item.name;
        var photo=item.picture.data.url;
        var id=item.id;
      //  alert(typ);
        if(localStorage.getItem(id)==null)
          html_text=html_text+"<tr><td>"+i+"</td><td><a target=\"_blank\" href='"+photo+"'><img src='"+photo+"'height=50px width=50px></a></td><td>"+name+"</td><td id='star"+i+"'><a href=\"#\" onclick=\"storing('"+id+"','"+photo+"','"+name+"','"+typ+"','star"+i+"')\" style=\"color:black\"><span class=\"well well-sm glyphicon glyphicon-star-empty star\" ></span></a></td><td><a href=\"#\" onclick=\"detailing('"+id+"','"+i+"','"+typ+"')\" ><span ng-model=\"myCheck\" class=\"well well-sm glyphicon glyphicon-chevron-right\" style=\"color:black\"></span></a></td></tr>";
        else {
          html_text=html_text+"<tr><td>"+i+"</td><td><a target=\"_blank\" href='"+photo+"'><img src='"+photo+"'height=50px width=50px></a></td><td>"+name+"</td><td  id='star"+i+"'><a href=\"#\" onclick=\"deleting('"+id+"','"+photo+"','"+name+"','"+typ+"','star"+i+"')\" style=\"color:black\"><span class=\"well well-sm glyphicon glyphicon-star\" style=\"color:yellow;\"></span></a></td><td><a href=\"#\" onclick=\"detailing('"+id+"','"+i+"','"+typ+"')\" ><span ng-model=\"myCheck\" class=\"well well-sm glyphicon glyphicon-chevron-right\"  style=\"color:black\"></span></a></td></tr>";
        }
        i++;
      });
      html_text=html_text+"</table><div style=\"margin: auto;width: 60%; padding-left: 150px;padding-bottom: 20px;\">";

      if(json_object['paging']['previous']!=null)
      {
        var test=json_object['paging']['previous'];
        html_text=html_text+"<button id='previous' onclick=\"goNext('"+test+"','"+typ+"')\" class=\"btn btn-default\" >Previous</button>";
      }

       if(json_object['paging']['next']!=null)
       {
         //var test="https://graph.facebook.com/v2.8/search?fields=id,name,picture.width&type=user&q=usc&access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD&limit=25&offset=25&__after_id=enc_AdCr9J2Jr6M9GZBCEu2sNMqiw0hCHmDAtHBl8hPtJ1GZBZCFlNtNNTFEwcOkBTioUjPPwzm6AqU4v1b72ZA9XG2d3ODA";
         var test=json_object['paging']['next'];
         html_text=html_text+"<button onclick=\"goNext('"+test+"','"+typ+"')\" class=\"btn btn-default\">Next</button>";
       }
       html_text+="</div>";

      document.getElementById("pill-content").innerHTML=html_text;

}

function storing(id,pic,name,type,ident)
{
  document.getElementById(ident).innerHTML="<a href=\"#\" onclick=\"deleting('"+id+"','"+pic+"','"+name+"','"+type+"','"+ident+"')\" style=\"color:black\"><span class=\"well well-sm glyphicon glyphicon-star\" style=\"color:yellow;\"></span></a>";
  //$("#"+ident+"").removeClass("glyphicon-star-empty");
  //$("#"+ident+"").addClass("glyphicon-star");
    var value=pic+"$"+name+"$"+type;
    localStorage.setItem(id, value);
    //alert(localStorage.getItem("lastname"));
    //alert(localStorage.length);
}
function storing_d(id,pic,name,type,ident)
{
  document.getElementById("stary").innerHTML="<div align=\"right\"><a style='margin-left:0px;' href=\"#\" onclick=\"deleting_d('"+id+"','"+pic+"','"+name+"','"+type+"','"+ident+"')\" style=\"color:black\"><span class=\"well well-sm glyphicon glyphicon-star\" style=\"color:yellow;\"></span></a><a onclick=\"share('"+name+"','"+pic+"')\" href=\"#\"><img src=\"facebook.png\" height=30px width=30px></a>";
  document.getElementById(ident).innerHTML="<a href=\"#\" onclick=\"deleting('"+id+"','"+pic+"','"+name+"','"+type+"','"+ident+"')\" style=\"color:black\"><span class=\"well well-sm glyphicon glyphicon-star\" style=\"color:yellow;\"></span></a>";
  //$("#"+ident+"").removeClass("glyphicon-star-empty");
  //$("#"+ident+"").addClass("glyphicon-star");
    var value=pic+"$"+name+"$"+type;
    localStorage.setItem(id, value);
    //alert(localStorage.getItem("lastname"));
    //alert(localStorage.length);
}

function deleting(id,pic,name,type,ident)
{
  document.getElementById(ident).innerHTML="<a href=\"#\" onclick=\"storing('"+id+"','"+pic+"','"+name+"','"+type+"','"+ident+"')\" style=\"color:black\"><span class=\"well well-sm glyphicon glyphicon-star-empty\" ></span></a>";
  localStorage.removeItem(id);
  //alert(localStorage.length);
}
function deleting_d(id,pic,name,type,ident)
{
  document.getElementById(ident).innerHTML="<a href=\"#\" onclick=\"storing('"+id+"','"+pic+"','"+name+"','"+type+"','"+ident+"')\" style=\"color:black\"><span class=\"well well-sm glyphicon glyphicon-star-empty\" ></span></a>";
  document.getElementById("stary").innerHTML="<div align=\"right\"><a style='margin-left:0px;' href=\"#\" onclick=\"storing_d('"+id+"','"+pic+"','"+name+"','"+type+"','"+ident+"')\" style=\"color:black\"><span class=\"well well-sm glyphicon glyphicon-star-empty\" ></span></a><a onclick=\"share('"+name+"','"+pic+"')\" href=\"#\"><img src=\"facebook.png\" height=30px width=30px></a>";
  localStorage.removeItem(id);
  //alert(localStorage.length);
}

function detailing(id,i,typ)
{
  document.getElementById("pill-content").style.display="none";
  //Back button
  var html_text="<a href='#' onclick=\"back()\" style=\"color:black;\"><span class=\"well well-sm glyphicon glyphicon-chevron-left\" style=\"color:black;\">Back</span></a><span id='stary'><font color=\"white\"></font></span>";

  //panel
  html_text+="<div class=\"row\"><div class=\"panel-group col-xs-6\"><div class=\"panel panel-default\"><div class=\"panel-heading\" style=\"color:black;\">Albums</div><div class=\"panel-body\"><div class=\"panel-group\" id=\"accordion\">";
  html_text+="<div id=\"progress1\" class=\"progress pad_progress\" style=\"margin:0px;\"><div class=\"progress-bar progress-bar-info progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"200\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 50%\"><span class=\"sr-only\">50% Complete</span></div></div>";
  html_text+="</div></div></div></div><div class=\"panel-group col-xs-6\"><div class=\"panel panel-default\"><div class=\"panel-heading\">Posts</div><div class=\"panel-body\" id=\"post_accordion\">";
  html_text+="<div id=\"progress2\" class=\"progress pad_progress\" style=\"margin:0px;\"><div class=\"progress-bar progress-bar-info progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"200\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 50%\"><span class=\"sr-only\">50% Complete</span></div></div>";
  html_text+="</div></div></div>";
  document.getElementById("panel-content").innerHTML=html_text;





  document.getElementById("panel-content").style.display="block";

if(typ!="Events")
  $.ajax({
  url:'http://sample-env.nhdgnefbsv.us-west-2.elasticbeanstalk.com/index.php',
  data:{id:id},
  datatype: "json",
  type: 'GET',
  success:function(response)
  {

    var json_object=JSON.parse(response);

    func_detailParse(json_object,i,typ);

  },
  error:function(xhr,status,error)
  {
    alert("fail");
  }
  });
else {
  //alert("in else");
  $.ajax({
  url:'http://sample-env.nhdgnefbsv.us-west-2.elasticbeanstalk.com/index.php',
  data:{id:id,type:typ},
  datatype: "json",
  type: 'GET',
  success:function(response)
  {

    var json_object=JSON.parse(response);

    func_detailParse(json_object,i,typ);

  },
  error:function(xhr,status,error)
  {
    alert("fail");
  }
  });
}


}

function back()
{
  document.getElementById("panel-content").style.display="none";
  document.getElementById("pill-content").style.display="block";
}

function share(name,url)
{
  FB.ui({
 method: 'feed',
 link: 'https://www.facebook.com/',
 picture: url,
 name: name,
 caption: 'FB SEARCH FROM USC CSCI571”',
 }, function(response){
 if (response && !response.error_message)
 alert("Posted Successfully");
 else
 alert("Not Posted");
});


}


function func_detailParse(json_object,i,typ)
{/*
  //progress bar in panel
  var txt="<div class=\"progress pad_progress\"><div class=\"progress-bar progress-bar-info progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 50%\">";
      txt+="</div></div>";
      document.getElementById("accordion").innerHTML=txt;
      document.getElementById("post_accordion").innerHTML=txt;*/
  //star
  var id;
  var photo;
  var name;
  id=json_object['id'];
  photo=json_object['picture']['data']['url'];
  name=json_object['name'];
  var html_text="<font color=\"white\">";
  if(localStorage.getItem(json_object['id'])==null)
    {
      html_text=html_text+"<div align=\"right\"><a style='margin-left:0px;' href=\"#\" onclick=\"storing_d('"+id+"','"+photo+"','"+name+"','"+typ+"','star"+i+"')\" style=\"color:black\"><span class=\"well well-sm glyphicon glyphicon-star-empty star\" ></span></a>";
    }
  else {
    html_text=html_text+"<div align=\"right\"><a style='margin-left:0px;' href=\"#\" onclick=\"deleting_d('"+id+"','"+photo+"','"+name+"','"+typ+"','star"+i+"')\" style=\"color:black\"><span class=\"well well-sm glyphicon glyphicon-star\" style=\"color:yellow;\"></span></a>";
  }
  //facebook post link
  html_text+="<a onclick=\"share('"+json_object['name']+"','"+json_object['picture']['data']['url']+"')\" href=\"#\"><img src=\"facebook.png\" height=30px width=30px></a></div>";

document.getElementById("stary").innerHTML=html_text;


if(json_object['albums']!=null)
{var i=1;
  var html_t="<div></div>";
  //alert(json_object['albums']['data']);
  $.each(json_object['albums']['data'], function(key,item)
  {
    //alert(item.name);
    var pic_name=item.name;
    //alert(item.id);

    //var id=item.id;

      html_t +="<div  class=\"panel panel-default\"><div class=\"panel-heading\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse"+i+"\" style=\"color:black;\">"+pic_name+"</a></div>";

      if(item.photos.data[0].picture!=null)
      {
        var photo1=item.photos.data[0].picture;
        if(i==1)
        html_t+="<div id=\"collapse"+i+"\" class=\"panel-collapse collapse in\"><div class=\"panel-body\"><a target=\"_blank\" href='https://graph.facebook.com/v2.8/"+item.photos.data[0].id+"/picture?access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD'><img src="+photo1+" class=\"img-responsive\" ></a>";
        else {
          html_t+="<div id=\"collapse"+i+"\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><a target=\"_blank\" href='https://graph.facebook.com/v2.8/"+item.photos.data[0].id+"/picture?access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD'><img src="+photo1+" class=\"img-responsive\"></a>";
        }
      }
      if(item.photos.data[1].picture!=null)
      {
        var photo2=item.photos.data[1].picture;
        html_t+="<a target=\"_blank\" href='https://graph.facebook.com/v2.8/"+item.photos.data[1].id+"/picture?access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD'><img src="+photo2+" class=\"img-responsive\"></a>";
      }
      html_t +="</div></div></div>";
      i++;


  });
  document.getElementById("accordion").innerHTML=html_t;
}
  else{
    document.getElementById("accordion").innerHTML="<div class='panel panel-warning'><div class='panel-body'>No data Found</div></div>";
  }



  var profile_picture=json_object['picture']['data']['url'];
  var profile_name=json_object['name'];

  if(json_object['posts']!=null)
  {
    var html_text1="<div></div>";
  $.each(json_object['posts']['data'], function(key,item)
  {
    //alert(item.name);
    var message=item.message;
    var time=item.created_time;

    //var id=item.id;
    html_text1 +="<div class=\"panel panel-default\"><div class=\"panel-body container-fluid\"><div class=\"row\"><div class=\"col-sm-3\"><img src="+profile_picture+" height=50px width=50px></div><div class=\"col-sm-9\"><div class=\"row\"><div>"+profile_name+"</div></div><div class=\"row\"><div>"+moment(time).format('YYYY-MM-DD h:mm:ss')+"</div></div></div></div><div class=\"row\"><div>"+message+"</div></div></div></div>";


    });
      document.getElementById("post_accordion").innerHTML=html_text1;
  }
  else{
    document.getElementById("post_accordion").innerHTML="<p>No data Found</p>";
  }
  //html_text +="</div></div></div>";



  //document.getElementById("panel-content").innerHTML=html_text;


}

function myf()
{
  setTimeout(function(){  }, 5000);
}


function goNext(json_o,typ)
{

  $.getJSON(json_o,function(response)
  {
    func_userParse(response,typ);
  });
}
