function Update() { 
	if( Input.GetKeyDown("left ctrl") ) { 
		rigidbody.AddForce( Vector3(0,1000,0) );
	}
	if ( Input.GetKeyDown("left shift") ) { 
		renderer.material.color = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0),Random.Range(0.0,1), Random.Range(0.0,1));
	}
}

function OnCollisionEnter() {
	renderer.material.color = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0),Random.Range(0.0,1), Random.Range(0.0,1));
}