<?php
header("Access-Control-Allow-Origin: *");

date_default_timezone_set('UTC');
require_once __DIR__ . '/php-graph-sdk-5.0.0/src/Facebook/autoload.php';


if(isset($_GET["id"]))
{
  try {
    if(!isset($_GET["type"]))
      $fb="https://graph.facebook.com/v2.8/".$_GET["id"]."?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name,%20picture}},posts.limit(5)&access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD";
    else
      $fb="https://graph.facebook.com/v2.8/".$_GET["id"]."?fields=id,name,picture.width(700).height(700)&access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD";


    //$result=file_get_contents($response);
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
  }

  $response=file_get_contents($fb);
  echo $response;
}

if(isset($_GET["keyword"]))
{


  if($_GET["type"]=="Users")
  {
  try {

      $fb="https://graph.facebook.com/v2.8/search?q=".$_GET["keyword"]."&type=user&fields=id,name,picture.width(700).height(700)&access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD";


    //$result=file_get_contents($response);
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
  }

  $response=file_get_contents($fb);
  echo $response;
  }


  if($_GET["type"]=="Pages")
  {
  try {

      $fb="https://graph.facebook.com/v2.8/search?q=".$_GET["keyword"]."&type=page&fields=id,name,picture.width(700).height(700)&access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD";


    //$result=file_get_contents($response);
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
  }

  $response=file_get_contents($fb);
  echo $response;
  }

  if($_GET["type"]=="Events")
  {
  try {

      $fb="https://graph.facebook.com/v2.8/search?q=".$_GET["keyword"]."&type=event&fields=id,name,picture.width(700).height(700)&access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD";


    //$result=file_get_contents($response);
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
  }

  $response=file_get_contents($fb);
  echo $response;
  }

  if($_GET["type"]=="Places")
  {
  try {

      $fb="https://graph.facebook.com/v2.8/search?q=".$_GET["keyword"]."&type=place&fields=id,name,picture.width(700).height(700)&center=".$_GET["latitude"].",".$_GET["longitude"]."&access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD";


    //$result=file_get_contents($response);
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
  }

  $response=file_get_contents($fb);
  echo $response;
  }



    if($_GET["type"]=="Groups")
    {
    try {

        $fb="https://graph.facebook.com/v2.8/search?q=".$_GET["keyword"]."&type=group&fields=id,name,picture.width(700).height(700)&access_token=EAAbgsgv5tEABAKPLDTfnkIYmGfvhCsVYpNZBZAMtjTgxw8sB4fqkqZAdisZALFfU6FPUh5lO86EEKogL5T5P3bSFzqED7XHAK3R74Ljdtx7XUZAAZBEgZBLeC0bGsuexkoZBzzZC5XBrvL0GFzGQxGBwKD86qxsJO4tn3RPOSssr15gZDZD";


      //$result=file_get_contents($response);
    } catch(Facebook\Exceptions\FacebookResponseException $e) {
      // When Graph returns an error
      echo 'Graph returned an error: ' . $e->getMessage();
      exit;
    } catch(Facebook\Exceptions\FacebookSDKException $e) {
      // When validation fails or other local issues
      echo 'Facebook SDK returned an error: ' . $e->getMessage();
      exit;
    }

    $response=file_get_contents($fb);
    echo $response;
    }


}
?>
