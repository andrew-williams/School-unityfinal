using UnityEngine;
using System.Collections;

public class BulletCollide : MonoBehaviour {
	
	void Start() { 
		Destroy( gameObject, 5.0f ); // Destroy after 5.0 seconds.
	}
	
	void OnCollisionEnter() { 
		Destroy( gameObject ); // Destroy on collision with other collider.
	}
}
