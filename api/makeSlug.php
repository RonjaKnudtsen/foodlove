<?php
	function makeSlug($string){
			//Unwanted:  {UPPERCASE} ; / ? : @ & = + $ , . ! ~ * ' ( )
		    $string = strtolower($string);
		    //Convert ÆØÅ 
		    $string = str_replace(chr(230), 'e', $string); 
		    $string = str_replace(chr(248), 'o', $string); 
		    $string = str_replace(chr(229), 'a', $string);
		    //Strip any unwanted characters
		    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
		    //Clean multiple dashes or whitespaces
		    $string = preg_replace("/[\s-]+/", " ", $string);
		    //removes space before and after
		    $string = trim("$string");
		    //Convert whitespaces and underscore to dash
		    $string = preg_replace("/[\s_]/", "-", $string);

		    //Now check if this slug is unique
			return $string;
		}
?>