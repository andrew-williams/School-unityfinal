#pragma strict

public var myInt:int; // float, String, boolean.
public var myVector:Vector3; 

function Start () {
	myInt = 42;
	myVector = Vector3(1*Time.deltaTime,0,0); // Vector3(1,0,0) is same as Vector3.left*0.1
	print("myInt set to: "+myInt); // Or Debug.Log();
}

function Update () {
	transform.Translate( myVector ); // Moves the object.
}