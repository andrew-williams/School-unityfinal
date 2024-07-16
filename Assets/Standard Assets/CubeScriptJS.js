#pragma strict

public var isLocal:boolean = false;

function Update () {
	transform.Rotate( Vector3(0,90*Time.deltaTime,0), ( isLocal ? Space.Self : Space.World ) );
}